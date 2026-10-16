import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { expect, test, type Locator, type Page, type TestInfo } from '@playwright/test';

const artifactDirectory = '.artifacts/clinical-muscle-focus/screenshots';
const clinicalReferencePath = resolve('src/components/figures/dd3e741a-7cb3-4b7c-8ee7-a003a2bc1036.png');
const clinicalRegions = ['ocular', 'bulbar', 'cervical', 'proximal', 'respiratory'] as const;
const anatomicalViews = ['All views', 'Anterior', 'Posterior', 'Lateral'] as const;

async function decodeImage(image: Locator) {
  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute('alt', /.+/);
  return image.evaluate(async element => {
    const artwork = element as HTMLImageElement;
    await artwork.decode();
    return { width: artwork.naturalWidth, height: artwork.naturalHeight, source: artwork.currentSrc };
  });
}

async function checkVisibleNmjArtwork(page: Page) {
  // Include every mounted, visible NMJ consumer, even those outside the active
  // section. A stale hero, overview or optional detail must fail this check.
  const images = page.locator('img[data-medical-artwork^="nmj-"]:visible');
  expect(await images.count(), 'The current context must expose actual NMJ artwork').toBeGreaterThan(0);
  for (const image of await images.all()) {
    await expect(image).toHaveAttribute('src', /\/media\/editorial\/nmj-reference\.webp$/);
    const decoded = await decodeImage(image);
    expect(decoded.width).toBeGreaterThanOrEqual(1024);
    expect(decoded.height).toBeGreaterThanOrEqual(1024);
    expect(new URL(decoded.source).pathname).toMatch(/\/media\/editorial\/nmj-reference\.webp$/);
  }
}

async function checkClinicalArtwork(figure: Locator, expectedSource?: string) {
  const image = figure.locator('image[data-medical-artwork="clinical-distribution"]');
  await expect(image).toHaveCount(1);
  await expect(image).toHaveAttribute('role', 'img');
  await expect(image).toHaveAttribute('aria-label', /.+/);
  await expect(image).toHaveAttribute('href', /\/media\/editorial\/clinical-reference\.png$/);
  const source = (await image.getAttribute('href'))!;
  if (expectedSource) expect(source, 'Changing anatomical views must preserve the same original plate').toBe(expectedSource);
  const decoded = await image.evaluate(async element => {
    const artwork = new Image();
    artwork.src = new URL(element.getAttribute('href')!, document.baseURI).href;
    await artwork.decode();
    return { width: artwork.naturalWidth, height: artwork.naturalHeight };
  });
  expect(decoded).toEqual({ width: 1312, height: 1199 });
  if (!expectedSource) {
    const response = await figure.page().request.get(new URL(source, figure.page().url()).href);
    expect(response.ok(), 'The provided clinical plate must be available at the publication base path').toBe(true);
    const servedPlate = await response.body();
    expect(servedPlate.equals(await readFile(clinicalReferencePath)), 'The served plate must match the attached PNG byte for byte, preserving all three unclothed anatomical views').toBe(true);
  }
  return source;
}

async function capture(page: Page, target: Locator, name: string, width: number, testInfo: TestInfo) {
  await expect(target).toBeVisible();
  for (const image of await target.locator('img[data-medical-artwork]:visible').all()) await decodeImage(image);
  await target.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `${name} must fit the ${width}px page`).toBeLessThanOrEqual(1);
  const bounds = await target.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds!.x, `${name} left boundary`).toBeGreaterThanOrEqual(-1);
  expect(bounds!.x + bounds!.width, `${name} right boundary`).toBeLessThanOrEqual(width + 1);
  if (testInfo.project.name === 'desktop') {
    const path = `${artifactDirectory}/${name}-${width}.png`;
    await target.screenshot({ path, scale: 'css', animations: 'disabled' });
    await testInfo.attach(`${name} at ${width}px`, { path, contentType: 'image/png' });
  }
}

async function selectLaboratoryView(page: Page, name: string) {
  await page.locator('#laboratory').getByRole('group', { name: 'Laboratory views', exact: true }).getByRole('button', { name, exact: true }).click();
}

