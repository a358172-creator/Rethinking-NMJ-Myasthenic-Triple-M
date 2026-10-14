import { useId, useState, type KeyboardEvent } from 'react'
import { muscleAnatomicalSources, muscleStateCopy, muscleStructures } from '../data/muscleModel'
import type { MuscleState, MuscleStructure } from '../data/muscleModel'
import '../styles/skeletal-muscle.css'

export type { MuscleState, MuscleStructure } from '../data/muscleModel'

interface MuscleProps {
  state?: MuscleState
  selected?: MuscleStructure
  onSelect?: (structure: MuscleStructure) => void
  compact?: boolean
}

const colors = { membrane: '#338A8A', deep: '#246C6C', muscle: '#B9D2CB', nuclei: '#344E64', interstitium: '#E9EAE1', collagen: '#BAC6BB', blood: '#B27880', injury: '#93485A', amber: '#BD8A42' }

/** Original longitudinal cutaway. Geometry occupies 680 × 380 user units.
 * Reused unchanged by the tissue explorer, anatomical overview and comparison.
 * Each broad band is one muscle cell; the thin internal strands are myofibrils.
 */
export function SkeletalMuscleLayer({ state = 'normal', selected, onSelect, compact = false }: MuscleProps) {
  const id = useId().replace(/:/g, '')
  const injury = state === 'injury'
  const banding = `url(#${id}-banding)`
  const fiberFill = `url(#${id}-fiber)`
  const membraneWidth = selected === 'sarcolemma' ? 3.6 : 1.7
  const structureColor = (structure: MuscleStructure, base: string) => selected === structure ? '#14283F' : base

  function marker(structure: MuscleStructure, x: number, y: number, number: string) {
    const label = muscleStructures.find(item => item.id === structure)!.label
    const activate = (event: KeyboardEvent<SVGGElement>) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect?.(structure) }
    }
    return <g key={structure} className={onSelect ? 'muscle-marker is-interactive' : 'muscle-marker'}
      {...(onSelect ? { role: 'button', tabIndex: 0, 'aria-label': `Inspect ${label}`, 'aria-pressed': selected === structure, onClick: () => onSelect(structure), onKeyDown: activate } : { 'aria-hidden': true as const })}>
      <rect className="muscle-marker-hit" x={x - 22} y={y - 22} width="44" height="44" rx="5" fill="transparent" />
      <circle cx={x} cy={y} r="13" fill={selected === structure ? '#14283F' : '#FFFFFF'} stroke="#14283F" strokeWidth="1.4" />
      <text x={x} y={y + 4.5} textAnchor="middle" fill={selected === structure ? '#FFFFFF' : '#14283F'} fontSize="14" fontWeight="700">{number}</text>
    </g>
  }

  const fibers = [
    { x: 112, y: 69, length: 458, depth: 70, angle: -3, damaged: false },
    { x: 68, y: 164, length: 492, depth: 76, angle: -3, damaged: injury },
    { x: 111, y: 269, length: 471, depth: 73, angle: -3, damaged: false },
  ]

  return <g className={`skeletal-muscle-layer skeletal-muscle-layer--${state}`} data-muscle-state={state}>
    <defs>
      <linearGradient id={`${id}-fiber`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E1EBE5" />
        <stop offset=".27" stopColor="#C7DED4" />
        <stop offset=".76" stopColor="#AFCFC3" />
        <stop offset="1" stopColor="#8FB7AB" />
      </linearGradient>
      <pattern id={`${id}-banding`} width="25" height="14" patternUnits="userSpaceOnUse">
        <rect width="11" height="14" fill="#397C72" opacity=".17" />
        <path d="M17 0V14" stroke="#397C72" strokeWidth="1.1" opacity=".44" />
        <path d="M5.5 0V14" stroke="#EAF3EF" strokeWidth="1.4" opacity=".7" />
      </pattern>
      {fibers.map((fiber, i) => <clipPath key={i} id={`${id}-fiber-${i}`}>
        <path d={`M0 10 Q${fiber.length / 2} -5 ${fiber.length} 4 Q${fiber.length + 21} 6 ${fiber.length + 23} ${fiber.depth / 2} Q${fiber.length + 20} ${fiber.depth - 2} ${fiber.length} ${fiber.depth} Q${fiber.length / 2} ${fiber.depth + 7} 0 ${fiber.depth - 3}Z`} />
      </clipPath>)}
      <mask id={`${id}-damage-mask`}>
        <rect x="-10" y="-20" width="560" height="120" fill="white" />
        <path d="M226 -12 C249 7 263 13 270 22 L277 36 L304 39 L325 25 L328 9 L350 -12Z" fill="black" />
      </mask>
    </defs>

    {/* Endomysium is continuous between cells, not a myofibrillar layer. */}
    <path d="M76 48 Q365 24 598 53 L632 302 Q625 353 566 362 L99 364 Q51 341 42 207 L53 93Z" fill={colors.interstitium} opacity=".72" />
    <g fill="none" stroke={structureColor('endomysium', colors.collagen)} strokeWidth={selected === 'endomysium' ? 2.2 : 1.1} opacity=".83">
      <path d="M88 58 C168 42 203 61 258 50 S365 42 424 48 S547 37 599 48 M86 152 C160 135 233 151 309 137 S468 136 574 131 M66 254 C153 239 220 253 310 243 S470 240 604 232 M100 359 C228 345 342 359 447 345 S550 340 605 327" />
      <path d="M88 60 Q72 95 94 142 M212 50 Q199 85 215 139 M362 46 Q345 92 365 134 M527 45 Q548 99 539 131 M68 149 Q51 211 79 247 M204 145 Q187 204 210 245 M455 136 Q481 179 466 235 M588 130 Q618 169 602 235 M82 253 Q85 306 103 353 M272 246 Q260 291 280 352 M493 239 Q478 297 505 339" />
      <path d="M83 154 Q210 166 328 148 T599 140 M81 246 Q159 264 278 251 T594 242" strokeDasharray="6 7" />
    </g>

    {/* A capillary follows the lower extracellular corridor, clear of the inflammatory focus above the middle fiber. */}
    <g className={selected === 'capillary' ? 'is-emphasized' : ''}>
      <path d="M58 258 C157 246 219 254 300 242 S450 240 547 225 L620 220" fill="none" stroke={structureColor('capillary', '#A56570')} strokeWidth="11" strokeLinecap="round" />
      <path d="M58 258 C157 246 219 254 300 242 S450 240 547 225 L620 220" fill="none" stroke="#F4D9DB" strokeWidth="7" strokeLinecap="round" />
      {[[111, 253], [191, 250], [273, 246], [433, 237], [507, 230], [589, 222]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) rotate(-5)`}>
        <ellipse rx="9" ry="3.3" fill={colors.blood} />
        <ellipse rx="5" ry="1.4" fill="#DAB0B4" />
      </g>)}
      <path d="M338 234 Q346 230 354 234" fill="none" stroke={colors.nuclei} strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {fibers.map((fiber, index) => <g key={index} transform={`translate(${fiber.x} ${fiber.y}) rotate(${fiber.angle})`}>
      {/* A thin connective sleeve surrounds the separate cell membrane. */}
      <path d={`M-3 8 Q${fiber.length / 2} -9 ${fiber.length} 0 Q${fiber.length + 26} 5 ${fiber.length + 27} ${fiber.depth / 2} Q${fiber.length + 22} ${fiber.depth + 3} ${fiber.length} ${fiber.depth + 4} Q${fiber.length / 2} ${fiber.depth + 10} -3 ${fiber.depth}Z`} fill="#F7F8F1" stroke="#BCCDBF" strokeWidth="1.1" />
      <g mask={fiber.damaged ? `url(#${id}-damage-mask)` : undefined}>
        <path className="muscle-cell-membrane" d={`M0 10 Q${fiber.length / 2} -5 ${fiber.length} 4 Q${fiber.length + 21} 6 ${fiber.length + 23} ${fiber.depth / 2} Q${fiber.length + 20} ${fiber.depth - 2} ${fiber.length} ${fiber.depth} Q${fiber.length / 2} ${fiber.depth + 7} 0 ${fiber.depth - 3}Z`} fill={fiberFill} stroke={structureColor('sarcolemma', colors.membrane)} strokeWidth={membraneWidth} />
        <g clipPath={`url(#${id}-fiber-${index})`}>
          <path d={`M0 22 Q${fiber.length / 2} 8 ${fiber.length} 15 L${fiber.length} ${fiber.depth - 11} Q${fiber.length / 2} ${fiber.depth + 1} 0 ${fiber.depth - 13}Z`} fill={banding} />
          {[20, 31, 42, 53, 64].filter(y => y < fiber.depth - 7).map((y, i) => <g key={y}>
            <path d={`M-4 ${y} Q${fiber.length / 2} ${y - 12} ${fiber.length} ${y - 5}`} fill="none" stroke={structureColor('myofibrils', colors.deep)} strokeWidth={selected === 'myofibrils' ? 2 : 1.2} opacity=".62" />
            <path d={`M-4 ${y + 3} Q${fiber.length / 2} ${y - 9} ${fiber.length} ${y - 2}`} fill="none" stroke="#F0F6EF" strokeWidth={i % 2 ? 1.4 : 2} opacity=".8" />
          </g>)}
        </g>
        {/* Elongated nuclei lie beneath the outer membrane, not in the interstitium. */}
        {[[77, 9], [180, fiber.depth - 3], [365, 5]].map(([x, y], i) => <g key={i}>
          <ellipse cx={x} cy={y} rx="14" ry="4.1" fill={structureColor('nuclei', colors.nuclei)} stroke="#F4F7F1" strokeWidth=".8" />
          <path d={`M${x - 8} ${y} Q${x} ${y - 2} ${x + 8} ${y}`} stroke="#71869B" strokeWidth=".8" fill="none" />
        </g>)}
      </g>
      {/* The distal cut face shows many myofibrils inside one cell. */}
      <path d={`M${fiber.length - 6} 4 Q${fiber.length + 20} 6 ${fiber.length + 23} ${fiber.depth / 2} Q${fiber.length + 19} ${fiber.depth - 3} ${fiber.length - 6} ${fiber.depth} Q${fiber.length - 25} ${fiber.depth / 2} ${fiber.length - 6} 4Z`} fill="#DCEAE0" stroke={structureColor('sarcolemma', colors.membrane)} strokeWidth={membraneWidth} />
      {[[-7, 18], [3, 18], [-11, 30], [2, 31], [12, 32], [-10, 43], [2, 44], [11, 45], [-6, 56], [5, 57]].map(([dx, y], i) => <path key={i} d={`M${fiber.length + dx - 3} ${y - 4} l5 -1 l3 4 l-2 5 l-5 1 l-3 -4Z`} fill={i % 2 ? '#A4C5B7' : '#BBD4C5'} stroke="#69978B" strokeWidth=".7" />)}
      {fiber.damaged && <g>
        {/* A bounded lesion interrupts membrane and local contractile strands. */}
        <path d="M229 2 C246 13 261 13 268 28 L278 37 L300 39 L318 26 L324 12 L343 0 C323 -6 306 -6 288 -3 C265 1 250 -5 229 2Z" fill="#F6E4E2" stroke="#C68E91" strokeWidth="1.4" />
        <path d="M232 5 L242 13 L254 15 M262 20 L270 34 L280 40 M303 39 L317 28 L324 13 L338 4" fill="none" stroke={colors.injury} strokeWidth="2.2" />
        <path d="M250 24 l10 5 M272 14 l8 6 M286 29 l12 -4 M302 11 l9 -3 M276 43 l13 1" fill="none" stroke={colors.deep} strokeWidth="2.2" strokeLinecap="round" opacity=".76" />
        <path d="M248 22 l8 5 M284 14 l7 2 M301 34 l7 -6" fill="none" stroke="#FFFFFF" strokeWidth="1.3" />
      </g>}
    </g>)}

    {injury && <g className={selected === 'immune' ? 'muscle-inflammatory-focus is-emphasized' : 'muscle-inflammatory-focus'}>
      {/* Tissue-associated immune cells contact the middle fiber at its injured edge. */}
      {[[310, 146], [343, 147], [289, 156]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}>
        <path d="M-12 -4 C-13 -12 -5 -15 2 -13 C11 -14 16 -5 13 3 C12 11 4 15 -3 12 C-12 12 -16 4 -12 -4Z" fill="#E4CBD0" stroke={colors.injury} strokeWidth="1.6" />
        <path d="M-7 -2 C-8 -9 0 -10 5 -7 C12 -3 8 6 2 8 C-6 10 -10 4 -7 -2Z" fill="#76506A" />
        <path d="M9 6 l3 1 M7 10 l2 1" stroke={colors.injury} strokeWidth="2" strokeLinecap="round" />
      </g>)}
      <g transform="translate(389 157)">
        <path d="M-23 -6 L-19 -15 L-9 -17 L-3 -23 L7 -19 L12 -13 L21 -12 L24 -2 L18 7 L18 17 L8 20 L0 16 L-9 22 L-16 14 L-23 9 L-19 1Z" fill="#EAD8BB" stroke="#9D793E" strokeWidth="1.8" />
        <path d="M-9 -8 C-2 -16 11 -11 10 -3 C9 3 1 1 -1 8 C-2 14 -12 8 -13 3 C-15 -2 -12 -5 -9 -8Z" fill="#7C6954" />
        <path d="M11 10 l4 3 M-13 -11 l3 2 M13 -7 l3 1" stroke="#B89664" strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>}

    {!compact && <g>
      <g fill="none" stroke="#566879" strokeWidth="1.2" aria-hidden="true">
        <path d="M609 194 H599 L584 175" /><path d="M212 314 V295" /><path d="M153 205 L145 173" />
        <path d="M198 174 V158" /><path d="M620 232 V224" />
        {injury && <path d="M380 114 V130" />}
      </g>
      {marker('sarcolemma', 622, 194, '1')}{marker('myofibrils', 211, 327, '2')}
      {marker('nuclei', 153, 218, '3')}{marker('endomysium', 198, 187, '4')}
      {marker('capillary', 620, 245, '5')}{injury && marker('immune', 380, 101, '6')}
    </g>}
  </g>
}

