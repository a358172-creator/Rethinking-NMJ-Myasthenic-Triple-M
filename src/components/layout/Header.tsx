import { useState } from 'react';
import { en } from '../../data/locale';
import { Arrow } from '../ui/Arrow';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <div className="header-inner container">
      <a className="wordmark" href="#home" aria-label="Beyond the Third M — home">
        <svg viewBox="0 0 38 38" width="38" height="38" aria-hidden="true"><path d="M4 30V9l15 17L34 9v21" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="19" cy="6" r="2.5" fill="#338A8A" /></svg>
        <span>Beyond the <strong>Third M</strong><small>A SCIENTIFIC INTERACTIVE ATLAS</small></span>
      </a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close menu' : 'Menu'}<span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
      <nav id="main-navigation" className={`main-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {en.navigation.map(({ href, label }) => <a key={href} href={href} className={href === '#about' ? 'nav-profile' : undefined} onClick={() => setMenuOpen(false)}>{label}{(href === '#explorer' || href === '#about') && <Arrow diagonal />}</a>)}
      </nav>
    </div>
  </header>;
}
