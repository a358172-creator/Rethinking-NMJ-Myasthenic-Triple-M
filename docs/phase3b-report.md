# Phase 3B delivery — Scientific Evidence Explorer

13 October 2026 — America/Mexico_City.

Phase 3B implements the revised aggregate-only scientific direction in the existing React/TypeScript/Vite website. It complements the functioning Pathophysiology Explorer and Diagnostic Laboratory. No public patient atlas, individual records, patient API or exporter is activated. Scientific source limitations remain explicit; software completion does not resolve them.

## 1. Third module and visualizations

The new module is **Scientific Evidence Explorer**, with the requested subtitle **What the Published Evidence Demonstrates — and What Remains Uncertain**, available at `#evidence`.

| Interactive visualization | Implemented behavior and scientific boundary |
| --- | --- |
| **How Much of the Neuromuscular Phenotype Was Actually Tested?** | Three selectable horizontal bars compare AChR 30/38, formal NMJ 4/38 and needle EMG 11/38. Evaluated versus undocumented segments, explicit denominators and domain descriptions remain visible. Selection reveals interpretation and the relevant result/interval. Availability is not sensitivity or specificity. |
| **Antibody Positivity Is Not Physiological Confirmation** | Three serological selectors update the paired formal-testing counts, a segmented bar and interpretation. The complete audited aggregate cross-tab stays visible. The 0/11 formal-testing observation is prominent; missing physiology is never described as normal transmission. No association test is invented. |
| **The Physiological Evidence Gap** | Selectable documentation categories show four formal negative, two qualitative indeterminate and 32 undocumented objective-evidence records. The two qualitative records remain inside the 34 without formal testing. A separate 0/4 result and exact 0–60.2% interval visualize uncertainty without asserting absence of NMJ dysfunction. |
| **What Did Conventional Needle EMG Show?** | Four selectable interpretations show 6/1/1/3 within 11 evaluated. The additional 27/38 undocumented examinations appear outside that distribution. Myopathic findings do not independently establish inflammatory myositis or exclude concurrent NMJ dysfunction. |

The synthesis contains the four requested conclusions and a separate compact limitation note. Mortality appears as secondary source-reported context: a modest line in the existing overview and an expandable outcome section in Module 3. Native selectors use `aria-pressed`, visible keyboard focus and announced selected interpretation; all charts encode aggregate segments, not patient identities.

## 2. Recent-change audit and cleanup

[PHASE3B_UI_INTEGRATION_AUDIT.md](PHASE3B_UI_INTEGRATION_AUDIT.md) records the clean baseline, recent commits and classification decisions. Available commit metadata does not identify Argon 4; no authorship was guessed and no broad revert was performed.

- **Kept:** original application layout, anatomical interactions, the complete Diagnostic Laboratory, evidence key/panels, references and publication safeguards.
- **Adapted:** shared study summary, research overview, module directory, navigation/footer, centralized aggregate projections and the recent mechanism-figure framing/palette.
- **Removed from the mounted UI:** the unfinished `PatientAtlasAvailability` notice and the duplicated `ClinicalEvidenceFigure`. Their source files remain unmounted. The old `UpcomingModules` implementation became `ScientificModules`, with three functional links.
- **Retained as research infrastructure:** all Phase 3A processing/tests, full/core reports and specifications, private source/adjudication files, publication-control contracts and unmounted patient components.
- **Deferred:** detailed anatomical refinement. Existing mechanism SVG geometry, coordinates, descriptions and keyboard-scrolling behavior are preserved; only palette/framing and provisional-caption language changed.

The recent dark/neon figure palette, gradient cards and prominent shadow were replaced with shared white/navy/teal/burgundy/amber tokens. No new anatomical drawing or external visual framework was introduced.

## 3. Navigation, layout and maintenance

Main navigation, the three-module directory, research navigation, footer and research-context link now lead to `#evidence`. The `#patients` placeholder is no longer mounted. Each chart has a working internal anchor. The title hierarchy, serif headings, thin rules, whitespace and subtle selected states follow the established website.

The module uses responsive layouts with stacked detail panels on narrower screens. All count bars fill their displayed width; segment lengths preserve their denominators across viewport sizes. Missing information uses a neutral hatched segment alongside explicit text labels, rather than a negative/normal color. Conventional-EMG categories retain names and counts, with colors as supplementary encoding.

`src/data/aggregateEvidence.ts` is the typed source of the requested numeric aggregates and exact intervals. It derives missing counts, display strings, category arrays and cross-tab margins. Existing `science.ts` exports are compatibility projections for Phase 1/2; no new component embeds a duplicate statistical constant. The frontend imports no workbook, audit report or private crosswalk. No dependency was added, and GitHub Pages/Vite base configuration is unchanged.

## 4. Displayed results and scientific status

All working-cohort findings are labeled **provisional literature-derived pooled findings, pending final source-provenance reconciliation**. The 38 reported patients and 27 publication keys are provisional working counts; unique source IDs/keys do not establish clinical distinctness or correct attribution. The MG-like phenotype is an inclusion characteristic.

