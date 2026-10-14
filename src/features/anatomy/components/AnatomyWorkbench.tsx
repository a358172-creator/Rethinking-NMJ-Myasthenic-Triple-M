import type { StructureId } from '../../../data/science';
import { NmjExplorer } from './NeuromuscularJunction';
import { SkeletalMuscleExplorer } from './SkeletalMuscleTissue';
import { MyocardiumExplorer } from './MyocardiumIllustration';
import '../styles/anatomy.css';

/** Each tissue owns its controls; switching tissues preserves the selected detail. */
export function AnatomyWorkbench({ selected }: { selected: StructureId }) {
  return <div className="anatomy-workbench" id="anatomy-detail">
    <div hidden={selected !== 'heart'}><MyocardiumExplorer /></div>
    <div hidden={selected !== 'muscle'}><SkeletalMuscleExplorer /></div>
    <div hidden={selected !== 'nmj'}><NmjExplorer /></div>
  </div>;
}
