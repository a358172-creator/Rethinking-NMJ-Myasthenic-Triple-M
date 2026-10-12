import { references } from '../../data/science';
import { Arrow } from '../../components/ui/Arrow';

export function ScientificReferences() {
  return <section className="references-section container section-space" id="references" aria-labelledby="references-title">
    <div className="section-heading inline-heading"><div><span className="eyebrow">04 / SOURCE NOTES</span><h2 id="references-title">Scientific References</h2></div><p>Original publications supporting the explorer.<br />Study aggregates follow the frozen manuscript and audit.</p></div>
    <ol className="reference-list">{references.map((reference, i) => <li key={reference.id} id={`ref-${reference.id}`}>
      <span className="reference-number">{String(i + 1).padStart(2, '0')}</span>
      <div><span className="reference-authors">{reference.authors}</span><p className="reference-title">{reference.title}</p><p className="reference-journal">{reference.publication}{reference.doi && <> · DOI: <a href={`https://doi.org/${reference.doi}`} target="_blank" rel="noreferrer" aria-label={`DOI ${reference.doi} (opens in a new tab)`}>{reference.doi}</a></>}</p>{reference.status === 'review' && <span className="review-label">Source supplied · bibliographic review pending</span>}</div>
      {reference.url && <a className="reference-link" href={reference.url} target="_blank" rel="noreferrer" aria-label={`Read ${reference.authors} (opens in a new tab)`}><span>Read source</span><Arrow diagonal /></a>}
    </li>)}</ol>
    <p className="reference-footnote">The illustrations are original conceptual diagrams. Tissue injury, synaptic impairment and cross-tissue mechanisms are not inferred for individual patients from aggregate data.</p>
  </section>;
}
