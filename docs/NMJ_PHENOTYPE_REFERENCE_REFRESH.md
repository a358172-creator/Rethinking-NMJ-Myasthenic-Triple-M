# NMJ and clinical phenotype reference refresh

The supplied references have been recreated as two original pastel editorial 2D plates and integrated into the existing interactive page.

## Delivered artwork and coverage

| Plate | File | Canvas | Encoded size |
| --- | --- | --- | --- |
| Neuromuscular junction | [nmj-reference.webp](../public/media/editorial/nmj-reference.webp) | 1536 × 1024, white background | 402,986 bytes |
| Clinical muscle atlas | [clinical-three-view.webp](../public/media/editorial/clinical-three-view.webp) | 1536 × 1024, alpha preserved | 384,378 bytes |

Both plates were created with the built-in image-generation tool using the user-supplied references. Chromium canvas only encoded the selected PNGs to WebP at quality 0.94; it did not crop or retouch anatomy. Selected source PNGs, prompt history and SHA-256 metadata are retained locally under `.artifacts/nmj-phenotype-refresh/`. Earlier NMJ variants with a dark translucent background artifact were rejected. The selected NMJ plate uses a clean white canvas matching the supplied opaque reference. The three-view atlas was checked composited on the site's light background.

All three NMJ manifest IDs point to the new shared plate. This reaches the hero, anatomy overview, detailed explorer, mechanism comparison, optional normal-anatomy reference in serology, and clinical neuromuscular inset. The unmounted legacy SVG wrapper also uses the shared manifest. The distinct motor-unit and antibody-binding illustrations retain their separate roles.

The NMJ's four compartment targets, numbered markers, five manual transmission stages, reduced-activation annotation and downstream muscle-injury annotation were recalibrated against the final artwork. Anatomy remains the same across conceptual states; the teaching marks are separate SVG overlays. HTML compartment keys describe axon, vesicles, mitochondria, calcium channels, basal lamina, receptors, folds and myofibrils without baking small labels into the image.

Nicotinic receptor clusters occupy the fold crests and upper shoulders; the folds' deep troughs are not uniformly receptor-lined. This deliberate adjustment to the supplied reference follows the experimental localization reported by [Fertuck and Salpeter](https://pmc.ncbi.nlm.nih.gov/articles/PMC388231/). The violet mesh is labelled as the basal-lamina location of AChE, rather than individual resolved enzymes or inflammatory cells; basal-lamina anchoring is supported by [Bernard et al.](https://pubmed.ncbi.nlm.nih.gov/20883790/).

## Clinical interaction

The atlas presents anterior, posterior and right lateral anatomy. Desktop initially shows all three; mobile initially enlarges the anterior view. Four native buttons choose all views or an individual view through the SVG viewBox, preserving the complete source file.

The five existing categories remain ocular, bulbar, cervical, proximal and respiratory. Their regional highlights follow the appropriate visible anatomy and preserve the selected clinical interpretation when views change. Posterior anatomy provides three visible targets; selecting ocular or bulbar from its external controls returns to anterior anatomy. The description explains why those deep structures have no posterior surface substitute.

Opaque shorts cover the pelvic and upper-thigh region; notes distinguish visible landmarks from covered muscles. The respiratory markers locate the thoracic region, while the diaphragm and other deep structures are described separately. The cardiac window remains contextual anatomy, separate from the five categories.

Clinical evidence, denominators, patient-data boundaries and scientific validation decisions are unchanged.

## Validation

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed, including publication exclusion (16 build files, 38 available source identifiers checked).
- Targeted clinical mouse/keyboard/view regressions: six passed across desktop and mobile.
- Browser coverage: all 98 discovered cases completed across the recorded desktop results and follow-up blocks: 97 passed and one intentional desktop skip for the mobile-menu test; no failed case. Automated WCAG checks passed for anatomy and all laboratory views.
- Visual review: the final plates and interactive captures were inspected on light backgrounds in desktop, tablet and mobile layouts. The posterior viewBox was shifted by 10 pixels to exclude a fragment of the neighboring figure.
- `git diff --check`: passed.

