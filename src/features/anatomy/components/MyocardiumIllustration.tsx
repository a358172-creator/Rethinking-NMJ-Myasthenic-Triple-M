import { useId, useState, type KeyboardEvent } from 'react'
import { MedicalArtwork } from '../../../components/figures/MedicalArtwork'
import { cardiacAnatomySources, cardiacChambers, myocardialRegions } from '../data/heartModel'
import type { MyocardialRegion, MyocardialState } from '../data/heartModel'
import '../styles/myocardium.css'

export type { MyocardialRegion, MyocardialState } from '../data/heartModel'
interface MyocardiumProps { state?: MyocardialState; highlight?: MyocardialRegion; showConduction?: boolean; labels?: boolean; compact?: boolean; onSelect?: (region: MyocardialRegion) => void }
const stateCopy = {
  normal: 'Established anatomy: the anterior view shows atrial and ventricular surfaces, coronary vessels and a limited window into the left ventricle. A separate section explains internal relationships; it is not the same cutting plane.',
  injury: 'Literature-informed concept: a bounded area of the ventricular wall links the organ view to an enlarged tissue example. Its location and extent are illustrative, not the distribution of disease in a patient or in the N=38 cohort.',
}

/** Hidden internal anatomy is explained in a separate section, never projected onto the epicardium. */
function CardiacSection({ selected, showConduction }: { selected?: MyocardialRegion; showConduction: boolean }) {
  const id = useId().replace(/:/g, '')
  return <div className="cardiac-section-inset">
    <div className="cardiac-section-title"><strong>Internal relationships</strong><span>Separate frontal section · schematic cutting plane</span></div>
    <svg viewBox="0 0 520 400" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>{showConduction ? 'Normal cardiac conduction in a separate heart section' : 'Ventricular septum in a separate heart section'}</title>
      <desc id={`${id}-desc`}>Anatomical right appears on the left. The left ventricular wall is thicker and the intact muscular septum separates the ventricles. {showConduction && 'The sinoatrial node lies in the upper right atrium, the atrioventricular node at its septal base; the His bundle divides into bundle branches along the ventricular septum.'} This is an explanatory section, not an electrical recording or inflammation map.</desc>
      <defs><linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#F2D2CF" /><stop offset="1" stopColor="#DFA2A0" /></linearGradient></defs>
      <path d="M118 44 C87 41 60 65 61 105 C47 146 62 207 97 254 C135 306 199 350 278 380 C299 386 322 373 344 350 C411 282 435 201 406 140 C421 99 397 55 366 50 C329 34 297 49 278 73 C244 49 210 49 186 67 C163 48 140 41 118 44Z" fill={`url(#${id}-wall)`} stroke="#BB6974" strokeWidth="2" />
      <path d="M89 73 C106 52 142 53 164 71 C184 86 196 110 187 136 C154 146 116 143 87 128 C73 108 74 88 89 73Z" fill="#C9DCE8" stroke="#83A9C7" strokeWidth="2" />
      <path d="M296 80 C314 55 348 53 370 68 C390 82 393 108 380 128 C355 140 323 143 292 132 C283 111 285 96 296 80Z" fill="#EDC5C3" stroke="#BB6974" strokeWidth="2" />
      <path d="M96 162 C77 194 112 247 145 277 C177 306 204 325 235 337 C210 302 201 263 201 226 C201 197 206 175 210 155 C171 147 126 148 96 162Z" fill="#DDE8ED" stroke="#83A9C7" strokeWidth="2" />
      <path d="M283 153 C272 185 272 225 283 263 C292 296 305 321 320 338 C347 305 366 265 374 230 C381 198 375 171 360 153 C337 146 309 145 283 153Z" fill="#F8E7E3" stroke="#BB6974" strokeWidth="2" />
      <path className={selected === 'septum' ? 'cardiac-section-septum is-selected' : 'cardiac-section-septum'} d="M223 142 C209 178 206 217 215 257 C222 290 236 322 260 350 L304 368 C278 334 263 300 256 262 C249 224 252 186 269 147Z" fill={selected === 'septum' ? '#BB6974' : '#E7B8B5'} stroke="#A85F6D" strokeWidth={selected === 'septum' ? 4 : 1.5} />
      <g fill="#FAF4E8" stroke="#A78682" strokeWidth="1.5"><path d="M96 156 Q128 140 149 151 L156 185Z M157 151 Q184 143 206 153 L184 188Z" /><path d="M285 149 Q306 139 322 148 L327 184Z M329 148 Q346 140 360 151 L344 183Z" /></g>
      <g stroke="#BA9290" strokeWidth="1.3" fill="none"><path d="M132 172 L146 239 L152 180 M178 180 L187 244 L194 169 M311 173 L312 246 L322 179 M340 176 L350 242 L352 167" /><path d="M97 203 Q116 205 127 229 T163 275 M107 231 Q129 230 142 251 T189 306 M371 210 Q352 223 350 250 M365 248 Q343 259 339 289" /></g>
      <g fill="#2C3439" fontSize="22" fontWeight="600" textAnchor="middle"><text x="135" y="105">RA</text><text x="150" y="216">RV</text><text x="336" y="107">LA</text><text x="329" y="219">LV</text></g>
      {showConduction && <g className="myocardium-conduction" fill="none" stroke="#8C6846" strokeLinecap="round" strokeLinejoin="round"><path d="M94 70 C125 76 161 95 190 128 L210 148 L233 164 L238 202" strokeWidth="4" strokeDasharray="7 6" /><path d="M238 202 C217 228 214 269 238 311 M238 202 C256 248 267 292 303 340" strokeWidth="4" /><path d="M224 258 Q193 264 155 234 M229 292 Q201 291 177 275 M278 309 Q314 302 340 271 M265 276 Q303 271 346 238" strokeWidth="2.8" /><circle cx="94" cy="70" r="8" fill="#BD8A42" stroke="#FAFBFA" strokeWidth="2" /><circle cx="210" cy="148" r="7" fill="#BD8A42" stroke="#FAFBFA" strokeWidth="2" /><g fill="#6C5033" stroke="none" fontSize="17" fontWeight="600"><text x="64" y="62">SA</text><text x="177" y="148">AV</text></g></g>}
    </svg>
    <p>{showConduction ? 'Normal activation: SA node → atrial tissue → AV node → His–Purkinje system. Lines indicate sequence, not conduction velocity or a lesion.' : 'The interventricular septum is an internal muscular partition. It cannot be inspected directly in the anterior coronary view above.'}</p>
  </div>
}

