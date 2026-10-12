import { EvidencePanel } from '../evidence/EvidencePanel';
import type { EvidenceItem } from '../../data/science';

interface Props {
  title: string;
  eyebrow: string;
  summary?: string;
  items: { label: string; text: string }[];
  evidence: EvidenceItem[];
}

export function ScientificResultPanel({ title, eyebrow, summary, items, evidence }: Props) {
  return (
    <section className="lab-result-panel" aria-label="Laboratory scientific interpretation" aria-live="polite">
      <span className="eyebrow">{eyebrow}</span>
      <h4 className="lab-panel-title">{title}</h4>
      {summary && <p className="lab-panel-summary">{summary}</p>}
      <dl className="lab-domain-descriptions">
        {items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.text}</dd></div>)}
      </dl>
      <EvidencePanel items={evidence} />
    </section>
  );
}
