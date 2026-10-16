import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator, type Page } from '@playwright/test';
import { findingInterpretation, findings, interpretationStates, phenotypeRegions, serologyPanels } from '../src/data/laboratory';
import { laboratoryUi } from '../src/data/laboratoryUi';
import { evidenceLevels } from '../src/data/science';

const runtimeIssues = new WeakMap<Page, string[]>();
const waveformCaption = 'Illustrative educational waveform — not a patient recording.';
const viewNames = laboratoryUi.navigation.map((view) => view.label);
const perspectiveNames = Object.values(interpretationStates).map((perspective) => perspective.label);

function laboratory(page: Page) {
  return page.locator('#laboratory');
}

function interpretation(page: Page) {
  return laboratory(page).getByRole('region', { name: 'Laboratory scientific interpretation', exact: true });
}

async function selectView(page: Page, name: string) {
  const navigation = laboratory(page).getByRole('group', { name: 'Laboratory views', exact: true });
  await navigation.getByRole('button', { name, exact: true }).click();
  await checkPressed(navigation, viewNames, name);
  await expect(page.locator('#laboratory-view > section')).toHaveCount(1);
}

async function checkPressed(group: Locator, names: readonly string[], selected: string) {
  for (const name of names) {
    await expect(group.getByRole('button', { name, exact: true })).toHaveAttribute('aria-pressed', String(name === selected));
  }
}

async function checkEvidence(panel: Locator) {
  const evidence = panel.getByRole('region', { name: 'Mechanistic Evidence', exact: true });
  await expect(evidence).toHaveCount(1);
  for (const { label } of Object.values(evidenceLevels)) {
    await expect(evidence.getByText(label, { exact: true })).toBeVisible();
  }
  await expect(evidence.locator('.evidence-row')).toHaveCount(4);
  const references = evidence.locator('a[href^="#ref-"]');
  expect(await references.count(), 'Interpretations must cite supporting literature').toBeGreaterThan(0);
  const missingTargets = await references.evaluateAll((links) => links.flatMap((link) => {
    const href = link.getAttribute('href') || '';
    return document.getElementById(href.slice(1)) ? [] : [href];
  }));
  expect(missingTargets, 'Laboratory citations must resolve to visible reference entries').toEqual([]);
}

async function checkMedicalArtwork(image: Locator) {
  await expect(image).toBeVisible();
  await image.scrollIntoViewIfNeeded();
  const isSvg = await image.evaluate(element => element instanceof SVGImageElement);
  await expect(image).toHaveAttribute(isSvg ? 'aria-label' : 'alt', /.+/);
  const dimensions = await image.evaluate(async element => {
    const picture = element instanceof HTMLImageElement ? element : new Image();
    if (element instanceof SVGImageElement) picture.src = element.href.baseVal;
    await picture.decode();
    return { width: picture.naturalWidth, height: picture.naturalHeight };
  });
  expect(dimensions.width, 'Editorial artwork must have at least 1,024 pixels of source detail').toBeGreaterThanOrEqual(1024);
  expect(dimensions.height).toBeGreaterThanOrEqual(1024);
  const source = new URL((await image.getAttribute(isSvg ? 'href' : 'src'))!, image.page().url());
  const appPath = new URL(image.page().url()).pathname;
  expect(source.pathname.startsWith(`${appPath}media/editorial/`), 'Artwork must respect the app publication base path').toBe(true);
}

async function waveformPaths(page: Page) {
  return laboratory(page).locator('.electrophysiology-svg path[d]').evaluateAll((paths) => paths.map((path) => path.getAttribute('d')));
}

async function checkWaveformCaption(page: Page) {
  const lab = laboratory(page);
  await expect(lab.locator('.trace-caption')).toHaveText(waveformCaption);
  await expect(lab.locator('.trace-caption')).toBeVisible();
  await expect(lab.locator('.electrophysiology-svg')).toHaveCount(1);
  await expect(lab.locator('.electrophysiology-svg')).toHaveAttribute('role', 'img');
  await expect(lab.locator('.electrophysiology-svg title')).toHaveText(/.+/);
  await expect(lab.locator('.electrophysiology-svg desc')).toContainText(waveformCaption);
}

