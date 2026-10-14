import { mkdir } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

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
  const targets = detail.locator('.nmj-illustration [role="button"]');
  await expect(targets).toHaveCount(4);
  const compartments = ['Presynaptic terminal', 'Synaptic cleft', 'Postsynaptic receptors', 'Skeletal-muscle membrane'];
  for (let index = 0; index < compartments.length; index++) {
    await targets.nth(index).focus();
    await targets.nth(index).press(index % 2 ? 'Space' : 'Enter');
    await expect(targets.nth(index)).toHaveAttribute('aria-pressed', 'true');
    await expect(detail.locator('.nmj-compartment-explanation h4')).toHaveText(compartments[index]);
    await expect(detail.getByRole('group', { name: 'NMJ compartments', exact: true }).getByRole('button', { name: compartments[index] })).toHaveAttribute('aria-pressed', 'true');
  }
  const stages = detail.getByRole('group', { name: 'Normal transmission stages' }).getByRole('button');
  await expect(stages).toHaveCount(5);
  const descriptions: string[] = [];
  for (let index = 0; index < 5; index++) {
    await stages.nth(index).click();
    await expect(stages.nth(index)).toHaveAttribute('aria-pressed', 'true');
    await expect(detail.locator('.nmj-sequence-controls [aria-pressed="true"]')).toHaveCount(1);
    descriptions.push(await detail.locator('.nmj-step-description').innerText());
  }
  expect(new Set(descriptions).size).toBe(5);
  await expect(detail.locator('.nmj-compartment-explanation')).toContainText('Skeletal-muscle membrane');
  await detail.getByRole('button', { name: 'Possible impairment', exact: true }).click();
  await expect(detail.locator('.nmj-drawing')).toHaveAttribute('data-nmj-state', 'transmission-impaired');
  await expect(detail.locator('.nmj-state-description')).toContainText('not a demonstrated finding in the N=38 study');
  await expect(detail.locator('.nmj-transmission-sequence')).toHaveCount(0);
  await detail.getByRole('button', { name: 'Muscle-predominant injury', exact: true }).click();
  await expect(detail.locator('.nmj-drawing')).toHaveAttribute('data-nmj-state', 'muscle-injury');
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
  await expect(detail.locator('.nmj-direct-labels')).toBeVisible();
  await detail.getByRole('button', { name: 'Enlarge anatomical detail', exact: true }).click();
  expect(await viewport.evaluate(element => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1);
});

test('skeletal-muscle controls expose focal injury and keyboard-selectable tissue structures', async ({ page }) => {
  const detail = await tissue(page, 'Skeletal muscle');
  const muscle = detail.locator('.muscle-explorer');
  await expect(muscle.locator('[data-muscle-state]')).toHaveAttribute('data-muscle-state', 'normal');
  await expect(muscle.locator('svg [role="button"]')).toHaveCount(5);
  await muscle.getByRole('button', { name: 'Conceptual immune injury', exact: true }).click();
  await expect(muscle.locator('[data-muscle-state]')).toHaveAttribute('data-muscle-state', 'injury');
  const targets = muscle.locator('svg [role="button"]');
  await expect(targets).toHaveCount(6);
  for (const target of await targets.all()) {
    await target.focus();
    await target.press('Enter');
    await expect(target).toHaveAttribute('aria-pressed', 'true');
    await expect(muscle.locator('.muscle-structure-description p')).not.toBeEmpty();
  }
  await expect(muscle.locator('.muscle-structure-description')).toContainText('not demonstrated for every patient');
  await expect(muscle).toContainText('does not independently prove inflammatory myositis');
  await muscle.getByRole('button', { name: 'Organized muscle', exact: true }).click();
  await expect(muscle.locator('.muscle-inflammatory-focus')).toHaveCount(0);
  await expect(muscle.locator('.muscle-structure-description h4')).toHaveText('Sarcolemma');
});

test('cardiac exploration separates tissue injury, conduction anatomy and an optional tissue inset', async ({ page }) => {
  const detail = await tissue(page, 'Heart / myocardium');
  const heart = detail.locator('.myocardium-explorer');
  for (const chamber of ['Right atrium', 'Right ventricle', 'Left atrium', 'Left ventricle']) await expect(heart.locator('.myocardium-chamber-key')).toContainText(chamber);
  await heart.getByRole('button', { name: 'Conceptual myocardial injury', exact: true }).click();
  await expect(heart.locator('.myocardium-state-description')).toContainText('not the distribution of disease');
  const controls = heart.locator('.myocardium-region-buttons button');
  await expect(controls).toHaveCount(3);
  for (const control of await controls.all()) {
    await control.focus();
    await control.press('Space');
    await expect(control).toHaveAttribute('aria-pressed', 'true');
  }
  const overlay = heart.getByRole('checkbox');
  await expect(overlay).toHaveCount(1);
  await overlay.check();
  await expect(overlay).toBeChecked();
  await expect(heart.locator('.myocardium-conduction-note')).toContainText(/preserved|LVEF/i);
  await heart.locator('.myocardium-tissue-details summary').click();
  await expect(heart.locator('.myocardium-tissue-inset')).toBeVisible();
  await expect(heart.locator('.myocardium-tissue-copy')).toContainText(/conceptual|illustrative|schematic/i);
  await heart.getByRole('button', { name: 'Normal myocardial tissue', exact: true }).click();
  await expect(heart.locator('.myocardium-state-description')).toContainText('Established anatomy');
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
  await expect(page.locator('.serology-visual [data-nmj-state]')).toHaveAttribute('data-nmj-state', 'normal');
  await page.locator('#laboratory').getByRole('button', { name: 'Clinical phenotype', exact: true }).click();
  const optional = page.locator('.phenotype-tissue-detail');
  await optional.locator('summary').click();
  await expect(optional.locator('[data-muscle-state]')).toHaveAttribute('data-muscle-state', 'injury');
  await expect(optional).toContainText('does not show the anatomy of a specific muscle or measured involvement');
});

test('advanced tissue views pass automated accessibility checks and SVG IDs remain unique', async ({ page }) => {
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
  if (testInfo.project.name === 'desktop') await mkdir('.artifacts/phase4a/after', { recursive: true });
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('./');
    const capture = async (selector: string, name: string) => {
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `${name} at ${width}px`).toBeLessThanOrEqual(1);
      const target = page.locator(selector);
      await expect(target).toBeVisible();
      if (testInfo.project.name === 'desktop') await target.screenshot({ path: `.artifacts/phase4a/after/${name}-${width}.png`, scale: 'css', style: '.site-header, .skip-link { visibility: hidden !important; }' });
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
