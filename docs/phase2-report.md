# Phase 2 delivery record

12 October 2026. Phase 2 extends the existing atlas locally. No remote push, commit, repository rename or deployment operation was performed during this implementation. The existing GitHub Pages workflow is unchanged.

## Implemented features

The **Virtual Neuromuscular Diagnostic Laboratory**, subtitled **From Clinical Phenotype to Physiological Evidence**, is available from main navigation and the module overview.

- **Clinical Phenotype Explorer:** five selectable regions cover extraocular muscles/eyelids, bulbar musculature, cervical muscles, proximal limbs, and respiratory muscles/diaphragm. Text and original SVG controls synchronize. Each region explains manifestations, possible muscle and NMJ contributions, and the limits of clinical distribution.
- **Serological Evidence Explorer:** AChR, MuSK, and pretreatment/correlation views distinguish immune markers from functional transmission. Shared NMJ anatomy is paired with a separate assay-binding concept, not a universal antibody attack. Tested denominators and absent paired physiology remain explicit.
- **Electrophysiology Laboratory:** deterministic SVG illustrations compare RNS without significant decrement versus decrement, conceptual normal SFEMG variability versus increased jitter/possible blocking, and usual versus myopathic motor-unit morphology/recruitment. The axes are qualitative. Each trace visibly states “Illustrative educational waveform — not a patient recording.” There are no numerical jitter values or invented patient measurements.
- **Comparative Evidence Board:** nine selectable findings expose measurement, potential support, independent limitations and a complementary diagnostic domain. Users choose an NMJ, muscle or overlap perspective manually. Changing findings never assigns a perspective automatically; changing perspective updates contextual interpretation without changing the measured finding. No scores, probabilities or diagnosis are generated.
- **Accessibility and responsive behavior:** pressed-state controls, keyboard SVG activation, visible focus, accessible captions/descriptions, expandable glossary explanations, reduced motion and responsive panel stacking. Narrow waveform diagrams scroll inside keyboard-accessible regions; SFEMG initially exposes the variable second potential. The caption and page stay within the viewport.
- **Limited Phase 1 refinement:** shared NMJ geometry, more precise terminal/vesicle/fold proportions and refined muscle fascicle/fiber morphology. Heart anatomy and the existing mechanism interactions are preserved. The module overview marks Phase 2 available and retains one upcoming Phase 3 preview.

## Files

Created:

- `src/features/laboratory/DiagnosticLaboratory.tsx`
- `src/features/laboratory/LaboratoryNavigation.tsx`
- `src/features/laboratory/ScientificResultPanel.tsx`
- `src/features/laboratory/ClinicalPhenotypeExplorer.tsx`
- `src/features/laboratory/PhenotypeFigure.tsx`
- `src/features/laboratory/SerologicalEvidenceExplorer.tsx`
- `src/features/laboratory/ElectrophysiologyLaboratory.tsx`
- `src/features/laboratory/ElectrophysiologyTraces.tsx`
- `src/features/laboratory/ComparativeEvidenceBoard.tsx`
- `src/features/laboratory/laboratory.css`
- `src/components/anatomy/NmjAnatomy.tsx`
- `src/components/ui/EducationalTooltip.tsx`
- `src/data/laboratory.ts`, `src/data/laboratoryUi.ts`
- `tests/laboratory.spec.ts`
- `docs/phase2-scientific-review.md`, this report
- `VISUAL_REFINEMENT_BACKLOG.md`

Modified:

- `src/App.tsx`, `src/components/layout/Footer.tsx`, `src/data/locale.ts`, `src/features/UpcomingModules.tsx`: integrate laboratory navigation and availability.
- `src/data/science.ts`: shared frozen aggregate object and verified specialist reference entries.
- `src/features/evidence/ResearchOverview.tsx`, `StudyStats.tsx`, `src/features/mechanisms/MechanismComparison.tsx`: use the shared frozen values while preserving displayed Phase 1 findings.
- `src/features/mechanisms/AnatomicalFigure.tsx`, `NmjDetail.tsx`: bounded muscle/NMJ refinement and shared NMJ geometry.
- `tests/atlas.spec.ts`: replace the obsolete Phase 2 upcoming assertion with availability and preserve the Phase 3 preview checks.
- `README.md`, `docs/test-plan.md`: current scope, architecture, preview, verification and limitations.

No dependency, package lock, Vite configuration, workflow or source-document change was required. All new graphics remain editable source SVGs.

## Scientific explanations and sources

The laboratory distinguishes clinical distribution, antibody detection, NMJ transmission physiology, motor-unit physiology and tissue findings. It explains test limitations, pretreatment serological context, technical RNS factors, jitter non-specificity, recruitment, and the difference between MRI edema and sampled biopsy histopathology.

