import { en } from '../../data/locale';

export function Footer() {
  return <footer className="site-footer"><div className="container footer-inner">
    <div><a href="#home" className="footer-title">{en.projectName}</a><p>{en.educationalNote}</p></div>
    <div className="footer-right"><span>THREE MODULES · DISTINCT EVIDENCE</span><a href="#about">About me, CV & contact ↗</a><a href="#evidence">Evidence Explorer ↗</a><a href="#references">Scientific sources ↗</a><a href="#home">Back to top ↑</a></div>
  </div></footer>;
}
