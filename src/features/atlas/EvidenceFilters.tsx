import { atlasCategories, atlasDomainLabels } from '../../data/atlasCopy';
import { atlasDomains } from '../../data/atlasModel';
import type { AtlasFilters, EvidenceDomain } from '../../data/atlasModel';

interface EvidenceFiltersProps {
  filters: AtlasFilters;
  onChange: (domain: EvidenceDomain, value: AtlasFilters[EvidenceDomain]) => void;
  onReset: () => void;
  onAchrPositive: () => void;
}

export function EvidenceFilters({ filters, onChange, onReset, onAchrPositive }: EvidenceFiltersProps) {
  const positiveOnly = filters.achr === 'positive'
    && atlasDomains.filter((domain) => domain !== 'achr').every((domain) => filters[domain] === 'all');
  return (
    <section className="atlas-filter-panel" aria-labelledby="atlas-filters-title">
      <div className="atlas-panel-heading">
        <div><span className="eyebrow">EXPLORE DOCUMENTED DOMAINS</span><h3 id="atlas-filters-title">Domain filters</h3></div>
        <button className="atlas-button atlas-reset" type="button" onClick={onReset}>Reset Filters</button>
      </div>
      <div className="atlas-filters">
        {atlasDomains.map((domain) => (
          <div className="atlas-filter" key={domain}>
            <label htmlFor={`atlas-filter-${domain}`}>{atlasDomainLabels[domain]}</label>
            <select
              id={`atlas-filter-${domain}`}
              value={filters[domain]}
              onChange={(event) => onChange(domain, event.target.value as AtlasFilters[EvidenceDomain])}
            >
              <option value="all">All</option>
              {Object.entries(atlasCategories[domain]).map(([value, category]) => (
                <option value={value} key={value}>{category.label}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="atlas-filter-shortcut">
        <span>Cross-domain comparison</span>
        <button className="atlas-button" type="button" aria-pressed={positiveOnly} onClick={onAchrPositive}>AChR-positive patients</button>
        <p>Selects AChR positivity and clears the other domain filters.</p>
      </div>
    </section>
  );
}
