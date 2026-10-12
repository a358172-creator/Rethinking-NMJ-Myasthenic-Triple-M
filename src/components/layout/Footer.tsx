import { en } from '../../data/locale';

export function Footer() {
  return <footer className="site-footer"><div className="container footer-inner">
    <div><a href="#home" className="footer-title">{en.projectName}</a><p>{en.educationalNote}</p></div>
    <div className="footer-right"><span>PHASE 01 · INTERACTIVE PATHOPHYSIOLOGY</span><a href="#references">Scientific sources ↗</a><a href="#home">Back to top ↑</a></div>
  </div></footer>;
}
