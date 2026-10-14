import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('aggregate evidence module is reachable without loading patient records or private sources', async ({ page }, testInfo) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('./');
  if (testInfo.project.name === 'mobile') await page.getByRole('button', { name: 'Menu', exact: true }).click();
  const destination = page.getByRole('navigation', { name: 'Main navigation', exact: true })
    .getByRole('link', { name: 'Evidence Explorer', exact: true });
  await destination.focus();
  await destination.press('Enter');
  await expect(page).toHaveURL(/#evidence$/);
  const explorer = page.locator('#evidence');
  await expect(explorer).toBeInViewport();
  await expect(explorer.getByRole('heading', { name: 'Scientific Evidence Explorer', exact: true })).toBeVisible();
  await expect(explorer).toContainText('What the Published Evidence Demonstrates — and What Remains Uncertain');
  await expect(explorer).toContainText(/provisional.*literature-derived.*pooled findings/i);
  await expect(explorer).toContainText(/pending final source-provenance reconciliation/i);
  await expect(page.locator('#patients, #atlas-matrix, #atlas-profile, [data-patient-label]')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('Patient-Level Evidence Atlas');
  await expect(explorer.locator('input, select, a[download]')).toHaveCount(0);
  expect(requests.filter((url) => /esearch_sources|research_sources|data_review|atlas\.review|__local_atlas__|\.xlsx?/i.test(url))).toEqual([]);
  const accessibility = await new AxeBuilder({ page }).include('#evidence')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(accessibility.violations).toEqual([]);
  const dimensions = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width + 1);
  await explorer.screenshot({ path: testInfo.outputPath('aggregate-evidence-explorer.png'), style: '.site-header, .skip-link { visibility: hidden; }' });
});
