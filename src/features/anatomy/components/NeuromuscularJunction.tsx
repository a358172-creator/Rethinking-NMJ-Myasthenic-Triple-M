import { useId, useState, type KeyboardEvent } from 'react';
import { nmjAnatomicalSources, nmjCompartments, nmjSignalSteps, nmjStates } from '../data/nmjModel';
import type { NmjCompartment, NmjSignalStep, NmjState } from '../data/nmjModel';
import '../styles/nmj.css';

export type { NmjCompartment, NmjSignalStep, NmjState } from '../data/nmjModel';

const terminal = 'M300 24 L300 77 C300 98 279 104 248 106 C206 108 176 125 166 151 C155 179 169 205 199 217 C225 228 256 226 296 226 H457 C504 226 535 217 548 193 C563 166 545 139 516 124 C490 110 460 107 423 108 C375 109 347 105 345 79 L345 24Z';
const folds = 'M32 283 H230 Q236 283 236 296 V337 C236 357 254 357 254 337 V296 Q254 283 260 283 H292 Q298 283 298 296 V337 C298 357 316 357 316 337 V296 Q316 283 322 283 H354 Q360 283 360 296 V337 C360 357 378 357 378 337 V296 Q378 283 384 283 H416 Q422 283 422 296 V337 C422 357 440 357 440 337 V296 Q440 283 446 283 H478 Q484 283 484 296 V337 C484 357 502 357 502 337 V296 Q502 283 508 283 H688';
const basalLamina = 'M32 274 H230 Q242 274 242 296 V337 Q245 350 248 337 V296 Q248 274 260 274 H292 Q304 274 304 296 V337 Q307 350 310 337 V296 Q310 274 322 274 H354 Q366 274 366 296 V337 Q369 350 372 337 V296 Q372 274 384 274 H416 Q428 274 428 296 V337 Q431 350 434 337 V296 Q434 274 446 274 H478 Q490 274 490 296 V337 Q493 350 496 337 V296 Q496 274 508 274 H688';
const receptorPositions = [210, 224, 266, 282, 328, 344, 390, 406, 452, 468, 514, 530];

interface DrawingProps {
  state?: NmjState;
  selected?: NmjCompartment;
  onSelect?: (compartment: NmjCompartment) => void;
  signalStep?: NmjSignalStep | null;
  showSignal?: boolean;
  showLabels?: boolean;
}

/** Original cross-sectional vector artwork. Coordinate extent: 720 × 460.
 * Membrane paths, cleft, basal lamina and intracellular fibers remain separate.
 * Reuse this layer inside an SVG; the wrapper supplies the accessible description.
 */
