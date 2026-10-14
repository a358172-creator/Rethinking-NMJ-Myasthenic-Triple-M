# Phase 4A — anatomical illustration and visual validation

14 October 2026 — America/Mexico_City. Local implementation for author review; no publication or deployment.

## Delivered scope

All four requested illustrations are rendered, editable React/SVG artwork. The changes replace anatomical geometry, add meaningful physiological states, and reuse the same tissue layers across the existing application. The pre-implementation inventory and scientific boundaries are recorded in [PHASE4A_ANATOMICAL_VISUAL_AUDIT.md](PHASE4A_ANATOMICAL_VISUAL_AUDIT.md).

| Illustration | Before | Implemented anatomy and interaction |
| --- | --- | --- |
| **A · Neuromuscular junction** | Separate overview/detail drawings; bouton, vesicles and folds, without organized active-zone channels, basal-lamina AChE or myofibrils. Two state controls in a narrow interpretation panel. | Distal axon and differentiated terminal membrane; vesicles, docking/fusion profiles, active zones and membrane-spanning Ca²⁺ channel symbols; extracellular cleft, basal lamina and anchored AChE; crest/shoulder nAChRs, junctional folds, sarcolemma and ordered myofibrils. Three states distinguish normal transmission, possible reduced activation and downstream muscle injury with potentially preserved transmission. Four compartments support mouse, Enter and Space selection with synchronized explanations. Five manually selected stages follow nerve excitation through muscle excitation. |
| **B · Skeletal muscle** | Fusiform organ silhouette and a small fascicular inset; comparison used a rectangular fiber with large detached immune-cell symbols. | Three longitudinal fiber cutaways with sarcolemma, banded myofibrils, peripheral myonuclei, cut faces, endomysial connective tissue and an extracellular capillary. Injury remains focal in the middle fiber, with membrane interruption, disorganized myofibrils and tissue-associated T-cell/macrophage symbols. Five normal structures and a sixth inflammatory focus are selectable. The capillary runs between the middle and lower fibers, away from inflammatory cells above the middle fiber. |
| **C · Myocardium** | Simplified cardiac outline and two visible cavities in the overview; no separate interactive tissue detail. | Original oblique four-chamber cutaway with RA/RV/LA/LV, different ventricular wall thicknesses, septum, AV leaflets, chordae/papillary muscles, aortic and pulmonary outflows. Normal/injury controls, myocardium/septum/conduction inspection, optional simplified conduction overlay and expandable branching cardiomyocyte inset with central nuclei, striations and intercalated discs. Conceptual injury affects a bounded area rather than the entire organ. |
| **D · Mechanistic comparison** | Independent simplified anatomy, inconsistent with the normal detail view. | Reuses A and B. The NMJ lens shows reduced activation with organized muscle; the muscle lens shows focal injury with a potentially preserved synapse; overlap shows both conceptual affected states. Visible state labels identify the current model. The existing shared manifestations, interpretation controls, evidence hierarchy, 0/4 and 6/11 denominators and uncertainty remain. |

The comparison prominently states: **“Similar clinical manifestations may reflect different or overlapping physiological mechanisms.”** Normal tissue in a comparison lens is a teaching counterexample, not an assertion about individual patients.

## Integration and component ownership

