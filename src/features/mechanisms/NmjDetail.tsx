import { NeuromuscularJunction } from '../anatomy/components/NeuromuscularJunction';
import { nmjCompartments } from '../anatomy/data/nmjModel';

interface NmjDetailProps {
  impaired: boolean;
  context?: 'transmission' | 'serology';
}

/** Static shared anatomy, with serological detection kept outside the endplate. */
export function NmjDetail({ impaired, context = 'transmission' }: NmjDetailProps) {
  const serology = context === 'serology';
  return <figure className={`nmj-detail${serology ? ' nmj-detail--serology' : ''}`}>
    <p className="nmj-detail-tier">{serology ? 'Established physiology · postsynaptic anatomy' : impaired ? 'Conceptual state · possible impairment' : 'Established physiology · normal transmission'}</p>
    <NeuromuscularJunction state={serology || !impaired ? 'normal' : 'transmission-impaired'} showSignal={!serology} showLabels={false} title={serology ? 'Postsynaptic NMJ anatomy and the separate domain of antibody detection' : undefined} />
    <ol className="nmj-detail-legend" aria-label="NMJ anatomical compartments">
      {Object.values(nmjCompartments).map(compartment => <li key={compartment.number}><span aria-hidden="true">{compartment.number}</span>{compartment.label}</li>)}
    </ol>
    {serology && <div className="nmj-assay-note">
      <svg viewBox="0 0 80 64" role="img" aria-label="Separate generic antibody-binding schematic">
        <circle cx="28" cy="35" r="16" fill="var(--teal-light)" stroke="var(--teal)" strokeWidth="1.5" />
        <path d="M41 40 L51 30 M51 30 V17 M51 30 H64" fill="none" stroke="var(--burgundy)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <div><strong>Antibody detection is a separate evidence domain</strong><p>Binding schematic · does not demonstrate transmission failure. No patient-specific antibody mechanism is depicted.</p></div>
    </div>}
    <figcaption>Original anatomical model · not to scale. ACh: acetylcholine; AChE: acetylcholinesterase. Numbered compartments identify the terminal, extracellular cleft, receptor-bearing endplate and muscle membrane.</figcaption>
  </figure>;
}
