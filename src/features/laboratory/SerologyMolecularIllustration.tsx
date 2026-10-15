import { useId, useState } from 'react';
import type { SerologyId } from '../../data/laboratory';
import { MedicalArtwork } from '../../components/figures/MedicalArtwork';
import './SerologyMolecularIllustration.css';

type AssayExample = 'positive' | 'negative' | 'indeterminate';

const targets: Record<SerologyId, { title: string; concept: string; explanation: string }> = {
  achr: { title: 'AChR · receptor target', concept: 'Ligand-gated ion channel', explanation: 'AChR is a nicotinic receptor on the postsynaptic membrane. The small target diagram summarizes its channel organization; antibody detection is a separate assay observation.' },
  musk: { title: 'MuSK · organizing protein', concept: 'Postsynaptic organization', explanation: 'MuSK is a membrane-associated kinase involved in organizing the receptor apparatus. It is a different assay target from AChR; the diagram does not depict a proven ICI-specific antibody mechanism.' },
  context: { title: 'Detection across clinical time', concept: 'Baseline → later sample → correlation', explanation: 'Available pre-ICI and later samples can clarify the timing of detection. Without a baseline sample, its onset is uncertain. Clinical and physiological correlation remain separate evidence domains.' },
};

const examples: Record<AssayExample, { label: string; title: string; text: string }> = {
  positive: { label: 'Positive', title: 'Immunoreactivity detected', text: 'Supports recognition of the tested antigen under the assay conditions. It does not independently demonstrate impaired NMJ transmission or establish MG.' },
  negative: { label: 'Negative', title: 'Immunoreactivity not detected', text: 'No detectable reactivity to the tested antigen under those assay conditions. This does not automatically exclude an NMJ disorder or a different immune target.' },
  indeterminate: { label: 'Indeterminate', title: 'Result requires clarification', text: 'An equivocal or technically unresolved assay needs method-specific interpretation. This differs from a negative result; absent testing or reporting must also remain missing.' },
};

function AntibodySymbol({ transform }: { transform?: string }) {
  return <g transform={transform} className="serology-antibody-symbol"><path d="M-30 -31 L-12 -8 L0 3 L12 -8 L30 -31 M0 3 V37" /><path d="M-35 -24 L-18 -2 L-7 9 V37 M35 -24 L18 -2 L7 9 V37" /></g>;
}

/** Small, editable molecular concepts supplement the original editorial art.
 * These symbols are deliberately non-atomic and not to molecular scale. */
function TargetConcept({ selected }: { selected: SerologyId }) {
  return <svg className="serology-target-concept" viewBox="0 0 480 190" role="img" aria-label={targets[selected].concept} data-serology-target={selected}>
    {selected === 'context' ? <g className="serology-context-samples">
      <path d="M110 95 H365" className="serology-context-link" />
      {[90, 240].map(x => <g key={x} transform={`translate(${x} 92)`}><path d="M-22 -42 H22 V28 A22 22 0 0 1-22 28Z" className="serology-sample-tube" /><path d="M-17 4 H17 V28 A17 17 0 0 1-17 28Z" className="serology-sample-fill" /></g>)}
      <g transform="translate(385 92)"><path d="M-32 -22 H32 V22 H-32Z" className="serology-correlation-frame" /><path d="M-21 3 L-10 -5 L0 9 L12 -10 L22 -2" className="serology-context-trace" /></g>
      <text x="90" y="163" textAnchor="middle">Pre-ICI, if available</text><text x="240" y="163" textAnchor="middle">Later sample</text><text x="385" y="163" textAnchor="middle">Correlate</text>
    </g> : <g>
      <path d="M38 117 H442 M38 131 H442" className="serology-membrane" />
      {selected === 'achr' ? <g transform="translate(240 96)" className="serology-achr-target">
        <path d="M-24 -3 V48 H-7 V9 M24 -3 V48 H7 V9" className="serology-channel-subunit" />
        {[[0, -36], [34, -12], [21, 27], [-21, 27], [-34, -12]].map(([x, y], index) => <ellipse key={x + y} cx={x} cy={y} rx="19" ry="17" className={`serology-channel-subunit serology-channel-subunit--${index}`} />)}
        <circle r="11" className="serology-channel-opening" /><path d="M0 -72 V-57" className="serology-ion-arrow" /><circle cx="0" cy="-78" r="5" className="serology-ion" />
      </g> : <g className="serology-musk-target">
        <path d="M151 146 V89" className="serology-single-pass" /><path d="M151 90 C129 74 136 48 151 42 C168 46 175 64 163 80Z" className="serology-musk-extracellular" /><ellipse cx="151" cy="152" rx="18" ry="11" className="serology-kinase" />
        <path d="M180 100 C212 78 230 84 254 95" className="serology-organization-link" />
        {[280, 305, 330].map(x => <path key={x} d={`M${x - 7} 146 V83 Q${x} 64 ${x + 7} 83 V146`} className="serology-channel-subunit" />)}
        <text x="151" y="182" textAnchor="middle">MuSK</text><text x="305" y="182" textAnchor="middle">AChR apparatus</text>
      </g>}
      {selected === 'achr' && <text x="240" y="182" textAnchor="middle">Simplified receptor channel · not to scale</text>}
    </g>}
  </svg>;
}

