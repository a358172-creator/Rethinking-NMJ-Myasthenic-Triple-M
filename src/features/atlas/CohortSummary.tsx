import { atlasCopy } from '../../data/atlasCopy';
import { evidencePercentage, evidenceRatio } from '../../data/atlasModel';
import type { EvidenceSummary } from '../../data/atlasModel';
import { frozenStudy } from '../../data/science';

interface CohortSummaryProps {
  summary: EvidenceSummary;
}

export function CohortSummary({ summary }: CohortSummaryProps) {
  const metrics = [
    { label: 'Published patients', value: String(frozenStudy.cohort.n), detail: 'Full analytical cohort' },
    { label: 'Source publications', value: String(frozenStudy.cohort.sources), detail: 'Patient-level duplicate adjudication' },
    { label: 'AChR-positive', value: frozenStudy.achr.result, detail: `${frozenStudy.achr.percentage} among evaluated patients` },
    { label: 'Formal NMJ evaluation', value: frozenStudy.formalNmj.evaluated, detail: 'Documented RNS and/or SFEMG' },
    { label: 'Objective NMJ abnormality', value: frozenStudy.formalNmj.abnormal, detail: `Exact 95% CI ${frozenStudy.formalNmj.ci}` },
    { label: 'Myopathic needle EMG', value: frozenStudy.needleEmg.result, detail: `${frozenStudy.needleEmg.percentage} among evaluated patients` },
    { label: 'Documented mortality', value: frozenStudy.mortality.result, detail: `${frozenStudy.mortality.percentage} of the full cohort` },
  ];
  return (
    <section className="atlas-cohort" aria-labelledby="atlas-cohort-title">
      <div className="atlas-panel-heading"><div><span className="eyebrow">FROZEN FULL-COHORT FINDINGS</span><h3 id="atlas-cohort-title">Cohort overview</h3></div></div>
      <dl className="atlas-cohort-metrics">{metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd className="atlas-metric-value">{metric.value}</dd><dd className="atlas-metric-detail">{metric.detail}</dd></div>)}</dl>
      <div className="atlas-cohort-footnotes">
        <p>{atlasCopy.denominator}</p>
        <p>Mortality among patients with known vital status: <strong>{evidenceRatio(summary.mortality.deaths, summary.mortality.known)} ({evidencePercentage(summary.mortality.deaths, summary.mortality.known)})</strong>. Unknown vital status remains in the full-cohort denominator.</p>
        <p>{atlasCopy.phenotype}</p>
      </div>
    </section>
  );
}

interface FilteredEvidenceSummaryProps {
  summary: EvidenceSummary;
  fullCount: number;
}

export function FilteredEvidenceSummary({ summary, fullCount }: FilteredEvidenceSummaryProps) {
  const metrics = [
    { label: 'AChR-positive / serology documented', value: evidenceRatio(summary.achr.positive, summary.achr.tested), detail: `${summary.achr.notDocumented} not documented` },
    { label: 'Formal NMJ evaluation / cases shown', value: evidenceRatio(summary.formalNmj.documented, summary.total), detail: `${summary.formalNmj.notDocumented} not documented` },
    { label: 'Formal test negative / formally evaluated', value: evidenceRatio(summary.nmjEvidence.formalNegative, summary.formalNmj.documented), detail: `${summary.nmjEvidence.qualitative} qualitative indeterminate; ${summary.nmjEvidence.notDocumented} without documented objective NMJ evidence` },
    { label: 'Myopathic / needle EMG evaluated', value: evidenceRatio(summary.needleEmg.myopathic, summary.needleEmg.tested), detail: `${summary.needleEmg.notDocumented} not documented` },
    { label: 'Deaths / cases shown', value: evidenceRatio(summary.mortality.deaths, summary.total), detail: `${summary.mortality.unknown} unknown vital status` },
    { label: 'Deaths / known vital status', value: evidenceRatio(summary.mortality.deaths, summary.mortality.known), detail: `${summary.mortality.known} cases with known vital status` },
  ];
  return (
    <section className="atlas-subset" aria-labelledby="atlas-subset-title">
      <div className="atlas-subset-heading">
        <h3 id="atlas-subset-title">Visible subset</h3>
        <p className="atlas-case-count" role="status" aria-live="polite" aria-atomic="true">{summary.total} of {fullCount} cases shown</p>
      </div>
      <dl className="atlas-subset-metrics">{metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd className="atlas-subset-value">{metric.value}</dd><dd className="atlas-metric-detail">{metric.detail}</dd></div>)}</dl>
      <p className="atlas-note">These counts describe the cases currently shown. A zero evaluated denominator is not evaluable; filtered groups have no assigned statistical significance.</p>
    </section>
  );
}
