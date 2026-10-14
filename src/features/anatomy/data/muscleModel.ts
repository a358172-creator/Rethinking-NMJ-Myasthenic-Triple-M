export type MuscleState = 'normal' | 'injury'
export type MuscleStructure = 'sarcolemma' | 'myofibrils' | 'nuclei' | 'endomysium' | 'capillary' | 'immune'

export const muscleStructures: { id: MuscleStructure; number: string; label: string; description: string }[] = [
  { id: 'sarcolemma', number: '1', label: 'Sarcolemma', description: 'The muscle-cell membrane separates intracellular contractile tissue from the extracellular space. A focal discontinuity in the injury view represents local tissue damage, not a measured membrane lesion in this cohort.' },
  { id: 'myofibrils', number: '2', label: 'Myofibrils', description: 'Parallel myofibrils contain repeating sarcomeres, producing the aligned transverse bands. The injury view interrupts this organization locally; other parts of the same fiber remain organized.' },
  { id: 'nuclei', number: '3', label: 'Peripheral myonuclei', description: 'A skeletal-muscle fiber is a single, multinucleated cell. Its myonuclei normally lie at the cell periphery, immediately inside the sarcolemma. They are distinct from immune-cell nuclei outside the fiber.' },
  { id: 'endomysium', number: '4', label: 'Endomysium', description: 'Fine connective tissue surrounds each muscle fiber. This extracellular compartment separates neighboring cells and contains small blood vessels; it is not part of the contractile cytoplasm.' },
  { id: 'capillary', number: '5', label: 'Local capillary', description: 'The small vessel runs between muscle fibers within connective tissue. Its lumen and red blood cells remain outside the muscle-cell membrane. Vessel size and spacing are enlarged for legibility.' },
  { id: 'immune', number: '6', label: 'Inflammatory focus', description: 'The conceptual injury view places CD8-positive T-cell symbols in the endomysium against a damaged fiber and a macrophage at the injury margin. These cell types were reported in selected published specimens; their activity and location are not demonstrated for every patient.' },
]

export const muscleStateCopy: Record<MuscleState, { label: string; summary: string }> = {
  normal: { label: 'Organized muscle', summary: 'Three longitudinal fiber cutaways show intact cell boundaries, parallel myofibrils, peripheral nuclei and connective tissue containing a capillary. The cut faces are explanatory windows, not sites of injury.' },
  injury: { label: 'Conceptual immune injury', summary: 'A localized inflammatory focus lies beside the middle fiber. Nearby myofibrils lose organization and a small part of its sarcolemma is interrupted. Neighboring fibers remain organized; this is a conceptual tissue example, not cohort histology.' },
}

export const muscleAnatomicalSources = [
  { label: 'Muscle-cell organization — University of Minnesota Histology Guide', href: 'https://histologyguide.org/slideview/MH-055a-skeletal-muscle/04-slide-1.html' },
  { label: 'Selected biopsy and necropsy observations — Plomp et al., 2025, Figures 3–4', href: 'https://pubmed.ncbi.nlm.nih.gov/39896961/' },
  { label: 'CD8-predominant biopsy findings — Ucem et al., 2026', href: 'https://pubmed.ncbi.nlm.nih.gov/41835655/' },
]
