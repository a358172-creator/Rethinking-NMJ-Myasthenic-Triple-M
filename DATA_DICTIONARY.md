# Phase 3A data dictionary

This dictionary describes the workbook actually inspected with openpyxl, not a schema inferred from manuscript tables. The authoritative file is the unchanged `esearch_sources/Triple_M_Master_Patient_Dataset_Expanded_N38.xlsx`, the repository's documented equivalent of `research_sources/`.

The workbook contains `Master_Patient_Dataset_N38` (74 headers, 38 patient rows) and `Expansion_Series_Audit` (nine headers, 17 adjudication rows). Only the master sheet supplies cohort records. The secondary audit includes excluded and aggregate series and must never be appended to the cohort. Relevant source fields contain text categories; exact ages are numeric strings. Year cells are numeric, but year is not exported. No mapped formula or spreadsheet-error cells were found. Both `read_only=True, data_only=True` values and `read_only=True, data_only=False` formulas are checked.

## Source-to-model mapping

`normalization.py` is the sole category mapping implementation. Unexpected encodings fail validation rather than being coerced to missing or negative.

| Source column | Internal normalized field | Type and allowed values | Missingness convention | Interpretation limit / browser use |
| --- | --- | --- | --- | --- |
| `Patient_ID` | `source_id` | Nonempty string, unique across all 38 records | Missing or duplicate identifier fails | Private only; used for audit linkage and stable lexical ordering. Never exposed in a browser record. |
| `DOI` | `source_doi` | Nonempty string; strip whitespace and lowercase for distinct-source count | Missing DOI fails | Private only; 27 distinct publication keys. No inferred DOI or bibliographic reconstruction. |
| Physical master row | `source_row` | Integer, first patient row is 2 | Absent row link fails | Private only; one-to-one source-to-record correspondence. This is not a clinical date or ID. |
| `RNS_Performed` | `rns_status` | `performed`, `not_performed`, `not_reported`, `not_documented`, `unknown` | Exact `Not reported`/`NR` retains non-reporting; explicit `No` retains non-performance; empty means not documented | Exact `Yes` or `Yes (…)` means performed; `No (…)` includes explicitly deferred/logistical cases. Not used as an NMJ result. |
| `RNS_Result` | `rns_result` | `negative`, `abnormal`, `not_reported`, `not_documented` | Empty never becomes negative | The observed four tested results explicitly begin `Negative`. The quoted explanatory tails are not browser content. |
| `SFEMG_Performed` | `sfemg_status` | Same availability values as RNS | Same availability convention | One performed patient belongs to the same RNS-tested subset; never an additional fifth formal patient. |
| `SFEMG_Result` | `sfemg_result` | Same formal-result values as RNS | Same result convention | The one performed result is explicitly negative. Conventional EMG is kept separate even when performed within this study. |
| `RNS_Performed` union `SFEMG_Performed` | `formal_nmj` | Boolean | False means formal testing not documented; it does not establish a negative result | Derived only from explicit test availability. Browser `formalNmj` is `documented` or `not_documented`. |
| `Objective_NMJ_Category` | `nmj_evidence` | `formal_negative`, `indeterminate_qualitative`, `not_documented` | Source D category explicitly combines not tested and not reported; an unrecognized/empty category fails | `B. OBJECTIVE NMJ NEGATIVE` → formal negative; C → qualitative indeterminate; D → not documented. Availability remains a separate variable. Four B, two C, 32 D. |
| `EMG_Conventional_Performed` | `needle_status` | Same five availability values | Preserve explicit deferred/non-performance separately from non-reporting internally | Eleven `Yes`/`Yes (…)` records. Needle EMG cannot be counted as RNS or SFEMG. |
| `EMG_Interpretation` | `needle_emg` | `myopathic`, `neuropathic`, `normal`, `indeterminate`, `not_reported`, `not_performed`, `not_documented` | `Not reported`, `Not performed`, deferred and empty retain distinct cautious statuses | Prefix `Miopático` → myopathic, `Neuropathic pattern` → neuropathic, `Normal / Negative` → normal, `Indeterminate (` → indeterminate. Use the prespecified interpretation; never match the word “myopathic” inside a negative sentence. The mixed myopathic/polyneuropathic record remains in the source's primary myopathic class. |
| `AChR_Performed` | `achr_status` | Same five availability values | Explicit unperformed and unreported retain their distinction | A documented positive/negative result must correspond to performed testing. Thirty tested, eight not documented in the browser. |
| `AChR_Positive` | `achr_result` | `positive`, `negative`, `not_reported`, `not_documented`, `unknown` | Eight source results are `Not reported`; empty remains not documented | Explicit `Yes`/`Yes (…)` → positive; `No (Negative)` or the explicit negative threshold entry beginning `No (<` → negative. Do not independently reinterpret titers or reference thresholds. |
| `Outcome_Survival` | `vital_status` | `death`, `survival`, `unknown` | Source `Not clearly reported (index case presentation)` → unknown; no outcome inferred from treatment or disposition | Source prefix `DIED (` or `Survived …` defines documented status. Sixteen deaths, 21 survivors, one unknown. All-patient denominator 38; known-vital-status denominator 37. |
| `Age` | `age` | Finite number or null | Entirely numeric strings/numeric cells accepted; `NR`, `70s`, `80s`, `Late 70s` and any qualitative/range text excluded | n=28. No midpoint/decade imputation. Internal descriptive check only, never browser-exported. |
| `Troponin_Max` | `troponin.value_ng_l`, `troponin.status`, `troponin.reason` | Number/null; `quantitative`, `not_reported`, `qualitative_only`, `ambiguous` | No missing, qualitative, interval, censored, unitless peak or mixed-assay selection is imputed | Unit conversions: ng/L ×1; pg/mL ×1; ng/mL ×1000. Explicit supported temporal single-assay maximum retained. Quantitative competing T/I results require an author-approved assay selection rule. Internal diagnostic calculation only; frozen descriptive targets fail under these rules. |
| `LVEF_Reduced` | `lvef` | `reduced`, `preserved`, `not_documented`, `unknown` | `Not reported`/empty → not documented | Source Yes → reduced, No → preserved. Categorical field is authoritative; do not infer categories from numeric thresholds in `LVEF`. Includes pre-existing dysfunction and cannot establish new ICI injury. Internal descriptive check only, never browser-exported. |
| `MG_Phenotype` | `mg_phenotype` | Availability-like explicit-Yes marker | Unknown/unreported never becomes included | All 38 have an explicit source `Yes (…)` inclusion phenotype. This is a selection characteristic, not population prevalence or an NMJ diagnosis. Narrative tails are not exported. |

