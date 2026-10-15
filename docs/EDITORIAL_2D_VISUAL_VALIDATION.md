# Editorial 2D scientific illustration redesign

14 October 2026, America/Mexico_City. Local implementation and review; no publication.

## Result and scope

The five requested areas now use one original editorial illustration collection based on the supplied heart reference. Delicate organic contours, pink tissue, blue neural/vascular anatomy, violet nuclei/cellular symbols, warm-white grounds and mint explanatory panels replace the unfinished raster integration. The starting issues and interaction inventory were recorded before implementation in [EDITORIAL_2D_REDESIGN_AUDIT.md](EDITORIAL_2D_REDESIGN_AUDIT.md).

The base illustrations are **real high-resolution raster assets**, not SVG artwork disguised around PNGs. Interactive anatomy, connectors, numbered labels, physiological state marks, molecular teaching symbols and equipment diagrams are separate editable SVG/HTML. All electrodiagnostic signals remain the existing deterministic SVG code. No dependency was added.

| Requested area | Delivered artwork and preserved interaction |
| --- | --- |
| **Explore Anatomy** | Anterior cardiac/coronary illustration with a limited LV window; separate internal septum/conduction section; cardiac tissue at a second scale. Normal/injury skeletal tissue with calibrated membrane/myofibril/nucleus/endomysium/capillary/inflammatory-focus targets. Blue terminal and pink folded endplate with four selectable compartments, three physiological concepts, five manually highlighted signal stages and enlargement. Native buttons and SVG targets remain synchronized for click, Enter and Space. |
| **Compare Mechanisms** | Matched 3:2 NMJ/muscle artwork frames, equivalent presentation and the existing NMJ/muscle/overlap lenses. Normal tissue is an illustrative counterexample, not a patient assertion. A separate myocardial tissue panel supplies cardiac mechanism context without changing the two-domain comparison or adding statistics. Shared manifestations, coexistence language, metrics and evidence panels remain. |
| **Clinical Phenotype Explorer** | An anterior male muscle atlas with a covered pelvis and a selective heart/intercostal/diaphragm window. Five SVG regions, mint callouts, connectors and external controls select ocular, bulbar, cervical, proximal and respiratory anatomy. Deep ocular/bulbar structures are explained without pretending they are exposed. Existing clinical interpretation remains; cardiac and NMJ expansions are optional context, not extra clinical categories. |
| **Serological Evidence** | A detailed immunoglobulin and generic membrane antigen, with independently labeled antibody, antigen and membrane. Separate editable AChR-channel, MuSK-organizing-protein and sample-timing concepts prevent misidentifying the generic generated protein. Positive, negative and indeterminate teaching controls change their own explanation; 11/30 and the paired-physiology limitation remain fixed. Normal NMJ anatomy is a separate optional reference. |
| **Electrophysiology** | One editorial motor-unit plate reused consistently with three method-specific technical panels. RNS uses surface stimulation/recording with separate differential-amplifier inputs; SFEMG and conventional needle EMG show intramuscular sampling. Existing serial CMAP, jitter/blocking, MUAP and recruitment controls/paths are preserved, including the educational-recording caption and absence of invented measurements. |

## Artwork production and asset integrity

The built-in `image_gen` tool generated nine original base plates using the user-provided image as the mandatory style reference. [All final prompts](EDITORIAL_2D_ASSET_PROMPTS.md) are recorded. [MedicalArtwork](../src/components/figures/MedicalArtwork.tsx) loads the typed [manifest](../src/data/medicalArtwork.ts), uses the GitHub Pages base, declares dimensions/alternative descriptions and supports lazy loading/async decoding.

