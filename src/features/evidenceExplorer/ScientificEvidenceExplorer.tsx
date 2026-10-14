import { aggregateEvidence as evidence, formatRatio, formatPercent, formatExactInterval } from '../../data/aggregateEvidence';
import { EvidenceAvailability } from './EvidenceAvailability';
import { SerologyPhysiology } from './SerologyPhysiology';
import { NmjEvidenceGap } from './NmjEvidenceGap';
import { NeedleEmgDistribution } from './NeedleEmgDistribution';
import './evidence-explorer.css';

/** Public aggregate explorer. No record loader, private data import or endpoint. */
export function ScientificEvidenceExplorer() {
  const outcomes = evidence.mortality;
  return <section className="scientific-evidence-section section-space" id="evidence" aria-labelledby="evidence-title">
    <div className="container">
      <div className="ee-module-heading"><div className="section-heading"><span className="eyebrow">MODULE 03 / THE PUBLISHED EVIDENCE</span><h2 id="evidence-title">Scientific<br /><em>Evidence Explorer</em></h2><p className="ee-subtitle">{evidence.subtitle}</p></div>
        <div className="ee-study-context"><dl><div><dt>Working cohort</dt><dd>{evidence.study.patients}<span>reported patients</span></dd></div><div><dt>Source publications</dt><dd>{evidence.study.publications}<span>pending adjudication</span></dd></div></dl><p>{evidence.study.phenotypeInterpretation}</p></div>
      </div>
      <p className="ee-provisional"><strong>{evidence.provisionalLabel}.</strong> {evidence.provisionalNote}</p>
      <nav className="ee-section-navigation" aria-label="Evidence explorer charts"><a href="#evidence-availability">Testing coverage <span aria-hidden="true">↓</span></a><a href="#serology-physiology">Serology & physiology <span aria-hidden="true">↓</span></a><a href="#nmj-evidence-gap">The evidence gap <span aria-hidden="true">↓</span></a><a href="#needle-emg-evidence">Needle EMG <span aria-hidden="true">↓</span></a></nav>
      <EvidenceAvailability /><SerologyPhysiology /><NmjEvidenceGap /><NeedleEmgDistribution />
      <section className="ee-synthesis" aria-labelledby="evidence-synthesis-title"><span className="eyebrow">READING THE EVIDENCE TOGETHER</span><h3 id="evidence-synthesis-title">What Can We Conclude?</h3><ol>{evidence.interpretation.map((statement) => <li key={statement}>{statement}</li>)}</ol><p className="ee-limitation-note">{evidence.limitations.synthesis}</p>
        <div className="ee-method-notes"><p>{evidence.limitations.provenance}</p><p>{evidence.limitations.biochemical}</p></div>
        <details className="ee-outcomes"><summary>Secondary clinical context: reported outcomes <span aria-hidden="true">+</span></summary><div><dl><div><dt>Death documented</dt><dd>{outcomes.death}</dd></div><div><dt>Survival documented</dt><dd>{outcomes.survival}</dd></div><div><dt>Unknown</dt><dd>{outcomes.unknown}</dd></div></dl><p>Documented mortality: {formatRatio(outcomes.summary.numerator, outcomes.summary.denominator)} ({formatPercent(outcomes.summary.numerator, outcomes.summary.denominator)}); exact 95% CI {formatExactInterval(outcomes.summary)}.</p><p>{evidence.limitations.mortality}</p></div></details>
        <p className="ee-citations">Counts derive from the frozen working-cohort audits. Supporting diagnostic context: <a href="#ref-guidon-2021">Consensus definitions ↗</a><a href="#ref-stalberg-2019">EMG standards ↗</a><a href="#ref-plomp-2025">Muscle/NMJ overlap literature ↗</a>. These publications are context, not the source of the displayed pooled counts.</p>
      </section>
    </div>
  </section>;
}
