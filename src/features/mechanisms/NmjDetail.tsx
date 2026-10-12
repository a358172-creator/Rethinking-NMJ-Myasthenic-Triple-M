import { useId } from 'react'
import { NmjAnatomy } from '../../components/anatomy/NmjAnatomy'

interface NmjDetailProps {
  impaired: boolean
  context?: 'transmission' | 'serology'
}

const navy = '#14283F'
const tealText = '#246C6C'
const slate = '#566879'

/** Original NMJ anatomy; serological detection remains separate from physiology. */
export function NmjDetail({ impaired, context = 'transmission' }: NmjDetailProps) {
  const instanceId = useId().replace(/:/g, '')
  const serology = context === 'serology'
  return (
    <svg className={`nmj-detail${serology ? ' nmj-detail--serology' : ''}`} viewBox={`0 0 600 ${serology ? 399 : 325}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby={`${instanceId}-title ${instanceId}-desc`}>
      <title id={`${instanceId}-title`}>{serology ? 'Postsynaptic NMJ anatomy and the separate domain of antibody detection' : impaired ? 'Possible impairment of neuromuscular transmission' : 'Normal neuromuscular transmission'}</title>
      <desc id={`${instanceId}-desc`}>
        A slender motor axon expands into a presynaptic terminal containing acetylcholine-filled
        vesicles. Released acetylcholine crosses the synaptic cleft to receptors on the crests of
        the folded skeletal-muscle membrane.
        {serology ? ' An isolated antibody-binding schematic represents serological detection, not an attack on this junction. Antibody detection is a separate evidence domain and does not independently demonstrate impaired transmission.' : impaired ? ' The dashed signal illustrates possible reduced transmission. It does not specify an antibody mechanism or demonstrate dysfunction in the N=38 patients.' : ' Transmission depolarizes the muscle membrane and can trigger muscle activation.'}
        The diagram is simplified and not to scale.
      </desc>
      <g aria-hidden="true">
        <rect x="1" y="1" width="598" height={serology ? 397 : 323} rx="8" fill="#FFFFFF" stroke="#D9E3E8" />
        <text className="nmj-state-note" x="22" y="28" fill={!serology && impaired ? '#93642C' : tealText} fontSize="12" fontWeight="600">
          {serology ? 'ESTABLISHED PHYSIOLOGY · POSTSYNAPTIC ANATOMY' : impaired ? 'CONCEPTUAL STATE · POSSIBLE IMPAIRMENT' : 'ESTABLISHED PHYSIOLOGY · NORMAL TRANSMISSION'}
        </text>
      </g>
      <NmjAnatomy impaired={impaired} showSignal={!serology} />
      <g aria-hidden="true">
        <text x="343" y="61" fill={slate} fontSize="11">Motor axon</text>
        <path d="M335 58 H318" fill="none" stroke={slate} strokeWidth=".9" />
        <text x="22" y="103" fill={navy} fontSize="11.5" fontWeight="600">Presynaptic motor</text>
        <text x="22" y="119" fill={navy} fontSize="11.5" fontWeight="600">nerve terminal</text>
        <path d="M129 121 H165 L185 125" fill="none" stroke={slate} strokeWidth=".9" />

        <text x="455" y="101" fill={navy} fontSize="11.5">Synaptic vesicles</text>
        <path d="M449 106 H421 L403 126" fill="none" stroke={slate} strokeWidth=".9" />
        <text x="455" y="156" fill={navy} fontSize="11.5">Acetylcholine</text>
        <text x="455" y="172" fill={slate} fontSize="10.5">release (ACh)</text>
        <path d="M448 166 H424 L364 192" fill="none" stroke={slate} strokeWidth=".9" />

        <text x="22" y="190" fill={navy} fontSize="11.5">Synaptic cleft</text>
        <path d="M111 187 H163 L199 195" fill="none" stroke={slate} strokeWidth=".9" />
        <text x="22" y="249" fill={navy} fontSize="11.5">ACh receptors</text>
        <path d="M110 245 H140 L188 211" fill="none" stroke={slate} strokeWidth=".9" />
        <text x="58" y="295" fill={navy} fontSize="11.5">Skeletal-muscle membrane</text>
        <text x="282" y="295" fill={navy} fontSize="11.5">Postsynaptic folds</text>
        <path d="M353 283 L383 267" fill="none" stroke={slate} strokeWidth=".9" />
        {!serology && <text x="424" y="272" fill={impaired ? '#93642C' : tealText} fontSize="11.5" fontWeight="600">{impaired ? 'Reduced transmission' : 'Muscle activation'}</text>}

        {serology && <>
          <path d="M22 324 H578" stroke="#D9E3E8" strokeWidth="1" />
          {/* Separate assay concept, deliberately disconnected from the anatomical endplate. */}
          <circle cx="45" cy="358" r="15" fill="#EAF3F2" stroke="#338A8A" strokeWidth="1.3" />
          <path d="M57 363 L65 356 M65 356 L65 346 M65 356 L75 356" fill="none" stroke="#93485A" strokeWidth="2" strokeLinecap="round" />
          <text x="91" y="351" fill={navy} fontSize="12" fontWeight="600">Antibody detection is a separate evidence domain</text>
          <text x="91" y="370" fill={slate} fontSize="11">Binding schematic · does not demonstrate transmission failure</text>
          <text x="22" y="391" fill={slate} fontSize="10.5">Generic binding symbol; no patient-specific antibody mechanism is depicted.</text>
        </>}
      </g>
    </svg>
  )
}
