/** Minimal categorical records supplied by the validated local-data loader. */
export interface PatientEvidenceRecord {
  label: string;
  achr: 'positive' | 'negative' | 'not_documented';
  formalNmj: 'documented' | 'not_documented';
  nmjEvidence: 'formal_negative' | 'indeterminate_qualitative' | 'not_documented';
  needleEmg: 'myopathic' | 'neuropathic' | 'normal' | 'indeterminate' | 'not_documented';
  vitalStatus: 'death' | 'survival' | 'unknown';
}

export interface AtlasDataset {
  schemaVersion: 1;
  /** true is permitted only after every mandatory source-workbook check passes. */
  validation: {
    passed: true;
    sourceSha256: string;
    validatedAt: string;
  };
  records: readonly PatientEvidenceRecord[];
}

export type EvidenceDomain = Exclude<keyof PatientEvidenceRecord, 'label'>;
export type AtlasFilters = {
  [Domain in EvidenceDomain]: PatientEvidenceRecord[Domain] | 'all';
};

export type InterpretationDomain = 'achr' | 'formalNmj' | 'nmjEvidence' | 'needleEmg' | 'mortality';

export const atlasFilterDefaults: AtlasFilters = {
  achr: 'all',
  formalNmj: 'all',
  nmjEvidence: 'all',
  needleEmg: 'all',
  vitalStatus: 'all',
};

export const atlasDomains: readonly EvidenceDomain[] = [
  'achr', 'formalNmj', 'nmjEvidence', 'needleEmg', 'vitalStatus',
];

export function filterPatientEvidence(
  records: readonly PatientEvidenceRecord[],
  filters: AtlasFilters,
): PatientEvidenceRecord[] {
  return records.filter((record) => atlasDomains.every(
    (domain) => filters[domain] === 'all' || record[domain] === filters[domain],
  ));
}

/** Every denominator follows the currently supplied records; missingness is never imputed. */
export function summarizeEvidence(records: readonly PatientEvidenceRecord[]) {
  const count = <Domain extends EvidenceDomain>(
    domain: Domain,
    category: PatientEvidenceRecord[Domain],
  ) => records.filter((record) => record[domain] === category).length;

  const achrPositive = count('achr', 'positive');
  const achrNegative = count('achr', 'negative');
  const formalNmjDocumented = count('formalNmj', 'documented');
  const deaths = count('vitalStatus', 'death');
  const survivors = count('vitalStatus', 'survival');
  const needleNotDocumented = count('needleEmg', 'not_documented');

  return {
    total: records.length,
    achr: {
      positive: achrPositive,
      negative: achrNegative,
      tested: achrPositive + achrNegative,
      notDocumented: count('achr', 'not_documented'),
    },
    formalNmj: {
      documented: formalNmjDocumented,
      notDocumented: count('formalNmj', 'not_documented'),
    },
    nmjEvidence: {
      formalNegative: count('nmjEvidence', 'formal_negative'),
      qualitative: count('nmjEvidence', 'indeterminate_qualitative'),
      notDocumented: count('nmjEvidence', 'not_documented'),
    },
    needleEmg: {
      tested: records.length - needleNotDocumented,
      myopathic: count('needleEmg', 'myopathic'),
      neuropathic: count('needleEmg', 'neuropathic'),
      normal: count('needleEmg', 'normal'),
      indeterminate: count('needleEmg', 'indeterminate'),
      notDocumented: needleNotDocumented,
    },
    mortality: {
      deaths,
      survivors,
      known: deaths + survivors,
      unknown: count('vitalStatus', 'unknown'),
    },
    achrPositiveWithFormalNmj: records.filter(
      (record) => record.achr === 'positive' && record.formalNmj === 'documented',
    ).length,
  };
}

export type EvidenceSummary = ReturnType<typeof summarizeEvidence>;

export function evidenceRatio(numerator: number, denominator: number): string {
  return `${numerator}/${denominator}`;
}

export function evidencePercentage(numerator: number, denominator: number): string {
  return denominator === 0 ? 'Not evaluable' : `${(100 * numerator / denominator).toFixed(1)}%`;
}
