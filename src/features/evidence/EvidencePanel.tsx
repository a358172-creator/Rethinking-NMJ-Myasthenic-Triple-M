import { evidenceLevels, references } from '../../data/science';
import type { EvidenceItem } from '../../data/science';

export function EvidencePanel({ items }: { items: EvidenceItem[] }) {
  return <section className="mechanistic-evidence" aria-label="Mechanistic Evidence">
    <h4>Mechanistic Evidence</h4>
    <div className="evidence-list">{items.map((item) => <div className={`evidence-row evidence-row-${item.kind}`} key={item.kind}>
      <span className={`evidence-badge evidence-${item.kind}`}>{evidenceLevels[item.kind].label}</span>
      <p>{item.text}</p>
      {item.referenceIds && <div className="evidence-citations">{item.referenceIds.map((id) => {
        const ref = references.find((reference) => reference.id === id);
        return ref ? <a href={`#ref-${id}`} key={id}>{ref.authors}</a> : null;
      })}</div>}
    </div>)}</div>
  </section>;
}
