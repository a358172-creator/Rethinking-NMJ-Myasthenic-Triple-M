import { useState } from 'react';
import { mechanisms, sharedManifestations, frozenStudy } from '../../data/science';
import { EvidencePanel } from '../evidence/EvidencePanel';
import type { EvidenceItem } from '../../data/science';
import { MechanismComparisonFigure } from './MechanismComparisonFigure';

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
    <MechanismComparisonFigure focus={focus} />
    <div className="shared-phenotype"><span className="eyebrow">OVERLAPPING POSSIBLE MANIFESTATIONS</span><ul>{sharedManifestations.map((symptom) => <li key={symptom}>{symptom}</li>)}</ul><p>Similar clinical manifestations do not necessarily imply the same physiological mechanism.</p></div>
    <div className="comparison-interpretation" aria-live="polite"><span className="interpretation-mark" aria-hidden="true">↳</span><div><h4>{interpretation[focus].title}</h4><p>{interpretation[focus].text}</p></div></div>
    <EvidencePanel items={comparisonEvidence} />
    <p className="comparison-caption">Conceptual comparison · No patient classification or numerical diagnostic probabilities. {mechanisms.nmj.caution}</p>
  </section>;
}
