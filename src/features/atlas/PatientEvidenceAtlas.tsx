import { useState } from 'react';
import { atlasCopy } from '../../data/atlasCopy';
import { atlasFilterDefaults, filterPatientEvidence, summarizeEvidence } from '../../data/atlasModel';
import type { AtlasDataset, AtlasFilters, EvidenceDomain, InterpretationDomain } from '../../data/atlasModel';
import { assessPrivateAtlasPreview, coreAtlasSpecificationVersion } from '../../data/atlasRelease';
import type { AtlasPrivatePreviewAuthorization } from '../../data/atlasRelease';
import { CohortSummary, FilteredEvidenceSummary } from './CohortSummary';
import { DataSourceMetadata } from './DataSourceMetadata';
import { EvidenceFilters } from './EvidenceFilters';
import { EvidenceMatrix } from './EvidenceMatrix';
import { MissingnessExplorer } from './MissingnessExplorer';
import { PatientEvidenceProfile } from './PatientEvidenceProfile';
import { ScientificInterpretation } from './ScientificInterpretation';
import './atlas.css';

export interface PatientEvidenceAtlasProps {
  dataset: AtlasDataset;
  authorization?: AtlasPrivatePreviewAuthorization;
  /** Digest of the exact reviewed serialization, verified by the future local loader. */
  artifactSha256: string;
}

/** Prepared only; App mounts the aggregate availability notice instead. */
export function PatientEvidenceAtlas({ dataset, authorization, artifactSha256 }: PatientEvidenceAtlasProps) {
  const [filters, setFilters] = useState<AtlasFilters>({ ...atlasFilterDefaults });
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [showMissing, setShowMissing] = useState(false);
  const [interpretation, setInterpretation] = useState<InterpretationDomain>('formalNmj');

  const isCore = dataset.schemaVersion === 2;
  const scope = isCore ? 'CORE_NEUROMUSCULAR_ATLAS' : 'FULL_STUDY';
  const markerPassed = dataset.schemaVersion === 1
    ? dataset.validation?.passed === true
    : isCore && dataset.validation?.status === 'PASS' && dataset.validation?.scope === scope;
  const gate = assessPrivateAtlasPreview(authorization, {
    scope,
    sourceSha256: dataset.validation?.sourceSha256 ?? '',
    artifactSha256,
    specificationVersion: isCore ? dataset.validation?.specificationVersion ?? '' : coreAtlasSpecificationVersion,
  });
  // Status metadata is descriptive. Author approval must be verified outside the
  // browser; no local loader, approval writer, exporter or public endpoint exists.
  if (!markerPassed || !gate.permitted || !authorization) {
    return (
      <section className="atlas-section section-space" id="atlas" aria-labelledby="atlas-title">
        <div className="container atlas-container">
          <div className="atlas-section-heading"><span className="eyebrow">MODULE 03 / PATIENT-LEVEL EVIDENCE</span><h2 id="atlas-title">{atlasCopy.title}</h2><p className="atlas-subtitle">{atlasCopy.subtitle}</p></div>
          <p className="atlas-source-metadata" role="status">Patient-level rendering is unavailable until the scoped validation, export policy and exact private-preview authorization are reviewed. A passing numerical subtotal does not authorize this preview.</p>
        </div>
      </section>
    );
  }

  const visibleRecords = filterPatientEvidence(dataset.records, filters);
  const fullSummary = summarizeEvidence(dataset.records);
  const visibleSummary = summarizeEvidence(visibleRecords);
  const selectedRecord = visibleRecords.find((record) => record.label === selectedLabel) ?? null;

  function changeFilter(domain: EvidenceDomain, value: AtlasFilters[EvidenceDomain]) {
    setFilters((current) => ({ ...current, [domain]: value }));
    setSelectedLabel(null);
    setInterpretation(domain === 'vitalStatus' ? 'mortality' : domain);
  }

  function resetFilters() {
    setFilters({ ...atlasFilterDefaults });
    setSelectedLabel(null);
  }

  function selectAchrPositive() {
    setFilters({ ...atlasFilterDefaults, achr: 'positive' });
    setSelectedLabel(null);
    setInterpretation('achr');
  }

  return (
    <section className="atlas-section section-space" id="atlas" aria-labelledby="atlas-title">
      <div className="container atlas-container">
        <div className="atlas-section-heading">
          <span className="eyebrow">MODULE 03 / PATIENT-LEVEL EVIDENCE</span>
          <h2 id="atlas-title">{atlasCopy.title}</h2>
          <p className="atlas-subtitle">{atlasCopy.subtitle}</p>
          <p className="atlas-introduction">{atlasCopy.introduction}</p>
        </div>
        <DataSourceMetadata validation={dataset.validation} scope={scope} states={authorization.states} />
        <CohortSummary summary={fullSummary} />
        <EvidenceFilters filters={filters} onChange={changeFilter} onReset={resetFilters} onAchrPositive={selectAchrPositive} />
        <MissingnessExplorer summary={fullSummary} visibleSummary={visibleSummary} showMissing={showMissing} onToggle={() => setShowMissing((current) => !current)} />
        <FilteredEvidenceSummary summary={visibleSummary} fullCount={dataset.records.length} />
        <div className="atlas-evidence-layout">
          <EvidenceMatrix records={visibleRecords} selectedLabel={selectedRecord?.label ?? null} showMissing={showMissing} onSelect={setSelectedLabel} />
          <PatientEvidenceProfile record={selectedRecord} />
        </div>
        <ScientificInterpretation selected={interpretation} summary={visibleSummary} fullSummary={fullSummary} onSelect={setInterpretation} />
      </div>
    </section>
  );
}
