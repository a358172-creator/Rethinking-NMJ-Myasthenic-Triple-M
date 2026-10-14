# Beyond the Third M

**An Interactive Atlas of ICI-Associated Neuromuscular Toxicity**

A React, TypeScript and Vite scientific companion to *Rethinking the “Myasthenic” Component of Immune Checkpoint Inhibitor-Associated Triple M Syndrome: An Individual Patient-Level Pooled Analysis*.

The atlas asks whether an MG-like clinical phenotype establishes primary neuromuscular-junction (NMJ) transmission dysfunction. Three complementary modules distinguish mechanisms, diagnostic domains and aggregate published-case evidence while retaining the possibility that muscle injury and genuine NMJ disease coexist. It is educational, not a diagnostic tool, treatment recommender, or substitute for specialist assessment.

## Implemented

- A scientific homepage, research context, denominator-preserving study summary, research overview, references and navigation.
- An original, editable SVG tissue map with selectable myocardium, skeletal muscle and NMJ. Mouse, Enter/Space, text controls, pressed states, numbered labels and visible focus support the same interactions.
- Dynamic scientific panels with established physiology, literature-supported observations, proposed mechanisms and findings from the N=38 analysis.
- A normal NMJ illustration and an explicitly conceptual possible-impairment state, with vesicles, acetylcholine release, cleft, ACh receptors, postsynaptic folds and muscle membrane.
- Side-by-side mechanism comparison with primary NMJ, muscle-predominant injury and potential-overlap interpretations. All converge on overlapping possible manifestations without classifying a patient.
- Responsive layouts, reduced-motion handling, a mobile navigation menu, source links and an accessible evidence key.
- A complete Phase 2 **Virtual Neuromuscular Diagnostic Laboratory**, with clinical muscle-region exploration, serological evidence, three electrophysiology views, and a comparative evidence board.
- A Phase 3B **Scientific Evidence Explorer** at `#evidence`: interactive aggregate testing coverage, serology/physiology comparison, objective NMJ evidence categories and conventional needle EMG, followed by scientific synthesis and secondary outcome context.
- Centralized aggregate values explicitly marked provisional pending final source-provenance reconciliation. No unsupported troponin distribution or subgroup comparisons are displayed.
- Retained private Phase 3A processing, validation and publication-control infrastructure. Patient components and the former patient-availability/static-clinical panels remain unmounted; no patient dataset is bundled.

## Phase 2 laboratory

The laboratory is linked from the main navigation and module overview at `#laboratory`.

**Clinical phenotype:** five selectable regions cover extraocular muscles/eyelids, bulbar musculature, cervical muscles, proximal limbs, and respiratory muscles/diaphragm. Each contrasts possible muscle and NMJ mechanisms without assigning an exclusive cause.

**Serology:** AChR, MuSK, and pretreatment/correlation views distinguish antibody detection from measured transmission. The context view also describes anti-titin as an additional immune marker, without a new cohort proportion or a functional NMJ claim. AChR results preserve the tested denominator and the absence of documented formal NMJ testing in the seropositive subset.

**Electrophysiology:** deterministic editable SVGs compare serial RNS responses, paired-fiber timing variability and possible blocking on SFEMG, and motor-unit morphology/recruitment on needle EMG. Every trace states **“Illustrative educational waveform — not a patient recording.”** Axes are qualitative; no numerical jitter or patient measurements are generated. On phones, the waveform diagram scrolls within its own keyboard-accessible region to preserve readable labels; the page and caption fit the viewport. SFEMG initially exposes the variable second potential on narrow screens.

**Evidence board:** nine findings expose what each measures, what it may support, what it cannot independently establish, and a complementary domain. A manually chosen NMJ, muscle, or overlap perspective updates contextual interpretation. Findings do not select the perspective automatically, and there are no diagnostic scores, probabilities or treatment outputs.

The refined NMJ anatomy is shared between the Phase 1 explorer and Phase 2 serology. Phase 1 changes are limited to useful muscle/NMJ refinements, navigation integration, and shared frozen-number references. Heart anatomy and other deferred work are recorded in [VISUAL_REFINEMENT_BACKLOG.md](VISUAL_REFINEMENT_BACKLOG.md). No hypothetical patient scenarios were added.

## Phase 3B evidence explorer

The third module uses aggregate bars, native keyboard controls, the audited AChR/formal-NMJ cross-tabulation and an exact uncertainty interval. Select each diagnostic domain, serological group, NMJ evidence category or needle-EMG interpretation to inspect its denominator and limits. It does not show individual patient dots, rows or profiles.

