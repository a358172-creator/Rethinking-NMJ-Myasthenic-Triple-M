import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('patient atlas exposes its review status without loading records or controls', async ({ page }, testInfo) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('./');
  if (testInfo.project.name === 'mobile') await page.getByRole('button', { name: 'Menu', exact: true }).click();
  const destination = page.getByRole('navigation', { name: 'Main navigation', exact: true })
    .getByRole('link', { name: 'Patient Evidence Atlas', exact: true });
  await destination.focus();
  await destination.press('Enter');
  await expect(page).toHaveURL(/#patients$/);
  const atlas = page.locator('#patients');
  await expect(atlas).toBeInViewport();
  await expect(atlas.getByRole('heading', { name: 'Patient-Level Evidence Atlas', exact: true })).toBeVisible();
  await expect(atlas).toContainText('What Was Tested, What Was Found, and What Remains Unknown');
  await expect(atlas).toContainText('AWAITING VALIDATION AND PUBLICATION REVIEW');
  await expect(atlas).toContainText('No patient records loaded');
  await expect(atlas).toContainText('Absence of documented physiological evidence is not equivalent to evidence of normal physiology.');
  await expect(atlas.locator('table, select, input, button, [data-patient-label]')).toHaveCount(0);
  await expect(page.locator('#atlas-matrix, #atlas-profile')).toHaveCount(0);
  expect(requests.filter((url) => /esearch_sources|research_sources|data_review|atlas\.review|__local_atlas__|\.xlsx?/i.test(url))).toEqual([]);
  const accessibility = await new AxeBuilder({ page }).include('#patients')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(accessibility.violations).toEqual([]);
  const dimensions = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width + 1);
  await atlas.screenshot({ path: testInfo.outputPath('patient-atlas-review-status.png') });
});
