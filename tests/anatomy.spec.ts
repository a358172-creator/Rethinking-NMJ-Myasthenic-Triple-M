import { mkdir } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator, type Page } from '@playwright/test';

async function artwork(container: Locator, id: string) {
  const image = container.locator(`img[data-medical-artwork="${id}"]`);
  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();
  const source = await image.getAttribute('src');
  const basePath = new URL('.', container.page().url()).pathname;
  expect(source).toMatch(/\/media\/editorial\/[^/?#]+\.webp$/);
  if (id.startsWith('nmj-')) expect(source).toMatch(/\/nmj-reference\.webp$/);
  expect(new URL(source!, container.page().url()).pathname.startsWith(`${basePath}media/editorial/`)).toBe(true);
  await expect.poll(() => image.evaluate(element => {
    const picture = element as HTMLImageElement;
    return picture.complete && picture.naturalWidth >= 1024 && picture.naturalHeight >= 1024;
  }), { message: `${id} must load as a real, high-resolution raster asset` }).toBe(true);
  return image;
}

async function tissue(page: Page, name: string) {
  await page.locator('#explorer .structure-controls').getByRole('button', { name, exact: true }).click();
  return page.locator('#anatomy-detail');
}

test.beforeEach(async ({ page }) => {
  await page.goto('./');
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('NMJ compartments, manual transmission sequence and three distinct states remain operable', async ({ page }) => {
  const detail = await tissue(page, 'Neuromuscular junction');
  const targets = detail.locator('.nmj-anatomy-overlay [role="button"]');
  await expect(targets).toHaveCount(4);
  await artwork(detail.locator('.nmj-explorer'), 'nmj-normal');
  const compartments = ['Presynaptic terminal', 'Synaptic cleft', 'Postsynaptic receptors', 'Skeletal-muscle membrane'];
  for (let index = 0; index < compartments.length; index++) {
    await targets.nth(index).locator('.nmj-coordinate-marker').click();
    await expect(targets.nth(index)).toHaveAttribute('aria-pressed', 'true');
    await targets.nth(index).focus();
    await targets.nth(index).press(index % 2 ? 'Space' : 'Enter');
    await expect(targets.nth(index)).toHaveAttribute('aria-pressed', 'true');
    await expect(detail.locator('.nmj-compartment-explanation h4')).toHaveText(compartments[index]);
    await expect(detail.getByRole('group', { name: 'NMJ compartments', exact: true }).getByRole('button', { name: compartments[index] })).toHaveAttribute('aria-pressed', 'true');
    await expect(detail.locator('.nmj-anatomy-overlay [aria-pressed="true"]')).toHaveCount(1);
    expect(await targets.nth(index).locator('.nmj-compartment-shape').evaluate(element => Number(getComputedStyle(element).strokeOpacity))).toBeGreaterThan(0);
  }
  const stages = detail.getByRole('group', { name: 'Normal transmission stages' }).getByRole('button');
  await expect(stages).toHaveCount(5);
  const descriptions: string[] = [];
  const stagePaths: string[] = [];
  for (let index = 0; index < 5; index++) {
    await stages.nth(index).click();
    await expect(stages.nth(index)).toHaveAttribute('aria-pressed', 'true');
    await expect(detail.locator('.nmj-sequence-controls [aria-pressed="true"]')).toHaveCount(1);
    descriptions.push(await detail.locator('.nmj-step-description').innerText());
    await expect(detail.locator('.nmj-stage-label')).toContainText((await stages.nth(index).innerText()).replace(/^\d+\s*/, ''));
    await expect(detail.locator('.nmj-stage-label strong')).toContainText(`${index + 1} ·`);
    const marks = detail.locator('.nmj-signal-stage');
    await expect(marks).toHaveAttribute('data-signal-stage', `${index + 1}`);
    stagePaths.push(await marks.locator('path').evaluateAll(paths => paths.map(path => path.getAttribute('d')).join('|')));
  }
  expect(new Set(descriptions).size).toBe(5);
  expect(new Set(stagePaths).size).toBe(5);
  await expect(detail.locator('.nmj-compartment-explanation')).toContainText('Skeletal-muscle membrane');
  await detail.getByRole('button', { name: 'Possible impairment', exact: true }).click();
  await expect(detail.locator('.nmj-drawing')).toHaveAttribute('data-nmj-state', 'transmission-impaired');
  await artwork(detail.locator('.nmj-explorer'), 'nmj-impaired');
  await expect(detail.locator('[data-state-overlay="reduced-activation"]')).toHaveCount(1);
  await expect(detail.locator('.nmj-signal-stage')).toHaveCount(0);
  await expect(detail.locator('.nmj-state-description')).toContainText('not a demonstrated finding in the N=38 study');
  await expect(detail.locator('.nmj-transmission-sequence')).toHaveCount(0);
  await detail.getByRole('button', { name: 'Muscle-predominant injury', exact: true }).click();
  await expect(detail.locator('.nmj-drawing')).toHaveAttribute('data-nmj-state', 'muscle-injury');
  await artwork(detail.locator('.nmj-explorer'), 'nmj-muscle-injury');
  await expect(detail.locator('[data-state-overlay="downstream-muscle-injury"]')).toHaveCount(1);
  await expect(detail.locator('[data-state-overlay="reduced-activation"]')).toHaveCount(0);
  await expect(detail.locator('.nmj-state-description')).toContainText('does not establish normal transmission or exclude concurrent NMJ dysfunction');
  await tissue(page, 'Skeletal muscle');
  await tissue(page, 'Neuromuscular junction');
  await expect(detail.getByRole('button', { name: 'Muscle-predominant injury', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await detail.getByRole('button', { name: 'Normal physiology', exact: true }).click();
  await expect(stages).toHaveCount(5);
  await expect(detail.locator('.nmj-drawing')).toHaveAttribute('data-nmj-state', 'normal');
  await page.setViewportSize({ width: 390, height: 900 });
  await detail.getByRole('button', { name: 'Enlarge anatomical detail', exact: true }).click();
  const viewport = detail.getByRole('region', { name: 'Neuromuscular junction anatomical detail', exact: true });
  expect(await viewport.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
  await viewport.focus();
  await viewport.press('ArrowRight');
  await expect.poll(() => viewport.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  await expect(detail.locator('.nmj-artwork-legend')).toBeVisible();
  await detail.getByRole('button', { name: 'Enlarge anatomical detail', exact: true }).click();
  expect(await viewport.evaluate(element => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1);
});

test('skeletal-muscle controls expose focal injury and keyboard-selectable tissue structures', async ({ page }) => {
  const detail = await tissue(page, 'Skeletal muscle');
  const muscle = detail.locator('.muscle-explorer');
  await expect(muscle.locator('[data-muscle-state]')).toHaveAttribute('data-muscle-state', 'normal');
  await artwork(muscle, 'muscle-normal');
  await expect(muscle.getByRole('group', { name: 'Skeletal muscle structures', exact: true }).getByRole('button')).toHaveCount(5);
  await expect(muscle.locator('.muscle-anatomical-overlay [role="button"]')).toHaveCount(5);
  await muscle.getByRole('button', { name: 'Conceptual immune injury', exact: true }).click();
  await expect(muscle.locator('[data-muscle-state]')).toHaveAttribute('data-muscle-state', 'injury');
  await artwork(muscle, 'muscle-injury');
  const targets = muscle.locator('.muscle-anatomical-overlay [role="button"]');
  await expect(targets).toHaveCount(6);
  for (const [index, target] of (await targets.all()).entries()) {
    await target.locator('.muscle-anatomical-hit').click();
    await expect(target).toHaveAttribute('aria-pressed', 'true');
    await expect(muscle.getByRole('group', { name: 'Skeletal muscle structures', exact: true }).getByRole('button').nth(index)).toHaveAttribute('aria-pressed', 'true');
    await target.focus();
    await target.press(index % 2 ? 'Space' : 'Enter');
    await expect(target).toHaveAttribute('aria-pressed', 'true');
    await expect(muscle.locator('.muscle-structure-description p')).not.toBeEmpty();
    await expect(muscle.locator('.muscle-anatomical-overlay [aria-pressed="true"]')).toHaveCount(1);
    expect(await target.locator('.muscle-anatomical-highlight').evaluate(element => Number(getComputedStyle(element).strokeOpacity))).toBeGreaterThan(0);
  }
  await expect(muscle.locator('.muscle-structure-description')).toContainText('cannot identify immune-cell phenotype');
  await expect(muscle).toContainText('does not independently prove inflammatory myositis');
  await muscle.getByRole('button', { name: 'Organized muscle', exact: true }).click();
  await expect(muscle.getByRole('button', { name: 'Inspect Inflammatory focus', exact: true })).toHaveCount(0);
  await expect(muscle.locator('.muscle-anatomical-overlay [role="button"]')).toHaveCount(5);
  await artwork(muscle, 'muscle-normal');
  await expect(muscle.locator('.muscle-structure-description h4')).toHaveText('Sarcolemma');
});

test('cardiac exploration separates tissue injury, conduction anatomy and an optional tissue inset', async ({ page }) => {
  const detail = await tissue(page, 'Heart / myocardium');
  const heart = detail.locator('.myocardium-explorer');
  await artwork(heart, 'heart-normal');
  for (const chamber of ['Right atrium', 'Right ventricle', 'Left atrium', 'Left ventricle']) await expect(heart.locator('.myocardium-chamber-key')).toContainText(chamber);
  await heart.getByRole('button', { name: 'Conceptual myocardial injury', exact: true }).click();
  await expect(heart.locator('.myocardium-state-description')).toContainText('not the distribution of disease');
  await expect(heart.locator('[data-myocardium-state]')).toHaveAttribute('data-myocardium-state', 'injury');
  await artwork(heart, 'heart-injury');
  const controls = heart.getByRole('group', { name: 'Cardiac anatomy topics', exact: true }).getByRole('button');
  await expect(controls).toHaveCount(3);
  for (const control of await controls.all()) {
    await control.focus();
    await control.press('Space');
    await expect(control).toHaveAttribute('aria-pressed', 'true');
  }
  const septum = controls.nth(1);
  await septum.click();
  await expect(heart.locator('.cardiac-section-septum')).toHaveClass(/is-selected/);
  await expect(heart.locator('.cardiac-section-title')).toContainText('Separate frontal section');
  const overlay = heart.getByRole('checkbox');
  await expect(overlay).toHaveCount(1);
  await overlay.check();
  await expect(overlay).toBeChecked();
  await expect(heart.getByRole('img', { name: /Normal cardiac conduction in a separate heart section/ })).toBeVisible();
  await expect(heart.locator('.myocardium-conduction')).toHaveCount(1);
  await expect(heart.locator('.cardiac-section-inset')).toContainText('His–Purkinje system');
  await overlay.uncheck();
  await expect(heart.locator('.myocardium-conduction')).toHaveCount(0);
  const wall = heart.getByRole('button', { name: 'Select ventricular wall in illustration', exact: true });
  await wall.click();
  await expect(wall).toHaveAttribute('aria-pressed', 'true');
  await expect(controls.first()).toHaveAttribute('aria-pressed', 'true');
  await expect(heart.locator('.cardiac-section-inset')).toHaveCount(0);
  await wall.focus();
  await wall.press('Enter');
  await expect(heart.locator('.cardiac-wall-target')).toHaveClass(/is-selected/);
  await overlay.check();
  await expect(heart.locator('.myocardium-conduction-note')).toContainText(/preserved|LVEF/i);
  await heart.locator('.myocardium-tissue-details summary').click();
  await artwork(heart.locator('.myocardium-tissue-details'), 'cardiac-tissue-injury');
  await expect(heart.locator('.myocardium-tissue-copy')).toContainText(/conceptual|illustrative|schematic/i);
  await heart.getByRole('button', { name: 'Normal myocardial tissue', exact: true }).click();
  await expect(heart.locator('.myocardium-state-description')).toContainText('Established anatomy');
  await artwork(heart, 'heart-normal');
  await artwork(heart.locator('.myocardium-tissue-details'), 'cardiac-tissue-normal');
});

test('comparison and laboratory reuse coherent anatomical states without changing the evidence boundary', async ({ page }) => {
  await page.getByRole('button', { name: 'Compare Mechanisms', exact: true }).click();
  const figure = page.locator('.mechanism-figure-panels');
  for (const [label, nmj, muscle] of [
    ['Primary NMJ dysfunction', 'transmission-impaired', 'normal'],
    ['Muscle-predominant immune injury', 'normal', 'injury'],
    ['Potential overlap', 'transmission-impaired', 'injury'],
  ]) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await expect(figure.locator('[data-nmj-state]')).toHaveAttribute('data-nmj-state', nmj);
    await expect(figure.locator('[data-muscle-state]')).toHaveAttribute('data-muscle-state', muscle);
    await expect(figure).toContainText('0/4');
    await expect(figure).toContainText('6/11');
  }
  await page.locator('#laboratory').getByRole('button', { name: 'Serological evidence', exact: true }).click();
  await page.locator('.nmj-serology-anatomy summary').click();
  await expect(page.locator('.serology-visual [data-nmj-state]')).toHaveAttribute('data-nmj-state', 'normal');
  await page.locator('#laboratory').getByRole('button', { name: 'Clinical phenotype', exact: true }).click();
  const optional = page.locator('.phenotype-tissue-detail');
  await optional.locator('summary').click();
  await expect(optional.locator('[data-muscle-state]')).toHaveAttribute('data-muscle-state', 'injury');
  await expect(optional).toContainText('does not show the anatomy of a specific muscle or measured involvement');
});

test('advanced tissue views retain accessible controls, readable artwork and unique IDs', async ({ page }) => {
  for (const name of ['Heart / myocardium', 'Skeletal muscle', 'Neuromuscular junction']) {
    await tissue(page, name);
    const issues = await new AxeBuilder({ page }).include('#anatomy-detail').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(issues.violations, name).toEqual([]);
  }
  const duplicateIds = await page.locator('[id]').evaluateAll(elements => {
    const ids = elements.map(element => element.id);
    return ids.filter((id, index) => ids.indexOf(id) !== index);
  });
  expect(duplicateIds).toEqual([]);
  await expect(page.locator('#anatomy-detail .nmj-anatomy-overlay [role="button"]')).toHaveCount(4);
  const missingDefinitions = await page.locator('svg *').evaluateAll(elements => elements.flatMap(element => {
    const references = ['fill', 'stroke', 'clip-path', 'marker-end'].map(attribute => element.getAttribute(attribute) ?? '');
    return references.flatMap(value => {
      const match = value.match(/^url\(#(.+)\)$/);
      return match && !document.getElementById(match[1]) ? [value] : [];
    });
  }));
  expect(missingDefinitions).toEqual([]);
});

test('anatomy fits desktop, tablet and mobile with reviewable visual artifacts', async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  if (testInfo.project.name === 'desktop') await mkdir('.artifacts/editorial-artwork/after', { recursive: true });
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('./');
    const capture = async (selector: string, name: string) => {
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `${name} at ${width}px`).toBeLessThanOrEqual(1);
      const target = page.locator(selector);
      await expect(target).toBeVisible();
      for (const image of await target.locator('img[data-medical-artwork]:visible').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth >= 1024)).toBe(true);
      }
      if (testInfo.project.name === 'desktop') await target.screenshot({ path: `.artifacts/editorial-artwork/after/${name}-${width}.png`, scale: 'css', style: '.site-header, .skip-link { visibility: hidden !important; }' });
    };
    await capture('#explorer .atlas-figure', 'overview');
    await capture('#anatomy-detail .myocardium-explorer', 'heart-normal');
    await page.getByRole('button', { name: 'Conceptual myocardial injury', exact: true }).click();
    await page.locator('.myocardium-explorer input[type="checkbox"]').check();
    await page.locator('.myocardium-tissue-details summary').click();
    await capture('#anatomy-detail .myocardium-explorer', 'heart-injury');
    await tissue(page, 'Skeletal muscle');
    await capture('.muscle-explorer', 'muscle-normal');
    await page.getByRole('button', { name: 'Conceptual immune injury', exact: true }).click();
    await capture('.muscle-explorer', 'muscle-injury');
    await tissue(page, 'Neuromuscular junction');
    await capture('.nmj-explorer', 'nmj-normal');
    if (width <= 768) {
      await page.getByRole('button', { name: 'Enlarge anatomical detail', exact: true }).click();
      await capture('.nmj-explorer', 'nmj-enlarged');
      await page.getByRole('button', { name: 'Enlarge anatomical detail', exact: true }).click();
    }
    await page.getByRole('button', { name: 'Possible impairment', exact: true }).click();
    await capture('.nmj-explorer', 'nmj-impaired');
    await page.getByRole('button', { name: 'Muscle-predominant injury', exact: true }).click();
    await capture('.nmj-explorer', 'nmj-muscle-injury');
    await page.getByRole('button', { name: 'Compare Mechanisms', exact: true }).click();
    await capture('#mechanism-panel .sfn-figure-container', 'comparison');
    await page.locator('#laboratory').getByRole('button', { name: 'Serological evidence', exact: true }).click();
    await capture('.serology-visual', 'laboratory-serology');
  }
});
