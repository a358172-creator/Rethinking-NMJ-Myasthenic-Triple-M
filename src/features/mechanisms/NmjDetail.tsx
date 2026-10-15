import { NeuromuscularJunction } from '../anatomy/components/NeuromuscularJunction';

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
    {serology && <div className="nmj-assay-note"><div><strong>Antibody detection is a separate evidence domain</strong><p>The normal endplate is an anatomical reference, independent of the selected serological target or qualitative teaching example. No patient-specific antibody mechanism is depicted.</p></div></div>}
    <figcaption>Conceptual editorial artwork · not microscopy or an experimental recording. Numbered markers identify the four anatomical compartments. Relative molecular and tissue scales are illustrative.</figcaption>
  </figure>;
}
