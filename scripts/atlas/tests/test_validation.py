"""Meaningful validation regressions; fixtures are test-only, never atlas data."""

from copy import deepcopy
import json
from pathlib import Path
import stat
import sys
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch

import openpyxl

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from normalization import (  # noqa: E402
    SourceError, REVIEW_RECORD_KEYS, achr_result, availability, needle_category,
    numeric_age, quantitative_troponin, review_records,
)
from process_workbook import (  # noqa: E402
    DEFAULT_WORKBOOK, MASTER_SHEET, REQUIRED_HEADERS, Check,
    atomic_json, exact_binomial_interval, load_source, private_directory, run, validate_records,
)


class StrictNormalizationTests(unittest.TestCase):
    def test_empty_and_nonperformance_are_never_negative(self):
        self.assertEqual(achr_result(None), "not_documented")
        self.assertEqual(achr_result("Not reported"), "not_reported")
        self.assertEqual(availability("No (Deferred)"), "not_performed")
        self.assertEqual(availability("Not reported"), "not_reported")
        with self.assertRaises(SourceError):
            achr_result("No")  # Availability alone cannot establish negativity.

    def test_age_requires_an_entire_numeric_value(self):
        self.assertEqual(numeric_age("72"), 72)
        self.assertEqual(numeric_age(71), 71)
        for value in (True, "70s", "80s", "Late 70s", "NR", None, "66–70", "71 years", float("nan"), float("inf"), "9" * 1000):
            self.assertIsNone(numeric_age(value), repr(value))

    def test_needle_uses_interpretation_not_a_negative_keyword(self):
        self.assertEqual(needle_category("Normal / Negative (no myopathic pattern)"), "normal")
        self.assertEqual(needle_category("Indeterminate (pattern unclear)"), "indeterminate")
        self.assertEqual(needle_category("Miopático con rasgos mixtos"), "myopathic")

    def test_supported_units_are_converted_literally(self):
        self.assertEqual(quantitative_troponin("2.5 ng/mL").value_ng_l, 2500)
        self.assertEqual(quantitative_troponin("120.5 pg/mL").value_ng_l, 120.5)
        self.assertEqual(quantitative_troponin("40 rising to peak 250 ng/L").value_ng_l, 250)
        self.assertEqual(quantitative_troponin("200 ng/L (stable 100-150 ng/L)").value_ng_l, 200)

    def test_ambiguous_peaks_and_assays_are_not_imputed(self):
        for value in (">100 ng/L", "100-200 ng/L", "80 ng/L (rose >100 ng/L, peak TnI 2.5)", "Trop T 200 ng/L, Trop I 150 ng/L", "100 ng/L (stable 200-300 ng/L)", "2.5"):
            parsed = quantitative_troponin(value)
            self.assertEqual(parsed.status, "ambiguous", value)
            self.assertIsNone(parsed.value_ng_l)
        self.assertEqual(quantitative_troponin("Elevated").status, "qualitative_only")

    def test_exact_intervals_match_frozen_method(self):
        self.assertEqual(exact_binomial_interval(11, 30), [19.9, 56.1])
        self.assertEqual(exact_binomial_interval(0, 4), [0.0, 60.2])
        self.assertEqual(exact_binomial_interval(6, 11), [23.4, 83.3])
        self.assertIsNone(exact_binomial_interval(0, 0))


