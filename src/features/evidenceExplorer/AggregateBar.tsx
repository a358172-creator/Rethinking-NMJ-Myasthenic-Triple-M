import { useId } from 'react';

export type EvidenceTone = 'teal' | 'navy' | 'burgundy' | 'amber' | 'missing';
export interface AggregateSegment {
  count: number;
  label: string;
  tone: EvidenceTone;
}

/** Each segment encodes a count, never an identifiable case or synthetic row. */
export function AggregateBar({ segments, denominator, label }: {
  segments: readonly AggregateSegment[];
  denominator: number;
  label: string;
}) {
  const id = useId();
  return <svg className="ee-aggregate-bar" viewBox="0 0 600 28" preserveAspectRatio="none" role="img" aria-labelledby={`${id}-title ${id}-description`}>
    <title id={`${id}-title`}>{label}</title>
    <desc id={`${id}-description`}>{segments.map((segment) => `${segment.label}: ${segment.count}/${denominator}`).join('; ')}. Aggregate counts only.</desc>
    <defs><pattern id={`${id}-missing`} width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="var(--background)" /><path d="M-2 2 2-2M0 8 8 0M6 10 10 6" stroke="var(--line)" strokeWidth="1" /></pattern></defs>
    {segments.map((segment, index) => {
      const x = segments.slice(0, index).reduce((sum, previous) => sum + previous.count, 0) / denominator * 600;
      const width = segment.count / denominator * 600;
      return <rect key={segment.label} className={`ee-fill-${segment.tone}`} x={x} y="1" width={width} height="26" fill={segment.tone === 'missing' ? `url(#${id}-missing)` : undefined} />;
    })}
    <rect x=".5" y=".5" width="599" height="27" fill="none" stroke="var(--line)" />
  </svg>;
}

export function EvidenceLegend({ items }: { items: readonly { label: string; tone: EvidenceTone }[] }) {
  return <ul className="ee-legend" aria-label="Chart key">{items.map((item) => <li key={item.label}><span className={`ee-swatch ee-fill-${item.tone}`} aria-hidden="true" />{item.label}</li>)}</ul>;
}
