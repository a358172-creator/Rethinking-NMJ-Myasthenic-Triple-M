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

/* All coordinates use the original 1536 × 1024 artboard. The drawing is an
 * illustrative section, so the highlights identify compartments rather than
 * measured boundaries. The base artwork is shared between the three states. */
const compartmentGeometry: Record<NmjCompartment, { path: string; point: [number, number] }> = {
  presynaptic: { path: 'M713 0 L843 0 C849 122 837 173 904 223 C1023 286 1170 320 1243 400 C1304 470 1269 523 1175 536 L1061 546 C1065 509 1044 484 1020 486 C991 489 990 517 991 547 L547 546 C549 514 537 486 513 485 C483 487 480 511 491 540 L338 528 C245 525 237 471 282 412 C349 326 495 295 612 236 C715 178 720 123 713 0Z', point: [1183, 391] },
  cleft: { path: 'M286 537 C356 550 422 555 491 553 L543 558 L994 558 L1068 555 C1156 551 1221 548 1263 535 L1308 568 C1278 579 1268 603 1268 647 L1267 698 C1265 732 1236 750 1214 734 C1190 719 1201 672 1188 641 C1176 609 1153 602 1125 601 L1105 602 C1070 605 1063 625 1060 659 L1054 701 C1050 732 1026 745 1006 726 C990 709 992 677 987 648 C983 613 967 603 940 602 L870 600 C833 600 824 630 822 664 L812 722 C805 753 781 770 755 752 C730 735 732 704 726 670 L719 639 C712 611 697 602 667 601 L602 602 C565 604 555 632 553 666 L545 707 C540 737 517 748 495 729 C476 712 479 681 475 651 C471 621 458 609 439 608 L386 600 C351 597 339 620 334 648 L329 693 C325 722 306 740 283 728 C263 717 263 692 262 662 C264 613 257 593 239 579Z', point: [744, 581] },
  receptors: { path: 'M247 582 L270 594 M375 606 L398 604 M431 615 L453 604 M579 612 L601 607 M658 615 L679 607 M845 606 L868 599 M927 608 L949 600 M1090 616 L1115 607 M1132 618 L1155 606 M1245 590 L1268 584', point: [1160, 585] },
  muscle: { path: 'M48 578 C114 571 187 555 229 574 C257 589 264 610 264 649 L265 686 C263 713 274 737 298 738 C323 740 340 719 341 690 L343 651 C345 617 359 600 384 599 C423 599 458 599 470 630 C484 668 467 710 493 735 C511 754 541 745 552 720 C563 690 552 657 567 630 C581 601 611 601 649 603 C685 600 710 601 724 633 C741 670 722 725 750 751 C774 775 806 759 818 729 C834 688 817 647 845 614 C860 596 886 596 918 600 C948 600 974 599 988 631 C1000 663 986 707 1009 730 C1026 747 1053 740 1064 712 C1075 681 1060 639 1084 615 C1102 596 1131 597 1156 601 C1182 605 1196 626 1201 658 L1201 698 C1201 725 1215 741 1236 738 C1262 733 1275 707 1273 678 L1272 634 C1271 601 1285 577 1311 571 C1362 558 1420 576 1489 578', point: [1344, 622] },
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
      <path d="M371 610 L450 614 M582 611 L680 611 M850 606 L950 606 M1098 612 L1153 613" className="nmj-state-receptor-line" />
      {[391, 596, 862, 1110].map((x, index) => <path key={x} d={`M${x} 625 v34`} className={index % 2 ? 'nmj-activation-mark nmj-activation-mark--limited' : 'nmj-activation-mark'} />)}
      <path d="M591 653 L591 699" className="nmj-state-signal" markerEnd={`url(#${id}-arrow)`} />
      <path d="M574 726 L608 726" className="nmj-state-signal-stop" />
    </g>}
    {state === 'muscle-injury' && <g className="nmj-focal-injury" data-state-overlay="downstream-muscle-injury">
      <path className="nmj-injury-focus" d="M1050 828 C1099 801 1180 804 1231 833 C1286 853 1313 898 1279 938 C1232 975 1141 961 1085 940 C1040 920 1020 866 1050 828Z" />
      {[0, 1, 2, 3].map(row => <path key={row} className="nmj-injury-myofibril" d={`M1060 ${846 + row * 25} c30 -4 52 7 78 5 M1165 ${854 + row * 25} c28 5 57 12 96 6`} />)}
      <path className="nmj-preserved-synapse" d="M585 611 L678 613 M853 607 L948 607 M1103 614 L1150 615" />
    </g>}
    {showSignal && state === 'normal' && signalStep && <g className={`nmj-signal-stage nmj-signal-stage--${signalStep}`} data-signal-stage={signalStep}>
      {signalStep === 1 && <path d="M776 55 C775 133 774 197 773 255" className="nmj-step-path" markerEnd={`url(#${id}-arrow)`} />}
      {signalStep === 2 && <><path d="M576 595 L576 487 M960 594 L960 486" className="nmj-step-path" markerEnd={`url(#${id}-arrow)`} /><circle cx="576" cy="531" r="24" className="nmj-step-ring" /><circle cx="960" cy="531" r="24" className="nmj-step-ring" /></>}
      {signalStep === 3 && <><path d="M516 502 L516 630 M1018 503 L1018 627" className="nmj-step-path" markerEnd={`url(#${id}-arrow)`} /><circle cx="516" cy="576" r="14" className="nmj-ach-symbol" /><circle cx="1018" cy="578" r="14" className="nmj-ach-symbol" /></>}
      {signalStep === 4 && <>{[390, 592, 857, 1104].map(x => <ellipse key={x} cx={x} cy="610" rx="25" ry="31" className="nmj-step-ring" />)}<path d="M592 651 L592 737" className="nmj-step-path" markerEnd={`url(#${id}-arrow)`} /></>}
      {signalStep === 5 && <><path d="M222 577 C173 563 122 571 65 577" className="nmj-step-path" markerEnd={`url(#${id}-arrow)`} /><path d="M1310 574 C1373 565 1425 575 1471 578" className="nmj-step-path" markerEnd={`url(#${id}-arrow)`} /></>}
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
    <p className="nmj-symbol-key"><span className="nmj-symbol-key-ach" aria-hidden="true" /> Orange dots: ACh symbols. <span className="nmj-symbol-key-ache" aria-hidden="true" /> Violet extracellular clusters: AChE symbols in the basal lamina, not inflammatory cells.</p>
    <div className={`nmj-artwork-legend${showLabels ? '' : ' nmj-artwork-legend--compact'}`} aria-label="Illustration compartment key">
      {(Object.keys(nmjCompartments) as NmjCompartment[]).map(key => {
        const compartment = nmjCompartments[key];
        const content = <><span className="nmj-number-marker" aria-hidden="true">{compartment.number}</span><span>{compartment.label}</span></>;
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