/** Detailed editorial plate with calibrated overlays and independently editable labels. */
export function MyocardiumIllustration({ state = 'normal', highlight, showConduction = false, labels = true, compact = false, onSelect }: MyocardiumProps) {
  const activate = (event: KeyboardEvent<SVGGElement>) => { if (onSelect && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); onSelect('myocardium') } }
  const numbered = labels && !compact
  const wall = 'M946 568 C1058 592 1168 723 1159 912 C1156 967 1138 1002 1096 1008 C1037 1010 974 979 937 929 C1007 943 1005 850 973 775 C953 718 934 630 946 568Z'
  return <div className={`myocardium-illustration myocardium-illustration--${state}`} data-myocardium-state={state}>
    <div className="myocardium-artwork-frame"><MedicalArtwork illustration={state === 'injury' ? 'heart-injury' : 'heart-normal'} />
      <svg className="cardiac-artwork-overlay" viewBox="0 0 1536 1024" role={onSelect ? 'group' : 'img'} aria-label="Cardiac anatomical landmarks and conceptual injury marker">
        <g className={`cardiac-wall-target${highlight === 'myocardium' ? ' is-selected' : ''}`} {...(onSelect ? { role: 'button', tabIndex: 0, 'aria-label': 'Select ventricular wall in illustration', 'aria-pressed': highlight === 'myocardium', onClick: () => onSelect('myocardium'), onKeyDown: activate } : {})}><path className="cardiac-wall-outline" d={wall} /><path d={wall} fill="transparent" /></g>
        {state === 'injury' && <g className="myocardium-injury-focus"><path d="M1041 771 Q1080 756 1103 788 L1114 831 Q1096 865 1065 850 L1038 821Z" fill="#BB6974" fillOpacity=".24" stroke="#93485A" strokeWidth="4" strokeDasharray="11 8" /><path d="M1098 807 L1260 807 L1300 750" fill="none" stroke="#93485A" strokeWidth="2.5" /><circle cx="1098" cy="807" r="7" fill="#93485A" /></g>}
        {numbered && <g className="cardiac-callout-lines" aria-hidden="true"><path d="M766 159 L1040 92 H1268 M1046 261 H1268 M936 559 L1240 557 M1062 887 L1240 929" /><circle cx="766" cy="159" r="7" /><circle cx="1046" cy="261" r="7" /><circle cx="936" cy="559" r="7" /><circle cx="1062" cy="887" r="7" />{[[1300,92,'1'],[1300,261,'2'],[1272,557,'3'],[1272,929,'4']].map(([x,y,n]) => <g key={n}><circle className="cardiac-callout-number" cx={x} cy={y} r="27" /><text x={x} y={Number(y)+10} textAnchor="middle">{n}</text></g>)}</g>}
      </svg>
    </div>
    {numbered && <div className="myocardium-artwork-caption"><span className="myocardium-artwork-state">{state === 'injury' ? 'Conceptual myocardial injury' : 'Anterior cardiac anatomy'}</span><ol className="cardiac-landmark-key"><li>Aorta</li><li>Pulmonary outflow</li><li>Coronary surface vessels</li><li>Ventricular myocardium</li></ol><p>Anterior coronary view with a limited left-ventricular window. Internal septal and conduction relationships are explained in a separate section.</p>{onSelect && <div className="myocardium-artwork-topics" role="group" aria-label="Cardiac anatomy topics">{myocardialRegions.map((item, index) => <button key={item.id} type="button" aria-label={`Inspect ${item.label}`} aria-pressed={highlight === item.id} onClick={() => onSelect(item.id)}><span aria-hidden="true">{index + 1}</span>{item.label}</button>)}</div>}</div>}
    {numbered && (highlight === 'septum' || highlight === 'conduction' || showConduction) && <CardiacSection selected={highlight} showConduction={showConduction} />}
  </div>
}
export function MyocardiumLayer(props: MyocardiumProps) { return <MyocardiumIllustration {...props} /> }
function CardiomyocyteInset({ state }: { state: MyocardialState }) { return <MedicalArtwork className="myocardium-tissue-inset" illustration={state === 'injury' ? 'cardiac-tissue-injury' : 'cardiac-tissue-normal'} /> }

