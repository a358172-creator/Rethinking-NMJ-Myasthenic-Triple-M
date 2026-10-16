import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('visitors can find the author, read the CV and contact him from the main menu', async ({ page }) => {
  await page.goto('./');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const toggle = page.getByRole('button', { name: 'Menu', exact: true });
  const collapsed = await toggle.isVisible();
  if (collapsed) await toggle.click();
  const navigation = page.getByRole('navigation', { name: 'Main navigation', exact: true });
  const profileLink = navigation.getByRole('link', { name: 'CV & Contact', exact: true });
  await profileLink.focus();
  await profileLink.press('Enter');
  await expect(page).toHaveURL(/#about$/);
  if (collapsed) {
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(navigation).toBeHidden();
  }
  const profile = page.getByRole('region', { name: 'About me & contact.', exact: true });
  await expect(profile).toBeInViewport();
  await expect(profile.getByRole('heading', { name: 'Jesús Arturo López Holguín', exact: true })).toBeVisible();
  await expect(profile.getByRole('link', { name: 'arturolol559@gmail.com', exact: true })).toHaveAttribute('href', 'mailto:arturolol559@gmail.com');
  await expect(profile.getByRole('link', { name: 'Academic: a358172@uach.mx', exact: true })).toHaveAttribute('href', 'mailto:a358172@uach.mx');

  const summary = profile.locator('summary');
  await summary.focus();
  await summary.press('Enter');
  await expect(profile.getByRole('heading', { name: 'Research experience', exact: true })).toBeVisible();
  await expect(profile.getByRole('heading', { name: 'Manuscripts in preparation', exact: true })).toBeVisible();
  await expect(profile.getByRole('heading', { name: 'Languages', exact: true })).toBeVisible();
  await expect(profile).toContainText('English · B2');
  await summary.press('Enter');
  await expect(profile.getByRole('heading', { name: 'Languages', exact: true })).toBeHidden();
  await expect(page.locator('.hero').getByRole('link', { name: 'About me & contact', exact: false })).toHaveAttribute('href', '#about');
  await expect(page.locator('footer').getByRole('link', { name: 'About me, CV & contact', exact: false })).toHaveAttribute('href', '#about');
});

test('CV downloads the complete supplied Word document from the deployment subpath', async ({ page, request, baseURL }) => {
  await page.goto('./#about');
  const link = page.getByRole('link', { name: 'Download CV', exact: false });
  const expectedUrl = new URL('cv/CV_Arturo_Lopez_EN.docx', baseURL!).href;
  expect(await link.evaluate((element: HTMLAnchorElement) => element.href)).toBe(expectedUrl);
  const response = await request.get(expectedUrl);
  expect(response.status()).toBe(200);
  expect(await response.body()).toEqual(await readFile('public/cv/CV_Arturo_Lopez_EN.docx'));
  const downloadEvent = page.waitForEvent('download');
  await link.click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('CV_Arturo_Lopez_EN.docx');
  expect(await download.failure()).toBeNull();
});

test('profile and expanded CV remain accessible and fit phone, tablet and desktop widths', async ({ page }, testInfo) => {
  await page.goto('./#about');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const profile = page.locator('#about');
  await profile.locator('summary').click();
  for (const width of [320, 390, 768, 1024, 1120, 1280, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
    expect(dimensions.content, `The page must fit at ${width}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
    const header = page.locator('.site-header');
    const links = header.locator('a:visible');
    for (const link of await links.all()) {
      const bounds = await link.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
    }
  }
  const results = await new AxeBuilder({ page }).include('#about').include('.site-header')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
  await profile.locator('summary').click();
  await page.setViewportSize({ width: testInfo.project.name === 'mobile' ? 390 : 1440, height: 1000 });
  await profile.screenshot({ path: testInfo.outputPath('author-profile.png'), style: '.site-header { visibility: hidden; }' });
});
