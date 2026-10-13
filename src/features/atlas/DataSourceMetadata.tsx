import { atlasCopy } from '../../data/atlasCopy';
import type { AtlasDataset } from '../../data/atlasModel';

interface DataSourceMetadataProps {
  validation: AtlasDataset['validation'];
}

export function DataSourceMetadata({ validation }: DataSourceMetadataProps) {
  return (
    <aside className="atlas-source-metadata" aria-label="Data source and publication status">
      <p className="atlas-source-status"><span aria-hidden="true">✓</span> {atlasCopy.publicationStatus}</p>
      <p>{atlasCopy.publicationExplanation}</p>
      <details>
        <summary>Validation and source provenance <span aria-hidden="true">+</span></summary>
        <dl>
          <div><dt>Source</dt><dd>Frozen Excel workbook; minimal categorical representation. Original clinical narratives and local identifiers are excluded.</dd></div>
          <div><dt>Required validation gate</dt><dd>Atlas access requires a fully passed data validation report, including every mandatory workbook check. This categorical view does not independently verify the workbook; consult the report for expected and observed values and source-field ambiguities.</dd></div>
          <div><dt>Validation timestamp (UTC)</dt><dd><time dateTime={validation.validatedAt}>{validation.validatedAt}</time></dd></div>
          <div><dt>Workbook SHA-256</dt><dd><code>{validation.sourceSha256}</code></dd></div>
          <div><dt>Study design</dt><dd>{atlasCopy.design}</dd></div>
        </dl>
      </details>
    </aside>
  );
}
