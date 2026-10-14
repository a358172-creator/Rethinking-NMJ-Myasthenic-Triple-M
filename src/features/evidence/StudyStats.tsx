import { studyStats, frozenStudy } from '../../data/science';
import { aggregateEvidence } from '../../data/aggregateEvidence';

export function StudyStats() {
  return <section className="study-glance container" id="study-at-a-glance" aria-labelledby="glance-title">
    <div className="glance-heading"><h2 id="glance-title">The study at a glance</h2><span>PROVISIONAL POOLED FINDINGS</span></div>
    <dl className="stats-grid stats-grid--primary">{studyStats.filter((stat) => stat.id !== 'mortality').map((stat) => <div className="stat" key={stat.id} data-testid={`stat-${stat.id}`}><dt>{stat.label}</dt><dd className="stat-value">{stat.value}</dd><dd className="stat-detail">{stat.detail}</dd></div>)}</dl>
    <dl className="secondary-outcome">{studyStats.filter((stat) => stat.id === 'mortality').map((stat) => <div className="stat" key={stat.id} data-testid={`stat-${stat.id}`}><dt>{stat.label}</dt><dd className="stat-value">{stat.value}</dd><dd className="stat-detail">{stat.detail}</dd></div>)}</dl>
    <p className="denominator-note"><strong>Read the denominators.</strong> The evaluated subsets differ; these proportions are not direct comparisons. No objective NMJ abnormality among four evaluated patients does not exclude true NMJ pathology (exact 95% CI, {frozenStudy.formalNmj.ci}).</p>
    <p className="denominator-note">{aggregateEvidence.provisionalNote}</p>
  </section>;
}