test.beforeEach(async ({ page, baseURL }) => {
  const issues: string[] = [];
  runtimeIssues.set(page, issues);
  const origin = new URL(baseURL!).origin;
  page.on('pageerror', (error) => issues.push(`Page error: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') issues.push(`Console error: ${message.text()}`);
  });
  page.on('requestfailed', (request) => issues.push(`Failed request: ${request.url()} (${request.failure()?.errorText})`));
  page.on('response', (response) => {
    if (response.url().startsWith(origin) && response.status() >= 400) {
      issues.push(`HTTP ${response.status()}: ${response.url()}`);
    }
  });
  await page.goto('./');
  await expect(laboratory(page).getByRole('heading', { name: laboratoryUi.title, exact: true })).toBeVisible();
});

test.afterEach(async ({ page }) => {
  expect(runtimeIssues.get(page), 'Laboratory interactions must not create browser or asset errors').toEqual([]);
});

test('laboratory navigation exposes each evidence domain and preserves valid anchor destinations', async ({ page }, testInfo) => {
  const navigation = page.getByRole('navigation', { name: 'Main navigation', exact: true });
  if (testInfo.project.name === 'mobile') await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await navigation.locator('a[href="#laboratory"]').click();
  await expect(page).toHaveURL(/#laboratory$/);
  await expect(laboratory(page)).toBeInViewport();
  if (testInfo.project.name === 'mobile') {
    await expect(page.getByRole('button', { name: 'Menu', exact: true })).toHaveAttribute('aria-expanded', 'false');
    await expect(navigation).toBeHidden();
  }
  const lab = laboratory(page);
  await expect(lab).toContainText('From Clinical Phenotype to Physiological Evidence');
  const headings = ['Clinical Phenotype Explorer', 'Serological Evidence Explorer', 'Electrophysiology Laboratory', 'Comparative Evidence Board'];
  for (let index = 0; index < viewNames.length; index += 1) {
    await selectView(page, viewNames[index]);
    await expect(page.locator('#laboratory-view').getByRole('heading', { name: headings[index], exact: true })).toBeVisible();
    await checkEvidence(interpretation(page));
    const missingTargets = await page.locator('a[href^="#"]').evaluateAll((links) => links.flatMap((link) => {
      const href = link.getAttribute('href') || '';
      return href.length < 2 || !document.getElementById(decodeURIComponent(href.slice(1))) ? [href] : [];
    }));
    expect(missingTargets, `${viewNames[index]} must retain valid global internal anchors`).toEqual([]);
  }
  await expect(lab.locator('.lab-boundaries')).toContainText(/myocarditis.*bulbar weakness.*respiratory compromise.*urgent clinical evaluation/i);
  await expect(lab.locator('.lab-boundaries')).toContainText(/every diagnostic test is not a prerequisite for urgent care/i);
});

test('all five clinical selections synchronize anatomy, manifestations, mechanisms and evidence', async ({ page }) => {
  const controls = laboratory(page).getByRole('group', { name: 'Clinical muscle regions', exact: true });
  const targets = laboratory(page).locator('.phenotype-anatomical-overlay [role="button"]');
  const labels = phenotypeRegions.map((region) => `Select ${region.id} region`);
  await expect(controls.getByRole('button')).toHaveCount(5);
  await expect(targets).toHaveCount(5);
  const panel = interpretation(page);
  await checkMedicalArtwork(laboratory(page).locator('image[data-medical-artwork="clinical-distribution"]'));
  for (const region of phenotypeRegions) {
    await controls.getByRole('button', { name: `Select ${region.id} region`, exact: true }).click();
    await checkPressed(controls, labels, `Select ${region.id} region`);
    await expect(laboratory(page).getByRole('button', { name: `Select ${region.id} anatomy`, exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(panel.getByRole('heading', { name: region.label, exact: true })).toBeVisible();
    for (const manifestation of region.manifestations) await expect(panel.locator('dd').first()).toContainText(manifestation);
    await expect(panel.locator('dt')).toHaveText(['Clinical manifestations', 'Possible muscle mechanism', 'Possible NMJ mechanism', 'What distribution cannot establish']);
    await expect(panel.locator('dd').nth(1)).toHaveText(region.muscleMechanism);
    await expect(panel.locator('dd').nth(2)).toHaveText(region.nmjMechanism);
    await expect(panel.locator('dd').nth(3)).toHaveText(region.boundary);
    await expect(laboratory(page).locator('.phenotype-anatomical-target[aria-pressed="true"]')).toHaveCount(1);
    await checkEvidence(panel);
  }
});

test('clinical anatomy supports mouse, Enter and Space with visible keyboard focus', async ({ page }) => {
  const lab = laboratory(page);
  const controls = lab.getByRole('group', { name: 'Clinical muscle regions', exact: true });
  for (const region of phenotypeRegions) {
    const target = lab.getByRole('button', { name: `Select ${region.id} anatomy`, exact: true });
    expect(await target.evaluate((element) => ({ tag: element.tagName.toLowerCase(), tabIndex: element.getAttribute('tabindex') }))).toEqual({ tag: 'g', tabIndex: '0' });
    await target.locator('.phenotype-anatomical-dot').click();
    await expect(controls.getByRole('button', { name: `Select ${region.id} region`, exact: true })).toHaveAttribute('aria-pressed', 'true');
    for (const key of ['Enter', 'Space']) {
      const other = phenotypeRegions.find((candidate) => candidate.id !== region.id)!;
      await controls.getByRole('button', { name: `Select ${other.id} region`, exact: true }).click();
      await page.keyboard.press('Tab');
      await target.focus();
      await expect(target).toBeFocused();
      expect(await target.evaluate((element) => element.matches(':focus-visible')), 'Keyboard anatomy focus must be visible').toBe(true);
      const focusStyle = await target.locator('.phenotype-anatomical-label').evaluate((element) => ({ stroke: getComputedStyle(element).stroke, width: parseFloat(getComputedStyle(element).strokeWidth) }));
      expect(focusStyle.stroke).not.toBe('none');
      expect(focusStyle.width, 'SVG anatomical focus must visibly strengthen the callout outline').toBeGreaterThanOrEqual(4);
      await target.press(key);
      await expect(target).toHaveAttribute('aria-pressed', 'true');
      await expect(controls.getByRole('button', { name: `Select ${region.id} region`, exact: true })).toHaveAttribute('aria-pressed', 'true');
    }
  }
});

test('clinical views preserve region selection and localize hidden anterior regions without posterior substitutes', async ({ page }, testInfo) => {
  const lab = laboratory(page);
  const views = lab.getByRole('group', { name: 'Anatomical views', exact: true });
  const regions = lab.getByRole('group', { name: 'Clinical muscle regions', exact: true });
  const frame = lab.locator('[data-phenotype-view]');
  await expect(frame).toHaveAttribute('data-phenotype-view', testInfo.project.name === 'mobile' ? 'anterior' : 'all');
  await regions.getByRole('button', { name: 'Select proximal region', exact: true }).click();
  for (const [name, value] of [['All views', 'all'], ['Anterior', 'anterior'], ['Posterior', 'posterior'], ['Lateral', 'lateral']]) {
    const button = views.getByRole('button', { name, exact: true });
    await button.focus();
    await button.press('Enter');
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(views.locator('[aria-pressed="true"]')).toHaveCount(1);
    await expect(frame).toHaveAttribute('data-phenotype-view', value);
    await expect(regions.getByRole('button', { name: 'Select proximal region', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(lab.getByRole('button', { name: 'Select proximal anatomy', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(interpretation(page).getByRole('heading', { name: phenotypeRegions.find(region => region.id === 'proximal')!.label, exact: true })).toBeVisible();
    expect(await frame.evaluate(element => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1);
  }
  await views.getByRole('button', { name: 'Posterior', exact: true }).click();
  await expect(lab.locator('.phenotype-anatomical-target')).toHaveCount(3);
  await expect(lab.getByRole('button', { name: 'Select ocular anatomy', exact: true })).toHaveCount(0);
  await regions.getByRole('button', { name: 'Select ocular region', exact: true }).click();
  await expect(frame).toHaveAttribute('data-phenotype-view', 'anterior');
  await expect(lab.getByRole('button', { name: 'Select ocular anatomy', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await views.getByRole('button', { name: 'Posterior', exact: true }).click();
  await expect(lab.locator('.editorial-phenotype-selection')).toContainText('not visible from behind');
  await regions.getByRole('button', { name: 'Select bulbar region', exact: true }).click();
  await expect(frame).toHaveAttribute('data-phenotype-view', 'anterior');
  await expect(lab.locator('.phenotype-anatomical-target')).toHaveCount(5);
});

test('serology preserves the evaluated denominator and distinguishes missing paired physiology', async ({ page }) => {
  await selectView(page, 'Serological evidence');
  const lab = laboratory(page);
  const controls = lab.getByRole('group', { name: 'Serological evidence views', exact: true });
  const options = [
    { label: 'AChR antibodies', id: 'achr' as const },
    { label: 'MuSK antibodies', id: 'musk' as const },
    { label: 'Pretreatment & correlation', id: 'context' as const },
  ];
  await lab.getByText('Compare with normal NMJ anatomy', { exact: true }).click();
  for (const option of options) {
    await controls.getByRole('button', { name: option.label, exact: true }).click();
    await checkPressed(controls, options.map((candidate) => candidate.label), option.label);
    const content = serologyPanels[option.id];
    const panel = interpretation(page);
    await expect(panel.getByRole('heading', { name: content.title, exact: true })).toBeVisible();
    await expect(panel.locator('dd')).toHaveText([content.measures, content.limits, content.pretreatment]);
    await checkEvidence(panel);
    await expect(lab.locator('.lab-cohort-value')).toHaveText('11/30(36.7%)');
    await expect(lab.locator('.lab-paired-gap')).toContainText('None of the 11 AChR-positive patients had documented formal RNS or SFEMG');
    await expect(lab.locator('.lab-paired-gap')).toContainText('missing paired physiological evidence, not normal formal testing');
    await expect(lab.locator('.serology-domains')).toContainText('Antibody detection');
    await expect(lab.locator('.serology-domains')).toContainText('Demonstrated transmission failure');
    await expect(lab.locator('.serology-visual .nmj-illustration')).toHaveCount(1);
    await expect(lab.locator('.serology-target-concept')).toHaveAttribute('data-serology-target', option.id);
    await checkMedicalArtwork(lab.locator('.serology-visual img[data-medical-artwork="nmj-normal"]'));
    await checkMedicalArtwork(lab.locator('.serology-visual img[data-medical-artwork="antibody-binding"]'));
  }
});

test('qualitative serology examples remain independent of study results and NMJ anatomy', async ({ page }) => {
  await selectView(page, 'Serological evidence');
  const lab = laboratory(page);
  await lab.getByText('Compare with normal NMJ anatomy', { exact: true }).click();
  const nmj = lab.locator('.nmj-illustration');
  const normalArt = lab.locator('img[data-medical-artwork="nmj-normal"]');
  const originalSource = await normalArt.getAttribute('src');
  const controls = lab.getByRole('group', { name: 'Qualitative serology examples', exact: true });
  const examples = [
    { label: 'Positive', id: 'positive', text: /does not independently.*transmission.*MG/i },
    { label: 'Negative', id: 'negative', text: /does not automatically exclude an NMJ disorder/i },
    { label: 'Indeterminate', id: 'indeterminate', text: /differs from a negative result/i },
  ];
  const markings: string[][] = [];
  for (const example of examples) {
    const button = controls.getByRole('button', { name: example.label, exact: true });
    await button.focus();
    await button.press(example.id === 'negative' ? 'Space' : 'Enter');
    await checkPressed(controls, examples.map(item => item.label), example.label);
    const result = lab.locator('[data-assay-example]');
    await expect(result).toHaveAttribute('data-assay-example', example.id);
    await expect(result).toContainText(example.text);
    markings.push(await result.locator('svg path[d]').evaluateAll(paths => paths.map(path => path.getAttribute('d')!)));
    await expect(lab.locator('.lab-cohort-value')).toHaveText('11/30(36.7%)');
    await expect(nmj).toHaveAttribute('data-nmj-state', 'normal');
    await expect(normalArt).toHaveAttribute('src', originalSource!);
  }
  expect(new Set(markings.map(paths => JSON.stringify(paths))).size, 'Each qualitative interpretation must change the schematic assay marks').toBe(3);
  await lab.getByRole('button', { name: 'MuSK antibodies', exact: true }).click();
  await expect(lab.locator('[data-assay-example]')).toHaveAttribute('data-assay-example', 'indeterminate');
  await expect(lab.locator('.serology-target-concept')).toHaveAttribute('data-serology-target', 'musk');
  await expect(nmj).toHaveAttribute('data-nmj-state', 'normal');
});

test('RNS, SFEMG and needle EMG controls change deterministic SVG traces and restore comparison states', async ({ page }) => {
  await selectView(page, 'Electrophysiology');
  const lab = laboratory(page);
  const modalities = lab.getByRole('group', { name: 'Electrophysiology modalities', exact: true });
  const modalityNames = ['Repetitive nerve stimulation', 'Single-fiber EMG', 'Conventional needle EMG'];
  const comparison = lab.getByRole('group', { name: 'Waveform comparison', exact: true });

  await checkPressed(modalities, modalityNames, modalityNames[0]);
  await checkPressed(comparison, ['Without significant decrement', 'Decremental response'], 'Without significant decrement');
  await checkMedicalArtwork(lab.locator('img[data-medical-artwork="rns-procedure"]'));
  const normalRns = await waveformPaths(page);
  await lab.getByRole('button', { name: 'Decremental response', exact: true }).click();
  await checkPressed(comparison, ['Without significant decrement', 'Decremental response'], 'Decremental response');
  expect(await waveformPaths(page)).not.toEqual(normalRns);
  await checkWaveformCaption(page);
  await expect(interpretation(page)).toContainText(/normal RNS does not definitively exclude MG/i);
  const cohort = lab.getByRole('complementary', { name: 'Frozen electrophysiology findings', exact: true });
  await expect(cohort).toContainText('0/4');
  await expect(cohort).toContainText('4/38');
  await expect(cohort).toContainText('0–60.2%');
  await lab.getByRole('button', { name: 'Without significant decrement', exact: true }).click();
  expect(await waveformPaths(page)).toEqual(normalRns);
  await checkEvidence(interpretation(page));

  await modalities.getByRole('button', { name: modalityNames[1], exact: true }).click();
  await checkPressed(modalities, modalityNames, modalityNames[1]);
  const checkbox = lab.getByRole('checkbox', { name: 'Show possible impulse blocking', exact: true });
  await expect(checkbox).toHaveCount(0);
  await checkMedicalArtwork(lab.locator('img[data-medical-artwork="sfemg-procedure"]'));
  const normalSfemg = await waveformPaths(page);
  await lab.getByRole('button', { name: 'Increased jitter', exact: true }).click();
  await checkPressed(comparison, ['Conceptual normal variability', 'Increased jitter'], 'Increased jitter');
  const jitterPaths = await waveformPaths(page);
  expect(jitterPaths).not.toEqual(normalSfemg);
  await expect(checkbox).not.toBeChecked();
  await checkbox.check();
  await expect(checkbox).toBeChecked();
  expect(await waveformPaths(page)).not.toEqual(jitterPaths);
  await expect(lab.locator('.electrophysiology-svg')).toContainText('Second potential absent on this sweep');
  await expect(lab.locator('.electrophysiology-svg')).not.toContainText(/\b\d+(?:\.\d+)?\s*(?:µs|μs|us|microseconds|ms)\b/i);
  await expect(interpretation(page)).toContainText(/not uniquely specific for MG/i);
  await expect(cohort).toContainText(/SFEMG was documented in 1 patient, already included within the (?:four|4) formally tested patients/i);
  await checkWaveformCaption(page);
  await checkbox.uncheck();
  expect(await waveformPaths(page)).toEqual(jitterPaths);
  await checkbox.check();
  await lab.getByRole('button', { name: 'Conceptual normal variability', exact: true }).click();
  await expect(checkbox).toHaveCount(0);
  expect(await waveformPaths(page)).toEqual(normalSfemg);
  await lab.getByRole('button', { name: 'Increased jitter', exact: true }).click();
  await expect(checkbox).not.toBeChecked();
  await checkEvidence(interpretation(page));

  await modalities.getByRole('button', { name: modalityNames[2], exact: true }).click();
  await checkPressed(modalities, modalityNames, modalityNames[2]);
  await checkMedicalArtwork(lab.locator('img[data-medical-artwork="needle-procedure"]'));
  const usualNeedle = await waveformPaths(page);
  await lab.getByRole('button', { name: 'Myopathic pattern', exact: true }).click();
  await checkPressed(comparison, ['Usual motor-unit pattern', 'Myopathic pattern'], 'Myopathic pattern');
  expect(await waveformPaths(page)).not.toEqual(usualNeedle);
  await expect(cohort.locator('.lab-cohort-value')).toHaveText('6/11(54.5%)');
  await expect(interpretation(page)).toContainText(/does not establish inflammatory histopathology/i);
  await expect(interpretation(page)).toContainText(/does not exclude a concurrent NMJ disorder/i);
  await checkWaveformCaption(page);
  await checkEvidence(interpretation(page));
  await lab.getByRole('button', { name: 'Usual motor-unit pattern', exact: true }).click();
  expect(await waveformPaths(page)).toEqual(usualNeedle);
});

test('electrophysiology explanations open with keyboard and close on Escape', async ({ page }) => {
  await selectView(page, 'Electrophysiology');
  const lab = laboratory(page);
  for (const option of [
    { modality: 'Repetitive nerve stimulation', term: 'CMAP', text: /summed electrical response/i },
    { modality: 'Single-fiber EMG', term: 'Jitter', text: /timing.*repeated activations/i },
    { modality: 'Conventional needle EMG', term: 'Recruitment', text: /addition of motor units/i },
  ]) {
    await lab.getByRole('group', { name: 'Electrophysiology modalities', exact: true }).getByRole('button', { name: option.modality, exact: true }).click();
    const trigger = lab.getByRole('button', { name: `Explain ${option.term}`, exact: true });
    const note = lab.locator('.tooltip-content');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(note).toBeHidden();
    await trigger.focus();
    await trigger.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(note).toBeVisible();
    await expect(note).toContainText(option.text);
    expect(await trigger.getAttribute('aria-controls')).toBe(await note.getAttribute('id'));
    await trigger.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(note).toBeHidden();
    await expect(trigger).toBeFocused();
  }
});

test('all nine findings describe their evidence and keep the manually selected perspective', async ({ page }) => {
  await selectView(page, 'Evidence board');
  const lab = laboratory(page);
  const controls = lab.getByRole('group', { name: 'Select a finding', exact: true });
  const perspectives = lab.getByRole('group', { name: 'Mechanistic perspectives', exact: true });
  const perspectivePanel = lab.getByRole('region', { name: 'Selected mechanistic perspective', exact: true });
  await expect(controls.getByRole('button')).toHaveCount(9);
  await expect(perspectives.getByRole('button')).toHaveCount(3);
  await checkPressed(perspectives, perspectiveNames, 'Potentially overlapping mechanisms');
  const selectedPerspective = 'Primary NMJ dysfunction';
  await perspectives.getByRole('button', { name: selectedPerspective, exact: true }).click();
  const perspectiveContent = await perspectivePanel.innerText();
  for (const finding of findings) {
    await controls.getByRole('button', { name: finding.label, exact: true }).click();
    await checkPressed(controls, findings.map((candidate) => candidate.label), finding.label);
    const panel = interpretation(page);
    await expect(panel.getByRole('heading', { name: finding.label, exact: true })).toBeVisible();
    await expect(panel.locator('dt')).toHaveText(['What it directly measures', `What it may support · ${selectedPerspective}`, 'What it cannot establish independently', 'A complementary domain to consider']);
    await expect(panel.locator('dd')).toHaveText([finding.measures, findingInterpretation(finding, 'nmj'), finding.limits, finding.clarify]);
    await checkEvidence(panel);
    await checkPressed(perspectives, perspectiveNames, selectedPerspective);
    await expect(perspectivePanel).toHaveText(perspectiveContent, { useInnerText: true });
  }
  const selectedFinding = findings[findings.length - 1];
  const findingEvidence = await interpretation(page).getByRole('region', { name: 'Mechanistic Evidence', exact: true }).innerText();
  const perspectiveContents: string[] = [];
  const supportContents: string[] = [];
  for (const id of Object.keys(interpretationStates) as (keyof typeof interpretationStates)[]) {
    const state = interpretationStates[id];
    await perspectives.getByRole('button', { name: state.label, exact: true }).click();
    await checkPressed(perspectives, perspectiveNames, state.label);
    await expect(perspectivePanel.getByRole('heading', { name: state.title, exact: true })).toBeVisible();
    await expect(perspectivePanel).toContainText(state.text);
    const panel = interpretation(page);
    await expect(panel.getByRole('heading', { name: selectedFinding.label, exact: true })).toBeVisible();
    await expect(controls.getByRole('button', { name: selectedFinding.label, exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(panel.locator('dt').nth(1)).toHaveText(`What it may support · ${state.label}`);
    await expect(panel.locator('dd')).toHaveText([selectedFinding.measures, findingInterpretation(selectedFinding, id), selectedFinding.limits, selectedFinding.clarify]);
    await expect(panel.getByRole('region', { name: 'Mechanistic Evidence', exact: true })).toHaveText(findingEvidence, { useInnerText: true });
    await checkEvidence(perspectivePanel);
    perspectiveContents.push(await perspectivePanel.innerText());
    supportContents.push(await panel.locator('dd').nth(1).innerText());
  }
  expect(new Set(perspectiveContents).size).toBe(3);
  expect(new Set(supportContents).size, 'Every manually chosen lens must provide distinct finding support while retaining the same measurements and limits').toBe(3);
  await expect(perspectivePanel).toContainText(/may coexist/i);
  await expect(lab.locator('input[type="number"], input[type="range"], output')).toHaveCount(0);
});

test('every laboratory view fits phone and tablet widths including abnormal waveform states', async ({ page }) => {
  for (const width of [390, 768]) {
    await page.setViewportSize({ width, height: 900 });
    for (const view of viewNames) {
      await selectView(page, view);
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
      expect(dimensions.content, `${view} should fit ${width}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
      const illustrationBounds = await laboratory(page).locator('img[data-medical-artwork], svg:not(.electrophysiology-svg)').evaluateAll((images) => images.map((image) => ({ left: image.getBoundingClientRect().left, right: image.getBoundingClientRect().right })));
      for (const bounds of illustrationBounds) {
        expect(bounds.left).toBeGreaterThanOrEqual(-1);
        expect(bounds.right).toBeLessThanOrEqual(width + 1);
      }
      if (view === 'Clinical phenotype' || view === 'Serological evidence') {
        const visual = await laboratory(page).locator(view === 'Clinical phenotype' ? '.phenotype-illustration' : '.serology-visual').boundingBox();
        const panel = await interpretation(page).boundingBox();
        expect(visual).not.toBeNull();
        expect(panel).not.toBeNull();
        expect(panel!.y).toBeGreaterThan(visual!.y + visual!.height);
      }
      if (view === 'Electrophysiology') {
        const scrollRegion = laboratory(page).getByRole('region', { name: 'Educational waveform diagram', exact: true });
        const bounds = await scrollRegion.boundingBox();
        expect(bounds).not.toBeNull();
        expect(bounds!.x).toBeGreaterThanOrEqual(-1);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
        await expect(scrollRegion).toHaveAttribute('tabindex', '0');
        for (const state of ['Decremental response', 'Increased jitter', 'Myopathic pattern']) {
          if (state === 'Increased jitter') {
            await laboratory(page).getByRole('button', { name: 'Single-fiber EMG', exact: true }).click();
            if (width === 390) await expect.poll(() => scrollRegion.evaluate((element) => element.scrollLeft), { message: 'The variable second SFEMG potential should be exposed when opening the narrow view' }).toBeGreaterThan(0);
          }
          if (state === 'Myopathic pattern') await laboratory(page).getByRole('button', { name: 'Conventional needle EMG', exact: true }).click();
          await laboratory(page).getByRole('button', { name: state, exact: true }).click();
          if (state === 'Increased jitter') await laboratory(page).getByRole('checkbox', { name: 'Show possible impulse blocking', exact: true }).check();
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
          expect(overflow, `${state} should fit ${width}px`).toBeLessThanOrEqual(1);
          await checkWaveformCaption(page);
          if (width === 390) {
            expect(await scrollRegion.evaluate((element) => element.scrollWidth > element.clientWidth), 'Readable mobile traces should scroll inside their diagram region').toBe(true);
            await scrollRegion.evaluate((element) => { element.scrollLeft = 0; });
            await scrollRegion.focus();
            await expect(scrollRegion).toBeFocused();
            await scrollRegion.press('ArrowRight');
            await expect.poll(() => scrollRegion.evaluate((element) => element.scrollLeft), { message: `${state} must support keyboard horizontal inspection` }).toBeGreaterThan(0);
          }
        }
      }
    }
  }
});

