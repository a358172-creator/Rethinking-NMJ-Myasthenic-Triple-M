# Phase 1, Phase 2 and Phase 3B public verification

Run `npm run typecheck`, `npm run lint`, and `npm run build`, then install Chromium with `npx playwright install chromium` and run `npm test`. The Playwright suite serves the production bundle beneath `/triple-m-neuromuscular-atlas/`, the configured GitHub Pages path.

The desktop and mobile projects verify:

- Exact frozen study numerators, denominators, percentages, uncertainty interval, and missing paired AChR/NMJ evidence.
- Functional hero navigation, valid internal reference anchors, DOI link format, and successful loading without browser or asset errors.
- Each anatomical selection by text, SVG mouse click, and keyboard Enter/Space, including synchronized selected states and hero-to-explorer activation.
- Four visibly differentiated evidence categories and valid supporting-literature anchors in every interpretation.
- Default normal NMJ physiology and reversible selection of possible impairment, including state-specific explanatory text and accessible diagram names.
- All three comparison states, overlapping manifestations, and distinct explanations of nonexclusive mechanisms.
- No horizontal page overflow at 390px and 768px widths in either explorer mode, and interpretation beneath the anatomy on tablet/mobile.
- Automated WCAG 2 A/AA and WCAG 2.1 A/AA checks in anatomy and comparison mode using axe-core.
- The available diagnostic laboratory link and one clearly labeled Phase 3 preview with no inert controls or loaded patient records.
- Expandable mobile navigation that closes after destination selection.
- Reduced-motion styles that suppress transitions and smooth scrolling while retaining interaction.

The final browser case attaches normal-NMJ and comparison screenshots for each project to the Playwright report. These are review artifacts; no screenshot baseline or automatic visual-accuracy claim is made.

The Phase 2 laboratory suite also runs in both configured desktop and mobile projects and verifies:

- Main navigation to the laboratory, all four laboratory views, mutually exclusive pressed states, and valid global internal anchors.
- Five clinical regions selected through text controls, SVG mouse clicks, Enter, and Space; synchronized anatomy, manifestations, possible muscle/NMJ mechanisms, interpretation boundaries, and visible keyboard focus.
- All serology panels, frozen AChR positivity of 11/30 (36.7%), the absence of formal testing in the 11 AChR-positive patients, and the distinction between missing paired physiology and normal testing.
- Deterministic SVG path changes and reversible RNS, SFEMG, blocking, and needle-EMG states. Every waveform retains its visible educational caption and accessible description; no numerical jitter values are shown.
- Frozen formal-NMJ findings of 4/38 tested and 0/4 abnormal (exact 95% CI 0–60.2%), the single SFEMG evaluation nested within the four, and myopathic needle EMG of 6/11 (54.5%).
- Keyboard-operated CMAP, jitter, and recruitment explanations, including Escape dismissal and retained focus.
- All nine evidence findings, their four interpretation fields and evidence categories, all three manually selected perspectives, and preservation of the chosen perspective when findings change. Selecting a perspective changes the support context while retaining the finding’s measurements, limitations, complementary domain, and evidence.
- Phone/tablet widths of 390px and 768px, figure/panel stacking, SVG containment, and no horizontal page overflow in every view, including abnormal signals. Mobile waveform diagrams preserve readable labels within a bounded horizontal scroll region; ArrowRight keyboard scrolling is verified for each modality.
- Keyboard-operated laboratory navigation, reduced-motion preferences, and continued selection behavior.
- Automated WCAG 2 A/AA and WCAG 2.1 A/AA checks across all four views, RNS decrement, SFEMG increased jitter with possible blocking, and myopathic needle EMG.
- Browser console errors, uncaught page errors, failed asset requests, and same-origin HTTP errors throughout all interactions.

Six additional viewport screenshots per project capture the default clinical illustration, serology, decremental RNS, SFEMG with blocking, myopathic needle EMG, and a selected evidence-board finding. These bounded artifacts support manual visual review without creating full-page captures or claiming automated anatomical accuracy.

Automated checks do not establish scientific correctness, comprehensive screen-reader usability, anatomical accuracy, or clinical validity. A scientist/clinician should review the original diagrams, evidence attribution, uncertainty language, and public references before publication. Manual checks should include keyboard focus visibility, mobile panel order, reduced-motion behavior, and representative desktop/mobile screenshots.

The production build also executes `npm run verify:publication` to check that unpublished documents and patient records are excluded from deployment. Browser tests inspect link targets and DOI formatting; they do not assert that remote publisher sites are continuously available.

Test results must be reported from executed commands. The presence of this plan or test file does not imply a successful run.

## Phase 3B current public scope

