import { useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { MedicalArtwork } from '../../../components/figures/MedicalArtwork';
import { medicalArtworkUrl } from '../../../data/medicalArtwork';
import { nmjAnatomicalSources, nmjCompartments, nmjSignalSteps, nmjStates } from '../data/nmjModel';
import type { NmjCompartment, NmjSignalStep, NmjState } from '../data/nmjModel';
import '../styles/nmj.css';

export type { NmjCompartment, NmjSignalStep, NmjState } from '../data/nmjModel';

interface DrawingProps {
  state?: NmjState;
  selected?: NmjCompartment;
  onSelect?: (compartment: NmjCompartment) => void;
  signalStep?: NmjSignalStep | null;
  showSignal?: boolean;
  showLabels?: boolean;
}

const artworkForState = {
  normal: 'nmj-normal',
  'transmission-impaired': 'nmj-impaired',
  'muscle-injury': 'nmj-muscle-injury',
} as const;

const compartmentLandmarks: Record<NmjCompartment, string> = {
  presynaptic: 'Motor axon · ACh vesicles · mitochondria · calcium channels',
  cleft: 'Extracellular space · basal lamina with AChE',
  receptors: 'Nicotinic AChRs · fold crests and upper shoulders',
  muscle: 'Sarcolemma · junctional folds · underlying myofibrils',
};

/* All coordinates use the recreated 1536 × 1024 reference artboard. The drawing is an
 * illustrative section, so the highlights identify compartments rather than
 * measured boundaries. The base artwork is shared between the three states. */
const compartmentGeometry: Record<NmjCompartment, { path: string; point: [number, number] }> = {
  presynaptic: { path: 'M701 0 L842 0 C846 92 858 132 910 158 C976 186 1092 224 1166 278 C1217 316 1239 360 1227 401 C1212 467 1140 473 1044 472 L589 470 C517 470 444 466 415 426 C384 388 395 343 425 299 C471 238 563 202 634 163 C686 133 693 84 701 0Z', point: [1168, 351] },
  cleft: { path: 'M438 451 C535 480 665 478 818 478 L1096 476 C1153 473 1209 448 1229 422 L1320 504 C1283 544 1275 577 1258 603 C1243 613 1221 606 1208 589 C1185 558 1149 534 1116 535 C1061 534 1019 575 1002 631 L989 678 C980 710 966 711 956 676 L941 627 C919 568 875 536 816 535 C755 536 718 577 698 627 L675 676 C661 711 638 714 624 679 L603 625 C585 568 544 534 480 534 C422 534 393 558 372 599 L358 628 C349 649 339 647 330 622 L309 577 C294 545 269 526 242 521 L321 467Z', point: [776, 507] },
  receptors: { path: 'M378 610 C409 565 445 546 480 549 C531 547 569 568 595 615 M699 630 C717 583 761 550 815 550 C864 549 903 581 924 631 M1015 630 C1035 580 1077 550 1118 550 C1160 553 1188 574 1219 609', point: [1230, 567] },
  muscle: { path: 'M35 592 C116 566 173 512 231 531 C288 540 286 602 318 642 C339 671 362 666 385 630 C412 586 440 557 480 556 C525 551 568 572 586 620 C608 670 605 704 635 724 C668 744 690 687 706 636 C726 583 763 555 814 556 C861 550 900 584 920 634 C940 685 934 714 964 732 C991 749 1012 691 1029 637 C1044 587 1074 555 1118 556 C1168 551 1190 584 1217 615 C1244 644 1271 646 1298 617 C1324 588 1325 548 1364 531 C1413 504 1451 525 1507 547', point: [1400, 527] },
};

function activateCompartment(event: KeyboardEvent<SVGGElement>, activate: () => void) {
  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(); }
}

