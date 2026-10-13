import { atlasCopy } from '../../data/atlasCopy';
import { evidenceRatio } from '../../data/atlasModel';
import type { EvidenceSummary } from '../../data/atlasModel';

interface MissingnessExplorerProps {
  summary: EvidenceSummary;
  visibleSummary: EvidenceSummary;
  showMissing: boolean;
  onToggle: () => void;
}

export function MissingnessExplorer({ summary, visibleSummary, showMissing, onToggle }: MissingnessExplorerProps) {
  const segments = [
    { className: 'atlas-segment-tested', count: summary.formalNmj.documented },
    { className: 'atlas-segment-qualitative', count: summary.nmjEvidence.qualitative },
    { className: 'atlas-segment-missing', count: summary.nmjEvidence.notDocumented },
  ];
  const denominators = [
    { label: 'AChR serology documented', value: evidenceRatio(summary.achr.tested, summary.total) },
    { label: 'Formal NMJ testing documented', value: evidenceRatio(summary.formalNmj.documented, summary.total) },
    { label: 'Needle EMG evaluated', value: evidenceRatio(summary.needleEmg.tested, summary.total) },
    { label: 'Vital status known', value: evidenceRatio(summary.mortality.known, summary.total) },
  ];
  return (
    <section className="atlas-missingness" aria-labelledby="atlas-missingness-title">
      <div className="atlas-panel-heading">
        <div><span className="eyebrow">FULL-COHORT DOCUMENTATION MAP</span><h3 id="atlas-missingness-title">Missing evidence explorer</h3></div>
        <button className="atlas-button atlas-missing-toggle" type="button" aria-pressed={showMissing} aria-controls="atlas-matrix" onClick={onToggle}>Show Missing Evidence<span aria-hidden="true">{showMissing ? '✓' : '+'}</span></button>
      </div>
      <p className="atlas-missing-message">{atlasCopy.missingMessage}</p>
      <div className="atlas-documentation-bar" aria-hidden="true">{segments.map((segment) => <span key={segment.className} className={segment.className} style={{ width: `${summary.total ? 100 * segment.count / summary.total : 0}%` }} />)}</div>
      <dl className="atlas-documentation-categories">
        <div><dt><span aria-hidden="true">✓</span> Formal test negative</dt><dd>{evidenceRatio(summary.nmjEvidence.formalNegative, summary.total)} <span>formally evaluated</span></dd></div>
        <div><dt><span aria-hidden="true">?</span> Indeterminate qualitative evidence</dt><dd>{evidenceRatio(summary.nmjEvidence.qualitative, summary.total)} <span>without formal confirmation</span></dd></div>
        <div><dt><span aria-hidden="true">—</span> No objective NMJ evidence documented</dt><dd>{evidenceRatio(summary.nmjEvidence.notDocumented, summary.total)} <span>without a documented objective result</span></dd></div>
      </dl>
      <p className="atlas-missing-explanation"><strong>{evidenceRatio(summary.formalNmj.notDocumented, summary.total)} lack documented formal NMJ testing.</strong> {atlasCopy.missingExplanation}</p>
      {showMissing && <p className="atlas-highlight-description" role="status">In the visible subset, {visibleSummary.formalNmj.notDocumented} cases with missing formal studies are highlighted in amber; {visibleSummary.formalNmj.documented} formally evaluated cases are marked in teal. Every row also carries a written label.</p>}
      <dl className="atlas-domain-denominators">{denominators.map((domain) => <div key={domain.label}><dt>{domain.label}</dt><dd>{domain.value}</dd></div>)}</dl>
      <p className="atlas-note">{atlasCopy.formalLimitation}</p>
    </section>
  );
}
