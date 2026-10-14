# Phase 3A.2 delivery — scientific reconciliation and independent scope

14 October 2026. Prepared for author review; scientific and release gates remain closed.

The two requested workstreams are prepared. The troponin amendment is a proposal, and the independent core workflow reproduces the categorical workbook results. Complete core validation nevertheless fails mandatory source-provenance prerequisites. Neither the whole study nor the patient atlas is declared fully validated. No patient preview or release has been enabled.

## 1. Scientific reconciliation and manuscript proposal

[TROPONIN_MANUSCRIPT_AMENDMENT_PROPOSAL.md](TROPONIN_MANUSCRIPT_AMENDMENT_PROPOSAL.md) contains precise proposed English replacements for Methods 2.4/2.9, Results 3.3/3.7, both troponin rows of Table 2, both troponin subgroup rows of Supplementary Table S2 and its footnote, Discussion 4.4 and Limitations 4.8. It separates verified documentary findings, recommended decisions and unresolved evidence.

The recommended immediate amendment withdraws the unsupported pooled peak-troponin distribution and the AChR/vital-status troponin comparisons, including their dependent group counts, summaries, U statistics, p values and nonsignificance claims. Source-reported elevation and qualitative-only counts also need source adjudication before they can be certified. No replacement quantitative cohort or statistic is asserted. The diagnostic n=25 calculation is not an amended result.

A later quantitative alternative requires an approved protocol preserving original values/units, separate cTnI/cTnT/unknown analytes and assay platforms, presentation observations versus serial maxima versus explicit peaks, and intervals/censoring. Disputed or absent units cannot be converted; unlabeled curves cannot supply exact values. Reference-limit multiples require valid source-specific measurement/assay/limit pairing and do not automatically harmonize assays. Source-reported elevation does not independently certify myocardial injury or ICI myocarditis. The original 33-case extraction vector/code remains missing.

The frozen manuscript and workbook are unchanged. The proposal does not change unrelated frozen endpoints or approve patient disclosure.

## 2. Independent core specification and exact results

[CORE_NEUROMUSCULAR_ATLAS_VALIDATION.md](CORE_NEUROMUSCULAR_ATLAS_VALIDATION.md), version 1.0.0, independently defines the six-field scope and its scientific, ingestion, identity, source-mapping and processing-privacy prerequisites. It does not obtain PASS by dropping failures from the full-study check list. The proposed fields are `label`, `achr`, `formalNmj`, `nmjEvidence`, `needleEmg` and `vitalStatus`; biochemical values, demographics, treatment, dates and detailed publication records are excluded from browser records.

The new core loader reads the actual scoped worksheet columns. Shared categorical normalization preserves missingness; the core loader does not invoke biochemical parsing. Source/row/ID/hash checks and private-crosswalk comparison remain mandatory. Unique IDs and DOI strings are internal integrity results, not proof of clinical distinctness or correct publication attribution.

| Status | Executed result |
| --- | --- |
| `FULL_STUDY_VALIDATION` | **FAIL — 44/48** unchanged frozen checks pass; four troponin checks fail. |
| `CORE_ATLAS_NUMERICAL_VALIDATION` | **PASS** for the independently specified numerical rules. |
| `CORE_ATLAS_VALIDATION` | **FAIL — 44/46** scoped prerequisites pass; two linked-provenance checks fail. |
| `CORE_ATLAS_PUBLICATION_APPROVAL` | **PENDING**. |
| `CORE_ATLAS_PRIVATE_PREVIEW_APPROVAL` | **PENDING**. |
| `CORE_ATLAS_EXPORT_POLICY` | **NOT_ACTIVATED**; the legacy full-study export gate remains active. |

[The exact core report](CORE_ATLAS_VALIDATION_REPORT.md) and [aggregate status JSON](CORE_ATLAS_VALIDATION_STATUS.json) record all 46 prerequisite checks. Numerical reproduction from frozen records is:

| Domain | Observed |
| --- | --- |
| Cohort/source keys | 38 records, 38 unique source IDs, 27 canonical publication keys. |
| AChR | 30 tested: 11 positive, 19 negative; eight not documented. |
| Formal NMJ | Four unique RNS/SFEMG patients; one SFEMG nested within those four; zero abnormal studies among four evaluated. |
| NMJ evidence | Four formal negative, two qualitative indeterminate, 32 not documented. |
| AChR-positive/formal overlap | Zero. |
| Conventional needle EMG | 11 evaluated: six myopathic, one neuropathic, one normal, three indeterminate; 27 not documented. |
| Vital status | 16 deaths, 21 survivors, one unknown; 37 known-status records. |

Missing, unperformed and unreported tests never become negative findings. Unknown vital status remains distinct. Full-study status is reported from a separate source-bound audit; it is not the definition of the core numerical rules.

## 3. Unresolved source questions

[CORE_ATLAS_PROVENANCE_REVIEW.md](CORE_ATLAS_PROVENANCE_REVIEW.md) documents the targeted Siu review and linked Gómez source concern. Accessible original Siu abstract/disclosures describe seven presented patients and do not substantiate the extraction's one-original/six-reviewed classification. Complete original case material is still required. The linked original report raises source attribution, possible duplication and categorical disagreements. Clinical similarity alone has not been treated as proof of duplication.

Two required checks therefore fail: resolution of linked source identity/possible duplication/category disagreements, and resolution of the Siu mapping without unauthorized membership changes. These are scientific source-integrity failures, not release warnings.

The author must identify the exact original Siu case/page/table; establish original versus reviewed cases; document whether the linked entries are distinct; and reconcile case-specific AChR testing, formal NMJ findings, needle EMG and vital status under a consistent follow-up endpoint. Exact identifiers, cells, primary locations and disputed facts are in the new ignored `esearch_sources/_processed/core_atlas/siu_provenance_review.private.json` and Markdown companion. No membership, category or source reassignment was applied.

## 4. Privacy and release checklist

[CORE_ATLAS_PRIVACY_AND_RELEASE_REVIEW.md](CORE_ATLAS_PRIVACY_AND_RELEASE_REVIEW.md) defines the exact six keys, allowed categories, proposed versioned serialization, source/artifact digest binding, private crosswalk and separate policy/preview/publication decisions. The present deterministic label ordering may permit linkage to published cases. An in-memory privacy diagnostic found 15 categorical profiles and seven singleton profiles; this is neither an anonymity guarantee nor a clinical result. Individual combinations remain private.

No checklist item is signed on the author's behalf. Any future core exporter/loader needs approval of a concrete versioned policy and implementation. The author must then inspect the exact proposed serialization and mapping before approving a specified private preview. Public disclosure additionally requires review of recognition risk, exact permitted metadata and destination, and explicit publication authorization. A private approval cannot authorize public release. Any push/deployment requires separate authorization.

The TypeScript approval contract binds scope/version/source/artifact metadata and rejects incomplete or incompatible decisions. It is a defensive display check, not authentication or an author-signature verifier. No exporter, loader, approval writer, patient endpoint or public tunnel was created.

## 5. Reusable components prepared for Phase 3B

The existing [atlas components](../src/features/atlas/) remain unmounted:

| Component | Prepared role |
| --- | --- |
| `PatientEvidenceAtlas` | Scoped private-preview gate and view coordination. |
| `EvidenceMatrix` / `EvidenceBadge` | Evidence rows and category labels. |
| `EvidenceFilters` | Five domain filters, reset and AChR-positive shortcut. |
| `PatientEvidenceProfile` | Selected evidence profile. |
| `MissingnessExplorer` | Full/filtered missingness counts and highlighting control. |
| `CohortSummary` / `FilteredEvidenceSummary` | Denominator-preserving full/filtered summaries. |
| `ScientificInterpretation` | Scoped interpretation and uncertainty. |
| `DataSourceMetadata` | Declared validation scope, separate study/core status and pending publication approval. |

Legacy v1 full-study and proposed v2 core dataset types have separate validation markers. No core-only success can masquerade as legacy `validation.passed:true`. There is no actual v2 dataset. Typechecking and metadata tests do not establish that actual-record matrix/filter/profile interactions work.