`RNS_Finding_Type`, `EMG_Result`, `LVEF`, titers, treatment fields and source notes can describe source context, but they are not browser fields and are not used to infer missing results. All remaining workbook columns are excluded from the minimal atlas representation. The pipeline does not export age, sex, cancer, ICI regimen, country, clinical dates, hospital identifiers, free-text notes, titers, publication keys or granular clinical combinations.

## Proposed minimal review schema

No patient review artifact is currently generated: the full frozen-validation gate fails on troponin. The following is the schema implemented for a future successful rerun, not substitute or sample cohort data.

Envelope keys are `schemaVersion: 1`, `validation: {passed: true, sourceSha256, validatedAt}`, and `records`. The source fingerprint and validation timestamp are restricted review metadata; they do not confer publication approval.

| Record field | Allowed values | Meaning |
| --- | --- | --- |
| `label` | `Case 01` through `Case 38` | Pseudonymous deterministic label assigned after lexical sorting of source IDs. Stable for an unchanged frozen identifier set, independent of workbook row order. Changes to identifiers/cohort require crosswalk review. |
| `achr` | `positive`, `negative`, `not_documented` | Source serology only; no titer or implied functional transmission diagnosis. |
| `formalNmj` | `documented`, `not_documented` | Explicit RNS/SFEMG availability; missing is not negative. |
| `nmjEvidence` | `formal_negative`, `indeterminate_qualitative`, `not_documented` | Separate source evidence category; qualitative evidence does not become formal confirmation. |
| `needleEmg` | `myopathic`, `neuropathic`, `normal`, `indeterminate`, `not_documented` | Conventional needle EMG interpretation only; unavailable evaluations are coarsened cautiously. |
| `vitalStatus` | `death`, `survival`, `unknown` | Documented outcome only; preserve the unknown denominator. |

The separate ignored private crosswalk contains only `label`, `sourceId`, `sourceRow`, `sourceDoi`, plus restricted validation metadata. It is never a browser import. Pseudonymization alone is not sufficient publication authorization; even this minimal categorical combination requires explicit author review before public inclusion.

## Scientific limits

The study is a retrospective literature-derived individual patient-level pooled analysis from published cases. Missingness is publication/extraction-based and variable-specific. Serological positivity is not independently demonstrated NMJ transmission failure; absent formal testing is not a formally negative study. Needle myopathy is not alone histological confirmation. Observed mortality does not estimate the population fatality risk among all ICI recipients. These categories support evidence description, not diagnostic classification, causal inference, sensitivity/specificity or treatment-effect estimates.