| Physical WebP asset | Dimensions | Logical reuse |
| --- | --- | --- |
| [heart-normal](../public/media/editorial/heart-normal.webp) | 1536×1024 | Normal/injury cardiac views share anatomical geometry; injury is a bounded programmatic annotation. |
| [cardiac-tissue-normal](../public/media/editorial/cardiac-tissue-normal.webp) | 1536×1024 | Organized branching cardiomyocytes, central nuclei, intercalated discs and interstitial vessel. |
| [cardiac-tissue-injury](../public/media/editorial/cardiac-tissue-injury.webp) | 1536×1024 | Focal illustrative infiltrate/disorganized myocyte, surrounded by organized tissue. |
| [muscle-normal](../public/media/editorial/muscle-normal.webp) | 1536×1024 | Skeletal anatomy, overview and comparison. |
| [muscle-injury](../public/media/editorial/muscle-injury.webp) | 1536×1024 | Tissue explorer, comparison and optional clinical detail. |
| [nmj-normal](../public/media/editorial/nmj-normal.webp) | 1536×1024 | Shared by normal, reduced-activation and downstream-injury states with distinct SVG annotations. |
| [clinical-distribution](../public/media/editorial/clinical-distribution.webp) | 1024×1536 | Controlled regional clinical atlas. |
| [antibody-binding](../public/media/editorial/antibody-binding.webp) | 1536×1024 | Generic molecular recognition, separate from target-specific interpretation. |
| [motor-unit](../public/media/editorial/motor-unit.webp) | 1536×1024 | All three recording modalities; their electrodes/circuits are drawn separately. |

Fourteen logical image views reuse these nine files. Total encoded size is **3,982,344 bytes** (about 4 MB), rather than duplicating normal anatomy for every state. [The preparation script](../scripts/prepare-editorial-artwork.mjs) changes file encoding only: full canvas, dimensions and alpha are retained, with no cropping, retouching or anatomical pixel edits. Original PNGs remain in the generator directory; final project-bound WebPs are in `public/media/editorial/`. [Local integrity metadata](../.artifacts/editorial-artwork/asset-validation.json) records dimensions, alpha checks and source/output digests. Every copied production asset matches its validated digest. The reference itself is not included in the production assets.

## Visual and scientific review

Actual generated images and served application screenshots were inspected. Main organ/tissue plates are dominant, while numbered keys and explanatory text remain outside the base art. The comparison uses equal-size illustration frames. Tablet/mobile layouts stack controls and interpretation without page overflow; the NMJ and waveforms retain deliberate internal enlargement/scrolling when needed. No hover-only information is required.

Review corrections included calibrating sarcolemmal markers onto the actual membrane rather than a peripheral nucleus, reducing NMJ arrowheads, removing a dangling clinical connector and showing independent RNS active/reference amplifier inputs. Component captures omit the fixed navigation to prevent sticky-header stitching artifacts. The anatomical selection paths are calibrated to the final image canvas; they are educational regions, not measured patient segmentation.

