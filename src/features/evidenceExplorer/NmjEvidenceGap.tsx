import { useState } from 'react';
import { aggregateEvidence as evidence, formatRatio, formatExactInterval } from '../../data/aggregateEvidence';
import type { NmjEvidenceId } from '../../data/aggregateEvidence';
import { AggregateBar } from './AggregateBar';
import type { EvidenceTone } from './AggregateBar';

const tones: Record<NmjEvidenceId, EvidenceTone> = { formalNegative: 'teal', indeterminateQualitative: 'amber', notDocumented: 'missing' };

export function NmjEvidenceGap() {
  const [selected, setSelected] = useState<NmjEvidenceId>('notDocumented');
  const category = evidence.nmjCategories.find((item) => item.id === selected)!;
  const summary = evidence.formalNmj.summary;
  return <section className="ee-section" id="nmj-evidence-gap" data-testid="nmj-evidence-gap" aria-labelledby="nmj-evidence-title">
    <div className="ee-chart-heading"><span className="eyebrow">03 / DOCUMENTATION AND UNCERTAINTY</span><h3 id="nmj-evidence-title">The Physiological Evidence Gap</h3><p>These categories describe the published evidence, rather than three underlying biological disease types.</p></div>
    <AggregateBar denominator={evidence.study.patients} label="Objective NMJ evidence categories in the working cohort" segments={evidence.nmjCategories.map((item) => ({ count: item.count, label: item.label, tone: tones[item.id] }))} />
    <div className="ee-category-controls ee-category-controls--three" role="group" aria-label="Objective NMJ evidence category">
      {evidence.nmjCategories.map((item) => <button key={item.id} aria-label={item.label} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}><span className={`ee-swatch ee-fill-${tones[item.id]}`} aria-hidden="true" /><strong>{item.count}</strong><span>{item.label}</span></button>)}
    </div>
    <div className="ee-detail ee-inline-detail" data-testid="nmj-detail" aria-live="polite" aria-atomic="true"><h4>{category.label} · {formatRatio(category.count, evidence.study.patients)}</h4><p>{category.interpretation}</p></div>
    <p className="ee-scientific-note">Formal testing availability is a separate classification: {formatRatio(evidence.formalNmj.tested, evidence.study.patients)} documented, {formatRatio(evidence.formalNmj.notDocumented, evidence.study.patients)} not documented. The {evidence.nmjEvidence.indeterminateQualitative} qualitative-indeterminate records belong among those {evidence.formalNmj.notDocumented} without formal NMJ testing.</p>
    <div className="ee-uncertainty">
      <div><span className="ee-large-ratio">{formatRatio(summary.numerator, summary.denominator)}</span><h4>Abnormal formal findings</h4><p>Exact 95% CI {formatExactInterval(summary)}</p></div>
      <div><svg className="ee-interval" viewBox="0 0 600 90" role="img" aria-label={`Exact Clopper–Pearson 95% confidence interval: ${formatExactInterval(summary)} among ${summary.denominator} formally evaluated patients`}>
        <line x1="12" x2="588" y1="36" y2="36" stroke="var(--line)" strokeWidth="2" />
        <rect x="12" y="23" width={(summary.ci95[1] - summary.ci95[0]) / 100 * 576} height="26" fill="var(--teal-light)" />
        <line x1="12" x2={12 + summary.ci95[1] / 100 * 576} y1="36" y2="36" stroke="var(--teal-text)" strokeWidth="2" />
        <circle cx="12" cy="36" r="5" fill="var(--navy)" /><line x1={12 + summary.ci95[1] / 100 * 576} x2={12 + summary.ci95[1] / 100 * 576} y1="27" y2="45" stroke="var(--teal-text)" strokeWidth="2" />
        <text x="12" y="73" fontSize="15" fill="var(--muted)">0%</text><text x={12 + summary.ci95[1] / 100 * 576} y="16" textAnchor="middle" fontSize="15" fill="var(--teal-text)">{summary.ci95[1]}%</text><text x="588" y="73" textAnchor="end" fontSize="15" fill="var(--muted)">100%</text>
      </svg><p>Zero observed abnormalities, substantial uncertainty.</p><p>{evidence.limitations.uncertainty}</p><p className="ee-chart-footnote">Clopper–Pearson interval for the small evaluated subset; it cannot estimate the frequency of NMJ disease in the wider cohort.</p></div>
    </div>
  </section>;
}
