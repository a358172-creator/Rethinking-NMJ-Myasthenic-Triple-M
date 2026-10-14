import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator } from '@playwright/test';

async function chooseByKeyboard(section: Locator, label: string, key: 'Enter' | 'Space') {
  const control = section.getByRole('button', { name: label, exact: true });
  await control.focus();
  await expect(control).toBeFocused();
  await control.press(key);
  await expect(control).toHaveAttribute('aria-pressed', 'true');
  await expect(section.locator('button[aria-pressed="true"]')).toHaveCount(1);
}

async function checkRenderedFractions(svg: Locator, counts: readonly number[], denominator: number) {
  await expect(svg).toBeVisible();
  const geometry = await svg.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    const segments = Array.from(element.querySelectorAll(':scope > rect'))
      .filter((rect) => rect.getAttribute('fill') !== 'none');
    return {
      width: bounds.width,
      fractions: segments.map((segment) => segment.getBoundingClientRect().width / bounds.width),
    };
  });
  expect(geometry.width, 'The displayed chart must have a measurable width').toBeGreaterThan(0);
  expect(geometry.fractions).toHaveLength(counts.length);
  for (const [index, count] of counts.entries()) {
    expect(geometry.fractions[index], `Visible segment ${index + 1} should encode ${count}/${denominator}`)
      .toBeCloseTo(count / denominator, 2);
  }
  expect(geometry.fractions.reduce((sum, fraction) => sum + fraction, 0),
    'The visible count segments should fill the displayed quantitative bar').toBeCloseTo(1, 2);
}