| Component / location | Role and reuse |
| --- | --- |
| [NeuromuscularJunction.tsx](../src/features/anatomy/components/NeuromuscularJunction.tsx) | `NeuromuscularJunctionDrawing` shared 720×460 layer; accessible SVG wrapper; `NmjExplorer` owns physiological state, compartment, sequence and enlargement controls. |
| [SkeletalMuscleTissue.tsx](../src/features/anatomy/components/SkeletalMuscleTissue.tsx) | `SkeletalMuscleLayer` shared 680×380 layer, standalone SVG and self-contained tissue explorer. |
| [MyocardiumIllustration.tsx](../src/features/anatomy/components/MyocardiumIllustration.tsx) | `MyocardiumLayer` shared 520×510 cutaway, accessible SVG and myocardial explorer with optional cellular inset. |
| [AnatomyWorkbench.tsx](../src/features/anatomy/components/AnatomyWorkbench.tsx) | Full-width enlarged tissue detail below the existing overview/interpretation grid. Tissue selections preserve each explorer’s state while switching tissues; changing to comparison mode remounts the anatomy view when returning. |
| [AnatomicalFigure.tsx](../src/features/mechanisms/AnatomicalFigure.tsx) | Hero and Phase 1 overview reuse all three layers in normal anatomy. Retains exactly three overview selection targets and existing hero navigation. |
| [MechanismExplorer.tsx](../src/features/mechanisms/MechanismExplorer.tsx), [MechanismPanel.tsx](../src/features/mechanisms/MechanismPanel.tsx) | Mount enlarged detail and retain the original scientific interpretation/evidence panels. The former small NMJ controls now live in the detailed explorer. |
| [MechanismComparisonFigure.tsx](../src/features/mechanisms/MechanismComparisonFigure.tsx), [MechanismComparison.tsx](../src/features/mechanisms/MechanismComparison.tsx) | Remove duplicated tissue drawings, reuse controlled anatomy and preserve three nonexclusive interpretations. |
| [NmjDetail.tsx](../src/features/mechanisms/NmjDetail.tsx), [NmjAnatomy.tsx](../src/components/anatomy/NmjAnatomy.tsx) | Phase 2 serology and compatibility adapters use the shared NMJ layer. Antibody binding remains a separate, explicitly named schematic beside explanatory text. |
| [ClinicalPhenotypeExplorer.tsx](../src/features/laboratory/ClinicalPhenotypeExplorer.tsx) | Preserves the existing regional body map and five region selectors. Optional tissue detail reuses the focal injury drawing, with current regional context and an explicit limitation against inferring measured involvement. |
| [Anatomy data](../src/features/anatomy/data/) and [scoped styles](../src/features/anatomy/styles/) | Typed states, structure descriptions, references and responsive styles. Native navy/slate/teal/burgundy/amber tokens; per-instance SVG definitions use React `useId`. No added dependency or raster asset. |

The Scientific Evidence Explorer, aggregate data, statistical graphics and electrodiagnostic waveforms were not redesigned. `.artifacts/` is ignored by Git and ESLint because it contains generated local review files.

## Scientific verification and limits of the models