export function SkeletalMuscleTissue(props: MuscleProps) {
  const id = useId()
  const state = props.state ?? 'normal'
  return <svg className="skeletal-muscle-svg" viewBox="0 0 680 380" xmlns="http://www.w3.org/2000/svg" role={props.onSelect ? 'group' : 'img'} aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{muscleStateCopy[state].label}: skeletal-muscle tissue</title>
    <desc id={`${id}-desc`}>{muscleStateCopy[state].summary} Peripheral nuclei lie inside the membrane. Endomysium and the capillary are extracellular. Original schematic; not to scale.</desc>
    <SkeletalMuscleLayer {...props} />
  </svg>
}

export function SkeletalMuscleExplorer() {
  const [state, setState] = useState<MuscleState>('normal')
  const [selected, setSelected] = useState<MuscleStructure>('sarcolemma')
  const descriptionId = useId()
  const structure = muscleStructures.find(item => item.id === selected)!
  const chooseState = (value: MuscleState) => { setState(value); if (value === 'normal' && selected === 'immune') setSelected('sarcolemma') }

  return <section className="muscle-explorer" aria-label="Skeletal-muscle tissue explorer">
    <div className="muscle-explorer-heading"><div><span className="eyebrow">TISSUE ARCHITECTURE / LONGITUDINAL CUTAWAY</span><h3>Inside a skeletal-muscle fiber</h3></div><p>Explore the cell boundary, contractile apparatus and surrounding tissue.</p></div>
    <div className="muscle-state-controls" role="group" aria-label="Skeletal muscle state">
      {(Object.keys(muscleStateCopy) as MuscleState[]).map(value => <button type="button" key={value} aria-pressed={value === state} onClick={() => chooseState(value)}>{muscleStateCopy[value].label}</button>)}
    </div>
    <p className="muscle-state-summary" aria-live="polite">{muscleStateCopy[state].summary}</p>
    <div className="muscle-detail-grid">
      <figure className="muscle-tissue-figure">
        <div className="muscle-detail-scroll" role="region" tabIndex={0} aria-label="Skeletal muscle tissue illustration" aria-describedby={descriptionId}>
          <SkeletalMuscleTissue state={state} selected={selected} onSelect={setSelected} />
        </div>
        <figcaption id={descriptionId}>Original anatomical schematic · enlarged compartments · not to scale. Numbered structures also appear in the controls. On narrow screens, scroll the tissue detail horizontally.</figcaption>
      </figure>
      <div className="muscle-structure-panel">
        <div className="muscle-structure-controls" role="group" aria-label="Skeletal muscle structures">
          {muscleStructures.filter(item => state === 'injury' || item.id !== 'immune').map(item => <button key={item.id} type="button" aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}><span aria-hidden="true">{item.number}</span>{item.label}</button>)}
        </div>
        <div className="muscle-structure-description" aria-live="polite"><h4>{structure.label}</h4><p>{structure.description}</p></div>
      </div>
    </div>
    {state === 'injury' && <div className="muscle-cell-key"><span><i className="muscle-key-t" aria-hidden="true" />CD8+ T-cell symbol · beside the fiber</span><span><i className="muscle-key-m" aria-hidden="true" />Macrophage symbol · injury margin</span></div>}
    <p className="muscle-scientific-note"><strong>Evidence boundary.</strong> Selected specimens in <a href="#ref-plomp-2025">Plomp et al.</a> and <a href="#ref-ucem-2026">Ucem et al.</a> support inflammatory muscle pathology. This illustration does not establish immune infiltration in the N=38 cohort. A myopathic needle-EMG pattern does not independently prove inflammatory myositis, and muscle injury does not exclude concurrent NMJ dysfunction.</p>
    <details className="muscle-anatomical-sources"><summary>Anatomical basis and limits</summary><p>The longitudinal fibers and cut faces are explanatory views of cell organization. The inflammatory focus is an original conceptual example informed by selected published tissue observations; its size, cell count and precise distribution are illustrative.</p><ul>{muscleAnatomicalSources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></details>
  </section>
}
