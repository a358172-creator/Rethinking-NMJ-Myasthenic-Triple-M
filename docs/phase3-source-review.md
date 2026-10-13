# Phase 3A independent source review

Review date: 12 October 2026 (America/Chihuahua). This is a read-only review of the actual workbook, the supplied Phase 3A instructions, the frozen audit, the clean v3 manuscript and the scientific guardrails. It contains aggregate findings and column metadata only. No patient identifiers, source-to-patient crosswalk or clinical narrative is reproduced.

**Decision: the categorical and age invariants pass, but the frozen quantitative troponin result cannot be certified from the supplied fields without unsupported decisions. Patient-level publication/export remains blocked pending source review.** No source values were corrected or substituted to obtain agreement.

## Source inspection

- Authoritative file: `esearch_sources/Triple_M_Master_Patient_Dataset_Expanded_N38.xlsx`.
- SHA-256 at review: `d6ced420d83eb046559ea445422ea7a838990989ab535a2f4530ef40db674fcb`.
- Patient sheet: `Master_Patient_Dataset_N38`, 39 rows including the header, 74 columns, 38 patient records.
- Secondary sheet: `Expansion_Series_Audit`, 18 rows including the header, nine columns. Its entries are not additional cohort patients.
- Headers were read from the workbook rather than assumed. Initial inspection used ZIP/XML; independent reinspection used `openpyxl` with read-only loading.
- There are no formula cells. The 2,812 patient-sheet data cells comprise 2,607 strings, 51 integers and 154 empty cells. In particular, all age and troponin entries are text, so numeric eligibility requires explicit parsing.
- The 38 source patient identifiers are unique. Canonical DOI grouping, using surrounding-whitespace removal and case normalization, produces 27 publications: 22 single-patient publications, two two-patient publications and three four-patient publications. This is bibliographic grouping of the supplied records, not fresh duplicate adjudication of the underlying literature.

## Independently checked aggregates

| Check | Expected | Independently observed | Status |
|---|---|---|---|
| Cohort records / unique source patient identifiers | 38 / 38 | 38 / 38 | PASS |
| Canonical source publication groups | 27 | 27 | PASS |
| AChR tested / positive / negative / not documented | 30 / 11 / 19 / 8 | 30 / 11 / 19 / 8 | PASS |
| AChR positivity and exact 95% CI | 11/30; 36.7%; 19.9–56.1% | 11/30; 36.7%; 19.9–56.1% | PASS |
| Formal RNS and/or SFEMG patients | 4 | 4 | PASS |
| Formal NMJ abnormality and exact 95% CI | 0/4; 0–60.2% | 0/4; 0–60.2% | PASS |
| SFEMG performed / subset of formal NMJ patients | 1 / yes | 1 / yes | PASS |
| NMJ categories: formal negative / qualitative indeterminate / no objective evidence documented | 4 / 2 / 32 | 4 / 2 / 32 | PASS |
| AChR-positive patients with formal NMJ studies | 0/11 | 0/11 | PASS |
| Conventional needle EMG evaluated / not documented | 11 / 27 | 11 / 27 | PASS |
| Needle EMG: myopathic / neuropathic / normal / indeterminate | 6 / 1 / 1 / 3 | 6 / 1 / 1 / 3 | PASS |
| Myopathic needle EMG and exact 95% CI | 6/11; 54.5%; 23.4–83.3% | 6/11; 54.5%; 23.4–83.3% | PASS |
| Documented deaths / survivors / unknown vital status | 16 / 21 / 1 | 16 / 21 / 1 | PASS |
| Mortality, full denominator and exact 95% CI | 16/38; 42.1%; 26.3–59.2% | 16/38; 42.1%; 26.3–59.2% | PASS |
| Mortality, known vital status denominator | 16/37; 43.2% | 16/37; 43.2% | PASS |
| Strict numeric age: n / median / IQR / range | 28 / 71 / 66.5–78 / 42–86 years | 28 / 71 / 66.5–78 / 42–86 years | PASS |
| LVEF: preserved / reduced / not documented | 21 / 5 / 12 | 21 / 5 / 12 | PASS |
| Exact quantitative peak troponin: n / median / IQR | 33 / 1,506 / 1,028–3,891 ng/L | Cannot certify; source ambiguity described below | FAIL / STOP |

Exact binomial intervals were independently recalculated with `scipy.stats.beta` using the two-sided Clopper–Pearson method. Age quartiles use inclusive linear interpolation. Age eligibility uses an anchored digit-only match; qualitative decades and missing entries are excluded rather than imputed.

## Field interpretation and mapping checks

