import { useId, useState, type KeyboardEvent } from 'react'
import { cardiacAnatomySources, cardiacChambers, myocardialRegions, myocardialStates } from '../data/heartModel'
import type { MyocardialRegion, MyocardialState } from '../data/heartModel'
import '../styles/myocardium.css'

export type { MyocardialRegion, MyocardialState } from '../data/heartModel'

interface MyocardiumProps {
  state?: MyocardialState
  highlight?: MyocardialRegion
  showConduction?: boolean
  labels?: boolean
  compact?: boolean
  onSelect?: (region: MyocardialRegion) => void
}

const outerWall = 'M114 141 C94 155 88 184 99 215 C83 250 95 296 121 335 C155 385 224 440 298 474 C309 479 323 473 335 464 C399 419 435 352 438 291 C441 248 426 215 404 194 C414 166 405 137 380 123 C352 107 316 115 295 136 C261 112 228 113 203 135 C177 117 140 120 114 141Z'
const rightVentricle = 'M128 240 C115 268 130 307 155 337 C182 369 211 392 250 414 C229 379 221 342 219 308 C218 280 221 251 226 232 C194 222 153 224 128 240Z'
const leftVentricle = 'M281 226 C272 256 272 290 279 328 C285 363 295 397 312 422 C338 399 362 362 375 327 C391 283 385 248 365 225 C336 216 305 217 281 226Z'
const septum = 'M237 207 C225 236 222 268 224 304 C225 349 240 397 270 431 L308 450 C287 413 274 375 267 335 C259 291 263 251 276 216Z'

/** Original oblique four-chamber cutaway in a 520 × 510 coordinate space.
 * Anatomical right is on the viewer's left; scale and cutting plane are schematic.
 * No interactive descendants are added unless a callback is explicitly supplied.
 */
