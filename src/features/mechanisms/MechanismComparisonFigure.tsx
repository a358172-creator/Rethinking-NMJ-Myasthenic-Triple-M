import { useId } from 'react';
import { ScientificFigure } from '../../components/figures/ScientificFigure';
import { frozenStudy } from '../../data/science';
import './MechanismComparisonFigure.css';

interface Props {
  focus: 'nmj' | 'muscle' | 'overlap';
}

function SynapticMechanism() {
  const id = useId();
  const titleId = `${id}-title`;
  const descId = `${id}-description`;

  return <svg className="mechanism-figure-svg" viewBox="0 0 560 390" role="img" aria-labelledby={`${titleId} ${descId}`}>
    <title id={titleId}>Conceptual antibody-associated postsynaptic NMJ impairment</title>
    <desc id={descId}>A motor-nerve terminal contains acetylcholine vesicles. Released acetylcholine crosses the synaptic cleft. Antibodies are drawn at postsynaptic acetylcholine receptors as one example of impaired transmission. The muscle fiber is shown with organized contractile architecture. This illustration does not establish the mechanism in a Triple M patient.</desc>
    <defs>
      <linearGradient id={`${id}-axon`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.18" />
      </linearGradient>
      <linearGradient id={`${id}-fiber`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#be123c" stopOpacity="0.24" />
        <stop offset="100%" stopColor="#881337" stopOpacity="0.52" />
      </linearGradient>
      <marker id={`${id}-amber-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 1 10 5 0 9Z" fill="#fbbf24" />
      </marker>
      <marker id={`${id}-cyan-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 1 10 5 0 9Z" fill="#38bdf8" />
      </marker>
    </defs>

    <path d="M230 14V74C160 94 150 164 215 179H345C410 164 400 94 330 74V14" fill={`url(#${id}-axon)`} stroke="#38bdf8" strokeWidth="2.5" />
    <text x="280" y="44" textAnchor="middle" fill="#e0f2fe" fontSize="13" fontWeight="600">Motor axon</text>
    <text x="280" y="157" textAnchor="middle" fill="#bae6fd" fontSize="13">Presynaptic terminal</text>
    <g fill="#38bdf8" fillOpacity="0.4" stroke="#bae6fd" strokeWidth="1.2">
      <circle cx="240" cy="109" r="11" />
      <circle cx="280" cy="99" r="11" />
      <circle cx="320" cy="114" r="11" />
      <circle cx="260" cy="133" r="9" />
      <circle cx="305" cy="133" r="9" />
    </g>
    <text x="34" y="105" fill="#bae6fd" fontSize="13">ACh vesicles</text>
    <path d="M130 101H223" stroke="#38bdf8" strokeWidth="1.3" markerEnd={`url(#${id}-cyan-arrow)`} />
    <g fill="#7dd3fc">
      <circle cx="235" cy="195" r="3.5" />
      <circle cx="255" cy="203" r="3.5" />
      <circle cx="280" cy="192" r="3.5" />
      <circle cx="300" cy="201" r="3.5" />
      <circle cx="325" cy="195" r="3.5" />
      <circle cx="268" cy="212" r="3.5" />
    </g>
    <text x="34" y="194" fill="#7dd3fc" fontSize="13">Synaptic cleft</text>
    <path d="M143 190H217" stroke="#38bdf8" strokeWidth="1.3" markerEnd={`url(#${id}-cyan-arrow)`} />

    <path d="M40 238H160C175 238 175 284 190 284S205 238 220 238S235 284 250 284S265 238 280 238S295 284 310 284S325 238 340 238S355 284 370 284S385 238 400 238H520V373H40Z" fill={`url(#${id}-fiber)`} stroke="#f43f5e" strokeWidth="2.5" />
    <g fill="#10b981" stroke="#a7f3d0" strokeWidth="1.2">
      {[160, 220, 280, 340, 400].map((x) => <rect key={x} x={x - 4} y="230" width="8" height="15" rx="2" />)}
    </g>
    <g stroke="#fbbf24" strokeWidth="2.4" fill="none">
      {[160, 220, 280, 340].map((x) => <path key={x} d={`M${x - 8} 214L${x} 222L${x + 8} 214M${x} 222V233`} />)}
    </g>
    <text x="455" y="183" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="600">Anti-AChR</text>
    <text x="455" y="201" textAnchor="middle" fill="#fbbf24" fontSize="13">antibodies</text>
    <path d="M413 208 356 220" stroke="#fbbf24" strokeWidth="1.5" markerEnd={`url(#${id}-amber-arrow)`} />
    <text x="447" y="276" textAnchor="middle" fill="#a7f3d0" fontSize="13">AChRs</text>
    <path d="M437 263 409 241" stroke="#10b981" strokeWidth="1.4" />
    <g stroke="#fda4af" strokeWidth="1.8" strokeDasharray="12 4" opacity="0.45">
      <path d="M64 315H496M64 336H496M64 357H496" />
    </g>
    <rect x="152" y="320" width="256" height="31" rx="5" fill="#381323" fillOpacity="0.95" />
    <text x="280" y="340" textAnchor="middle" fill="#fecdd3" fontSize="13" fontWeight="600">Organized contractile architecture</text>
  </svg>;
}

function MuscleMechanism() {
  const id = useId();
  const titleId = `${id}-title`;
  const descId = `${id}-description`;

  return <svg className="mechanism-figure-svg" viewBox="0 0 560 390" role="img" aria-labelledby={`${titleId} ${descId}`}>
    <title id={titleId}>Conceptual immune-mediated muscle-fiber injury</title>
    <desc id={descId}>An illustrative ICI-associated immune pathway includes CD8-positive T cells, a macrophage and cytotoxic mediators above a muscle fiber with membrane disruption and fragmented contractile structures. An adjacent synapse illustrates that muscle injury can occur with preserved NMJ function. Preserved function and this cellular pathway are not established in every Triple M patient.</desc>
    <defs>
      <linearGradient id={`${id}-axon`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.18" />
      </linearGradient>
      <linearGradient id={`${id}-injury`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fb7185" stopOpacity="0.22" />
        <stop offset="50%" stopColor="#9f1239" stopOpacity="0.38" />
        <stop offset="100%" stopColor="#4c0519" stopOpacity="0.75" />
      </linearGradient>
      <marker id={`${id}-rose-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 1 10 5 0 9Z" fill="#fb7185" />
      </marker>
      <marker id={`${id}-amber-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 1 10 5 0 9Z" fill="#fbbf24" />
      </marker>
    </defs>

    <path d="M104 27V72C64 87 59 137 99 147H169C209 137 204 87 164 72V27" fill={`url(#${id}-axon)`} stroke="#38bdf8" strokeWidth="2" />
    <text x="134" y="115" textAnchor="middle" fill="#bae6fd" fontSize="13" fontWeight="600">NMJ</text>
    <g fill="#38bdf8">
      <circle cx="114" cy="163" r="3.5" />
      <circle cx="134" cy="171" r="3.5" />
      <circle cx="154" cy="163" r="3.5" />
    </g>
    <path d="M54 185H95V207H107V185H130V211H143V185H166V207H178V185H214" fill="none" stroke="#10b981" strokeWidth="2" />
    <text x="134" y="231" textAnchor="middle" fill="#a7f3d0" fontSize="13">Function may be preserved</text>

    <rect x="246" y="18" width="289" height="77" rx="8" fill="#1f2937" stroke="#fb7185" strokeWidth="1.2" />
    <text x="390" y="40" textAnchor="middle" fill="#fda4af" fontSize="13" fontWeight="600">ICI-associated immune activation</text>
    <text x="390" y="62" textAnchor="middle" fill="#e2e8f0" fontSize="13">Loss of immune tolerance</text>
    <text x="390" y="82" textAnchor="middle" fill="#fbbf24" fontSize="12">Illustrative injury pathway</text>
    <path d="M390 95V114" stroke="#fb7185" strokeWidth="1.6" markerEnd={`url(#${id}-rose-arrow)`} />

    {[304, 399].map((x) => <g key={x}>
      <circle cx={x} cy="156" r="29" fill="#be123c" stroke="#fda4af" strokeWidth="2" />
      <circle cx={x} cy="156" r="17" fill="#881337" />
      <text x={x} y="160" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">CD8+ T</text>
      <path d={`M${x} 186V239`} stroke="#fb7185" strokeWidth="2" markerEnd={`url(#${id}-rose-arrow)`} />
    </g>)}
    <circle cx="494" cy="156" r="35" fill="#7c2d12" stroke="#fdba74" strokeWidth="2" />
    <text x="494" y="160" textAnchor="middle" fill="#ffedd5" fontSize="12" fontWeight="600">Macrophage</text>
    <path d="M494 192V239" stroke="#fbbf24" strokeWidth="2" markerEnd={`url(#${id}-amber-arrow)`} />
    <rect x="320" y="204" width="158" height="23" rx="4" fill="#241522" />
    <text x="399" y="220" textAnchor="middle" fill="#fecdd3" fontSize="12">Cytotoxic mediators</text>

    <path d="M40 260H180L205 276L235 255L275 260L300 286L340 260H385L415 282L450 260H520V373H40Z" fill={`url(#${id}-injury)`} stroke="#fb7185" strokeWidth="2.5" strokeDasharray="14 5" />
    <text x="280" y="304" textAnchor="middle" fill="#ffe4e6" fontSize="14" fontWeight="600">Muscle-fiber injury / possible necrosis</text>
    <g stroke="#fda4af" strokeWidth="2" opacity="0.7">
      <path d="M60 326H170M220 333 310 321M360 329 480 336M70 352 150 360M200 348 290 359M350 356 490 346" />
    </g>
  </svg>;
}

export function MechanismComparisonFigure({ focus }: Props) {
  const scrollHintId = useId();
  return <ScientificFigure
    number="01"
    title="Two possible pathways to an MG-like phenotype"
    subtitle="Conceptual mechanisms in ICI-associated Triple M"
    caption={<>Primary NMJ dysfunction and muscle injury can coexist. The tested subsets differ and do not establish a dominant mechanism or classify individual patients. Neither muscle injury nor shared symptoms establish the cause of ptosis or diplopia. Frozen aggregate findings are reproduced; source and category attribution remain unresolved.</>}
  >
    <p className="mechanism-figure-scroll-hint" id={scrollHintId}>Swipe horizontally to inspect each diagram, or focus it and use the left and right arrow keys.</p>
    <div className="sfn-panel-grid sfn-panel-grid--two mechanism-figure-panels">
      <article className={`sfn-panel mechanism-figure-panel mechanism-figure-panel--nmj ${focus !== 'muscle' ? 'mechanism-figure-panel--emphasized' : ''}`}>
        <span className="sfn-panel-kicker">A · NEUROMUSCULAR TRANSMISSION</span>
        <h4 className="sfn-panel-heading">Primary NMJ dysfunction</h4>
        <p className="sfn-panel-note mechanism-figure-intro">An antibody-associated postsynaptic pathway is shown as one conceptual example of reduced transmission safety margin.</p>
        <div className="sfn-figure-scroll mechanism-figure-scroll" tabIndex={0} role="region" aria-label="Scrollable NMJ mechanism diagram" aria-describedby={scrollHintId}>
          <SynapticMechanism />
        </div>
        <p className="mechanism-figure-evaluation">Physiological evaluation: RNS / SFEMG</p>
        <div className="sfn-metric mechanism-figure-metric">
          <strong className="sfn-metric-value">{frozenStudy.formalNmj.abnormal}</strong>
          <span className="sfn-metric-label">Formal NMJ abnormalities among evaluated patients<br />Exact 95% CI: {frozenStudy.formalNmj.ci}</span>
        </div>
        <p className="sfn-note mechanism-figure-caution">Only {frozenStudy.formalNmj.evaluated} had formal testing; SFEMG in {frozenStudy.sfemg.tested} patient is nested within those {frozenStudy.formalNmj.tested}. This result does not exclude NMJ disease; missing tests are not negative findings.</p>
      </article>

      <article className={`sfn-panel mechanism-figure-panel mechanism-figure-panel--muscle ${focus !== 'nmj' ? 'mechanism-figure-panel--emphasized' : ''}`}>
        <span className="sfn-panel-kicker">B · MUSCLE-FIBER INTEGRITY</span>
        <h4 className="sfn-panel-heading">Muscle-predominant immune injury</h4>
        <p className="sfn-panel-note mechanism-figure-intro">An illustrative cellular injury pathway. Selected pathology reports support muscle involvement; this pathway is not established in every patient.</p>
        <div className="sfn-figure-scroll mechanism-figure-scroll" tabIndex={0} role="region" aria-label="Scrollable immune-mediated muscle injury diagram" aria-describedby={scrollHintId}>
          <MuscleMechanism />
        </div>
        <p className="mechanism-figure-evaluation">Muscle evaluation: CK / needle EMG / MRI / biopsy</p>
        <div className="sfn-metric mechanism-figure-metric">
          <strong className="sfn-metric-value">{frozenStudy.needleEmg.result}</strong>
          <span className="sfn-metric-label">Myopathic needle-EMG pattern<br />{frozenStudy.needleEmg.percentage} among evaluated patients<br />Exact 95% CI: {frozenStudy.needleEmg.ci}</span>
        </div>
        <p className="sfn-note mechanism-figure-caution">A myopathic pattern supports muscle involvement. It does not independently confirm inflammatory myositis or exclude concurrent NMJ dysfunction.</p>
      </article>
    </div>
  </ScientificFigure>;
}