| Actual source columns | Vetted normalization principle | Limitations and missingness |
|---|---|---|
| `Patient_ID`; `DOI` | Source-only identity and publication provenance | Do not expose raw identifiers or the record crosswalk to the browser. Repeated categorical combinations are not evidence of duplicate patients. |
| `AChR_Performed`; `AChR_Positive` | Explicit performed status determines the tested denominator; affirmative and negative result prefixes determine positive and negative categories | Eight results are not documented. The 19 negatives include an explicit below-reference quantitative result. An unavailable or unperformed assay is not negative. |
| `RNS_Performed`; `RNS_Result`; `RNS_Finding_Type` | Only affirmative performed status counts as formal testing. All four documented RNS results are explicitly negative | Six entries explicitly describe no/deferred RNS, and 28 say not reported. Keep that source distinction in internal provenance; a minimal public availability category may cautiously combine them as not documented. Do not infer a test result from a missing or contextual finding-type field. |
| `SFEMG_Performed`; `SFEMG_Result` | One affirmative study with an explicitly negative result; its patient is already in the RNS set | Six explicitly no/deferred entries and 31 not reported entries are not normal studies. The union has four patients, not five. |
| `Objective_NMJ_Category` | Preserve the three explicit source categories, mapped to formal negative, qualitative indeterminate and no objective NMJ evidence documented | The two qualitative indeterminate cases do not have affirmative formal RNS/SFEMG availability. This evidence category is separate from the binary availability variable. |
| `EMG_Conventional_Performed`; `EMG_Result`; `EMG_Interpretation` | Eleven affirmative performed entries. The explicit interpretation supplies six bilingual myopathic labels, one neuropathic label, one normal/negative label and three indeterminate labels | Do not classify by an unanchored search for “myopathic” in the result: a negative result can contain that word. Some studies have timing qualifiers or mixed findings; use the explicit recorded interpretation rather than a new physiological inference. There are six explicitly no/deferred entries and 21 not reported entries. |
| `Outcome_Survival` | Anchored outcome classifications distinguish documented death, documented survival and unknown | The unknown entry says that the outcome is not clearly reported. Narrative keyword searches elsewhere must not resolve that uncertainty. These are reported endpoints rather than standardized prospective follow-up. |
| `Age` | Only complete digit-only values enter quantitative summaries | Six missing markers and four qualitative age descriptions are excluded. No conversion of decade labels or imputation is justified. |
| `LVEF_Reduced`; `LVEF` | The explicit categorical reduced-status field reproduces preserved/reduced/not-documented counts | Quantitative LVEF and narrative history are distinct fields. The recorded reduced category can include pre-existing dysfunction; this classification does not attribute causality to ICI exposure. |
| `Troponin_Max` | Exact concentration values require supported peak selection, assay selection and unit conversion | Ranges, censoring, simultaneous assays and a unitless peak prevent certification of the frozen 33-patient quantitative summary. |

## Troponin discrepancy and mandatory stop

There are 33 entries containing numeric text, four qualitative elevated entries and one not-reported entry. The count of entries containing numbers is not an independently verified count of exact quantitative peaks.

The following source-field problems require adjudication:

1. One entry contains only a concentration range. Neither endpoint nor a midpoint is authorized as its exact peak.
2. One entry is a lower-bound concentration. Removing its greater-than sign would manufacture a point value.
3. One trajectory combines an exact earlier concentration, a later lower bound and an assay-specific peak without a unit. The exact earlier value is not the peak, and neither the bound nor the unitless number supports a precise standardized peak.
4. Five entries report quantitative troponin T and I concentrations together without a documented rule selecting a single result for the pooled endpoint. The manuscript says that assay type was not a restriction, but does not define how simultaneous assay results were reduced to one concentration per patient.
5. One explicitly stated concentration has `ng/mL` units. Literal dimensional conversion produces 2,484,000 ng/L, which exceeds the frozen maximum of 162,000 ng/L. The supplied materials contain no documented correction of that unit. Treating its numerical magnitude as an `ng/L` measurement would silently change the source.

The clean v3 manuscript provides the general rule that reported peaks were standardized when possible and that qualitative elevation was not converted into a numeric measurement. Neither the manuscript, audit nor guardrails supplies exact rules resolving the range, censoring, simultaneous assays or unit discrepancy. The affected workbook source-note fields also provide no explicit normalization or unit-correction rule. The earlier audit's assertion of agreement therefore does not supply a reproducible resolution of these issues.

For discrepancy diagnosis only, a conservative parse accepts exact, unit-qualified single-assay peaks; excludes the range, lower-bound/mixed-trajectory cases and the five simultaneous quantitative T/I cases; retains literal unit conversion; and accepts a larger exact value followed by a lower stable range. Independent calculation gives **n=25, median 1,786 ng/L, IQR 1,241–4,783 ng/L, range 593–2,484,000 ng/L**. This is a diagnostic comparison under a stated conservative rule, not a replacement analysis, a corrected dataset or approved publication content. It differs from the frozen target and must not be used to overwrite it.

The quantitative troponin export must stop. Under the supplied Phase 3A critical-invariant and publication-review requirements, browser-facing patient-record generation and publication remain held while the discrepancy is unresolved. The passing categorical checks can support the validation report and an empty interface scaffold; they do not waive the failed frozen check or authorize a public patient-level export.

The source workbook was not modified. Resolution requires a documented source adjudication or an explicitly approved methodological rule from the data owner, followed by rerunning the validation. No value should be edited merely to force agreement.

## Scientific and publication boundaries

This is a retrospective, literature-derived individual patient-level pooled analysis, with variable-specific denominators and reporting-related missingness. The 38/38 clinically MG-like phenotype is an inclusion characteristic. Absence of documented formal testing is not a negative study, and the AChR-positive subgroup does not supply paired physiological evidence. The broad exact interval for the four tested patients must remain visible when discussing 0/4. Needle EMG alone does not establish histological inflammation, and the observed mortality is not a population fatality estimate among ICI recipients.

No new clinical interpretation or external bibliographic claim was added during this review. The original workbook, narratives and source crosswalk must stay outside `public/`, `dist/` and deployed assets. Any eventual minimal pseudonymous export still requires the explicit publication review specified in the Phase 3A instructions.
