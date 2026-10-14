# Phase 3B UI integration audit

13 October 2026 — America/Mexico_City. Inspection preceded integration; original research sources remain untouched.

## Baseline and attribution

The repository was clean at the start of Phase 3B. The existing React/TypeScript/Vite app mounts the hero, study summary, Pathophysiology Explorer, Diagnostic Laboratory, a patient-atlas availability notice, research overview, module directory and references. Navigation and layout use shared `locale.ts`, `global.css` and `tokens.css`. Private patient components are unmounted; no patient dataset is imported.

Recent commits inspected: `edda34d` (explanatory figures and tests), `567181a` (Phase 3A.2 scope/provenance/privacy infrastructure), `36365a2` (earlier laboratory/data work) and `12added` (original design). Available author metadata and commit bodies do not establish Argon 4 attribution. Decisions below follow actual functionality, scientific scope and design compatibility. No commit was blindly reverted.

The established design uses white/near-white backgrounds, navy serif headings, teal/burgundy accents, thin rules and restrained interactions. The latest `scientific-figures.css` instead introduced a separate dark token palette, bright cyan/emerald/rose, rounded cards and a pronounced shadow. `MechanismComparisonFigure.css` added dark gradients. SVG labels were designed for that dark background, so changing only the card background would impair readability.

## Decisions

| Classification | Actual component/infrastructure | Integration decision |
| --- | --- | --- |
| KEEP | Header/Footer, hero, anatomical selection, `MechanismExplorer`, `DiagnosticLaboratory`, evidence key/panels and scientific references | Preserve working interactions, shared design tokens and educational boundaries. |
| ADAPT | `StudyStats`, `science.ts` | Centralize descriptive values in one typed aggregate module; mark all working-cohort findings provisional. Retain mortality as secondary context. |
| ADAPT | `ResearchOverview` | Remove the duplicate static figure; keep concise research context and compact methodological/provenance limitations rather than audit-file/workflow notices. |
| ADAPT | `UpcomingModules`, navigation/locale and footer | Replace the unfinished patient module with a working Scientific Evidence Explorer link. Present three complementary available modules. |
| ADAPT | `ScientificFigure` framing and `MechanismComparisonFigure` palette | Reuse native tokens, remove dark cards/gradients/shadows and make existing SVG labels readable. Preserve geometry and conceptual caveats. |
| REMOVE FROM UI | Mounted `PatientAtlasAvailability` | Replace the public pending-patient announcement with an aggregate-only module. The old component stays unmounted as historical code. |
| REMOVE FROM UI | Mounted `ClinicalEvidenceFigure` | Its static panels repeat serology, NMJ and needle findings and make biomarker review prominent. Replace them with focused interactive aggregate charts. Keep this component unmounted; no anatomy/code deletion is needed. |
| RETAIN AS PRIVATE RESEARCH INFRASTRUCTURE | `scripts/atlas/`, Phase 3A/3A.2 reports/specifications, troponin proposal, ignored workbook/manuscript/adjudication artifacts, unmounted `features/atlas/` and approval contracts | Preserve scientific failures, source history, privacy and full-study export gate. None becomes a browser dependency. |
| KEEP | Production exclusion verifier, ignored source paths and loopback Playwright server | Keep publication safeguards and existing GitHub Pages configuration. |
| DEFER TO VISUAL REFINEMENT | Anatomical SVG geometry and detailed tissue illustration | No new anatomical illustration or structural redraw in Phase 3B. |

The clinical figure's scientific caveats were useful; removal is based on duplication, reading hierarchy and the revised scope, not guessed authorship. Its locally hardcoded cardiac count and extra zero-positive category are unnecessary in the new focused module. The new evidence categories must remain documentation categories rather than inferred biological types.

## Revised integration and regression scope

The third module uses only centralized aggregate counts. Its four visualizations cover testing availability, AChR/formal-NMJ cross-tabulation, objective NMJ evidence categories and conventional needle EMG. Native selectors reveal domain-specific interpretation; SVG segments encode aggregate counts without patient identities. A compact synthesis distinguishes numerical reproduction from unresolved Siu/Gómez provenance and unvalidated biochemical summaries.

Navigation changes from `#patients` to `#evidence`. Old patient-placeholder tests and the duplicate clinical-figure test must be replaced with functional aggregate/no-private-data checks. Preserve Phase 1/2 regressions and existing mechanism scrolling coverage; add all chart states, exact denominators/cross-tab margins, desktop/mobile containment, keyboard operation and accessibility checks.

No private export, public patient endpoint, dataset reconstruction, authoritative-source correction, scientific failure downgrade, commit, push or deployment is part of this integration. A successful public build establishes software/publication boundaries, not complete scientific validation.
