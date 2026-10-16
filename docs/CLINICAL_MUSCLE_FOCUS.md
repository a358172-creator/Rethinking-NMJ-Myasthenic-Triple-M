# Exact clinical reference and selective muscle focus

The Clinical Phenotype Explorer uses the exact image supplied by the user, with no garments added. The original PNG is copied byte for byte; its anatomy, colors, proportions and transparency are preserved in the source asset.

| Source integrity | Value |
| --- | --- |
| Supplied source | `src/components/figures/dd3e741a-7cb3-4b7c-8ee7-a003a2bc1036.png` |
| Served copy | [clinical-reference.png](../public/media/editorial/clinical-reference.png) |
| Dimensions | 1312 × 1199 pixels |
| Size | 3,569,438 bytes |
| SHA-256, both files | `98568058b231d6632ee92e4518f1a556060f1b26a90fb3d6fcc55f5996f16019` |

Selecting ocular, bulbar, cervical, proximal or respiratory anatomy restores the relevant portion of the same image to full opacity. The surrounding atlas remains visible at 60% opacity, preserving anatomical context. Separate SVG contours and clip paths implement this focus without editing the PNG. All four orientation controls and the existing mouse, Enter and Space interactions remain available.

Proximal focus now includes the visible shoulder, upper-arm, hip, gluteal and thigh groups. Respiratory focus excludes the heart and leaves superficial posterior back muscles subdued. Posterior thoracic outlines are regional landmarks; intercostal anatomy is shown in the accompanying detail.

For deep muscles not exposed in the full-body reference, a separately labelled pastel cutaway follows the selection:

- Ocular: rectus and oblique muscles and levator palpebrae superioris.
- Bulbar: tongue muscles, soft-palate muscles and pharyngeal constrictors. These are distinguished from superficial facial muscles.
- Respiratory: diaphragm and intercostal muscles, with ribs and lungs subdued.

The cervical and proximal selections list the corresponding muscle groups beside the atlas. Each detail links its anatomical basis. These are teaching illustrations; cohort values and scientific validation decisions are unchanged.

Verification includes exact served-source byte comparison, distinct focus masks, mouse/keyboard equivalence, deep-muscle labels, all five clinical states under automated WCAG checks, and responsive captures at 1440, 768 and 390 pixels.

| Check | Result |
| --- | --- |
| Original and public PNG hashes | Identical; served bytes also compared by the browser regression checks |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS, including publication exclusion: 17 build files and 38 available source identifiers checked |
| Desktop laboratory | 13 passed |
| Desktop clinical-view/reference checks after respiratory refinement | Four passed |
| Mobile laboratory and reference checks | 16 passed, including all five clinical WCAG states |
| Final desktop visual refresh | Three passed; 54 review captures refreshed at the final 60% context opacity |
| `git diff --check` | PASS |

The clinical-view regression also verifies that the restored-photo mask excludes the heart and superficial posterior back, while including a visible intercostal landmark. It preserves the deep respiratory detail when the posterior photo has no exposed intercostal muscle. The final transparency adjustment received a further visual refresh; repeated cases are retained as separate run summaries.

Local integrity metadata, completed test summaries and review captures are under `.artifacts/clinical-muscle-focus/`. The [local visual gallery](../.artifacts/clinical-muscle-focus/index.html) groups each selection and orientation by screen width. The previous generated clinical plate is retained as a historical asset and is no longer referenced by the clinical manifest entry.
