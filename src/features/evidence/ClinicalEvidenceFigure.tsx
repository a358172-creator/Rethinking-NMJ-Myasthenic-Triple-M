import { useId } from 'react';
import { ScientificFigure } from '../../components/figures/ScientificFigure';
import { frozenStudy, sharedManifestations } from '../../data/science';
import './ClinicalEvidenceFigure.css';

const cohortSize = frozenStudy.cohort.n;

// Aggregate counts only. Clinical frequencies already appear in the public
// scientific copy; categorical totals are documented in the Phase 3A.2 report.
const clinicalFrequencies = [
  { label: 'MG-like phenotype', count: cohortSize, tone: 'cyan' },
  { label: 'Conduction abnormalities or arrhythmias', count: 20, tone: 'rose' },
] as const;

const nmjCategories = [
  { category: 'A', label: 'Formal test positive', detail: 'Objective transmission abnormality.', count: frozenStudy.nmjEvidence.formalPositive, tone: 'emerald' },
  { category: 'B', label: 'Formal test negative', detail: 'No objective abnormality in the documented formal studies.', count: frozenStudy.nmjEvidence.formalNegative, tone: 'cyan' },
  { category: 'C', label: 'Indeterminate qualitative evidence', detail: 'Qualitative evidence without formal confirmation.', count: frozenStudy.nmjEvidence.indeterminateQualitative, tone: 'amber' },
  { category: 'D', label: 'Not documented', detail: 'No objective NMJ evidence documented.', count: frozenStudy.nmjEvidence.notDocumented, tone: 'muted' },
] as const;

const needlePatterns = [
  { label: 'Myopathic', count: frozenStudy.needleEmg.myopathic, tone: 'emerald' },
  { label: 'Neuropathic', count: frozenStudy.needleEmg.neuropathic, tone: 'cyan' },
  { label: 'Normal', count: frozenStudy.needleEmg.normal, tone: 'muted' },
  { label: 'Indeterminate', count: frozenStudy.needleEmg.indeterminate, tone: 'amber' },
] as const;

function percentage(count: number, denominator: number) {
  return `${(100 * count / denominator).toFixed(1)}%`;
}