/** Separate programmatic teaching marks, never an inferred lesion in the art. */
function NmjTeachingMarks({ state, signalStep, showSignal }: Pick<DrawingProps, 'state' | 'signalStep' | 'showSignal'>) {
  const id = useId();
  return <g className="nmj-teaching-marks" aria-hidden="true" data-nmj-teaching-state={state}>
    <defs><marker id={`${id}-arrow`} markerUnits="userSpaceOnUse" markerWidth="23" markerHeight="23" viewBox="0 0 9 9" refX="7" refY="4.5" orient="auto"><path d="M1 1 L7 4.5 L1 8" fill="none" stroke="#306b72" strokeWidth="1.2" /></marker></defs>
    {state === 'transmission-impaired' && <g className="nmj-reduced-activation" data-state-overlay="reduced-activation">
      <path d="M446 558 L510 558 M782 559 L840 559 M1085 558 L1147 558" className="nmj-state-receptor-line" />
      {[[478, 584], [815, 584], [1117, 584]].map(([x, y], index) => <path key={x} d={`M${x} ${y} v34`} className={index % 2 ? 'nmj-activation-mark nmj-activation-mark--limited' : 'nmj-activation-mark'} />)}
      <path d="M815 630 L815 683" className="nmj-state-signal" markerEnd={`url(#${id}-arrow)`} />
      <path d="M797 709 L833 709" className="nmj-state-signal-stop" />
    </g>}
    {state === 'muscle-injury' && <g className="nmj-focal-injury" data-state-overlay="downstream-muscle-injury">
      <path className="nmj-injury-focus" d="M1050 828 C1099 801 1180 804 1231 833 C1286 853 1313 898 1279 938 C1232 975 1141 961 1085 940 C1040 920 1020 866 1050 828Z" />
      {[0, 1, 2, 3].map(row => <path key={row} className="nmj-injury-myofibril" d={`M1060 ${846 + row * 25} c30 -4 52 7 78 5 M1165 ${854 + row * 25} c28 5 57 12 96 6`} />)}
      <path className="nmj-preserved-synapse" d="M446 558 L510 558 M782 559 L840 559 M1085 558 L1147 558" />
    </g>}
    {showSignal && state === 'normal' && signalStep && <g className={`nmj-signal-stage nmj-signal-stage--${signalStep}`} data-signal-stage={signalStep}>
      {signalStep === 1 && <path d="M772 30 C772 108 772 176 772 230" className="nmj-step-path" markerEnd={`url(#${id}-arrow)`} />}
      {signalStep === 2 && <><path d="M650 519 L650 417 M944 519 L944 417" className="nmj-step-path" markerEnd={`url(#${id}-arrow)`} /><circle cx="650" cy="454" r="25" className="nmj-step-ring" /><circle cx="944" cy="454" r="25" className="nmj-step-ring" /></>}
      {signalStep === 3 && <><path d="M803 430 L803 523 M1064 453 L1064 527" className="nmj-step-path" markerEnd={`url(#${id}-arrow)`} /><circle cx="803" cy="495" r="13" className="nmj-ach-symbol" /><circle cx="1064" cy="499" r="13" className="nmj-ach-symbol" /></>}
      {signalStep === 4 && <>{[[480, 558], [815, 559], [1117, 557]].map(([x, y]) => <ellipse key={x} cx={x} cy={y} rx="44" ry="27" className="nmj-step-ring" />)}<path d="M815 601 L815 686" className="nmj-step-path" markerEnd={`url(#${id}-arrow)`} /></>}
      {signalStep === 5 && <><path d="M220 529 C170 515 113 565 55 588" className="nmj-step-path" markerEnd={`url(#${id}-arrow)`} /><path d="M1364 531 C1414 504 1456 534 1501 548" className="nmj-step-path" markerEnd={`url(#${id}-arrow)`} /></>}
    </g>}
  </g>;
}

/** Raster compatibility layer for older, currently unmounted SVG compositions. */
export function NeuromuscularJunctionDrawing({ state = 'normal', signalStep = null, showSignal = true }: DrawingProps) {
  return <g className={`nmj-drawing nmj-drawing--${state}`} data-nmj-state={state}>
    <g transform="scale(.46875 .44921875)"><image href={medicalArtworkUrl(artworkForState[state])} x="0" y="0" width="1536" height="1024" /><NmjTeachingMarks state={state} signalStep={signalStep} showSignal={showSignal} /></g>
  </g>;
}

interface IllustrationProps extends DrawingProps {
  className?: string;
  title?: string;
}