Frozen figures come from the manuscript and audit through the shared `frozenStudy` object: N=38; 38/38 MG-like phenotype; AChR-positive 11/30 (36.7%); formal NMJ testing 4/38; objective abnormality 0/4 with exact 95% CI 0–60.2%; one SFEMG within those four; myopathic needle EMG 6/11 (54.5%); none of the 11 AChR-positive patients had documented RNS/SFEMG. Missing tests are never counted as negative, and muscle injury and genuine NMJ dysfunction may coexist.

The four supplied documents were reviewed. The SfN abstract and audit spreadsheet remain absent; no independent spreadsheet recalculation is claimed. Public context uses existing Guidon, Plomp, Ucem and SITC references, with verified specialist sources by Stålberg (1974, 2019), Skolka (2022) and Kouyoumdjian (2020). Müller-Jensen (2023) supports the brief anti-titin context explanation, which adds no new cohort statistic or functional NMJ inference. Exact metadata, verification/access limits and claim support are recorded in [phase2-scientific-review.md](phase2-scientific-review.md). Primary anatomical localization studies support the original simplified NMJ drawing; the artwork is not copied from those publications.

Every scientific panel retains the four evidence categories. The laboratory states that suspected ICI-related myocarditis, rapidly progressive bulbar weakness or respiratory compromise requires urgent clinical evaluation and management; completing all tests is not a prerequisite for urgent care. It provides no prescribing advice, treatment doses or individual recommendations. No hypothetical scenarios or patient-level data were added.

## Executed verification

The final full Playwright run completed successfully: **47 passed and one intentionally skipped** desktop mobile-menu case. There were no unexpected failures. This includes the Phase 1 regression suite and 22 laboratory cases across desktop and mobile. The final mobile SFEMG initial-position behavior is covered in the responsive test.

After the final source-supported anti-titin context addition, the production build, lint and publication-boundary check passed again, followed by **eight successful desktop/mobile checks** covering all-view navigation, serology, accessibility and screenshots. The full 48-instance report remains in `playwright-report/`; the focused follow-up report and artifacts are under `/tmp/triple-m-phase2-followup-report` and `/tmp/triple-m-phase2-followup-results`.

Checks covered all four laboratory views, all five clinical regions, all nine findings and three manual perspectives, reversible waveform states, frozen denominators, visible educational trace labels, valid reference anchors, keyboard operation, tooltips, reduced motion and widths of 390px/768px. Automated axe checks detected no WCAG 2/2.1 A/AA violations in the tested anatomy/comparison views or seven laboratory states per device project. Runtime hooks detected no browser or same-origin asset errors in the successful run.

Representative desktop/mobile screenshots were reviewed, including clinical anatomy, serology, decremental RNS, SFEMG jitter/blocking, myopathic needle EMG and the evidence board. The suite attaches six laboratory viewport captures per project, alongside Phase 1 captures, in ignored `test-results/` and `playwright-report/` directories. There is no automated screenshot-baseline or anatomical-accuracy claim.

TypeScript validation through the production build, lint, Vite compilation and publication-boundary checks passed. The build contains four public files and no original research documents, internal source paths or patient records detected by the publication check. The existing workflow was parsed and its dist-only artifact, deployment dependency and base-path propagation were verified. Local tests use the production bundle under `/triple-m-neuromuscular-atlas/`. Remote Actions and deployment were not run.

Original source files remain ignored and unchanged. Browser reports, traces and screenshots remain ignored. Automated accessibility results do not certify anatomical/clinical validity or comprehensive assistive-technology usability.

## Limitations and deferred visuals

These are simplified, non-scale diagrams and qualitative signal examples, not a comprehensive anatomical atlas or electrophysiological simulator. Technical interpretation depends on specialist context. Laboratory view state is browser-local and starts from defaults when changing views; it does not store clinical information. Source checks do not replace the scientific-author review required before public launch.

The missing abstract and spreadsheet limit source review and prevent an independent data recalculation. Phase 3 remains an informational preview. No records or mock patients were generated. Optional hypothetical educational scenarios were omitted in favor of the four core views.

[VISUAL_REFINEMENT_BACKLOG.md](../VISUAL_REFINEMENT_BACKLOG.md) defers heart anatomy, a consistent immune-cell system, tissue-level inflammatory detail, cross-model anatomical consistency, enlarged mobile anatomy detail and optional advanced illustrations until after Phase 3.

## Local preview

```bash
npm run dev
```

Open `http://localhost:5173/triple-m-neuromuscular-atlas/#laboratory`. In Codespaces, forward port 5173 and use the same path and fragment on the forwarded origin. Production preview uses `npm run preview` on port 4173. See the README for custom base paths and GitHub Pages configuration.

## Before Phase 3

Obtain scientific-author review of the anatomy, waveform explanations, provenance and uncertainty language; complete manual screen-reader/keyboard review including narrow diagram regions. Define and separately validate a publication-safe patient-level schema that distinguishes unperformed, unreported, indeterminate and negative testing. Retain exact denominators and source provenance. Do not import unpublished source spreadsheets or documents into public assets. Review the missing abstract when available and prioritize Spanish localization separately.
