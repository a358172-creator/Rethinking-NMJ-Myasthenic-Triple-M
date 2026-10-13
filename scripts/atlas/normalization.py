"""Explicit mappings from the inspected frozen workbook; no clinical inference.

This module does not contain patient records. Source IDs and source text stay in
memory or restricted provenance artifacts, never in the browser representation.
"""

from dataclasses import dataclass
import math
from numbers import Real
import re
from typing import Any


class SourceError(ValueError):
    """A source encoding cannot be mapped without adjudication."""


@dataclass(frozen=True)
class TroponinValue:
    value_ng_l: float | None
    status: str
    reason: str = ""


def source_text(value: Any) -> str:
    if value is None:
        return ""
    if not isinstance(value, str):
        raise SourceError("Expected a source category encoded as text")
    return value.strip()


def availability(value: Any) -> str:
    """Retain explicit non-performance separately from non-reporting."""
    text = source_text(value)
    if text == "Yes" or text.startswith("Yes ("):
        return "performed"
    if text == "No" or text.startswith("No ("):
        return "not_performed"
    if text in ("Not reported", "NR"):
        return "not_reported"
    if text == "":
        return "not_documented"
    if text == "Unknown":
        return "unknown"
    raise SourceError("Unrecognized availability category")


def negative_result(value: Any) -> str:
    text = source_text(value)
    if text == "Negative" or text.startswith("Negative ("):
        return "negative"
    if text in ("Not reported", "NR"):
        return "not_reported"
    if text == "":
        return "not_documented"
    # An unexpected positive/abnormal category is a discrepancy, never negative.
    if text in ("Positive", "Abnormal"):
        return "abnormal"
    raise SourceError("Unrecognized formal NMJ result category")


def achr_result(value: Any) -> str:
    text = source_text(value)
    if text == "Yes" or text.startswith("Yes ("):
        return "positive"
    if text == "No (Negative)" or text.startswith("No (<"):
        return "negative"
    if text in ("Not reported", "NR"):
        return "not_reported"
    if text == "":
        return "not_documented"
    if text == "Unknown":
        return "unknown"
    raise SourceError("Unrecognized AChR result category")


NMJ_CATEGORIES = {
    "B. OBJECTIVE NMJ NEGATIVE": "formal_negative",
    "C. OBJECTIVE NMJ INDETERMINATE": "indeterminate_qualitative",
    "D. NOT TESTED / NOT REPORTED": "not_documented",
}


def nmj_category(value: Any) -> str:
    try:
        return NMJ_CATEGORIES[source_text(value)]
    except KeyError as exc:
        raise SourceError("Unrecognized Objective_NMJ_Category") from exc


def needle_category(value: Any) -> str:
    text = source_text(value)
    if text.startswith("Miopático"):
        # Includes the source's explicitly myopathic mixed polyneuropathy case.
        return "myopathic"
    if text.startswith("Neuropathic pattern"):
        return "neuropathic"
    if text.startswith("Normal / Negative"):
        return "normal"
    if text.startswith("Indeterminate ("):
        return "indeterminate"
    if text == "Not reported":
        return "not_reported"
    if text == "Not performed" or text.startswith("Deferred due to"):
        return "not_performed"
    if text == "":
        return "not_documented"
    raise SourceError("Unrecognized EMG_Interpretation category")


def vital_status(value: Any) -> str:
    text = source_text(value)
    if text.startswith("DIED ("):
        return "death"
    if text.startswith("Survived (") or text.startswith("Survived with "):
        return "survival"
    if text in ("Not clearly reported (index case presentation)", "", "Unknown"):
        return "unknown"
    raise SourceError("Unrecognized Outcome_Survival category")


def lvef_category(value: Any) -> str:
    status = availability(value)
    return {
        "performed": "reduced",  # Yes in the LVEF_Reduced indicator.
        "not_performed": "preserved",  # No in the same indicator.
        "not_reported": "not_documented",
        "not_documented": "not_documented",
        "unknown": "unknown",
    }[status]


def numeric_age(value: Any) -> float | None:
    """Only finite numbers or entirely numeric strings, never qualitative ages.

    The inspected workbook stores all ages as text, including exact integers.
    Full-string recognition accepts those exact values without extracting a
    number from '70s', 'Late 70s', intervals or missingness markers.
    """
    if isinstance(value, Real) and not isinstance(value, bool):
        number = float(value)
        if math.isfinite(number):
            return number
    if isinstance(value, str) and re.fullmatch(r"\d+(?:\.\d+)?", value.strip()):
        number = float(value.strip())
        if math.isfinite(number):
            return number
    return None


_NUMBER = r"(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?"
_MEASUREMENT = re.compile(rf"(?P<number>{_NUMBER})\s*(?P<unit>ng/L|pg/mL|ng/mL)\b")
_UNITS = {"ng/L": 1.0, "pg/mL": 1.0, "ng/mL": 1000.0}


