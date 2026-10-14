import { atlasCopy } from '../../data/atlasCopy';
import type { AtlasDataset } from '../../data/atlasModel';
import type { AtlasReleaseStates, AtlasValidationScope } from '../../data/atlasRelease';

interface DataSourceMetadataProps {
  validation: AtlasDataset['validation'];
  scope: AtlasValidationScope;
  states: AtlasReleaseStates;
}

export function DataSourceMetadata({ validation, scope, states }: DataSourceMetadataProps) {
  return (
    <aside className="atlas-source-metadata" aria-label="Data source and publication status">
      <p className="atlas-source-status"><span aria-hidden="true">✓</span> {states.CORE_ATLAS_PUBLICATION_APPROVAL === 'PENDING' ? atlasCopy.publicationStatus : 'Restricted local preview · Separate public approval recorded'}</p>
      <p>{atlasCopy.publicationExplanation}</p>
      <details>
        <summary>Validation and source provenance <span aria-hidden="true">+</span></summary>
        <dl>
          <div><dt>Source</dt><dd>Frozen Excel workbook; minimal categorical representation. Original clinical narratives and local identifiers are excluded.</dd></div>
          <div><dt>Validated scope</dt><dd>{scope === 'CORE_NEUROMUSCULAR_ATLAS' ? 'Six-field neuromuscular evidence representation' : 'Legacy full-study validation'}. A core-domain PASS does not establish validation of the whole manuscript or biochemical analysis.</dd></div>
          <div><dt>Full study validation</dt><dd>{states.FULL_STUDY_VALIDATION}</dd></div>
          <div><dt>Core atlas validation</dt><dd>{states.CORE_ATLAS_VALIDATION}</dd></div>
          <div><dt>Public patient-data approval</dt><dd>{states.CORE_ATLAS_PUBLICATION_APPROVAL}. Private preview approval does not authorize public release.</dd></div>
          <div><dt>Validation timestamp (UTC)</dt><dd><time dateTime={validation.validatedAt}>{validation.validatedAt}</time></dd></div>
          <div><dt>Workbook SHA-256</dt><dd><code>{validation.sourceSha256}</code></dd></div>
          <div><dt>Study design</dt><dd>{atlasCopy.design}</dd></div>
        </dl>
      </details>
    </aside>
  );
}