test('laboratory controls retain keyboard operation and reduced-motion support', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const lab = laboratory(page);
  const navigation = lab.getByRole('group', { name: 'Laboratory views', exact: true });
  await page.keyboard.press('Tab');
  for (const name of viewNames) {
    const button = navigation.getByRole('button', { name, exact: true });
    await button.focus();
    await expect(button).toBeFocused();
    expect(await button.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none');
    await button.press('Space');
    await checkPressed(navigation, viewNames, name);
  }
  await selectView(page, 'Clinical phenotype');
  const motion = await lab.locator('.phenotype-hit-target').first().evaluate((element) => ({
    preference: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    scroll: getComputedStyle(document.documentElement).scrollBehavior,
    durations: getComputedStyle(element).transitionDuration.split(',').map((value) => value.trim().endsWith('ms') ? parseFloat(value) / 1000 : parseFloat(value)),
  }));
  expect(motion.preference).toBe(true);
  expect(motion.scroll).toBe('auto');
  for (const duration of motion.durations) expect(duration).toBeLessThanOrEqual(0.0001);
  const respiratory = lab.getByRole('group', { name: 'Clinical muscle regions', exact: true }).getByRole('button', { name: 'Select respiratory region', exact: true });
  await respiratory.focus();
  await respiratory.press('Enter');
  await expect(respiratory).toHaveAttribute('aria-pressed', 'true');
  await expect(interpretation(page)).toContainText(/urgent evaluation/i);
});

