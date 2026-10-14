import { useId, type KeyboardEvent } from 'react';
import { NeuromuscularJunctionDrawing } from '../anatomy/components/NeuromuscularJunction';
import { SkeletalMuscleLayer } from '../anatomy/components/SkeletalMuscleTissue';
import { MyocardiumLayer } from '../anatomy/components/MyocardiumIllustration';

type Structure = 'heart' | 'muscle' | 'nmj';
interface Props { selected: Structure; onSelect: (id: Structure) => void; compact?: boolean }

/** Original tissue map: the same editable anatomy is enlarged in each detail view. */
export function AnatomicalFigure({ selected, onSelect, compact = false }: Props) {
  const id = useId().replace(/:/g, '');
  const selection = (structure: Structure, label: string) => ({
    className: `anatomy-hit-target${selected === structure ? ' is-selected' : ''}`,
    role: 'button', tabIndex: 0,
    'aria-label': `${label}${selected === structure ? ', selected' : ''}`,
    'aria-pressed': selected === structure,
    onClick: () => onSelect(structure),
    onKeyDown: (event: KeyboardEvent<SVGGElement>) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(structure); }
    },
  });
  const card = (structure: Structure, x: number, y: number, width: number, height: number) => <rect className="anatomy-region" x={x} y={y} width={width} height={height} rx="7" fill={selected === structure ? '#F4F7F8' : '#FFFFFF'} stroke={selected === structure ? 'var(--navy)' : 'var(--line)'} strokeWidth={selected === structure ? 2 : 1} />;
  const heading = (structure: Structure, x: number, y: number, number: string, label: string) => <g aria-hidden="true">
    <circle cx={x} cy={y} r="11" fill={selected === structure ? 'var(--navy)' : '#EDF1F4'} />
    <text x={x} y={y + 4} textAnchor="middle" fill={selected === structure ? '#FFFFFF' : 'var(--navy)'} fontSize="10" fontWeight="700">{number}</text>
    <text className="anatomy-label" x={x + 22} y={y + 5} fill="var(--navy)" fontSize="16" fontWeight="600">{label}</text>
  </g>;
  return <svg className={`anatomical-figure${compact ? ' anatomical-figure--compact' : ''}`} viewBox="0 0 660 680" xmlns="http://www.w3.org/2000/svg" role="group" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>Three tissues, potentially overlapping mechanisms</title>
    <desc id={`${id}-desc`}>Select myocardium, skeletal muscle or the neuromuscular junction to explore the physiology and evidence. The heart cutaway distinguishes four chambers and a thick left ventricular wall. Three muscle fibers contain ordered myofibrils. The nerve terminal and folded muscle endplate remain separated by a synaptic cleft. These are normal anatomical models. Dashed connections indicate possible involvement after immune checkpoint blockade, not a proven shared antigen. Enlarged interactive details are available below.</desc>
    <defs><marker id={`${id}-arrow`} markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="none" stroke="var(--muted)" strokeWidth="1.2" /></marker></defs>
    <g aria-hidden="true">
      <path d="M330 91 V108 M330 108 C330 123 172 113 172 138 M330 108 C330 123 487 113 487 138" fill="none" stroke="var(--muted)" strokeWidth="1.4" strokeDasharray="4 5" markerEnd={`url(#${id}-arrow)`} />
      <rect x="190" y="24" width="280" height="67" rx="6" fill="#F4F7F8" stroke="var(--line)" />
      <path d="M215 46 L224 52 L224 66 L215 72 L206 66 L206 52Z M212 54 L219 63 M219 54 L212 63" fill="none" stroke="var(--teal)" strokeWidth="1.5" />
      <text x="240" y="49" fill="var(--navy)" fontSize="14" fontWeight="600">Immune checkpoint blockade</text>
      <text x="240" y="71" fill="var(--muted)" fontSize="11.5">Possible loss of peripheral tolerance</text>
    </g>
    <g {...selection('heart', 'Explore heart and myocardium')}>
      <title>01 · Heart / myocardium</title>
      {card('heart', 36, 151, 281, 254)}
      {heading('heart', 59, 175, '01', 'Heart / myocardium')}
      <g aria-hidden="true" transform="translate(74 191) scale(.39)"><MyocardiumLayer state="normal" compact labels={false} /></g>
      <text aria-hidden="true" x="52" y="391" fill="var(--muted)" fontSize="11">Four-chamber cutaway</text>
    </g>
    <g {...selection('muscle', 'Explore skeletal muscle')}>
      <title>02 · Skeletal muscle</title>
      {card('muscle', 343, 151, 281, 254)}
      {heading('muscle', 366, 175, '02', 'Skeletal muscle')}
      <g aria-hidden="true" transform="translate(353 209) scale(.38)"><SkeletalMuscleLayer state="normal" compact /></g>
      <text aria-hidden="true" x="359" y="372" fill="var(--slate)" fontSize="12">Fiber → myofibrils → sarcomeres</text>
      <text aria-hidden="true" x="359" y="391" fill="var(--muted)" fontSize="11">Longitudinal tissue cutaway</text>
    </g>
    <g aria-hidden="true"><path d="M489 406 V425 H471" fill="none" stroke="var(--muted)" strokeWidth="1.2" strokeDasharray="3 5" /><text x="498" y="430" fill="var(--muted)" fontSize="11">Motor endplate detail</text></g>
    <g {...selection('nmj', 'Explore the neuromuscular junction')}>
      <title>03 · Neuromuscular junction</title>
      {card('nmj', 78, 447, 504, 198)}
      {heading('nmj', 102, 471, '03', 'Neuromuscular junction')}
      <g aria-hidden="true" transform="translate(205 484) scale(.33)"><NeuromuscularJunctionDrawing state="normal" showLabels={false} showSignal={false} /></g>
      <g aria-hidden="true" fill="var(--slate)" fontSize="12">
        <text x="100" y="529">Nerve terminal</text><path d="M185 526 H239 L262 539" fill="none" stroke="var(--muted)" strokeWidth=".9" />
        <text x="443" y="598">Folded endplate</text><path d="M435 594 H382" fill="none" stroke="var(--muted)" strokeWidth=".9" />
        <text x="100" y="624" fill="var(--muted)" fontSize="11">Normal architecture</text>
      </g>
    </g>
    <text aria-hidden="true" x="330" y="666" textAnchor="middle" fill="var(--muted)" fontSize="11">Original anatomical models · enlarged details below · not to scale</text>
  </svg>;
}
