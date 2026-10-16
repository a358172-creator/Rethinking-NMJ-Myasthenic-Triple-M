import { useState } from 'react';
import { phenotypeRegions } from '../../data/laboratory';
import type { PhenotypeRegionId } from '../../data/laboratory';
import { laboratoryUi } from '../../data/laboratoryUi';
import { PhenotypeFigure } from './PhenotypeFigure';
import { ScientificResultPanel } from './ScientificResultPanel';
import { SkeletalMuscleTissue } from '../anatomy/components/SkeletalMuscleTissue';
import { NeuromuscularJunction } from '../anatomy/components/NeuromuscularJunction';
import { MedicalArtwork } from '../../components/figures/MedicalArtwork';
import '../anatomy/styles/anatomy.css';

export function ClinicalPhenotypeExplorer() {
  const [selected, setSelected] = useState<PhenotypeRegionId>('ocular');
  const region = phenotypeRegions.find((item) => item.id === selected)!;
  return (
    <section className="lab-view" aria-labelledby="phenotype-title">
      <div className="lab-view-heading"><h3 id="phenotype-title">{laboratoryUi.phenotype.title}</h3><p>{laboratoryUi.phenotype.summary}</p></div>
      <div className="laboratory-split phenotype-split">
        <figure className="phenotype-illustration"><PhenotypeFigure selected={selected} onSelect={setSelected} /><figcaption>Muscle atlas with anterior, posterior and right lateral views. Highlighting identifies the selected anatomical compartment; clinical distribution alone does not establish its mechanism. Not to scale.</figcaption></figure>
        <ScientificResultPanel title={region.label} eyebrow="CLINICAL DISTRIBUTION" items={[
          { label: 'Clinical manifestations', text: region.manifestations.join(' · ') },
          { label: 'Possible muscle mechanism', text: region.muscleMechanism },
          { label: 'Possible NMJ mechanism', text: region.nmjMechanism },
          { label: 'What distribution cannot establish', text: region.boundary },
        ]} evidence={region.evidence} />
      </div>
      <details className="phenotype-tissue-detail">
        <summary>Explore muscle tissue behind the clinical distribution</summary>
        <div className="phenotype-tissue-content">
          <p><strong>{region.label}:</strong> {region.muscleMechanism} The tissue example below illustrates a possible injury process. It does not show the anatomy of a specific muscle or measured involvement of this region in the N=38 cohort.</p>
          <figure><SkeletalMuscleTissue state="injury" compact /><figcaption>Conceptual muscle injury, not diagnostic histology. Selected published pathology supports a muscle-level contribution; a myopathic needle-EMG pattern alone does not prove inflammatory myositis. Clinical distribution cannot distinguish muscle injury from NMJ dysfunction.</figcaption></figure>
        </div>
      </details>
      <div className="phenotype-context-insets">
        <details className="phenotype-companion-detail">
          <summary>Cardiac context for a multisystem presentation</summary>
          <div className="phenotype-companion-body">
            <MedicalArtwork illustration="heart-normal" />
            <p>The heart is a separate anatomical context, rather than an additional muscle-distribution category. Breathlessness may reflect cardiac or pulmonary disease as well as respiratory-muscle weakness. This illustration does not assign the cause of a symptom or show a patient-specific lesion.</p>
          </div>
        </details>
        <details className="phenotype-companion-detail">
          <summary>Inspect the neuromuscular interface</summary>
          <div className="phenotype-companion-body">
            <NeuromuscularJunction state="normal" showSignal={false} showLabels={false} />
            <p>The nerve terminal, synaptic cleft and folded motor endplate provide the anatomical reference. Clinical distribution alone cannot determine whether transmission is impaired, muscle tissue is injured, or both mechanisms coexist. A normal-anatomy illustration is not a normal physiological test result.</p>
          </div>
        </details>
      </div>
    </section>
  );
}
