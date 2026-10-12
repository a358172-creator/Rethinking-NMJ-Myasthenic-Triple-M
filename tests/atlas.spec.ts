import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const runtimeIssues = new WeakMap<Page, string[]>();
const structureNames = ['Heart / myocardium', 'Skeletal muscle', 'Neuromuscular junction'] as const;
const evidenceLabels = [
  'Established physiology',
  'Literature-supported observations',
  'Emerging or proposed mechanisms',
  'Present N=38 analysis',
] as const;

async function checkMechanisticEvidence(page: Page) {
  const evidence = page.locator('#mechanism-panel').getByRole('region', { name: 'Mechanistic Evidence', exact: true });
  await expect(evidence).toHaveCount(1);
  for (const label of evidenceLabels) await expect(evidence.getByText(label, { exact: true })).toBeVisible();
  const references = evidence.locator('a[href^="#ref-"]');
  expect(await references.count(), 'Every interpretation must link to supporting literature').toBeGreaterThan(0);
  const missingReferences = await references.evaluateAll((links) => links.flatMap((link) => {
    const href = link.getAttribute('href') || '';
    return document.getElementById(href.slice(1)) ? [] : [href];
  }));
  expect(missingReferences).toEqual([]);
}

test.beforeEach(async ({ page, baseURL }) => {
  const issues: string[] = [];
  runtimeIssues.set(page, issues);
  const origin = new URL(baseURL!).origin;
  page.on('pageerror', (error) => issues.push(`Page error: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') issues.push(`Console error: ${message.text()}`);
  });
  page.on('requestfailed', (request) => {
    issues.push(`Failed request: ${request.url()} (${request.failure()?.errorText})`);
  });
  page.on('response', (response) => {
    if (response.url().startsWith(origin) && response.status() >= 400) {
      issues.push(`HTTP ${response.status()}: ${response.url()}`);
    }
  });
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Beyond the Third M', exact: true })).toBeVisible();
});

test.afterEach(async ({ page }) => {
  expect(runtimeIssues.get(page), 'The application must load without browser or asset errors').toEqual([]);
});

test('homepage preserves the frozen study denominators and scientific cautions', async ({ page }) => {
  const stats = page.locator('#study-at-a-glance');
  const findings = [
    { id: 'cohort', value: 'N=38', label: 'Published patients' },
    { id: 'achr', value: '11/30', label: 'AChR-positive' },
    { id: 'nmj', value: '0/4', label: 'Objective NMJ abnormality' },
    { id: 'needle-emg', value: '6/11', label: 'Myopathic needle EMG' },
    { id: 'mortality', value: '16/38', label: 'Documented mortality' },
  ];
  for (const finding of findings) {
    const card = stats.getByTestId(`stat-${finding.id}`);
    await expect(card.locator('dt')).toHaveText(finding.label);
    await expect(card.locator('.stat-value')).toHaveText(finding.value);
  }
  await expect(page.locator('main')).toContainText('38/38');
  await expect(page.locator('main')).toContainText('4/38');
  await expect(page.locator('main')).toContainText('36.7%');
  await expect(page.locator('main')).toContainText('54.5%');
  await expect(page.locator('main')).toContainText('42.1%');
  await expect(page.locator('main')).toContainText(/0[–-]60\.2%/);
  await expect(page.locator('main')).toContainText(/does not exclude.*NMJ|does not rule out.*NMJ|does not establish absence of NMJ/i);
  await expect(page.locator('main')).toContainText(/None of the 11 AChR-positive.*RNS.*SFEMG/i);
  await expect(page.locator('main')).toContainText(/SFEMG.*(?:one|1) patient.*(?:four|4)|(?:one|1).*SFEMG.*(?:four|4)/i);
});

test('hero and every internal reference navigate to an existing target', async ({ page }) => {
  await page.getByRole('link', { name: 'Explore the Mechanisms', exact: true }).click();
  await expect(page).toHaveURL(/#explorer$/);
  await expect(page.locator('#explorer')).toBeInViewport();

  const invalidAnchors = await page.locator('a[href^="#"]').evaluateAll((links) => links.flatMap((link) => {
    const href = link.getAttribute('href') || '';
    return href.length < 2 || !document.getElementById(decodeURIComponent(href.slice(1))) ? [href] : [];
  }));
  expect(invalidAnchors, 'Every navigation and reference anchor must have a target').toEqual([]);

  const doiLinks = page.locator('a[href*="doi.org"]');
  expect(await doiLinks.count()).toBeGreaterThanOrEqual(4);
  for (const href of await doiLinks.evaluateAll((links) => links.map((link) => link.getAttribute('href')))) {
    expect(href).toMatch(/^https:\/\/doi\.org\/10\.\d{4,9}\/.+/);
  }

  const brokenImages = await page.locator('img').evaluateAll((images) => images.filter((image) =>
    !image.complete || image.naturalWidth === 0).map((image) => image.src));
  expect(brokenImages).toEqual([]);
  await expect(page.locator('button:disabled, [aria-disabled="true"]')).toHaveCount(0);
});

test('all text anatomy controls update interpretation and visibly distinguish evidence categories', async ({ page }) => {
  const explorer = page.locator('#explorer');
  const panel = page.locator('#mechanism-panel');
  const expectedContent = [/myocarditis/i, /myopathic/i, /acetylcholine/i];

  for (let index = 0; index < structureNames.length; index += 1) {
    const name = structureNames[index];
    const control = explorer.getByRole('button', { name, exact: true });
    await control.click();
    await expect(control).toHaveAttribute('aria-pressed', 'true');
    for (const otherName of structureNames.filter((candidate) => candidate !== name)) {
      await expect(explorer.getByRole('button', { name: otherName, exact: true })).toHaveAttribute('aria-pressed', 'false');
    }
    await expect(panel).toContainText(expectedContent[index]);
    await checkMechanisticEvidence(page);
  }
});

test('original anatomy SVG responds to mouse selection and hero activation', async ({ page }) => {
  const explorer = page.locator('#explorer');
  const targets = explorer.locator('svg [role="button"]');
  for (const index of [1, 2, 0]) {
    await targets.nth(index).click();
    await expect(targets.nth(index)).toHaveAttribute('aria-pressed', 'true');
    await expect(explorer.getByRole('button', { name: structureNames[index], exact: true })).toHaveAttribute('aria-pressed', 'true');
  }

  await page.locator('.hero-art svg [role="button"]').nth(1).click();
  await expect(explorer.getByRole('button', { name: 'Skeletal muscle', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(explorer).toBeInViewport();
  await expect(page.locator('#mechanism-panel')).toContainText('Muscle fibers');
});

test('anatomical SVG supports Enter and Space selection with synchronized pressed states', async ({ page }) => {
  const explorer = page.locator('#explorer');
  const targets = explorer.locator('svg [role="button"]');
  await expect(targets).toHaveCount(3);
  for (let index = 0; index < structureNames.length; index += 1) {
    const target = targets.nth(index);
    await expect(target).toHaveAttribute('tabindex', '0');
    await expect(target).toHaveAttribute('aria-label', /.+/);
    await target.focus();
    await expect(target).toBeFocused();
    await target.press(index % 2 === 0 ? 'Enter' : 'Space');
    await expect(target).toHaveAttribute('aria-pressed', 'true');
    await expect(explorer.getByRole('button', { name: structureNames[index], exact: true })).toHaveAttribute('aria-pressed', 'true');
  }
});

test('NMJ defaults to normal physiology and allows a clearly hypothetical impairment state', async ({ page }) => {
  const explorer = page.locator('#explorer');
  await explorer.getByRole('button', { name: 'Neuromuscular junction', exact: true }).click();
  const normal = explorer.getByRole('button', { name: 'Normal physiology', exact: true });
  const impairment = explorer.getByRole('button', { name: 'Possible impairment', exact: true });
  const description = page.locator('#mechanism-panel .nmj-state-description');
  await expect(normal).toHaveAttribute('aria-pressed', 'true');
  await expect(impairment).toHaveAttribute('aria-pressed', 'false');
  await expect(description).toContainText('vesicular acetylcholine release');
  await expect(description).toContainText('postsynaptic AChRs');
  await expect(page.getByRole('img', { name: 'Normal neuromuscular transmission', exact: false })).toBeVisible();
  await impairment.click();
  await expect(impairment).toHaveAttribute('aria-pressed', 'true');
  await expect(normal).toHaveAttribute('aria-pressed', 'false');
  await expect(description).toContainText('Conceptual possibility');
  await expect(description).toContainText('reduced transmission safety margin');
  await expect(description).toContainText('not a cohort finding or a specific antibody attack');
  await expect(page.getByRole('img', { name: /Possible impairment of neuromuscular transmission/ })).toBeVisible();
  await normal.click();
  await expect(normal).toHaveAttribute('aria-pressed', 'true');
  await expect(impairment).toHaveAttribute('aria-pressed', 'false');
  await expect(description).toContainText('muscle activation');
});

test('comparison presents three nonexclusive interpretations and changes explanatory content', async ({ page }) => {
  const explorer = page.locator('#explorer');
  const compare = explorer.getByRole('button', { name: 'Compare Mechanisms', exact: true });
  const anatomy = explorer.getByRole('button', { name: 'Explore anatomy', exact: true });
  await compare.click();
  await expect(compare).toHaveAttribute('aria-pressed', 'true');
  await expect(anatomy).toHaveAttribute('aria-pressed', 'false');
  await expect(explorer).toContainText('Similar clinical manifestations do not necessarily imply the same physiological mechanism.');
  for (const manifestation of ['Ptosis', 'Diplopia', 'Bulbar weakness', 'Neck weakness', 'Proximal weakness', 'Respiratory muscle weakness']) {
    await expect(explorer).toContainText(manifestation);
  }

  const names = ['Primary NMJ dysfunction', 'Muscle-predominant immune injury', 'Potential overlap'];
  const explanations: string[] = [];
  for (const name of names) {
    const control = explorer.getByRole('button', { name, exact: true });
    await control.click();
    await expect(control).toHaveAttribute('aria-pressed', 'true');
    for (const otherName of names.filter((candidate) => candidate !== name)) {
      await expect(explorer.getByRole('button', { name: otherName, exact: true })).toHaveAttribute('aria-pressed', 'false');
    }
    explanations.push(await page.locator('#mechanism-panel').innerText());
    await checkMechanisticEvidence(page);
  }
  expect(new Set(explanations).size, 'Each interpretive state must provide distinct content').toBe(3);
  await expect(page.locator('#mechanism-panel')).toContainText(/coexist|coexistence|both mechanisms/i);
  await anatomy.click();
  await expect(anatomy).toHaveAttribute('aria-pressed', 'true');
  await expect(explorer.getByRole('button', { name: 'Heart / myocardium', exact: true })).toBeVisible();
});

test('responsive anatomy and comparison have no horizontal document overflow', async ({ page }) => {
  for (const width of [390, 768]) {
    await page.setViewportSize({ width, height: 900 });
    for (const mode of ['Explore anatomy', 'Compare Mechanisms']) {
      await page.locator('#explorer').getByRole('button', { name: mode, exact: true }).click();
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(dimensions.content, `${mode} should fit a ${width}px viewport`).toBeLessThanOrEqual(dimensions.viewport + 1);
      if (mode === 'Explore anatomy') {
        const figure = await page.locator('#explorer .atlas-figure').boundingBox();
        const panel = await page.locator('#mechanism-panel').boundingBox();
        expect(figure).not.toBeNull();
        expect(panel).not.toBeNull();
        expect(panel!.y, `Interpretation should appear below the figure at ${width}px`).toBeGreaterThan(figure!.y + figure!.height);
      }
    }
  }
});

test('anatomy and comparison satisfy automated WCAG accessibility checks', async ({ page }) => {
  for (const mode of ['Explore anatomy', 'Compare Mechanisms']) {
    await page.locator('#explorer').getByRole('button', { name: mode, exact: true }).click();
    if (mode === 'Explore anatomy') {
      await page.locator('#explorer').getByRole('button', { name: 'Neuromuscular junction', exact: true }).click();
      await page.locator('#explorer').getByRole('button', { name: 'Normal physiology', exact: true }).click();
    }
    await checkMechanisticEvidence(page);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, `${mode} accessibility violations`).toEqual([]);
  }
});

test('upcoming modules are labeled previews without inert controls or patient records', async ({ page }) => {
  const upcoming = page.locator('#modules article.module-preview');
  await expect(upcoming).toHaveCount(2);
  for (const preview of await upcoming.all()) {
    await expect(preview.getByText('Upcoming', { exact: true })).toBeVisible();
    await expect(preview.locator('a, button, input, [role="button"]')).toHaveCount(0);
  }
  await expect(upcoming.nth(0)).toContainText('Phase 2 has not been implemented');
  await expect(upcoming.nth(1)).toContainText('No patient records loaded');
});

test('mobile menu exposes its destination and closes after navigation', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'The collapsible menu is shown at mobile widths');
  const menu = page.getByRole('button', { name: 'Menu', exact: true });
  const navigation = page.getByRole('navigation', { name: 'Main navigation', exact: true });
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(navigation).toBeHidden();
  await menu.click();
  await expect(page.getByRole('button', { name: 'Close menu', exact: true })).toHaveAttribute('aria-expanded', 'true');
  await expect(navigation).toBeVisible();
  await navigation.getByRole('link', { name: 'Mechanism Explorer', exact: true }).click();
  await expect(page).toHaveURL(/#explorer$/);
  await expect(page.getByRole('button', { name: 'Menu', exact: true })).toHaveAttribute('aria-expanded', 'false');
  await expect(navigation).toBeHidden();
});

test('reduced-motion preference suppresses transitions while retaining interaction', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const motion = await page.evaluate(() => {
    const region = document.querySelector('.anatomy-region')!;
    const durationInSeconds = (value: string) => value.trim().endsWith('ms') ? parseFloat(value) / 1000 : parseFloat(value);
    return {
      preference: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      scroll: getComputedStyle(document.documentElement).scrollBehavior,
      transitions: getComputedStyle(region).transitionDuration.split(',').map(durationInSeconds),
    };
  });
  expect(motion.preference).toBe(true);
  expect(motion.scroll).toBe('auto');
  for (const duration of motion.transitions) expect(duration).toBeLessThanOrEqual(0.0001);
  await page.locator('.hero-art svg [role="button"]').nth(2).click();
  await expect(page.locator('#explorer')).toBeInViewport();
  await expect(page.locator('#explorer').getByRole('button', { name: 'Neuromuscular junction', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('captures normal NMJ and comparison artifacts for visual review', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await testInfo.attach(`Homepage — ${testInfo.project.name}`, {
    body: await page.screenshot({ path: testInfo.outputPath(`homepage-${testInfo.project.name}.png`), fullPage: false }),
    contentType: 'image/png',
  });
  const explorer = page.locator('#explorer');
  await explorer.getByRole('button', { name: 'Neuromuscular junction', exact: true }).click();
  await expect(page.locator('#mechanism-panel .nmj-state-description')).toContainText('Normal physiology');
  for (const mode of ['Explore anatomy', 'Compare Mechanisms']) {
    await explorer.getByRole('button', { name: mode, exact: true }).click();
    await checkMechanisticEvidence(page);
    await testInfo.attach(`${mode} — ${testInfo.project.name}`, {
      body: await explorer.screenshot({ path: testInfo.outputPath(`${mode === 'Explore anatomy' ? 'normal-nmj' : 'comparison'}-${testInfo.project.name}.png`) }),
      contentType: 'image/png',
    });
  }
});
