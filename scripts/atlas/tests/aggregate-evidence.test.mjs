import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  aggregateEvidence as evidence,
  formatExactInterval,
  formatPercent,
  formatRatio,
} from '../../../src/data/aggregateEvidence.ts';

const root = new URL('../../../', import.meta.url);
const coreAudit = JSON.parse(readFileSync(new URL('docs/CORE_ATLAS_VALIDATION_STATUS.json', root), 'utf8'));
const numericalAudit = readFileSync(new URL('DATA_VALIDATION_REPORT.md', root), 'utf8');

function verifiedCoreValue(name) {
  const check = coreAudit.checks.find((entry) => entry.name === name);
  assert.ok(check, `Missing independently executed aggregate check: ${name}`);
  assert.equal(check.passed, true, `Aggregate support did not pass: ${name}`);
  return check.observed;
}

function verifiedNumericalValue(name) {
  const row = numericalAudit.split('\n').find((line) => line.startsWith(`| ${name} |`));
  assert.ok(row, `Missing numerical audit result: ${name}`);
  const cells = row.split('|').map((cell) => cell.trim());
  assert.equal(cells[5], 'PASS', `Numerical support did not pass: ${name}`);
  return JSON.parse(cells[4]);
}

test('public aggregate counts match the executed categorical audit', () => {
  assert.equal(evidence.study.patients, verifiedCoreValue('Actual normalized patient records'));
  assert.equal(evidence.study.publications, verifiedCoreValue('Unique canonical source publications'));
  assert.equal(evidence.study.phenotypeCount, verifiedNumericalValue('MG-like phenotype inclusion characteristic'));
  assert.deepEqual([evidence.achr.tested, evidence.achr.positive, evidence.achr.negative, evidence.achr.notDocumented],
    verifiedCoreValue('AChR tested / positive / negative / not documented'));
  assert.equal(evidence.formalNmj.tested, verifiedCoreValue('Unique RNS and/or SFEMG patients'));
  assert.equal(evidence.formalNmj.rnsTested, verifiedCoreValue('RNS evaluated patients'));
  assert.equal(evidence.formalNmj.sfemgTested, verifiedCoreValue('SFEMG evaluated patients'));
  assert.equal(evidence.formalNmj.sfemgNested, verifiedCoreValue('SFEMG is nested in the RNS cohort'));
  assert.deepEqual([evidence.formalNmj.abnormal, evidence.formalNmj.tested],
    verifiedCoreValue('Abnormal formal NMJ patients / evaluated patients'));
  assert.deepEqual({
    formal_negative: evidence.nmjEvidence.formalNegative,
    indeterminate_qualitative: evidence.nmjEvidence.indeterminateQualitative,
    not_documented: evidence.nmjEvidence.notDocumented,
  }, verifiedCoreValue('Objective NMJ evidence categories'));
  assert.deepEqual([evidence.needleEmg.evaluated, evidence.needleEmg.notDocumented],
    verifiedCoreValue('Needle EMG evaluated / not documented'));
  assert.deepEqual(Object.fromEntries(evidence.needleCategories.map(({ id, count }) => [id, count])),
    verifiedCoreValue('Needle EMG categories among evaluated'));
  assert.deepEqual({ death: evidence.mortality.death, survival: evidence.mortality.survival, unknown: evidence.mortality.unknown },
    verifiedCoreValue('Documented vital status categories'));
});

test('AChR/formal-NMJ cells match the audited cross-tab and reconcile both margins', () => {
  const documentedRows = [
    ['Positive', 'positive', 0, 11, 11],
    ['Negative', 'negative', 4, 15, 19],
    ['Not documented', 'notDocumented', 0, 8, 8],
  ];
  for (const [label, id, formal, missing, total] of documentedRows) {
    assert.ok(numericalAudit.includes(`| ${label} | ${formal} | ${missing} | ${total} |`));
    const row = evidence.achrFormalNmj.find((candidate) => candidate.id === id);
    assert.ok(row);
    assert.deepEqual([row.formalDocumented, row.formalNotDocumented, row.total], [formal, missing, total]);
    assert.equal(row.formalDocumented + row.formalNotDocumented, row.total);
  }
  assert.equal(evidence.achrFormalNmj.reduce((sum, row) => sum + row.total, 0), evidence.study.patients);
  assert.equal(evidence.achrFormalNmj.reduce((sum, row) => sum + row.formalDocumented, 0), evidence.formalNmj.tested);
  assert.equal(evidence.achrFormalNmj.reduce((sum, row) => sum + row.formalNotDocumented, 0), evidence.formalNmj.notDocumented);
});

