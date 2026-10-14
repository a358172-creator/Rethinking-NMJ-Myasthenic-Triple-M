import { useId } from 'react';
import { ScientificFigure } from '../../components/figures/ScientificFigure';
import { frozenStudy } from '../../data/science';
import './MechanismComparisonFigure.css';
import { NeuromuscularJunction } from '../anatomy/components/NeuromuscularJunction';
import { SkeletalMuscleTissue } from '../anatomy/components/SkeletalMuscleTissue';
import '../anatomy/styles/anatomy.css';

interface Props {
  focus: 'nmj' | 'muscle' | 'overlap';
}

export function MechanismComparisonFigure({ focus }: Props) {
  const scrollHintId = useId();
  return <ScientificFigure
    number="01"
    title="Two possible pathways to an MG-like phenotype"
    subtitle="Conceptual mechanisms in ICI-associated Triple M"
    caption={<>Primary NMJ dysfunction and muscle injury can coexist. The tested subsets differ and do not establish a dominant mechanism or classify individual patients. Neither muscle injury nor shared symptoms establish the cause of ptosis or diplopia. Aggregate findings are provisional literature-derived pooled results; source and category attribution remain unresolved.</>}
  >
    <p className="mechanism-figure-scroll-hint" id={scrollHintId}>Swipe horizontally to inspect each diagram, or focus it and use the left and right arrow keys.</p>
    <div className="sfn-panel-grid sfn-panel-grid--two mechanism-figure-panels">
      <article className={`sfn-panel mechanism-figure-panel mechanism-figure-panel--nmj ${focus !== 'muscle' ? 'mechanism-figure-panel--emphasized' : ''}`}>
        <span className="sfn-panel-kicker">A · NEUROMUSCULAR TRANSMISSION</span>
        <h4 className="sfn-panel-heading">Primary NMJ dysfunction</h4>
        <span className="mechanism-model-state">{focus === 'muscle' ? 'Shown: potentially preserved transmission' : 'Shown: conceptual transmission impairment'}</span>
        <p className="sfn-panel-note mechanism-figure-intro">{focus === 'muscle' ? 'An intact conceptual synapse shows how muscle injury may occur with preserved transmission. Preservation is not assumed in individual patients.' : 'Reduced effective postsynaptic activation illustrates a possible transmission deficit. It does not assign an antibody mechanism or depict a finding from the N=38 cohort.'}</p>
        <div className="sfn-figure-scroll mechanism-figure-scroll" tabIndex={0} role="region" aria-label="Scrollable NMJ mechanism diagram" aria-describedby={scrollHintId}>
          <NeuromuscularJunction className="mechanism-figure-svg" state={focus === 'muscle' ? 'normal' : 'transmission-impaired'} showLabels={false} />
        </div>
        <ul className="comparison-anatomy-key" aria-label="NMJ diagram legend"><li><b>1</b> Nerve terminal</li><li><b>2</b> Synaptic cleft</li><li><b>3</b> Postsynaptic receptors</li><li><b>4</b> Muscle membrane</li></ul>
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
        <span className="mechanism-model-state">{focus === 'nmj' ? 'Shown: organized muscle tissue' : 'Shown: conceptual focal muscle injury'}</span>
        <p className="sfn-panel-note mechanism-figure-intro">{focus === 'nmj' ? 'Organized muscle fibers isolate the conceptual transmission question. Normal muscle integrity is not assumed in individual patients.' : 'A focal cellular injury model based on selected published specimens. The surrounding fibers remain organized; this pathway is not established in every patient.'}</p>
        <div className="sfn-figure-scroll mechanism-figure-scroll" tabIndex={0} role="region" aria-label="Scrollable immune-mediated muscle injury diagram" aria-describedby={scrollHintId}>
          <SkeletalMuscleTissue state={focus === 'nmj' ? 'normal' : 'injury'} />
        </div>
        <ul className="comparison-anatomy-key" aria-label="Muscle diagram legend"><li><b>1</b> Sarcolemma</li><li><b>2</b> Myofibrils</li><li><b>3</b> Peripheral nuclei</li><li><b>4</b> Endomysium</li><li><b>5</b> Capillary</li>{focus !== 'nmj' && <li><b>6</b> Inflammatory focus</li>}</ul>
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