The original long combined run and a subsequent desktop run were interrupted by the execution environment/continuation before a complete HTML report was written. Completed individual desktop results (45 pass, one skip) are recorded in `.artifacts/nmj-phenotype-refresh/partial-desktop.md`. Completed follow-up reports are saved in `.artifacts/nmj-phenotype-refresh/test-runs.json`: desktop reference checks (three pass), mobile anatomy/editorial checks (nine pass), mobile public regressions (24 pass), and mobile laboratory/reference checks (16 pass). A final desktop clinical-view/reference recheck passed all four cases after the framing adjustment and refreshed the 39 captures. These totals describe coverage across blocks, rather than a successful single combined command; repeated checks are not counted twice in the 98-case coverage total.

`tests/reference-refresh.spec.ts` checks the actual new source file in every visible NMJ consumer and all four clinical views. It produces 39 component captures at 1440, 768 and 390 pixels under `.artifacts/nmj-phenotype-refresh/screenshots/`; the [local review gallery](../.artifacts/nmj-phenotype-refresh/index.html) links each full-size capture. The existing anatomy and laboratory tests cover compartment selection, five transmission stages, conceptual states, keyboard focus and WCAG checks.

No commit, push or deployment was performed.

## Selected generation prompts

The inputs are reference images supplied by the user, not photographs or patient records. No external artwork is fetched.

### NMJ

Reference: [supplied NMJ plate](<../src/components/figures/Ilustración de la unión neuromuscular.png>).

```text
Use the supplied white-background medical illustration as a REFERENCE and recreate a new original 2D pastel medical-journal plate, on a completely clean SOLID WHITE background like the reference. Not transparent. No shadows, haze, vignette, gray gradients or colored wash on the background.
Landscape1536×1024. Normal neuromuscular junction cross section: lavender motor axon descends at top center x770, widens into lavender nerve bouton x330..1255 spanning y170..490, membrane edge at y480. Orange acetylcholine dots in vesicles and cleft, two soft pink mitochondria, purple calcium channels at x625 and925,y480. Pale fine lavender extracellular basal lamina mesh y490..550. Salmon muscle membrane below with three crest tops at x480,788,1115,y570 and deep folded troughs x340,630,960,y670..750. BLUE nicotinic ACh receptors ONLY at convex CREST TOPS of the pink ridges and their immediate upper shoulders, NEVER at fold bottoms or lower sidewalls. Smooth receptor-free membrane in deepfolds. Longitudinal pink myofibrils with subtle striations and sparse peripheral nuclei y760..980.
Keep clean restrained pastel editorial medical-journal style: simple detailed 2D, fine contours, soft flat lavender/salmon/blue/ivory, no3D orphotorealistic texture. White negative space around the silhouette. Base anatomy only, normalphysiology with no injury,antibodiesorimmune cells. No text,labels,leader lines,brackets,arrows,numbers,logo or watermark. Anatomical fills must contrast with pure white background.
```

### Clinical atlas

Reference: [supplied three-view plate](../src/components/figures/dd3e741a-7cb3-4b7c-8ee7-a003a2bc1036.png).

```text
Use case: scientific-educational. Create an original clinical muscle atlas for an interactive medical teaching website, using the supplied plate only as an anatomical and style reference. Landscape1536×1024 with transparent background. Three separate complete adult male anatomical views aligned at same height/scale: ANTERIOR left at x250, POSTERIOR center x770, right-facing LATERAL right at x1280. Head and feet fully visible, relaxed arms, figures do not overlap. Each subject wears simple OPAQUE slate blue athletic shorts from waist to mid thigh in every view. Shorts remain solid fabric, fully covered pelvic region. Elsewhere show superficial skeletal muscles in gentle salmon and coral, ivory fascia/tendons, fine neutral contours. Face, neck, shoulders, chest, arms, lower thighs and calves have simple detailed muscle anatomy. Posterior trapezius and paraspinal muscles visible. Anterior chest has selective translucent rib-cage window with heart and domed diaphragm. Natural lean anatomy. Simple detailed editorial 2D medical journal style, pastel palette, subtle shading and fine fascicle lines. Avoid photorealism,3D, glossy detail or bodybuilding. NO text, labels, numbers, arrows, panels, background shadows, watermark or logos. Leave clear transparent space between the three bodies.
```

