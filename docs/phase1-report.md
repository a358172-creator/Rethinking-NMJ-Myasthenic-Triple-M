# Phase 1 delivery record

Completed locally on 12 October 2026. No commit, remote push, repository rename, Pages enablement or publication was performed.

## Files

Modified: `README.md`.

Created application and content:

- `src/main.tsx`, `src/App.tsx`
- `src/components/layout/Header.tsx`, `Footer.tsx`
- `src/components/ui/Arrow.tsx`
- `src/features/mechanisms/AnatomicalFigure.tsx`, `NmjDetail.tsx`, `MechanismExplorer.tsx`, `MechanismPanel.tsx`, `MechanismComparison.tsx`
- `src/features/evidence/EvidencePanel.tsx`, `EvidenceKey.tsx`, `StudyStats.tsx`, `ResearchOverview.tsx`, `ScientificReferences.tsx`
- `src/features/UpcomingModules.tsx`
- `src/data/science.ts`, `src/data/locale.ts`
- `src/styles/tokens.css`, `src/styles/global.css`
- `public/favicon.svg`

Created project tooling and documentation:

- `package.json`, `package-lock.json`, `index.html`, `.gitignore`
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `eslint.config.js`
- `playwright.config.ts`, `tests/atlas.spec.ts`
- `scripts/verify-publication.mjs`
- `.github/workflows/deploy.yml`
- `docs/scientific-review.md`, `docs/test-plan.md`, this report

Original scientific documents are unchanged and ignored by Git. Generated `dist/`, browser reports and screenshots are also ignored.

## Functional scope

The homepage, research context, aggregate summary, about-study section, references and navigation are complete. Module 1 includes mouse/keyboard anatomical selection, dynamic evidence panels, normal versus conceptual impaired NMJ physiology, and side-by-side mechanism comparison with three nonexclusive interpretations. Selected states have text/number cues as well as color. The mobile menu, evidence-key disclosures, source-availability/methods disclosures, reduced-motion behavior and reference anchors function.

Module 2 and Module 3 are labeled upcoming previews. They contain no inert action controls, simulator or patient records.

## Scientific provenance

Four supplied documents were readable and reviewed. The requested SfN abstract and audit spreadsheet were absent. No independent spreadsheet recalculation is claimed. The manuscript/audit define N=38, 27 sources, 38/38 MG-like phenotype, 11/30 AChR-positive, 4/38 formal NMJ testing, 0/4 objective abnormality with exact 95% CI 0–60.2%, 6/11 myopathic needle EMG and 16/38 documented mortality. One SFEMG is within the four; none of the 11 AChR-positive patients had documented formal testing.

Six reference entries were verified: Guidon 2021, Plomp 2025, Ucem 2026, Wei 2026, Brahmer/SITC 2021 and Giovannini 2023. Supporting panels link to the relevant entries, which expose publication and DOI links. See [scientific review](scientific-review.md) for exact sources, metadata and attribution limits.

## Verification

The following were executed successfully:

| Check | Result |
| --- | --- |
| Dependency installation | Completed; installation audit reported zero vulnerabilities |
| `npm run typecheck` via production build | Passed |
| `npm run lint` | Passed |
| `npm run build` | Passed; final bundle uses `/triple-m-neuromuscular-atlas/` |
| `npm run verify:publication` | Passed; four compiled public files, no raw research files/source paths/patient records detected |
| Full Playwright suite | 25 passed; one intentionally skipped desktop mobile-menu case; no unexpected failures or flakiness |
| Current-repository path smoke check | Four desktop/mobile navigation, asset and screenshot checks passed under `/Rethinking-NMJ-Myasthenic-Triple-M/` |
| Automated axe checks | No WCAG 2/2.1 A/AA violations detected in anatomy and comparison checks |
| Responsive checks | No horizontal overflow at 390px and 768px; interpretation below figure |
| Original SVG interactions | Mouse, Enter, Space, synchronized states and hero activation checked |
| GitHub workflow | YAML parsed; Pages path propagation, test gate, dist-only artifact and build-before-deploy dependency checked |
| Scientific review | Frozen denominators, caution language, evidence categories, source links and conceptual anatomy reviewed |
| Visual review | Homepage, normal NMJ explorer and comparison screenshots reviewed on desktop and mobile |

Chromium and its required Linux libraries were installed to make browser validation possible. Initial sandbox/network and missing-library errors were resolved; these were environment failures, not successful tests. The complete final suite uses the production build. Browser artifacts are in `playwright-report/` and `test-results/` and are excluded from Git.

Automated accessibility checks do not certify comprehensive screen-reader usability or medical/anatomical validity. External publisher availability is not continuously monitored. GitHub Actions was not run remotely because no push/deployment was authorized.

## Preview and deployment

Run `npm run dev` and open `http://localhost:5173/triple-m-neuromuscular-atlas/`. In Codespaces, forward port 5173 and use the same path on the forwarded origin. For the compiled bundle, run `npm run preview` and use port 4173.

The workflow is ready for GitHub Pages after source review and an authorized push. Set repository Settings → Pages → Source to GitHub Actions. The local default matches the intended repository name; CI derives the actual path from `actions/configure-pages`. The existing remote remains unchanged. Only `dist/` is uploaded. There is no deployed URL to report.

## Before Phase 2

Have the scientific author/clinician approve the original anatomical schematics and public attribution/uncertainty language. Complete a manual screen-reader and keyboard review. Incorporate the absent abstract only after it is supplied and reviewed. Finish Spanish string extraction when localization is prioritized. Any Phase 3 patient-level representation requires separate publication-safe validation; no raw data should be imported into public assets.
