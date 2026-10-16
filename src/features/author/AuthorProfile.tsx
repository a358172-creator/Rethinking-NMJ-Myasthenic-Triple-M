import { author, cvSections } from '../../data/author';
import { Arrow } from '../../components/ui/Arrow';
import './author.css';

export function AuthorProfile() {
  return <section className="author-section section-space" id="about" aria-labelledby="author-title">
    <div className="container">
      <div className="section-heading author-heading">
        <span className="eyebrow">BEHIND THE WORK</span>
        <h2 id="author-title">About me <em>& contact.</em></h2>
        <p>My background, research interests and ways to get in touch.</p>
      </div>
      <div className="author-grid">
        <div className="author-identity">
          <span className="author-monogram" aria-hidden="true">AL<span>↗</span></span>
          <h3>{author.name}</h3>
          <p className="author-role">{author.role}</p>
          <p className="author-affiliation">{author.institution}<br />{author.location}</p>
          <div className="author-contact" aria-labelledby="author-contact-title">
            <h4 id="author-contact-title">LET’S CONNECT</h4>
            <p>For research collaborations, academic opportunities or a conversation about this work.</p>
            <a className="author-email" href={`mailto:${author.email}`}>{author.email}<Arrow diagonal /></a>
            <a className="author-academic-email" href={`mailto:${author.academicEmail}`}>Academic: {author.academicEmail}</a>
          </div>
          <a className="author-download" href={`${import.meta.env.BASE_URL}${author.cvPath}`} download="CV_Arturo_Lopez_EN.docx">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M5 16v5h14v-5" /></svg>
            <span>Download CV<small>English · Word document (.docx)</small></span>
          </a>
        </div>
        <div className="author-background">
          <p className="author-intro">{author.profile}</p>
          <dl className="author-highlights">
            <div><dt>Medical education</dt><dd>UACH · GPA 9.47/10.00<br /><span>First Place of Class · Honors Distinction</span></dd></div>
            <div><dt>Research experience</dt><dd>INNN, Mexico City · University of Belgrade<br /><span>Neurobiochemistry, sleep and neurophysiology</span></dd></div>
            <div><dt>Teaching</dt><dd>Medical Physiology instructor, UACH<br /><span>August 2023–present</span></dd></div>
          </dl>
          <div className="author-interests">
            <h4>RESEARCH INTERESTS</h4>
            <ul>{author.interests.map(interest => <li key={interest}>{interest}</li>)}</ul>
          </div>
        </div>
      </div>
      <details className="author-cv">
        <summary><span>Read full curriculum vitae<small>Education, research, teaching & scientific output</small></span><span className="author-cv-toggle" aria-hidden="true">+</span></summary>
        <div className="author-cv-content">
          {cvSections.map(section => <section className="author-cv-section" key={section.title} aria-labelledby={`cv-${section.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
            <h3 id={`cv-${section.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{section.title}</h3>
            <div>{section.entries.map(entry => <article className="author-cv-entry" key={entry.title}>
              <div className="author-cv-entry-heading"><h4>{entry.title}</h4>{entry.period && <span>{entry.period}</span>}</div>
              {entry.subtitle && <p>{entry.subtitle}</p>}
              {entry.details && <ul>{entry.details.map(detail => <li key={detail}>{detail}</li>)}</ul>}
            </article>)}</div>
          </section>)}
          <a className="author-cv-contact" href={`mailto:${author.email}`}>Get in touch<Arrow diagonal /></a>
        </div>
      </details>
    </div>
  </section>;
}