export function MyocardiumLayer({ state = 'normal', highlight, showConduction = false, labels = true, compact = false, onSelect }: MyocardiumProps) {
  const id = useId().replace(/:/g, '')
  const injury = state === 'injury'
  const visibleLabels = labels && !compact
  const regionProps = (region: MyocardialRegion) => onSelect ? {
    role: 'button' as const, tabIndex: 0,
    'aria-label': `Inspect ${myocardialRegions.find(item => item.id === region)!.label}`,
    'aria-pressed': highlight === region,
    onClick: () => onSelect(region),
    onKeyDown: (event: KeyboardEvent<SVGGElement>) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(region) }
    },
  } : {}
  return <g className={`myocardium-layer myocardium-layer--${state}`}>
    <defs>
      <linearGradient id={`${id}-wall`} x1=".1" y1="0" x2=".85" y2="1">
        <stop offset="0" stopColor="#F0D8D4" /><stop offset=".4" stopColor="#DCB4B2" /><stop offset="1" stopColor="#B77986" />
      </linearGradient>
      <linearGradient id={`${id}-cut`} x1="0" y1=".5" x2="1" y2=".3">
        <stop offset="0" stopColor="#F2DCDA" /><stop offset=".55" stopColor="#D9A7AC" /><stop offset="1" stopColor="#C38B96" />
      </linearGradient>
      <linearGradient id={`${id}-cavity`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#DDE7E9" /><stop offset=".35" stopColor="#F7F8F4" /><stop offset="1" stopColor="#E5E8DE" />
      </linearGradient>
      <linearGradient id={`${id}-artery`} x1="0" x2="1">
        <stop offset="0" stopColor="#B77C86" /><stop offset=".5" stopColor="#F0D4CE" /><stop offset="1" stopColor="#C68D95" />
      </linearGradient>
      <linearGradient id={`${id}-vein`} x1="0" x2="1">
        <stop offset="0" stopColor="#8CA7B6" /><stop offset=".5" stopColor="#D7E4E6" /><stop offset="1" stopColor="#9FB8C1" />
      </linearGradient>
      <pattern id={`${id}-cut-lines`} width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(-34)">
        <path d="M0 0V11" stroke="#93485A" strokeWidth="1" opacity=".18" />
      </pattern>
      <clipPath id={`${id}-outer`}><path d={outerWall} /></clipPath>
      <clipPath id={`${id}-rv`}><path d={rightVentricle} /></clipPath>
      <clipPath id={`${id}-lv`}><path d={leftVentricle} /></clipPath>
    </defs>

    {/* The systemic outflow lies behind the anterior pulmonary trunk. */}
    <g stroke="#A26D7A" strokeWidth="1.7">
      <path d="M285 46 L281 15 L298 12 L304 40 M321 40 L329 13 L345 18 L338 49 M347 53 L367 28 L380 39 L362 67" fill={`url(#${id}-artery)`} />
      <path d="M253 195 L246 123 C239 83 254 48 281 37 C316 21 353 35 372 66 L388 103 L359 114 L346 83 C336 62 314 55 297 66 C282 76 279 96 283 117 L294 191Z" fill={`url(#${id}-artery)`} />
      <path d="M264 174 L259 121 C251 84 272 48 300 45" fill="none" stroke="#F6E6E1" strokeWidth="3" opacity=".8" />
      <ellipse cx="373" cy="109" rx="15.5" ry="6" transform="rotate(-21 373 109)" fill="#9A6171" />
    </g>
    {/* Caval and pulmonary venous openings enter the atria. */}
    <g fill={`url(#${id}-vein)`} stroke="#7895A5" strokeWidth="1.6">
      <path d="M126 146 L124 79 Q143 68 157 78 L160 144Z" />
      <ellipse cx="140.5" cy="78" rx="16.5" ry="6.2" fill="#819EAC" />
      <path d="M119 194 L104 251 Q114 260 132 255 L149 210Z" />
      <ellipse cx="117" cy="254" rx="15" ry="5" transform="rotate(9 117 254)" fill="#819EAC" />
    </g>
    <g fill={`url(#${id}-artery)`} stroke="#AA7581" strokeWidth="1.5">
      <path d="M375 144 L429 119 L439 136 L390 166Z M386 173 L447 163 L450 184 L392 195Z" />
      <ellipse cx="434" cy="128" rx="5" ry="10" transform="rotate(-29 434 128)" fill="#A16D7C" />
      <ellipse cx="448.5" cy="173.5" rx="4" ry="10.5" transform="rotate(-9 448.5 173.5)" fill="#A16D7C" />
    </g>

    <g className={onSelect ? 'myocardium-selectable' : undefined} {...regionProps('myocardium')}>
      <path className="myocardium-region" d={outerWall} fill={`url(#${id}-wall)`} stroke={highlight === 'myocardium' ? '#93485A' : '#A56D7B'} strokeWidth={highlight === 'myocardium' ? 3 : 1.7} />
      <path d={outerWall} fill={`url(#${id}-cut-lines)`} />
      {/* Outer fibre orientation and the curved cut surface establish volume. */}
      <g clipPath={`url(#${id}-outer)`} fill="none" stroke="#985B6D" strokeWidth="1.1" opacity=".35">
        <path d="M398 212 C438 308 386 405 308 463 M410 228 C431 318 387 406 321 457 M420 261 C429 331 397 398 345 442 M115 291 C146 364 229 432 294 459 M126 322 C167 383 233 428 284 448" />
        <path d="M395 253 l26 -8 M398 277 l28 -5 M396 302 l28 1 M389 327 l29 4 M379 352 l28 8 M368 374 l25 12 M354 397 l23 15 M337 419 l21 16" opacity=".58" />
      </g>
      <path d="M104 219 C94 270 132 335 177 372 M338 458 C398 411 431 340 429 285" fill="none" stroke="#F7EAE4" strokeWidth="3" opacity=".7" />
    </g>

    {/* Four cavities remain separated by tissue; there is no septal defect. */}
    <path d="M120 151 C140 132 175 134 195 153 C210 166 215 190 205 209 C183 222 149 222 123 208 C110 193 108 167 120 151Z" fill={`url(#${id}-cavity)`} stroke="#AD7C86" strokeWidth="2.1" />
    <path d="M300 147 C314 126 349 123 373 136 C393 148 398 174 384 193 C363 205 329 210 299 198 C289 183 291 162 300 147Z" fill={`url(#${id}-cavity)`} stroke="#AD7C86" strokeWidth="2.1" />
    <path d={rightVentricle} fill={`url(#${id}-cavity)`} stroke="#9F6978" strokeWidth="2.4" />
    <path d={leftVentricle} fill={`url(#${id}-cavity)`} stroke="#9F6978" strokeWidth="2.4" />
    <g clipPath={`url(#${id}-rv)`} fill="none" stroke="#B69091" strokeWidth="2.2" opacity=".62">
      <path d="M119 272 C143 289 137 315 161 332 S184 367 206 373 M125 301 Q151 299 166 328 T196 357 M142 332 Q164 328 178 351 T216 392 M200 246 Q190 285 208 316 M174 356 Q187 340 201 365" />
    </g>
    <g clipPath={`url(#${id}-lv)`} fill="none" stroke="#B69091" strokeWidth="1.8" opacity=".58">
      <path d="M282 298 Q291 321 287 344 M300 371 Q318 373 320 404 M348 362 Q330 370 326 392 M371 288 Q361 312 369 329 M360 339 Q348 341 340 367" />
    </g>
    <g className={onSelect ? 'myocardium-selectable' : undefined} {...regionProps('septum')}>
      <path className="myocardium-region" d={septum} fill={highlight === 'septum' ? '#B77B8B' : `url(#${id}-cut)`} stroke={highlight === 'septum' ? '#733548' : '#AB7784'} strokeWidth={highlight === 'septum' ? 3 : 1.3} />
      <path d={septum} fill={`url(#${id}-cut-lines)`} />
      <path d="M243 235 C235 298 243 368 280 429" fill="none" stroke="#F5DFD9" strokeWidth="2" opacity=".8" />
    </g>

    {/* AV leaflets, fine chordae and papillary muscles are distinct structures. */}
    <g fill="#F5F0DB" stroke="#9B9075" strokeWidth="1.4">
      <path d="M126 229 Q144 218 160 226 L169 258 Q147 250 126 229Z M168 225 Q195 218 218 227 L193 261 Q182 245 168 225Z" />
      <path d="M282 216 Q301 209 317 214 L326 249 Q303 241 282 216Z M329 213 Q351 210 367 218 L345 252 Q338 233 329 213Z" />
    </g>
    <g fill="none" stroke="#B4AA90" strokeWidth="1.2">
      <path d="M143 243 L159 296 L165 250 M152 249 L159 296 L181 249 M190 254 L197 300 L207 244 M183 249 L197 300 M304 234 L310 301 L322 245 M313 241 L310 301 M341 243 L351 301 L357 235 M345 249 L351 301" />
    </g>
    <g fill="#CBA39E" stroke="#A3767E" strokeWidth="1.2">
      <path d="M151 329 Q146 311 153 294 Q158 284 164 295 L171 340Z M190 341 Q184 321 191 300 Q196 289 201 301 L209 358Z" />
      <path d="M304 353 Q295 326 304 300 Q309 289 316 302 L324 374Z M344 352 Q342 320 347 301 Q352 291 356 301 L363 336Z" />
    </g>

    {/* Open outflow tracts and the anterior pulmonary trunk; no chordae on semilunar valves. */}
    <path d="M208 238 C198 210 187 183 193 150 C197 126 211 111 228 99 L244 123 C229 134 221 145 222 164 L235 225Z" fill={`url(#${id}-vein)`} stroke="#7895A5" strokeWidth="1.7" />
    <path d="M199 153 C189 133 170 122 153 118 L162 97 C191 102 212 116 220 139 M217 136 C243 111 286 109 321 117 L324 92 C277 80 233 87 211 109" fill={`url(#${id}-vein)`} stroke="#7895A5" strokeWidth="1.7" />
    <path d="M205 216 Q211 205 217 217 Q224 206 231 219" fill="#EBF0E3" stroke="#819A9F" strokeWidth="1.4" />
    <path d="M269 214 L260 178 L285 174 L297 218" fill={`url(#${id}-artery)`} stroke="#A26D7A" strokeWidth="1.6" />
    <path d="M265 192 Q272 183 277 192 Q283 183 290 190" fill="#F7E8DC" stroke="#A98B7A" strokeWidth="1.3" />
    <path d="M205 155 Q207 139 220 128" fill="none" stroke="#EAF1EF" strokeWidth="2.4" />

    {injury && <g className="myocardium-injury-focus" aria-hidden="true">
      <path d="M396 285 C409 282 421 294 418 310 C419 326 407 340 392 334 C382 327 382 315 386 305 C386 297 389 289 396 285Z" fill="#93485A" fillOpacity=".28" stroke="#733548" strokeWidth="1.7" strokeDasharray="4 3" />
      <path d="M393 299 l9 8 l-9 7 M407 310 l-9 11 M402 328 l5 -5" fill="none" stroke="#93485A" strokeWidth="2" />
      {visibleLabels && <g className="myocardium-direct-label"><path d="M419 313 H447 V333" fill="none" stroke="#93485A" strokeWidth="1.2" /><text x="448" y="347" textAnchor="middle" fill="#733548" fontSize="12" fontWeight="600">Focal injury</text></g>}
    </g>}

    {showConduction && <g className={onSelect ? 'myocardium-selectable myocardium-conduction' : 'myocardium-conduction'} {...regionProps('conduction')}>
      <path className="myocardium-region" d="M138 144 Q172 151 194 183 L213 211 L240 228 L250 273" fill="none" stroke={highlight === 'conduction' ? '#805720' : '#BD8A42'} strokeWidth="4" strokeLinecap="round" />
      <path d="M250 273 C230 297 224 328 232 362 L251 401 M250 273 C265 311 277 362 306 416" fill="none" stroke="#BD8A42" strokeWidth="3.3" strokeLinecap="round" />
      <g fill="none" stroke="#BD8A42" strokeWidth="2.1" strokeLinecap="round">
        <path d="M232 345 Q201 349 170 315 M237 370 Q207 374 185 351 M249 399 Q213 389 200 375 M291 392 Q316 390 338 365 M302 412 Q337 393 353 359 M274 353 Q306 357 328 331" />
        <path d="M170 315 l-10 -17 M170 315 l-19 -2 M185 351 l-15 -8 M338 365 l12 -17 M338 365 l15 -5 M328 331 l9 -16" />
      </g>
      <circle cx="138" cy="144" r="6.5" fill="#BD8A42" stroke="#FFF7E9" strokeWidth="2" />
      <circle cx="213" cy="211" r="6" fill="#BD8A42" stroke="#FFF7E9" strokeWidth="2" />
      {visibleLabels && <g fill="#805720" fontSize="12" fontWeight="650">
        <text className="myocardium-direct-label" x="108" y="140">SA</text><text className="myocardium-direct-label" x="193" y="199">AV</text>
      </g>}
    </g>}

    {visibleLabels && <g aria-hidden="true">
      <g fill="#243B53" fontSize="18" fontWeight="650" textAnchor="middle">
        <text x="161" y="182">RA</text><text x="176" y="287">RV</text>
        <text x="345" y="171">LA</text><text x="336" y="287">LV</text>
      </g>
      <g className="myocardium-direct-label" fill="#566879" fontSize="12">
        <path d="M323 42 L401 42" fill="none" stroke="#8B9AA4" strokeWidth="1" /><text x="407" y="46">Aorta</text>
        <path d="M193 123 L74 98" fill="none" stroke="#8B9AA4" strokeWidth="1" /><text x="20" y="85">Pulmonary</text><text x="20" y="100">outflow</text>
        <path d="M378 383 L426 402" fill="none" stroke="#8B9AA4" strokeWidth="1" /><text x="430" y="407">LV wall</text>
        <path d="M254 361 L202 435 H119" fill="none" stroke="#8B9AA4" strokeWidth="1" /><text x="64" y="440">Septum</text>
      </g>
      <text className="myocardium-direct-label" x="260" y="501" textAnchor="middle" fill="#687B89" fontSize="11">Oblique cutaway · anatomical right appears on the left</text>
    </g>}
  </g>
}