export function NeuromuscularJunctionDrawing({ state = 'normal', selected, onSelect, signalStep = null, showSignal = true, showLabels = false }: DrawingProps) {
  const id = useId().replace(/:/g, '');
  const impaired = state === 'transmission-impaired';
  const muscleInjury = state === 'muscle-injury';
  const signalColor = impaired ? 'var(--amber-text)' : 'var(--teal-text)';
  const signalOpacity = (step: NmjSignalStep) => signalStep === null || signalStep === step ? 1 : .17;
  const selectionProps = (compartment: NmjCompartment) => onSelect ? {
    role: 'button',
    tabIndex: 0,
    'aria-label': `Select ${nmjCompartments[compartment].label.toLowerCase()}`,
    'aria-pressed': selected === compartment,
    className: `nmj-compartment-hit${selected === compartment ? ' is-selected' : ''}`,
    onClick: () => onSelect(compartment),
    onKeyDown: (event: KeyboardEvent<SVGGElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect(compartment);
      }
    },
  } : {};

  return <g className={`nmj-drawing nmj-drawing--${state}`} data-nmj-state={state}>
    <defs>
      <linearGradient id={`${id}-nerve`} x1="0" y1="0" x2="0.7" y2="1">
        <stop offset="0" stopColor="#F1F5F8" /><stop offset=".65" stopColor="#DCE5ED" /><stop offset="1" stopColor="#BDCCDA" />
      </linearGradient>
      <linearGradient id={`${id}-muscle`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#EDF4F1" /><stop offset=".55" stopColor="#D6E6E0" /><stop offset="1" stopColor="#BDD5CE" />
      </linearGradient>
      <linearGradient id={`${id}-fiber`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#C3D9D1" /><stop offset=".48" stopColor="#EDF3EE" /><stop offset="1" stopColor="#A9C9BE" />
      </linearGradient>
      <clipPath id={`${id}-muscle-clip`}><path d={`${folds} V450 H32Z`} /></clipPath>
      <marker id={`${id}-signal`} markerWidth="7" markerHeight="7" refX="5.6" refY="3.5" orient="auto"><path d="M1 1 L5.5 3.5 L1 6" fill="none" stroke={signalColor} strokeWidth="1.5" strokeLinecap="round" /></marker>
    </defs>

    {/* The axon expands into a differentiated bouton, with an intracellular rim. */}
    <g aria-hidden="true">
      <path d={terminal} fill={`url(#${id}-nerve)`} stroke="#536E85" strokeWidth="2.2" />
      <path d="M307 25 V77 C307 105 283 111 249 113 C211 115 184 130 174 153 C165 176 176 197 201 209 C233 221 267 219 297 219 H456 C497 219 527 211 540 190 C552 169 537 147 512 132 C486 119 457 114 420 116 C371 117 339 109 338 80 V25" fill="none" stroke="#F7FAFC" strokeWidth="1.5" />
      <path d="M313 26 V66 M331 26 V66" stroke="#A6B7C7" strokeWidth="1" />

      {/* Cristae are restricted to the two membrane-bound mitochondria. */}
      <g transform="translate(210 141) rotate(-15)"><path d="M0 0 C2 -13 47 -17 53 -6 C61 8 15 23 4 13 C0 10 -2 4 0 0Z" fill="#C1CFDB" stroke="#647D92" strokeWidth="1.2" /><path d="M7 1 L15 -6 L18 6 L26 -7 L30 2 L39 -9 L42 -1" fill="none" stroke="#647D92" strokeWidth="1.2" strokeLinejoin="round" /></g>
      <g transform="translate(439 142) rotate(10)"><path d="M0 0 C4 -13 50 -14 54 -2 C58 11 19 20 5 12 C1 10 -2 5 0 0Z" fill="#C1CFDB" stroke="#647D92" strokeWidth="1.2" /><path d="M8 0 L16 -7 L20 6 L29 -6 L33 4 L43 -5" fill="none" stroke="#647D92" strokeWidth="1.2" strokeLinejoin="round" /></g>

      {[[191, 176], [227, 188], [260, 163], [290, 137], [319, 168], [341, 136], [357, 196], [391, 155], [421, 189], [481, 179], [518, 173]].map(([x, y]) => <g key={`${x}-${y}`}>
        <circle cx={x} cy={y} r="10.5" fill="#F8FAFC" stroke="#6B8296" strokeWidth="1.15" />
        <circle cx={x} cy={y} r="7.2" fill="none" stroke="#D5DFE7" strokeWidth=".8" />
        <g fill="var(--amber)"><circle cx={x - 3} cy={y - 3} r="1.75" /><circle cx={x + 3} cy={y - 1} r="1.75" /><circle cx={x} cy={y + 4} r="1.75" /></g>
      </g>)}

      {/* A membrane-attached reserve/docked vesicle and fusion profiles differ. */}
      <circle cx="300" cy="210" r="10" fill="#F8FAFC" stroke="#6B8296" strokeWidth="1.2" />
      <path d="M294 220 V224 M306 220 V224" stroke="#536E85" strokeWidth="1.3" />
      <g fill="var(--amber)"><circle cx="297" cy="207" r="1.8" /><circle cx="304" cy="211" r="1.8" /><circle cx="297" cy="214" r="1.8" /></g>
      {[265, 389, 477].map(x => <g key={x}>
        <path d={`M${x - 18} 223 H${x + 18}`} stroke="#344F67" strokeWidth="4.8" strokeLinecap="round" />
        <path d={`M${x - 8} 226 V218 C${x - 20} 201 ${x + 20} 201 ${x + 8} 218 V226`} fill="#FAFCFD" stroke="#536E85" strokeWidth="1.4" />
        <path d={`M${x - 4} 214 V226 M${x + 4} 214 V226`} stroke="var(--amber)" strokeWidth="1.8" strokeDasharray="2 4" />
        {/* Twin bars denote a calcium channel crossing the presynaptic membrane. */}
        <path d={`M${x + 22} 216 V234 M${x + 28} 216 V234`} stroke="#536E85" strokeWidth="3" strokeLinecap="round" />
      </g>)}

      {/* Muscle tissue is clipped to sarcolemma, never allowed to fill the cleft. */}
      <path d={`${folds} V450 H32Z`} fill={`url(#${id}-muscle)`} />
      <g clipPath={`url(#${id}-muscle-clip)`}>
        {[378, 401, 424].map((y, row) => <g key={y}>
          <path d={`M46 ${y} C180 ${y - 3} 490 ${y + 3} 676 ${y} V${y + 14} C482 ${y + 16} 175 ${y + 11} 46 ${y + 14}Z`} fill={`url(#${id}-fiber)`} stroke="#6F9D90" strokeWidth=".7" />
          {Array.from({ length: 13 }, (_, i) => 57 + i * 48).map(x => <g key={x}>
            <path d={`M${x} ${y} V${y + 14}`} stroke="#618F82" strokeWidth="1.1" />
            <path d={`M${x + 13} ${y + 1} V${y + 13} M${x + 30} ${y + 1} V${y + 13}`} stroke="#96B7AB" strokeWidth="5" />
            <path d={`M${x + 22} ${y + 2} V${y + 12}`} stroke="#82AA9D" strokeWidth=".7" />
          </g>)}
          {muscleInjury && <g transform={`translate(${row % 2 ? 14 : 0} 0)`}>
            <path d={`M530 ${y - 2} L598 ${y - 3} L615 ${y + 6} L590 ${y + 18} L540 ${y + 17} L519 ${y + 6}Z`} fill="#EAD4D6" />
            <path d={`M518 ${y + 2} L540 ${y + 7} L550 ${y + 1} M570 ${y + 12} L592 ${y + 5} L614 ${y + 12}`} fill="none" stroke="var(--burgundy)" strokeWidth="2.1" />
          </g>}
        </g>)}
        <path d="M53 360 C170 365 185 355 218 362 M518 362 C565 354 611 365 676 359" stroke="#A1C3B7" strokeWidth="1" fill="none" />
        {muscleInjury && <path d="M518 369 C547 354 605 359 630 385 C650 408 627 441 590 447 C553 450 519 432 509 408 C502 391 508 379 518 369Z" fill="none" stroke="var(--burgundy)" strokeWidth="1.4" strokeDasharray="5 4" />}
      </g>
      <path d={folds} fill="none" stroke="var(--teal-text)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d={basalLamina} fill="none" stroke="#9B9B84" strokeWidth="1.2" strokeDasharray="2.5 2.5" />
      <path d="M177 241 C267 250 430 243 531 239" fill="none" stroke="#9B9B84" strokeWidth="1.1" strokeDasharray="2.5 2.5" />

      {/* AChE is anchored extracellularly, including within folds, not a receptor. */}
      {[[207, 244], [342, 246], [439, 242], [245, 323], [369, 321], [493, 324]].map(([x, y]) => <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
        <path d="M0 -7 V8" stroke="#8F8E75" strokeWidth="1" />
        <path d="M-6 -3 C-9 -9 -2 -11 0 -6 C2 -11 9 -9 6 -3 C10 1 3 5 0 1 C-3 5 -10 1 -6 -3Z" fill="#E5DFC9" stroke="#8F815D" strokeWidth=".85" />
      </g>)}

      {/* AChR symbols occupy crests / shoulders; none is placed in fold depths. */}
      {receptorPositions.map((x, index) => <g key={x} opacity={impaired && index % 3 !== 0 ? .35 : 1}>
        <path d={`M${x - 3.5} 288 V273 L${x - 7} 263 L${x - 3} 258 L${x} 265 M${x + 3.5} 288 V273 L${x + 7} 263 L${x + 3} 258 L${x} 265`} fill="#F7FBF8" stroke={impaired ? 'var(--amber-text)' : 'var(--teal-text)'} strokeWidth="1.8" strokeLinejoin="round" />
        <path d={`M${x - 4} 278 H${x + 4}`} stroke={impaired ? 'var(--amber-text)' : 'var(--teal)'} strokeWidth="1.1" />
      </g>)}

      {/* The amber dots are defined ACh symbols, confined to release paths. */}
      {[[265, 238], [259, 250], [272, 257], [281, 246], [384, 238], [395, 248], [386, 258], [405, 255], [477, 238], [470, 250], [486, 258], [501, 247]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="var(--amber)" stroke="#9B702F" strokeWidth=".4" opacity={signalStep === 3 || signalStep === null ? 1 : .3} />)}

      {showSignal && <>
        <g opacity={signalOpacity(1)}><path d="M323 36 V95" stroke={signalColor} strokeWidth="2.6" markerEnd={`url(#${id}-signal)`} /><path d="M314 63 L323 56 L330 64" stroke={signalColor} strokeWidth="1.4" fill="none" /></g>
        <g opacity={signalOpacity(2)}>{[290, 414, 502].map(x => <g key={x}><path d={`M${x} 252 V234 M${x} 215 V199`} stroke={signalColor} strokeWidth="1.8" markerEnd={`url(#${id}-signal)`} /><circle cx={x} cy="257" r="3.4" fill="#E7EDF3" stroke="#536E85" strokeWidth="1" /></g>)}</g>
        <g opacity={signalOpacity(3)}><path d="M265 232 L255 253 M389 232 L397 253 M477 232 L466 253" fill="none" stroke="var(--amber-text)" strokeWidth="1.3" strokeDasharray="2 3" /></g>
        <g opacity={signalOpacity(4)}>{[224, 328, 452].map(x => <path key={x} d={`M${x} 296 V315`} stroke={signalColor} strokeWidth="2" strokeDasharray={impaired ? '2 3' : undefined} markerEnd={`url(#${id}-signal)`} />)}</g>
        <g opacity={signalOpacity(5)}><path d="M531 301 H665" stroke={signalColor} strokeWidth="2.4" strokeDasharray={impaired ? '4 6' : undefined} markerEnd={`url(#${id}-signal)`} />{impaired && <path d="M588 294 L595 302 L588 309" fill="none" stroke={signalColor} strokeWidth="2" />}</g>
      </>}

      {/* Numbered compartment markers are retained in every responsive view. */}
      {([['presynaptic', 171, 115], ['cleft', 151, 249], ['receptors', 555, 269], ['muscle', 666, 350]] as const).map(([key, x, y]) => <g key={key} className="nmj-number-marker">
        <circle cx={x} cy={y} r="12" fill={selected === key ? 'var(--navy)' : '#FFFFFF'} stroke="var(--navy)" strokeWidth="1.2" />
        <text x={x} y={y + 4.3} fill={selected === key ? '#FFFFFF' : 'var(--navy)'} textAnchor="middle" fontSize="13" fontWeight="650">{nmjCompartments[key].number}</text>
      </g>)}

      {showLabels && <g className="nmj-direct-labels" fill="var(--slate)" fontSize="12.5">
        <text x="358" y="48">Motor axon</text><path d="M352 44 H347" stroke="var(--muted)" strokeWidth=".9" />
        <text x="31" y="69">ACh-filled vesicles</text><path d="M117 76 L164 102 L191 163" fill="none" stroke="var(--muted)" strokeWidth=".9" />
        <text x="546" y="87">Mitochondrion</text><path d="M552 94 L513 115 L491 143" fill="none" stroke="var(--muted)" strokeWidth=".9" />
        <text x="564" y="157">Active zone</text><path d="M575 165 L558 201 L490 223" fill="none" stroke="var(--muted)" strokeWidth=".9" />
        <text x="564" y="195">Ca²⁺ channel</text><path d="M571 200 L543 214 L505 220" fill="none" stroke="var(--muted)" strokeWidth=".9" />
        <text x="34" y="230">AChE</text><path d="M72 227 L132 233 L197 242" fill="none" stroke="var(--muted)" strokeWidth=".9" />
        <text x="34" y="320">Sarcolemma</text><path d="M127 316 L161 289" fill="none" stroke="var(--muted)" strokeWidth=".9" />
        <text x="278" y="370">Junctional folds</text><path d="M333 358 L357 343" fill="none" stroke="var(--muted)" strokeWidth=".9" />
        <text x="526" y="339" fill={impaired ? 'var(--amber-text)' : 'var(--teal-text)'}>{impaired ? 'Reduced activation' : 'Muscle excitation'}</text>
        <rect x="43" y="431" width={muscleInjury ? 170 : 153} height="20" rx="3" fill="#FFFFFF" fillOpacity=".91" />
        <text x="50" y="445">Ordered myofibrils</text>
        {muscleInjury && <><rect x="504" y="431" width="159" height="20" rx="3" fill="#FFFFFF" fillOpacity=".94" /><text x="512" y="445" fill="var(--burgundy)">Focal myofibrillar injury</text></>}
      </g>}
    </g>

    {/* Transparent targets preserve geometry and pair with external HTML controls. */}
    {onSelect && <>
      <g {...selectionProps('presynaptic')}><title>Presynaptic terminal</title><path className="nmj-selection-outline" d={terminal} fill="transparent" /><circle className="nmj-selection-outline" cx="171" cy="115" r="16" fill="transparent" /></g>
      <g {...selectionProps('cleft')}><title>Synaptic cleft</title><path className="nmj-selection-outline" d="M145 233 H546 V254 H145Z" fill="transparent" /></g>
      <g {...selectionProps('receptors')}><title>Postsynaptic receptors</title><path className="nmj-selection-outline" d="M196 254 H545 V294 H196Z" fill="transparent" /><circle className="nmj-selection-outline" cx="555" cy="269" r="16" fill="transparent" /></g>
      <g {...selectionProps('muscle')}><title>Skeletal-muscle membrane</title><path className="nmj-selection-outline" d="M32 294 H188 V362 H541 V306 H688 V450 H32Z" fill="transparent" /></g>
    </>}
  </g>;
}

interface IllustrationProps extends DrawingProps {
  className?: string;
  title?: string;
}

/** Controlled SVG wrapper; callers can choose a static image or interactive group. */
export function NeuromuscularJunction({ state = 'normal', selected, onSelect, signalStep = null, showSignal = true, showLabels = true, className = '', title }: IllustrationProps) {
  const id = useId().replace(/:/g, '');
  return <svg className={`nmj-illustration ${className}`} viewBox="0 0 720 460" xmlns="http://www.w3.org/2000/svg" role={onSelect ? 'group' : 'img'} aria-labelledby={`${id}-title ${id}-description`}>
    <title id={`${id}-title`}>{title ?? nmjStates[state].title}</title>
    <desc id={`${id}-description`}>A distal motor axon expands into a terminal containing acetylcholine vesicles and mitochondria. Docked and fusing vesicles sit at active zones beside voltage-gated calcium channels. The extracellular synaptic cleft and its basal lamina separate nerve from muscle; acetylcholinesterase is anchored in this matrix. Nicotinic receptors occupy the crests of deep junctional folds. Ordered myofibrils lie inside the muscle below the folded sarcolemma. {nmjStates[state].description} Numbered markers correspond to the external compartment legend. Symbols and relative sizes are schematic, not to scale.</desc>
    <NeuromuscularJunctionDrawing state={state} selected={selected} onSelect={onSelect} signalStep={signalStep} showSignal={showSignal} showLabels={showLabels} />
  </svg>;
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
        <div className="nmj-symbol-key" aria-label="Anatomical symbol key"><span><i className="nmj-key-ach" aria-hidden="true" />ACh: acetylcholine</span><span><i className="nmj-key-ache" aria-hidden="true" />AChE: acetylcholinesterase</span><span><i className="nmj-key-lamina" aria-hidden="true" />Synaptic basal lamina</span></div>
        <p className="nmj-scale-note">Original anatomical model · dimensions and molecule counts are schematic. Select numbered compartments in the artwork or use the controls.{enlarged && ' Scroll horizontally, or focus the illustration and use the arrow keys, to inspect the enlarged detail.'}</p>
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
