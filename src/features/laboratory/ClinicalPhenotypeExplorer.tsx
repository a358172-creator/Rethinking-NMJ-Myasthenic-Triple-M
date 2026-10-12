import { useState } from 'react';
import { phenotypeRegions } from '../../data/laboratory';
import type { PhenotypeRegionId } from '../../data/laboratory';
import { laboratoryUi } from '../../data/laboratoryUi';
import { PhenotypeFigure } from './PhenotypeFigure';
import { ScientificResultPanel } from './ScientificResultPanel';

export function ClinicalPhenotypeExplorer() {
  const [selected, setSelected] = useState<PhenotypeRegionId>('ocular');
  const region = phenotypeRegions.find((item) => item.id === selected)!;
  return (
    <section className="lab-view" aria-labelledby="phenotype-title">
      <div className="lab-view-heading"><h3 id="phenotype-title">{laboratoryUi.phenotype.title}</h3><p>{laboratoryUi.phenotype.summary}</p></div>
      <div className="region-controls lab-option-controls" role="group" aria-label="Clinical muscle regions">
        {phenotypeRegions.map((item) => <button key={item.id} type="button" aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>{item.label}</button>)}
      </div>
      <div className="laboratory-split phenotype-split">
        <figure className="phenotype-illustration"><PhenotypeFigure selected={selected} onSelect={setSelected} /><figcaption>Conceptual anatomical distribution · not a patient portrait · not to scale.</figcaption></figure>
        <ScientificResultPanel title={region.label} eyebrow="CLINICAL DISTRIBUTION" items={[
          { label: 'Clinical manifestations', text: region.manifestations.join(' · ') },
          { label: 'Possible muscle mechanism', text: region.muscleMechanism },
          { label: 'Possible NMJ mechanism', text: region.nmjMechanism },
          { label: 'What distribution cannot establish', text: region.boundary },
        ]} evidence={region.evidence} />
      </div>
    </section>
  );
}
