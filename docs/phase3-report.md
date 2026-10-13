# Phase 3A delivery status

**Phase 3A is incomplete under the requested scientific stop condition.** The authoritative workbook is available and the processing foundation is implemented. All categorical/integrity, age and LVEF checks pass. Four quantitative troponin checks fail under documented conservative extraction rules, so no browser-facing patient dataset or 38-row visualization has been enabled.

The source workbook remains byte-identical. No source correction, patient-data publication, Git commit, push or deployment was performed.

## 1. Implemented features and blocked functionality

The local Python pipeline inspects the actual master sheet, headers, formulas/errors and input types; normalizes explicit source categories; preserves internal missingness distinctions; calculates exact binomial intervals and descriptive summaries; and writes a reproducible report. It generates restricted audit/provenance artifacts and prevents a browser export after any failed frozen check, including revoking a stale artifact on failed reruns.

Reusable React components are prepared for the evidence matrix, five domain filters, reset/AChR-positive shortcut, selected evidence profile, missing-evidence highlights, full/filtered summaries, scientific interpretations and validation metadata. They contain no patient records or data imports and remain **unmounted**. Typechecking does not establish that their actual-record interactions work.

The existing website now links to `#patients`, a clear availability notice with the requested atlas title/subtitle, missingness principle and validation/publication status. It loads no records and offers no inactive patient controls. Phases 1 and 2 remain the functioning interactive modules.

## 2. Data schema and source mappings

[DATA_DICTIONARY.md](../DATA_DICTIONARY.md) documents the inspected columns, normalization, allowed categories, missingness and interpretation limits. The proposed six-field browser record consists of `label`, `achr`, `formalNmj`, `nmjEvidence`, `needleEmg` and `vitalStatus`. There are no demographics, biomarkers, publication identifiers, free-text clinical notes or clinical dates in that representation.

The source columns are `AChR_Performed`/`AChR_Positive`, `RNS_Performed`/`SFEMG_Performed`, `Objective_NMJ_Category`, `EMG_Conventional_Performed`/`EMG_Interpretation` and `Outcome_Survival`. Raw `Patient_ID`, canonical DOI and physical source row remain in a separate ignored crosswalk. Labels are deterministic for the unchanged identifier set and independent of source row ordering. Neither the proposed schema nor a successful future validation would constitute publication approval.

## 3. Numerical validation

The executed pipeline has **44/48 required checks passing**. [DATA_VALIDATION_REPORT.md](../DATA_VALIDATION_REPORT.md) gives every expected/observed value and status. [The independent source review](phase3-source-review.md) confirms the results.

| Domain | Observed result | Status |
| --- | --- | --- |
| Cohort and source groups | 38 records; 38 unique IDs; 27 canonical source DOIs | PASS |
| AChR | 30 tested; 11 positive; 19 negative; 8 not documented; 36.7%, exact 95% CI 19.9–56.1% | PASS |
| Formal NMJ | Four unique RNS/SFEMG patients; 0/4 abnormal; exact 95% CI 0–60.2%; one SFEMG within those four | PASS |
| NMJ evidence | Four formal negative; two qualitative indeterminate; 32 without documented objective evidence | PASS |
| AChR/formal-NMJ overlap | No documented formal study among the 11 seropositive patients | PASS |
| Needle EMG | 11 evaluated: six myopathic, one neuropathic, one normal, three indeterminate; 27 not documented | PASS |
| Vital status | 16 deaths; 21 survivors; one unknown; 16/38 = 42.1%; 16/37 = 43.2% | PASS |
| Age | Numeric n=28; median 71; IQR 66.5–78 years | PASS |
| LVEF | 21 preserved; five reduced; 12 not documented | PASS |
| Troponin n/median/IQR/range | Frozen targets cannot be reproduced using supported exact peak/assay extraction and literal unit conversion | FAIL — export held |

For discrepancy diagnosis, exact unit-qualified single-assay values yield n=25, median 1,786 ng/L, IQR 1,241–4,783 ng/L and range 593–2,484,000 ng/L. These are **not replacement frozen results**. One range, two censored/trajectory entries, five simultaneous quantitative T/I entries and a literal ng/mL concentration require adjudication. Neither the manuscript nor audit supplies reproducible rules resolving them. The validation command intentionally exits 1.

## 4. Missing-data categories

Internal availability distinguishes `performed`, `not_performed`, `not_reported`, `not_documented` and `unknown`. Explicit negative/normal findings remain separate. Empty cells never become negative. For the minimal browser schema, unperformed/unreported results cautiously coarsen to “not documented”; vital status keeps “unknown.”

Formal NMJ availability is separate from the three source evidence categories: 34 patients lack a documented formal study, including two qualitative indeterminate cases and 32 without documented objective NMJ evidence. Conventional needle EMG is separate from RNS/SFEMG. The single SFEMG does not introduce a fifth formally evaluated patient.

## 5. Files created and modified

Created:

- `scripts/atlas/normalization.py`, `process_workbook.py`, pinned `requirements.txt` and `tests/test_validation.py`.
- `DATA_VALIDATION_REPORT.md`, `DATA_DICTIONARY.md`, `docs/atlas-data-review.md`, `docs/phase3-source-review.md` and this report.
- `src/data/atlasModel.ts` and `atlasCopy.ts`; the reusable components/styles in `src/features/atlas/`.
- `src/features/evidence/PatientAtlasAvailability.tsx` and `tests/phase3-gate.spec.ts`.

