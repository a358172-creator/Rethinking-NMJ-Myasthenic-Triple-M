import { useId } from 'react';
import type { PhenotypeRegion } from './PhenotypeFigure';
import './PhenotypeMuscleDetail.css';

type MuscleDetail = {
  title: string;
  orientation?: string;
  muscles: { name: string; detail: string }[];
  note: string;
  sources: { label: string; href: string }[];
};

const details: Record<PhenotypeRegion, MuscleDetail> = {
  ocular: {
    title: 'Extraocular and eyelid muscles',
    orientation: 'Orbital cutaway · anterior to the right · schematic, not to scale',
    muscles: [
      { name: 'Rectus muscles', detail: 'Superior, inferior, medial and lateral rectus move the globe.' },
      { name: 'Oblique muscles', detail: 'Superior and inferior oblique follow different courses around the globe.' },
      { name: 'Levator palpebrae superioris', detail: 'Elevates the upper eyelid; it does not insert into the globe.' },
    ],
    note: 'The surface eye markers locate this deeper orbital compartment. The inset separates the muscle paths for clarity; it is not a single dissection plane.',
    sources: [{ label: 'Extraocular anatomy', href: 'https://www.ncbi.nlm.nih.gov/books/NBK519565/' }],
  },
  bulbar: {
    title: 'Bulbar muscle groups',
    orientation: 'Sagittal cutaway · anterior to the left · schematic, not to scale',
    muscles: [
      { name: 'Tongue muscles', detail: 'Intrinsic and extrinsic muscles shape and position the tongue.' },
      { name: 'Soft-palate muscles', detail: 'Muscular palate, including levator veli palatini and the palatal arches.' },
      { name: 'Pharyngeal constrictors', detail: 'Superior, middle and inferior constrictors form the outer muscular pharyngeal wall.' },
    ],
    note: 'These deep muscles are distinct from the superficial facial muscles. The bulbar category also includes laryngeal muscles, which are not individually drawn here.',
    sources: [
      { label: 'Pharyngeal anatomy', href: 'https://www.ncbi.nlm.nih.gov/books/NBK54279/' },
      { label: 'Soft-palate anatomy', href: 'https://www.ncbi.nlm.nih.gov/books/NBK557817/' },
    ],
  },
  cervical: {
    title: 'Cervical muscle groups',
    muscles: [
      { name: 'Anterior neck', detail: 'Sternocleidomastoid, with the deeper longus colli and longus capitis.' },
      { name: 'Posterior neck', detail: 'Splenius, semispinalis and other cervical extensor muscles.' },
    ],
    note: 'The atlas emphasizes visible neck muscles. Deep flexors and extensors are not all exposed in the surface views.',
    sources: [{ label: 'Cervical muscle anatomy', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5972401/' }],
  },
  proximal: {
    title: 'Proximal muscle groups',
    muscles: [
      { name: 'Shoulder and upper arm', detail: 'Deltoid, biceps brachii and triceps brachii in the corresponding surface views.' },
      { name: 'Hip and thigh', detail: 'Gluteal muscles, quadriceps femoris and hamstrings.' },
    ],
    note: 'The highlighted muscle contours are anatomical examples of the proximal distribution, rather than a patient-specific injury map.',
    sources: [{ label: 'Thigh muscle anatomy', href: 'https://www.ncbi.nlm.nih.gov/books/NBK500008/' }],
  },
  respiratory: {
    title: 'Diaphragm and intercostal muscles',
    orientation: 'Anterior thoracic cutaway · schematic, not to scale',
    muscles: [
      { name: 'Diaphragm', detail: 'The muscular domes surround a pale central tendon below the lungs.' },
      { name: 'Intercostal muscles', detail: 'Muscular layers occupy the spaces between adjacent ribs.' },
    ],
    note: 'Ribs and lungs are subdued to expose the respiratory muscles. The heart is not a respiratory muscle; this illustration does not measure breathing function.',
    sources: [{ label: 'Thoracic wall and diaphragm', href: 'https://www.ncbi.nlm.nih.gov/books/NBK526023/' }],
  },
};

function MuscleMarker({ x, y, number }: { x: number; y: number; number: number }) {
  return <g className="phenotype-muscle-detail-marker" aria-hidden="true">
    <circle cx={x} cy={y} r="16" />
    <text x={x} y={y} textAnchor="middle" dominantBaseline="central">{number}</text>
  </g>;
}

function OcularMuscles() {
  return <>
    <g className="phenotype-muscle-detail-context">
      <path className="phenotype-muscle-detail-bone" d="M64 162 Q85 73 230 48 Q335 28 406 85 L414 105 Q331 58 235 76 Q117 89 82 166Z M76 195 Q159 274 292 272 Q369 268 412 224 L409 247 Q329 309 217 284 Q110 265 64 205Z" />
      <path className="phenotype-muscle-detail-tissue" d="M73 151 Q148 155 229 166 L234 188 Q155 190 72 189Z" />
      <circle className="phenotype-muscle-detail-globe" cx="305" cy="178" r="73" />
      <path className="phenotype-muscle-detail-cornea" d="M364 136 Q401 177 364 219 Q377 179 364 136Z" />
      <path className="phenotype-muscle-detail-context-line" d="M373 151 Q365 178 374 204 M234 173 L81 172" />
    </g>
    <g className="phenotype-muscle-detail-selected" data-highlighted-muscle="rectus-muscles">
      <path d="M83 147 Q180 105 298 106 Q333 106 352 130 L344 142 Q322 120 299 122 Q179 120 88 167Z M86 190 Q188 234 300 234 Q330 234 350 213 L342 202 Q320 221 298 220 Q184 215 89 177Z" />
      <path d="M86 161 Q196 144 285 150 L345 161 L346 174 L283 169 Q189 163 86 181Z" />
      <path className="phenotype-muscle-detail-hidden-muscle" d="M91 183 Q201 188 291 184 L347 179" />
      <path className="phenotype-muscle-detail-fibers" d="M104 151 Q213 115 317 117 M104 191 Q210 230 320 226 M107 167 Q218 153 317 164" />
    </g>
    <g className="phenotype-muscle-detail-selected phenotype-muscle-detail-selected--secondary" data-highlighted-muscle="oblique-muscles">
      <path d="M84 126 Q208 70 357 79 L358 91 Q215 85 89 143Z M354 89 Q346 101 319 114 L304 108 Q333 95 345 87Z M370 230 Q345 256 303 247 L285 232 L297 224 Q330 247 361 220Z" />
      <path className="phenotype-muscle-detail-fibers" d="M103 127 Q231 79 345 84 M303 233 Q337 250 365 226" />
      <circle className="phenotype-muscle-detail-trochlea" cx="357" cy="84" r="7" />
    </g>
    <g className="phenotype-muscle-detail-selected" data-highlighted-muscle="levator-palpebrae-superioris">
      <path d="M84 105 Q207 45 336 66 Q369 72 390 114 L378 122 Q359 87 331 82 Q207 63 90 121Z" />
      <path className="phenotype-muscle-detail-tendon" d="M378 113 Q389 130 386 151 L375 153 Q377 132 367 118Z" />
      <path className="phenotype-muscle-detail-fibers" d="M105 105 Q232 56 335 74" />
    </g>
    <MuscleMarker x={198} y={166} number={1} />
    <MuscleMarker x={326} y={247} number={2} />
    <MuscleMarker x={229} y={68} number={3} />
  </>;
}

function BulbarMuscles() {
  return <>
    <g className="phenotype-muscle-detail-context">
      <path className="phenotype-muscle-detail-tissue" d="M189 29 Q136 41 135 101 L121 130 L100 145 L120 156 L124 178 L115 185 L126 197 L132 224 Q140 251 178 254 L199 299 L191 335 L334 335 L317 263 Q330 223 340 184 Q369 118 327 63 Q280 9 189 29Z" />
      <path className="phenotype-muscle-detail-airway" d="M154 117 Q196 98 252 117 L275 131 L296 141 L298 216 L288 259 L300 335 L278 335 L263 273 L264 235 L246 212 L157 207 L141 183 L156 165 L240 151 L250 135 L161 141Z" />
      <path className="phenotype-muscle-detail-bone" d="M140 150 L245 146 L247 157 L141 161Z M147 217 Q177 236 217 224 L226 234 Q178 257 146 235Z" />
      <path className="phenotype-muscle-detail-bone" d="M327 149 L347 151 L342 179 L323 178Z M321 186 L340 188 L335 215 L317 213Z M316 222 L334 225 L329 252 L310 248Z M311 259 L329 262 L329 290 L311 287Z M315 297 L333 300 L339 327 L320 327Z" />
      <path className="phenotype-muscle-detail-cartilage" d="M255 249 Q273 247 286 263 L283 286 L267 296 L251 282Z M266 298 L286 296 L295 335 L276 335Z" />
      <path className="phenotype-muscle-detail-context-line" d="M273 305 L288 303 M274 315 L290 313 M277 325 L292 323 M258 248 Q251 231 260 226 Q275 234 273 250" />
    </g>
    <g className="phenotype-muscle-detail-selected" data-highlighted-muscle="tongue-muscles">
      <path d="M153 197 Q173 175 208 184 Q240 188 256 214 Q269 233 250 247 Q226 259 198 241 L166 231 L147 217Z" />
      <path className="phenotype-muscle-detail-fibers" d="M160 202 Q208 188 250 224 M157 210 Q208 199 252 231 M160 219 Q201 215 246 238 M177 230 Q187 211 204 191 M189 236 Q200 217 220 199 M203 242 Q216 224 233 211" />
    </g>
    <g className="phenotype-muscle-detail-selected phenotype-muscle-detail-selected--secondary" data-highlighted-muscle="soft-palate-muscles">
      <path d="M243 147 Q273 149 284 168 Q287 185 276 193 Q267 190 272 179 Q270 165 242 161Z M272 180 Q263 199 254 213 L247 207 L264 177Z" />
      <path className="phenotype-muscle-detail-fibers" d="M249 153 Q278 155 278 181 M269 186 L253 207" />
    </g>
    <g className="phenotype-muscle-detail-selected" data-highlighted-muscle="pharyngeal-constrictors">
      <path d="M296 132 Q317 134 323 147 L318 187 Q306 193 296 184 L301 157Z M300 177 Q315 174 319 186 L316 226 Q305 236 295 224 L299 202Z M296 217 Q311 213 317 227 L313 271 L304 288 L294 273 L298 249Z" />
      <path className="phenotype-muscle-detail-fibers" d="M301 145 L319 150 M302 156 L318 161 M301 168 L317 173 M301 189 L315 194 M300 201 L315 207 M299 215 L315 219 M300 233 L313 239 M299 247 L312 253 M300 261 L309 267" />
    </g>
    <MuscleMarker x={209} y={215} number={1} />
    <MuscleMarker x={275} y={164} number={2} />
    <MuscleMarker x={309} y={221} number={3} />
  </>;
}

const ribs = [
  'M222 84 Q162 65 137 102 Q127 119 139 132 L218 109',
  'M222 109 Q153 93 126 132 Q116 150 131 161 L219 134',
  'M222 134 Q147 120 120 161 Q112 178 127 190 L219 160',
  'M222 160 Q144 147 117 190 Q113 207 128 217 L219 187',
  'M222 187 Q145 174 119 217 Q117 235 133 243 L219 214',
];

function RespiratoryMuscles() {
  return <>
    <g className="phenotype-muscle-detail-context">
      <path className="phenotype-muscle-detail-lung" d="M202 78 Q166 80 149 127 Q126 179 146 231 Q165 246 206 225 L216 189 L211 100Z M279 78 Q318 83 334 129 Q355 184 334 237 Q308 244 277 220 L266 186 L271 102Z" />
      <path className="phenotype-muscle-detail-cartilage" d="M230 76 L249 76 L250 180 L242 201 L230 180Z" />
    </g>
    <g className="phenotype-muscle-detail-selected" data-highlighted-muscle="intercostal-muscles">
      <path d="M140 123 Q129 135 131 149 L188 133 L187 121Z M130 152 Q120 165 125 179 L183 161 L184 149Z M125 181 Q116 195 128 207 L183 189 L183 176Z M128 210 Q121 224 133 233 L186 215 L184 203Z" />
      <g transform="translate(480 0) scale(-1 1)">
        <path d="M140 123 Q129 135 131 149 L188 133 L187 121Z M130 152 Q120 165 125 179 L183 161 L184 149Z M125 181 Q116 195 128 207 L183 189 L183 176Z M128 210 Q121 224 133 233 L186 215 L184 203Z" />
      </g>
      <path className="phenotype-muscle-detail-fibers" d="M142 133 L151 143 M154 129 L163 139 M168 126 L176 135 M134 161 L144 173 M149 157 L159 168 M165 152 L175 163 M133 192 L144 202 M149 187 L159 197 M164 181 L175 191 M137 218 L148 227 M153 212 L163 222 M169 207 L179 216" />
    </g>
    <g className="phenotype-muscle-detail-context">
      {ribs.map((d, index) => <path key={index} className="phenotype-muscle-detail-rib" d={d} />)}
      <g transform="translate(480 0) scale(-1 1)">{ribs.map((d, index) => <path key={index} className="phenotype-muscle-detail-rib" d={d} />)}</g>
    </g>
    <g className="phenotype-muscle-detail-selected" data-highlighted-muscle="diaphragm">
      <path d="M116 271 Q137 212 177 208 Q214 203 241 243 Q263 218 301 220 Q346 224 366 279 L353 293 Q336 248 300 245 Q268 241 243 266 Q215 234 181 233 Q148 236 130 287Z" />
      <path className="phenotype-muscle-detail-tendon" d="M218 227 Q232 233 242 247 Q258 230 275 232 L284 247 Q260 251 244 267 Q232 250 209 244Z" />
      <path className="phenotype-muscle-detail-fibers" d="M132 268 Q153 225 179 220 M148 276 Q160 239 192 225 M168 265 Q176 241 207 234 M285 235 Q330 234 348 278 M281 245 Q319 245 333 286 M294 257 Q313 261 319 282" />
    </g>
    <MuscleMarker x={180} y={224} number={1} />
    <MuscleMarker x={327} y={158} number={2} />
  </>;
}

/** Selected anatomical examples, separate from cohort observations or diagnosis. */
export function PhenotypeMuscleDetail({ selected }: { selected: PhenotypeRegion }) {
  const id = useId();
  const detail = details[selected];
  const hasInset = selected === 'ocular' || selected === 'bulbar' || selected === 'respiratory';
  return <div className={`phenotype-muscle-detail${hasInset ? ' has-inset' : ''}`} data-deep-anatomy={selected} role="group" aria-labelledby={`${id}-heading`}>
    <div className="phenotype-muscle-detail-heading">
      <h4 id={`${id}-heading`}>{detail.title}</h4>
      {detail.orientation && <p>{detail.orientation}</p>}
    </div>
    <div className="phenotype-muscle-detail-body">
      {hasInset && <svg className="phenotype-muscle-detail-drawing" viewBox={selected === 'bulbar' ? '0 0 480 360' : '0 0 480 320'} role="img" aria-labelledby={`${id}-title ${id}-description`}>
        <title id={`${id}-title`}>{detail.title}: selected muscles highlighted</title>
        <desc id={`${id}-description`}>Selected muscle groups are shown in salmon and muted teal. Surrounding anatomy is partially transparent. Numbered markers correspond to the muscle names alongside the drawing.</desc>
        {selected === 'ocular' ? <OcularMuscles /> : selected === 'bulbar' ? <BulbarMuscles /> : <RespiratoryMuscles />}
      </svg>}
      <ol className="phenotype-muscle-detail-key">
        {detail.muscles.map((muscle, index) => <li key={muscle.name}>
          <span className="phenotype-muscle-detail-number" aria-hidden="true">{index + 1}</span>
          <div><strong>{muscle.name}</strong><p>{muscle.detail}</p></div>
        </li>)}
      </ol>
    </div>
    <p className="phenotype-muscle-detail-note">{detail.note}</p>
    <p className="phenotype-muscle-detail-sources">Anatomical basis: {detail.sources.map((source, index) => <span key={source.href}>{index > 0 && ' · '}<a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></span>)}</p>
  </div>;
}