test('all four laboratory views and abnormal signal states satisfy automated WCAG checks', async ({ page }) => {
  test.setTimeout(90_000);
  const audit = async (name: string) => {
    const result = await new AxeBuilder({ page }).include('#laboratory').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(result.violations, `${name} accessibility violations`).toEqual([]);
  };
  await audit('Clinical phenotype');
  await selectView(page, 'Serological evidence');
  await audit('Serological evidence');
  await laboratory(page).getByText('Compare with normal NMJ anatomy', { exact: true }).click();
  for (const name of ['Positive', 'Negative', 'Indeterminate']) {
    await laboratory(page).getByRole('group', { name: 'Qualitative serology examples', exact: true }).getByRole('button', { name, exact: true }).click();
    await audit(`Serological ${name.toLowerCase()} example with normal NMJ reference`);
  }
  await selectView(page, 'Electrophysiology');
  await audit('RNS without decrement');
  await laboratory(page).getByRole('button', { name: 'Decremental response', exact: true }).click();
  await audit('RNS decrement');
  await laboratory(page).getByRole('button', { name: 'Single-fiber EMG', exact: true }).click();
  await laboratory(page).getByRole('button', { name: 'Increased jitter', exact: true }).click();
  await laboratory(page).getByRole('checkbox', { name: 'Show possible impulse blocking', exact: true }).check();
  await audit('SFEMG with increased jitter and possible blocking');
  await laboratory(page).getByRole('button', { name: 'Conventional needle EMG', exact: true }).click();
  await laboratory(page).getByRole('button', { name: 'Myopathic pattern', exact: true }).click();
  await audit('Myopathic needle EMG');
  await selectView(page, 'Evidence board');
  await audit('Comparative Evidence Board');
});

