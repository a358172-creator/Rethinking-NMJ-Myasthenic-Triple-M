import { laboratoryUi } from '../../data/laboratoryUi';
import type { LaboratoryViewId } from '../../data/laboratoryUi';

export function LaboratoryNavigation({ selected, onSelect }: { selected: LaboratoryViewId; onSelect: (id: LaboratoryViewId) => void }) {
  return (
    <div className="laboratory-navigation" role="group" aria-label="Laboratory views">
      {laboratoryUi.navigation.map((view) => (
        <button key={view.id} type="button" aria-label={view.label} aria-pressed={selected === view.id} aria-controls="laboratory-view" onClick={() => onSelect(view.id)}>
          <span className="lab-navigation-number" aria-hidden="true">{view.number}</span>
          <span><strong>{view.label}</strong><small>{view.domain}</small></span>
          <span className="lab-navigation-selected" aria-hidden="true">{selected === view.id ? '↳' : '↗'}</span>
        </button>
      ))}
    </div>
  );
}
