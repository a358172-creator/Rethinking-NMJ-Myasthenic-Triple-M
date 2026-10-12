import { useId } from 'react'

interface NmjAnatomyProps {
  impaired?: boolean
  showSignal?: boolean
}

const teal = '#338A8A'
const nerve = '#5D748A'
const amber = '#BD8A42'

/** Shared cross-sectional NMJ geometry, in a 600 × 325 coordinate space. */
export function NmjAnatomy({ impaired = false, showSignal = true }: NmjAnatomyProps) {
  const instanceId = useId().replace(/:/g, '')
  const signal = impaired ? '#93642C' : teal
  return (
    <g className="nmj-anatomy" aria-hidden="true">
      <defs>
        <marker id={`${instanceId}-signal`} markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke={signal} strokeWidth="1.3" />
        </marker>
      </defs>
      {/* A slender motor axon expands into the unmyelinated terminal bouton. */}
      <path d="M294 47 V81 Q294 93 272 94 C232 92 192 100 183 125 C174 151 201 169 236 171 Q300 177 365 171 C400 169 426 151 418 126 C410 101 373 93 338 94 Q316 94 316 81 V47" fill="#DFE8F0" stroke={nerve} strokeWidth="1.8" />
      <path d="M295 48 V81 M315 48 V81" fill="none" stroke="#FAFCFD" strokeWidth="1.4" />
      <path d="M192 125 C193 109 229 100 268 102 M327 102 C364 100 394 111 407 127" fill="none" stroke="#EFF4F8" strokeWidth="2" />
      <g fill="#CBD8E4" stroke={nerve} strokeWidth=".8">
        <ellipse cx="250" cy="115" rx="13" ry="6" transform="rotate(-12 250 115)" />
        <ellipse cx="348" cy="114" rx="13" ry="6" transform="rotate(12 348 114)" />
      </g>
      <path d="M241 116 L246 112 L250 116 L255 111 L260 114 M338 112 L343 116 L347 112 L352 117 L358 113" fill="none" stroke={nerve} strokeWidth=".7" />

      {[[208, 134], [229, 148], [272, 133], [289, 110], [311, 140], [328, 127], [371, 144], [395, 131], [382, 115]].map(([cx, cy], index) => (
        <g key={index}>
          <circle cx={cx} cy={cy} r="8.3" fill="#FFFFFF" stroke={nerve} strokeWidth="1.15" />
          <circle cx={cx - 2.5} cy={cy - 2} r="1.45" fill={amber} />
          <circle cx={cx + 2.7} cy={cy} r="1.45" fill={amber} />
          <circle cx={cx - .7} cy={cy + 3.2} r="1.45" fill={amber} />
        </g>
      ))}
      {/* Fusion profiles sit at the presynaptic surface, opposite fold openings. */}
      <path d="M244 172 C244 157 262 157 262 173 M338 173 C338 158 356 158 356 172" fill="#FFFFFF" stroke={nerve} strokeWidth="1.2" />
      <path d="M242 177 H264 M336 177 H358" stroke={nerve} strokeWidth="1.7" />
      {[[251, 181], [260, 192], [242, 199], [271, 200], [342, 183], [356, 194], [333, 202], [367, 204]].map(([cx, cy], index) => <circle className="ach-particle" key={index} cx={cx} cy={cy} r="2.1" fill={amber} />)}

      {/* The cleft stays extracellular; deep junctional folds descend into muscle. */}
      <path d="M40 222 H201 Q205 222 205 228 V259 Q212 275 219 259 V228 Q219 222 223 222 H244 Q248 222 248 228 V259 Q255 275 262 259 V228 Q262 222 266 222 H287 Q291 222 291 228 V259 Q298 275 305 259 V228 Q305 222 309 222 H330 Q334 222 334 228 V259 Q341 275 348 259 V228 Q348 222 352 222 H373 Q377 222 377 228 V259 Q384 275 391 259 V228 Q391 222 395 222 H560 V309 H40Z" fill="#E5EFEC" />
      <path d="M40 222 H201 Q205 222 205 228 V259 Q212 275 219 259 V228 Q219 222 223 222 H244 Q248 222 248 228 V259 Q255 275 262 259 V228 Q262 222 266 222 H287 Q291 222 291 228 V259 Q298 275 305 259 V228 Q305 222 309 222 H330 Q334 222 334 228 V259 Q341 275 348 259 V228 Q348 222 352 222 H373 Q377 222 377 228 V259 Q384 275 391 259 V228 Q391 222 395 222 H560" fill="none" stroke={teal} strokeWidth="2" />
      {/* Channel symbols denote AChRs at fold crests, never in the fold troughs. */}
      {[191, 230, 238, 273, 281, 316, 324, 359, 367, 402].map(x => (
        <g key={x} fill="none" stroke={teal} strokeWidth="1.8" strokeLinejoin="round">
          <path d={`M${x - 2} 226 V211 L${x - 5} 204 M${x + 2} 226 V211 L${x + 5} 204`} />
          <path d={`M${x - 5} 204 L${x - 1} 208 M${x + 5} 204 L${x + 1} 208`} />
        </g>
      ))}
      <path d="M40 231 H175 M418 231 H560" fill="none" stroke="#BED8CE" strokeWidth="1" />

      {showSignal && <>
        <path d="M305 52 V78" fill="none" stroke={signal} strokeWidth="1.5" strokeDasharray={impaired ? '3 4' : undefined} markerEnd={`url(#${instanceId}-signal)`} />
        <path d="M423 246 H538" fill="none" stroke={signal} strokeWidth="1.7" strokeDasharray={impaired ? '4 5' : undefined} markerEnd={`url(#${instanceId}-signal)`} />
        {impaired && <path d="M473 238 L478 246 L473 254" fill="none" stroke={signal} strokeWidth="1.5" />}
      </>}
    </g>
  )
}