test('missingness stays separate from explicit negatives and the evaluated distributions', () => {
  for (const domain of evidence.availability) {
    assert.equal(domain.evaluated + domain.notDocumented, evidence.study.patients);
    assert.equal(domain.denominator, evidence.study.patients);
  }
  assert.equal(evidence.achr.negative, 19);
  assert.equal(evidence.achr.notDocumented, 8);
  assert.equal(evidence.formalNmj.notDocumented, 34);
  assert.equal(evidence.nmjEvidence.notDocumented, 32);
  assert.equal(evidence.nmjEvidence.indeterminateQualitative + evidence.nmjEvidence.notDocumented,
    evidence.formalNmj.notDocumented);
  assert.equal(evidence.nmjCategories.reduce((sum, category) => sum + category.count, 0), evidence.study.patients);
  assert.equal(evidence.needleCategories.reduce((sum, category) => sum + category.count, 0), evidence.needleEmg.evaluated);
  assert.equal(evidence.mortality.death + evidence.mortality.survival + evidence.mortality.unknown, evidence.study.patients);
  assert.equal(evidence.mortality.summary.denominator, 38);
  assert.equal(evidence.mortality.unknown, 1);
});

test('exact intervals and observed percentages agree with the executed numerical audit', () => {
  for (const [summary, ciName, percentageName] of [
    [evidence.achr.summary, 'AChR exact 95% CI (%)', 'AChR positivity (%)'],
    [evidence.formalNmj.summary, 'Objective NMJ exact 95% CI (%)', null],
    [evidence.needleEmg.summary, 'Needle EMG exact 95% CI (%) (audit)', 'Myopathic needle EMG (%)'],
    [evidence.mortality.summary, 'Mortality all exact 95% CI (%) (audit)', 'Mortality all patients (%)'],
  ]) {
    assert.deepEqual(summary.ci95, verifiedNumericalValue(ciName));
    assert.equal(summary.method, 'Clopper–Pearson');
    if (percentageName) assert.equal(Number(formatPercent(summary.numerator, summary.denominator).replace('%', '')),
      verifiedNumericalValue(percentageName));
  }
  assert.equal(formatRatio(evidence.formalNmj.summary.numerator, evidence.formalNmj.summary.denominator), '0/4');
  assert.equal(formatExactInterval(evidence.formalNmj.summary), '0–60.2%');
  assert.equal(formatExactInterval(evidence.achr.summary), '19.9–56.1%');
});

test('provisional aggregate presentation does not certify unresolved scientific gates', () => {
  assert.equal(coreAudit.statuses.FULL_STUDY_VALIDATION, 'FAIL');
  assert.equal(coreAudit.statuses.CORE_ATLAS_VALIDATION, 'FAIL');
  assert.equal(coreAudit.statuses.CORE_ATLAS_NUMERICAL_VALIDATION, 'PASS');
  assert.match(evidence.provisionalLabel, /provisional.*literature-derived.*pooled findings/i);
  assert.match(evidence.provisionalNote, /pending final source-provenance reconciliation/i);
  assert.match(evidence.limitations.provenance, /Siu\/Gómez/);
  assert.match(evidence.limitations.biochemical, /troponin.*unvalidated/i);
  assert.match(evidence.limitations.mortality, /not a population-level fatality risk/i);
  assert.match(evidence.limitations.missingness, /not a negative result/i);
});

test('aggregate schema contains no patient collection, provenance fields or biochemical summary', () => {
  const forbidden = new Set(['patientId', 'patient_id', 'sourceId', 'source_id', 'sourceRow', 'sourceDoi', 'sourceSha256',
    'records', 'crosswalk', 'troponin', 'birthDate', 'age', 'sex', 'treatment']);
  function inspect(value) {
    if (Array.isArray(value)) {
      assert.notEqual(value.length, evidence.study.patients, 'A cohort-length collection is outside the aggregate schema');
      value.forEach(inspect);
    } else if (value && typeof value === 'object') {
      for (const [key, child] of Object.entries(value)) {
        assert.equal(forbidden.has(key), false, `Private or out-of-scope field: ${key}`);
        inspect(child);
      }
    }
  }
  inspect(evidence);
  assert.equal(typeof evidence.study.patients, 'number');
  const moduleSource = readFileSync(new URL('src/data/aggregateEvidence.ts', root), 'utf8');
  assert.doesNotMatch(moduleSource, /from\s+['"][^'"]*(?:esearch_sources|research_sources|data_review|\.xlsx?)/);
  assert.doesNotMatch(JSON.stringify(evidence), /1,506|1,028|3,891|162,000|2,484,000/);
});
