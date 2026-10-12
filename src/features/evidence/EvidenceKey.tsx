import { evidenceLevels } from '../../data/science';
import type { EvidenceKind } from '../../data/science';

export function EvidenceKey() {
  return <details className="evidence-key">
    <summary><span className="key-symbol" aria-hidden="true">◈</span> How to read Mechanistic Evidence<span className="details-plus" aria-hidden="true">+</span></summary>
    <div className="evidence-key-content">
      <p>Different kinds of evidence answer different questions. These categories describe provenance, not a numerical confidence score.</p>
      <dl>{(Object.keys(evidenceLevels) as EvidenceKind[]).map((kind) => <div key={kind}><dt><span className={`evidence-badge evidence-${kind}`}>{evidenceLevels[kind].label}</span></dt><dd>{evidenceLevels[kind].description}</dd></div>)}</dl>
    </div>
  </details>;
}
