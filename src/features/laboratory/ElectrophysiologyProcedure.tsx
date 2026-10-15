import { useId } from 'react';
import { MedicalArtwork } from '../../components/figures/MedicalArtwork';
import type { ElectrophysiologyId } from '../../data/laboratory';
import './editorial-procedure.css';

interface Props {
  modality: ElectrophysiologyId;
}

const procedures = {
  rns: {
    illustration: 'rns-procedure',
    title: 'From motor-nerve stimulation to a muscle response',
    description: 'Surface stimulation activates a motor nerve. Active and reference electrodes connect to separate differential-amplifier inputs to record the summed response of activated muscle fibers: the CMAP.',
    recording: 'Surface recording',
    boundary: 'A CMAP samples many muscle fibers. It is not a direct recording from an individual endplate.',
    labels: ['Stimulate the motor nerve', 'Record over the muscle', 'Distal reference electrode'],
  },
  sfemg: {
    illustration: 'sfemg-procedure',
    title: 'Timing between muscle-fiber responses',
    description: 'In a voluntary paired recording, an intramuscular electrode samples potentials from two fibers of the same motor unit. Repeated discharges reveal their timing variability.',
    recording: 'Intramuscular recording',
    boundary: 'The electrode records muscle-fiber action potentials, not endplate voltage. The trace below illustrates a voluntary paired recording.',
    labels: ['Intramuscular electrode', 'Nearby muscle fibers', 'Compare discharge timing'],
  },
  needle: {
    illustration: 'needle-procedure',
    title: 'Motor-unit morphology and recruitment',
    description: 'An intramuscular needle electrode samples motor-unit action potentials during activation. Their morphology and recruitment address muscle and motor-unit physiology.',
    recording: 'Intramuscular recording',
    boundary: 'A myopathic pattern supports muscle involvement. The recording does not identify inflammatory cells or establish histopathology.',
    labels: ['Needle electrode', 'Local recording region', 'Motor-unit activity'],
  },
} as const;

