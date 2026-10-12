# Beyond the Third M

**An Interactive Atlas of ICI-Associated Neuromuscular Toxicity**

A React, TypeScript and Vite scientific companion to *Rethinking the “Myasthenic” Component of Immune Checkpoint Inhibitor-Associated Triple M Syndrome: An Individual Patient-Level Pooled Analysis*.

Phase 1 asks whether an MG-like clinical phenotype establishes primary neuromuscular-junction (NMJ) transmission dysfunction. It distinguishes clinical phenotype, serology, muscle physiology, and objective NMJ evidence while retaining the possibility that muscle injury and genuine NMJ disease coexist. It is educational, not a diagnostic tool, treatment recommender, or substitute for specialist assessment.

## Implemented

- A scientific homepage, research context, denominator-preserving study summary, research overview, references and navigation.
- An original, editable SVG tissue map with selectable myocardium, skeletal muscle and NMJ. Mouse, Enter/Space, text controls, pressed states, numbered labels and visible focus support the same interactions.
- Dynamic scientific panels with established physiology, literature-supported observations, proposed mechanisms and findings from the N=38 analysis.
- A normal NMJ illustration and an explicitly conceptual possible-impairment state, with vesicles, acetylcholine release, cleft, ACh receptors, postsynaptic folds and muscle membrane.
- Side-by-side mechanism comparison with primary NMJ, muscle-predominant injury and potential-overlap interpretations. All converge on overlapping possible manifestations without classifying a patient.
- Responsive layouts, reduced-motion handling, a mobile navigation menu, source links and an accessible evidence key.
- Informational upcoming previews for Phase 2 and Phase 3. No diagnostic simulator, patient records, backend or externally hosted image assets.

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
npm test
```

Linux hosts without browser system libraries may require `npx playwright install --with-deps chromium`. The test configuration starts and stops its own production-preview server. Tests cover desktop and mobile interactions, exact frozen statistics, evidence categories, asset loading, internal links, responsive overflow and automated axe accessibility checks. See [test plan](docs/test-plan.md). Browser reports and screenshots are ignored by Git.

`npm run build` executes TypeScript validation, Vite compilation and the publication-boundary check. `npm run verify:publication` rejects tracked research documents, raw document files in `dist`, internal source paths and known patient-record markers. The workflow uploads **only `dist/`**. This check supplements author review; it is not a general-purpose privacy scanner.

## Project structure

```text
src/
  components/layout/         Header, navigation and footer
  components/ui/             Small reusable UI primitives
  features/mechanisms/       Anatomical SVGs, explorer, scientific panels, comparison
  features/evidence/         Study overview, stats, evidence key and references
  features/UpcomingModules  Phase 2/3 informational previews
  data/science.ts            Typed, curated English scientific content and references
  data/locale.ts             Interface copy prepared for future localization
  styles/                   Palette, typography, spacing and responsive behavior
public/                     Original favicon only
tests/                      Playwright desktop/mobile checks
scripts/                    Publication-boundary verification
docs/                       Scientific source review and verification record
.github/workflows/           Build, test and GitHub Pages deployment
```

The SVGs are React source, editable by path and label. Scientific content is separate from presentation, and interface copy has a locale entrypoint. A future Spanish locale must also translate the scientific text, SVG descriptions and remaining component copy; full language switching is not implemented.

## Scientific source hierarchy

1. Frozen N=38 manuscript and numerical audit: methods, cohort numbers, denominators and uncertainty.
2. Verified original publications and consensus definitions: established physiology and published clinical/pathological observations.
3. Supplied Spanish narrative review: secondary explanatory context, not independent mechanism validation.
4. Guardrails and conceptual schematics: identify boundaries; hypotheses are visibly labeled and never promoted to cohort findings.

The four available documents were found in **`esearch_sources/`**, rather than the requested `research_sources/`. Both directories, original DOCX/spreadsheet/PDF documents, build output and test artifacts are ignored. Original documents were not modified or copied into public assets.

The requested SfN late-breaking abstract was absent and was **not reviewed**. The audit’s underlying spreadsheet was also absent, so this implementation preserves the provided frozen results without claiming a fresh dataset recalculation. The clean v3 manuscript has references that the earlier audit described as missing. See the [scientific source review](docs/scientific-review.md) for availability, verification, discrepancies and claim boundaries.

### Frozen values

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

The tested subsets differ. Untested cases are not counted as negative, proportions are not shown as directly comparable rates, and no patient-level cross-tabulation is inferred. The wide NMJ confidence interval and missingness remain visible.

### References

Public content links to verified publications by **Guidon (2021), Plomp (2025), Ucem (2026), Wei (2026), Brahmer/SITC (2021), and Giovannini (2023)**. The [source review](docs/scientific-review.md#publication-checks) records links, DOIs and their appropriate use. The unverified ENMC workshop and unidentified Neurology study are excluded. Arthritis-specific experimental pathways and a universal shared autoantigen are not presented as proven Triple M mechanisms.

## GitHub Pages deployment

Deployment is configured, **not performed**. No commits or pushes were made by this implementation.

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

Before publication, the scientific author/clinician should review the drawings, attribution, missing-data language and public content. Complete a manual screen-reader/keyboard review. The absent SfN abstract can be incorporated after source review, without changing frozen values. Future public patient-level data require independent de-identification and validation.

**Phase 2** can add educational comparisons of examination, CK, AChR/MuSK, RNS, SFEMG, needle EMG and related modalities. Preserve the distinctions between what each measures and what it can establish; no automated diagnosis or prescribing logic is planned.

**Phase 3** can add a separately validated, publication-safe patient-level evidence representation. Model unperformed, unreported, indeterminate and negative testing separately; retain source provenance and confirm reuse/publication permissions. No records or mock patients have been created in Phase 1.