Existing scientific descriptions and the prior [Phase 2 scientific review](phase2-scientific-review.md) and [Phase 4A anatomical audit](PHASE4A_ANATOMICAL_VISUAL_AUDIT.md) remain the source framework. Additional primary/official checks used [NHLBI cardiac anatomy](https://www.nhlbi.nih.gov/health/heart/anatomy) and [activation physiology](https://www.nhlbi.nih.gov/health/heart/heart-beats), [Nishimune et al.](https://pubmed.ncbi.nlm.nih.gov/15577901/) for active-zone/calcium-channel organization, [Fertuck–Salpeter](https://pmc.ncbi.nlm.nih.gov/articles/PMC388231/) for receptor-rich fold crests, and [Bernard et al.](https://pubmed.ncbi.nlm.nih.gov/20883790/) for extracellular AChE localization. These inform simplified anatomy; they are not ICI cohort ultrastructure. Selected inflammatory tissue concepts retain the existing Plomp/Ucem/Johnson references and their limited scope.

The reference image’s aortitis, coronary vasculitis, pulmonary-hypertension and atherosclerosis callouts were **not imported as Triple M findings**. Positive serology does not establish transmission failure; negative serology does not automatically exclude disease. Indeterminate, untested and unreported observations remain different. The blue generated antigen is expressly generic, not an AChR or MuSK structural model. Violet extracellular NMJ clusters are explicitly labeled AChE symbols, not inflammatory cells. A myopathic needle-EMG pattern does not prove inflammatory histology; muscle injury does not exclude coexisting NMJ disease. Preserved LVEF does not exclude myocarditis, and the conduction section does not localize a lesion from an ECG.

These are educational illustrations, not quantitatively scaled anatomy, micrographs, diagnostic molecular structures, patient recordings or a validated physiological simulator. Nuclear/cell counts, receptor spacing, tissue extent and damaged fraction are illustrative. The male regional atlas is one anatomical example, not a patient portrait. Specialist/author review is not implied by browser or visual checks.

## Screenshots and local review

[The local collection gallery](../.artifacts/editorial-artwork/index.html) groups the required areas at **1440, 768 and 390 px**. [The capture test](../tests/editorial-visual.spec.ts) writes **27 collection PNGs**: heart, muscle, NMJ, comparison, clinical phenotype, serology and RNS/SFEMG/needle at each width. Files are in [`.artifacts/editorial-artwork/after/`](../.artifacts/editorial-artwork/after/). These are local, ignored review artifacts, not deployed assets.

Examples: [heart](../.artifacts/editorial-artwork/after/collection-explore-anatomy-heart-1440.png), [muscle](../.artifacts/editorial-artwork/after/collection-explore-anatomy-muscle-1440.png), [NMJ](../.artifacts/editorial-artwork/after/collection-explore-anatomy-nmj-1440.png), [comparison](../.artifacts/editorial-artwork/after/collection-compare-mechanisms-1440.png), [clinical map](../.artifacts/editorial-artwork/after/collection-clinical-phenotype-390.png), [serology](../.artifacts/editorial-artwork/after/collection-serological-evidence-390.png), [RNS](../.artifacts/editorial-artwork/after/collection-electrophysiology-rns-1440.png), [SFEMG](../.artifacts/editorial-artwork/after/collection-electrophysiology-sfemg-390.png), [needle EMG](../.artifacts/editorial-artwork/after/collection-electrophysiology-needle-390.png).

## Executed checks

| Check | Result |
| --- | --- |
| TypeScript + production build | PASS; 91 modules, actual raster files included. |
| ESLint | PASS. |
| Aggregate regression | 6 passed; counts, denominators, missingness, intervals and unresolved status preserved. |
| Release-policy regression | 10 passed; no changed publication/preview authorization. |
| Browser regression | **84 cases executed in completed blocks: 83 passed, one intentional desktop skip for the mobile-menu test; zero failures or flaky cases.** Covers anatomy, navigation, comparison, all laboratory controls, aggregate evidence, publication gate and the three-width editorial collection. |
| Asset/Pages verification | Nine actual WebPs match validated digests, have at least 1024 pixels on each axis and retain alpha. Three HTML asset paths resolve under `/triple-m-neuromuscular-atlas/`; browser checks decode the artwork and inspect failed requests. |
| Accessibility | Automated axe WCAG 2 A/AA and 2.1 A/AA, keyboard, pressed-state, focus and reduced-motion checks are part of the regression blocks. These do not replace a manual assistive-technology audit. |
| Publication boundary | PASS: 13 production files; all 38 available private source identifiers checked for exclusion. |
| Preservation | Aggregate/scientific data modules, deterministic waveform code, dependency manifests, original sources and prior scientific reports unchanged. |
| Whitespace | `git diff --check` PASS, including the final source/documentation review. |

Long browser runs are executed in shorter blocks so an interrupted process is not misreported as a completed pass. [The local result ledger](../.artifacts/editorial-artwork/test-runs.json) records completed block outcomes; [the suite summary](../.artifacts/editorial-artwork/browser-suite-summary.json) reconciles all 84 discovered cases. The final 27 collection captures were regenerated after marker, circuit, arrowhead and capture-header corrections. The loopback server serves the aggregate public application, not private patient records. No patient dataset, preview approval, manuscript/workbook amendment, commit, push or deployment was activated. Existing scientific validation failures remain unresolved.

## Reproduction

```bash
npm run test:aggregates
npm run test:release-policy
npm run lint
npm run build
npm test -- --workers=2
git diff --check
```

The browser suite can also run by file/project in shorter blocks. Re-encoding original PNGs is optional and requires a local source-path manifest passed to `node scripts/prepare-editorial-artwork.mjs`; the shipped WebPs already exist. Prompts, the supplied reference and the encoding script document the production process, without claiming deterministic regeneration of image-model output.
