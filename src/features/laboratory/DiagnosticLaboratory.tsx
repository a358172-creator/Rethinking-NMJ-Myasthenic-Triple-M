import { useState } from 'react';
import { laboratoryUi } from '../../data/laboratoryUi';
import type { LaboratoryViewId } from '../../data/laboratoryUi';
import { LaboratoryNavigation } from './LaboratoryNavigation';
import { ClinicalPhenotypeExplorer } from './ClinicalPhenotypeExplorer';
import { SerologicalEvidenceExplorer } from './SerologicalEvidenceExplorer';
import { ElectrophysiologyLaboratory } from './ElectrophysiologyLaboratory';
import { ComparativeEvidenceBoard } from './ComparativeEvidenceBoard';
import { EvidenceKey } from '../evidence/EvidenceKey';
import './laboratory.css';

export function DiagnosticLaboratory() {
  const [selected, setSelected] = useState<LaboratoryViewId>('phenotype');
  return (
    <section className="laboratory-section section-space" id="laboratory" aria-labelledby="laboratory-title">
      <div className="container">
        <div className="lab-section-heading"><span className="eyebrow">MODULE 02 / DIAGNOSTIC LABORATORY</span><h2 id="laboratory-title">{laboratoryUi.title}</h2><p className="lab-subtitle">{laboratoryUi.subtitle}</p><p className="lab-introduction">{laboratoryUi.introduction}</p></div>
        <LaboratoryNavigation selected={selected} onSelect={setSelected} />
        <div id="laboratory-view">
          {selected === 'phenotype' && <ClinicalPhenotypeExplorer />}
          {selected === 'serology' && <SerologicalEvidenceExplorer />}
          {selected === 'electrophysiology' && <ElectrophysiologyLaboratory />}
          {selected === 'board' && <ComparativeEvidenceBoard />}
        </div>
        <div className="lab-boundaries"><EvidenceKey /><p>{laboratoryUi.boundary}</p><p className="lab-urgent-note"><strong>Clinical safety context</strong>{laboratoryUi.urgent}</p></div>
      </div>
    </section>
  );
}