| Anatomical question | Sources used | Scope of support |
| --- | --- | --- |
| Presynaptic active zones and calcium channels | [Nishimune et al., Nature 2004](https://www.nature.com/articles/nature03112) | Supports the relationship between active-zone organization and presynaptic calcium channels. The drawing is not an ICI-specific ultrastructural observation. |
| Receptor-rich fold crests | [Fertuck and Salpeter, PNAS 1974](https://pmc.ncbi.nlm.nih.gov/articles/PMC388231/) | Informs crest/upper-fold receptor localization, rather than placing receptors throughout fold troughs. |
| Extracellular AChE | [Bernard et al., Molecular and Cellular Neuroscience 2011](https://pubmed.ncbi.nlm.nih.gov/20883790/) | Informs basal-lamina localization near terminals and within folds; AChE is not depicted as a coating on AChRs. |
| Skeletal-muscle compartments | [Histology Guide specimen](https://histologyguide.org/slideview/MH-055a-skeletal-muscle/04-slide-1.html), [Duke teaching specimens](https://histology.oit.duke.edu/DPT/BasicTissues2/MuscleNerve.html) | Confirms peripheral nuclei, myofibrillar organization and extracellular connective tissue/vessels. These are morphology references, not cohort pathology. |
| Selected ICI-associated muscle pathology | [Plomp et al., original report and figure captions](https://pubmed.ncbi.nlm.nih.gov/39896961/), [Ucem et al., original case report](https://pubmed.ncbi.nlm.nih.gov/41835655/) | Supports inflammatory-cell types and muscle injury in selected specimens. The cell positions and lesion extent in this artwork are conceptual, not a reproduction of the published images or a measured distribution. |
| Cardiac chambers, outflows and activation | [NHLBI heart anatomy](https://www.nhlbi.nih.gov/health/heart/anatomy), [NHLBI heartbeat physiology](https://www.nhlbi.nih.gov/health/heart/heart-beats) | Checks four-chamber relationships and the broad SA/AV/His–Purkinje activation sequence. The overlay is simplified anatomy, not an ECG reconstruction. |
| Myocardial injury and clinical context | [Johnson et al., NEJM 2016](https://www.nejm.org/doi/full/10.1056/NEJMoa1609214), [Mahmood et al., original registry](https://pubmed.ncbi.nlm.nih.gov/29567210/) | Supports selected pathology and the distinction between electrical/pump-function domains. No additional numerical result is imported. |

All vector paths were created in code; no published figure was copied or embedded. The drawings do not establish a universal autoimmune target, an antibody-specific mechanism for every ICI syndrome, immune infiltration in every patient or abnormal formal NMJ testing in the working cohort. A myopathic needle-EMG pattern does not independently establish inflammatory myositis. Muscle injury can coexist with NMJ disease. Preserved LVEF does not exclude myocarditis; an ECG abnormality cannot locate or prove the illustrated lesion.

These are educational anatomical models, not patient-specific 3D reconstructions, diagnostic simulations or quantitatively scaled histology. Species variation, terminal Schwann cells, T-tubule/sarcoplasmic-reticulum detail, full coronary anatomy and complete conduction microanatomy are not reproduced. Relative membrane thickness, molecule counts, receptor opacity, cell counts and lesion areas are illustrative. The manual NMJ sequence expresses causal order, not timing. Biological accuracy beyond this source-based review remains subject to specialist/author review.

## Visual review and screenshot locations

The existing public aggregate build was captured before implementation at **1440, 768 and 390 px**. Fifteen baseline PNGs remain in [`.artifacts/phase4a/before/`](../.artifacts/phase4a/before/). The temporary baseline capture test was removed after preserving those files; it must not overwrite the baseline during routine regression runs.

The final capture test writes **32 after PNGs**: ten views at all three widths, plus NMJ enlargement at 768 and 390 px. [The local comparison gallery](../.artifacts/phase4a/index.html) groups the originals and replacements. These are ignored workspace artifacts, not assets included in the production build or committed documentation attachments.

| Review example | Before | After |
| --- | --- | --- |
| Tissue overview, desktop | [Before](../.artifacts/phase4a/before/overview-1440.png) | [After](../.artifacts/phase4a/after/overview-1440.png) |
| NMJ normal, mobile | [Before](../.artifacts/phase4a/before/nmj-normal-390.png) | [After](../.artifacts/phase4a/after/nmj-normal-390.png), [enlarged detail](../.artifacts/phase4a/after/nmj-enlarged-390.png) |
| NMJ impairment, tablet | [Before](../.artifacts/phase4a/before/nmj-impaired-768.png) | [After](../.artifacts/phase4a/after/nmj-impaired-768.png) |
| Muscle injury, desktop/mobile | No standalone detailed tissue explorer existed. | [Desktop](../.artifacts/phase4a/after/muscle-injury-1440.png), [mobile](../.artifacts/phase4a/after/muscle-injury-390.png) |
| Myocardial injury and inset | The earlier heart is visible in the baseline overview. | [Desktop](../.artifacts/phase4a/after/heart-injury-1440.png), [tablet](../.artifacts/phase4a/after/heart-injury-768.png), [mobile](../.artifacts/phase4a/after/heart-injury-390.png) |
| Comparison, desktop/mobile | [Desktop](../.artifacts/phase4a/before/comparison-1440.png), [mobile](../.artifacts/phase4a/before/comparison-390.png) | [Desktop](../.artifacts/phase4a/after/comparison-1440.png), [mobile](../.artifacts/phase4a/after/comparison-390.png) |
| Laboratory serology, mobile | [Before](../.artifacts/phase4a/before/laboratory-serology-390.png) | [After](../.artifacts/phase4a/after/laboratory-serology-390.png) |

Actual PNGs were inspected, including desktop detail, tablet reflow and mobile legends/controls. The new anatomy adds visible compartment boundaries and tissue structure; the improvement is not limited to color or stroke changes. The independent muscle/comparison review inspected normal/injury and comparison at all three widths. It identified a capillary projection overlapping inflammatory cells; the final geometry places the vessel in a different extracellular corridor. The NMJ review prompted optional enlargement with keyboard-scrollable inspection. Fine cardiac labels are hidden on mobile, with readable external legends; the cardiac detail stacks at tablet widths to give the anatomy more space.

The compact overview is a navigation map. Enlarged tissue detail supplies the fine anatomy. Mobile NMJ detail can expand to 720 SVG pixels, while comparison and muscle detail retain bounded horizontal scrolling. External controls and explanations remain readable without hover. The serology SVG fits its viewport. No whole-page horizontal overflow was observed in the automated checks.

## Executed verification

| Check | Result |
| --- | --- |
| `npm run build` | PASS after final visual changes; includes TypeScript validation, Vite production compilation and publication exclusion. 82 modules; no added dependency. |
| `npm run lint` | PASS. Generated local artifact files are excluded; application and test source remain checked. |
| `npm run test:aggregates` | **6 passed**: audited categorical totals/cross-tab, denominators, missingness, intervals and unresolved scientific status. |
| `npm run test:release-policy` | **10 passed**: authorization metadata remains closed when prerequisites are missing or incompatible. |
| Initial complete `npm test -- --workers=2` | **75 passed, one intentional desktop-only skip**, no failures or flaky cases; 76 discovered. |
| Post-refinement anatomy regression | **12 passed** against the final build: six desktop cases in two short blocks and six mobile cases. No failures, skips or flaky cases. |
| New anatomy coverage | 12 desktop/mobile cases: three NMJ states, four compartment targets, five transmission stages, muscle normal/injury and structure selection, cardiac state/conduction/inset, reuse in comparison/laboratory, responsive captures, unique IDs and valid SVG references. The final run also exercises NMJ enlargement and arrow-key scrolling. |
| Accessibility | Automated axe WCAG 2 A/AA and 2.1 A/AA checks for the three tissue explorers plus the existing anatomy/comparison/laboratory/evidence checks. Keyboard activation, pressed-state synchronization and reduced-motion behavior are exercised. These checks do not constitute complete accessibility certification or a manual screen-reader audit. |
| GitHub Pages paths | All three HTML asset references use `/triple-m-neuromuscular-atlas/` and resolve to built files. Browser regressions use that base and check runtime/asset errors. |
| Publication boundary | PASS: four build files checked; all 38 available private source identifiers checked for exclusion. No private source/export paths or patient-record markers in the build. |
| `git diff --check` | PASS, including the final source/documentation review. |

The earlier baseline build and final builds needed the existing sandbox escalation because the publication checker invokes Git. Browser checks use the loopback test server (`127.0.0.1:4173`); they serve the public aggregate application. No public tunnel or patient preview was created.

After the initial complete passing run, two longer repeat runs were terminated with exit 143 before completion; neither is counted as a completed pass. The affected anatomy checks were then run in short blocks against the final build. The initial complete-run summary and final block summaries are preserved in [browser-run.initial.json](../.artifacts/phase4a/browser-run.initial.json) and [browser-runs.final.json](../.artifacts/phase4a/browser-runs.final.json). This distinguishes the full regression result from final targeted verification after the mobile/geometry refinements.

## Preservation and remaining work

Frozen aggregate definitions, original workbook/manuscript, scientific validation reports, source-provenance artifacts and release-policy code were not edited. No patient dataset was enabled. Existing source-integrity and full-study biochemical failures remain unresolved; visual and software checks do not turn those scientific gates into PASS. No commit, push or deployment was performed.

Phase 4B should concentrate on the already-deferred statistical and electrodiagnostic presentation: improve chart annotation/denominator legibility and waveform visual clarity while retaining exact aggregate values, physiological semantics and the existing evidence boundaries. Further anatomy work can add author-approved specialist refinements and a dedicated manual screen-reader review. Any publication remains a separate decision about the exact candidate and destination.

## Reproduction

```bash
npm run test:aggregates
npm run test:release-policy
npm run lint
npm run build
npm test -- --workers=2
git diff --check
```

The complete browser run recreates after captures. It does not recreate or replace the preserved before captures. Generated screenshots, browser reports and local gallery stay outside the production bundle.
