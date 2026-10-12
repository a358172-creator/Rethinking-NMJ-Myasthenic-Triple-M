import { useId } from 'react'
import type { ReactNode } from 'react'
import { illustrativeWaveformLabel } from '../../data/laboratory'

const navy = '#14283F'
const slate = '#566879'
const teal = '#338A8A'
const tealText = '#246c6c'
const burgundy = '#93485A'
const amber = '#BD8A42'
const line = '#dce3e8'
const caption = illustrativeWaveformLabel

interface WaveformFigureProps {
  id: string
  title: string
  description: string
  children: ReactNode
}

function WaveformFigure({ id, title, description, children }: WaveformFigureProps) {
  return (
    <figure className="trace-figure">
      <div className="trace-diagram-scroll" role="region" aria-label="Educational waveform diagram" tabIndex={0}>
      <svg
        className="electrophysiology-svg"
        viewBox="0 0 760 380"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby={`${id}-title ${id}-description`}
        style={{ fontFamily: 'var(--font-body, sans-serif)', fontSize: 14 }}
      >
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-description`}>{description} {caption}</desc>
        <defs>
          <marker id={`${id}-axis`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0 0 L6 3.5 L0 7" fill="none" stroke={slate} strokeWidth="1.3" />
          </marker>
        </defs>
        <g aria-hidden="true">
          <rect x="1" y="1" width="758" height="378" rx="12" fill="#FFFFFF" stroke={line} />
          {children}
        </g>
      </svg>
      </div>
      <p className="trace-scroll-hint">Scroll the schematic horizontally to inspect fine detail.</p>
      <figcaption className="trace-caption">{caption}</figcaption>
    </figure>
  )
}

/** A CMAP with an initial negative (upward) phase and a smaller positive phase. */
function cmapPath(x: number, baseline: number, scale: number) {
  const y = (offset: number) => baseline + offset * scale
  return `M${x} ${baseline} L${x + 6} ${baseline}
    C${x + 12} ${baseline} ${x + 12} ${y(-12)} ${x + 18} ${y(-41)}
    C${x + 23} ${y(-72)} ${x + 29} ${y(-85)} ${x + 35} ${y(-75)}
    C${x + 44} ${y(-62)} ${x + 49} ${y(-16)} ${x + 55} ${baseline}
    C${x + 62} ${y(22)} ${x + 68} ${y(31)} ${x + 76} ${y(18)}
    C${x + 84} ${y(3)} ${x + 86} ${baseline} ${x + 95} ${baseline}`
}

export function RnsTrace({ decrement }: { decrement: boolean }) {
  const id = `rns-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const color = decrement ? burgundy : teal
  // These are drawing proportions, not measured or synthetic patient amplitudes.
  const proportions = decrement ? [1, 0.84, 0.73, 0.68, 0.68] : [1, 0.99, 1.01, 1, 0.99]
  const positions = [106, 224, 342, 460, 578]
  const baseline = 228

  return (
    <WaveformFigure
      id={id}
      title={decrement ? 'RNS schematic with a decremental response' : 'RNS schematic without significant decrement'}
      description={`Five numbered nerve stimuli are followed by broad biphasic compound muscle action potentials, with negative deflections upward. ${decrement ? 'The first response is larger; successive responses decline and then plateau, illustrating amplitude decrement.' : 'Successive responses have similar amplitude, illustrating a pattern without significant decrement.'} Axes are schematic, without numerical amplitude or time values.`}
    >
      <text x="28" y="34" fill={navy} fontSize="16" fontWeight="600">Repetitive nerve stimulation</text>
      <text x="28" y="58" fill={decrement ? burgundy : tealText} fontWeight="600">
        {decrement ? 'Decremental response' : 'Without significant decrement'}
      </text>
      <text x="73" y="92" fill={slate}>CMAP amplitude (schematic)</text>

      {[132, 180, 228, 276].map(y => <path key={y} d={`M72 ${y} H706`} stroke={line} strokeWidth="0.8" fill="none" />)}
      <path d={`M72 291 V111 M72 291 H710`} stroke={slate} strokeWidth="1.2" fill="none" markerEnd={`url(#${id}-axis)`} />
      <path d="M72 147 V111" stroke={slate} strokeWidth="1.2" markerEnd={`url(#${id}-axis)`} />
      <text x="704" y="221" fill={slate} textAnchor="end" fontSize="13">Baseline</text>

      {positions.map((x, index) => (
        <g key={x}>
          <path d={`M${x - 12} ${baseline} H${x - 7} l1 -15 l2 26 l2 -11 H${x}`} stroke={amber} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
          <path d={cmapPath(x, baseline, proportions[index])} stroke={color} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M${x - 6} 294 V303`} stroke={amber} strokeWidth="1.5" />
          <text x={x - 6} y="321" fill={navy} textAnchor="middle" fontWeight="600">{index + 1}</text>
        </g>
      ))}

      <path d="M142 123 V139" fill="none" stroke={slate} strokeWidth="1" />
      <text x="142" y="115" fill={navy} textAnchor="middle">First CMAP</text>
      <path d={`M614 123 V${baseline - 84 * proportions[4] - 9}`} fill="none" stroke={slate} strokeWidth="1" />
      <text x="614" y="115" fill={navy} textAnchor="middle">Later CMAP</text>
      <path d="M97 336 H110" stroke={amber} strokeWidth="2" />
      <text x="117" y="341" fill={slate}>Numbered stimuli · brief stimulus artifacts</text>
      <text x="709" y="342" fill={slate} textAnchor="end">Time (schematic)</text>
      <text x="73" y="365" fill={decrement ? burgundy : tealText} fontSize="14">
        {decrement ? 'Smaller successive responses illustrate a decrement in CMAP amplitude.' : 'Similar successive responses illustrate no significant amplitude decrement.'}
      </text>
    </WaveformFigure>
  )
}

/** Compact biphasic single-fiber potential; positions are drawing coordinates. */
function fiberPath(center: number, baseline: number, scale = 1) {
  const y = (offset: number) => baseline + offset * scale
  return `M${center - 26} ${baseline}
    C${center - 15} ${baseline} ${center - 10} ${baseline} ${center - 7} ${y(10)}
    C${center - 3} ${y(20)} ${center - 1} ${y(-59)} ${center + 4} ${y(-65)}
    C${center + 7} ${y(-71)} ${center + 10} ${y(26)} ${center + 15} ${y(15)}
    C${center + 19} ${y(2)} ${center + 22} ${baseline} ${center + 29} ${baseline}`
}

export function SfemgTrace({ unstable, blocking }: { unstable: boolean; blocking: boolean }) {
  const id = `sfemg-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const color = unstable ? burgundy : teal
  const offsets = unstable ? [-37, -23, -10, 8, 24, 39] : [-8, -5, -1, 2, 5, 8]
  const baseline = 176
  const reference = 180
  const second = 485
  const low = second + offsets[0] + 4
  const high = second + offsets[offsets.length - 1] + 4

  return (
    <WaveformFigure
      id={id}
      title={unstable ? 'SFEMG schematic with increased jitter' : 'SFEMG schematic with small timing variability'}
      description={`Repeated sweeps from two muscle fibers in the same motor unit are superimposed. The first reference potential is aligned. The second potential shows ${unstable ? 'a wider' : 'a small'} timing spread, illustrating jitter. ${blocking ? 'A separate selected sweep shows the first potential followed by no second potential, labeled possible impulse blocking.' : 'A separate example sweep contains both potentials.'} Positions and intervals are qualitative; no numerical jitter values or raw cohort recordings are shown.`}
    >
      <text x="28" y="34" fill={navy} fontSize="16" fontWeight="600">Single-fiber electromyography</text>
      <text x="28" y="58" fill={unstable ? burgundy : tealText} fontWeight="600">
        {unstable ? 'Increased transmission variability' : 'Conceptual normal transmission'}
      </text>
      <text x="76" y="89" fill={slate} fontSize="13">Superimposed sweeps · first potential aligned</text>
      <path d="M73 105 V209 H710" stroke={slate} strokeWidth="1.2" fill="none" markerEnd={`url(#${id}-axis)`} />
      <path d="M74 176 H705" stroke={line} strokeWidth="1" />
      <rect x={low - 8} y="106" width={high - low + 16} height="94" fill={unstable ? '#f7edf0' : '#eaf3f2'} opacity="0.75" />
      <path d={fiberPath(reference, baseline)} stroke={teal} strokeWidth="2.8" fill="none" strokeLinecap="round" />
      {offsets.map((offset, index) => (
        <path key={offset} d={fiberPath(second + offset, baseline)} stroke={color} strokeWidth={index === 2 ? 2.6 : 1.7} opacity={index === 2 ? 1 : 0.57} fill="none" strokeLinecap="round" />
      ))}
      <text x="181" y="105" fill={navy} textAnchor="middle" fontWeight="600">Reference</text>
      <text x="487" y="105" fill={navy} textAnchor="middle" fontWeight="600">Second potential</text>
      <path d={`M${low} 195 V226 M${high} 195 V226`} fill="none" stroke={color} strokeDasharray="3 4" strokeWidth="1" />
      <path d={`M${low} 220 V227 H${high} V220`} fill="none" stroke={color} strokeWidth="1.5" />
      <text x="487" y="250" fill={unstable ? burgundy : tealText} textAnchor="middle" fontWeight="600">Jitter: timing spread</text>
      <text x="180" y="240" fill={slate} textAnchor="middle">Aligned on each sweep</text>
      <text x="711" y="239" fill={slate} textAnchor="end">Time (schematic)</text>

      <rect x="73" y="268" width="635" height="71" rx="7" fill="#F7F9FA" stroke={line} />
      <text x="87" y="288" fill={slate} fontSize="13">{blocking ? 'Selected sweep' : 'Example repeat'}</text>
      <path d="M159 315 H687" stroke={line} strokeWidth="1" />
      <path d={fiberPath(reference, 315, 0.42)} stroke={teal} strokeWidth="1.9" fill="none" />
      {blocking ? (
        <>
          <path d={`M${second - 28} 315 H${second + 31}`} fill="none" stroke={burgundy} strokeWidth="2" strokeDasharray="4 4" />
          <text x="688" y="290" fill={burgundy} textAnchor="end" fontWeight="600">Possible impulse blocking</text>
          <text x="688" y="333" fill={slate} textAnchor="end" fontSize="13">Second potential absent on this sweep</text>
        </>
      ) : (
        <>
          <path d={fiberPath(second, 315, 0.42)} stroke={color} strokeWidth="1.9" fill="none" />
          <text x="688" y="290" fill={slate} textAnchor="end" fontSize="13">Both potentials present</text>
        </>
      )}
      <text x="74" y="364" fill={slate}>Timing variability is conceptual; no numerical jitter values are assigned.</text>
    </WaveformFigure>
  )
}

interface MotorUnit {
  center: number
  duration: number
  amplitude: number
}

/** Smooth MUAP with a small positive phase, negative phase, and positive return. */
function motorUnitValue(x: number, { center, duration, amplitude }: MotorUnit) {
  const t = (x - center) / duration
  const gaussian = (at: number, width: number) => Math.exp(-(((t - at) / width) ** 2))
  return amplitude * (0.25 * gaussian(-0.31, 0.12) - gaussian(-0.03, 0.16) + 0.55 * gaussian(0.27, 0.2))
}

function motorUnitTrace(start: number, end: number, baseline: number, units: MotorUnit[]) {
  const points: string[] = []
  for (let x = start; x <= end; x += 1) {
    const y = baseline + units.reduce((sum, unit) => sum + motorUnitValue(x, unit), 0)
    points.push(`${x === start ? 'M' : 'L'}${x} ${y.toFixed(2)}`)
  }
  return points.join(' ')
}

export function NeedleEmgTrace({ myopathic }: { myopathic: boolean }) {
  const id = `needle-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const color = myopathic ? burgundy : teal
  const usualUnit = { center: 201, duration: 82, amplitude: 66 }
  const selectedUnit = myopathic ? { center: 201, duration: 45, amplitude: 33 } : usualUnit
  const units: MotorUnit[] = myopathic
    ? [442, 460, 483, 507, 526, 548, 568, 592, 615, 636, 658, 681].map((center, index) => ({ center, duration: 39 + (index % 3) * 3, amplitude: 24 + (index % 4) * 4 }))
    : [459, 553, 652].map((center, index) => ({ center, duration: 71 + index * 5, amplitude: 46 + index * 7 }))
  const baseline = 203
  const durationStart = myopathic ? 177 : 157
  const durationEnd = myopathic ? 226 : 246

  return (
    <WaveformFigure
      id={id}
      title={myopathic ? 'Needle EMG schematic of a myopathic motor-unit pattern' : 'Needle EMG schematic of a usual motor-unit pattern'}
      description={`${myopathic ? 'An illustrative myopathic motor-unit action potential is shorter in duration and lower in amplitude than a dashed usual reference. A denser recruitment trace shows more small motor units at matched schematic force.' : 'An illustrative usual motor-unit action potential has a broader duration and larger amplitude, and a few motor units contribute to the recruitment trace at the same schematic force.'} Amplitude, time, and force are qualitative. This illustration does not establish inflammatory histopathology or exclude a coexisting neuromuscular-junction disorder.`}
    >
      <text x="28" y="34" fill={navy} fontSize="16" fontWeight="600">Conventional needle electromyography</text>
      <text x="28" y="58" fill={myopathic ? burgundy : tealText} fontWeight="600">
        {myopathic ? 'Illustrative myopathic pattern' : 'Usual motor-unit pattern'}
      </text>
      <text x="74" y="95" fill={navy} fontWeight="600">One motor-unit potential</text>
      <text x="419" y="95" fill={navy} fontWeight="600">Motor-unit recruitment</text>
      <text x="74" y="116" fill={slate} fontSize="13">Amplitude (schematic)</text>
      <text x="419" y="116" fill={slate} fontSize="13">At matched schematic force</text>

      <path d="M72 136 V271 H339 M417 136 V271 H711" fill="none" stroke={slate} strokeWidth="1.2" markerEnd={`url(#${id}-axis)`} />
      <path d="M73 203 H335 M418 203 H706" fill="none" stroke={line} strokeWidth="1" />
      <path d="M376 82 V328" fill="none" stroke={line} strokeWidth="1" />
      {myopathic && <path d={motorUnitTrace(85, 328, baseline, [usualUnit])} stroke={slate} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.65" fill="none" />}
      <path d={motorUnitTrace(85, 328, baseline, [selectedUnit])} stroke={color} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={motorUnitTrace(427, 704, baseline, units)} stroke={color} strokeWidth="2.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M${durationStart} 241 V249 H${durationEnd} V241`} fill="none" stroke={color} strokeWidth="1.3" />
      <text x="202" y="266" fill={myopathic ? burgundy : tealText} textAnchor="middle" fontSize="13">{myopathic ? 'Shorter duration' : 'MUAP duration'}</text>
      <text x="202" y="293" fill={slate} textAnchor="middle">Time (schematic)</text>
      <text x="563" y="293" fill={slate} textAnchor="middle">Time (schematic)</text>

      {myopathic ? (
        <>
          <path d="M88 313 H107" fill="none" stroke={slate} strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="115" y="318" fill={slate} fontSize="13">Usual MUAP reference</text>
          <text x="563" y="318" fill={burgundy} textAnchor="middle" fontSize="13" fontWeight="600">More units · early recruitment</text>
          <text x="74" y="351" fill={burgundy} fontWeight="600">Lower amplitude · shorter duration · denser recruitment</text>
        </>
      ) : (
        <>
          <text x="202" y="318" fill={tealText} textAnchor="middle" fontSize="13">Usual amplitude and duration</text>
          <text x="563" y="318" fill={tealText} textAnchor="middle" fontSize="13">Fewer contributing motor units</text>
          <text x="74" y="351" fill={slate}>Compare morphology and recruitment at the same conceptual effort.</text>
        </>
      )}
      <text x="74" y="372" fill={slate} fontSize="13">MUAP = motor-unit action potential. Qualitative examples; no patient values.</text>
    </WaveformFigure>
  )
}
