import { atlasCopy, atlasDomainLabels } from '../../data/atlasCopy';
import { atlasDomains } from '../../data/atlasModel';
import type { PatientEvidenceRecord } from '../../data/atlasModel';
import { EvidenceBadge } from './EvidenceBadge';

interface EvidenceMatrixProps {
  records: readonly PatientEvidenceRecord[];
  selectedLabel: string | null;
  showMissing: boolean;
  onSelect: (label: string) => void;
}

export function EvidenceMatrix({ records, selectedLabel, showMissing, onSelect }: EvidenceMatrixProps) {
  return (
    <section className="atlas-matrix-panel" aria-labelledby="atlas-matrix-title">
      <div className="atlas-panel-heading"><div><span className="eyebrow">PATIENT-LEVEL CATEGORICAL EVIDENCE</span><h3 id="atlas-matrix-title">Patient evidence matrix</h3></div></div>
      <p className="atlas-scroll-hint" id="atlas-scroll-hint">Scroll horizontally to read every domain. Select a case to open its evidence profile.</p>
      <div className="atlas-table-scroll" role="region" aria-labelledby="atlas-matrix-title" aria-describedby="atlas-scroll-hint" tabIndex={0}>
        <table className="atlas-matrix" id="atlas-matrix">
          <caption>Pseudonymous patient labels and documented categories. Missing information is not a negative test.</caption>
          <thead><tr><th scope="col">Patient</th>{atlasDomains.map((domain) => <th scope="col" key={domain}>{atlasDomainLabels[domain]}</th>)}</tr></thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.label}
                data-patient-label={record.label}
                data-formal-nmj={record.formalNmj}
                data-selected={record.label === selectedLabel}
                className={showMissing ? record.formalNmj === 'documented' ? 'atlas-row-tested' : 'atlas-row-missing' : undefined}
              >
                <th scope="row">
                  <button
                    className="atlas-case-button"
                    type="button"
                    aria-pressed={record.label === selectedLabel}
                    aria-controls="atlas-profile"
                    onClick={() => onSelect(record.label)}
                  >
                    <span>View {record.label}</span><span aria-hidden="true">{record.label === selectedLabel ? '✓' : '↗'}</span>
                  </button>
                  {showMissing && <span className="atlas-row-status">{record.formalNmj === 'documented' ? 'Formal study documented' : 'Formal study missing'}</span>}
                </th>
                {atlasDomains.map((domain) => <td key={domain}><EvidenceBadge domain={domain} value={record[domain]} /></td>)}
              </tr>
            ))}
            {records.length === 0 && <tr><td className="atlas-no-results" colSpan={6}>No cases match these filters. Reset Filters to return to the full cohort.</td></tr>}
          </tbody>
        </table>
      </div>
      <ul className="atlas-legend" aria-label="Evidence category legend">
        <li><span className="atlas-badge atlas-badge-positive"><span aria-hidden="true">+ / ◆</span> Positive / abnormal finding or death</span></li>
        <li><span className="atlas-badge atlas-badge-negative"><span aria-hidden="true">− / ○</span> Negative / normal</span></li>
        <li><span className="atlas-badge atlas-badge-indeterminate"><span aria-hidden="true">?</span> Indeterminate</span></li>
        <li><span className="atlas-badge atlas-badge-missing"><span aria-hidden="true">— / ?</span> Not documented / unknown</span></li>
        <li><span className="atlas-badge atlas-badge-documented"><span aria-hidden="true">✓</span> Documented availability / survival</span></li>
      </ul>
      <p className="atlas-note">{atlasCopy.denominator}</p>
    </section>
  );
}
