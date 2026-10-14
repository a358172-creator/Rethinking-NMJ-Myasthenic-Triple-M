import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('./');
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('adapted mechanism figures preserve readable diagrams and keyboard inspection at narrow widths', async ({ page }, testInfo) => {
  await page.locator('#explorer').getByRole('button', { name: 'Compare Mechanisms', exact: true }).click();
  const figure = page.getByRole('figure', { name: 'Two possible pathways to an MG-like phenotype', exact: true });
  await expect(figure).toContainText(/can coexist/);
  await expect(figure).toContainText(/source and category attribution remain unresolved/);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `Figures must fit ${width}px`).toBeLessThanOrEqual(1);
    for (const region of await figure.getByRole('region').all()) {
      await expect(region.getByRole('img')).toBeVisible();
      await expect(region).toHaveAttribute('tabindex', '0');
      const overflowing = await region.evaluate((element) => element.scrollWidth > element.clientWidth);
      if (width <= 390) {
        expect(overflowing, 'Narrow diagrams retain their readable width inside the figure').toBe(true);
        await region.evaluate((element) => { element.scrollLeft = 0; });
        await region.focus();
        await region.press('ArrowRight');
        await expect.poll(() => region.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
      }
    }
  }
  await page.setViewportSize({ width: testInfo.project.name === 'mobile' ? 390 : 1440, height: 1000 });
  await testInfo.attach(`Adapted mechanism figure — ${testInfo.project.name}`, {
    body: await figure.screenshot({ path: testInfo.outputPath('adapted-mechanism-figure.png'), style: '.site-header, .skip-link { visibility: hidden; }' }),
    contentType: 'image/png',
  });
});
