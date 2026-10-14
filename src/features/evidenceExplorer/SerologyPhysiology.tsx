import { useState } from 'react';
import { aggregateEvidence as evidence, formatRatio } from '../../data/aggregateEvidence';
import type { AchrAggregateStatus } from '../../data/aggregateEvidence';
import { AggregateBar, EvidenceLegend } from './AggregateBar';

export function SerologyPhysiology() {
  const [selected, setSelected] = useState<AchrAggregateStatus>('positive');
  const row = evidence.achrFormalNmj.find((item) => item.id === selected)!;
  return <section className="ee-section" id="serology-physiology" data-testid="serology-physiology" aria-labelledby="serology-physiology-title">
    <div className="ee-chart-heading"><span className="eyebrow">02 / SEROLOGY AND TRANSMISSION</span><h3 id="serology-physiology-title">Antibody Positivity Is Not Physiological Confirmation</h3><p>Antibodies and transmission studies answer different questions. Select a serological group to inspect the paired evidence.</p></div>
    <div className="ee-choice-controls" role="group" aria-label="AChR status">
      {evidence.achrFormalNmj.map((item) => <button key={item.id} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>{item.label}</button>)}
    </div>
    <div className="ee-serology-layout" data-testid="serology-detail" aria-live="polite" aria-atomic="true">
      <div className="ee-serology-observation"><span className="ee-large-ratio">{formatRatio(row.formalDocumented, row.total)}</span><h4>Formal NMJ test documented</h4><p>Within the {row.label} group</p></div>
      <div className="ee-serology-evidence"><p className="ee-count-line"><strong>{formatRatio(row.formalNotDocumented, row.total)}</strong> without documented formal NMJ testing</p>
        <AggregateBar denominator={row.total} label={`Formal NMJ testing within ${row.label}`} segments={[{ count: row.formalDocumented, label: 'Formal test documented', tone: 'teal' }, { count: row.formalNotDocumented, label: 'Formal test not documented', tone: 'missing' }]} />
        <EvidenceLegend items={[{ label: 'Formal test documented', tone: 'teal' }, { label: 'Not documented', tone: 'missing' }]} />
        <p>{row.interpretation}</p>
      </div>
    </div>
    <p className="ee-key-message">None of the {evidence.achr.positive} AChR-positive patients had documented RNS/SFEMG testing.</p>
    <p className="ee-scientific-note">Positive AChR antibodies can support a clinical diagnosis; antibody detection is not itself a direct measurement of NMJ transmission. The absence of documented RNS/SFEMG is not a negative test.</p>
    <table className="ee-crosstab"><caption>AChR status × documented formal NMJ testing — aggregate counts</caption><thead><tr><th scope="col">AChR status</th><th scope="col">Formal test<br />documented</th><th scope="col">Formal test<br />not documented</th></tr></thead><tbody>{evidence.achrFormalNmj.map((item) => <tr key={item.id} className={selected === item.id ? 'is-selected' : undefined}><th scope="row">{item.label}</th><td>{item.formalDocumented}</td><td>{item.formalNotDocumented}</td></tr>)}</tbody></table>
    <p className="ee-chart-footnote">This is a descriptive cross-tabulation. It does not establish an association, independence or causality.</p>
  </section>;
}
