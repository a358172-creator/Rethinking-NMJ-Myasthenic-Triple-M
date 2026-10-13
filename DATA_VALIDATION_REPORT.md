# Phase 3A data validation report

Executed at: 2026-10-13T03:50:56+00:00.

**Overall frozen validation: FAIL — publication gate closed.**
Core categorical and integrity checks: PASS. Required checks: 44/48 passed.

The authoritative workbook is now present in the documented `esearch_sources/` equivalent. This replaces the former workbook-availability blocker with executed ingestion and validation. The original workbook was opened read-only and was not corrected, imputed or rewritten.

## Executed checks

Expected values are independent frozen targets, never replacement patient records. Confidence intervals use two-sided exact Clopper–Pearson calculations (`scipy.stats.beta`). Quartiles use inclusive linear interpolation. Percentages and interval bounds are rounded to one decimal for comparison.

| Check | Export dependency | Expected | Observed | Status |
| --- | --- | --- | --- | --- |
| Authoritative master sheet | integrity | "Master_Patient_Dataset_N38" | "Master_Patient_Dataset_N38" | PASS |
| Unique complete source header mapping | integrity | [] | [] | PASS |
| Mapped formula cells (cache reliability) | integrity | 0 | 0 | PASS |
| Mapped spreadsheet error cells | integrity | 0 | 0 | PASS |
| Source patient rows | integrity | 38 | 38 | PASS |
| All source rows normalized without inferred categories | integrity | 38 | 38 | PASS |
| No rows duplicated/dropped during processing | integrity | 38 | 38 | PASS |
| Normalized patient records | integrity | 38 | 38 | PASS |
| Unique patient identifiers | integrity | 38 | 38 | PASS |
| Unique source publications (DOI stripped/lowercased) | integrity | 27 | 27 | PASS |
| Source-to-record row mapping is one-to-one | integrity | true | true | PASS |
| MG-like phenotype inclusion characteristic | integrity | 38 | 38 | PASS |
| AChR tested / positive / negative / not documented | core categories | [30, 11, 19, 8] | [30, 11, 19, 8] | PASS |
| AChR performed/result consistency | core categories | 0 | 0 | PASS |
| AChR positivity (%) | core categories | 36.7 | 36.7 | PASS |
| AChR exact 95% CI (%) | core categories | [19.9, 56.1] | [19.9, 56.1] | PASS |
| Formal RNS union SFEMG patients | core categories | 4 | 4 | PASS |
| RNS patients | core categories | 4 | 4 | PASS |
| SFEMG patients | core categories | 1 | 1 | PASS |
| SFEMG contained in RNS subset (no fifth patient) | core categories | true | true | PASS |
| Formal test availability equals source union | core categories | true | true | PASS |
| Performed RNS/SFEMG results explicitly negative | core categories | true | true | PASS |
| Objective abnormality among formally evaluated | core categories | [0, 4] | [0, 4] | PASS |
| Objective NMJ exact 95% CI (%) | core categories | [0.0, 60.2] | [0.0, 60.2] | PASS |
| Objective NMJ evidence categories | core categories | {"formal_negative": 4, "indeterminate_qualitative": 2, "not_documented": 32} | {"formal_negative": 4, "indeterminate_qualitative": 2, "not_documented": 32} | PASS |
| Formal-negative category requires a documented formal negative test | core categories | true | true | PASS |
| Qualitative indeterminate evidence lacks formal confirmation | core categories | 0 | 0 | PASS |
| AChR-positive / formal NMJ overlap | core categories | 0 | 0 | PASS |
| Conventional needle EMG evaluated / not documented | core categories | [11, 27] | [11, 27] | PASS |
| Needle EMG categories among evaluated | core categories | {"myopathic": 6, "neuropathic": 1, "normal": 1, "indeterminate": 3} | {"myopathic": 6, "neuropathic": 1, "normal": 1, "indeterminate": 3} | PASS |
| Needle EMG performed/interpretation consistency | core categories | 0 | 0 | PASS |
| Myopathic needle EMG (%) | core categories | 54.5 | 54.5 | PASS |
| Needle EMG exact 95% CI (%) (audit) | core categories | [23.4, 83.3] | [23.4, 83.3] | PASS |
| Vital status categories | core categories | {"death": 16, "survival": 21, "unknown": 1} | {"death": 16, "survival": 21, "unknown": 1} | PASS |
| Mortality all patients (%) | core categories | 42.1 | 42.1 | PASS |
| Mortality known vital status denominator | core categories | 37 | 37 | PASS |
| Mortality known vital status (%) | core categories | 43.2 | 43.2 | PASS |
| Mortality all exact 95% CI (%) (audit) | core categories | [26.3, 59.2] | [26.3, 59.2] | PASS |
| Strictly numeric ages n | non-exported descriptive | 28 | 28 | PASS |
| Age median (years) | non-exported descriptive | 71.0 | 71.0 | PASS |
| Age IQR (years) | non-exported descriptive | [66.5, 78.0] | [66.5, 78.0] | PASS |
| Age range (years, audit) | non-exported descriptive | [42.0, 86.0] | [42.0, 86.0] | PASS |
| Supported quantitative peak troponin n | non-exported descriptive | 33 | 25 | FAIL |
| Troponin median (ng/L) | non-exported descriptive | 1506.0 | 1786.0 | FAIL |
| Troponin IQR (ng/L) | non-exported descriptive | [1028.0, 3891.0] | [1241.0, 4783.0] | FAIL |
| Troponin range (ng/L, audit) | non-exported descriptive | [498.0, 162000.0] | [593.0, 2484000.0] | FAIL |
| Categorical LVEF | non-exported descriptive | {"preserved": 21, "reduced": 5, "not_documented": 12} | {"preserved": 21, "reduced": 5, "not_documented": 12} | PASS |
| Original workbook unchanged during ingestion | integrity | true | true | PASS |

