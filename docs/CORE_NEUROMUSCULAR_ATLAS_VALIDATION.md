# Independent core neuromuscular atlas validation

Specification identifier: `six-field-neuromuscular-atlas`. Version: **1.0.0**. Effective for Phase 3A.2 review on 13 October 2026. Implementation: `scripts/atlas/core_validation.py`; shared categorical mappings: `scripts/atlas/normalization.py:normalize_core_row`. Any approved change to cohort membership, source identity, categorical mapping, prerequisite or target requires a documented new specification and source version, followed by complete revalidation.

The scoped numerical checks reproduce the frozen source. **CORE_ATLAS_VALIDATION remains FAIL** because targeted provenance has not established both linked clinical case mappings or resolved possible source misattribution/duplication and categorical contradictions. See [the targeted provenance review](CORE_ATLAS_PROVENANCE_REVIEW.md) and [the executed aggregate report](CORE_ATLAS_VALIDATION_REPORT.md). Agreement with 38 source rows and 27 DOI keys does not establish 38 clinically distinct patients or 27 correctly attributed source publications.

## Independent scientific scope

This workflow describes documented neuromuscular evidence and vital status in the existing, predeclared N=38 literature-derived cohort. The justification for the scope is that serology, formal physiological testing, objective NMJ evidence and conventional needle EMG have distinct evidentiary meanings and denominators. Vital status is a documented descriptive endpoint. These questions can be evaluated without choosing a cardiac biomarker assay, converting an unresolved unit or defining a peak troponin observation.

Only the following six fields may enter a future authorized patient browser representation. The current command produces no such representation.

| Browser field | Allowed values | Scoped source inputs and rule |
| --- | --- | --- |
| `label` | `Case 01` through `Case 38` | Deterministic numbering after lexical sorting of the actual unique `Patient_ID` strings. The existing private crosswalk must reproduce every label, physical row and source identity exactly. Labels contain no source identifiers. |
| `achr` | `positive`, `negative`, `not_documented` | Explicit `AChR_Performed` plus `AChR_Positive`; performed/result agreement is mandatory. Unavailable results are coarsened to not documented. No titer inference. |
| `formalNmj` | `documented`, `not_documented` | Explicit `RNS_Performed` union `SFEMG_Performed` on the actual patient identities. Needle EMG never supplies formal NMJ availability. |
| `nmjEvidence` | `formal_negative`, `indeterminate_qualitative`, `not_documented` | Explicit `Objective_NMJ_Category`, checked against performed `RNS_Result`/`SFEMG_Result`. Qualitative indeterminate evidence remains separate from formal testing. |
| `needleEmg` | `myopathic`, `neuropathic`, `normal`, `indeterminate`, `not_documented` | Explicit `EMG_Conventional_Performed` plus `EMG_Interpretation`. The source's recorded primary myopathic interpretation is retained for the mixed case. Missing availability never supplies an interpretation. |
| `vitalStatus` | `death`, `survival`, `unknown` | Explicit recorded `Outcome_Survival` category. Unknown status remains unknown and outside the known-outcome denominator. No inference from treatment, disposition or narrative elsewhere. |

Private linkage additionally requires `Patient_ID`, `DOI` and the physical master row. DOI normalization is surrounding-whitespace removal and lowercase only; missing DOI is an error. Private availability keeps `performed`, `not_performed`, `not_reported`, `not_documented` and `unknown` distinct. Missing result states remain missing. The future six-field projection may coarsen unavailable evaluations to `not_documented`; this never turns them into negative findings.

The independent loader maps exactly these 12 headers: `Patient_ID`, `DOI`, `RNS_Performed`, `RNS_Result`, `SFEMG_Performed`, `SFEMG_Result`, `EMG_Conventional_Performed`, `EMG_Interpretation`, `Objective_NMJ_Category`, `AChR_Performed`, `AChR_Positive`, `Outcome_Survival`. It loads only these field columns after inspecting the header. It processes every physical master data row, including incomplete rows, and never appends the secondary audit sheet.

Troponin, CK, age, LVEF, demographics, cancer, treatment, dates, clinical narratives, detailed publication records and all other workbook columns are outside this representation and categorical parser. A biochemical parsing discrepancy is not a core warning. The full-study workflow continues to evaluate its own unchanged requirements and reports its troponin failures as FAIL.

## Mandatory numerical requirements

The expected values below are the frozen independent targets. They are comparisons against actual row mappings, never a recipe for synthesizing rows or editing observations.

