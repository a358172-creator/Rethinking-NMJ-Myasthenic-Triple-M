import { useState } from 'react';
import { aggregateEvidence as evidence, formatRatio, formatPercent, formatExactInterval } from '../../data/aggregateEvidence';
import type { NeedleEvidenceId } from '../../data/aggregateEvidence';
import { AggregateBar } from './AggregateBar';
import type { EvidenceTone } from './AggregateBar';

const tones: Record<NeedleEvidenceId, EvidenceTone> = { myopathic: 'burgundy', neuropathic: 'navy', normal: 'teal', indeterminate: 'amber' };

export function NeedleEmgDistribution() {
  const [selected, setSelected] = useState<NeedleEvidenceId>('myopathic');
  const category = evidence.needleCategories.find((item) => item.id === selected)!;
  const summary = evidence.needleEmg.summary;
  return <section className="ee-section" id="needle-emg-evidence" data-testid="needle-emg-distribution" aria-labelledby="needle-emg-title">
    <div className="ee-chart-heading"><span className="eyebrow">04 / MUSCLE PHYSIOLOGY</span><h3 id="needle-emg-title">What Did Conventional Needle EMG Show?</h3><p>Reported interpretations among {evidence.needleEmg.evaluated} evaluated patients. Select a finding to inspect its meaning.</p></div>
    <AggregateBar denominator={evidence.needleEmg.evaluated} label="Conventional needle EMG interpretations among evaluated patients" segments={evidence.needleCategories.map((item) => ({ count: item.count, label: item.label, tone: tones[item.id] }))} />
    <div className="ee-category-controls ee-category-controls--four" role="group" aria-label="Needle EMG interpretation">
      {evidence.needleCategories.map((item) => <button key={item.id} aria-label={item.label} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}><span className={`ee-swatch ee-fill-${tones[item.id]}`} aria-hidden="true" /><strong>{item.count}</strong><span>{item.label}</span></button>)}
    </div>
    <div className="ee-detail ee-inline-detail" data-testid="needle-detail" aria-live="polite" aria-atomic="true"><h4>{category.label} · {formatRatio(category.count, evidence.needleEmg.evaluated)}</h4><p>{category.interpretation}</p></div>
    <div className="ee-outside-distribution"><span className="ee-swatch ee-fill-missing" aria-hidden="true" /><p><strong>{formatRatio(evidence.needleEmg.notDocumented, evidence.study.patients)} without documented needle EMG</strong><span>These additional reports are outside the evaluated distribution; they are not normal findings.</span></p></div>
    <p className="ee-scientific-note">Myopathic among evaluated: <strong>{formatRatio(summary.numerator, summary.denominator)} ({formatPercent(summary.numerator, summary.denominator)})</strong>; exact 95% CI {formatExactInterval(summary)}. This describes a selected published-case subset, not population prevalence.</p>
  </section>;
}
