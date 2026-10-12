import { useEffect, useRef, useState } from 'react';
import { electrophysiologyPanels } from '../../data/laboratory';
import type { ElectrophysiologyId } from '../../data/laboratory';
import { laboratoryUi } from '../../data/laboratoryUi';
import { frozenStudy } from '../../data/science';
import { EducationalTooltip } from '../../components/ui/EducationalTooltip';
import { RnsTrace, SfemgTrace, NeedleEmgTrace } from './ElectrophysiologyTraces';
import { ScientificResultPanel } from './ScientificResultPanel';

const modalities: { id: ElectrophysiologyId; label: string; detail: string }[] = [
  { id: 'rns', label: 'Repetitive nerve stimulation', detail: 'RNS · serial CMAP responses' },
  { id: 'sfemg', label: 'Single-fiber EMG', detail: 'SFEMG · jitter & blocking' },
  { id: 'needle', label: 'Conventional needle EMG', detail: 'Motor units & recruitment' },
];

export function ElectrophysiologyLaboratory() {
  const [selected, setSelected] = useState<ElectrophysiologyId>('rns');
  const [decrement, setDecrement] = useState(false);
  const [unstable, setUnstable] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const [myopathic, setMyopathic] = useState(false);
  const waveformContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const diagram = waveformContainer.current?.querySelector<HTMLElement>('.trace-diagram-scroll');
    if (diagram && selected === 'sfemg' && diagram.scrollWidth > diagram.clientWidth) {
      // Expose the variable second potential immediately on narrow screens.
      diagram.scrollLeft = diagram.scrollWidth - diagram.clientWidth;
    }
  }, [selected]);
  const panel = electrophysiologyPanels[selected];
  const glossary = selected === 'rns' ? laboratoryUi.glossary.cmap : selected === 'sfemg' ? laboratoryUi.glossary.jitter : laboratoryUi.glossary.recruitment;
  return (
    <section className="lab-view electrophysiology-laboratory" aria-labelledby="electrophysiology-title">
      <div className="lab-view-heading"><h3 id="electrophysiology-title">{laboratoryUi.electrophysiology.title}</h3><p>{laboratoryUi.electrophysiology.summary}</p></div>
      <div className="modality-controls" role="group" aria-label="Electrophysiology modalities">{modalities.map((modality) => <button key={modality.id} type="button" aria-label={modality.label} aria-pressed={selected === modality.id} onClick={() => setSelected(modality.id)}><strong>{modality.label}</strong><small>{modality.detail}</small></button>)}</div>
      <div className="trace-workbench">
        <div className="trace-workbench-header"><span className="eyebrow">SCHEMATIC SIGNAL EXPLORER</span><EducationalTooltip term={glossary.term} text={glossary.text} /></div>
        <div className="trace-state-controls lab-option-controls" role="group" aria-label="Waveform comparison">
          {selected === 'rns' && <><button aria-pressed={!decrement} onClick={() => setDecrement(false)}>Without significant decrement</button><button aria-pressed={decrement} onClick={() => setDecrement(true)}>Decremental response</button></>}
          {selected === 'sfemg' && <><button aria-pressed={!unstable} onClick={() => { setUnstable(false); setBlocking(false); }}>Conceptual normal variability</button><button aria-pressed={unstable} onClick={() => setUnstable(true)}>Increased jitter</button></>}
          {selected === 'needle' && <><button aria-pressed={!myopathic} onClick={() => setMyopathic(false)}>Usual motor-unit pattern</button><button aria-pressed={myopathic} onClick={() => setMyopathic(true)}>Myopathic pattern</button></>}
        </div>
        {selected === 'sfemg' && unstable && <label className="blocking-control"><input type="checkbox" checked={blocking} onChange={(event) => setBlocking(event.target.checked)} />Show possible impulse blocking</label>}
        <div className="waveform-display" ref={waveformContainer} aria-live="polite">{selected === 'rns' ? <RnsTrace decrement={decrement} /> : selected === 'sfemg' ? <SfemgTrace unstable={unstable} blocking={blocking} /> : <NeedleEmgTrace myopathic={myopathic} />}</div>
        <div className="trace-factors"><span>Interpretation also depends on</span><ul>{panel.factors.map((factor) => <li key={factor}>{factor}</li>)}</ul></div>
      </div>
      <div className="electrophysiology-bottom">
        <ScientificResultPanel title={panel.title} eyebrow="PHYSIOLOGICAL EVIDENCE" summary={panel.summary} items={[{ label: 'What the study measures', text: panel.measures }, { label: 'What it cannot establish alone', text: panel.limits }]} evidence={panel.evidence} />
        <aside className="lab-cohort-callout" aria-label="Frozen electrophysiology findings"><span className="eyebrow">PRESENT ANALYSIS · EVIDENCE BOUNDARIES</span>{selected === 'needle' ? <><p className="lab-cohort-value">{frozenStudy.needleEmg.result}<small>({frozenStudy.needleEmg.percentage})</small></p><p>Myopathic needle EMG among those evaluated.</p><p>Muscle physiology is distinct from inflammatory histopathology and NMJ transmission.</p></> : <><p className="lab-cohort-value">{frozenStudy.formalNmj.abnormal}</p><p>Objective NMJ abnormality among formally evaluated patients.</p><p>Formal RNS and/or SFEMG: {frozenStudy.formalNmj.evaluated}. Exact 95% CI: {frozenStudy.formalNmj.ci}. This does not exclude NMJ disease.</p><p>SFEMG was documented in {frozenStudy.sfemg.tested} patient, already included within the {frozenStudy.formalNmj.tested} formally tested patients. Detailed raw traces were not available.</p></>}<span className="lab-data-boundary">The educational waveforms above do not represent these patients.</span></aside>
      </div>
    </section>
  );
}
