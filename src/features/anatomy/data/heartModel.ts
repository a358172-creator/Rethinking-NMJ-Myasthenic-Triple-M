export type MyocardialState = 'normal' | 'injury'
export type MyocardialRegion = 'myocardium' | 'septum' | 'conduction'

export const myocardialRegions: { id: MyocardialRegion; label: string; description: string }[] = [
  {
    id: 'myocardium',
    label: 'Ventricular myocardium',
    description: 'The muscular ventricular walls generate force. The left ventricular wall is thicker than the right because the two chambers support different circulations. The inner chamber lining is separate from this contractile tissue.',
  },
  {
    id: 'septum',
    label: 'Interventricular septum',
    description: 'The muscular septum separates the right and left ventricles and contributes to contraction. The bundle branches run along its inner surfaces; the septum is not an open connection between the chambers.',
  },
  {
    id: 'conduction',
    label: 'Conduction anatomy',
    description: 'Activation begins at the sinoatrial node in the right atrium, reaches the atrioventricular node, and proceeds through the His–Purkinje system. This simplified overlay indicates normal anatomical relationships, not a measured electrical signal or an inferred site of inflammation.',
  },
]

export const myocardialStates: Record<MyocardialState, { label: string; description: string }> = {
  normal: {
    label: 'Normal myocardial tissue',
    description: 'Established anatomy: four chambers, an intact muscular septum and organized ventricular myocardium. The cutaway exposes the chamber interiors while preserving the thicker left ventricular wall. The enlarged tissue view shows branching striated cardiomyocytes.',
  },
  injury: {
    label: 'Conceptual myocardial injury',
    description: 'Literature-informed concept: a small highlighted myocardial area links to a schematic tissue inset with localized myocyte injury and inflammatory cells. Its location and extent are illustrative, not the distribution of disease in a patient or in the N=38 cohort.',
  },
}

export const cardiacChambers = [
  { short: 'RA', label: 'Right atrium' },
  { short: 'RV', label: 'Right ventricle' },
  { short: 'LA', label: 'Left atrium' },
  { short: 'LV', label: 'Left ventricle' },
] as const

export const cardiacAnatomySources = [
  { label: 'NHLBI · heart anatomy', url: 'https://www.nhlbi.nih.gov/health/heart/anatomy' },
  { label: 'NHLBI · electrical activation', url: 'https://www.nhlbi.nih.gov/health/heart/heart-beats' },
  { label: 'Johnson et al. · selected pathology', url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1609214' },
  { label: 'Mahmood et al. · clinical registry', url: 'https://pubmed.ncbi.nlm.nih.gov/29567210/' },
] as const
