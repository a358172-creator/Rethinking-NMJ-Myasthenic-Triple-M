import { laboratorySafetyNote } from './laboratory';

/** English interface copy kept separate for future localization. */
export const laboratoryUi = {
  title: 'Virtual Neuromuscular Diagnostic Laboratory',
  subtitle: 'From Clinical Phenotype to Physiological Evidence',
  introduction: 'Examine what each finding measures, what it may support, and what it cannot establish alone. Clinical manifestations, antibodies, transmission studies and muscle physiology provide complementary evidence.',
  boundary: 'An educational laboratory, not a clinical classifier. No findings are used to calculate a diagnosis, probability or treatment recommendation.',
  urgent: laboratorySafetyNote,
  navigation: [
    { id: 'phenotype', number: '01', label: 'Clinical phenotype', domain: 'Distribution of weakness' },
    { id: 'serology', number: '02', label: 'Serological evidence', domain: 'Antibody detection' },
    { id: 'electrophysiology', number: '03', label: 'Electrophysiology', domain: 'Transmission & muscle physiology' },
    { id: 'board', number: '04', label: 'Evidence board', domain: 'Interpretation across domains' },
  ],
  phenotype: { title: 'Clinical Phenotype Explorer', summary: 'Select a muscle region. A distribution of weakness localizes the clinical presentation; it does not establish whether the mechanism is muscle injury, impaired transmission, or both.' },
  serology: { title: 'Serological Evidence Explorer', summary: 'An antibody result is biological evidence. Its relationship to symptoms, pretreatment status and demonstrated physiology requires separate consideration.' },
  electrophysiology: { title: 'Electrophysiology Laboratory', summary: 'Compare transmission-specific studies with conventional motor-unit assessment. All traces below are deterministic schematic illustrations, with qualitative axes and no patient measurements.' },
  board: { title: 'Comparative Evidence Board', summary: 'Inspect one finding at a time, then choose an interpretive perspective. The perspective is selected by you; the board never assigns a mechanism to a patient.' },
  glossary: {
    cmap: { term: 'CMAP', text: 'Compound muscle action potential: the summed electrical response of activated muscle fibers following motor nerve stimulation. RNS compares consecutive responses.' },
    jitter: { term: 'Jitter', text: 'Variation in the timing of muscle-fiber action potentials across repeated activations. Increased variability indicates unstable transmission but is not uniquely specific for MG.' },
    recruitment: { term: 'Recruitment', text: 'The addition of motor units as force increases. A myopathic pattern may show more units recruited at a lower force, alongside shorter, smaller motor-unit potentials.' },
  },
} as const;

export type LaboratoryViewId = typeof laboratoryUi.navigation[number]['id'];
