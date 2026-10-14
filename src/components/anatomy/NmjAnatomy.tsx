import { NeuromuscularJunctionDrawing } from '../../features/anatomy/components/NeuromuscularJunction';

interface NmjAnatomyProps {
  impaired?: boolean;
  showSignal?: boolean;
}

/** Compatibility layer: shared 720 × 460 artwork fitted into a 600 × 325 view. */
export function NmjAnatomy({ impaired = false, showSignal = true }: NmjAnatomyProps) {
  return <g className="nmj-anatomy" aria-hidden="true" transform="translate(66 13) scale(.65)">
    <NeuromuscularJunctionDrawing state={impaired ? 'transmission-impaired' : 'normal'} showSignal={showSignal} />
  </g>;
}