Phase 3B replaces the patient-availability notice with the aggregate-only Scientific Evidence Explorer at `#evidence`. Earlier Phase 3A preview plans below are retained as historical/private scope; they are not active public functionality or a current patient-publication plan. All three module-directory links now work. The duplicate static clinical figure is unmounted; the conceptual mechanism figure retains its geometry with an adapted light palette.

`npm run test:aggregates` compares the centralized typed values against the executed aggregate audit JSON and numerical report, including every requested count, exact interval and AChR/formal-NMJ cell. Six tests verify margins, missingness, nested SFEMG, evaluated distributions, mortality denominator/unknowns, provisional source limitations, unchanged scientific FAIL states and absence of record/biochemical fields. The public build does not import these research reports.

The evidence explorer browser suite exercises every availability, serology, NMJ-category and needle-category control with native keyboard operation and exclusive pressed states. Selected panels must retain exact full/selected denominators, keep 34 unavailable formal tests distinct from 32 undocumented objective-evidence records, and keep 27 undocumented needle examinations outside the 11 evaluated. It checks the wide 0/4 interval, explanatory boundaries, explicit Siu/Gómez uncertainty, secondary mortality context and absence of unsupported troponin summaries.

Desktop/mobile checks cover default and selected-state axe accessibility, existing Phase 1/2 behavior, working global/module/chart anchors, all retained SVG scroll controls, absence of private requests/records/downloads and no page/chart overflow at 320, 390, 768 and 1440 px. Screenshots capture the full aggregate module, focused serology comparison and retained conceptual mechanism figures for visual inspection. Automated axe checks do not replace manual screen-reader or scientific review.

`npm run build` still runs the existing publication verifier. Research manuscripts/workbooks/private crosswalks cannot enter deployed assets. Preserve original research/documentation digests and do not activate the legacy patient exporter. No clinical or release validation changes from FAIL to PASS because the public module excludes biochemical data.

## Phase 3A scope while validation is blocked

`npm run data:validate` processes the actual private workbook with openpyxl and produces the numerical report. A nonzero exit on the current troponin discrepancy is required; it must not be described as a passed frozen validation. `npm run data:test` uses stdlib unittest to check strict missingness, exact intervals, supported unit conversions, rejection of ambiguous peaks/assays, invalid spreadsheets/formulas, stale-export revocation, the authoritative categorical/age/LVEF invariants, duplicate-ID and cross-variable failures, and separation of the six-field representation from private provenance. In-memory schema checks do not authorize a browser export.

The `phase3-gate.spec.ts` browser case verifies keyboard navigation to `#patients`, the visible validation/publication status, absence of patient rows/filters/profiles and source-data requests, responsive page containment and axe accessibility. It runs in both existing viewport projects. The rest of the suite continues to exercise Phases 1/2 against the production bundle.

All combinations of patient filters, the actual 38-row table, row profiles and missingness highlights require a fully passed source validation and restricted preview. Those browser checks are **not executed or claimed** while the scientific stop condition holds. Generic atlas components are typechecked/linted without being mounted or supplied substitute patients.

## Phase 3A.2 independent scope and preservation

Run `npm run data:validate:check` before `npm run data:validate:core`. The first command executes all 48 unchanged full-study checks without rewriting the previous report, audit, crosswalk or source-adjudication files and without export/revocation operations. The second applies the separately authored core specification, including mandatory linked-source provenance and processing-privacy prerequisites, and reads the new full audit only to report its distinct status. Expected nonzero exits currently record four biochemical failures and two core provenance failures respectively.

`npm run data:test` additionally exercises exact scoped source mappings, categorical/testing unions, missingness, duplicate/identity checks, source fingerprint and formula/error guards, linked provenance resolution conditions, private permissions, aggregate-only status output and preservation of prior artifacts under read-only revalidation. Temporary fixtures exercise failure paths; none is an atlas demonstration or substitute cohort.

`npm run test:release-policy` runs ten native Node metadata tests against the future private-preview display contract. Tests require explicit policy and preview decisions, exact source/artifact binding and scope/version agreement, and reject missing/malformed metadata, core failures and attempted legacy-policy bypass. They use authorization metadata only, not patient records. This gate does not authenticate the author or activate an exporter. These tests are separate from Playwright's public-site regression suite.

Verify unchanged hashes for the original workbook, manuscript, historical report, original private crosswalk/audit and all Phase 3A.1 adjudication artifacts. Inspect the generated aggregate reports and production exclusion results. Neither passing software tests nor the numerical core subset may be reported as complete source validation, preview approval or public disclosure approval. Actual-record patient UI tests remain unexecuted until source resolution, approved workflow implementation and explicit private-preview permission.