class IngestionFailureTests(unittest.TestCase):
    def test_private_permissions_repair_shared_directory_without_changing_source_parent(self):
        with tempfile.TemporaryDirectory() as temporary:
            source_parent = Path(temporary) / "source"
            source_parent.mkdir()
            source_parent.chmod(0o755)
            destination = source_parent / "_processed"
            destination.mkdir()
            destination.chmod(0o777)
            with patch("process_workbook.OUTPUT_DIRECTORY", destination), patch("process_workbook.subprocess.run", return_value=SimpleNamespace(returncode=0, stdout="")):
                private_directory(destination)
            atomic_json(destination / "test.private.json", {"testFixture": True})
            self.assertEqual(stat.S_IMODE(destination.stat().st_mode), 0o700)
            self.assertEqual(stat.S_IMODE((destination / "test.private.json").stat().st_mode), 0o600)
            self.assertEqual(stat.S_IMODE(source_parent.stat().st_mode), 0o755)

    def test_invalid_zip_is_a_reportable_blocker(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "invalid.xlsx"
            path.write_text("not a spreadsheet", encoding="utf-8")
            rows, checks, _, _ = load_source(path)
            self.assertEqual(rows, [])
            self.assertTrue(any(not check.passed for check in checks))

    def test_mapped_formula_rejected_even_when_data_only_is_empty(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "formula.xlsx"
            book = openpyxl.Workbook()
            sheet = book.active
            sheet.title = MASTER_SHEET
            sheet.append(REQUIRED_HEADERS)
            sheet.append(["=1+1"] + [None] * (len(REQUIRED_HEADERS) - 1))
            book.save(path)
            book.close()
            records, checks, _, _ = load_source(path)
            self.assertEqual(records, [])
            formula_check = next(c for c in checks if c.name == "Mapped formula cells (cache reliability)")
            self.assertFalse(formula_check.passed)
            self.assertEqual(formula_check.observed, 1)

    def test_failed_run_revokes_stale_review_without_overwriting_source(self):
        with tempfile.TemporaryDirectory() as directory:
            destination = Path(directory)
            source = destination / "invalid.xlsx"
            source.write_bytes(b"invalid source fixture")
            original = source.read_bytes()
            review = destination / "atlas.review.json"
            review.write_text("stale test fixture", encoding="utf-8")
            with patch("process_workbook.OUTPUT_DIRECTORY", destination), patch("process_workbook.private_directory"):
                passed, _ = run(source, destination / "report.md")
            self.assertFalse(passed)
            self.assertFalse(review.exists())
            self.assertEqual(source.read_bytes(), original)
            audit = json.loads((destination / "validation.audit.private.json").read_text())
            self.assertFalse(audit["validationPassed"])

    def test_unreadable_source_hash_also_revokes_stale_review(self):
        with tempfile.TemporaryDirectory() as directory:
            destination = Path(directory)
            source = destination / "invalid.xlsx"
            source.write_bytes(b"invalid source fixture")
            review = destination / "atlas.review.json"
            review.write_text("stale test fixture", encoding="utf-8")
            with patch("process_workbook.OUTPUT_DIRECTORY", destination), patch("process_workbook.private_directory"), patch.object(Path, "read_bytes", side_effect=PermissionError("test fixture")):
                passed, checks = run(source, destination / "report.md")
            self.assertFalse(passed)
            self.assertFalse(review.exists())
            self.assertTrue(any(not c.passed for c in checks))


@unittest.skipUnless(DEFAULT_WORKBOOK.exists(), "Authoritative private workbook is not supplied")
class AuthoritativeWorkbookTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.records, cls.ingestion_checks, _, cls.errors = load_source(DEFAULT_WORKBOOK)

    def test_core_frozen_categories_and_invariants(self):
        self.assertEqual(self.errors, [])
        checks = self.ingestion_checks + validate_records(self.records)
        self.assertTrue(all(c.passed for c in checks if c.dependency != "non-exported descriptive"))
        self.assertEqual(len(self.records), 38)

    def test_age_and_lvef_descriptive_targets(self):
        checks = validate_records(self.records)
        selected = [c for c in checks if c.name.startswith("Age ") or c.name == "Strictly numeric ages n" or c.name == "Categorical LVEF"]
        self.assertEqual(len(selected), 5)
        self.assertTrue(all(c.passed for c in selected))

    def test_unresolved_troponin_blocks_the_full_export_gate(self):
        checks = validate_records(self.records)
        failed = [c for c in checks if not c.passed]
        self.assertEqual(len(failed), 4)
        self.assertTrue(all(c.name.startswith("Troponin ") or c.name == "Supported quantitative peak troponin n" for c in failed))
        self.assertEqual(next(c.observed for c in checks if c.name == "Supported quantitative peak troponin n"), 25)
        # This regression verifies that the discrepancy remains detectable;
        # it is not a claim that the frozen target itself has passed.

    def test_a_wrong_achr_formal_overlap_is_a_critical_failure(self):
        changed = deepcopy(self.records)
        positive = next(row for row in changed if row["achr_result"] == "positive")
        positive["formal_nmj"] = True
        checks = validate_records(changed)
        overlap = next(c for c in checks if c.name == "AChR-positive / formal NMJ overlap")
        self.assertFalse(overlap.passed)
        self.assertEqual(overlap.observed, 1)

    def test_duplicate_ids_prevent_stable_review_labels(self):
        changed = deepcopy(self.records)
        changed[1]["source_id"] = changed[0]["source_id"]
        with self.assertRaises(SourceError):
            review_records(changed)
        uniqueness = next(c for c in validate_records(changed) if c.name == "Unique patient identifiers")
        self.assertFalse(uniqueness.passed)

    def test_minimal_review_schema_and_private_crosswalk_stay_separate(self):
        # Exercise schema generation in memory; no review artifact is emitted.
        review, provenance = review_records(self.records)
        self.assertEqual(len(review), 38)
        self.assertEqual(len({row["label"] for row in review}), 38)
        self.assertTrue(all(set(row) == REVIEW_RECORD_KEYS for row in review))
        self.assertTrue(all(set(row) == {"label", "sourceId", "sourceRow", "sourceDoi"} for row in provenance))
        self.assertEqual([row["label"] for row in review], [row["label"] for row in provenance])
        reversed_review, reversed_provenance = review_records(list(reversed(self.records)))
        self.assertEqual(review, reversed_review)
        self.assertEqual(provenance, reversed_provenance)
        source_by_label = {row["label"]: row["sourceId"] for row in provenance}
        source_by_id = {row["source_id"]: row for row in self.records}
        for row in review:
            source = source_by_id[source_by_label[row["label"]]]
            if row["formalNmj"] == "not_documented":
                self.assertNotEqual(row["nmjEvidence"], "formal_negative")
            if row["achr"] == "positive":
                self.assertEqual(row["formalNmj"], "not_documented")
            if source["achr_status"] != "performed":
                self.assertEqual(row["achr"], "not_documented")


if __name__ == "__main__":
    unittest.main()