The public app retains the aggregate-only availability notice. Phases 1/2 still function. A public aggregate limitation now distinguishes reproduced totals from unresolved source/category attribution. No patient rows or substitute records appear in the website.

## 6. Executed verification and preservation

| Command/check | Result |
| --- | --- |
| `npm run data:validate:check` | Expected exit 1; 44/48 pass, the same four troponin failures. New aggregate outputs only. |
| `npm run data:validate:core` | Expected exit 1; 44/46 pass, exactly two unresolved provenance failures. |
| `npm run data:test` | **43 pass**, no skips/failures: 17 legacy, 22 core and four read-only-preservation regressions. |
| `npm run test:release-policy` | **10 pass**, no skips/failures; authorization metadata only, no patient fixtures. |
| `npm run typecheck` | PASS, also executed by the successful build. |
| `npm run lint` | PASS. |
| `npm run build` | PASS: TypeScript, Vite and publication exclusion. |
| Publication-exclusion verifier | PASS: four build files checked; all 38 available source identifiers checked for exclusion. |
| `npm test` | **49 pass**, one intentional desktop skip for the mobile-menu test; no failures. Includes desktop/mobile availability checks and Phase 1/2 regressions. |
| Playwright discovery after separating native Node tests | Same 50 browser cases in three files; metadata tests have a separate command. |
| `git diff --check` | PASS. |
| Preservation/permissions review | All 26 protected file digests unchanged; new private core files owner-only, ignored and untracked; no patient review export exists. |

The initial restricted build could not spawn Git (`EPERM`); the build and verifier passed after the required sandbox escalation. The browser run used the approved outside-sandbox local-test command. The server served the aggregate public build, not private patient records.

The unchanged original workbook/manuscript, historical `DATA_VALIDATION_REPORT.md`, original audit/crosswalk and all Phase 3A.1 adjudication artifacts are protected by a local digest manifest. The check-only full workflow writes [a new full-study report](FULL_STUDY_REVALIDATION_REPORT.md) and an ignored aggregate audit instead of rewriting those prior artifacts. It never invokes export or stale-export revocation. Its unchanged legacy validator still preserves the existing full-study gate. Regression coverage rejects report/audit collisions with workbook input, including custom inputs outside the research directory.

No commit, push, deployment, manuscript amendment, workbook correction, source-membership amendment, patient serialization or patient-dependent UI test was performed. Passing software checks confirms the implemented gates and public regressions; it does not convert scientific FAIL into PASS.

## 7. Exact next decisions and blockers

1. **Biochemical amendment:** approve the proposed withdrawal text and both dependent test removals, or provide a defensible analyte/platform/timepoint protocol plus original extraction evidence for a later computed amendment. Do not substitute diagnostic results or alter old targets.
2. **Core source integrity:** provide the missing original Siu material and resolve the linked identity, distinctness and category questions. Any necessary source/membership amendment needs evidence, explicit approval and a versioned derivative/specification; preserve this frozen workbook.
3. **Future private workflow:** after source resolution and complete core PASS, review and approve the concrete independent export/loader policy and exact artifact/access method. A local-only server must have no publicly accessible port forwarding or tunnel. Then run actual-record interactions and scientific/accessibility review.
4. **Public deployment:** review the exact public candidate for linkage risk and explicitly approve disclosure, destination and the required publication-boundary change; separately authorize any commit/push/deployment. None of those approvals exists now.

Private preview is blocked by core source FAIL, absent approved exporter/loader policy, absent exact approved serialization and pending preview authorization. Patient-data deployment is additionally blocked by pending public disclosure approval and the unchanged production exclusion boundary. Troponin failure continues to block full-study validation; the proposed independent architecture does not silently waive it.

## 8. Reproduce this phase

With the existing ignored Python environment and installed Node dependencies:

```bash
npm run data:validate:check
npm run data:validate:core
npm run data:test
npm run test:release-policy
npm run typecheck
npm run lint
npm run build
npm test
git diff --check
```

The two validation commands intentionally exit 1 while scientific prerequisites remain unresolved. Run them individually so those exits do not hide subsequent software checks. Ordinary `dev`/`preview` commands continue to serve the aggregate app; they are not patient-preview authorization or a private data procedure.
