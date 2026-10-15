import { ScientificFigure } from '../../components/figures/ScientificFigure';
import { frozenStudy } from '../../data/science';
import './MechanismComparisonFigure.css';
import { NeuromuscularJunction } from '../anatomy/components/NeuromuscularJunction';
import { SkeletalMuscleTissue } from '../anatomy/components/SkeletalMuscleTissue';
import { MedicalArtwork } from '../../components/figures/MedicalArtwork';
import '../anatomy/styles/anatomy.css';

interface Props {
  focus: 'nmj' | 'muscle' | 'overlap';
}

export function MechanismComparisonFigure({ focus }: Props) {
  return <ScientificFigure
    number="01"
    title="Two possible pathways to an MG-like phenotype"
    subtitle="Conceptual mechanisms in ICI-associated Triple M"
    caption={<>Primary NMJ dysfunction and muscle injury can coexist. The tested subsets differ and do not establish a dominant mechanism or classify individual patients. Neither muscle injury nor shared symptoms establish the cause of ptosis or diplopia. Aggregate findings are provisional literature-derived pooled results; source and category attribution remain unresolved.</>}
  >
    <div className="sfn-panel-grid sfn-panel-grid--two mechanism-figure-panels">
      <article className={`sfn-panel mechanism-figure-panel mechanism-figure-panel--nmj ${focus !== 'muscle' ? 'mechanism-figure-panel--emphasized' : ''}`}>
        <span className="sfn-panel-kicker">A · NEUROMUSCULAR TRANSMISSION</span>
        <h4 className="sfn-panel-heading">Primary NMJ dysfunction</h4>
        <span className="mechanism-model-state">{focus === 'muscle' ? 'Shown: potentially preserved transmission' : 'Shown: conceptual transmission impairment'}</span>
        <p className="sfn-panel-note mechanism-figure-intro">{focus === 'muscle' ? 'An intact conceptual synapse shows how muscle injury may occur with preserved transmission. Preservation is not assumed in individual patients.' : 'Reduced effective postsynaptic activation illustrates a possible transmission deficit. It does not assign an antibody mechanism or depict a finding from the N=38 cohort.'}</p>
        <div className="mechanism-figure-artwork">
          <NeuromuscularJunction className="mechanism-figure-svg" state={focus === 'muscle' ? 'normal' : 'transmission-impaired'} showLabels={false} />
        </div>
        <p className="mechanism-artwork-reading-key">Nerve terminal · synaptic cleft · postsynaptic receptors · muscle membrane. Orange dots: ACh; violet extracellular clusters: AChE symbols. Conceptual transmission model.</p>
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
        <div className="mechanism-figure-artwork">
          <SkeletalMuscleTissue state={focus === 'nmj' ? 'normal' : 'injury'} compact />
        </div>
        <p className="mechanism-artwork-reading-key">Anatomical reading: sarcolemma · myofibrils · peripheral nuclei · endomysium{focus !== 'nmj' && ' · focal injury'}. Conceptual tissue, not diagnostic histology.</p>
        <p className="mechanism-figure-evaluation">Muscle evaluation: CK / needle EMG / MRI / biopsy</p>
        <div className="sfn-metric mechanism-figure-metric">
          <strong className="sfn-metric-value">{frozenStudy.needleEmg.result}</strong>
          <span className="sfn-metric-label">Myopathic needle-EMG pattern<br />{frozenStudy.needleEmg.percentage} among evaluated patients<br />Exact 95% CI: {frozenStudy.needleEmg.ci}</span>
        </div>
        <p className="sfn-note mechanism-figure-caution">A myopathic pattern supports muscle involvement. It does not independently confirm inflammatory myositis or exclude concurrent NMJ dysfunction.</p>
      </article>
    </div>
    <article className="myocardial-comparison-context" aria-labelledby="myocardial-mechanism-context-title">
      <div className="myocardial-comparison-art"><MedicalArtwork illustration="cardiac-tissue-injury" /></div>
      <div className="myocardial-comparison-copy"><span className="sfn-panel-kicker">C · MYOCARDIAL TISSUE CONTEXT</span><h4 id="myocardial-mechanism-context-title">Immune-mediated myocardial injury</h4><p>Selected published ICI-associated myocarditis pathology describes inflammatory cells alongside injured cardiomyocytes. This enlarged tissue example complements the transmission and skeletal-muscle comparison.</p><p>Cardiac, skeletal-muscle and NMJ involvement require their own evidence. Their coexistence does not establish a universal shared antigen or a single mechanism.</p><p className="myocardial-comparison-boundary">Illustrative tissue mechanism · no cohort-specific lesion or new statistic. <a href="https://www.nejm.org/doi/full/10.1056/NEJMoa1609214" target="_blank" rel="noreferrer">Selected pathology: Johnson et al.</a></p></div>
    </article>
  </ScientificFigure>;
}
