import { frozenStudy } from './science';
import type { EvidenceDomain, InterpretationDomain, PatientEvidenceRecord } from './atlasModel';

export type EvidenceTone = 'positive' | 'negative' | 'indeterminate' | 'missing' | 'documented';

export interface EvidenceCategory {
  label: string;
  symbol: string;
  tone: EvidenceTone;
}

export const atlasCategories: {
  [Domain in EvidenceDomain]: Record<PatientEvidenceRecord[Domain], EvidenceCategory>;
} = {
  achr: {
    positive: { label: 'Positive', symbol: '+', tone: 'positive' },
    negative: { label: 'Negative', symbol: '−', tone: 'negative' },
    not_documented: { label: 'Not documented', symbol: '—', tone: 'missing' },
  },
  formalNmj: {
    documented: { label: 'Documented', symbol: '✓', tone: 'documented' },
    not_documented: { label: 'Not documented', symbol: '—', tone: 'missing' },
  },
  nmjEvidence: {
    formal_negative: { label: 'Formal test negative', symbol: '−', tone: 'negative' },
    indeterminate_qualitative: { label: 'Indeterminate qualitative evidence', symbol: '?', tone: 'indeterminate' },
    not_documented: { label: 'No objective NMJ evidence documented', symbol: '—', tone: 'missing' },
  },
  needleEmg: {
    myopathic: { label: 'Myopathic', symbol: '◆', tone: 'positive' },
    neuropathic: { label: 'Neuropathic', symbol: '◆', tone: 'positive' },
    normal: { label: 'Normal', symbol: '○', tone: 'negative' },
    indeterminate: { label: 'Indeterminate', symbol: '?', tone: 'indeterminate' },
    not_documented: { label: 'Not documented', symbol: '—', tone: 'missing' },
  },
  vitalStatus: {
    death: { label: 'Death documented', symbol: '◆', tone: 'positive' },
    survival: { label: 'Survival documented', symbol: '✓', tone: 'documented' },
    unknown: { label: 'Unknown', symbol: '?', tone: 'missing' },
  },
};

export function evidenceCategory<Domain extends EvidenceDomain>(
  domain: Domain,
  value: PatientEvidenceRecord[Domain],
): EvidenceCategory {
  return atlasCategories[domain][value];
}

export const atlasDomainLabels: Record<EvidenceDomain, string> = {
  achr: 'AChR status',
  formalNmj: 'Formal NMJ evaluation',
  nmjEvidence: 'NMJ evidence category',
  needleEmg: 'Needle EMG',
  vitalStatus: 'Vital status',
};

export const atlasCopy = {
  title: 'Patient-Level Evidence Atlas',
  subtitle: 'What Was Tested, What Was Found, and What Remains Unknown',
  introduction: 'Explore the diagnostic evidence reported for each patient in this retrospective, literature-derived individual patient-level pooled analysis. The evaluated subsets differ, and missing findings remain explicitly missing.',
  design: 'Published patients selected for a clinically defined MG-like Triple M phenotype; variable-specific denominators, patient-level duplicate adjudication, and no imputation.',
  phenotype: `${frozenStudy.cohort.phenotype} had the clinically defined MG-like phenotype as a cohort inclusion characteristic. This is not an independent estimate of population prevalence.`,
  denominator: 'Serology, formal NMJ testing, and conventional needle EMG have different evaluated subsets. Read each denominator separately.',
  missingMessage: 'Absence of documented physiological evidence is not equivalent to evidence of normal physiology.',
  missingExplanation: 'An undocumented formal study cannot be read as a normal or negative study. Qualitative indeterminate evidence remains separate from a formal test result.',
  formalLimitation: `Formal RNS and/or SFEMG was documented in ${frozenStudy.formalNmj.evaluated}. Objective NMJ abnormality was ${frozenStudy.formalNmj.abnormal} (exact 95% CI ${frozenStudy.formalNmj.ci}); this small tested subset does not exclude true NMJ disease in the wider cohort. The single SFEMG evaluation is included among the four formally tested patients.`,
  pairedFinding: 'No AChR-positive patient had formal RNS/SFEMG documented.',
  pairedInterpretation: 'These seropositive cases are physiologically unconfirmed, not electrophysiologically negative. Serology and physiological confirmation cannot be directly linked within this subgroup.',
  profileBoundary: 'This profile describes documented evidence and reporting gaps. It does not assign a clinical diagnosis. Missing information is not evidence of a negative test.',
  publicationStatus: 'Restricted local preview · Publication review pending',
  publicationExplanation: 'This restricted view requires scientific and source validation for its declared scope, an approved export policy and review of the exact private artifact. Core validation does not certify the full study. Public patient-data disclosure requires a separate author decision.',
  scientificBoundary: 'Published case ascertainment, publication bias, reporting bias, and uneven testing limit interpretation. These records do not establish population incidence, diagnostic sensitivity or specificity, causality, or treatment effectiveness.',
} as const;

export const atlasInterpretations: Record<InterpretationDomain, { label: string; text: string }> = {
  achr: {
    label: 'AChR serology',
    text: 'Antibody positivity provides serological information but does not independently establish a demonstrated functional defect in NMJ transmission. Untested or unreported serology is not a negative result.',
  },
  formalNmj: {
    label: 'Formal NMJ testing',
    text: atlasCopy.formalLimitation,
  },
  nmjEvidence: {
    label: 'NMJ evidence',
    text: 'A reported negative formal test, indeterminate qualitative evidence without formal confirmation, and no documented objective evidence are distinct categories. They cannot be combined into a single negative group.',
  },
  needleEmg: {
    label: 'Needle EMG',
    text: 'Conventional needle EMG assesses muscle and motor-unit patterns, separately from NMJ-specific RNS/SFEMG. A myopathic pattern supports a myopathic physiological contribution but is not alone equivalent to histological confirmation of inflammatory myositis.',
  },
  mortality: {
    label: 'Mortality',
    text: 'This literature-derived cohort is enriched for published, frequently severe presentations. Observed mortality must not be described as the population fatality risk among all ICI recipients. Full-cohort and known-vital-status denominators are reported separately.',
  },
};