export function ClinicalEvidenceFigure() {
  const panelId = useId();

  return <ScientificFigure
    number="02"
    title="Clinical phenotype and the NMJ evidence gap"
    subtitle={`Frozen aggregate findings from the N=${cohortSize} analysis. Read each evaluated denominator separately.`}
    caption={<><strong>Figure 2.</strong> Clinical presentation, formal neuromuscular-junction (NMJ) evidence and conventional needle EMG address different questions. Categorical totals have been reproduced, but patient-to-source attribution and category disagreements remain unresolved. Numerical agreement does not validate the sources or the full biochemical analysis.</>}
  >
    <div className="clinical-evidence-figure">
      <div className="sfn-panel-grid sfn-panel-grid--three">
        <section className="sfn-panel clinical-evidence-panel" aria-labelledby={`${panelId}-clinical`}>
          <span className="sfn-panel-kicker">01 / CLINICAL PRESENTATION</span>
          <h4 className="sfn-panel-heading" id={`${panelId}-clinical`}>Phenotype and cardiac findings</h4>
          <p className="sfn-panel-note">Clinical findings describe the presentation; they do not identify the mechanism of weakness.</p>

          <ul className="clinical-frequency-list">
            {clinicalFrequencies.map(({ label, count, tone }) => <li key={label}>
              <div className="clinical-frequency-heading"><span>{label}</span><strong>{count}/{cohortSize}<small>{percentage(count, cohortSize)}</small></strong></div>
              <div className="clinical-frequency-track" aria-hidden="true"><span className={`clinical-tone-${tone}`} style={{ width: percentage(count, cohortSize) }} /></div>
            </li>)}
          </ul>
          <p className="sfn-panel-note clinical-inclusion-note">The MG-like phenotype is a cohort inclusion characteristic, not a population prevalence estimate.</p>

          <div className="clinical-manifestations">
            <h5>Shared clinical manifestations</h5>
            <ul>{sharedManifestations.map((manifestation) => <li key={manifestation}>{manifestation}</li>)}</ul>
            <p className="sfn-panel-note">Ocular, bulbar and respiratory weakness can reflect muscle involvement, impaired transmission, or both.</p>
          </div>
          <div className="clinical-pairing-note">
            <h5>Serology needs paired physiology</h5>
            <p className="sfn-panel-note">AChR-positive: <strong>{frozenStudy.achr.result}</strong> tested. None of these {frozenStudy.pairedAchrNmj.achrPositive} patients had formal RNS/SFEMG documented. This is missing paired evidence, not normal transmission.</p>
          </div>
        </section>

        <section className="sfn-panel clinical-evidence-panel clinical-nmj-panel" aria-labelledby={`${panelId}-nmj`}>
          <span className="sfn-panel-kicker">02 / FORMAL NMJ PHYSIOLOGY</span>
          <h4 className="sfn-panel-heading" id={`${panelId}-nmj`}>Transmission evidence</h4>
          <div className="sfn-metric clinical-highlight-metric">
            <strong className="sfn-metric-value">{frozenStudy.formalNmj.abnormal}</strong>
            <span className="sfn-metric-label">Objective NMJ abnormality among formally evaluated patients</span>
            <span className="clinical-metric-detail">Exact 95% CI: {frozenStudy.formalNmj.ci}</span>
          </div>
          <p className="sfn-panel-note">Formal RNS and/or SFEMG: <strong>{frozenStudy.formalNmj.evaluated}</strong>. The single SFEMG patient is included within those four.</p>

          <h5 className="clinical-category-denominator">NMJ evidence categories · all {cohortSize} records</h5>
          <dl className="clinical-category-list">
            {nmjCategories.map(({ category, label, detail, count, tone }) => <div className="clinical-category-row" key={category}>
              <dt><span className={`clinical-category-letter clinical-tone-${tone}`}>{category}</span><span><strong>{label}</strong><small>{detail}</small></span></dt>
              <dd>{count}<small>{percentage(count, cohortSize)}</small></dd>
            </div>)}
          </dl>
          <p className="sfn-note clinical-boundary-note">Missing testing is not a negative result. The small tested subset cannot exclude NMJ disease in the wider cohort.</p>
        </section>

        <section className="sfn-panel clinical-evidence-panel" aria-labelledby={`${panelId}-muscle`}>
          <span className="sfn-panel-kicker">03 / MUSCLE AND BIOMARKERS</span>
          <h4 className="sfn-panel-heading" id={`${panelId}-muscle`}>Needle EMG and serum markers</h4>
          <div className="sfn-metric clinical-needle-metric">
            <strong className="sfn-metric-value">{frozenStudy.needleEmg.result}</strong>
            <span className="sfn-metric-label">Myopathic pattern among {frozenStudy.needleEmg.tested} evaluated</span>
            <span className="clinical-metric-detail">{frozenStudy.needleEmg.percentage} · Exact 95% CI: {frozenStudy.needleEmg.ci}</span>
          </div>
          <dl className="clinical-needle-patterns">
            {needlePatterns.map(({ label, count, tone }) => <div key={label}>
              <dt><span className={`clinical-pattern-dot clinical-tone-${tone}`} aria-hidden="true" />{label}</dt>
              <dd>{count}/{frozenStudy.needleEmg.tested}<small>{percentage(count, frozenStudy.needleEmg.tested)}</small></dd>
            </div>)}
          </dl>
          <p className="sfn-panel-note">Needle EMG was not documented in <strong>{frozenStudy.needleEmg.notDocumented}/{cohortSize}</strong>. A myopathic pattern supports muscle involvement; it does not independently prove inflammatory myositis.</p>

          <div className="clinical-biomarker-review">
            <span className="clinical-review-status">Under scientific review</span>
            <h5>Cardiac troponin</h5>
            <p>Pooled concentrations are not displayed. Analyte, assay, units and measurement timing require reconciliation.</p>
          </div>
          <p className="sfn-note clinical-boundary-note">CK addresses muscle injury. Cardiac troponin requires clinical and assay-specific interpretation; an elevation alone does not confirm ICI myocarditis.</p>
        </section>
      </div>
    </div>
  </ScientificFigure>;
}
