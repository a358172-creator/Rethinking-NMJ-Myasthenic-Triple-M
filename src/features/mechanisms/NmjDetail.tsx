import { useId } from 'react'

interface NmjDetailProps {
  impaired: boolean
}

const navy = '#14283F'
const teal = '#338A8A'
const tealText = '#246C6C'
const amber = '#BD8A42'
const slate = '#627384'

/** Original normal-NMJ schematic with a qualitative, explicitly conceptual impairment state. */
export function NmjDetail({ impaired }: NmjDetailProps) {
  const instanceId = useId().replace(/:/g, '')
  const signalColor = impaired ? '#93642C' : teal
  return (
    <svg className="nmj-detail" viewBox="0 0 600 325" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby={`${instanceId}-title ${instanceId}-desc`}>
      <title id={`${instanceId}-title`}>{impaired ? 'Possible impairment of neuromuscular transmission' : 'Normal neuromuscular transmission'}</title>
      <desc id={`${instanceId}-desc`}>
        A motor nerve terminal contains acetylcholine-filled synaptic vesicles. Released acetylcholine
        crosses the synaptic cleft to receptors on the crests of the folded skeletal-muscle membrane.
        {impaired ? ' The dashed signal illustrates possible reduced transmission. It does not specify an antibody mechanism or demonstrate dysfunction in the N=38 patients.' : ' Transmission depolarizes the muscle membrane and can trigger muscle activation.'}
        The diagram is simplified and not to scale.
      </desc>
      <defs>
        <marker id={`${instanceId}-signal`} markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke={signalColor} strokeWidth="1.3" />
        </marker>
      </defs>
      <g aria-hidden="true">
        <rect x="1" y="1" width="598" height="323" rx="8" fill="#FFFFFF" stroke="#D9E3E8" />
        <text className="nmj-state-note" x="22" y="28" fill={impaired ? '#93642C' : tealText} fontSize="12" fontWeight="600">
          {impaired ? 'CONCEPTUAL STATE · POSSIBLE IMPAIRMENT' : 'ESTABLISHED PHYSIOLOGY · NORMAL TRANSMISSION'}
        </text>

        {/* Unmyelinated terminal continues from the motor axon. */}
        <path d="M279 45 V81 C243 81 173 83 167 120 C161 153 198 169 233 169 H373 C408 169 438 151 435 122 C431 86 370 81 333 81 V45" fill="#DFE8F0" stroke="#5D748A" strokeWidth="1.8" />
        <path d="M304 49 V69" fill="none" stroke={signalColor} strokeWidth="1.5" strokeDasharray={impaired ? '3 4' : undefined} markerEnd={`url(#${instanceId}-signal)`} />
        <text x="354" y="60" fill={slate} fontSize="11">Motor axon</text>
        <path d="M348 57 H339" fill="none" stroke={slate} strokeWidth=".8" />

        {/* Vesicles, with a few illustrative transmitter molecules. */}
        {[[201, 124], [225, 105], [253, 127], [280, 103], [314, 130], [342, 105], [374, 128], [406, 118]].map(([cx, cy], index) => (
          <g key={index}>
            <circle cx={cx} cy={cy} r="9" fill="#FFFFFF" stroke="#5D748A" strokeWidth="1.2" />
            <circle cx={cx - 2.5} cy={cy - 2} r="1.6" fill={amber} />
            <circle cx={cx + 3} cy={cy} r="1.6" fill={amber} />
            <circle cx={cx - 1} cy={cy + 3.5} r="1.6" fill={amber} />
          </g>
        ))}
        <path d="M273 167 C273 155 290 155 290 167 M342 167 C342 155 359 155 359 167" fill="#FFFFFF" stroke="#5D748A" strokeWidth="1.2" />
        {[[280, 173], [284, 184], [275, 194], [297, 189], [342, 178], [355, 192], [336, 194]].map(([cx, cy], index) => <circle className="ach-particle" key={index} cx={cx} cy={cy} r="2.3" fill={amber} />)}

        {/* Postsynaptic membrane folds descend into muscle; receptors sit on their crests. */}
        <path d="M40 217 H175 V261 Q182 275 190 261 V217 H222 V261 Q230 275 238 261 V217 H270 V261 Q278 275 286 261 V217 H318 V261 Q326 275 334 261 V217 H366 V261 Q374 275 382 261 V217 H560 V309 H40Z" fill="#E5EFEC" />
        <path d="M40 217 H175 V261 Q182 275 190 261 V217 H222 V261 Q230 275 238 261 V217 H270 V261 Q278 275 286 261 V217 H318 V261 Q326 275 334 261 V217 H366 V261 Q374 275 382 261 V217 H560" fill="none" stroke={teal} strokeWidth="2" />
        {[164, 201, 212, 249, 260, 297, 308, 345, 356, 393].map(x => <path key={x} d={`M${x} 217 V207 M${x} 207 L${x - 4} 200 M${x} 207 L${x + 4} 200`} fill="none" stroke={teal} strokeWidth="2.3" />)}

        <text x="22" y="92" fill={navy} fontSize="11.5" fontWeight="600">Presynaptic motor</text>
        <text x="22" y="107" fill={navy} fontSize="11.5" fontWeight="600">nerve terminal</text>
        <path d="M120 110 H150 L174 106" fill="none" stroke={slate} strokeWidth=".9" />

        <text x="458" y="99" fill={navy} fontSize="11.5">Synaptic vesicles</text>
        <path d="M451 104 H432 L413 112" fill="none" stroke={slate} strokeWidth=".9" />
        <text x="459" y="151" fill={navy} fontSize="11.5">Acetylcholine</text>
        <text x="459" y="166" fill={slate} fontSize="10.5">release (ACh)</text>
        <path d="M451 159 H422 L358 181" fill="none" stroke={slate} strokeWidth=".9" />

        <text x="22" y="184" fill={navy} fontSize="11.5">Synaptic cleft</text>
        <path d="M108 181 H164 L205 188" fill="none" stroke={slate} strokeWidth=".9" />
        <text x="22" y="243" fill={navy} fontSize="11.5">ACh receptors</text>
        <path d="M111 239 H135 L163 206" fill="none" stroke={slate} strokeWidth=".9" />
        <text x="58" y="295" fill={navy} fontSize="11.5">Skeletal-muscle membrane</text>
        <text x="278" y="295" fill={navy} fontSize="11.5">Postsynaptic folds</text>
        <path d="M350 283 L374 270" fill="none" stroke={slate} strokeWidth=".9" />

        <path d="M408 242 H538" fill="none" stroke={signalColor} strokeWidth="1.7" strokeDasharray={impaired ? '4 5' : undefined} markerEnd={`url(#${instanceId}-signal)`} />
        {impaired && <path d="M473 234 L478 242 L473 250" fill="none" stroke={signalColor} strokeWidth="1.5" />}
        <text x="413" y="267" fill={impaired ? signalColor : tealText} fontSize="11.5" fontWeight="600">{impaired ? 'Reduced transmission' : 'Muscle activation'}</text>
      </g>
    </svg>
  )
}
