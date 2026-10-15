import { mkdir } from 'node:fs/promises';
import { expect, test, type Locator, type Page } from '@playwright/test';

async function anatomy(page: Page, label: string) {
  await page.locator('#explorer .structure-controls').getByRole('button', { name: label, exact: true }).click();
}

async function laboratory(page: Page, label: string) {
  await page.locator('#laboratory').getByRole('group', { name: 'Laboratory views', exact: true }).getByRole('button', { name: label, exact: true }).click();
}

for (const width of [1440, 768, 390]) {
  test(`editorial collection preserves the five requested sections at ${width}px`, async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    const saveArtifacts = testInfo.project.name === 'desktop';
    // Exclude fixed navigation from stitched, component-only review captures.
    if (saveArtifacts) await page.addStyleTag({ content: '.site-header, .skip-link { display: none !important; }' });
    if (saveArtifacts) await mkdir('.artifacts/editorial-artwork/after', { recursive: true });
    const capture = async (target: Locator, name: string) => {
      await expect(target).toBeVisible();
      for (const image of await target.locator('img[data-medical-artwork]:visible').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(element => {
          const art = element as HTMLImageElement;
          return art.complete && art.naturalWidth >= 1024 && art.naturalHeight >= 1024;
        }), { message: `${name} must load its high-resolution artwork` }).toBe(true);
        const bounds = await image.boundingBox();
        expect(bounds).not.toBeNull();
        expect(bounds!.x, `${name} image left boundary`).toBeGreaterThanOrEqual(-1);
        expect(bounds!.x + bounds!.width, `${name} image right boundary`).toBeLessThanOrEqual(width + 1);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `${name} must retain an internally contained layout at ${width}px`).toBeLessThanOrEqual(1);
      await target.scrollIntoViewIfNeeded();
      if (saveArtifacts) {
        const path = `.artifacts/editorial-artwork/after/collection-${name}-${width}.png`;
        await target.screenshot({ path, scale: 'css', style: '.site-header, .skip-link { visibility: hidden !important; }' });
        await testInfo.attach(`${name} at ${width}px`, { path, contentType: 'image/png' });
      }
    };

    // Explore Anatomy: all three tissue controllers remain independent.
    await anatomy(page, 'Heart / myocardium');
    const heart = page.locator('#anatomy-detail .myocardium-explorer');
    await heart.getByRole('button', { name: 'Conceptual myocardial injury', exact: true }).click();
    await heart.locator('.myocardium-tissue-details summary').click();
    await capture(heart, 'explore-anatomy-heart');
    await anatomy(page, 'Skeletal muscle');
    await page.locator('.muscle-explorer').getByRole('button', { name: 'Conceptual immune injury', exact: true }).click();
    await capture(page.locator('.muscle-explorer'), 'explore-anatomy-muscle');
    await anatomy(page, 'Neuromuscular junction');
    await page.locator('.nmj-explorer').getByRole('group', { name: 'Normal transmission stages', exact: true }).getByRole('button', { name: 'Receptor activation', exact: true }).click();
    await capture(page.locator('.nmj-explorer'), 'explore-anatomy-nmj');

    // Compare Mechanisms: both mechanisms and the distinct myocardial context.
    await page.getByRole('button', { name: 'Compare Mechanisms', exact: true }).click();
    await page.getByRole('button', { name: 'Potential overlap', exact: true }).click();
    const comparison = page.locator('#mechanism-panel .sfn-figure-container');
    await expect(comparison).toContainText('0/4');
    await expect(comparison).toContainText('6/11');
    await capture(comparison, 'compare-mechanisms');

    // Diagnostic Laboratory: clinical anatomy, serology and three signal methods.
    await laboratory(page, 'Clinical phenotype');
    await page.locator('#laboratory').getByRole('button', { name: 'Select respiratory region', exact: true }).click();
    await capture(page.locator('#laboratory-view > section'), 'clinical-phenotype');
    await laboratory(page, 'Serological evidence');
    await page.locator('#laboratory').getByRole('group', { name: 'Qualitative serology examples', exact: true }).getByRole('button', { name: 'Positive', exact: true }).click();
    await expect(page.locator('#laboratory .lab-cohort-value')).toHaveText('11/30(36.7%)');
    await capture(page.locator('#laboratory-view > section'), 'serological-evidence');
    await laboratory(page, 'Electrophysiology');
    const modalities = page.locator('#laboratory').getByRole('group', { name: 'Electrophysiology modalities', exact: true });
    const lab = page.locator('#laboratory-view > section');
    await lab.getByRole('button', { name: 'Decremental response', exact: true }).click();
    await capture(lab, 'electrophysiology-rns');
    await modalities.getByRole('button', { name: 'Single-fiber EMG', exact: true }).click();
    await lab.getByRole('button', { name: 'Increased jitter', exact: true }).click();
    await lab.getByRole('checkbox', { name: 'Show possible impulse blocking', exact: true }).check();
    await capture(lab, 'electrophysiology-sfemg');
    await modalities.getByRole('button', { name: 'Conventional needle EMG', exact: true }).click();
    await lab.getByRole('button', { name: 'Myopathic pattern', exact: true }).click();
    await capture(lab, 'electrophysiology-needle');
  });
}