for (const width of [1440, 768, 390]) {
  test(`reference refresh reaches every NMJ context and clinical anatomical view at ${width}px`, async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    const runtimeErrors: string[] = [];
    page.on('pageerror', error => runtimeErrors.push(error.message));
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    // Stitched component captures exclude the fixed global navigation.
    await page.addStyleTag({ content: '.site-header, .skip-link { display: none !important; }' });
    if (testInfo.project.name === 'desktop') await mkdir(artifactDirectory, { recursive: true });

    const hero = page.locator('#home .hero-art');
    const overview = page.locator('#explorer .atlas-figure');
    await expect(hero.locator('img[data-medical-artwork="nmj-normal"]')).toHaveCount(1);
    await expect(overview.locator('img[data-medical-artwork="nmj-normal"]')).toHaveCount(1);
    await checkVisibleNmjArtwork(page);
    await capture(page, hero, 'hero', width, testInfo);
    await capture(page, overview, 'anatomy-overview', width, testInfo);

    await page.locator('#explorer .structure-controls').getByRole('button', { name: 'Neuromuscular junction', exact: true }).click();
    const explorer = page.locator('#anatomy-detail .nmj-explorer');
    const states = [
      { label: 'Normal physiology', state: 'normal', artwork: 'nmj-normal', file: 'nmj-normal' },
      { label: 'Possible impairment', state: 'transmission-impaired', artwork: 'nmj-impaired', file: 'nmj-impaired' },
      { label: 'Muscle-predominant injury', state: 'muscle-injury', artwork: 'nmj-muscle-injury', file: 'nmj-muscle-injury' },
    ];
    for (const state of states) {
      await explorer.getByRole('button', { name: state.label, exact: true }).click();
      await expect(explorer.locator('.nmj-illustration')).toHaveAttribute('data-nmj-state', state.state);
      await expect(explorer.locator(`img[data-medical-artwork="${state.artwork}"]`)).toHaveCount(1);
      if (state.state === 'normal') {
        await explorer.getByRole('group', { name: 'Normal transmission stages', exact: true }).getByRole('button', { name: 'Receptor activation', exact: true }).click();
        await expect(explorer.locator('[data-signal-stage="4"]')).toHaveCount(1);
      }
      await checkVisibleNmjArtwork(page);
      await capture(page, explorer, state.file, width, testInfo);
    }

    await page.getByRole('button', { name: 'Compare Mechanisms', exact: true }).click();
    const comparison = page.locator('#mechanism-panel .sfn-figure-container');
    for (const [label, state] of [
      ['Primary NMJ dysfunction', 'transmission-impaired'],
      ['Muscle-predominant immune injury', 'normal'],
      ['Potential overlap', 'transmission-impaired'],
    ]) {
      await page.getByRole('button', { name: label, exact: true }).click();
      await expect(comparison.locator('.nmj-illustration')).toHaveAttribute('data-nmj-state', state);
      await checkVisibleNmjArtwork(page);
      await expect(comparison).toContainText('0/4');
      await expect(comparison).toContainText('6/11');
    }
    await capture(page, comparison, 'comparison', width, testInfo);

    await selectLaboratoryView(page, 'Serological evidence');
    const serologyDetail = page.locator('#laboratory .nmj-serology-anatomy');
    await serologyDetail.locator('summary').click();
    await expect(serologyDetail.locator('.nmj-illustration')).toHaveAttribute('data-nmj-state', 'normal');
    await expect(page.locator('#laboratory .lab-cohort-value')).toHaveText('11/30(36.7%)');
    await checkVisibleNmjArtwork(page);
    await capture(page, serologyDetail, 'serology-nmj', width, testInfo);

    await selectLaboratoryView(page, 'Clinical phenotype');
    const clinical = page.locator('#laboratory .phenotype-illustration');
    const viewControls = clinical.getByRole('group', { name: 'Anatomical views', exact: true });
    const regionControls = clinical.getByRole('group', { name: 'Clinical muscle regions', exact: true });
    await expect(viewControls.getByRole('button')).toHaveText([...anatomicalViews]);
    await expect(regionControls.getByRole('button')).toHaveCount(5);
    expect(await regionControls.getByRole('button').evaluateAll(buttons => buttons.map(button => button.getAttribute('aria-label')))).toEqual(clinicalRegions.map(region => `Select ${region} region`));
    await expect(clinical.locator('[data-phenotype-view]')).toHaveAttribute('data-phenotype-view', width <= 540 ? 'anterior' : 'all');
    const originalClinicalSource = await checkClinicalArtwork(clinical);
    await capture(page, clinical, 'clinical-default', width, testInfo);

    await viewControls.getByRole('button', { name: 'All views', exact: true }).click();
    for (const region of clinicalRegions) {
      await regionControls.getByRole('button', { name: `Select ${region} region`, exact: true }).click();
      await expect(clinical.getByRole('button', { name: `Select ${region} anatomy`, exact: true })).toHaveAttribute('aria-pressed', 'true');
      await expect(clinical.locator('.phenotype-anatomical-target[aria-pressed="true"]')).toHaveCount(1);
      await expect(clinical.locator('image[data-medical-artwork="clinical-distribution"]')).toHaveAttribute('href', originalClinicalSource);
      await expect(clinical.locator('.phenotype-anatomical-overlay')).toHaveAttribute('data-selected-muscles', region);
      await capture(page, clinical, `clinical-muscle-${region}`, width, testInfo);
    }
    // Cervical anatomy is visible in all three orientations, so every captured
    // view retains a visible highlight for the same selected clinical category.
    await regionControls.getByRole('button', { name: 'Select cervical region', exact: true }).click();
    for (const [label, view] of [['All views', 'all'], ['Anterior', 'anterior'], ['Posterior', 'posterior'], ['Lateral', 'lateral']]) {
      await viewControls.getByRole('button', { name: label, exact: true }).click();
      await expect(clinical.locator('[data-phenotype-view]')).toHaveAttribute('data-phenotype-view', view);
      await expect(viewControls.getByRole('button', { name: label, exact: true })).toHaveAttribute('aria-pressed', 'true');
      await expect(viewControls.locator('[aria-pressed="true"]')).toHaveCount(1);
      await expect(regionControls.getByRole('button')).toHaveCount(5);
      await expect(clinical.getByRole('button', { name: 'Select cervical anatomy', exact: true })).toHaveAttribute('aria-pressed', 'true');
      await expect(clinical.locator('.phenotype-anatomical-target')).toHaveCount(view === 'posterior' ? 3 : 5);
      await checkClinicalArtwork(clinical, originalClinicalSource);
      await capture(page, clinical, `clinical-${view}`, width, testInfo);
    }

    const clinicalNmj = page.locator('#laboratory .phenotype-companion-detail').filter({ has: page.getByText('Inspect the neuromuscular interface', { exact: true }) });
    await clinicalNmj.locator('summary').click();
    await expect(clinicalNmj.locator('.nmj-illustration')).toHaveAttribute('data-nmj-state', 'normal');
    await checkVisibleNmjArtwork(page);
    await capture(page, clinicalNmj, 'clinical-nmj', width, testInfo);
    expect(runtimeErrors, 'Reference refresh interactions must not introduce browser errors').toEqual([]);
  });
}