/** Technical placement is drawn in SVG; the adjacent tissue illustration is conceptual anatomy. */
function SamplingSetup({ modality }: Props) {
  const id = useId();
  const surface = modality === 'rns';
  return <svg className="procedure-sampling-svg" viewBox="0 0 600 315" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{surface ? 'Schematic surface stimulation and muscle recording' : modality === 'sfemg' ? 'Schematic intramuscular sampling of nearby muscle fibers' : 'Schematic intramuscular motor-unit recording'}</title>
    <desc id={`${id}-desc`}>{surface ? 'Stimulation contacts lie on the skin above a motor nerve. A separate active recording electrode lies over the muscle belly; a distal reference lies beyond it. Their leads terminate at independent inputs of a differential amplifier, whose output supplies the CMAP recording.' : 'A needle crosses the skin into skeletal muscle. The highlighted region indicates local electrical sampling, rather than an electrode within the synaptic cleft.'} Electrode placement and tissue dimensions are explanatory, not a procedural prescription or patient measurement.</desc>
    <defs>
      <linearGradient id={`${id}-skin`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#F7E6DE" /><stop offset="1" stopColor="#EDD1C5" /></linearGradient>
      <linearGradient id={`${id}-fiber`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#EAC0B7" /><stop offset=".5" stopColor="#DFA2A0" /><stop offset="1" stopColor="#E8B7B0" /></linearGradient>
      <clipPath id={`${id}-muscle`}><path d="M74 174 C150 148 373 153 463 173 L515 184 L465 222 C346 244 172 238 81 222Z" /></clipPath>
    </defs>
    <g aria-hidden="true">
      <path d="M33 108 C145 98 436 100 568 110 L568 145 C420 134 167 135 33 145Z" fill={`url(#${id}-skin)`} stroke="#BEA295" strokeWidth="1.5" />
      <path d="M33 108 C145 98 436 100 568 110" fill="none" stroke="#9C796D" strokeWidth="2" />
      <path d="M42 149 C177 139 421 140 564 151 L564 257 C391 267 175 266 42 253Z" fill="#F8F3EE" stroke="#DED1C7" strokeWidth="1" />
      <path d="M74 174 C150 148 373 153 463 173 L515 184 L465 222 C346 244 172 238 81 222Z" fill={`url(#${id}-fiber)`} stroke="#AA7680" strokeWidth="1.6" />
      <g clipPath={`url(#${id}-muscle)`} fill="none">
        {[176, 191, 206, 221].map(y => <path key={y} d={`M66 ${y} C180 ${y - 14} 358 ${y - 10} 475 ${y + 1}`} stroke="#F6DED6" strokeWidth="3" />)}
        {Array.from({ length: 33 }, (_, index) => <path key={index} d={`M${88 + index * 12} 151 L${93 + index * 12} 242`} stroke="#B56F7B" strokeWidth=".8" opacity=".55" />)}
      </g>
      <path d="M464 174 C498 176 529 178 551 187 L552 209 C525 212 493 218 465 222 L515 184Z" fill="#E9E0D3" stroke="#BFB5A6" strokeWidth="1.2" />
      <g fill="#B9A0CC" stroke="#8C739E" strokeWidth="1"><ellipse cx="164" cy="164" rx="9" ry="3.5" /><ellipse cx="384" cy="170" rx="9" ry="3.5" /><ellipse cx="212" cy="231" rx="9" ry="3.5" /></g>
      {surface ? <>
        <path d="M45 143 C102 137 145 142 185 151 L218 174 M165 147 L197 192 M185 151 L235 205" fill="none" stroke="#839EB8" strokeWidth="7" strokeLinecap="round" />
        <path d="M45 143 C102 137 145 142 185 151 L218 174 M165 147 L197 192 M185 151 L235 205" fill="none" stroke="#B9D0DE" strokeWidth="3" strokeLinecap="round" />
        <path d="M204 174 l6 3 l9 -3 M185 192 l8 3 l9 -3 M221 205 l7 3 l10 -4" fill="none" stroke="#7B98AF" strokeWidth="2" />
        <path d="M80 94 V106 M112 93 V105" stroke="#647A8A" strokeWidth="8" />
        <path d="M80 94 V78 H112 V93" stroke="#647A8A" strokeWidth="2" fill="none" />
        <rect x="324" y="94" width="35" height="11" rx="4" fill="#83A9C7" stroke="#526F88" strokeWidth="1.4" />
        <rect x="502" y="98" width="35" height="11" rx="4" fill="#A8C5D5" stroke="#526F88" strokeWidth="1.4" />
        <path d="M341 94 V57 H405 M519 98 V69 H480" fill="none" stroke="#647A8A" strokeWidth="1.8" />
        <rect x="405" y="45" width="75" height="38" rx="3" fill="#E5F1EC" stroke="#647A8A" strokeWidth="1.3" />
        <text x="411" y="62" fontSize="12">−</text><text x="468" y="74" fontSize="12">+</text>
        <text x="443" y="61" textAnchor="middle" fontSize="12">Diff.</text><text x="443" y="75" textAnchor="middle" fontSize="12">amp.</text>
        <path d="M443 45 V20 H470" fill="none" stroke="#647A8A" strokeWidth="1.4" />
        <text x="477" y="25" fontSize="13">CMAP</text>
        <path d="M95 70 V46 H45 M341 60 V30 H276 M519 93 V51 H563" fill="none" stroke="#58636A" strokeWidth="1" />
        <circle cx="95" cy="78" r="3" fill="#2C3439" /><circle cx="341" cy="94" r="3" fill="#2C3439" /><circle cx="519" cy="99" r="3" fill="#2C3439" />
        <text x="36" y="35">Stimulate nerve</text><text x="273" y="24">Record muscle</text><text x="563" y="42" textAnchor="end">Reference</text>
      </> : <>
        <path d="M408 43 L289 191" stroke="#667B86" strokeWidth="7" strokeLinecap="round" />
        <path d="M407 42 L291 187" stroke="#D7E1E3" strokeWidth="3" strokeLinecap="round" />
        <path d="M289 191 L283 202 L287 188Z" fill="#465A64" />
        <path d="M407 43 L423 25" stroke="#8097A4" strokeWidth="12" strokeLinecap="round" />
        <path d="M420 27 Q450 12 480 28" fill="none" stroke="#667B86" strokeWidth="2" />
        <ellipse cx="283" cy="199" rx={modality === 'sfemg' ? '20' : '37'} ry={modality === 'sfemg' ? '23' : '30'} fill="#DDEFEA" fillOpacity=".55" stroke="#678C85" strokeWidth="1.5" strokeDasharray="4 4" />
        {modality === 'sfemg' && <><circle cx="272" cy="188" r="3.6" fill="#716089" /><circle cx="287" cy="208" r="3.6" fill="#716089" /></>}
        <path d="M378 77 H313 V45 H222 M260 199 H188 V260 H75" fill="none" stroke="#58636A" strokeWidth="1" />
        <circle cx="378" cy="77" r="3" fill="#2C3439" /><circle cx="260" cy="199" r="3" fill="#2C3439" />
        <text x="36" y="37">Intramuscular electrode</text><text x="74" y="283">{modality === 'sfemg' ? 'Nearby fiber potentials' : 'Local motor-unit sampling'}</text>
      </>}
      <text x="35" y="305" className="procedure-sampling-note">Placement schematic · not to scale</text>
    </g>
  </svg>;
}

export function ElectrophysiologyProcedure({ modality }: Props) {
  const procedure = procedures[modality];
  return <section className="electrophysiology-procedure" aria-label="Anatomical basis of the selected recording" data-procedure={modality}>
    <div className="procedure-editorial-heading"><span>ANATOMY → RECORDING → INTERPRETATION</span><h4>{procedure.title}</h4></div>
    <div className="procedure-editorial-grid">
      <figure className="procedure-motor-unit"><MedicalArtwork illustration={procedure.illustration} /><figcaption>A motor axon activates muscle fibers through their endplates. Conceptual tissue illustration; fiber counts and distances are illustrative.</figcaption></figure>
      <div className="procedure-sampling-panel"><span className="procedure-recording-label">{procedure.recording}</span><SamplingSetup modality={modality} /><ul className="procedure-reading-key">{procedure.labels.map((label, index) => <li key={label}><span aria-hidden="true">{index + 1}</span>{label}</li>)}</ul></div>
    </div>
    <div className="procedure-explanation"><p>{procedure.description}</p><p><strong>Evidence boundary:</strong> {procedure.boundary}</p></div>
  </section>;
}
