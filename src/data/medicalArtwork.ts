/** Original editorial 2D raster artwork. SVG annotations are separate, editable layers.
 * Shared base plates keep anatomy consistent between conceptual states/methods.
 */
export const medicalArtwork = {
  'heart-normal': { file: 'heart-normal.webp', alt: 'Editorial 2D anterior heart illustration with coronary arteries, great vessels and a limited window into the left ventricular wall.', width: 1536, height: 1024 },
  'heart-injury': { file: 'heart-normal.webp', alt: 'Editorial anterior cardiac anatomy, with a separate conceptual myocardial injury annotation; no cohort-specific lesion is mapped.', width: 1536, height: 1024 },
  'cardiac-tissue-normal': { file: 'cardiac-tissue-normal.webp', alt: 'Editorial cardiac tissue illustration with branching striated cardiomyocytes, central nuclei, intercalated discs and an interstitial capillary.', width: 1536, height: 1024 },
  'cardiac-tissue-injury': { file: 'cardiac-tissue-injury.webp', alt: 'Conceptual focal myocardial injury with interstitial inflammatory-cell symbols beside a disorganized cardiomyocyte; surrounding tissue remains organized.', width: 1536, height: 1024 },
  'muscle-normal': { file: 'muscle-normal.webp', alt: 'Editorial longitudinal skeletal-muscle tissue with fine striations, peripheral nuclei, endomysium and an extracellular capillary.', width: 1536, height: 1024 },
  'muscle-injury': { file: 'muscle-injury.webp', alt: 'Conceptual focal injury of a skeletal-muscle fiber with adjacent interstitial inflammatory-cell symbols; this is not diagnostic histology.', width: 1536, height: 1024 },
  'nmj-normal': { file: 'nmj-reference.webp', alt: 'Pastel 2D motor axon and lavender nerve terminal with acetylcholine vesicles, mitochondria and calcium channels, a basal-lamina mesh, blue crest receptors and a folded pink muscle endplate above striated myofibrils.', width: 1536, height: 1024 },
  'nmj-impaired': { file: 'nmj-reference.webp', alt: 'Shared pastel endplate anatomy with a separate conceptual reduced-activation overlay; it does not assign a mechanism to a patient.', width: 1536, height: 1024 },
  'nmj-muscle-injury': { file: 'nmj-reference.webp', alt: 'Shared pastel synaptic anatomy with a separate focal downstream muscle-injury annotation; functional transmission remains unresolved.', width: 1536, height: 1024 },
  'clinical-distribution': { file: 'clinical-three-view.webp', alt: 'Pastel 2D male muscle atlas in anterior, posterior and right lateral views, with covered pelvis, superficial face and neck muscles, limbs and an anterior rib-cage window showing cardiac context.', width: 1536, height: 1024 },
  'antibody-binding': { file: 'antibody-binding.webp', alt: 'Editorial immunoglobulin with paired Fab arms and Fc stem binding a generic membrane antigen, separate from evidence of synaptic function.', width: 1536, height: 1024 },
  'rns-procedure': { file: 'motor-unit.webp', alt: 'Editorial motor-unit anatomy: one motor axon branches to endplates on three striated skeletal-muscle fibers. Surface RNS sampling is explained in the adjacent diagram.', width: 1536, height: 1024 },
  'sfemg-procedure': { file: 'motor-unit.webp', alt: 'Editorial motor-unit anatomy: one axon innervates different muscle fibers through separate endplates. Intramuscular single-fiber sampling is shown separately.', width: 1536, height: 1024 },
  'needle-procedure': { file: 'motor-unit.webp', alt: 'Editorial motor axon, terminal branches and skeletal-muscle fibers. The adjacent diagram explains local intramuscular motor-unit sampling.', width: 1536, height: 1024 },
} as const;

export type MedicalArtworkId = keyof typeof medicalArtwork;

export function medicalArtworkUrl(id: MedicalArtworkId): string {
  return `${import.meta.env.BASE_URL}media/editorial/${medicalArtwork[id].file}`;
}
