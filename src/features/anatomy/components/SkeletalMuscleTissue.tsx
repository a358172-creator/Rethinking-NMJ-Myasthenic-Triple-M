import { useId, useState, type KeyboardEvent } from 'react'
import { MedicalArtwork } from '../../../components/figures/MedicalArtwork'
import { muscleAnatomicalSources, muscleStateCopy, muscleStructures } from '../data/muscleModel'
import type { MuscleState, MuscleStructure } from '../data/muscleModel'
import '../styles/skeletal-muscle.css'

export type { MuscleState, MuscleStructure } from '../data/muscleModel'
interface MuscleProps { state?: MuscleState; selected?: MuscleStructure; onSelect?: (structure: MuscleStructure) => void; compact?: boolean }
interface TissuePoint { x: number; y: number; mx: number; my: number; rx: number; ry: number }
const points: Record<MuscleState, Record<MuscleStructure, TissuePoint>> = {
  normal: {
    sarcolemma: { x: 500, y: 207, mx: 420, my: 115, rx: 105, ry: 7 },
    myofibrils: { x: 420, y: 500, mx: 330, my: 490, rx: 70, ry: 50 },
    nuclei: { x: 708, y: 222, mx: 830, my: 142, rx: 58, ry: 18 },
    endomysium: { x: 460, y: 389, mx: 550, my: 355, rx: 86, ry: 20 },
    capillary: { x: 1030, y: 711, mx: 1100, my: 805, rx: 97, ry: 30 },
    immune: { x: 880, y: 415, mx: 1110, my: 350, rx: 220, ry: 90 },
  },
  injury: {
    sarcolemma: { x: 820, y: 189, mx: 690, my: 120, rx: 90, ry: 7 },
    myofibrils: { x: 420, y: 475, mx: 330, my: 475, rx: 70, ry: 50 },
    nuclei: { x: 1017, y: 223, mx: 1090, my: 145, rx: 58, ry: 18 },
    endomysium: { x: 440, y: 356, mx: 535, my: 350, rx: 85, ry: 19 },
    capillary: { x: 1030, y: 693, mx: 1095, my: 795, rx: 95, ry: 30 },
    immune: { x: 935, y: 398, mx: 1180, my: 340, rx: 225, ry: 90 },
  },
}

/** Editorial tissue plates and calibrated, independently editable selection overlays. */
export function SkeletalMuscleTissue({ state = 'normal', selected, onSelect, compact = false }: MuscleProps) {
  const structures = muscleStructures.filter(item => state === 'injury' || item.id !== 'immune')
  const activate = (event: KeyboardEvent<SVGGElement>, structure: MuscleStructure) => { if (onSelect && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); onSelect(structure) } }
  return <div className={`skeletal-muscle-artwork skeletal-muscle-artwork--${state}`} data-muscle-state={state}>
    <div className="skeletal-muscle-plate"><MedicalArtwork illustration={state === 'injury' ? 'muscle-injury' : 'muscle-normal'} />
      {!compact && <svg className="muscle-anatomical-overlay" viewBox="0 0 1536 1024" role={onSelect ? 'group' : 'img'} aria-label="Skeletal muscle anatomical structures">
        {structures.map(item => { const point = points[state][item.id]; return <g key={item.id} className={`muscle-anatomical-target${selected === item.id ? ' is-selected' : ''}`} {...(onSelect ? { role: 'button', tabIndex: 0, 'aria-label': `Select ${item.label.toLowerCase()} in illustration`, 'aria-pressed': selected === item.id, onClick: () => onSelect(item.id), onKeyDown: (event: KeyboardEvent<SVGGElement>) => activate(event, item.id) } : {})}>
          <ellipse className="muscle-anatomical-highlight" cx={point.x} cy={point.y} rx={point.rx} ry={point.ry} />
          <path className="muscle-anatomical-leader" d={`M${point.x} ${point.y} L${point.mx} ${point.my}`} />
          <circle className="muscle-anatomical-dot" cx={point.x} cy={point.y} r="6" />
          <circle className="muscle-anatomical-number" cx={point.mx} cy={point.my} r="29" />
          <text x={point.mx} y={point.my + 11} textAnchor="middle">{item.number}</text>
          {onSelect && <circle className="muscle-anatomical-hit" cx={point.mx} cy={point.my} r="64" />}
        </g> })}
      </svg>}
    </div>
    {!compact && <div className="muscle-artwork-caption"><span>{state === 'injury' ? 'Conceptual inflammatory injury' : 'Skeletal-muscle architecture'}</span><p>Longitudinal tissue view: fine striations distinguish contractile organization; peripheral nuclei, connective tissue and an interstitial capillary remain separate structures.</p>{onSelect ? <div className="muscle-structure-controls" role="group" aria-label="Skeletal muscle structures">{structures.map(item => <button key={item.id} type="button" aria-label={`Inspect ${item.label}`} aria-pressed={selected === item.id} onClick={() => onSelect(item.id)}><span aria-hidden="true">{item.number}</span>{item.label}</button>)}</div> : <ol className="muscle-static-key">{structures.map(item => <li key={item.id}>{item.label}</li>)}</ol>}</div>}
  </div>
}
export function SkeletalMuscleLayer(props: MuscleProps) { return <SkeletalMuscleTissue {...props} /> }

