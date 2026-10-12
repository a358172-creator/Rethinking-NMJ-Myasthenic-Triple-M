# Phase 1 and Phase 2 verification

Run `npm run typecheck`, `npm run lint`, and `npm run build`, then install Chromium with `npx playwright install chromium` and run `npm test`. The Playwright suite serves the production bundle beneath `/triple-m-neuromuscular-atlas/`, the configured GitHub Pages path.

The desktop and mobile projects verify:

- Exact frozen study numerators, denominators, percentages, uncertainty interval, and missing paired AChR/NMJ evidence.
- Functional hero navigation, valid internal reference anchors, DOI link format, and successful loading without browser or asset errors.
- Each anatomical selection by text, SVG mouse click, and keyboard Enter/Space, including synchronized selected states and hero-to-explorer activation.
- Four visibly differentiated evidence categories and valid supporting-literature anchors in every interpretation.
- Default normal NMJ physiology and reversible selection of possible impairment, including state-specific explanatory text and accessible diagram names.
- All three comparison states, overlapping manifestations, and distinct explanations of nonexclusive mechanisms.
- No horizontal page overflow at 390px and 768px widths in either explorer mode, and interpretation beneath the anatomy on tablet/mobile.
- Automated WCAG 2 A/AA and WCAG 2.1 A/AA checks in anatomy and comparison mode using axe-core.
- The available diagnostic laboratory link and one clearly labeled Phase 3 preview with no inert controls or loaded patient records.
- Expandable mobile navigation that closes after destination selection.
- Reduced-motion styles that suppress transitions and smooth scrolling while retaining interaction.

The final browser case attaches normal-NMJ and comparison screenshots for each project to the Playwright report. These are review artifacts; no screenshot baseline or automatic visual-accuracy claim is made.

The Phase 2 laboratory suite also runs in both configured desktop and mobile projects and verifies:

- Main navigation to the laboratory, all four laboratory views, mutually exclusive pressed states, and valid global internal anchors.
- Five clinical regions selected through text controls, SVG mouse clicks, Enter, and Space; synchronized anatomy, manifestations, possible muscle/NMJ mechanisms, interpretation boundaries, and visible keyboard focus.
- All serology panels, frozen AChR positivity of 11/30 (36.7%), the absence of formal testing in the 11 AChR-positive patients, and the distinction between missing paired physiology and normal testing.
- Deterministic SVG path changes and reversible RNS, SFEMG, blocking, and needle-EMG states. Every waveform retains its visible educational caption and accessible description; no numerical jitter values are shown.
- Frozen formal-NMJ findings of 4/38 tested and 0/4 abnormal (exact 95% CI 0–60.2%), the single SFEMG evaluation nested within the four, and myopathic needle EMG of 6/11 (54.5%).
- Keyboard-operated CMAP, jitter, and recruitment explanations, including Escape dismissal and retained focus.
- All nine evidence findings, their four interpretation fields and evidence categories, all three manually selected perspectives, and preservation of the chosen perspective when findings change. Selecting a perspective changes the support context while retaining the finding’s measurements, limitations, complementary domain, and evidence.
- Phone/tablet widths of 390px and 768px, figure/panel stacking, SVG containment, and no horizontal page overflow in every view, including abnormal signals. Mobile waveform diagrams preserve readable labels within a bounded horizontal scroll region; ArrowRight keyboard scrolling is verified for each modality.
- Keyboard-operated laboratory navigation, reduced-motion preferences, and continued selection behavior.
- Automated WCAG 2 A/AA and WCAG 2.1 A/AA checks across all four views, RNS decrement, SFEMG increased jitter with possible blocking, and myopathic needle EMG.
- Browser console errors, uncaught page errors, failed asset requests, and same-origin HTTP errors throughout all interactions.

Six additional viewport screenshots per project capture the default clinical illustration, serology, decremental RNS, SFEMG with blocking, myopathic needle EMG, and a selected evidence-board finding. These bounded artifacts support manual visual review without creating full-page captures or claiming automated anatomical accuracy.

Automated checks do not establish scientific correctness, comprehensive screen-reader usability, anatomical accuracy, or clinical validity. A scientist/clinician should review the original diagrams, evidence attribution, uncertainty language, and public references before publication. Manual checks should include keyboard focus visibility, mobile panel order, reduced-motion behavior, and representative desktop/mobile screenshots.

The production build also executes `npm run verify:publication` to check that unpublished documents and patient records are excluded from deployment. Browser tests inspect link targets and DOI formatting; they do not assert that remote publisher sites are continuously available.

Test results must be reported from executed commands. The presence of this plan or test file does not imply a successful run.
