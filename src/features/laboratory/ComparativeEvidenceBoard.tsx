import { useState } from 'react';
import { findings, interpretationStates, findingInterpretation } from '../../data/laboratory';
import type { FindingId, InterpretiveState } from '../../data/laboratory';
import { laboratoryUi } from '../../data/laboratoryUi';
import { EvidencePanel } from '../evidence/EvidencePanel';
import { ScientificResultPanel } from './ScientificResultPanel';

export function ComparativeEvidenceBoard() {
  const [selected, setSelected] = useState<FindingId>('fatigable');
  const [perspective, setPerspective] = useState<InterpretiveState>('overlap');
  const finding = findings.find((item) => item.id === selected)!;
  const interpretation = interpretationStates[perspective];
  return (
    <section className="lab-view evidence-board" aria-labelledby="board-title">
      <div className="lab-view-heading"><h3 id="board-title">{laboratoryUi.board.title}</h3><p>{laboratoryUi.board.summary}</p></div>
      <div className="evidence-board-grid">
        <div className="finding-list" role="group" aria-label="Select a finding"><span className="eyebrow">INSPECT AN EVIDENCE DOMAIN</span>{findings.map((item, i) => <button key={item.id} aria-label={item.label} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><span><strong>{item.label}</strong><small>{item.domain}</small></span><span aria-hidden="true">{selected === item.id ? '↳' : '+'}</span></button>)}</div>
        <ScientificResultPanel title={finding.label} eyebrow={finding.domain} items={[
          { label: 'What it directly measures', text: finding.measures },
          { label: `What it may support · ${interpretation.label}`, text: findingInterpretation(finding, perspective) },
          { label: 'What it cannot establish independently', text: finding.limits },
          { label: 'A complementary domain to consider', text: finding.clarify },
        ]} evidence={finding.evidence} />
      </div>
      <div className="interpretation-perspectives"><span className="eyebrow">CHOOSE AN INTERPRETIVE PERSPECTIVE · NOT A CLASSIFICATION</span><div className="perspective-controls" role="group" aria-label="Mechanistic perspectives">{(Object.keys(interpretationStates) as InterpretiveState[]).map((id) => <button key={id} aria-pressed={perspective === id} onClick={() => setPerspective(id)}>{interpretationStates[id].label}</button>)}</div><section className="perspective-panel" aria-label="Selected mechanistic perspective" aria-live="polite"><h4>{interpretation.title}</h4><p>{interpretation.text}</p><EvidencePanel items={interpretation.evidence} /></section></div>
    </section>
  );
}
