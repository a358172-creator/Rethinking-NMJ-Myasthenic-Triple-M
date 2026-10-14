/**
 * Public, aggregate-only findings reproduced by the Phase 3A/3A.2 audits.
 * These are documentation counts from the frozen working cohort, not a
 * validated set of biological diagnoses or a patient-level data source.
 *
 * Documentary support: docs/CORE_ATLAS_VALIDATION_REPORT.md and
 * DATA_VALIDATION_REPORT.md. No workbook or private provenance is imported.
 */
export type EvidenceDomainId = 'achr' | 'formalNmj' | 'needleEmg'
export type AchrAggregateStatus = 'positive' | 'negative' | 'notDocumented'
export type NmjEvidenceId = 'formalNegative' | 'indeterminateQualitative' | 'notDocumented'
export type NeedleEvidenceId = 'myopathic' | 'neuropathic' | 'normal' | 'indeterminate'

export interface ExactBinomialSummary {
  readonly numerator: number
  readonly denominator: number
  /** Published rounded Clopper–Pearson bounds, in percentage points. */
  readonly ci95: readonly [number, number]
  readonly method: 'Clopper–Pearson'
}

export interface EvidenceAvailability {
  readonly id: EvidenceDomainId
  readonly label: string
  readonly evaluated: number
  readonly notDocumented: number
  readonly denominator: number
  readonly measures: string
  readonly interpretation: string
}

export interface AchrFormalNmjAggregate {
  readonly id: AchrAggregateStatus
  readonly label: string
  readonly total: number
  readonly formalDocumented: number
  readonly formalNotDocumented: number
  readonly interpretation: string
}

export interface AggregateEvidenceCategory<T extends string> {
  readonly id: T
  readonly label: string
  readonly count: number
  readonly interpretation: string
}

// Counts are entered once; denominators, missingness and displays derive here.
const cohortSize = 38
const sourcePublications = 27
const achrTested = 30
const achrPositive = 11
const formalTested = 4
const formalAbnormal = 0
const sfemgTested = 1
const qualitativeIndeterminate = 2
const needleEvaluated = 11
const needleMyopathic = 6
const needleNeuropathic = 1
const needleNormal = 1
const needleIndeterminate = 3
const deaths = 16
const survivors = 21

const achr = {
  tested: achrTested,
  positive: achrPositive,
  negative: achrTested - achrPositive,
  notDocumented: cohortSize - achrTested,
  summary: {
    numerator: achrPositive, denominator: achrTested,
    ci95: [19.9, 56.1], method: 'Clopper–Pearson',
  } satisfies ExactBinomialSummary,
} as const

const formalNmj = {
  tested: formalTested,
  notDocumented: cohortSize - formalTested,
  abnormal: formalAbnormal,
  rnsTested: formalTested,
  sfemgTested,
  sfemgNested: true,
  summary: {
    numerator: formalAbnormal, denominator: formalTested,
    ci95: [0, 60.2], method: 'Clopper–Pearson',
  } satisfies ExactBinomialSummary,
} as const

const nmjEvidence = {
  formalPositive: formalAbnormal,
  formalNegative: formalTested - formalAbnormal,
  indeterminateQualitative: qualitativeIndeterminate,
  notDocumented: cohortSize - formalTested - qualitativeIndeterminate,
} as const

const needleEmg = {
  evaluated: needleEvaluated,
  notDocumented: cohortSize - needleEvaluated,
  myopathic: needleMyopathic,
  neuropathic: needleNeuropathic,
  normal: needleNormal,
  indeterminate: needleIndeterminate,
  summary: {
    numerator: needleMyopathic, denominator: needleEvaluated,
    ci95: [23.4, 83.3], method: 'Clopper–Pearson',
  } satisfies ExactBinomialSummary,
} as const

const mortality = {
  death: deaths,
  survival: survivors,
  unknown: cohortSize - deaths - survivors,
  summary: {
    numerator: deaths, denominator: cohortSize,
    ci95: [26.3, 59.2], method: 'Clopper–Pearson',
  } satisfies ExactBinomialSummary,
} as const