export function MyocardiumExplorer() {
  const [state, setState] = useState<MyocardialState>('normal')
  const [highlight, setHighlight] = useState<MyocardialRegion>('myocardium')
  const [showConduction, setShowConduction] = useState(false)
  const region = myocardialRegions.find(item => item.id === highlight)!
  const id = useId()
  function selectRegion(next: MyocardialRegion) { setHighlight(next); if (next === 'conduction') setShowConduction(true) }
  return <div className="myocardium-explorer">
    <div className="myocardium-heading"><span className="eyebrow">CARDIAC TISSUE · ANATOMY AND POSSIBILITY</span><h3>Myocardium, coronary anatomy and conduction</h3><p>Explore the organ surface, then inspect internal relationships and cardiac tissue at a separate scale. A conceptual injury focus links these views without assigning a lesion to an individual patient.</p></div>
    <div className="myocardium-layout"><figure className="myocardium-figure"><MyocardiumIllustration state={state} highlight={highlight} showConduction={showConduction} onSelect={selectRegion} /><ul className="myocardium-chamber-key" aria-label="Cardiac chamber legend">{cardiacChambers.map(chamber => <li key={chamber.short}><b>{chamber.short}</b><span>{chamber.label}</span></li>)}</ul><figcaption>Conceptual editorial illustration. Anatomical right appears on the viewer’s left. The injury focus is illustrative; organ and tissue views are not patient images or cohort observations.</figcaption></figure>
      <div className="myocardium-controls"><div><span className="myocardium-control-label" id={`${id}-states`}>Conceptual tissue state</span><div className="myocardium-state-buttons" role="group" aria-labelledby={`${id}-states`}>{(['normal', 'injury'] as const).map(value => <button type="button" key={value} aria-pressed={state === value} onClick={() => setState(value)}>{value === 'normal' ? 'Normal myocardial tissue' : 'Conceptual myocardial injury'}</button>)}</div><p className="myocardium-state-description" aria-live="polite">{stateCopy[state]}</p></div>
        <div><span className="myocardium-control-label" id={`${id}-regions`}>Inspect anatomy</span><div className="myocardium-region-description" aria-live="polite"><h4>{region.label}</h4><p>{region.description}</p></div><label className="myocardium-overlay-toggle"><input type="checkbox" checked={showConduction} onChange={event => setShowConduction(event.target.checked)} /><span>Show normal activation sequence<br /><small>Separate cardiac section · SA and AV nodes</small></span></label></div>
        <div className="myocardium-conduction-note"><strong>Electrical instability and pump function are different dimensions.</strong>Preserved left ventricular ejection fraction does not exclude myocarditis. An arrhythmia or conduction disturbance does not, by itself, locate an inflammatory lesion or establish its cause.</div>
      </div>
    </div>
    <details className="myocardium-tissue-details"><summary>Explore the cardiomyocyte tissue inset</summary><div className="myocardium-tissue-body"><div><CardiomyocyteInset state={state} /><ul className="myocardium-tissue-key"><li>Branching cardiomyocytes</li><li>Central nuclei</li><li>Cell-to-cell junctions</li></ul></div><div className="myocardium-tissue-copy"><p>{state === 'normal' ? 'Cardiac muscle cells branch and connect at intercalated discs. Their striations reflect organized contractile units; nuclei lie centrally, unlike the peripheral nuclei of skeletal-muscle fibers.' : 'The conceptual tissue field depicts myocyte injury with adjacent inflammatory cells. This is an illustrative tissue mechanism reported in selected ICI-associated myocarditis pathology, not a diagnosis from a symptom, ECG or biomarker.'}</p><p>The enlarged tissue field is an explanatory illustration, not a micrograph. Its location, cell density and affected fraction are not measurements from the N=38 working cohort.</p></div></div></details>
    <div className="myocardium-figure-sources"><span>Anatomy and clinical context:</span>{cardiacAnatomySources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}</a>)}</div>
  </div>
}