Modified:

- `src/App.tsx`, `src/data/locale.ts`, `src/data/science.ts` and `src/features/UpcomingModules.tsx` for the availability notice, navigation and corrected workbook-availability statement.
- `.gitignore`, `eslint.config.js`, `package.json` and `scripts/verify-publication.mjs` for restricted outputs, local commands and production exclusion checks.
- `README.md` and `docs/test-plan.md` for current scope, reproducibility and pending verification.

Ignored local artifacts include the source workbook, `.venv/`, private audit/crosswalk JSON and browser reports/screenshots. No browser review dataset exists. The deployment workflow and Vite base configuration are unchanged.

## 6. Executed verification

The numerical pipeline and Python regressions have executed against the actual workbook. The source fingerprint is unchanged. Typechecking, linting and the production build/publication check passed; the publication check inspected four build files and all 38 source identifiers available from private provenance.

Executed results:

- `npm run data:validate`: exit 1 as required; 44/48 frozen checks PASS, four troponin checks FAIL.
- `npm run data:test`: 17 tests PASS, no skips. Includes export revocation, directory/file permissions, actual source mapping and the detected troponin failure.
- `npm run lint`: PASS.
- `npm run build`: PASS, including TypeScript, Vite and the production publication boundary.
- `npm test`: 49 PASS, one intentional desktop skip for the mobile-only menu case, no failures. The two Phase 3 availability tests pass in desktop/mobile, alongside all Phase 1/2 regressions.
- `git diff --check`: PASS. Source SHA-256 matches the original; no review dataset exists; private directory mode is 0700 and both JSON files are 0600.

The first sandbox build could not spawn Git for the publication check, and the first browser run could not start its local server. Both checks completed after the required permission to run outside the sandbox. The interrupted browser approval itself was not counted as an execution. Desktop/mobile availability screenshots were inspected; they contain the review notice and no patient rows.

Patient-dependent filter combinations, 38-row rendering, row profiles and missingness interactions remain **unexecuted** because the full source-validation gate has not passed. No substitute records were used to claim those checks.

## 7. Scientific limitations

This is a retrospective, literature-derived individual patient-level pooled analysis of published cases, with heterogeneous testing, ascertainment/reporting bias and variable follow-up. Source grouping and row/ID uniqueness checks do not independently repeat the original literature duplicate adjudication.

The clinically MG-like phenotype in 38/38 is an inclusion characteristic. Serology alone is not demonstrated NMJ transmission failure. Undocumented formal testing is not a negative study; 0/4 has a broad exact interval and cannot exclude NMJ disease in the wider cohort. Needle myopathy alone is not histological confirmation. Documented mortality is not a population fatality estimate. No incidence, causal, diagnostic-performance or treatment-effect inference is supported.

## 8. Privacy and publication status

The workbook is ignored and outside public assets. Restricted JSON files use owner-only permissions, and the output directory is restricted to its owner. Private provenance includes raw IDs/DOIs only for local auditing and is never a browser import. The minimal categorical representation still requires explicit review because pseudonymization alone does not authorize publication.

The processing script requires all frozen checks to pass and has no category-only bypass. The production verifier rejects private source/export paths and record markers, and reads available private identifiers only to check their exclusion without printing them. It supplements review and is not a comprehensive privacy scanner.

[The review procedure](atlas-data-review.md) describes the exact adjudication and later publication steps. No public patient-data destination or deployment is authorized. Future activation requires both complete validation and the appropriate local/public review boundary.

## 9. Local preview and reproducibility

```bash
npm run dev
```

Open `http://localhost:5173/triple-m-neuromuscular-atlas/#patients`; in Codespaces forward port 5173 and append that path to the forwarded origin. It shows the availability notice, **not patient rows**. A production preview uses `npm run preview` and port 4173.

With Python 3.12+ and the local `.venv` installed from `scripts/atlas/requirements.txt`:

```bash
npm run data:validate
npm run data:test
```

The current numerical validation exits 1 and reports the troponin discrepancies. Private adjudication entries with the exact source row, ID and raw value are available only in ignored `esearch_sources/_processed/validation.audit.private.json`. This is the concrete local material for source-owner review. No development endpoint serves patient records.

## 10. Remaining Phase 3A and subsequent Phase 3B

First, the source owner must document supported troponin peak/assay selection, range/censoring handling and unit adjudication, or explicitly authorize a justified source amendment. The current workbook must not be altered merely to obtain agreement. Then rerun full validation, inspect the actual six-field export and private crosswalk, connect a restricted local preview, and execute all actual-record matrix/filter/profile/accessibility/responsive checks. Publication review must examine that concrete dataset before any public inclusion.

After those Phase 3A requirements pass, Phase 3B can refine linked cross-domain comparisons, visual encoding and accessible exploration; improve study-level provenance using only approved fields; review publication-safe export/version metadata; and complete manual scientific/accessibility review and controlled deployment if explicitly authorized. Additional granular clinical attributes, diagnostic scores, causal comparisons and treatment recommendations are outside the approved scope.
