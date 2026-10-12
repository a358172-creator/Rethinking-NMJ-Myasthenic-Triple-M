import { sourceLimitations } from '../../data/science';
import { EvidenceKey } from './EvidenceKey';

export function ResearchOverview() {
  return <section className="research-section container section-space" id="study" aria-labelledby="study-title">
    <div className="section-heading"><span className="eyebrow">02 / THE RESEARCH</span><h2 id="study-title">Clinical labels.<br /><em>Physiological questions.</em></h2></div>
    <div className="research-body">
      <p className="study-manuscript-title">Rethinking the “Myasthenic” Component of Immune Checkpoint Inhibitor-Associated Triple M Syndrome: An Individual Patient-Level Pooled Analysis.</p>
      <p>This retrospective analysis brings together <strong>38 published patients from 27 sources</strong>. It separates an MG-like clinical phenotype from serological support and demonstrated neuromuscular-junction transmission dysfunction.</p>
      <p>The MG-like phenotype was recorded in <strong>38/38</strong>. Formal repetitive nerve stimulation (RNS) and/or single-fiber EMG (SFEMG) was documented in <strong>4/38</strong>. SFEMG was performed in one patient within those four, not an additional fifth patient.</p>
      <div className="study-callout"><span className="eyebrow">A CRITICAL EVIDENCE GAP</span><p>None of the <strong>11 AChR-positive patients</strong> had formal RNS/SFEMG documented. Their NMJ physiology remains unconfirmed; they did not have documented negative formal testing.</p></div>
      <details className="study-limitations"><summary>Methods and limitations<span aria-hidden="true">+</span></summary><div>
        <p>Cases were identified by targeted literature searching and citation review. This is a literature-derived individual patient-level pooled analysis, not a prospective cohort or a formal systematic review with a prespecified database-search protocol.</p>
        <p>Publication and ascertainment bias, heterogeneous testing, missing data, treatment timing and variable follow-up limit interpretation. Untested patients remain untested. The small formal NMJ subset prevents a reliable estimate of the frequency of NMJ disease.</p>
        <p>Documented mortality is <strong>16/38 (42.1%)</strong>, measured over follow-up reported by the source publications; it is not an incidence or a standardized risk prediction.</p>
      </div></details>
      <EvidenceKey />
      <details className="study-limitations"><summary>Source availability and review<span aria-hidden="true">+</span></summary><ul>{sourceLimitations.map((item) => <li key={item}>{item}</li>)}</ul></details>
    </div>
  </section>;
}
