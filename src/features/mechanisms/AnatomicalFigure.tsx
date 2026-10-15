import { useId } from 'react';
import { MedicalArtwork } from '../../components/figures/MedicalArtwork';
import type { MedicalArtworkId } from '../../data/medicalArtwork';
import './editorial-anatomy.css';

type Structure = 'heart' | 'muscle' | 'nmj';
interface Props { selected: Structure; onSelect: (id: Structure) => void; compact?: boolean }

const tissues: { id: Structure; number: string; label: string; detail: string; artwork: MedicalArtworkId; action: string }[] = [
  { id: 'heart', number: '01', label: 'Heart / myocardium', detail: 'Coronary anatomy and myocardial tissue', artwork: 'heart-normal', action: 'Explore heart and myocardium' },
  { id: 'muscle', number: '02', label: 'Skeletal muscle', detail: 'Muscle fiber, myofibrils and sarcomeres', artwork: 'muscle-normal', action: 'Explore skeletal muscle' },
  { id: 'nmj', number: '03', label: 'Neuromuscular junction', detail: 'Motor nerve terminal, cleft and folded endplate', artwork: 'nmj-normal', action: 'Explore the neuromuscular junction' },
];

/** A coordinated editorial tissue collection with accessible selection controls. */
export function AnatomicalFigure({ selected, onSelect, compact = false }: Props) {
  const id = useId();
  return <div className={`anatomical-figure editorial-anatomy${compact ? ' anatomical-figure--compact' : ''}`} role="group" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
    <p className="editorial-anatomy-context" id={`${id}-title`}>Three tissues. Distinct mechanisms.</p>
    <p className="visually-hidden" id={`${id}-description`}>Select a normal anatomical model to explore its physiology, possible injury and supporting evidence. Tissue involvement after immune checkpoint blockade may overlap; these illustrations do not demonstrate a shared antigen or cohort-specific lesion.</p>
    <div className="editorial-anatomy-grid">
      {tissues.map((tissue) => <button key={tissue.id} type="button"
        className={`anatomy-hit-target editorial-tissue-card editorial-tissue-card--${tissue.id}${selected === tissue.id ? ' is-selected' : ''}`}
        aria-label={tissue.action} aria-pressed={selected === tissue.id} onClick={() => onSelect(tissue.id)}>
        <span className="editorial-tissue-art anatomy-region"><MedicalArtwork illustration={tissue.artwork} eager={compact} /></span>
        <span className="editorial-tissue-label"><span className="editorial-tissue-number" aria-hidden="true">{tissue.number}</span><span><strong>{tissue.label}</strong><small>{tissue.detail}</small></span><span className="editorial-tissue-arrow" aria-hidden="true">↗</span></span>
      </button>)}
    </div>
    <p className="editorial-anatomy-footnote">Conceptual anatomy · normal architecture · not to scale</p>
  </div>;
}
