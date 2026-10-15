# Editorial 2D redesign — inspection before implementation

14 October 2026, America/Mexico_City.

The user-provided heart image is the mandatory visual reference: delicate organic contours, muted anatomical pink/red and vascular blue, violet inflammatory cells, subtle planar shading, warm white and mint explanatory panels. Its clinical callouts are style references, not additional Triple M findings. New artwork will be original, label-free raster illustration with separate interactive SVG/HTML; electrophysiological signals remain deterministic SVG.

## Starting worktree and functional inventory

The starting worktree contains unfinished raster substitutions. `MedicalArtwork`, a typed BASE_URL-aware manifest and several consumers already exist, but all fourteen image URLs point to absent files. Several captions still describe 3D/sculptural anatomy. Anatomical selections were moved to topic buttons without corresponding region highlights. These are incomplete integration issues, not validated delivered artwork.

| Requested section | Functions to preserve | Visual work |
| --- | --- | --- |
| Explore Anatomy | Three tissue selections and hero navigation; independent heart/muscle/NMJ state; cardiac conduction and cellular inset; NMJ four compartments and five manual signal stages; enlargement and evidence panels. | Original editorial heart/coronary anatomy, organized/injured skeletal tissue and endplate; calibrated SVG targets and highlights rather than topic-only changes. |
| Compare Mechanisms | NMJ, muscle and overlap lenses; coexistence message; existing 0/4 and 6/11 metrics and uncertainty. | Equal-size illustration frames and coherent reusable tissue; separate myocardial context, without converting the comparison into a diagnostic classification. |
| Clinical Phenotype | Five regional selections, synchronized clinical/mechanistic explanations and optional tissue detail. | Editorial anterior muscle atlas with heart and aligned ocular/bulbar/cervical/proximal/respiratory regions and connected selective details. |
| Serological Evidence | AChR/MuSK/context selections, interpretation and exact 11/30 result. | Separate antibody/target artwork, anatomy and qualitative positive/negative/indeterminate interpretation; never infer transmission failure from binding. |
| Electrophysiology | RNS decrement, SFEMG jitter/blocking and needle-EMG pattern controls; deterministic signals, sample logic and missingness limits. | Editorial motor-unit/procedure anatomy with method-specific electrodes and precise existing SVG signals. No generated waveform, invented scale or new measurement. |

Existing React controllers, reference/evidence data, frozen aggregate values, original reports and release policies are retained. The regional map, shared anatomy and comparisons require replacing graphic layers, not rebuilding the diagnostic modules.

## Scientific representation boundaries

The existing scientific reviews, anatomy models, laboratory data and previous Phase 4A sources inform compartment relationships. The illustrations distinguish established anatomy, selected literature pathology, proposed mechanisms and current pooled results. No universal shared antigen, confirmed MG in every case, abnormal formal NMJ testing in this cohort, cohort-wide biopsy infiltration or preserved-LVEF exclusion is introduced. Generated tissue is explicitly illustrative; cell type is a symbol supported by the cited literature, not a histological inference from artwork.

Source checks retain presynaptic calcium-channel/release-site organization, crest AChRs and extracellular basal-lamina AChE; peripheral skeletal nuclei versus central cardiac nuclei; interstitial rather than intramyofiber vessels/cells; broad cardiac activation anatomy. RNS remains a serial CMAP example, SFEMG temporal variability/blocking and needle EMG motor-unit morphology/recruitment. Qualitative examples do not create new numerical cohort findings.

## Production and review

Use the built-in image-generation tool with the supplied image as a style reference. Save project-bound assets in `public/media/editorial/`, preserve raster format honestly, keep labels and interaction overlays separate, and document prompts/assets and source limits. Inspect actual generated assets before aligning overlays. Review all five sections at desktop/tablet/mobile widths, verify assets and Pages paths, retain meaningful regression tests and run production exclusion. No publication, commit, push or deployment is part of this task.