export const aggregateEvidence = {
  title: 'Scientific Evidence Explorer',
  subtitle: 'What the Published Evidence Demonstrates — and What Remains Uncertain',
  provisionalLabel: 'Provisional literature-derived pooled findings',
  provisionalNote: 'Numerically reproduced aggregate results, pending final source-provenance reconciliation.',
  study: {
    patients: cohortSize,
    publications: sourcePublications,
    phenotypeCount: cohortSize,
    phenotypeInterpretation: 'The clinical MG-like phenotype is part of the study’s inclusion definition; it is not an independent estimate of disease prevalence.',
  },
  achr,
  formalNmj,
  nmjEvidence,
  needleEmg,
  mortality,
  availability: [
    {
      id: 'achr', label: 'AChR serology', evaluated: achr.tested,
      notDocumented: achr.notDocumented, denominator: cohortSize,
      measures: 'Detects antibodies against the acetylcholine receptor.',
      interpretation: 'Seropositivity can support a clinical diagnosis; antibody detection does not directly measure neuromuscular transmission.',
    },
    {
      id: 'formalNmj', label: 'Formal NMJ-specific testing', evaluated: formalNmj.tested,
      notDocumented: formalNmj.notDocumented, denominator: cohortSize,
      measures: 'RNS and SFEMG examine neuromuscular transmission.',
      interpretation: 'Only a small subset had documented formal physiological assessment. The single SFEMG examination is nested within the formally tested group.',
    },
    {
      id: 'needleEmg', label: 'Conventional needle EMG', evaluated: needleEmg.evaluated,
      notDocumented: needleEmg.notDocumented, denominator: cohortSize,
      measures: 'Assesses motor-unit patterns and muscle membrane irritability.',
      interpretation: 'Needle EMG informs muscle and nerve involvement; it is a different diagnostic domain from RNS/SFEMG and does not directly test NMJ transmission.',
    },
  ] as const satisfies readonly EvidenceAvailability[],
  achrFormalNmj: [
    {
      id: 'positive', label: 'AChR positive', total: achr.positive,
      formalDocumented: 0, formalNotDocumented: achr.positive,
      interpretation: 'None of the AChR-positive patients had documented RNS/SFEMG. Their neuromuscular transmission was not shown to be normal by this cross-tabulation.',
    },
    {
      id: 'negative', label: 'AChR negative', total: achr.negative,
      formalDocumented: formalNmj.tested, formalNotDocumented: achr.negative - formalNmj.tested,
      interpretation: 'The documented formal studies occurred within the AChR-negative group. This descriptive allocation does not establish an association, independence or causality.',
    },
    {
      id: 'notDocumented', label: 'AChR not documented', total: achr.notDocumented,
      formalDocumented: 0, formalNotDocumented: achr.notDocumented,
      interpretation: 'Missing serology and missing physiology remain missing information; neither is a negative finding.',
    },
  ] as const satisfies readonly AchrFormalNmjAggregate[],
  nmjCategories: [
    {
      id: 'formalNegative', label: 'Formal negative', count: nmjEvidence.formalNegative,
      interpretation: 'Explicit negative formal RNS/SFEMG findings in the small evaluated subset do not exclude true NMJ dysfunction throughout the cohort.',
    },
    {
      id: 'indeterminateQualitative', label: 'Qualitative indeterminate', count: nmjEvidence.indeterminateQualitative,
      interpretation: 'Qualitative evidence without formal confirmation. These records belong within the group without documented formal NMJ testing.',
    },
    {
      id: 'notDocumented', label: 'No documented objective evidence', count: nmjEvidence.notDocumented,
      interpretation: 'No documented objective NMJ evidence is an evidence-availability category, not a biological diagnosis or a negative test.',
    },
  ] as const satisfies readonly AggregateEvidenceCategory<NmjEvidenceId>[],
  needleCategories: [
    { id: 'myopathic', label: 'Myopathic', count: needleEmg.myopathic, interpretation: 'Supports a possible muscle-level contribution; does not independently confirm inflammatory myositis or exclude concurrent NMJ dysfunction.' },
    { id: 'neuropathic', label: 'Neuropathic', count: needleEmg.neuropathic, interpretation: 'A reported neuropathic interpretation in the evaluated subset; no causal comparison follows from this documentation count.' },
    { id: 'normal', label: 'Normal', count: needleEmg.normal, interpretation: 'A documented normal conventional needle EMG result is distinct from a negative RNS/SFEMG study.' },
    { id: 'indeterminate', label: 'Indeterminate', count: needleEmg.indeterminate, interpretation: 'An evaluated but indeterminate interpretation is retained separately from normal findings and undocumented testing.' },
  ] as const satisfies readonly AggregateEvidenceCategory<NeedleEvidenceId>[],
  interpretation: [
    'MG-like manifestations were part of the study’s reported clinical phenotype.',
    'AChR serology, NMJ physiology and conventional needle EMG represent different diagnostic domains.',
    'The available published-case evidence contains extensive missing formal NMJ testing.',
    'Immune-mediated skeletal-muscle injury may contribute to MG-like manifestations, but primary NMJ dysfunction and overlapping mechanisms cannot be excluded.',
  ],
  limitations: {
    synthesis: 'These provisional aggregate results come from a literature-derived pooled analysis with heterogeneous testing, publication bias and outstanding source-provenance adjudication. They do not establish a definitive mechanistic classification or validated diagnostic algorithm.',
    provenance: 'Source attribution, possible duplication and categorical discrepancies remain unresolved in the Siu/Gómez source review. Numerical reproduction does not establish complete scientific validation.',
    biochemical: 'The quantitative troponin summary and troponin subgroup comparisons remain unvalidated and are not displayed.',
    missingness: 'Absent documentation is not a negative result. Testing availability and objective-evidence categories describe different aspects of the published record.',
    uncertainty: 'The wide exact interval reflects the small tested subset. Selective testing and publication-based missingness limit inference; zero observed abnormalities does not demonstrate absence of true NMJ dysfunction.',
    mortality: 'Documented mortality is secondary clinical context from heterogeneous source follow-up, not a population-level fatality risk or prevalence estimate. Unknown vital status remains unknown; the full working-cohort denominator is preserved.',
  },
} as const

export function formatRatio(numerator: number, denominator: number): string {
  return `${numerator}/${denominator}`
}

export function proportionPercent(numerator: number, denominator: number): number {
  if (denominator <= 0) throw new RangeError('A proportion needs a positive denominator.')
  return numerator / denominator * 100
}

export function formatPercent(numerator: number, denominator: number): string {
  return `${proportionPercent(numerator, denominator).toFixed(1)}%`
}

export function formatExactInterval(summary: ExactBinomialSummary): string {
  const [lower, upper] = summary.ci95
  return `${lower === 0 ? '0' : lower.toFixed(1)}–${upper.toFixed(1)}%`
}
