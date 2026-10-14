export type NmjState = 'normal' | 'transmission-impaired' | 'muscle-injury';
export type NmjCompartment = 'presynaptic' | 'cleft' | 'receptors' | 'muscle';
export type NmjSignalStep = 1 | 2 | 3 | 4 | 5;

export const nmjStates: Record<NmjState, { label: string; title: string; tier: string; description: string }> = {
  normal: {
    label: 'Normal physiology',
    title: 'Normal neuromuscular transmission',
    tier: 'Established physiology',
    description: 'Normal physiology: a motor nerve action potential opens presynaptic calcium channels and triggers vesicular acetylcholine release. Acetylcholine binds postsynaptic AChRs, initiating an endplate potential that can trigger a muscle action potential.',
  },
  'transmission-impaired': {
    label: 'Possible impairment',
    title: 'Possible impairment of neuromuscular transmission',
    tier: 'Conceptual model · not a cohort finding',
    description: 'Conceptual possibility: a reduced transmission safety margin may prevent some nerve impulses from activating muscle. Reduced effective postsynaptic activation is one educational example, not a demonstrated finding in the N=38 study or a specific antibody attack.',
  },
  'muscle-injury': {
    label: 'Muscle-predominant injury',
    title: 'Muscle-predominant injury with potentially preserved NMJ transmission',
    tier: 'Conceptual model · not a cohort finding',
    description: 'Muscle-predominant injury: the nerve terminal and motor endplate remain anatomically intact in this model while focal downstream myofibrillar injury may impair muscle function. NMJ transmission can be preserved, but muscle injury does not establish normal transmission or exclude concurrent NMJ dysfunction.',
  },
};

export const nmjCompartments: Record<NmjCompartment, { number: string; label: string; description: string }> = {
  presynaptic: {
    number: '1',
    label: 'Presynaptic terminal',
    description: 'The distal motor axon expands into an unmyelinated terminal. Acetylcholine-filled vesicles dock at active zones beside voltage-gated calcium channels. Calcium entry couples nerve excitation to vesicle fusion and release.',
  },
  cleft: {
    number: '2',
    label: 'Synaptic cleft',
    description: 'This extracellular compartment separates the two membranes and continues into junctional folds. Acetylcholine crosses it to bind receptors. Acetylcholinesterase (AChE), anchored in the synaptic basal lamina, hydrolyzes acetylcholine and limits its action.',
  },
  receptors: {
    number: '3',
    label: 'Postsynaptic receptors',
    description: 'Nicotinic acetylcholine receptors cluster on the crests and upper shoulders of the junctional folds, facing the nerve terminal. Their activation produces an endplate potential. Antibody detection alone does not demonstrate impaired functional transmission.',
  },
  muscle: {
    number: '4',
    label: 'Skeletal-muscle membrane',
    description: 'The motor endplate is a specialized region of the muscle-fiber sarcolemma. Its folds invaginate into the muscle; ordered myofibrils lie deeper in the sarcoplasm. Muscle excitation and downstream tissue integrity are distinct from the efficiency of synaptic transmission.',
  },
};

export const nmjSignalSteps: { id: NmjSignalStep; label: string; compartment: NmjCompartment; description: string }[] = [
  { id: 1, label: 'Nerve impulse', compartment: 'presynaptic', description: 'A motor nerve action potential reaches the distal axon and depolarizes the terminal membrane.' },
  { id: 2, label: 'Calcium entry', compartment: 'presynaptic', description: 'Voltage-gated calcium channels at presynaptic active zones admit calcium into the terminal.' },
  { id: 3, label: 'ACh release', compartment: 'cleft', description: 'Calcium-dependent vesicle fusion releases acetylcholine into the extracellular synaptic cleft.' },
  { id: 4, label: 'Receptor activation', compartment: 'receptors', description: 'Acetylcholine activates nicotinic receptors concentrated at fold crests, producing an endplate potential.' },
  { id: 5, label: 'Muscle excitation', compartment: 'muscle', description: 'When threshold is reached, a muscle action potential propagates along the sarcolemma. Excitation precedes downstream contraction.' },
];

export const nmjAnatomicalSources = [
  { label: 'Active zones and calcium channels — Nishimune et al., 2004', href: 'https://www.nature.com/articles/nature03112' },
  { label: 'AChR localization at fold crests — Fertuck & Salpeter, 1974', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC388231/' },
  { label: 'Basal-lamina AChE localization — Bernard et al., 2011', href: 'https://pubmed.ncbi.nlm.nih.gov/20883790/' },
];