| Requirement | Expected |
| --- | --- |
| Actual normalized source patient records | 38 |
| Unique patient identifiers; one-to-one physical row mapping | 38; exact correspondence |
| Unique source publications after canonical DOI normalization | 27 |
| AChR performed / positive / negative / not documented | 30 / 11 / 19 / 8 |
| AChR availability agrees with explicit positive or negative result | Every record |
| Unique RNS and/or SFEMG evaluated patients | 4 |
| RNS performed patients | 4 |
| SFEMG performed patients | 1, nested in the RNS set |
| Formal availability matches RNS/SFEMG union | Every actual row and identity set |
| Abnormal formal NMJ patients / evaluated | 0 / 4 |
| Performed RNS/SFEMG studies have explicit negative results | Every performed study |
| Unperformed formal studies with an assigned negative or abnormal result | 0 |
| Formal-negative / qualitative-indeterminate / no documented objective NMJ evidence | 4 / 2 / 32 |
| Formal-negative category corresponds to an explicitly negative performed formal study | Every record |
| Qualitative indeterminate category with formal confirmation | 0 |
| AChR-positive and formally evaluated patient overlap | 0 |
| Conventional needle EMG evaluated / not documented | 11 / 27 |
| Needle interpretations among evaluated: myopathic / neuropathic / normal / indeterminate | 6 / 1 / 1 / 3 |
| Needle availability agrees with documented interpretation | Every record |
| Documented deaths / survivors / unknown vital status | 16 / 21 / 1 |
| Known vital status denominator | 37; full cohort denominator 38 |

Union and overlap checks compare actual private patient identities. SFEMG is counted inside the formal union; it does not create a fifth patient. A formally negative category requires both explicit performed status and an explicit negative result. AChR-positive patients without formal evaluation provide unpaired evidence; they do not supply negative physiology. No category can be filled to meet a total.

These are descriptive denominators from selected published cases. Serological positivity does not establish transmission failure; conventional needle myopathy does not establish histological inflammation; zero abnormalities among four evaluated patients is imprecise evidence. Mortality is not a population fatality estimate. The full study retains its confidence intervals and descriptive analyses; this core validator does not expand the browser schema to reproduce them.

## Mandatory source-integrity requirements

1. The authoritative, read-only source is `esearch_sources/Triple_M_Master_Patient_Dataset_Expanded_N38.xlsx`, sheet `Master_Patient_Dataset_N38`. Its frozen SHA-256 is `d6ced420d83eb046559ea445422ea7a838990989ab535a2f4530ef40db674fcb`. The digest must match before scoped ingestion and remain unchanged afterward. The command never saves the workbook.
2. Every scoped input header occurs exactly once. Every physical data row is processed, and all 38 normalize without an inferred category or silent row drop. An unexpected encoding, missing source identity or invalid category fails validation.
3. Values and formula cell types are inspected separately. Any scoped formula is rejected because cached-value freshness is not established. Any scoped spreadsheet-error cell is rejected. Excluded fields are not parsed as scientific prerequisites; the immutable-source digest still covers the whole original workbook.
4. Unique source identifiers and private physical rows must preserve exact source-to-record correspondence. Identical categorical combinations do not by themselves identify duplicate patients. Conversely, distinct IDs or DOI keys do not prove clinical distinctness.
5. The existing `atlas.provenance.private.json` must be versioned, bound to this exact source digest and reproduce the deterministic label/ID/row/DOI crosswalk for all actual records. This is internal mapping verification; it does not independently verify every primary publication's clinical assertions. The original crosswalk is read and is never rewritten by the core command. Its full-study `validationPassed: false` remains intact.
6. The additional private targeted Siu review must bind the exact frozen Siu mapping and its linked source mapping to this same workbook digest. It must retain primary-source evidence locations and facts, establish the correct case identity/source attribution for both mappings, resolve the possible duplicate and reconcile category disagreements. The current review has `REQUIRES_AUTHOR_REVIEW`, unverified mappings, unresolved possible duplication and unresolved categorical disagreements; these are blocking failures.
7. Resolution requires a versioned review with `status: RESOLVED`, `mappingVerified: true`, `linkedSourceMappingsVerified: true`, `potentialDuplicateResolved: true`, `categoricalDisagreementsResolved: true`, `authorDecisionRequired: false`, no unresolved questions and no proposed unauthorized membership change. These fields record a completed evidenced review; they are not permission to flip flags or correct a record to force PASS. The code has no approval or recoding switch. If the author approves a source/category/membership correction, preserve this workbook and all prior adjudication records, create the approved new source/specification version, and rerun all applicable validations.

The targeted private artifact is `esearch_sources/_processed/core_atlas/siu_provenance_review.private.json`. Its exact IDs, DOI crosswalk, physical rows, publication text and evidence remain private. The public-safe review describes the questions without reproducing patient mappings.

## Mandatory processing-privacy requirements