export function MyocardiumIllustration(props: MyocardiumProps) {
  const id = useId()
  const state = props.state ?? 'normal'
  return <svg className="myocardium-illustration" viewBox="0 0 520 510" xmlns="http://www.w3.org/2000/svg" role={props.onSelect ? 'group' : 'img'} aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{`${myocardialStates[state].label}: four-chamber cardiac cutaway`}</title>
    <desc id={`${id}-desc`}>Anatomical right is on the viewer’s left. Two atria connect to two ventricles through atrioventricular valves; the muscular septum separates the ventricles. The left ventricular wall is thicker. Aorta and pulmonary outflow are shown. {props.showConduction ? 'The amber overlay follows the sinoatrial node, atrioventricular node and His–Purkinje system.' : ''} {state === 'injury' ? 'A bounded area of the ventricular wall indicates hypothetical focal injury; it does not map disease in the study.' : ''} Original conceptual anatomy; not to scale.</desc>
    <MyocardiumLayer {...props} />
  </svg>
}

/** Separate tissue scale: branching cells with central nuclei and intercalated discs. */
function CardiomyocyteInset({ state }: { state: MyocardialState }) {
  const id = useId().replace(/:/g, '')
  const injury = state === 'injury'
  const fibers = [
    'M25 67 C89 65 121 67 166 58 L196 36 L245 41 L203 72 L294 77 L322 55 L377 60 L342 89 L508 100 L507 142 L336 129 L302 148 L254 143 L276 118 L184 111 L144 137 L103 129 L133 103 L25 111Z',
    'M22 173 L144 172 L177 148 L219 151 L192 183 L298 191 L325 166 L371 172 L346 204 L509 213 L508 252 L338 244 L305 267 L257 261 L284 233 L181 222 L149 249 L106 243 L132 212 L22 214Z',
  ]
  return <svg className="myocardium-tissue-inset" viewBox="0 0 540 300" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{injury ? 'Conceptual focal myocardial inflammation and myocyte injury' : 'Organized branching cardiomyocytes'}</title>
    <desc id={`${id}-desc`}>Two branching striated cardiac muscle fibers have central nuclei and transverse intercalated discs. {injury ? 'A focal interruption of the upper fiber is bordered by schematic tissue-associated inflammatory cells. This is a conceptual tissue mechanism, not a histological diagnosis or a cohort observation.' : 'The drawing emphasizes cellular organization rather than quantitative histological scale.'}</desc>
    <defs>
      <pattern id={`${id}-striae`} width="13" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(4)">
        <rect width="5" height="12" fill="#9A6271" opacity=".18" /><path d="M9 0V12" stroke="#9A6271" strokeWidth=".8" opacity=".55" />
      </pattern>
      <mask id={`${id}-injury`}><rect width="540" height="300" fill="white" /><path d="M277 66 Q288 89 307 92 L332 89 L348 78 L371 92 L370 117 L349 143 L322 131 L303 138 L287 121 L267 110Z" fill="black" /></mask>
    </defs>
    <rect x="7" y="16" width="526" height="269" rx="18" fill="#F5F2EC" />
    <g fill="none" stroke="#CFC8B8" strokeWidth="1" opacity=".7"><path d="M28 151 Q124 143 214 136 M218 160 Q371 145 509 167 M46 270 Q145 257 232 276 M27 43 Q121 24 151 40 M384 40 Q447 67 512 69" /></g>
    {fibers.map((path, index) => <g key={path} mask={injury && index === 0 ? `url(#${id}-injury)` : undefined}>
      <path d={path} fill="#DCB7B7" stroke="#A46F7F" strokeWidth="1.7" />
      <path d={path} fill={`url(#${id}-striae)`} />
      <path d={index === 0 ? 'M28 80 Q147 85 194 91 L506 116 M29 97 L145 95 M346 110 L501 125' : 'M25 188 L162 191 L506 228 M28 202 L175 205 L506 241'} fill="none" stroke="#F2DDD4" strokeWidth="2" opacity=".65" />
    </g>)}
    <g fill="#76566B" stroke="#F3DEDA" strokeWidth="1">
      {[[92,88],[234,96],[428,118],[88,195],[237,211],[436,234]].map(([x,y]) => <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="15" ry="6.3" transform={`rotate(4 ${x} ${y})`} />)}
    </g>
    <g fill="none" stroke="#805568" strokeWidth="2.3">
      <path d="M119 65 l-3 12 l5 5 l-4 12 l4 5 l-3 9 M251 75 l-2 11 l4 5 l-4 11 l4 5 l-2 8 M393 93 l-2 11 l3 5 l-3 11 l3 5 l-2 9 M118 173 l-3 10 l4 6 l-3 10 l4 6 l-3 10 M251 187 l-3 11 l4 5 l-3 11 l4 6 l-3 6 M393 208 l-3 11 l4 5 l-3 11 l4 6 l-3 6" />
    </g>
    {injury && <g>
      <path d="M276 73 Q289 94 309 100 L329 96 L350 91 L363 102 L355 122 L339 132 L321 123 L305 129 L288 112 L277 107Z" fill="#F1DBD3" stroke="#B07982" strokeWidth="1.5" />
      <path d="M286 101 l12 7 M313 109 l11 -4 M333 114 l12 2 M342 100 l6 4" stroke="#B07982" strokeWidth="2.4" />
      {[[286,66],[316,77],[349,69],[374,118],[331,144]].map(([x,y]) => <g key={`${x}-${y}`}>
        <circle cx={x} cy={y} r="11" fill="#DDC3CC" stroke="#93485A" strokeWidth="1.3" /><ellipse cx={x-1} cy={y} rx="7" ry="7.5" fill="#755269" />
      </g>)}
    </g>}
    <g aria-hidden="true" fill="#243B53" fontSize="12" fontWeight="650">
      <circle cx="95" cy="42" r="11" fill="white" stroke="#677A88" /><text x="95" y="46" textAnchor="middle">1</text><path d="M95 53V79" stroke="#677A88" strokeWidth="1" />
      <circle cx="234" cy="42" r="11" fill="white" stroke="#677A88" /><text x="234" y="46" textAnchor="middle">2</text><path d="M234 53V84" stroke="#677A88" strokeWidth="1" />
      <circle cx="406" cy="44" r="11" fill="white" stroke="#677A88" /><text x="406" y="48" textAnchor="middle">3</text><path d="M406 55L394 94" stroke="#677A88" strokeWidth="1" />
    </g>
  </svg>
}

