import { Arrow } from '../components/ui/Arrow';

export function UpcomingModules() {
  return <section id="modules" className="upcoming-section section-space" aria-labelledby="modules-title"><div className="container">
    <div className="section-heading inline-heading"><div><span className="eyebrow">03 / THE ATLAS, IN THREE PARTS</span><h2 id="modules-title">A framework for exploration.</h2></div><p>Mechanisms now.<br />Diagnostic and patient-level evidence to follow.</p></div>
    <div className="module-grid">
      <a className="module-preview module-available" href="#explorer"><div className="module-topline"><span>MODULE 01</span><span className="module-status">Available</span></div><h3>Pathophysiology<br />Explorer</h3><p>Explore cardiac, skeletal-muscle and neuromuscular-junction physiology and potentially overlapping injury mechanisms.</p><span className="module-link">Explore the figure <Arrow /></span></a>
      <article className="module-preview"><div className="module-topline"><span>MODULE 02</span><span className="module-status upcoming-status">Upcoming</span></div><h3>Virtual Diagnostic<br />Laboratory</h3><p>A planned educational comparison of clinical presentation, serology, biomarkers and electrophysiology. Phase 2 has not been implemented.</p><span className="module-planned">Planned for Phase 2</span></article>
      <article className="module-preview"><div className="module-topline"><span>MODULE 03</span><span className="module-status upcoming-status">Upcoming</span></div><h3>Patient-Level<br />Evidence Atlas</h3><p>A planned visualization of missingness and source provenance, using a separately validated, publication-safe dataset.</p><span className="module-planned">Planned for Phase 3 · No patient records loaded</span></article>
    </div>
    <nav className="research-navigation" aria-label="Research navigation"><a href="#explorer">Pathophysiology Explorer ↗</a><a href="#modules">Diagnostic Laboratory — upcoming</a><a href="#modules">Patient-Level Evidence Atlas — upcoming</a><a href="#study">About the Study ↗</a><a href="#references">Scientific References ↗</a></nav>
  </div></section>;
}
