import { atlasCategories } from '../../data/atlasCopy';
import type { EvidenceDomain, PatientEvidenceRecord } from '../../data/atlasModel';

interface EvidenceBadgeProps<Domain extends EvidenceDomain> {
  domain: Domain;
  value: PatientEvidenceRecord[Domain];
}

export function EvidenceBadge<Domain extends EvidenceDomain>({ domain, value }: EvidenceBadgeProps<Domain>) {
  const category = atlasCategories[domain][value];
  return (
    <span className={`atlas-badge atlas-badge-${category.tone}`}>
      <span className="atlas-category-symbol" aria-hidden="true">{category.symbol}</span>
      <span>{category.label}</span>
    </span>
  );
}