`src/data/aggregateEvidence.ts` is the typed source of the displayed counts and intervals; existing Phase 1/2 aggregate displays derive compatible values from it. The working cohort and publication keys remain provisional: Siu/Gómez attribution, possible duplication and categorical disagreements are unresolved. Numerical reproduction does not establish complete cohort validation. Full-study and core-atlas reports retain their scientific FAIL states. Mortality is secondary source-reported context, not a population fatality risk.

The [UI integration audit](docs/PHASE3B_UI_INTEGRATION_AUDIT.md) documents kept/adapted/unmounted components and unavailable Argon 4 attribution. Recent dark cards were adapted to the native light palette; mechanism SVG geometry was preserved. See [Phase 3B delivery](docs/phase3b-report.md) for executed tests and remaining review.

Phase 3B deliberately supersedes the public patient-atlas direction. The retained private scripts/contracts are research history and safeguards; no new exporter, patient API, private preview or public patient-data workflow is activated.

## Development and local preview

Use Node.js 22.12 or later; development and CI were configured for Node.js 24.

```bash
npm ci
npm run dev
```

Open `http://localhost:5173/triple-m-neuromuscular-atlas/`. In a remote Codespace, forward port **5173** and append `/triple-m-neuromuscular-atlas/` to the forwarded origin. The terminal prints Vite’s local/network URLs.

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

The production preview is `http://localhost:4173/triple-m-neuromuscular-atlas/`; forward port **4173** for a remote workspace. `vite preview` is a local QA server, not a production host.

## Verification

```bash
npx playwright install chromium
npm run test:aggregates
npm test
```

Linux hosts without browser system libraries may require `npx playwright install --with-deps chromium`. The test configuration starts and stops its own production-preview server. Tests cover desktop and mobile interactions, exact frozen statistics, evidence categories, asset loading, internal links, responsive overflow and automated axe accessibility checks. See [test plan](docs/test-plan.md). Browser reports and screenshots are ignored by Git.

`npm run build` executes TypeScript validation, Vite compilation and the publication-boundary check. `npm run verify:publication` rejects tracked research documents, raw document files in `dist`, internal source paths and known patient-record markers. The workflow uploads **only `dist/`**. This check supplements author review; it is not a general-purpose privacy scanner.

## Retained private Phase 3A data validation

The unchanged authoritative workbook is now available in the ignored `esearch_sources/` directory. Install the local Python environment with **Python 3.12 or newer**:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r scripts/atlas/requirements.txt
npm run data:validate:check
npm run data:test
```

For Phase 3A.2 revalidation that preserves the historical reports and private adjudication artifacts, use:

```bash
npm run data:validate:check
npm run data:validate:core
npm run data:test
npm run test:release-policy
npm run test:aggregates
```

Both validation commands currently exit **1**. The read-only full revalidation retains **44/48** passing checks and all four troponin failures. The independently specified core workflow has **44/46** passing prerequisites: its numerical checks pass, but two required linked-source provenance checks fail. `CORE_ATLAS_VALIDATION` therefore remains **FAIL**, with private-preview and public-publication approvals **PENDING**. No new export policy is activated. See the [core specification](docs/CORE_NEUROMUSCULAR_ATLAS_VALIDATION.md), [exact scoped results](docs/CORE_ATLAS_VALIDATION_REPORT.md), [provenance questions](docs/CORE_ATLAS_PROVENANCE_REVIEW.md), [privacy/release review](docs/CORE_ATLAS_PRIVACY_AND_RELEASE_REVIEW.md) and [Phase 3A.2 delivery](docs/phase3a2-report.md).

The [troponin manuscript amendment proposal](docs/TROPONIN_MANUSCRIPT_AMENDMENT_PROPOSAL.md) recommends withdrawing unsupported pooled summaries and their dependent subgroup tests pending author decisions. It does not amend the frozen manuscript or substitute the diagnostic n=25 calculation. The targeted provenance review also requires source-identity and categorical reconciliation; reproducing workbook totals does not establish independent patients or correctly attributed source facts.

On the current workbook, `data:validate` exits **1**: **44/48** required checks pass, with four troponin checks unresolved. All categorical cohort, cross-domain, age and LVEF checks pass. A conservative exact single-assay calculation cannot reproduce the frozen troponin n/median/IQR/range. Its diagnostic results must not replace the frozen analysis. See [executed validation report](DATA_VALIDATION_REPORT.md), [data dictionary](DATA_DICTIONARY.md), [independent review](docs/phase3-source-review.md) and [restricted review procedure](docs/atlas-data-review.md).

Private audit details and the source crosswalk remain in ignored `esearch_sources/_processed/`, with owner-only file permissions. No browser-facing `atlas.review.json` is generated until **every** required frozen check passes. A failed rerun removes a stale review artifact. Validation success would still require a separate review before public inclusion. No patient rows, record filters or profiles are currently mounted, and there is no development data endpoint. The production boundary also rejects restricted export files and checks all source identifiers available in the private crosswalk.

The source owner must resolve the biochemical methodology and linked categorical source attribution. No source correction has been made. The legacy exporter still requires every full-study check to pass, and the proposed core export policy remains inactive. Phase 3B does not pursue a public patient atlas. No private endpoint or patient preview is enabled. [Phase 3A delivery status](docs/phase3-report.md) and the Phase 3A.2 report retain the historical research findings and blockers.

## Project structure

```text
src/
  components/layout/         Header, navigation and footer
  components/ui/             Small reusable UI primitives
  features/mechanisms/       Anatomical SVGs, explorer, scientific panels, comparison
  features/evidence/         Study overview, stats, evidence key and references
  features/laboratory/       Four laboratory views, trace graphics and scoped styles
  features/evidenceExplorer/ Four aggregate charts, interpretation and scoped styles
  features/atlas/            Unmounted patient evidence components; no patient data
  features/ScientificModules Three working module links
  components/anatomy/        Shared editable NMJ geometry
  data/aggregateEvidence.ts Typed provisional aggregate counts and intervals
  data/science.ts            Compatible aggregate projections, Phase 1 content and references
  data/laboratory.ts         Typed Phase 2 scientific content and evidence declarations
  data/laboratoryUi.ts       Laboratory interface copy and glossary
  data/locale.ts             Interface copy prepared for future localization
  data/atlasModel.ts         Minimal categorical types and filter/summary functions
  data/atlasCopy.ts          Evidence category labels and interpretation text
  styles/                   Palette, typography, spacing and responsive behavior