export function SerologyMolecularIllustration({ selected }: { selected: SerologyId }) {
  const [example, setExample] = useState<AssayExample>('indeterminate');
  const id = useId();
  const current = examples[example];
  return <figure className="serology-molecular-figure" aria-labelledby={`${id}-title`}>
    <div className="serology-molecular-heading"><span className="eyebrow">MOLECULAR RECOGNITION / CONCEPTUAL ARTWORK</span><h4 id={`${id}-title`}>Antibody recognition</h4><p>Illustrative antigen binding, separate from a functional transmission test.</p></div>
    <div className="serology-molecular-art"><div className="serology-molecular-art-frame"><MedicalArtwork illustration="antibody-binding" />
      <svg className="serology-artwork-connectors" viewBox="0 0 1536 1024" aria-hidden="true">
        <path d="M198 414 L371 414 L518 286 M1310 562 L1200 562 L1090 631 M190 934 L383 934 L500 810" />
        {[[518, 286], [1090, 631], [500, 810]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="5" className="serology-connector-dot" />)}
        {[[170, 414, '1'], [1338, 562, '2'], [162, 934, '3']].map(([x, y, label]) => <g key={label} transform={`translate(${x} ${y})`}><circle r="26" /><text textAnchor="middle" y="9">{label}</text></g>)}
      </svg></div><div className="serology-molecular-reading-key"><span><b>1</b> Antibody</span><span><b>2</b> Generic antigen</span><span><b>3</b> Lipid membrane</span></div>
      <p className="serology-generic-antigen-note">The blue antigen is a generic membrane protein. Its shape does not model AChR or MuSK; their distinct concepts are shown below.</p>
    </div>
    <div className="serology-target-inset"><span className="serology-inset-label">{targets[selected].title}</span><span className="serology-target-concept-label">{targets[selected].concept}</span><TargetConcept selected={selected} /><p>{targets[selected].explanation}</p></div>
    <div className="serology-result-examples">
      <h4>Explore a qualitative assay example</h4><p className="serology-example-note">Teaching controls · these are not additional cohort results.</p>
      <div className="serology-result-controls" role="group" aria-label="Qualitative serology examples">{(Object.keys(examples) as AssayExample[]).map(value => <button type="button" key={value} aria-pressed={value === example} aria-controls={`${id}-interpretation`} onClick={() => setExample(value)}>{examples[value].label}</button>)}</div>
      <div className={`serology-example serology-example--${example}`} id={`${id}-interpretation`} aria-live="polite" data-assay-example={example}>
        <svg viewBox="0 0 230 115" role="img" aria-label={`Schematic ${example} assay interpretation`}>
          <AntibodySymbol transform="translate(63 47) scale(.75)" />
          <path d="M160 29 Q180 13 199 29 L194 59 Q180 75 165 59Z" className="serology-assay-antigen" />
          {example === 'positive' && <path d="M90 41 Q118 19 157 35" className="serology-binding-connector" />}
          {example === 'negative' && <><path d="M98 39 H119 M141 39 H154" className="serology-negative-connector" /><path d="M128 27 V51" className="serology-no-detection" /></>}
          {example === 'indeterminate' && <><path d="M95 40 H155" className="serology-uncertain-connector" /><text x="125" y="74" textAnchor="middle" className="serology-uncertain-sign">?</text></>}
          <text x="63" y="101" textAnchor="middle">Assay recognition</text><text x="180" y="101" textAnchor="middle">Antigen</text>
        </svg>
        <div><strong>{current.title}</strong><p>{current.text}</p></div>
      </div>
    </div>
    <figcaption>Original editorial raster illustration with separate editable molecular symbols. Relative molecular sizes, binding geometry and signal marks are conceptual. No assay titre, prevalence or individual result is depicted.</figcaption>
  </figure>;
}
