import { useId, useState } from 'react';

export function EducationalTooltip({ term, text }: { term: string; text: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <span className="educational-tooltip">
      <button type="button" className="tooltip-trigger" aria-label={`Explain ${term}`} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}>{term}<span aria-hidden="true">?</span></button>
      <span className="tooltip-content" id={id} role="note" hidden={!open}>{text}</span>
    </span>
  );
}