def quantitative_troponin(value: Any) -> TroponinValue:
    """Parse only an explicit, uncensored, unit-supported source peak.

    The source has multiple assays, intervals and a unitless peak. This parser
    refuses to choose an assay or turn a range/lower bound into an exact value.
    Literal ng/mL conversion is retained even if it disagrees with the audit.
    """
    text = source_text(value)
    if text in ("", "Not reported", "NR"):
        return TroponinValue(None, "not_reported")
    if text == "Elevated" or text.startswith("Elevated ("):
        return TroponinValue(None, "qualitative_only")
    if re.search(rf"[<>≥≤]\s*{_NUMBER}", text):
        return TroponinValue(None, "ambiguous", "censored concentration or trajectory")
    concentration_range = re.search(rf"(?P<low>{_NUMBER})\s*[-–]\s*(?P<high>{_NUMBER})\s*(?P<unit>ng/L|pg/mL|ng/mL)", text)
    if concentration_range:
        # A leading exact maximum followed by an explicitly lower stable range
        # is supported; a source consisting of a range is not an exact peak.
        leading = _MEASUREMENT.match(text)
        explicit_peak = float(leading['number'].replace(',', '')) * _UNITS[leading['unit']] if leading else None
        range_upper = float(concentration_range['high'].replace(',', '')) * _UNITS[concentration_range['unit']]
        if "stable " not in text or explicit_peak is None or range_upper > explicit_peak:
            return TroponinValue(None, "ambiguous", "range without an exact peak")
    if re.search(r"peak\s+(?:TnI|TnT)\s+\d", text):
        return TroponinValue(None, "ambiguous", "peak lacks an explicit unit")
    matches = list(_MEASUREMENT.finditer(text))
    if not matches:
        return TroponinValue(None, "ambiguous", "no supported unit-qualified value")
    # The workbook names both T and I in five quantitatively mixed-assay rows.
    # A normal qualitative I result after a single T concentration adds no
    # competing numeric measurement and is kept as the documented T result.
    assay_i = re.search(r"(?:cTnI|hs-TnI|hs-cTnI|TnI|Trop I|troponin I)", text)
    assay_t = re.search(r"(?:cTnT|hs-TnT|TnT|Trop T|troponin-T|troponin T)", text)
    if assay_i and assay_t and len(matches) > 1:
        return TroponinValue(None, "ambiguous", "multiple assays without a selection rule")
    if len(matches) > 1 and not any(word in text for word in ("decreasing", "improved", "stable")):
        return TroponinValue(None, "ambiguous", "multiple concentrations without a peak rule")
    # Explicit 'rising to [peak]' text has its single unit at the final value.
    # Earlier unitless values are not separately interpreted or exported.
    converted = [float(m['number'].replace(',', '')) * _UNITS[m['unit']] for m in matches]
    return TroponinValue(max(converted), "quantitative")


def normalize_row(row: dict[str, Any], source_row: int) -> dict[str, Any]:
    patient_id = source_text(row["Patient_ID"])
    doi = source_text(row["DOI"])
    if not patient_id or not doi:
        raise SourceError("Missing patient identifier or source DOI")
    rns = availability(row["RNS_Performed"])
    sfemg = availability(row["SFEMG_Performed"])
    needle = availability(row["EMG_Conventional_Performed"])
    achr = availability(row["AChR_Performed"])
    return {
        "source_id": patient_id,
        "source_doi": doi.lower(),
        "source_row": source_row,
        "rns_status": rns,
        "rns_result": negative_result(row["RNS_Result"]),
        "sfemg_status": sfemg,
        "sfemg_result": negative_result(row["SFEMG_Result"]),
        "formal_nmj": rns == "performed" or sfemg == "performed",
        "nmj_evidence": nmj_category(row["Objective_NMJ_Category"]),
        "needle_status": needle,
        "needle_emg": needle_category(row["EMG_Interpretation"]),
        "achr_status": achr,
        "achr_result": achr_result(row["AChR_Positive"]),
        "vital_status": vital_status(row["Outcome_Survival"]),
        "age": numeric_age(row["Age"]),
        "troponin": quantitative_troponin(row["Troponin_Max"]),
        "troponin_raw_value": source_text(row["Troponin_Max"]),  # Private adjudication only.
        "lvef": lvef_category(row["LVEF_Reduced"]),
        "mg_phenotype": availability(row["MG_Phenotype"]),
    }


REVIEW_RECORD_KEYS = frozenset({
    "label", "achr", "formalNmj", "nmjEvidence", "needleEmg", "vitalStatus",
})


def review_records(records: list[dict[str, Any]]) -> tuple[list[dict], list[dict]]:
    """Stable lexical-ID ordering; IDs and DOI stay only in the private crosswalk."""
    if len({r["source_id"] for r in records}) != len(records):
        raise SourceError("Duplicate identifiers prevent stable case labels")
    public, provenance = [], []
    for index, row in enumerate(sorted(records, key=lambda r: r["source_id"]), 1):
        label = f"Case {index:02d}"
        public.append({
            "label": label,
            "achr": row["achr_result"] if row["achr_result"] in ("positive", "negative") else "not_documented",
            "formalNmj": "documented" if row["formal_nmj"] else "not_documented",
            "nmjEvidence": row["nmj_evidence"],
            "needleEmg": row["needle_emg"] if row["needle_status"] == "performed" else "not_documented",
            "vitalStatus": row["vital_status"],
        })
        provenance.append({
            "label": label,
            "sourceId": row["source_id"],
            "sourceRow": row["source_row"],
            "sourceDoi": row["source_doi"],
        })
    return public, provenance