public/                     Original favicon only
tests/                      Playwright desktop/mobile checks
scripts/                    Publication-boundary verification and Python atlas pipeline/tests
docs/                       Scientific source review and verification record
.github/workflows/           Build, test and GitHub Pages deployment
```

The SVGs are React source, editable by path and label. Scientific content is separate from presentation, and interface copy has a locale entrypoint. A future Spanish locale must also translate the scientific text, SVG descriptions and remaining component copy; full language switching is not implemented.

## Scientific source hierarchy

1. Frozen N=38 workbook: individual source records. The manuscript and numerical audit provide methods and independently frozen validation targets; aggregate values never substitute for source records.
2. Verified original publications and consensus definitions: established physiology and published clinical/pathological observations.
3. Supplied Spanish narrative review: secondary explanatory context, not independent mechanism validation.
4. Guardrails and conceptual schematics: identify boundaries; hypotheses are visibly labeled and never promoted to cohort findings.

The source documents and subsequently supplied workbook were found in **`esearch_sources/`**, rather than the requested `research_sources/`. Both directories, original DOCX/spreadsheet/PDF documents, restricted derived artifacts, build output and test artifacts are ignored. Original documents were not modified or copied into public assets.

The requested SfN late-breaking abstract was absent and was **not reviewed**. The spreadsheet was unavailable during Phases 1/2; Phase 3A has now recalculated the workbook and documented the troponin discrepancy without changing frozen public aggregates. The clean v3 manuscript has references that the earlier audit described as missing. The [Phase 1 source review](docs/scientific-review.md) records that phase's historical availability; the [Phase 3A independent review](docs/phase3-source-review.md) records the current workbook findings.

### Numerically reproduced provisional values

| Finding | Value | Interpretive boundary |
| --- | --- | --- |
| Cohort | N=38 from 27 sources | Published cases, not an incidence sample |
| MG-like phenotype | 38/38 | Clinical phenotype, not NMJ confirmation |
| AChR-positive | 11/30 (36.7%) | Tested subset; serology is not physiological confirmation |
| Formal NMJ testing | 4/38 | RNS and/or SFEMG documented |
| Objective NMJ abnormality | 0/4; exact 95% CI 0–60.2% | Does not exclude NMJ disease |
| SFEMG performed | One patient within the four | Not an additional fifth patient |
| Myopathic needle EMG | 6/11 (54.5%) | Does not independently establish inflammatory pathology |
| Documented mortality | 16/38 (42.1%) | Source-reported, variable follow-up |
| AChR-positive cases with formal testing | None of the 11 | Missing paired evidence, not negative formal tests |

The tested subsets differ. Untested cases are not counted as negative and proportions are not shown as directly comparable rates. The new aggregate cross-tabulation reproduces the audited source-row counts; it is descriptive and establishes no association, independence or causality. The wide NMJ confidence interval and missingness remain visible. Working-cohort/publication identity remains pending source adjudication.

### References

Public content links to verified publications by **Guidon (2021), Plomp (2025), Ucem (2026), Wei (2026), Brahmer/SITC (2021), and Giovannini (2023)**. Phase 2 adds verified methodology and original electrophysiological observations by **Stålberg and colleagues (1974, 2019), Skolka and colleagues (2022), and Kouyoumdjian and colleagues (2020)**. The [Phase 1 source review](docs/scientific-review.md#publication-checks) and [Phase 2 scientific review](docs/phase2-scientific-review.md) record exact metadata, claim support and access limitations. The unverified ENMC workshop and unidentified Neurology study are excluded. Arthritis-specific experimental pathways and a universal shared autoantigen are not presented as proven Triple M mechanisms.

## GitHub Pages deployment

The existing GitHub Pages workflow and repository settings are preserved. No commits, pushes or deployment operations were performed during the Phase 2 implementation. An authorized push can trigger the existing workflow.

The intended repository name is `triple-m-neuromuscular-atlas`; the default Vite base is `/triple-m-neuromuscular-atlas/`. The existing workspace remote is named `Rethinking-NMJ-Myasthenic-Triple-M`. It was not renamed. The workflow takes `base_path` from `actions/configure-pages`, so it builds assets and tests under the actual repository/custom-domain path rather than assuming the local default.

After scientific author review and your authorization to push:

1. Use the intended GitHub repository, or retain the existing one. Do not add original research files.
2. In repository **Settings → Pages → Build and deployment**, set **Source: GitHub Actions**.
3. Push the reviewed application to `main`, or run **Build and deploy atlas to GitHub Pages** from the Actions tab. This workflow deploys on pushes to `main` and on manual dispatch.
4. The build job runs `npm ci`, lint, typechecking/build/publication checks, Chromium installation and browser tests. Deployment runs only after the build job succeeds.
5. The Pages deployment job exposes the actual published URL. No live URL is claimed here.

For a local build using the existing remote name:

```bash
VITE_BASE_PATH=/Rethinking-NMJ-Myasthenic-Triple-M/ npm run build
ATLAS_TEST_BASE_PATH=/Rethinking-NMJ-Myasthenic-Triple-M/ npm test
```

For a root/custom-domain build, use `VITE_BASE_PATH=/` and `ATLAS_TEST_BASE_PATH=/`. A manual preview of an overridden build also needs the same `VITE_BASE_PATH`, for example `VITE_BASE_PATH=/Rethinking-NMJ-Myasthenic-Triple-M/ npm run preview`. The automated test server sets this path itself. Rebuild with the default before returning to the default local preview URL.

Deployment configuration follows the [official Vite Pages guidance](https://vite.dev/guide/static-deploy.html#github-pages) and [GitHub configure-pages action](https://github.com/actions/configure-pages). Remote workflow execution and repository Pages settings cannot be validated until an authorized push/deployment.

## Limits and next phases

Automated tests cannot establish clinical validity, exact anatomical fidelity or complete assistive-technology usability. The drawings simplify anatomy and are not to scale. They illustrate normal function and possible injury; they do not assert a universal antigen, antibody mechanism or histopathology in every patient. Suspected cardiac, bulbar or respiratory compromise requires clinical/specialist assessment; this site does not sequence a workup or recommend treatment.

Before publication, the scientific author/clinician should review the drawings, attribution, missing-data language and public content. Complete a manual screen-reader/keyboard review, including the mobile diagram scrolling regions. The absent SfN abstract can be incorporated after source review, without changing frozen values. The laboratory states that urgent cardiac, bulbar or respiratory assessment should not wait for completion of every test. The public scientific direction remains aggregate-only.

**Phase 2 is implemented.** Its diagrams are schematic and do not reproduce raw cohort recordings. Laboratory view controls are browser-local educational state; switching views starts the selected view at its default state. They do not collect clinical input or retain patient information. See [Phase 2 delivery report](docs/phase2-report.md) for files, executed validation and limitations.

**Private Phase 3A remains incomplete under its scientific stop condition.** Both full-study validation and complete core validation remain FAIL. Source reconciliation and any manuscript amendment require author decisions. **Phase 3B implements an aggregate-only public module**, with those unresolved limitations stated explicitly. No patient records or mock patients are included in the website. Detailed anatomical improvements remain deferred.
