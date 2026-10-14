import { Arrow } from '../components/ui/Arrow';

export function ScientificModules() {
  return <section id="modules" className="upcoming-section section-space" aria-labelledby="modules-title"><div className="container">
    <div className="section-heading inline-heading"><div><span className="eyebrow">THREE COMPLEMENTARY SCIENTIFIC MODULES</span><h2 id="modules-title">A framework for exploration.</h2></div><p>Mechanisms, diagnostic domains<br />and the limits of the published evidence.</p></div>
    <div className="module-grid">
      <a className="module-preview module-available" href="#explorer"><div className="module-topline"><span>MODULE 01</span><span className="module-status">Available</span></div><h3>Pathophysiology<br />Explorer</h3><p>Explore cardiac, skeletal-muscle and neuromuscular-junction physiology and potentially overlapping injury mechanisms.</p><span className="module-link">Explore the figure <Arrow /></span></a>
      <a className="module-preview module-available" href="#laboratory"><div className="module-topline"><span>MODULE 02</span><span className="module-status">Available</span></div><h3>Virtual Diagnostic<br />Laboratory</h3><p>Compare clinical distributions, antibody evidence, transmission studies and muscle physiology through original educational illustrations.</p><span className="module-link">Enter the laboratory <Arrow /></span></a>
      <a className="module-preview module-available" href="#evidence"><div className="module-topline"><span>MODULE 03</span><span className="module-status">Available</span></div><h3>Scientific<br />Evidence Explorer</h3><p>Inspect aggregate testing coverage, paired serology and physiology, and documentation gaps in the provisional published-case analysis.</p><span className="module-link">Examine the evidence <Arrow /></span></a>
    </div>
    <nav className="research-navigation" aria-label="Research navigation"><a href="#explorer">Pathophysiology Explorer ↗</a><a href="#laboratory">Diagnostic Laboratory ↗</a><a href="#evidence">Scientific Evidence Explorer ↗</a><a href="#study">About the Study ↗</a><a href="#references">Scientific References ↗</a></nav>
  </div></section>;
}
