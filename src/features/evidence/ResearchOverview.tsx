import { sourceLimitations, frozenStudy } from '../../data/science';
import { EvidenceKey } from './EvidenceKey';

export function ResearchOverview() {
  return <section className="research-section container section-space" id="study" aria-labelledby="study-title">
    <div className="section-heading"><span className="eyebrow">THE RESEARCH QUESTION</span><h2 id="study-title">Clinical labels.<br /><em>Physiological questions.</em></h2></div>
    <div className="research-body">
      <p className="study-manuscript-title">Rethinking the “Myasthenic” Component of Immune Checkpoint Inhibitor-Associated Triple M Syndrome: An Individual Patient-Level Pooled Analysis.</p>
      <p>The working literature-derived analysis includes <strong>{frozenStudy.cohort.n} reported patients and {frozenStudy.cohort.sources} source publications</strong>, pending final source-provenance reconciliation. It separates the clinical MG-like inclusion phenotype from serological support and demonstrated neuromuscular-junction transmission dysfunction.</p>
      <p>Muscle injury and primary NMJ dysfunction may coexist. Testing and reporting vary across publications; a clinical label cannot resolve the mechanism of weakness.</p>
      <p><a href="#evidence">Explore the aggregate evidence and its uncertainty ↗</a></p>
      <details className="study-limitations"><summary>Methods and limitations<span aria-hidden="true">+</span></summary><div>
        <p>Cases were identified by targeted literature searching and citation review. This is a literature-derived individual patient-level pooled analysis, not a prospective cohort or a formal systematic review with a prespecified database-search protocol.</p>
        <p>Publication and ascertainment bias, heterogeneous testing, missing data, treatment timing and variable follow-up limit interpretation. Untested patients remain untested. The small formal NMJ subset prevents a reliable estimate of the frequency of NMJ disease.</p>
        <p>Documented mortality is <strong>{frozenStudy.mortality.result} ({frozenStudy.mortality.percentage})</strong>, measured over follow-up reported by the source publications; it is not an incidence or a standardized risk prediction.</p>
      </div></details>
      <EvidenceKey />
      <details className="study-limitations"><summary>Scientific scope and source limitations<span aria-hidden="true">+</span></summary><ul>{sourceLimitations.map((item) => <li key={item}>{item}</li>)}</ul></details>
    </div>
  </section>;
}