Integrity and core-category checks support the six minimal browser record fields. Age, troponin and LVEF are explicitly non-exported descriptive validations. The current pipeline requires every frozen check to pass before producing its local review export; a passing core subset alone does not declare the full study validated.

## Discrepancies and source ambiguities

- Supported quantitative peak troponin n: expected 33; observed 25. Exclude censored, interval, unitless-peak and competing numeric-assay entries; preserve literal unit conversions
- Troponin median (ng/L): expected 1506.0; observed 1786.0.
- Troponin IQR (ng/L): expected [1028.0, 3891.0]; observed [1241.0, 4783.0].
- Troponin range (ng/L, audit): expected [498.0, 162000.0]; observed [593.0, 2484000.0]. Source ng/mL cannot silently become ng/L

Observed AChR/formal-NMJ cross-tabulation (source records, not aggregate reconstruction):

| AChR category | Formal testing documented | Formal testing not documented | Total |
| --- | ---: | ---: | ---: |
| Positive | 0 | 11 | 11 |
| Negative | 4 | 15 | 19 |
| Not documented | 0 | 8 | 8 |

Troponin parsing status: {"ambiguous": 8, "not_reported": 1, "qualitative_only": 4, "quantitative": 25}.

- censored concentration or trajectory: 2 source entry/entries.
- multiple assays without a selection rule: 5 source entry/entries.
- range without an exact peak: 1 source entry/entries.

Source concentrations explicitly labeled ng/mL convert literally to a maximum of 2,484,000 ng/L. The audit's frozen upper range is 162,000 ng/L, checked separately above. The pipeline retains the source unit and never silently changes ng/mL to ng/L.

Source intervals, lower bounds, unitless peak text and rows giving quantitative T and I assay results lack a sufficient exact peak/assay selection rule. The audit does not document how it resolved these entries. Clinical/source-author adjudication is required.

The audit also records a secondary troponin mean/SD difference from its manuscript (8,305.78±28,037.83 versus audited 8,349.51±28,028.10). This pipeline does not reconstruct or validate a mixed-assay mean by adopting those undocumented extraction choices.

Other preserved ambiguities: explicit non-performance differs from non-reporting internally; the browser safely coarsens both to not documented. The mixed myopathic/polyneuropathic needle case follows the frozen source's primary myopathic interpretation. LVEF categories include pre-existing dysfunction and do not establish ICI causality. Vital status follows the documented outcome prefix, never a narrative inference (including discharge/hospice wording).

## Publication boundary

A private audit artifact and, where source IDs are unique, a provenance crosswalk are retained only in ignored `esearch_sources/_processed/`. They contain no additional published approval. Raw identifiers, source DOI, workbook metadata and record provenance are never bundled into the UI.

No browser-facing patient dataset was generated. Any stale `atlas.review.json` is removed on failure. The patient matrix must remain behind the data-validation/publication gate; aggregate context may still be displayed.

No source correction, publication approval, Git commit, push or deployment was performed. See `docs/atlas-data-review.md` for the explicit review process and rerun instructions.

## Scope of this report

This report records only the executed Python ingestion and numerical checks above. Python regression tests, frontend build/lint/browser checks and production exclusion checks are reported separately by the delivery workflow; their success is not implied here.
