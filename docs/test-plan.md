# Phase 1 verification

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
- Clearly labeled upcoming previews with no inert controls or loaded patient records.
- Expandable mobile navigation that closes after destination selection.
- Reduced-motion styles that suppress transitions and smooth scrolling while retaining interaction.

The final browser case attaches normal-NMJ and comparison screenshots for each project to the Playwright report. These are review artifacts; no screenshot baseline or automatic visual-accuracy claim is made.

Automated checks do not establish scientific correctness, comprehensive screen-reader usability, anatomical accuracy, or clinical validity. A scientist/clinician should review the original diagrams, evidence attribution, uncertainty language, and public references before publication. Manual checks should include keyboard focus visibility, mobile panel order, reduced-motion behavior, and representative desktop/mobile screenshots.

The production build also executes `npm run verify:publication` to check that unpublished documents and patient records are excluded from deployment. Browser tests inspect link targets and DOI formatting; they do not assert that remote publisher sites are continuously available.

Test results must be reported from executed commands. The presence of this plan or test file does not imply a successful run.
