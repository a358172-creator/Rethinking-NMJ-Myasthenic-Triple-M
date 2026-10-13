import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Arrow } from './components/ui/Arrow';
import { en } from './data/locale';
import type { StructureId } from './data/science';
import { AnatomicalFigure } from './features/mechanisms/AnatomicalFigure';
import { MechanismExplorer } from './features/mechanisms/MechanismExplorer';
import { StudyStats } from './features/evidence/StudyStats';
import { ResearchOverview } from './features/evidence/ResearchOverview';
import { ScientificReferences } from './features/evidence/ScientificReferences';
import { UpcomingModules } from './features/UpcomingModules';
import { DiagnosticLaboratory } from './features/laboratory/DiagnosticLaboratory';
import { PatientAtlasAvailability } from './features/evidence/PatientAtlasAvailability';

export default function App() {
  const [selected, setSelected] = useState<StructureId>('heart');
  function selectFromHero(id: StructureId) {
    setSelected(id);
    document.getElementById('explorer')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header />
    <main id="main-content">
      <section className="hero container" id="home" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="hero-kicker"><span className="small-rule" /> IMMUNE CHECKPOINT INHIBITOR TOXICITY</div><h1 id="hero-title" aria-label={en.projectName}>Beyond the<br /><em>Third M</em><span className="title-period">.</span></h1><p className="hero-subtitle">{en.subtitle}</p><p className="hero-statement">A clinical phenotype resembling myasthenia gravis does not, by itself, establish the physiological mechanism responsible for weakness.</p><a className="primary-action" href="#explorer">{en.explore}<Arrow /></a><p className="hero-note">CLINICAL PHENOTYPE ≠ PHYSIOLOGICAL CONFIRMATION</p></div>
        <div className="hero-art"><div className="hero-art-heading"><span>THREE TISSUES. ONE CRITICAL QUESTION.</span><span>01 — 03</span></div><AnatomicalFigure selected={selected} onSelect={selectFromHero} compact /><div className="hero-art-caption"><span className="caption-rule" /><p>Myocardium. Skeletal muscle. Neuromuscular junction.<br /><strong>Related systems, distinct evidence.</strong></p></div></div>
      </section>
      <section className="context-band" aria-labelledby="context-title"><div className="container context-inner"><div><span className="eyebrow">THE CLASSIC TRIAD</span><h2 id="context-title">Reconsidering the “myasthenic” component.</h2></div><div><p>ICI-associated Triple M describes the overlap of <strong>myocarditis</strong>, <strong>myositis</strong> and <strong>myasthenia gravis or MG-like manifestations</strong>. The conventional clinical label does not establish NMJ transmission failure.</p><p className="context-boundary">Muscle injury and genuine NMJ dysfunction may occur together.</p></div></div></section>
      <StudyStats />
      <MechanismExplorer selected={selected} onSelect={setSelected} />
      <DiagnosticLaboratory />
      <PatientAtlasAvailability />
      <ResearchOverview />
      <UpcomingModules />
      <ScientificReferences />
    </main>
    <Footer />
  </>;
}
