import { useState } from 'react';
import { mechanisms, sharedManifestations, frozenStudy } from '../../data/science';
import { EvidencePanel } from '../evidence/EvidencePanel';
import type { EvidenceItem } from '../../data/science';

type ComparisonState = 'nmj' | 'muscle' | 'overlap';
const interpretation: Record<ComparisonState, { title: string; text: string }> = {
  nmj: { title: 'A question of transmission', text: 'Primary NMJ dysfunction can reduce the safety margin of neuromuscular transmission and cause fatigable weakness. Clinical pattern, serology and formal electrophysiology contribute different evidence; no single generic symptom assigns this mechanism.' },
  muscle: { title: 'A question of muscle injury', text: 'Immune-mediated skeletal-muscle injury can involve ocular, bulbar, cervical, proximal and respiratory muscles. This distribution may resemble MG. Myopathic physiology supports muscle involvement; inflammatory pathology requires separate evidence.' },
  overlap: { title: 'Potentially overlapping mechanisms', text: 'Primary NMJ dysfunction and immune-mediated muscle injury may coexist. Confirming one does not automatically exclude the other. The comparison is an explanatory framework, not a binary diagnostic rule.' },
};
const comparisonEvidence: EvidenceItem[] = [
  { kind: 'physiology', text: 'Muscle contraction depends on both neuromuscular transmission and the integrity of the muscle fiber.' },
  { kind: 'literature', text: 'Published ICI-associated myositis observations support an MG-like distribution of muscle injury and the possibility of coexisting NMJ disease.', referenceIds: ['plomp-2025', 'ucem-2026'] },
  { kind: 'proposed', text: 'The relative contribution of each mechanism in individual Triple M patients remains unresolved. A universal shared autoantigen is not established.' },
  { kind: 'cohort', text: `The phenotype was present in ${frozenStudy.cohort.phenotype}. Formal NMJ abnormalities were documented in ${frozenStudy.formalNmj.abnormal} evaluated patients (exact 95% CI, ${frozenStudy.formalNmj.ci}); the result does not exclude NMJ disease.` },
];

export function MechanismComparison() {
  const [focus, setFocus] = useState<ComparisonState>('overlap');
  return <section className={`comparison comparison-focus-${focus}`} id="mechanism-panel" aria-label="Scientific interpretation">
    <div className="comparison-state-controls" role="group" aria-label="Comparison interpretation">
      <button aria-pressed={focus === 'nmj'} onClick={() => setFocus('nmj')}>Primary NMJ dysfunction</button>
      <button aria-pressed={focus === 'muscle'} onClick={() => setFocus('muscle')}>Muscle-predominant immune injury</button>
      <button aria-pressed={focus === 'overlap'} onClick={() => setFocus('overlap')}>Potential overlap</button>
    </div>
    <div className="comparison-paths">
      <article className={`comparison-card nmj-card ${focus !== 'muscle' ? 'is-emphasized' : ''}`}><span className="eyebrow">MECHANISM A</span><h3>Primary NMJ<br />dysfunction</h3><svg viewBox="0 0 360 126" aria-label="Conceptual reduced neuromuscular transmission" role="img"><path d="M110 8v27c-35 6-49 34-30 49h124c21-18 3-46-30-49V8" fill="#e6f0f0" stroke="#338A8A" strokeWidth="2"/><circle cx="111" cy="59" r="7" fill="none" stroke="#338A8A"/><circle cx="143" cy="64" r="7" fill="none" stroke="#338A8A"/><circle cx="172" cy="60" r="7" fill="none" stroke="#338A8A"/><path d="M66 111h38v-9h12v9h38v-9h12v9h43" fill="none" stroke="#243B53" strokeWidth="2"/><path d="m142 83 0 19" stroke="#BD8A42" strokeWidth="2" strokeDasharray="3 4"/><text x="241" y="68" fontSize="11" fill="#243B53">Transmission</text><text x="241" y="84" fontSize="11" fill="#243B53">safety margin ↓</text></svg><p>Impaired synaptic transmission can reduce muscle activation.</p><span className="path-measure">Physiological evaluation: RNS / SFEMG</span></article>
      <article className={`comparison-card muscle-card ${focus !== 'nmj' ? 'is-emphasized' : ''}`}><span className="eyebrow">MECHANISM B</span><h3>Muscle-predominant<br />immune injury</h3><svg viewBox="0 0 360 126" aria-label="Conceptual immune-mediated muscle-fiber injury" role="img"><path d="M35 60C78 13 175 13 226 60c-45 48-151 49-191 0Z" fill="#f5e8ec" stroke="#93485A" strokeWidth="2"/>{[42,54,66,78].map(y=><path key={y} d={`M65 ${y} Q139 ${y-12} 195 ${y}`} fill="none" stroke="#b77383" strokeWidth="1.5"/>)}<path d="m141 27-8 22 11 13-13 14 8 20" fill="none" stroke="#93485A" strokeWidth="2" strokeDasharray="4 3"/><circle cx="215" cy="21" r="9" fill="#fff" stroke="#93485A"/><circle cx="231" cy="91" r="9" fill="#fff" stroke="#93485A"/><text x="255" y="57" fontSize="11" fill="#243B53">Muscle-fiber</text><text x="255" y="73" fontSize="11" fill="#243B53">integrity ↓</text></svg><p>Muscle-fiber injury can reduce force despite intact synaptic transmission.</p><span className="path-measure">Muscle evaluation: CK / needle EMG / MRI / biopsy</span></article>
    </div>
    <div className="convergence" aria-hidden="true"><svg viewBox="0 0 900 60" preserveAspectRatio="none"><path d="M220 0v15q0 12 18 12h194q18 0 18 13v10M680 0v15q0 12-18 12H468q-18 0-18 13v10" fill="none" stroke="#83929f" strokeWidth="1.5"/><path d="m444 44 6 8 6-8" fill="none" stroke="#83929f" strokeWidth="1.5"/></svg></div>
    <div className="shared-phenotype"><span className="eyebrow">OVERLAPPING POSSIBLE MANIFESTATIONS</span><ul>{sharedManifestations.map((symptom) => <li key={symptom}>{symptom}</li>)}</ul><p>Similar clinical manifestations do not necessarily imply the same physiological mechanism.</p></div>
    <div className="comparison-interpretation" aria-live="polite"><span className="interpretation-mark" aria-hidden="true">↳</span><div><h4>{interpretation[focus].title}</h4><p>{interpretation[focus].text}</p></div></div>
    <EvidencePanel items={comparisonEvidence} />
    <p className="comparison-caption">Conceptual comparison · No patient classification or numerical diagnostic probabilities. {mechanisms.nmj.caution}</p>
  </section>;
}
