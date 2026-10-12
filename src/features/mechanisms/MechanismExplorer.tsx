import { useState } from 'react';
import type { StructureId } from '../../data/science';
import { AnatomicalFigure } from './AnatomicalFigure';
import { MechanismPanel } from './MechanismPanel';
import { MechanismComparison } from './MechanismComparison';
import { EvidenceKey } from '../evidence/EvidenceKey';

const structures: { id: StructureId; label: string; number: string }[] = [
  { id: 'heart', label: 'Heart / myocardium', number: '01' },
  { id: 'muscle', label: 'Skeletal muscle', number: '02' },
  { id: 'nmj', label: 'Neuromuscular junction', number: '03' },
];
interface Props { selected: StructureId; onSelect: (id: StructureId) => void }

export function MechanismExplorer({ selected, onSelect }: Props) {
  const [mode, setMode] = useState<'anatomy' | 'compare'>('anatomy');
  const [impaired, setImpaired] = useState(false);
  return <section className="explorer-section section-space" id="explorer" aria-labelledby="explorer-title">
    <div className="container">
      <div className="section-heading inline-heading"><div><span className="eyebrow">01 / PATHOPHYSIOLOGY EXPLORER</span><h2 id="explorer-title">One phenotype.<br /><em>More than one mechanism.</em></h2></div><p>Select a structure to explore its physiology,<br className="desktop-break" /> possible injury and the evidence behind it.</p></div>
      <div className="explorer-toolbar"><div className="mode-controls" role="group" aria-label="Explorer mode"><button aria-pressed={mode === 'anatomy'} onClick={() => setMode('anatomy')}><span aria-hidden="true">◉</span>Explore anatomy</button><button aria-pressed={mode === 'compare'} onClick={() => setMode('compare')}><span aria-hidden="true">⇄</span>Compare Mechanisms</button></div><span className="explorer-version">INTERACTIVE FIGURE / 01</span></div>
      {mode === 'anatomy' ? <div className="explorer-grid">
        <div className="anatomy-column">
          <div className="structure-controls" role="group" aria-label="Select an anatomical structure">{structures.map((structure) => <button key={structure.id} aria-pressed={selected === structure.id} onClick={() => onSelect(structure.id)}><span aria-hidden="true">{structure.number}</span>{structure.label}</button>)}</div>
          <figure className="atlas-figure"><AnatomicalFigure selected={selected} onSelect={onSelect} /><figcaption><span>FIGURE 01</span> Select a labeled structure in the figure or use the controls above. Immune-cell symbols and dashed connections indicate conceptual possibilities; they are not patient-specific observations.</figcaption></figure>
          <EvidenceKey />
        </div>
        <div aria-live="polite" aria-atomic="false"><MechanismPanel selected={selected} impaired={impaired} onImpairedChange={setImpaired} /></div>
      </div> : <MechanismComparison />}
    </div>
  </section>;
}