export function MyocardiumExplorer() {
  const [state, setState] = useState<MyocardialState>('normal')
  const [highlight, setHighlight] = useState<MyocardialRegion>('myocardium')
  const [showConduction, setShowConduction] = useState(false)
  const region = myocardialRegions.find(item => item.id === highlight)!
  const id = useId()
  function selectRegion(next: MyocardialRegion) {
    setHighlight(next)
    if (next === 'conduction') setShowConduction(true)
  }
  return <div className="myocardium-explorer">
    <div className="myocardium-heading">
      <span className="eyebrow">CARDIAC TISSUE · ANATOMY AND POSSIBILITY</span>
      <h3>Myocardium, chambers and electrical conduction</h3>
      <p>Explore the muscular substrate of contraction and its relationship to the conduction system. The injury state is a conceptual illustration informed by selected published pathology.</p>
    </div>
    <div className="myocardium-layout">
      <figure className="myocardium-figure">
        <MyocardiumIllustration state={state} highlight={highlight} showConduction={showConduction} onSelect={selectRegion} />
        <ul className="myocardium-chamber-key" aria-label="Cardiac chamber legend">{cardiacChambers.map(chamber => <li key={chamber.short}><b>{chamber.short}</b><span>{chamber.label}</span></li>)}</ul>
        <figcaption>Original oblique cutaway; anatomical right appears on the left. Wall thickness and tissue scale are schematic. Chamber colors aid anatomical separation and do not indicate injury.</figcaption>
      </figure>
      <div className="myocardium-controls">
        <div>
          <span className="myocardium-control-label" id={`${id}-states`}>Conceptual tissue state</span>
          <div className="myocardium-state-buttons" role="group" aria-labelledby={`${id}-states`}>{(['normal', 'injury'] as const).map(value => <button type="button" key={value} aria-pressed={state === value} onClick={() => setState(value)}>{myocardialStates[value].label}</button>)}</div>
          <p className="myocardium-state-description" aria-live="polite">{myocardialStates[state].description}</p>
        </div>
        <div>
          <span className="myocardium-control-label" id={`${id}-regions`}>Inspect anatomy</span>
          <div className="myocardium-region-buttons" role="group" aria-labelledby={`${id}-regions`}>{myocardialRegions.map(item => <button type="button" key={item.id} aria-pressed={highlight === item.id} onClick={() => selectRegion(item.id)}>{item.label}</button>)}</div>
          <div className="myocardium-region-description" aria-live="polite"><h4>{region.label}</h4><p>{region.description}</p></div>
          <label className="myocardium-overlay-toggle"><input type="checkbox" checked={showConduction} onChange={event => setShowConduction(event.target.checked)} /><span>Show simplified conduction pathway<br /><small>SA: sinoatrial node · AV: atrioventricular node</small></span></label>
        </div>
        <div className="myocardium-conduction-note"><strong>Electrical instability and pump function are different dimensions.</strong>Preserved left ventricular ejection fraction does not exclude myocarditis. An arrhythmia or conduction disturbance does not, by itself, locate an inflammatory lesion or establish its cause.</div>
      </div>
    </div>
    <details className="myocardium-tissue-details">
      <summary>Explore the cardiomyocyte tissue inset</summary>
      <div className="myocardium-tissue-body">
        <div><CardiomyocyteInset state={state} /><ol className="myocardium-tissue-key"><li>Striated, branching muscle cells</li><li>Central myocyte nucleus</li><li>Intercalated disc between cells</li></ol></div>
        <div className="myocardium-tissue-copy"><p>{state === 'normal' ? 'Cardiac muscle cells branch and connect at intercalated discs. Their striations reflect organized contractile units; nuclei lie centrally, unlike the peripheral nuclei of skeletal-muscle fibers.' : 'The focal interruption shows disorganized myocyte structure with inflammatory cells at its margin. This is an illustrative tissue mechanism reported in selected ICI-associated myocarditis pathology, not a diagnosis from a symptom, ECG or biomarker.'}</p><p>The enlarged tissue field is schematic. Its location, cell density and affected fraction are not measurements from the N=38 working cohort.</p></div>
      </div>
    </details>
    <div className="myocardium-figure-sources"><span>Anatomy and clinical context:</span>{cardiacAnatomySources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}</a>)}</div>
  </div>
}