test('captures six laboratory states for desktop and mobile visual review', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const capture = async (name: string, target: Locator) => {
    await target.evaluate((element) => element.scrollIntoView({ block: 'start' }));
    await testInfo.attach(`${name} — ${testInfo.project.name}`, {
      body: await page.screenshot({ path: testInfo.outputPath(`${name}-${testInfo.project.name}.png`), fullPage: false }),
      contentType: 'image/png',
    });
  };
  const lab = laboratory(page);
  await capture('clinical-default', lab.locator('.phenotype-illustration'));
  await selectView(page, 'Serological evidence');
  await capture('serology', lab.locator('.serology-visual'));
  await selectView(page, 'Electrophysiology');
  await lab.getByRole('button', { name: 'Decremental response', exact: true }).click();
  await capture('rns-decrement', lab.locator('.trace-workbench'));
  await lab.getByRole('button', { name: 'Single-fiber EMG', exact: true }).click();
  await lab.getByRole('button', { name: 'Increased jitter', exact: true }).click();
  await lab.getByRole('checkbox', { name: 'Show possible impulse blocking', exact: true }).check();
  await capture('sfemg-blocking', lab.locator('.trace-workbench'));
  await lab.getByRole('button', { name: 'Conventional needle EMG', exact: true }).click();
  await lab.getByRole('button', { name: 'Myopathic pattern', exact: true }).click();
  await capture('needle-myopathic', lab.locator('.trace-workbench'));
  await selectView(page, 'Evidence board');
  await lab.getByRole('group', { name: 'Select a finding', exact: true }).getByRole('button', { name: 'RNS decrement', exact: true }).click();
  await capture('evidence-board', interpretation(page));
});