The private crosswalk and targeted provenance artifact must be inside the ignored `esearch_sources/_processed/` area, untracked, regular files rather than symbolic links, and owner-only (`0600`). The core validator reads these inputs and generates only aggregate metadata and a Markdown report. It checks that the prior browser review export `atlas.review.json` remains absent and that the representation whitelist remains exactly the six fields above.

No patient records, crosswalk, source row list, raw IDs, source DOI, clinical text or review evidence may appear in the generated status JSON. The aggregate outputs carry the specification/schema version, source fingerprint, validation time, separate statuses and aggregate checks. They cannot overwrite a workbook, private provenance input or any research-source path. No endpoint, development server, browser dataset, downloadable data file or production asset is created.

Pseudonymous labels do not establish anonymization. Rare combinations, the single SFEMG case, the unknown outcome and ordinal labels derived from source-ID order may permit linkage to published cases. Scientific source validation is distinct from an author-reviewed disclosure/privacy assessment of the exact proposed serialization and mapping. No disclosure approval exists. The exact future export, field order, envelope, linkage handling and re-identification review must be approved before an export workflow is activated; see the [release and privacy review](CORE_ATLAS_PRIVACY_AND_RELEASE_REVIEW.md).

## Validation and authorization remain separate

| Status | Rule and current state |
| --- | --- |
| `FULL_STUDY_VALIDATION` | The full workflow evaluates every unchanged frozen check. Its executed, source-bound audit remains FAIL with four troponin discrepancies. The core workflow only summarizes that audit for status reporting; it does not filter its failures to define this scope. |
| `CORE_ATLAS_NUMERICAL_VALIDATION` | All independently authored core numerical rules must pass. Current numerical reproduction: PASS. This supplementary diagnostic status does not attest provenance or authorize release. |
| `CORE_ATLAS_VALIDATION` | All scoped numerical, ingestion, source-integrity, targeted provenance and processing-privacy prerequisites must pass. Current state: FAIL because linked source questions remain unresolved. |
| `CORE_ATLAS_PUBLICATION_APPROVAL` | PENDING until the research author inspects and explicitly approves the exact proposed disclosure. Core PASS alone cannot change this status. |
| `CORE_ATLAS_PRIVATE_PREVIEW_APPROVAL` | PENDING until the exact proposed local preview and records are explicitly permitted. No patient-dependent component is enabled by numerical/core PASS alone. |
| `CORE_ATLAS_EXPORT_POLICY` | NOT_ACTIVATED. The prior full-study-gated export policy remains in force. The new command has no patient exporter or activation option. |

The separate status architecture is preparation for author review. It neither silently changes `process_workbook.py`'s full-study export gate nor authorizes patient records in a browser. A future independently scoped export workflow requires author approval of a concrete policy change as well as source resolution, scientific validation and the relevant preview/publication approval. Private-preview approval and public-publication approval have separate destinations and scope; neither is inferred from the other.

Success in this core domain cannot validate the entire manuscript, biochemical extraction, cardiac analysis or dependent statistical tests. Existing Phase 3A statements about a passing categorical subset refer to numerical reproduction, not the new complete source-integrity decision.

## Reproduction and regression requirements

```bash
npm run data:validate:check
npm run data:validate:core
.venv/bin/python -m unittest discover -s scripts/atlas/tests -v
npm run test:release-policy
```

The full check-only command writes the new `docs/FULL_STUDY_REVALIDATION_REPORT.md` and an ignored aggregate audit without rewriting the historical report, crosswalk or adjudication files, generating records or invoking export revocation. The core command reads this new audit for separate full-study status reporting and writes `docs/CORE_ATLAS_VALIDATION_REPORT.md` and `docs/CORE_ATLAS_VALIDATION_STATUS.json`, containing aggregate checks only. `--report` and `--status` may select safe review destinations. It exits 1 while any prerequisite is unresolved. The full command still exits 1 on its unchanged troponin checks. The legacy `data:validate` command and its complete full-study export gate remain unchanged. Test success verifies detection of these blocked states; it is not a scientific PASS.

Regressions exercise the actual workbook's scoped numerical rules, patient-identity testing union, AChR/formal overlap, forced missing-to-negative errors, unknown vital status, duplicate IDs/rows, exact crosswalk and source hash, scoped formulas/errors, excluded biochemical parsing, all linked provenance resolution conditions, aggregate-only outputs and separate pending release gates. Small temporary fixtures test failure paths only; they are never UI examples or a substitute cohort. Authoritative-input tests skip if the private workbook is absent; a skipped test is not validation evidence.

Frontend lint, type checking, tests, production build, publication-exclusion verification and Git integrity checks are separate delivery checks reported in the phase review. No patient-level matrix/filter/profile/missingness interaction may be claimed tested until actual records are lawfully loaded into an explicitly approved private preview.