export function SkeletalMuscleExplorer() {
  const [state, setState] = useState<MuscleState>('normal')
  const [selected, setSelected] = useState<MuscleStructure>('sarcolemma')
  const descriptionId = useId()
  const structure = muscleStructures.find(item => item.id === selected)!
  const chooseState = (value: MuscleState) => { setState(value); if (value === 'normal' && selected === 'immune') setSelected('sarcolemma') }
  return <section className="muscle-explorer" aria-label="Skeletal-muscle tissue explorer">
    <div className="muscle-explorer-heading"><div><span className="eyebrow">SKELETAL MUSCLE / TISSUE ARCHITECTURE</span><h3>Inside a skeletal-muscle fiber</h3></div><p>Explore the cell boundary, contractile apparatus and surrounding tissue.</p></div>
    <div className="muscle-state-controls" role="group" aria-label="Skeletal muscle state">{(Object.keys(muscleStateCopy) as MuscleState[]).map(value => <button type="button" key={value} aria-pressed={value === state} onClick={() => chooseState(value)}>{muscleStateCopy[value].label}</button>)}</div>
    <p className="muscle-state-summary" aria-live="polite">{state === 'normal' ? 'Three longitudinal fibers illustrate muscle-cell organization, aligned contractile bands and extracellular connective tissue. The enlarged teaching view is not diagnostic histology.' : 'An illustrative inflammatory focus abuts a disrupted segment of the middle fiber. Neighboring tissue remains organized. The affected region and cell distribution are conceptual, not cohort histology.'}</p>
    <div className="muscle-detail-grid"><figure className="muscle-tissue-figure"><div className="muscle-detail-scroll" role="region" aria-label="Skeletal muscle tissue illustration" aria-describedby={descriptionId}><SkeletalMuscleTissue state={state} selected={selected} onSelect={setSelected} /></div><figcaption id={descriptionId}>Conceptual editorial illustration · enlarged tissue view · not to scale. Select an anatomical marker or its matching control to inspect the structure.</figcaption></figure><div className="muscle-structure-panel"><div className="muscle-structure-description" aria-live="polite"><h4>{structure.label}</h4><p>{selected === 'immune' ? 'Selected published tissue studies describe CD8-positive T cells and macrophages in inflammatory muscle injury. The illustrated cells abut the affected fiber. The illustration cannot identify immune-cell phenotype, prove infiltration in this working cohort or locate an individual patient’s lesion.' : structure.description}</p></div></div></div>
    {state === 'injury' && <p className="muscle-cell-context">Cell shape and color are visual conventions. CD8-positive T cells and macrophages are discussed as literature-informed tissue mechanisms; their phenotype cannot be established from this illustration.</p>}
    <p className="muscle-scientific-note"><strong>Evidence boundary.</strong> Selected specimens in <a href="#ref-plomp-2025">Plomp et al.</a> and <a href="#ref-ucem-2026">Ucem et al.</a> support inflammatory muscle pathology. This illustration does not establish immune infiltration in the N=38 cohort. A myopathic needle-EMG pattern does not independently prove inflammatory myositis, and muscle injury does not exclude concurrent NMJ dysfunction.</p>
    <details className="muscle-anatomical-sources"><summary>Anatomical basis and limits</summary><p>The fibers are explanatory longitudinal views of muscle-cell organization. The injury focus is a conceptual example informed by selected published tissue observations; its size, cell count and distribution are illustrative. Image morphology cannot establish a histological diagnosis.</p><ul>{muscleAnatomicalSources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></details>
  </section>
}
