import { useId, type KeyboardEvent } from 'react';
import { MedicalArtwork } from '../../components/figures/MedicalArtwork';
import './editorial-phenotype.css';

export type PhenotypeRegion = 'ocular' | 'bulbar' | 'cervical' | 'proximal' | 'respiratory';

interface PhenotypeFigureProps {
  selected: PhenotypeRegion;
  onSelect: (id: PhenotypeRegion) => void;
}

const regions: { id: PhenotypeRegion; number: string; label: string; anatomy: string; note: string }[] = [
  { id: 'ocular', number: '01', label: 'Ocular', anatomy: 'Extraocular muscles and eyelid', note: 'The extraocular muscles and eyelid levator lie deeper than the surface structures in this view.' },
  { id: 'bulbar', number: '02', label: 'Bulbar', anatomy: 'Tongue and pharyngeal musculature', note: 'The marker locates the region; the tongue and pharyngeal muscles lie deeper than the facial muscles displayed.' },
  { id: 'cervical', number: '03', label: 'Cervical', anatomy: 'Neck musculature', note: 'Anterior neck muscles are visible. Posterior cervical extensors are outside this anterior view.' },
  { id: 'proximal', number: '04', label: 'Proximal', anatomy: 'Shoulder, upper arm, hip and thigh', note: 'Deltoids and thigh muscles locate proximal regions; the pelvic musculature is not exposed.' },
  { id: 'respiratory', number: '05', label: 'Respiratory', anatomy: 'Intercostal muscles and diaphragm', note: 'The thoracic cutaway locates intercostal spaces and the diaphragm; it does not show a physiological test result.' },
];

// Coordinates were checked against the complete 1,024 × 1,536 clinical illustration.
const geometry: Record<PhenotypeRegion, { highlight: string; connector: string; dot: [number, number]; box: [number, number, number]; title: string; subtitle: string }> = {
  ocular: { highlight: 'M444 95 a31 21 0 1 0 62 0 a31 21 0 1 0 -62 0 M505 95 a31 21 0 1 0 62 0 a31 21 0 1 0 -62 0', connector: 'M448 96 H394 L365 91 H337', dot: [448, 96], box: [24, 42, 313], title: 'Ocular / eyelid', subtitle: 'Deep muscles not exposed' },
  bulbar: { highlight: 'M454 150 Q504 133 558 150 L550 185 Q506 210 462 184Z', connector: 'M554 165 H655 L684 180 H708', dot: [554, 165], box: [708, 131, 292], title: 'Bulbar region', subtitle: 'Tongue / pharynx lie deeper' },
  cervical: { highlight: 'M453 194 L473 203 Q481 243 497 281 L479 273 Q461 236 450 212Z M555 194 L536 203 Q527 243 511 281 L530 273 Q547 236 558 212Z', connector: 'M455 232 H375 L340 261 H311', dot: [455, 232], box: [24, 212, 287], title: 'Cervical muscles', subtitle: 'Anterior neck musculature' },
  proximal: { highlight: 'M340 273 Q299 281 282 326 Q275 358 295 391 L333 365 L367 291Z M637 274 Q686 275 716 316 Q736 351 716 392 L675 367 L630 293Z M354 885 Q409 897 472 885 L462 973 Q438 1013 405 1017 Q371 997 355 957Z M548 886 Q610 896 674 883 L671 958 Q648 1006 609 1021 Q571 1005 557 972Z', connector: 'M391 927 H337 L308 977 V989', dot: [391, 927], box: [24, 989, 284], title: 'Proximal muscles', subtitle: 'Shoulders and thighs' },
  respiratory: { highlight: 'M619 331 Q643 352 647 390 L640 452 Q632 486 618 512 L608 482 Q627 445 629 402 L624 363Z M512 448 Q559 434 594 455 Q615 474 625 510 L610 501 Q591 467 558 463 L513 465Z', connector: 'M623 437 H681 L713 547 H738', dot: [623, 437], box: [738, 498, 263], title: 'Respiratory', subtitle: 'Intercostals / diaphragm' },
};

/** Illustrated regional muscle atlas; clinical distribution never defines a diagnosis. */
export function PhenotypeFigure({ selected, onSelect }: PhenotypeFigureProps) {
  const id = useId();
  const region = regions.find((item) => item.id === selected)!;
  const activate = (event: KeyboardEvent<SVGGElement>, target: PhenotypeRegion) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(target);
    }
  };
  return <div className="phenotype-figure editorial-phenotype" role="group" aria-labelledby={`${id}-title`}>
    <div className="editorial-phenotype-heading"><span id={`${id}-title`}>Regional muscle anatomy</span><span>Anterior view &amp; anatomical details</span></div>
    <div className="editorial-phenotype-art">
      <MedicalArtwork illustration="clinical-distribution" />
      <svg className="phenotype-anatomical-overlay" viewBox="0 0 1024 1536" role="group" aria-label="Select anatomical regions">
        {regions.map(item => {
          const shape = geometry[item.id];
          const [x, y, width] = shape.box;
          return <g key={item.id} className={`phenotype-anatomical-target${selected === item.id ? ' is-selected' : ''}`} role="button" tabIndex={0}
            aria-label={`Select ${item.id} anatomy`} aria-pressed={selected === item.id} onClick={() => onSelect(item.id)} onKeyDown={event => activate(event, item.id)}>
            <title>{item.label}: {item.anatomy}</title>
            <path className="phenotype-region phenotype-anatomical-highlight" d={shape.highlight} />
            <path className="phenotype-anatomical-connector" d={shape.connector} />
            <circle className="phenotype-anatomical-dot" cx={shape.dot[0]} cy={shape.dot[1]} r="5" />
            <rect className="phenotype-anatomical-label" x={x} y={y} width={width} height="98" rx="3" />
            <text className="phenotype-anatomical-title" x={x + 16} y={y + 37}>{item.number} · {shape.title}</text>
            <text className="phenotype-anatomical-subtitle" x={x + 16} y={y + 70}>{shape.subtitle}</text>
          </g>;
        })}
        <g className="phenotype-heart-context" aria-hidden="true">
          <path d="M577 398 H678 L717 354 H739" />
          <circle cx="577" cy="398" r="5" />
          <rect x="739" y="309" width="261" height="91" rx="3" />
          <text x="755" y="345">Heart</text><text className="phenotype-heart-context-note" x="755" y="375">Separate cardiac context</text>
        </g>
      </svg>
    </div>
    <div className="editorial-phenotype-controls region-controls lab-option-controls" role="group" aria-label="Clinical muscle regions">
      {regions.map((item) => <button key={item.id} type="button" className={`phenotype-hit-target${selected === item.id ? ' is-selected' : ''}`} aria-label={`Select ${item.id} region`} aria-pressed={selected === item.id} onClick={() => onSelect(item.id)}>
        <span className="editorial-phenotype-number" aria-hidden="true">{item.number}</span><span>{item.label}</span>
      </button>)}
    </div>
    <p className="editorial-phenotype-selection" aria-live="polite"><strong>{region.label}:</strong> {region.anatomy}. {region.note} Select a region to read its clinical manifestations and mechanistic limits.</p>
  </div>;
}
