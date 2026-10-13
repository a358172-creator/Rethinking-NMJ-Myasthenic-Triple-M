import { atlasCopy, atlasDomainLabels, evidenceCategory } from '../../data/atlasCopy';
import { atlasDomains } from '../../data/atlasModel';
import type { EvidenceDomain, PatientEvidenceRecord } from '../../data/atlasModel';
import { EvidenceBadge } from './EvidenceBadge';

interface PatientEvidenceProfileProps {
  record: PatientEvidenceRecord | null;
}

function domainIsMissing(record: PatientEvidenceRecord, domain: EvidenceDomain): boolean {
  return record[domain] === 'not_documented' || record[domain] === 'unknown';
}

export function PatientEvidenceProfile({ record }: PatientEvidenceProfileProps) {
  const documented = record ? atlasDomains.filter((domain) => !domainIsMissing(record, domain)) : [];
  const absent = record ? atlasDomains.filter((domain) => domainIsMissing(record, domain)) : [];
  return (
    <section className="atlas-profile" id="atlas-profile" aria-labelledby="atlas-profile-title" aria-live="polite">
      <span className="eyebrow">NON-IDENTIFYING EVIDENCE PROFILE</span>
      <h3 id="atlas-profile-title">{record ? record.label : 'Select a patient'}</h3>
      {!record && <p className="atlas-profile-introduction">Use a View Case button in the matrix to inspect the documented domains and evidence gaps for that case.</p>}
      {record && <>
        <h4>Documented domains</h4>
        {documented.length === 0 ? <p>No displayed evidence domain has a documented result.</p> : (
          <dl className="atlas-profile-domains">{documented.map((domain) => <div key={domain}><dt>{atlasDomainLabels[domain]}</dt><dd><EvidenceBadge domain={domain} value={record[domain]} /></dd></div>)}</dl>
        )}
        <h4>Absent or unknown domains</h4>
        {absent.length === 0 ? <p>No selected domain is categorized as absent or unknown.</p> : (
          <ul className="atlas-profile-gaps">{absent.map((domain) => <li key={domain}><strong>{atlasDomainLabels[domain]}</strong><span>{evidenceCategory(domain, record[domain]).label}</span></li>)}</ul>
        )}
        {record.nmjEvidence === 'indeterminate_qualitative' && <p className="atlas-profile-caution">Qualitative indeterminate NMJ evidence is documented. It is not a formally negative test or formal physiological confirmation.</p>}
        {record.formalNmj === 'not_documented' && <p className="atlas-profile-caution">Formal RNS/SFEMG is not documented. NMJ physiology cannot be classified as normal from that absence.</p>}
      </>}
      <p className="atlas-profile-boundary">{atlasCopy.profileBoundary}</p>
    </section>
  );
}
