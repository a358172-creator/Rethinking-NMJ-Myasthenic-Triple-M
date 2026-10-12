import { useId, type KeyboardEvent } from 'react'

export type PhenotypeRegion = 'ocular' | 'bulbar' | 'cervical' | 'proximal' | 'respiratory'

interface PhenotypeFigureProps {
  selected: PhenotypeRegion
  onSelect: (id: PhenotypeRegion) => void
}

const navy = '#14283F'
const teal = '#338A8A'
const tealText = '#246C6C'
const muted = '#566879'
const muscle = '#C5DDD6'
const tissue = '#EDF1F3'
const outline = '#A8B6C0'

/** Original regional anatomy: distribution illustrates a phenotype, never a diagnosis. */
export function PhenotypeFigure({ selected, onSelect }: PhenotypeFigureProps) {
  const instanceId = useId().replace(/:/g, '')
  const activate = (event: KeyboardEvent<SVGGElement>, region: PhenotypeRegion) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(region)
    }
  }
  const regionProps = (region: PhenotypeRegion) => ({
    className: `phenotype-hit-target${selected === region ? ' is-selected' : ''}`,
    role: 'button',
    tabIndex: 0,
    'aria-label': `Select ${region} region`,
    'aria-pressed': selected === region,
    onClick: () => onSelect(region),
    onKeyDown: (event: KeyboardEvent<SVGGElement>) => activate(event, region),
    style: { cursor: 'pointer' },
  })
  const stroke = (region: PhenotypeRegion) => selected === region ? navy : teal
  const width = (region: PhenotypeRegion) => selected === region ? 2.8 : 1.4
  const fill = (region: PhenotypeRegion) => selected === region ? '#AAD0C7' : muscle
  const badge = (region: PhenotypeRegion, number: string, x: number, y: number) => (
    <g aria-hidden="true">
      <circle cx={x} cy={y} r="12" fill={selected === region ? navy : '#EAF0F3'} stroke={selected === region ? navy : outline} strokeWidth="1" />
      <text x={x} y={y + 4} textAnchor="middle" fill={selected === region ? '#FFFFFF' : navy} fontSize="11" fontWeight="700">{number}</text>
    </g>
  )

  return (
    <svg className="phenotype-figure" viewBox="0 0 600 740" xmlns="http://www.w3.org/2000/svg" role="group" aria-labelledby={`${instanceId}-title ${instanceId}-desc`}>
      <title id={`${instanceId}-title`}>Clinical phenotype: five muscle regions</title>
      <desc id={`${instanceId}-desc`}>
        An anterior anatomical schematic shows the head, neck, torso, upper arms and thighs.
        Select ocular, bulbar, cervical, proximal or respiratory muscles with a mouse, Enter or Space.
        Insets show extraocular muscles and the eyelid levator, and a lateral section of the tongue and pharynx.
        The chest shows intercostal muscles between ribs and the domed diaphragm below the lungs.
        A dark outline and numbered marker indicate the selected region. Simplified anatomy, not to scale.
      </desc>
      <defs>
        <clipPath id={`${instanceId}-thorax`}>
          <path d="M267 242 Q300 227 333 242 C347 262 354 289 345 317 Q325 332 300 335 Q275 332 255 317 C246 289 253 262 267 242Z" />
        </clipPath>
      </defs>

      <g aria-hidden="true">
        <text x="24" y="27" fill={tealText} fontSize="11" fontWeight="600" letterSpacing="1.2">REGIONAL ANATOMY · ANTERIOR VIEW</text>
        <path d="M300 46 V720" fill="none" stroke="#E3E9ED" strokeDasharray="3 6" />
        {/* Neutral anatomical outline; no patient likeness or facial portrait. */}
        <path d="M275 164 L274 197 C262 207 241 212 225 222 C211 229 204 241 198 261 L179 333 L164 415 Q160 433 167 447 L177 459 Q185 463 191 454 L194 441 L203 387 L221 331 L234 291 L235 387 Q228 412 230 441 L233 459 L231 509 L239 605 L244 687 L238 714 Q235 725 249 726 L267 722 L271 700 L283 597 L287 516 L300 478 L313 516 L317 597 L329 700 L333 722 L351 726 Q365 725 362 714 L356 687 L361 605 L369 509 L367 459 L370 441 Q372 412 365 387 L366 291 L379 331 L397 387 L406 441 L409 454 Q415 463 423 459 L433 447 Q440 433 436 415 L421 333 L402 261 C396 241 389 229 375 222 C359 212 338 207 326 197 L325 164Z" fill={tissue} stroke={outline} strokeWidth="1.6" />
        <path d="M264 116 C263 84 277 65 300 65 C323 65 337 84 336 116 L332 143 Q323 170 300 176 Q277 170 268 143Z" fill={tissue} stroke={outline} strokeWidth="1.6" />
        <path d="M266 110 Q257 107 260 124 L267 136 M334 110 Q343 107 340 124 L333 136" fill={tissue} stroke={outline} strokeWidth="1.2" />
        <path d="M296 112 L290 134 Q299 139 305 133 M286 151 Q300 156 314 151" fill="none" stroke={outline} strokeWidth="1.1" />
        <path d="M241 224 Q270 238 288 222 M359 224 Q330 238 312 222 M300 219 V329" fill="none" stroke={outline} strokeWidth="2" />
        <path d="M245 383 Q300 401 355 383 M235 440 Q268 454 287 466 M365 440 Q332 454 313 466 M300 358 V430" fill="none" stroke={outline} strokeWidth="1.2" />
        <path d="M239 614 Q258 626 281 615 M319 615 Q342 626 361 614" fill="none" stroke={outline} strokeWidth="1.2" />
        <path d="M234 242 Q251 233 273 244 L290 274 Q268 285 241 271 M366 242 Q349 233 327 244 L310 274 Q332 285 359 271" fill="#E4EBED" stroke={outline} strokeWidth="1" />
      </g>

      <g {...regionProps('ocular')}>
        <title>01 · Ocular muscles and eyelids</title>
        <g aria-hidden="true">
          <path className="phenotype-region" d="M276 107 Q284 100 293 107 Q284 115 276 107Z M307 107 Q316 100 324 107 Q316 115 307 107Z" fill={fill('ocular')} stroke={stroke('ocular')} strokeWidth={width('ocular')} />
          <path d="M281 99 Q286 95 291 99 M309 99 Q314 95 319 99" fill="none" stroke={stroke('ocular')} strokeWidth="1.4" />
          <path d="M326 100 L384 100 L406 105" fill="none" stroke={muted} strokeWidth="1" strokeDasharray="3 3" />
          <rect className="phenotype-region" x="404" y="53" width="174" height="160" rx="8" fill="#FFFFFF" stroke={selected === 'ocular' ? navy : '#D9E3E8'} strokeWidth={selected === 'ocular' ? 2.5 : 1} />
          {badge('ocular', '01', 427, 76)}
          <text x="447" y="81" fill={navy} fontSize="15" fontWeight="600">Ocular</text>
          {/* Sagittal orbital inset: muscles attach to the globe; levator lies superiorly. */}
          <path d="M434 127 Q449 101 505 113 Q535 116 547 127 M434 127 Q449 153 505 145 Q535 140 547 127" fill="#F3F6F7" stroke={outline} strokeWidth="1.1" />
          <circle cx="505" cy="128" r="20" fill="#FFFFFF" stroke="#5D748A" strokeWidth="1.3" />
          <path d="M521 112 Q534 128 521 144" fill="none" stroke="#5D748A" strokeWidth="2" />
          <path d="M438 124 L495 107 L510 108 L502 114 L444 128Z M438 130 L495 149 L510 147 L502 141 L444 126Z" fill={fill('ocular')} stroke={stroke('ocular')} strokeWidth="1" />
          <path d="M444 105 Q474 94 515 99 L531 113" fill="none" stroke={stroke('ocular')} strokeWidth="4" strokeLinecap="round" />
          <path d="M532 112 Q542 129 533 140" fill="none" stroke={stroke('ocular')} strokeWidth="2" />
          <path d="M440 169 H472 L483 148" fill="none" stroke={muted} strokeWidth=".9" />
          <text x="418" y="183" fill={navy} fontSize="12">Extraocular muscles</text>
          <text x="418" y="201" fill={navy} fontSize="12">Levator / eyelid</text>
          <path d="M503 197 H564 V99 H518" fill="none" stroke={muted} strokeWidth=".9" />
        </g>
      </g>

      <g {...regionProps('bulbar')}>
        <title>02 · Bulbar muscles: tongue and pharynx</title>
        <g aria-hidden="true">
          <path className="phenotype-region" d="M285 144 Q300 137 315 144 L312 150 Q300 153 288 150Z" fill={fill('bulbar')} stroke={stroke('bulbar')} strokeWidth={width('bulbar')} />
          <path d="M277 151 L216 151 L192 152" fill="none" stroke={muted} strokeWidth="1" strokeDasharray="3 3" />
          <rect className="phenotype-region" x="24" y="64" width="169" height="195" rx="8" fill="#FFFFFF" stroke={selected === 'bulbar' ? navy : '#D9E3E8'} strokeWidth={selected === 'bulbar' ? 2.5 : 1} />
          {badge('bulbar', '02', 47, 87)}
          <text x="67" y="92" fill={navy} fontSize="15" fontWeight="600">Bulbar</text>
          {/* Lateral head section separates tongue from posterior pharyngeal musculature. */}
          <path d="M86 201 L86 171 Q69 149 77 127 Q85 103 113 108 Q138 110 139 129 L147 141 L139 146 L141 153 L138 159 Q143 174 131 181 L124 185 L130 202" fill="#F0F3F5" stroke={outline} strokeWidth="1.3" />
          <path d="M101 154 Q111 161 136 160 Q131 172 108 169 L100 164Z" fill={fill('bulbar')} stroke={stroke('bulbar')} strokeWidth="1.4" />
          <path d="M97 138 Q90 151 95 171 L104 195 L112 195 L103 169 Q99 153 104 140Z" fill={fill('bulbar')} stroke={stroke('bulbar')} strokeWidth="1.4" />
          <path d="M113 179 L114 197" fill="none" stroke={outline} strokeWidth="2" />
          <path d="M142 158 H166 V217 H94 M106 191 L118 205 H156 V238 H99" fill="none" stroke={muted} strokeWidth=".9" />
          <text x="39" y="221" fill={navy} fontSize="12">Tongue</text>
          <text x="39" y="242" fill={navy} fontSize="12">Pharynx</text>
        </g>
      </g>

      <g {...regionProps('cervical')}>
        <title>03 · Cervical musculature</title>
        <g aria-hidden="true">
          <path className="phenotype-region" d="M276 164 L280 163 Q289 193 297 216 L283 213 Q276 194 274 176Z M324 164 L320 163 Q311 193 303 216 L317 213 Q324 194 326 176Z M292 180 H297 V211 L292 207Z M303 180 H308 L308 207 L303 211Z" fill={fill('cervical')} stroke={stroke('cervical')} strokeWidth={width('cervical')} />
          <path d="M326 192 L382 229 H411" fill="none" stroke={muted} strokeWidth="1" />
          {badge('cervical', '03', 428, 229)}
          <text x="450" y="234" fill={navy} fontSize="14" fontWeight="600">Cervical</text>
          <text x="405" y="255" fill={navy} fontSize="11.5">Sternocleidomastoid</text>
          <text x="405" y="272" fill={muted} fontSize="11.5">Anterior strap muscles</text>
        </g>
      </g>

      <g {...regionProps('proximal')}>
        <title>04 · Proximal limb muscles: deltoids, upper arms and quadriceps</title>
        <g aria-hidden="true">
          <path className="phenotype-region" d="M226 225 Q209 227 201 249 L200 272 Q218 276 234 253 L240 237Z M374 225 Q391 227 399 249 L400 272 Q382 276 366 253 L360 237Z M205 280 Q218 282 227 271 L221 308 Q215 327 202 338 L193 333Z M395 280 Q382 282 373 271 L379 308 Q385 327 398 338 L407 333Z" fill={fill('proximal')} stroke={stroke('proximal')} strokeWidth={width('proximal')} />
          <path className="phenotype-region" d="M241 469 Q260 459 280 481 L281 527 L272 602 Q257 615 245 599 L239 521Z M359 469 Q340 459 320 481 L319 527 L328 602 Q343 615 355 599 L361 521Z" fill={fill('proximal')} stroke={stroke('proximal')} strokeWidth={width('proximal')} />
          <g fill="none" stroke={stroke('proximal')} strokeWidth=".8" opacity=".8">
            <path d="M221 233 L207 267 M228 236 L212 266 M212 285 L201 324 M218 284 L206 327 M379 233 L393 267 M372 236 L388 266 M388 285 L399 324 M382 284 L394 327" />
            <path d="M246 483 L250 584 M255 478 L259 600 M270 485 L266 584 M354 483 L350 584 M345 478 L341 600 M330 485 L334 584" />
          </g>
          <path d="M239 503 L197 486 H167 M203 293 L178 311 H132" fill="none" stroke={muted} strokeWidth="1" />
          <text x="29" y="307" fill={navy} fontSize="12">Deltoid / upper arm</text>
          {badge('proximal', '04', 47, 476)}
          <text x="67" y="481" fill={navy} fontSize="14" fontWeight="600">Proximal limbs</text>
          <text x="29" y="510" fill={navy} fontSize="12">Quadriceps</text>
          <text x="29" y="529" fill={muted} fontSize="11.5">Hip and thigh region</text>
        </g>
      </g>

      <g {...regionProps('respiratory')}>
        <title>05 · Respiratory musculature: intercostals and diaphragm</title>
        <g aria-hidden="true">
          {/* Intercostal bands occupy the spaces between the pale rib arcs. */}
          <path className="phenotype-region" d="M267 242 Q300 227 333 242 C347 262 354 289 345 317 Q325 332 300 335 Q275 332 255 317 C246 289 253 262 267 242Z" fill={fill('respiratory')} stroke={stroke('respiratory')} strokeWidth={width('respiratory')} />
          <g clipPath={`url(#${instanceId}-thorax)`} fill="none" stroke="#F7F9FA" strokeWidth="5">
            {[244, 258, 272, 286, 300, 314].map(y => <path key={y} d={`M246 ${y} Q270 ${y + 11} 294 ${y - 2} M306 ${y - 2} Q330 ${y + 11} 354 ${y}`} />)}
          </g>
          <path d="M296 239 V320 H304 V239" fill="#E1E8EB" stroke={outline} strokeWidth="1" />
          {/* Each hemidiaphragm rises into the thorax; the central tendon lies between them. */}
          <path className="phenotype-region" d="M252 335 Q271 307 293 322 Q300 329 307 322 Q329 305 348 335 L343 346 Q327 323 307 337 Q300 342 293 337 Q274 325 257 347Z" fill={fill('respiratory')} stroke={stroke('respiratory')} strokeWidth={width('respiratory')} />
          <path d="M291 328 Q300 334 309 328 L307 337 Q300 342 293 337Z" fill="#E8EEEC" stroke={stroke('respiratory')} strokeWidth=".8" />
          {[260, 269, 278, 321, 330, 339].map(x => <path key={x} d={`M${x} 336 L${x < 300 ? x + 7 : x - 7} 325`} fill="none" stroke={stroke('respiratory')} strokeWidth=".7" />)}
          <path d="M349 331 L385 350 H410" fill="none" stroke={muted} strokeWidth="1" />
          {badge('respiratory', '05', 428, 350)}
          <text x="450" y="355" fill={navy} fontSize="14" fontWeight="600">Respiratory</text>
          <text x="405" y="378" fill={navy} fontSize="12">Intercostal muscles</text>
          <text x="405" y="397" fill={navy} fontSize="12">Domed diaphragm</text>
          <path d="M414 392 H385 L343 340" fill="none" stroke={muted} strokeWidth=".9" />
        </g>
      </g>

      <g aria-hidden="true">
        <text x="24" y="662" fill={navy} fontSize="11" fontWeight="600">SELECT A NUMBERED REGION</text>
        <text x="24" y="682" fill={muted} fontSize="11">Clinical distribution alone</text>
        <text x="24" y="699" fill={muted} fontSize="11">does not establish the mechanism.</text>
        <text x="578" y="724" textAnchor="end" fill={muted} fontSize="10.5">Original schematic · not to scale</text>
      </g>
    </svg>
  )
}
