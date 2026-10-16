import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('./');
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('editorial mechanism figures preserve equivalent artwork frames and readable evidence boundaries', async ({ page }, testInfo) => {
  await page.locator('#explorer').getByRole('button', { name: 'Compare Mechanisms', exact: true }).click();
  const figure = page.getByRole('figure', { name: 'Two possible pathways to an MG-like phenotype', exact: true });
  await expect(figure).toContainText(/can coexist/);
  await expect(figure).toContainText(/source and category attribution remain unresolved/);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `Figures must fit ${width}px`).toBeLessThanOrEqual(1);
    const panels = figure.locator('.mechanism-figure-panel');
    await expect(panels).toHaveCount(2);
    for (const panel of await panels.all()) {
      const image = panel.locator('img[data-medical-artwork]');
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      await expect.poll(() => image.evaluate(element => {
        const picture = element as HTMLImageElement;
        return picture.complete && picture.naturalWidth >= 1024 && picture.naturalHeight >= 1024;
      })).toBe(true);
      expect(await panel.evaluate(element => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1);
    }
    await expect(figure.locator('.mechanism-artwork-reading-key').first()).toContainText('synaptic cleft');
    await expect(figure.locator('.mechanism-artwork-reading-key').first()).toContainText('basal-lamina');
    await expect(figure.locator('.mechanism-artwork-reading-key').last()).toContainText('sarcolemma');
    const canvases = await figure.locator('.mechanism-figure-artwork img').evaluateAll(images => images.map(image => {
      const bounds = image.getBoundingClientRect();
      return { width: bounds.width, height: bounds.height };
    }));
    expect(Math.abs(canvases[0].width - canvases[1].width)).toBeLessThanOrEqual(1);
    expect(Math.abs(canvases[0].height - canvases[1].height)).toBeLessThanOrEqual(1);
    await expect(figure).toContainText('missing tests are not negative findings');
    await expect(figure.locator('.myocardial-comparison-context')).toContainText('no cohort-specific lesion or new statistic');
    const cardiac = figure.locator('.myocardial-comparison-context img[data-medical-artwork="cardiac-tissue-injury"]');
    await cardiac.scrollIntoViewIfNeeded();
    await expect.poll(() => cardiac.evaluate(element => (element as HTMLImageElement).naturalWidth >= 1024)).toBe(true);
  }
  await page.setViewportSize({ width: testInfo.project.name === 'mobile' ? 390 : 1440, height: 1000 });
  await testInfo.attach(`Adapted mechanism figure — ${testInfo.project.name}`, {
    body: await figure.screenshot({ path: testInfo.outputPath('adapted-mechanism-figure.png'), style: '.site-header, .skip-link { visibility: hidden; }' }),
    contentType: 'image/png',
  });
});
