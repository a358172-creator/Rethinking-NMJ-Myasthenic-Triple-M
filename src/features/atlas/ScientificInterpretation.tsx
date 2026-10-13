import { atlasCopy, atlasInterpretations } from '../../data/atlasCopy';
import { evidenceRatio } from '../../data/atlasModel';
import type { EvidenceSummary, InterpretationDomain } from '../../data/atlasModel';

interface ScientificInterpretationProps {
  selected: InterpretationDomain;
  summary: EvidenceSummary;
  fullSummary: EvidenceSummary;
  onSelect: (domain: InterpretationDomain) => void;
}

function subsetDescription(domain: InterpretationDomain, summary: EvidenceSummary): string {
  switch (domain) {
    case 'achr':
      return `Visible subset: ${evidenceRatio(summary.achr.positive, summary.achr.tested)} positive among patients with documented serology; ${summary.achr.notDocumented} have no documented result.`;
    case 'formalNmj':
      return `Visible subset: ${evidenceRatio(summary.formalNmj.documented, summary.total)} with formal testing documented; ${summary.formalNmj.notDocumented} without documented formal testing.`;
    case 'nmjEvidence':
      return `Visible subset: ${summary.nmjEvidence.formalNegative} formal test negative; ${summary.nmjEvidence.qualitative} qualitative indeterminate; ${summary.nmjEvidence.notDocumented} without documented objective NMJ evidence.`;
    case 'needleEmg':
      return `Visible subset: ${evidenceRatio(summary.needleEmg.myopathic, summary.needleEmg.tested)} myopathic among needle-EMG-evaluated patients; ${summary.needleEmg.notDocumented} without documented evaluation.`;
    case 'mortality':
      return `Visible subset: ${evidenceRatio(summary.mortality.deaths, summary.total)} deaths among all cases shown; ${evidenceRatio(summary.mortality.deaths, summary.mortality.known)} among cases with known vital status. ${summary.mortality.unknown} have unknown vital status.`;
  }
}

export function ScientificInterpretation({ selected, summary, fullSummary, onSelect }: ScientificInterpretationProps) {
  return (
    <section className="atlas-interpretation" aria-labelledby="atlas-interpretation-title">
      <div className="atlas-panel-heading"><div><span className="eyebrow">INTERPRET FINDINGS WITH THEIR LIMITS</span><h3 id="atlas-interpretation-title">Scientific interpretation</h3></div></div>
      <div className="atlas-interpretation-controls" role="group" aria-label="Interpretation domain">{(Object.keys(atlasInterpretations) as InterpretationDomain[]).map((domain) => <button className="atlas-button" type="button" aria-pressed={selected === domain} aria-controls="atlas-interpretation-panel" onClick={() => onSelect(domain)} key={domain}>{atlasInterpretations[domain].label}</button>)}</div>
      <div className="atlas-interpretation-content" id="atlas-interpretation-panel">
        <h4>{atlasInterpretations[selected].label}</h4>
        <p>{atlasInterpretations[selected].text}</p>
        <p className="atlas-interpretation-subset">{subsetDescription(selected, summary)}</p>
      </div>
      <div className="atlas-paired-evidence">
        <span className="eyebrow">ACHR SEROLOGY × FORMAL NMJ TESTING / FULL COHORT</span>
        <p className="atlas-paired-value">{evidenceRatio(fullSummary.achrPositiveWithFormalNmj, fullSummary.achr.positive)} <span>AChR-positive patients with documented formal testing</span></p>
        {fullSummary.achrPositiveWithFormalNmj === 0 && <p><strong>{atlasCopy.pairedFinding}</strong></p>}
        <p>{atlasCopy.pairedInterpretation}</p>
      </div>
      <p className="atlas-note">{atlasCopy.scientificBoundary}</p>
    </section>
  );
}