/** Original raster illustration with accessible, separate anatomical navigation. */
export function NeuromuscularJunction({ state = 'normal', selected, onSelect, signalStep = null, showSignal = true, showLabels = true, className = '', title }: IllustrationProps) {
  const id = useId();
  const activeStep = nmjSignalSteps.find(step => step.id === signalStep);
  return <div className={`nmj-illustration nmj-drawing nmj-drawing--${state} ${className}`} data-nmj-state={state}
    role={onSelect ? 'group' : 'figure'} aria-label={title ?? nmjStates[state].title} aria-describedby={`${id}-description`}>
    <div className="nmj-raster-frame">
      <MedicalArtwork illustration={artworkForState[state]} alt={title ?? undefined} className="nmj-raster-art" />
      <svg className="nmj-anatomy-overlay" viewBox="0 0 1536 1024" role={onSelect ? 'group' : 'img'} aria-label={onSelect ? 'Select an anatomical NMJ compartment' : 'Anatomical teaching highlights'}>
        <NmjTeachingMarks state={state} signalStep={signalStep} showSignal={showSignal} />
        {(Object.keys(nmjCompartments) as NmjCompartment[]).map(key => {
          const compartment = nmjCompartments[key];
          const geometry = compartmentGeometry[key];
          return <g key={key} className={`nmj-hit-target${selected === key ? ' is-selected' : ''}`}
            role={onSelect ? 'button' : undefined} tabIndex={onSelect ? 0 : undefined}
            aria-label={onSelect ? `Select ${compartment.label.toLowerCase()}` : undefined}
            aria-pressed={onSelect ? selected === key : undefined}
            onClick={onSelect ? () => onSelect(key) : undefined}
            onKeyDown={onSelect ? event => activateCompartment(event, () => onSelect(key)) : undefined}>
            <path d={geometry.path} className={`nmj-compartment-shape nmj-compartment-shape--${key}`} />
            <g className="nmj-coordinate-marker" transform={`translate(${geometry.point[0]} ${geometry.point[1]})`}><circle r="24" /><text textAnchor="middle" y="8">{compartment.number}</text></g>
          </g>;
        })}
      </svg>
      {showSignal && activeStep && <div className="nmj-stage-label" aria-live="polite"><span>TRANSMISSION SEQUENCE</span><strong>{activeStep.id} · {activeStep.label}</strong></div>}
      {state !== 'normal' && <span className="nmj-conceptual-state-label">{state === 'transmission-impaired' ? 'Reduced effective activation · conceptual' : 'Focal downstream injury · conceptual'}</span>}
    </div>
    <p className="nmj-symbol-key"><span className="nmj-symbol-key-ach" aria-hidden="true" /> Orange dots: ACh symbols. <span className="nmj-symbol-key-ache" aria-hidden="true" /> Fine violet mesh: synaptic basal lamina, where AChE is anchored. Individual enzymes are not resolved.</p>
    <div className={`nmj-artwork-legend${showLabels ? '' : ' nmj-artwork-legend--compact'}`} aria-label="Illustration compartment key">
      {(Object.keys(nmjCompartments) as NmjCompartment[]).map(key => {
        const compartment = nmjCompartments[key];
        const content = <><span className="nmj-number-marker" aria-hidden="true">{compartment.number}</span><span className="nmj-artwork-compartment-copy"><span>{compartment.label}</span><small>{compartmentLandmarks[key]}</small></span></>;
        return onSelect ? <button className={`nmj-artwork-compartment${selected === key ? ' is-selected' : ''}`} type="button" key={key}
          aria-label={`Select ${compartment.label.toLowerCase()}`} aria-pressed={selected === key} onClick={() => onSelect(key)}>{content}</button>
          : <span className="nmj-artwork-compartment" key={key}>{content}</span>;
      })}
    </div>
    <p id={`${id}-description`} className="sr-only">Conceptual editorial illustration of a nerve terminal, synaptic cleft, receptor-bearing endplate and underlying skeletal muscle. Numbered markers and outlines identify those compartments. Teaching arrows and injury marks are separate programmatic overlays, not experimental observations. {nmjStates[state].description} Relative sizes and molecule counts are illustrative, not to scale.</p>
  </div>;
}

