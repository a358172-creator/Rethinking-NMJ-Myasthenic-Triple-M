import { useState } from 'react';
import { serologyPanels } from '../../data/laboratory';
import type { SerologyId } from '../../data/laboratory';
import { frozenStudy } from '../../data/science';
import { laboratoryUi } from '../../data/laboratoryUi';
import { NmjDetail } from '../mechanisms/NmjDetail';
import { ScientificResultPanel } from './ScientificResultPanel';

const options: { id: SerologyId; label: string }[] = [
  { id: 'achr', label: 'AChR antibodies' },
  { id: 'musk', label: 'MuSK antibodies' },
  { id: 'context', label: 'Pretreatment & correlation' },
];

export function SerologicalEvidenceExplorer() {
  const [selected, setSelected] = useState<SerologyId>('achr');
  const panel = serologyPanels[selected];
  return (
    <section className="lab-view" aria-labelledby="serology-title">
      <div className="lab-view-heading"><h3 id="serology-title">{laboratoryUi.serology.title}</h3><p>{laboratoryUi.serology.summary}</p></div>
      <div className="lab-option-controls" role="group" aria-label="Serological evidence views">
        {options.map((option) => <button key={option.id} type="button" aria-pressed={selected === option.id} onClick={() => setSelected(option.id)}>{option.label}</button>)}
      </div>
      <div className="laboratory-split serology-split">
        <div className="serology-visual">
          <NmjDetail impaired={false} context="serology" />
          <div className="serology-domains"><span>Antibody detection</span><span aria-hidden="true">≠</span><span>Demonstrated transmission failure</span></div>
          <div className="lab-cohort-callout"><span className="eyebrow">PRESENT ANALYSIS · SEROLOGY</span><p className="lab-cohort-value">{frozenStudy.achr.result}<small>({frozenStudy.achr.percentage})</small></p><p>AChR-positive among those evaluated.</p><p className="lab-paired-gap">None of the {frozenStudy.pairedAchrNmj.achrPositive} AChR-positive patients had documented formal RNS or SFEMG. This is missing paired physiological evidence, not normal formal testing.</p></div>
        </div>
        <ScientificResultPanel title={panel.title} eyebrow="BIOLOGICAL EVIDENCE" summary={panel.summary} items={[
          { label: 'What detection measures', text: panel.measures },
          { label: 'What it cannot establish alone', text: panel.limits },
          { label: 'Pretreatment status & correlation', text: panel.pretreatment },
        ]} evidence={panel.evidence} />
      </div>
    </section>
  );
}
