import { useId, type ReactNode } from 'react';
import './scientific-figures.css';

interface ScientificFigureProps {
  number: string;
  title: string;
  subtitle?: string;
  caption: ReactNode;
  children: ReactNode;
}

/** Public explanatory figures contain conceptual diagrams and aggregate findings only. */
export function ScientificFigure({ number, title, subtitle, caption, children }: ScientificFigureProps) {
  const id = useId();
  return (
    <figure className="sfn-figure-container" aria-labelledby={`${id}-title`} aria-describedby={`${id}-caption`}>
      <header className="sfn-figure-heading">
        <span className="sfn-figure-number">FIGURE {number}</span>
        <h3 id={`${id}-title`}>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </header>
      {children}
      <figcaption className="sfn-figure-caption" id={`${id}-caption`}>{caption}</figcaption>
    </figure>
  );
}
