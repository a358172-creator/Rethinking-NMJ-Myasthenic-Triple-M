import { useId, type KeyboardEvent } from 'react'

type Structure = 'heart' | 'muscle' | 'nmj'

interface AnatomicalFigureProps {
  selected: Structure
  onSelect: (id: Structure) => void
  compact?: boolean
}

const navy = '#14283F'
const teal = '#338A8A'
const burgundy = '#93485A'
const amber = '#BD8A42'
const muted = '#627384'

/** Original, editable anatomical schematic. Tissue links are conceptual, not cohort findings. */
export function AnatomicalFigure({ selected, onSelect, compact = false }: AnatomicalFigureProps) {
  const instanceId = useId().replace(/:/g, '')
  const activate = (event: KeyboardEvent<SVGGElement>, structure: Structure) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(structure)
    }
  }
  const selection = (structure: Structure, label: string) => ({
    className: `anatomy-hit-target${selected === structure ? ' is-selected' : ''}`,
    role: 'button',
    tabIndex: 0,
    'aria-label': `${label}${selected === structure ? ', selected' : ''}`,
    'aria-pressed': selected === structure,
    onClick: () => onSelect(structure),
    onKeyDown: (event: KeyboardEvent<SVGGElement>) => activate(event, structure),
    style: { cursor: 'pointer' },
  })
  const border = (structure: Structure) => selected === structure ? navy : '#D9E3E8'

  return (
    <svg
      className={`anatomical-figure${compact ? ' anatomical-figure--compact' : ''}`}
      viewBox="0 0 660 650"
      xmlns="http://www.w3.org/2000/svg"
      role="group"
      aria-labelledby={`${instanceId}-title ${instanceId}-description`}
    >
      <title id={`${instanceId}-title`}>Three tissues, potentially overlapping mechanisms</title>
      <desc id={`${instanceId}-description`}>
        Select the myocardium, skeletal muscle, or neuromuscular junction to explore its physiology and
        evidence. Dashed links from immune checkpoint blockade indicate possible tissue involvement,
        not a proven shared antigen. The enlarged neuromuscular junction shows normal architecture.
      </desc>
      <defs>
        <marker id={`${instanceId}-arrow`} markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke={muted} strokeWidth="1.2" />
        </marker>
        <clipPath id={`${instanceId}-muscle-clip`}>
          <path d="M42 61 C69 52 74 20 126 15 C176 10 213 43 240 60 L240 81 C211 96 179 124 126 126 C74 129 69 94 42 82Z" />
        </clipPath>
      </defs>

      {/* These branches express a clinical possibility, never a universal molecular pathway. */}
      <g aria-hidden="true">
        <path d="M330 91 V109 M330 109 C330 123 172 113 172 138 M330 109 C330 123 487 113 487 138" fill="none" stroke={muted} strokeWidth="1.4" strokeDasharray="4 5" markerEnd={`url(#${instanceId}-arrow)`} />
        <rect x="190" y="24" width="280" height="67" rx="6" fill="#F4F7F8" stroke="#D9E3E8" />
        <path d="M215 46 L224 52 L224 66 L215 72 L206 66 L206 52Z" fill="#FFFFFF" stroke={teal} strokeWidth="1.5" />
        <path d="M212 54 L219 63 M219 54 L212 63" stroke={teal} strokeWidth="1.5" />
        <text x="240" y="49" fill={navy} fontSize="14" fontWeight="600">Immune checkpoint blockade</text>
        <text x="240" y="71" fill={muted} fontSize="11.5">Possible loss of peripheral tolerance</text>
      </g>

      <g {...selection('heart', 'Explore heart and myocardium')}>
        <title>01 · Heart / myocardium</title>
        <rect className="anatomy-region" x="36" y="151" width="281" height="254" rx="7" fill={selected === 'heart' ? '#F9F5F6' : '#FFFFFF'} stroke={border('heart')} strokeWidth={selected === 'heart' ? 2 : 1} />
        <g aria-hidden="true">
          <circle cx="59" cy="175" r="11" fill={selected === 'heart' ? navy : '#EDF1F4'} />
          <text x="59" y="179" textAnchor="middle" fill={selected === 'heart' ? '#FFFFFF' : navy} fontSize="10" fontWeight="700">01</text>
          <text className="anatomy-label" x="80" y="180" fill={navy} fontSize="16" fontWeight="600">Heart / myocardium</text>
          {selected === 'heart' && <text x="291" y="198" textAnchor="end" fill={navy} fontSize="10" fontWeight="600">SELECTED</text>}

          <g transform="translate(105 219) scale(.86)">
            {/* Simplified anterior cutaway: chamber walls and septum remain recognizable. */}
            <path d="M86 30 C62 3 29 15 19 49 C7 78 25 116 49 151 C68 178 96 194 103 185 C130 153 170 127 176 94 C184 67 167 37 137 38 C118 21 100 20 86 30Z" fill={selected === 'heart' ? '#D8AAB4' : '#E1C4CB'} stroke={burgundy} strokeWidth={selected === 'heart' ? 2.5 : 1.8} />
            <path d="M41 51 C19 67 30 99 62 136 C79 157 90 174 102 182 C101 143 94 109 79 81 C68 62 52 47 41 51Z" fill="#F4E3E7" stroke={burgundy} strokeWidth="1.5" />
            <path d="M117 55 C147 49 168 72 159 100 C151 124 127 150 109 172 C113 132 108 105 100 86 C95 73 104 59 117 55Z" fill="#F7EBEE" stroke={burgundy} strokeWidth="1.5" />
            <path d="M78 78 C94 104 102 135 102 175" fill="none" stroke={burgundy} strokeWidth="8" />
            <path d="M42 18 V-6 H59 V31" fill="#D9E5EC" stroke="#5D748A" strokeWidth="1.8" />
            <path d="M83 42 V17 C83 -8 110 -20 133 -9 C150 -1 156 10 156 28 L139 28 C139 11 129 4 116 4 C104 4 100 12 100 23 V43Z" fill="#C895A1" stroke={burgundy} strokeWidth="2" />
            <path d="M109 -10 L108 -29 M124 -12 L129 -29 M139 -4 L150 -21" fill="none" stroke={burgundy} strokeWidth="8" />
            <path d="M109 -10 L108 -29 M124 -12 L129 -29 M139 -4 L150 -21" fill="none" stroke="#DDB5BF" strokeWidth="4.5" />
            <path d="M76 62 C73 40 91 18 111 20 L138 31 L131 46 L108 37 C95 37 91 52 94 66Z" fill="#C2D7DE" stroke="#5D748A" strokeWidth="1.8" />
            <path d="M101 26 L75 17 L59 23" fill="none" stroke="#5D748A" strokeWidth="11" />
            <path d="M101 26 L75 17 L59 23" fill="none" stroke="#C2D7DE" strokeWidth="7.5" />
            <path d="M60 46 C70 57 82 60 85 71 M122 65 C136 92 129 121 113 149 M44 72 C59 90 67 106 78 120" fill="none" stroke={burgundy} strokeWidth="1" opacity=".65" />
            <path d="M57 40 C69 56 68 65 82 76 L90 104 L90 122 M90 105 L118 117 M90 122 L77 142" fill="none" stroke={amber} strokeWidth="2" strokeDasharray="2.5 3.5" />
            <circle cx="57" cy="40" r="4" fill={amber} stroke="#FFFFFF" strokeWidth="1.2" />
            <circle cx="82" cy="76" r="3.5" fill={amber} stroke="#FFFFFF" strokeWidth="1.2" />
            <circle cx="90" cy="105" r="3" fill={amber} />
          </g>
          {!compact && <>
            <path d="M86 210 H132 L185 212" fill="none" stroke={muted} strokeWidth=".9" />
            <text className="anatomy-small-label" x="50" y="207" fill={muted} fontSize="10.5">Aortic arch</text>
            <path d="M83 326 H117 L139 320" fill="none" stroke={muted} strokeWidth=".9" />
            <text className="anatomy-small-label" x="50" y="323" fill={muted} fontSize="10.5">Myocardium</text>
            <text x="51" y="386" fill={muted} fontSize="10.5">Dotted pathway: conduction schematic</text>
          </>}
        </g>
      </g>

      <g {...selection('muscle', 'Explore skeletal muscle')}>
        <title>02 · Skeletal muscle</title>
        <rect className="anatomy-region" x="343" y="151" width="281" height="254" rx="7" fill={selected === 'muscle' ? '#F2F8F7' : '#FFFFFF'} stroke={border('muscle')} strokeWidth={selected === 'muscle' ? 2 : 1} />
        <g aria-hidden="true">
          <circle cx="366" cy="175" r="11" fill={selected === 'muscle' ? navy : '#EDF1F4'} />
          <text x="366" y="179" textAnchor="middle" fill={selected === 'muscle' ? '#FFFFFF' : navy} fontSize="10" fontWeight="700">02</text>
          <text className="anatomy-label" x="388" y="180" fill={navy} fontSize="16" fontWeight="600">Skeletal muscle</text>
          {selected === 'muscle' && <text x="599" y="198" textAnchor="end" fill={navy} fontSize="10" fontWeight="600">SELECTED</text>}
          <g transform="translate(371 221) scale(.82)">
            {/* Tendons converge on a fusiform belly enclosed by connective tissue. */}
            <path d="M10 64 C25 64 34 63 47 60 L52 83 C37 81 25 80 10 80Z M235 60 C248 64 257 64 272 64 V80 C257 80 247 81 235 83Z" fill="#E8E6DF" stroke="#9B9D99" strokeWidth="1.3" />
            <path d="M42 61 C69 52 74 20 126 15 C176 10 213 43 240 60 L240 81 C211 96 179 124 126 126 C74 129 69 94 42 82Z" fill="none" stroke="#DFEAE5" strokeWidth="6" />
            <path d="M42 61 C69 52 74 20 126 15 C176 10 213 43 240 60 L240 81 C211 96 179 124 126 126 C74 129 69 94 42 82Z" fill={selected === 'muscle' ? '#A7C9C3' : '#D0E1DC'} stroke={teal} strokeWidth={selected === 'muscle' ? 2.5 : 1.8} />
            <g fill="none" stroke={teal} strokeWidth="1.15" clipPath={`url(#${instanceId}-muscle-clip)`}>
              {/* Layered parallel fascicles taper toward each tendon. */}
              <path d="M44 63 C88 30 136 17 184 40 L239 62" strokeWidth="3.7" opacity=".6" />
              <path d="M44 66 C90 42 141 31 185 49 L239 65" />
              <path d="M44 69 C91 53 143 44 188 59 L239 68" strokeWidth="3.7" opacity=".6" />
              <path d="M44 73 C91 68 143 62 190 70 L239 72" />
              <path d="M44 77 C91 84 144 85 190 81 L239 76" strokeWidth="3.7" opacity=".6" />
              <path d="M44 80 C91 99 145 105 188 94 L239 79" />
              <path d="M49 84 C93 115 146 122 185 106 L235 83" strokeWidth="3.7" opacity=".6" />
              {[78, 88, 98, 108, 118, 128, 138, 148, 158, 168, 178, 188, 198, 208].map(x => <path key={x} d={`M${x} 15 L${x + 2} 127`} stroke="#EEF5F1" strokeWidth="1" opacity=".65" />)}
            </g>
            <path d="M46 59 C90 26 132 3 183 33 M48 85 C89 112 134 139 184 110" fill="none" stroke={teal} strokeWidth=".8" opacity=".65" />
            {/* Small cutaway: longitudinal fibers terminate in a fascicle cross-section. */}
            <path d="M166 54 Q184 49 206 53 V89 Q185 94 166 90Z" fill="#DEECE6" stroke={teal} strokeWidth="1.1" />
            <path d="M168 59 L201 58 M168 67 L201 66 M168 75 L201 74 M168 83 L201 82" fill="none" stroke={teal} strokeWidth="1" />
            {[174, 181, 188, 195].map(x => <path key={x} d={`M${x} 55 V89`} fill="none" stroke="#FFFFFF" strokeWidth=".8" />)}
            <ellipse cx="206" cy="71" rx="11" ry="18" fill="#F3F8F5" stroke={teal} strokeWidth="1.2" />
            {[[203, 61], [209, 63], [201, 69], [208, 71], [202, 77], [210, 79], [205, 84]].map(([cx, cy], index) => <ellipse key={index} cx={cx} cy={cy} rx="2.5" ry="3.7" fill="#B7D2CE" stroke={teal} strokeWidth=".7" />)}
            {!compact && selected === 'muscle' && <g>
              {/* Generic immune cells and focal fiber disruption are conceptual, not N=38 histology. */}
              {[[116, 37], [133, 47]].map(([cx, cy], index) => <g key={index}>
                <circle cx={cx} cy={cy} r="6.5" fill="#F6E9EC" stroke={burgundy} strokeWidth="1.1" />
                <path d={`M${cx - 2.5} ${cy - 1} Q${cx} ${cy - 5} ${cx + 3} ${cy - 1} Q${cx + 1} ${cy + 4} ${cx - 2.5} ${cy - 1}`} fill={burgundy} opacity=".75" />
              </g>)}
              <ellipse cx="147" cy="78" rx="13" ry="9" fill="#F6F4EC" stroke={amber} strokeWidth="1.1" strokeDasharray="2.5 2.5" />
              <path d="M135 74 L143 74 M150 75 L159 75 M135 81 L140 81 M147 82 L158 82" fill="none" stroke={teal} strokeWidth="1.2" />
              <path d="M144 71 L141 77 L146 80 L143 85" fill="none" stroke={amber} strokeWidth="1.1" />
            </g>}
          </g>
          {!compact && <>
            {selected === 'muscle' ? <>
              <path d="M389 350 H456 L489 293" fill="none" stroke={muted} strokeWidth=".9" />
              <text className="anatomy-small-label" x="358" y="367" fill={navy} fontSize="11">Conceptual immune injury</text>
              <text className="anatomy-small-label" x="358" y="383" fill={muted} fontSize="10.5">Illustration, not cohort histology</text>
            </> : <>
              <path d="M383 352 H420 L458 298" fill="none" stroke={muted} strokeWidth=".9" />
              <text className="anatomy-small-label" x="358" y="367" fill={muted} fontSize="10.5">Parallel striated fibers</text>
            </>}
            <path d="M581 321 H557 L542 292" fill="none" stroke={muted} strokeWidth=".9" />
            <text className="anatomy-small-label" x="557" y="337" fill={muted} fontSize="10.5">Fascicle</text>
          </>}
        </g>
      </g>

      <g aria-hidden="true">
        <path d="M534 403 C534 437 480 422 450 442" fill="none" stroke={muted} strokeWidth="1.2" strokeDasharray="3 5" />
        {!compact && <text x="516" y="428" fill={muted} fontSize="10.5">Detail</text>}
      </g>
      <g {...selection('nmj', 'Explore the neuromuscular junction')}>
        <title>03 · Neuromuscular junction</title>
        <rect className="anatomy-region" x="99" y="447" width="462" height="173" rx="7" fill={selected === 'nmj' ? '#FBF8F2' : '#FFFFFF'} stroke={border('nmj')} strokeWidth={selected === 'nmj' ? 2 : 1} />
        <g aria-hidden="true">
          <circle cx="124" cy="472" r="11" fill={selected === 'nmj' ? navy : '#EDF1F4'} />
          <text x="124" y="476" textAnchor="middle" fill={selected === 'nmj' ? '#FFFFFF' : navy} fontSize="10" fontWeight="700">03</text>
          <text className="anatomy-label" x="145" y="477" fill={navy} fontSize="16" fontWeight="600">Neuromuscular junction</text>
          {selected === 'nmj' && <text x="538" y="475" textAnchor="end" fill={navy} fontSize="10" fontWeight="600">SELECTED</text>}
          {/* Presynaptic bouton over the folded motor endplate; AChRs occupy fold crests. */}
          <path d="M309 490 V501 C284 501 245 502 242 521 C240 535 258 542 286 542 H376 C404 542 421 535 419 521 C416 502 380 501 352 501 V490" fill="#D9E4EF" stroke="#5D748A" strokeWidth="1.5" />
          {[[271, 520], [292, 512], [312, 525], [337, 515], [360, 525], [389, 519]].map(([cx, cy], index) => <g key={index}><circle cx={cx} cy={cy} r="5.7" fill="#FFFFFF" stroke="#5D748A" strokeWidth="1" /><circle cx={cx - 1} cy={cy} r="1.2" fill={amber} /><circle cx={cx + 1.5} cy={cy + 1.8} r="1.2" fill={amber} /></g>)}
          <path d="M184 563 H260 V588 Q266 599 272 588 V563 H294 V588 Q300 599 306 588 V563 H328 V588 Q334 599 340 588 V563 H362 V588 Q368 599 374 588 V563 H475 V610 H184Z" fill="#E2EEEB" />
          <path d="M184 563 H260 V588 Q266 599 272 588 V563 H294 V588 Q300 599 306 588 V563 H328 V588 Q334 599 340 588 V563 H362 V588 Q368 599 374 588 V563 H475" fill="none" stroke={teal} strokeWidth="1.6" />
          {[250, 283, 316, 350, 386].map(x => <path key={x} d={`M${x} 563 V556 M${x} 556 L${x - 3} 551 M${x} 556 L${x + 3} 551`} fill="none" stroke={teal} strokeWidth="1.7" />)}
          {[[282, 547], [313, 550], [339, 546], [352, 550]].map(([cx, cy], index) => <circle className="ach-particle" key={index} cx={cx} cy={cy} r="1.8" fill={amber} />)}
          {!compact && <>
            <text className="anatomy-small-label" x="114" y="517" fill={muted} fontSize="10.5">Motor nerve terminal</text>
            <path d="M214 519 H237" fill="none" stroke={muted} strokeWidth=".9" />
            <text className="anatomy-small-label" x="434" y="543" fill={muted} fontSize="10.5">ACh</text>
            <path d="M430 542 H408 L361 549" fill="none" stroke={muted} strokeWidth=".9" />
            <text className="anatomy-small-label" x="392" y="594" fill={muted} fontSize="10.5">Muscle membrane</text>
          </>}
        </g>
      </g>
      <text x="330" y="642" textAnchor="middle" fill={muted} fontSize="11">
        Conceptual tissue map · normal NMJ architecture · not to scale
      </text>
    </svg>
  )
}