| Domain | Numerically reproduced display |
| --- | --- |
| AChR | 30 tested; 11 positive, 19 negative, eight not documented; 11/30 = 36.7%, exact 95% CI 19.9–56.1%. |
| Formal NMJ | 4/38 documented, 34/38 undocumented; 0/4 abnormal, exact 95% CI 0–60.2%. One SFEMG examination is nested within the four. |
| NMJ evidence | Four formal negative, two qualitative indeterminate, 32 with no documented objective evidence. Documentation categories are not biological disease types. |
| AChR/formal-NMJ cells | Positive 0/11; negative 4/15; undocumented 0/8, expressed as documented/not-documented counts within each serological group. Row totals are 11/19/8; column totals are 4/34. |
| Conventional needle EMG | 11 evaluated: six myopathic, one neuropathic, one normal, three indeterminate; 27 not documented. Myopathic 6/11 = 54.5%, exact 95% CI 23.4–83.3%. |
| Secondary outcomes | 16 deaths, 21 survivors, one unknown. Mortality 16/38 = 42.1%, exact 95% CI 26.3–59.2%, with heterogeneous follow-up and no population fatality-risk inference. |

The module explicitly states unresolved Siu/Gómez attribution, possible duplication and categorical discrepancies. Quantitative troponin summaries and subgroup comparisons remain unvalidated and are absent. There are no newly inferred p values, causal comparisons, prevalence estimates, diagnostic algorithms or definitive mechanistic classifications.

The existing scientific reports remain unchanged: **FULL_STUDY_VALIDATION FAIL (44/48)** and **CORE_ATLAS_VALIDATION FAIL (44/46)**, while **CORE_ATLAS_NUMERICAL_VALIDATION PASS** remains a limited numerical status. No failed check was removed, downgraded or changed to PASS for this public module. Private preview/publication approvals and the core export policy retain their previous pending/inactive states.

## 5. Executed verification

| Check | Executed result |
| --- | --- |
| `npm run typecheck` | PASS; also executed in the final production build. |
| `npm run lint` | PASS. |
| `npm run build` | PASS: TypeScript, Vite and existing public-build exclusion check. |
| Publication exclusion | PASS: four build files and all 38 locally available source identifiers checked for exclusion. |
| `npm run test:aggregates` | **6 PASS**, no skips. Actual executed audit counts/CIs, cross-tab margins, missingness, scientific FAIL states and aggregate-only schema checked. |
| `npm run data:test` | **43 PASS**, no skips. Existing actual-workbook/failure-gate and private-preservation regressions retained. |
| `npm run test:release-policy` | **10 PASS**, no skips. No policy/preview activation is inferred. |
| `npm test`, final SVG-fit/outcome version | **63 PASS, one intentional desktop skip** for the mobile-menu case; no failures. All 64 cases executed or explicitly skipped across five files. |
| `git diff --check` | PASS. |
| Source/report preservation | **45/45 existing research and scientific-review file digests unchanged**. Includes original workbook/manuscript, prior full/core reports and all restricted adjudication artifacts. |
| Anatomy/deployment integrity | Mechanism SVG geometry matches the baseline; Pages workflow and Vite base unchanged. |

The final suite measures aggregate proportions on screen at 320 and 1440 px, checks containment at 320/390/768/1440, expands secondary outcomes, and repeats desktop/mobile interactions, navigation, selected-state axe checks and all Phase 1/2 regressions. Segment-width checks confirmed that every bar fills its displayed width and represents the audited fractions. No patient-level interaction was tested or claimed.

Screenshots inspect the full module, focused serology comparison and retained mechanism figures in desktop/mobile. Header/skip-link visibility is suppressed only for capture artifacts; ordinary keyboard/focus behavior remains tested. Automated checks do not substitute for manual screen-reader or clinical review.

Chromium and the loopback preview required the sandbox permission already used for browser testing; the restricted server/browser attempts failed with permission errors and were not counted as passing checks. The build verifier likewise uses the approved execution environment to spawn Git. The server serves only the aggregate public build at 127.0.0.1.

## 6. Exclusion and preservation

No patient records were serialized, reconstructed, imported or visualized. No public/private patient endpoint, download, crosswalk or API was created. The original patient review export remains absent. Existing private artifacts stay ignored and untracked; production contains the app and favicon only. Browser state comprises domain selections, never clinical inputs or patient identities.

An additional local scan checked all 28 changed/new review files for the 38 actual source identifiers without printing those identifiers: zero matches. Frontend source imports/endpoints for private research data: zero. The existing production verifier and browser-request checks passed independently.

Source preservation was checked against a local pre-edit digest manifest. No original workbook/manuscript, case membership, original validation target, private provenance or prior scientific report was changed. No commit, push, release or deployment was performed. Unresolved scientific gates remain unresolved.

## 7. Remaining issues and final polish

The requested aggregate module is independent of a patient-release workflow, but its descriptive findings remain provisional. The author still needs to resolve Siu/Gómez source identity/category issues and approve any troponin manuscript amendment. Those scientific decisions are outside this UI integration and are not represented as completed.

Recommended next review tasks:

1. Complete manual screen-reader/keyboard review, especially announcements after changing a chart selection, chart keys and expanded outcome context.
2. Review scientific wording and provisional status with the manuscript author before conference/publication use.
3. In the separately deferred visual phase, refine anatomical fidelity and label placement across the existing conceptual illustrations. Do not infer mechanisms from the pooled descriptive data.
4. Review typography and print/export requirements for conference presentation; any standalone figure export needs its own labeled denominator/limitations review. No patient data export is proposed.

No unresolved functional failure is being hidden by the scientific qualifications. Any eventual deployment still requires explicit authorization.

## 8. Local preview and reproduction

```bash
npm run test:aggregates
npm run typecheck
npm run lint
npm run build
npm test
npm run data:test
npm run test:release-policy
git diff --check
npm run dev
```

Open `http://localhost:5173/triple-m-neuromuscular-atlas/#evidence`. This is an aggregate scientific module, not a patient preview. Existing Pages configuration uses its configured repository base on deployment; no live deployment URL is asserted here.