/** The single owner of the explorer's state, selected compartment and signal step. */
export function NmjExplorer() {
  const [state, setState] = useState<NmjState>('normal');
  const [selected, setSelected] = useState<NmjCompartment>('presynaptic');
  const [signalStep, setSignalStep] = useState<NmjSignalStep | null>(null);
  const [enlarged, setEnlarged] = useState(false);
  const detailId = useId();
  const activeStep = nmjSignalSteps.find(step => step.id === signalStep);
  const setPhysiology = (next: NmjState) => {
    setState(next);
    setSignalStep(null);
    setSelected(next === 'muscle-injury' ? 'muscle' : next === 'transmission-impaired' ? 'receptors' : 'presynaptic');
  };

  return <section className="nmj-explorer" aria-label="Advanced neuromuscular junction">
    <div className="nmj-explorer-heading"><div><span className="eyebrow">NERVE → SYNAPSE → MUSCLE</span><h3>Neuromuscular junction</h3></div><p>A compartment-by-compartment view of transmission and downstream muscle integrity.</p></div>
    <div className="nmj-state-controls nmj-advanced-state-controls" role="group" aria-label="Neuromuscular transmission concept">
      {(Object.keys(nmjStates) as NmjState[]).map(key => <button key={key} type="button" aria-pressed={state === key} onClick={() => setPhysiology(key)}>{nmjStates[key].label}</button>)}
    </div>
    <div className="nmj-explorer-grid">
      <div className="nmj-artwork-panel">
        <div className="nmj-artwork-toolbar"><span className={`nmj-evidence-tier nmj-evidence-tier--${state}`}>{nmjStates[state].tier}</span><button className="nmj-enlarge-control" type="button" aria-pressed={enlarged} onClick={() => setEnlarged(!enlarged)}>Enlarge anatomical detail</button></div>
        <div className={`nmj-artwork-viewport${enlarged ? ' is-enlarged' : ''}`} role="region" aria-label="Neuromuscular junction anatomical detail" tabIndex={0}>
          <NeuromuscularJunction state={state} selected={selected} onSelect={setSelected} signalStep={signalStep} />
        </div>
        <p className="nmj-scale-note">Conceptual editorial illustration · not a microscopy image. Dimensions and molecule counts are illustrative. Select a numbered compartment to read its anatomical role.{enlarged && ' Scroll horizontally, or focus the illustration and use the arrow keys, to inspect the enlarged artwork.'}</p>
      </div>
      <div className="nmj-compartment-panel">
        <h4>Explore the compartments</h4>
        <div className="nmj-compartment-controls" role="group" aria-label="NMJ compartments">
          {(Object.keys(nmjCompartments) as NmjCompartment[]).map(key => <button type="button" key={key} onClick={() => setSelected(key)} aria-pressed={selected === key} aria-controls={detailId}><span aria-hidden="true">{nmjCompartments[key].number}</span>{nmjCompartments[key].label}</button>)}
        </div>
        <div className="nmj-compartment-explanation" id={detailId} aria-live="polite"><h4>{nmjCompartments[selected].label}</h4><p>{nmjCompartments[selected].description}</p></div>
      </div>
    </div>
    <p className="nmj-state-description" aria-live="polite">{nmjStates[state].description}</p>
    {state === 'normal' && <div className="nmj-transmission-sequence">
      <div className="nmj-sequence-heading"><h4>Follow one transmission sequence</h4><span>Select each stage · schematic order, not real-time kinetics</span></div>
      <div className="nmj-sequence-controls" role="group" aria-label="Normal transmission stages">{nmjSignalSteps.map(step => <button type="button" key={step.id} aria-pressed={signalStep === step.id} onClick={() => { setSignalStep(step.id); setSelected(step.compartment); }}><span aria-hidden="true">{step.id}</span>{step.label}</button>)}</div>
      <p className="nmj-step-description" aria-live="polite">{activeStep?.description ?? 'Begin with the nerve impulse, then follow calcium entry, acetylcholine release, receptor activation and muscle excitation.'}</p>
    </div>}
    <details className="nmj-anatomical-sources"><summary>Anatomical basis and limits</summary><p>Localization is informed by experimental NMJ anatomy. The impairment and muscle-injury views are teaching models and do not assign a mechanism to any patient. Species variation and molecular scale are not reproduced.</p><ul>{nmjAnatomicalSources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></details>
  </section>;
}