test.beforeEach(async ({ page }) => {
  await page.goto('./#evidence');
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('availability selection preserves evaluated and missing denominators in three diagnostic domains', async ({ page }) => {
  const chart = page.getByTestId('evidence-availability');
  await expect(chart.getByRole('heading', { name: 'How Much of the Neuromuscular Phenotype Was Actually Tested?', exact: true })).toBeVisible();
  const domains = [
    { label: 'AChR serology', evaluated: 30, missing: 8, measures: /antibod/i },
    { label: 'Formal NMJ-specific testing', evaluated: 4, missing: 34, measures: /transmission/i },
    { label: 'Conventional needle EMG', evaluated: 11, missing: 27, measures: /motor-unit|muscle membrane/i },
  ];
  for (const [index, domain] of domains.entries()) {
    await chooseByKeyboard(chart, domain.label, index % 2 ? 'Space' : 'Enter');
    const detail = chart.getByTestId('availability-detail');
    await expect(detail).toContainText(`${domain.evaluated}/38`);
    await expect(detail).toContainText(`${domain.missing}/38`);
    await expect(detail).toContainText(domain.measures);
  }
  await expect(chart).toContainText('Clinical reporting was much more extensive than direct physiological evaluation of the neuromuscular junction.');
  await expect(chart).toContainText(/not.*(?:sensitivity|specificity)|do not.*(?:sensitivity|specificity)/i);
});

test('serology comparison shows each audited row without assigning normal transmission to missing tests', async ({ page }) => {
  const chart = page.getByTestId('serology-physiology');
  await expect(chart.getByRole('heading', { name: 'Antibody Positivity Is Not Physiological Confirmation', exact: true })).toBeVisible();
  for (const [label, formal, missing, total] of [
    ['AChR positive', 0, 11, 11],
    ['AChR negative', 4, 15, 19],
    ['AChR not documented', 0, 8, 8],
  ] as const) {
    await chooseByKeyboard(chart, label, 'Enter');
    const detail = chart.getByTestId('serology-detail');
    await expect(detail).toContainText(`${formal}/${total}`);
    await expect(detail).toContainText(`${missing}/${total}`);
  }
  await expect(chart).toContainText('None of the 11 AChR-positive patients had documented RNS/SFEMG testing.');
  await expect(chart).toContainText(/(?:absence|absent|missing|undocumented).*not.*negative|not.*negative.*(?:absence|absent|missing|undocumented)/i);
  await expect(chart).toContainText(/association.*independence.*causality/i);
  await chart.getByRole('button', { name: 'AChR positive', exact: true }).click();
  await expect(chart.getByTestId('serology-detail')).toContainText(/not.*normal|not.*shown.*normal/i);
});

test('NMJ categories describe documentation while retaining the small-subset uncertainty', async ({ page }) => {
  const chart = page.getByTestId('nmj-evidence-gap');
  await expect(chart.getByRole('heading', { name: 'The Physiological Evidence Gap', exact: true })).toBeVisible();
  for (const [label, count] of [
    ['Formal negative', 4],
    ['Qualitative indeterminate', 2],
    ['No documented objective evidence', 32],
  ] as const) {
    await chooseByKeyboard(chart, label, 'Space');
    await expect(chart.getByTestId('nmj-detail')).toContainText(`${count}/38`);
  }
  await expect(chart).toContainText('0/4');
  await expect(chart).toContainText('0–60.2%');
  await expect(chart).toContainText(/(?:Clopper|exact 95%)/i);
  await expect(chart).toContainText(/(?:wide|substantial).*uncertainty|wide.*interval/i);
  await expect(chart).toContainText(/does not demonstrate absence|does not exclude.*NMJ|not.*absence of true NMJ/i);
  await chart.getByRole('button', { name: 'Qualitative indeterminate', exact: true }).click();
  await expect(chart.getByTestId('nmj-detail')).toContainText(/without.*(?:documented formal|formal confirmation|formal NMJ)/i);
});

test('needle EMG distribution keeps untested records outside the evaluated denominator', async ({ page }) => {
  const chart = page.getByTestId('needle-emg-distribution');
  await expect(chart.getByRole('heading', { name: 'What Did Conventional Needle EMG Show?', exact: true })).toBeVisible();
  for (const [label, count] of [['Myopathic', 6], ['Neuropathic', 1], ['Normal', 1], ['Indeterminate', 3]] as const) {
    await chooseByKeyboard(chart, label, 'Enter');
    await expect(chart.getByTestId('needle-detail')).toContainText(`${count}/11`);
  }
  await expect(chart).toContainText('27/38');
  await expect(chart).toContainText('54.5%');
  await expect(chart).toContainText('23.4–83.3%');
  await chart.getByRole('button', { name: 'Myopathic', exact: true }).click();
  await expect(chart.getByTestId('needle-detail')).toContainText(/does not independently confirm inflammatory myositis/i);
  await expect(chart.getByTestId('needle-detail')).toContainText(/exclude concurrent NMJ dysfunction/i);
  await expect(chart).not.toContainText(/incidence of myositis|causes myositis/i);
});

test('selected evidence states remain accessible and scientific limitations are explicit', async ({ page }) => {
  const explorer = page.locator('#evidence');
  await explorer.getByTestId('evidence-availability').getByRole('button', { name: 'Formal NMJ-specific testing', exact: true }).click();
  await explorer.getByTestId('serology-physiology').getByRole('button', { name: 'AChR not documented', exact: true }).click();
  await explorer.getByTestId('nmj-evidence-gap').getByRole('button', { name: 'Qualitative indeterminate', exact: true }).click();
  await explorer.getByTestId('needle-emg-distribution').getByRole('button', { name: 'Indeterminate', exact: true }).click();
  await expect(explorer).toContainText('What Can We Conclude?');
  await expect(explorer).toContainText(/heterogeneous testing.*publication bias.*source-provenance adjudication/i);
  await expect(explorer).toContainText(/Siu\/Gómez/);
  const outcomes = explorer.locator('details.ee-outcomes');
  await expect(outcomes).toHaveJSProperty('open', false);
  await outcomes.locator('summary').click();
  await expect(outcomes).toHaveJSProperty('open', true);
  for (const [label, count] of [['Death documented', 16], ['Survival documented', 21], ['Unknown', 1]] as const) {
    const outcome = outcomes.locator('dl > div').filter({ has: page.getByText(label, { exact: true }) });
    await expect(outcome.locator('dd')).toBeVisible();
    await expect(outcome.locator('dd')).toHaveText(String(count));
  }
  const mortality = outcomes.getByText(/Documented mortality:/);
  await expect(mortality).toBeVisible();
  await expect(mortality).toContainText('16/38');
  await expect(mortality).toContainText('26.3–59.2%');
  await expect(outcomes.getByText(/not.*population-level fatality risk/i)).toBeVisible();
  await expect(explorer).toContainText(/troponin.*unvalidated/i);
  await expect(explorer).not.toContainText(/1,506|1,028|3,891|162,000|2,484,000|p\s*[=<>]\s*0\./);
  await expect(explorer.locator('[data-patient-label], [data-patient-id], a[download]')).toHaveCount(0);
  const accessibility = await new AxeBuilder({ page }).include('#evidence')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(accessibility.violations).toEqual([]);
});

test('aggregate charts fit narrow layouts and produce desktop/mobile visual review artifacts', async ({ page }, testInfo) => {
  const explorer = page.locator('#evidence');
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth),
      `Aggregate charts must fit ${width}px`).toBeLessThanOrEqual(1);
    for (const testId of ['evidence-availability', 'serology-physiology', 'nmj-evidence-gap', 'needle-emg-distribution']) {
      const chart = explorer.getByTestId(testId);
      await expect(chart).toBeVisible();
      expect(await chart.evaluate((element) => element.scrollWidth - element.clientWidth), `${testId} must fit ${width}px`)
        .toBeLessThanOrEqual(1);
    }
    if (width === 320 || width === 1440) {
      const availability = explorer.getByTestId('evidence-availability');
      for (const [label, evaluated, missing] of [
        ['AChR serology', 30, 8], ['Formal NMJ-specific testing', 4, 34], ['Conventional needle EMG', 11, 27],
      ] as const) {
        await checkRenderedFractions(availability.getByRole('button', { name: label, exact: true }).locator('svg'),
          [evaluated, missing], 38);
      }
      await checkRenderedFractions(explorer.getByTestId('nmj-evidence-gap').getByRole('img', {
        name: /Objective NMJ evidence categories in the working cohort/,
      }), [4, 2, 32], 38);
      await checkRenderedFractions(explorer.getByTestId('needle-emg-distribution').getByRole('img', {
        name: /Conventional needle EMG interpretations among evaluated patients/,
      }), [6, 1, 1, 3], 11);
      const serology = explorer.getByTestId('serology-physiology');
      for (const [label, formal, missing, denominator] of [
        ['AChR positive', 0, 11, 11], ['AChR negative', 4, 15, 19],
      ] as const) {
        await serology.getByRole('button', { name: label, exact: true }).click();
        await checkRenderedFractions(serology.getByTestId('serology-detail').getByRole('img'), [formal, missing], denominator);
      }
    }
  }
  await explorer.getByTestId('serology-physiology').getByRole('button', { name: 'AChR positive', exact: true }).click();
  await page.setViewportSize({ width: testInfo.project.name === 'mobile' ? 390 : 1440, height: 1000 });
  await testInfo.attach(`Scientific Evidence Explorer — ${testInfo.project.name}`, {
    body: await explorer.screenshot({ path: testInfo.outputPath(`scientific-evidence-explorer-${testInfo.project.name}.png`), style: '.site-header, .skip-link { visibility: hidden; }' }),
    contentType: 'image/png',
  });
  await testInfo.attach(`Serology and physiology — ${testInfo.project.name}`, {
    body: await explorer.getByTestId('serology-physiology').screenshot({ path: testInfo.outputPath(`serology-physiology-${testInfo.project.name}.png`), style: '.site-header, .skip-link { visibility: hidden; }' }),
    contentType: 'image/png',
  });
});
