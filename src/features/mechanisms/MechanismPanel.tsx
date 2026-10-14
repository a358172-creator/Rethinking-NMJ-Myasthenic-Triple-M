import { mechanisms } from '../../data/science';
import type { StructureId } from '../../data/science';
import { EvidencePanel } from '../evidence/EvidencePanel';

interface Props { selected: StructureId }

export function MechanismPanel({ selected }: Props) {
  const content = mechanisms[selected];
  return <section className={`mechanism-panel panel-${selected}`} id="mechanism-panel" aria-label="Scientific interpretation">
    <div className="panel-heading"><span className="eyebrow">{content.eyebrow}</span><span className={`tissue-indicator tissue-${selected}`} aria-hidden="true" /></div>
    <h3>{content.title}</h3>
    <p className="panel-summary">{content.summary}</p>
    <EvidencePanel items={content.evidence} />
    <div className="evaluation-concepts"><h4>Evaluation concepts</h4><ul>{content.evaluation.map((item) => <li key={item}>{item}</li>)}</ul><span>Complementary domains, interpreted with clinical and specialist assessment.</span></div>
    <p className="scientific-caution"><strong>Interpretive boundary</strong>{content.caution}</p>
  </section>;
}
