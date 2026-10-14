import { useState } from 'react';
import { aggregateEvidence as evidence, formatRatio, formatPercent, formatExactInterval } from '../../data/aggregateEvidence';
import type { EvidenceDomainId } from '../../data/aggregateEvidence';
import { AggregateBar, EvidenceLegend } from './AggregateBar';

export function EvidenceAvailability() {
  const [selected, setSelected] = useState<EvidenceDomainId>('formalNmj');
  const domain = evidence.availability.find((item) => item.id === selected)!;
  const summary = selected === 'achr' ? evidence.achr.summary : selected === 'formalNmj' ? evidence.formalNmj.summary : evidence.needleEmg.summary;
  return <section className="ee-section ee-availability" id="evidence-availability" data-testid="evidence-availability" aria-labelledby="availability-title">
    <div className="ee-chart-heading"><span className="eyebrow">01 / THE AVAILABILITY OF EVIDENCE</span><h3 id="availability-title">How Much of the Neuromuscular Phenotype Was Actually Tested?</h3><p>Three diagnostic domains. The same working-cohort denominator. Select a bar to examine what was measured.</p></div>
    <div className="ee-feature-grid">
      <div>
        <div className="ee-availability-controls" role="group" aria-label="Diagnostic evidence availability">
          {evidence.availability.map((item) => <button key={item.id} className="ee-domain-control" aria-label={item.label} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>
            <span className="ee-domain-topline"><strong>{item.label}</strong><span>{formatRatio(item.evaluated, item.denominator)} <small>evaluated</small></span></span>
            <AggregateBar denominator={item.denominator} label={`${item.label}: evaluation availability`} segments={[{ count: item.evaluated, label: 'Evaluated', tone: 'teal' }, { count: item.notDocumented, label: 'No documented evaluation', tone: 'missing' }]} />
            <span className="ee-domain-bottomline"><span>{item.measures}</span><span aria-hidden="true">↗</span></span>
          </button>)}
        </div>
        <EvidenceLegend items={[{ label: 'Evaluated', tone: 'teal' }, { label: 'No documented evaluation', tone: 'missing' }]} />
        <p className="ee-chart-footnote">All bars use N={evidence.study.patients}. These testing rates are not diagnostic sensitivity or specificity.</p>
      </div>
      <div className="ee-detail ee-availability-detail" data-testid="availability-detail" aria-live="polite" aria-atomic="true">
        <span className="eyebrow">WHAT THIS DOMAIN MEASURES</span><h4>{domain.label}</h4><p>{domain.measures}</p>
        <dl className="ee-paired-counts"><div><dt>Evaluated</dt><dd>{formatRatio(domain.evaluated, domain.denominator)}</dd></div><div><dt>No documented evaluation</dt><dd>{formatRatio(domain.notDocumented, domain.denominator)}</dd></div></dl>
        <p>{domain.interpretation}</p>
        <p className="ee-result-note"><strong>{selected === 'achr' ? 'AChR-positive' : selected === 'formalNmj' ? 'Abnormal formal findings' : 'Myopathic among evaluated'}: {formatRatio(summary.numerator, summary.denominator)} ({formatPercent(summary.numerator, summary.denominator)})</strong><span>Exact 95% CI {formatExactInterval(summary)}</span></p>
        {selected === 'formalNmj' && <p>SFEMG in {evidence.formalNmj.sfemgTested} patient belongs within the {evidence.formalNmj.tested} formally tested patients.</p>}
      </div>
    </div>
    <p className="ee-key-message">Clinical reporting was much more extensive than direct physiological evaluation of the neuromuscular junction.</p>
  </section>;
}
