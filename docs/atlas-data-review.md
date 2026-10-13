# Phase 3A restricted data review

The workbook is present and readable, and the core categorical fields reproduce the frozen cohort targets. The full validation gate remains closed because quantitative peak-troponin extraction cannot reproduce the frozen descriptive calculations without undocumented choices. No patient-level browser dataset is generated or approved. The exact executed results are in `DATA_VALIDATION_REPORT.md`; source mappings and their limits are in `DATA_DICTIONARY.md`.

## Reproduce the checks locally

Run from the repository root using Python 3.12 or newer (the executed environment uses Python 3.14):

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r scripts/atlas/requirements.txt
.venv/bin/python scripts/atlas/process_workbook.py --workbook esearch_sources/Triple_M_Master_Patient_Dataset_Expanded_N38.xlsx
.venv/bin/python -m unittest discover -s scripts/atlas/tests -v
```

The pipeline's default workbook is the path above and its default report is `DATA_VALIDATION_REPORT.md`. `--report /tmp/atlas-validation.md` can direct a repeat report to a temporary path. Patient artifacts have no configurable public destination: the sole destination is the ignored `esearch_sources/_processed/`, checked with Git before writes.

The current validation command exits **1** and writes a discrepancy report. That is the intended response to unresolved source fields, not a successful numerical validation. Regression tests can pass while confirming that this failure is detected. Tests using the authoritative workbook skip when that private input is absent; test skips must never be reported as cohort validation.

The pipeline opens the workbook in read-only value and formula modes, checks input headers and spreadsheet errors, refuses mapped formulas with unverifiable cached freshness, retains explicit missingness states, and verifies the source SHA-256 before/after ingestion. It never saves the source workbook. Exact confidence intervals use Clopper–Pearson, and quartiles use inclusive linear interpolation.

## Current adjudication required

The source includes a concentration explicitly labeled ng/mL, which literally converts to a maximum of 2,484,000 ng/L and conflicts with the audit's 162,000 ng/L upper range. Other entries are intervals, lower bounds, an unqualified peak, or paired quantitative troponin T and I values without a documented selection rule. The conservative fully supported single-assay subset is n=25, median 1,786 ng/L, IQR 1,241–4,783 ng/L. These are discrepancy diagnostics, not replacement frozen results. Exact source rows, IDs and raw entries requiring adjudication appear only in `validation.audit.private.json`.

A scientific author must inspect the relevant source entries and primary publications and supply documented extraction rules or explicitly authorized source corrections. The pipeline must not silently convert a mislabeled-looking unit, turn a lower bound into an exact peak, choose an assay, or replace values with the manuscript summary to force n=33. No source changes have been authorized. Any later authorized amendment needs a recorded rationale, versioned source fingerprint and fresh complete validation; the present source remains unchanged.

## Restricted artifacts

On each run, the ignored directory may contain:

- `validation.audit.private.json`: input fingerprint, validation timestamp, inspected schema, individual checks, aggregate internal availability states and a restricted troponin-adjudication list with source row/ID, raw value, status, reason and literal unit-normalized value.
- `atlas.provenance.private.json`: pseudonymous labels linked to raw source IDs, source rows and source DOI. Written only where records normalized and IDs are unique. Its `validationPassed` field remains false on the current source.
- `atlas.review.json`: the strictly minimal six-field categorical browser representation, **only after every required frozen check passes**. On any failed rerun, a stale review artifact is removed. It is currently absent.

Private JSON files are written atomically with owner-only permissions (`0600`) inside an owner-only directory (`0700`). Private provenance and source metadata must remain outside tracked files, `public/`, `dist/`, downloadable assets and deployed output. The raw workbook remains ignored. No automatic bypass is available for a passing categorical subset: the full frozen gate must pass before `atlas.review.json` exists.

## Explicit publication review

Validation success is necessary but does not authorize public inclusion. After resolving the discrepancy, a reviewer must examine the actual local minimal export and the private crosswalk, confirm all 38 one-to-one mappings, confirm each missingness category, verify the AChR-positive/formal-testing zero overlap and SFEMG subset, and inspect the exact six-field schema for unnecessary linkage or clinical granularity.

The user must explicitly approve that concrete derived representation for publication and specify the public destination. Until then, it remains ignored and local only. The pipeline never marks publication approved, moves data into application source, commits files, pushes to GitHub or deploys a site. A developer cannot treat approval of the interface, the raw workbook's availability or passing tests as approval of the patient dataset.

If publication is later authorized, prepare a separately reviewed artifact with only the allowed categorical records and explicitly approved metadata. Do not move the private audit/crosswalk into the app. Re-run numerical validation and the production publication-boundary check against the exact approved version before any commit/deployment. Public additions beyond these categories require separate explicit approval. At present, no fields or metadata have public approval.

## Application behavior and remaining work

The app must show a validation/review gate when no approved dataset is available; it must not reconstruct rows from aggregate counts or fabricate pseudonymous records. Local development may serve `atlas.review.json` only after a successful run and before publication review. Production must not consume the ignored review artifact. The current failed source therefore cannot show patient rows, patient filtering, row profiles or missingness rows.

After source adjudication, Phase 3A still requires a successful full pipeline rerun, review of the concrete minimal export, and patient-dependent browser checks on that actual validated data. Phase 3B can then refine visual comparisons, accessibility and controlled publication after author review, without adding unapproved clinical fields or causal/diagnostic claims.
