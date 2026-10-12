import { frozenStudy } from './science'
import type { EvidenceItem } from './science'

export type PhenotypeRegionId = 'ocular' | 'bulbar' | 'cervical' | 'proximal' | 'respiratory'
export type SerologyId = 'achr' | 'musk' | 'context'
export type ElectrophysiologyId = 'rns' | 'sfemg' | 'needle'
export type FindingId = 'fatigable' | 'fixed' | 'oculobulbar' | 'ck' | 'achr' | 'rns' | 'jitter' | 'myopathic' | 'tissue'
export type InterpretiveState = 'nmj' | 'muscle' | 'overlap'

export interface PhenotypeRegion {
  id: PhenotypeRegionId
  label: string
  manifestations: string[]
  muscleMechanism: string
  nmjMechanism: string
  boundary: string
  evidence: EvidenceItem[]
}

export interface SerologyPanel {
  title: string
  summary: string
  measures: string
  limits: string
  pretreatment: string
  evidence: EvidenceItem[]
}

export interface ElectrophysiologyPanel {
  title: string
  summary: string
  measures: string
  limits: string
  factors: string[]
  evidence: EvidenceItem[]
}

export interface EvidenceFinding {
  id: FindingId
  label: string
  domain: string
  measures: string
  // Fixed display order: NMJ, muscle, overlap. No score or classification is calculated.
  supports: [string, string, string]
  limits: string
  clarify: string
  evidence: EvidenceItem[]
}

export interface InterpretationContent {
  label: string
  title: string
  text: string
  evidence: EvidenceItem[]
}

const cohortPhenotype = `The MG-like phenotype occurred in ${frozenStudy.cohort.phenotype}; it describes clinical inclusion, not proof of primary NMJ dysfunction.`
const cohortNmj = `Formal RNS and/or SFEMG was documented in ${frozenStudy.formalNmj.evaluated}. Objective abnormality was ${frozenStudy.formalNmj.abnormal}, exact 95% CI ${frozenStudy.formalNmj.ci}; this small tested subset cannot exclude NMJ disease.`
const cohortSerology = `AChR-positive: ${frozenStudy.achr.result} (${frozenStudy.achr.percentage}) among those evaluated. Missing testing is not a negative result.`
const cohortPairing = `None of the ${frozenStudy.pairedAchrNmj.achrPositive} AChR-positive patients had documented RNS or SFEMG. This is missing paired physiology, not normal testing.`
const cohortNeedle = `Myopathic needle EMG: ${frozenStudy.needleEmg.result} (${frozenStudy.needleEmg.percentage}). This finding supports muscle involvement, not histological confirmation of inflammatory myositis.`

export const formalNmjTestedCount = frozenStudy.formalNmj.tested

function domains(
  physiology: string,
  literature: string,
  proposed: string,
  cohort: string,
  referenceIds: string[] = ['guidon-2021', 'plomp-2025'],
): EvidenceItem[] {
  return [
    { kind: 'physiology', text: physiology },
    { kind: 'literature', text: literature, referenceIds },
    { kind: 'proposed', text: proposed },
    { kind: 'cohort', text: cohort },
  ]
}

export const illustrativeWaveformLabel = 'Illustrative educational waveform — not a patient recording.'

export const laboratorySafetyNote = 'Suspected ICI-related myocarditis, rapidly progressive bulbar weakness, or respiratory compromise requires urgent clinical evaluation and management. Completing every diagnostic test is not a prerequisite for urgent care.'

export const phenotypeRegions: PhenotypeRegion[] = [
  {
    id: 'ocular',
    label: 'Extraocular muscles & eyelids',
    manifestations: ['Ptosis', 'Diplopia', 'Impaired eye movements'],
    muscleMechanism: 'Injury involving extraocular muscles can impair eye movement; involvement of the eyelid-elevating musculature may contribute to ptosis.',
    nmjMechanism: 'Impaired transmission at the motor endplates of the levator palpebrae superioris and extraocular muscles can reduce eyelid elevation and coordinated eye movement.',
    boundary: 'The levator elevates the upper lid; the extraocular muscles position the globe. Ptosis or diplopia alone cannot identify which physiological process is impaired.',
    evidence: domains(
      'Eyelid elevation and eye position depend on distinct skeletal muscles and their motor innervation.',
      'Published ICI-associated muscle disease includes ocular presentations; selected extraocular tissue specimens show inflammation.',
      'Preferential ocular muscle injury offers a possible explanation for an MG-like presentation. It is not established for each patient.',
      cohortPhenotype,
      ['plomp-2025', 'ucem-2026'],
    ),
  },
  {
    id: 'bulbar',
    label: 'Bulbar musculature',
    manifestations: ['Dysphagia', 'Dysarthria or dysphonia', 'Chewing weakness'],
    muscleMechanism: 'Immune-mediated injury of tongue, pharyngeal, palatal, or other swallowing-related skeletal muscles can reduce speech and swallowing function.',
    nmjMechanism: 'Transmission instability in these muscles can cause weakness during speaking, chewing, or swallowing.',
    boundary: 'Speech and swallowing involve several muscle groups. Their impairment can occur with muscle injury, NMJ dysfunction, or both; rapidly progressive symptoms require urgent assessment.',
    evidence: domains(
      'Bulbar motor function coordinates tongue, palate, pharynx, and larynx for speech, swallowing, and airway protection.',
      'ICI-associated neuromuscular reports describe dysphagia and other bulbar symptoms with muscle disease as well as NMJ disease.',
      'A bulbar distribution may reflect anatomical muscle involvement, transmission impairment, or overlap; location alone cannot settle that attribution.',
      cohortPhenotype,
      ['guidon-2021', 'ucem-2026'],
    ),
  },
  {
    id: 'cervical',
    label: 'Cervical muscles',
    manifestations: ['Neck flexion weakness', 'Neck extension weakness', 'Difficulty supporting the head'],
    muscleMechanism: 'Injury of cervical flexor or extensor muscle fibers may reduce head support and neck movement.',
    nmjMechanism: 'Insufficient activation across cervical motor endplates can reduce sustained neck strength.',
    boundary: 'Neck weakness is a distribution of impaired force, not a tissue diagnosis. Examination, muscle evidence, and transmission studies address different parts of the question.',
    evidence: domains(
      'Cervical flexors and extensors act together to position and support the head.',
      'Consensus descriptions include neck weakness among presentations that can require assessment of both muscle and NMJ disorders.',
      'A prominent cervical phenotype may reflect selective muscle vulnerability; its mechanism remains uncertain without complementary evidence.',
      cohortPhenotype,
      ['guidon-2021'],
    ),
  },
  {
    id: 'proximal',
    label: 'Proximal limb muscles',
    manifestations: ['Difficulty raising the arms', 'Difficulty rising from a chair', 'Hip or shoulder weakness'],
    muscleMechanism: 'Loss of force from injured shoulder-girdle or hip-girdle muscle fibers can impair antigravity movement.',
    nmjMechanism: 'Reduced transmission safety can limit activation of these muscles, especially during sustained or repeated use.',
    boundary: 'Proximal weakness supports a neuromuscular problem but does not distinguish myopathy from NMJ disease. Persistent weakness does not exclude an NMJ contribution.',
    evidence: domains(
      'Proximal muscles generate the force needed for shoulder and hip movement.',
      'ICI-associated muscle disease may accompany ocular or bulbar manifestations with limb weakness.',
      'Coexisting proximal and oculobulbar findings may fit a muscle distribution or overlapping mechanisms; the pattern is not a classifier.',
      cohortNeedle,
      ['plomp-2025', 'ucem-2026'],
    ),
  },
  {
    id: 'respiratory',
    label: 'Respiratory muscles & diaphragm',
    manifestations: ['Reduced inspiratory strength', 'Weak cough', 'Hypoventilation or respiratory compromise'],
    muscleMechanism: 'Diaphragm or other respiratory-muscle injury can reduce inspiratory force and effective ventilation.',
    nmjMechanism: 'Transmission failure in the diaphragm, intercostal, or accessory respiratory muscles can impair ventilation.',
    boundary: 'Breathlessness can also arise from cardiac or pulmonary disease. Respiratory compromise needs urgent evaluation; physiological clarification should not delay necessary care.',
    evidence: domains(
      'The diaphragm is the principal inspiratory muscle; intercostal and accessory muscles contribute to breathing.',
      'Selected diaphragm specimens in ICI-associated myositis show direct muscle inflammation. Clinical guidance recognizes serious respiratory presentations and concurrent cardiac disease.',
      'Muscle injury and impaired transmission can each contribute to respiratory weakness, and may coexist.',
      cohortNmj,
      ['plomp-2025', 'sitc-2021'],
    ),
  },
]

export const serologyPanels: Record<SerologyId, SerologyPanel> = {
  achr: {
    title: 'Acetylcholine receptor antibodies',
    summary: 'AChR antibodies provide biologically relevant support for autoimmune MG when the clinical and physiological context fits.',
    measures: 'An antibody assay detects immunoreactivity against the acetylcholine receptor. It does not record transmission across a patient’s motor endplate.',
    limits: 'A positive result does not independently demonstrate transmission failure. A negative result does not automatically exclude an NMJ disorder; assay method and clinical context matter.',
    pretreatment: 'When available, paired pre-ICI and later samples can distinguish pre-existing antibody detection from treatment-emergent detection. Without a baseline sample, the time of antibody appearance remains uncertain.',
    evidence: domains(
      'Postsynaptic AChRs bind acetylcholine to initiate endplate depolarization; detecting antibodies and measuring that function are separate observations.',
      'Plomp reported AChR positivity already present in available pre-ICI samples, highlighting the importance of temporal context.',
      'The contribution of AChR antibodies to ICI-associated muscle disease remains an open question; positivity is not a validated stand-alone mechanism assignment.',
      `${cohortSerology} ${cohortPairing}`,
      ['plomp-2025', 'guidon-2021'],
    ),
  },
  musk: {
    title: 'Muscle-specific kinase antibodies',
    summary: 'MuSK serology addresses a different postsynaptic autoimmune target and may be relevant when AChR antibodies are absent and the clinical picture suggests NMJ disease.',
    measures: 'The assay detects antibodies against MuSK, a protein involved in organizing the postsynaptic receptor apparatus.',
    limits: 'Negative AChR and MuSK results do not exclude all NMJ disease. Positive serology still requires clinical correlation and does not provide a measured transmission trace.',
    pretreatment: 'Prior MG history and available pre-ICI samples help interpret temporal association. Detection after ICI exposure alone does not establish when autoimmunity began.',
    evidence: domains(
      'MuSK helps organize the postsynaptic apparatus; it is a distinct target from the acetylcholine receptor.',
      'Guidon’s consensus discusses MuSK assessment in the context of suspected NMJ disease and possible pre-existing MG.',
      'The relationship between a detected antibody, ICI exposure, and current weakness requires evidence beyond temporal coincidence.',
      'No new MuSK cohort proportion is inferred for this laboratory. Untested or unreported serology must remain missing.',
      ['guidon-2021'],
    ),
  },
  context: {
    title: 'Serology in context',
    summary: 'Clinical phenotype, serum antibodies, muscle injury, and NMJ physiology answer complementary questions.',
    measures: 'Serology identifies an immune marker. RNS and SFEMG assess transmission; CK, needle EMG, imaging, and biopsy address different aspects of muscle involvement. Additional immune markers, including anti-titin antibodies reported in ICI-associated neuromuscular toxicity, provide serological context but do not directly measure NMJ transmission.',
    limits: 'A panel of detected antibodies is not a functional transmission test or a validated ICI diagnostic score. Seronegativity, missing results, and normal physiology are different observations.',
    pretreatment: 'Interpretation includes assay method, symptom timing, prior treatment, previous MG, and available pre-ICI samples. Baseline samples are contextual evidence, not a prerequisite for urgent care.',
    evidence: domains(
      'An analyte measured in blood and a signal recorded from activated muscle represent different evidence domains.',
      'Consensus definitions separate serological support, electrodiagnostic findings, and evidence of muscle injury. Published antibody profiling includes anti-titin as an additional immune marker.',
      'Prospective paired serology and physiology could clarify which immune markers track functional abnormalities; this relationship is not established here.',
      cohortPairing,
      ['guidon-2021', 'muller-jensen-2023'],
    ),
  },
}

export const electrophysiologyPanels: Record<ElectrophysiologyId, ElectrophysiologyPanel> = {
  rns: {
    title: 'Repetitive nerve stimulation',
    summary: 'RNS compares compound muscle action potentials (CMAPs) after repeated motor nerve stimulation.',
    measures: 'A reproducible decrement is a reduction in CMAP amplitude or area across responses. Under adequate recording conditions, it indicates that fewer muscle fibers respond during the train.',
    limits: 'One normal RNS does not definitively exclude MG. A decrement supports transmission dysfunction but does not independently establish its cause or exclude concurrent muscle injury.',
    factors: [
      'Selection of muscles relative to the distribution of weakness.',
      'Consistent supramaximal stimulation and stable electrode placement.',
      'Movement artifact and adequate immobilization of the tested region.',
      'Muscle temperature, activation protocol, timing, and prior treatment.',
    ],
    evidence: domains(
      'The CMAP is the summed electrical response of activated muscle fibers, rather than a recording of an individual endplate.',
      'Methodology standards describe technical pitfalls in RNS; Plomp’s protocol sampled multiple nerve–muscle combinations. These studies assess physiology separately from serology.',
      'An apparently normal sampled response may leave a clinically relevant NMJ contribution unresolved because test conditions and disease distribution vary.',
      cohortNmj,
      ['stalberg-2019', 'plomp-2025', 'guidon-2021'],
    ),
  },
  sfemg: {
    title: 'Single-fiber EMG',
    summary: 'SFEMG examines the timing stability of muscle-fiber activation, including jitter and possible impulse blocking.',
    measures: 'In a voluntary paired recording, jitter is discharge-to-discharge variability in the interval between potentials from two fibers of the same motor unit. Blocking is intermittent failure of an expected fiber response.',
    limits: 'Increased jitter is sensitive to transmission instability but is not uniquely specific for MG. Myopathic or neurogenic processes can also alter jitter; muscle selection and recording technique require specialist interpretation.',
    factors: [
      'The tested muscle and whether it is clinically affected.',
      'Voluntary paired recordings versus stimulated jitter recordings.',
      'Appropriate reference limits and reliable identification of fiber signals.',
      'Concurrent muscle disease or denervation/reinnervation, test timing, and prior treatment.',
    ],
    evidence: domains(
      'Small variations in endplate activation timing alter the interval between recorded fiber potentials; marked instability can produce blocking.',
      'Guidon recognizes SFEMG abnormalities in myopathy; a separate primary study documents increased jitter with denervation/reinnervation. The original paired-fiber study defines jitter and blocking.',
      'Transmission instability can occur alongside other neuromuscular processes; an abnormal conceptual trace cannot assign an exclusive mechanism.',
      `SFEMG was documented in ${frozenStudy.sfemg.tested} patient, already included within the ${formalNmjTestedCount} formally NMJ-tested patients (${frozenStudy.formalNmj.evaluated}). The frozen analysis supplies no raw SFEMG traces or numerical jitter values.`,
      ['guidon-2021', 'stalberg-1974', 'kouyoumdjian-2020'],
    ),
  },
  needle: {
    title: 'Conventional needle EMG',
    summary: 'Needle EMG evaluates motor-unit action potentials (MUAPs), recruitment, and spontaneous muscle activity.',
    measures: 'A myopathic pattern may include lower-amplitude, shorter-duration MUAPs and early recruitment relative to force: more motor units are activated to generate the required force.',
    limits: 'A myopathic pattern supports muscle involvement but does not establish inflammatory histopathology. It does not exclude a concurrent NMJ disorder; some NMJ disorders can also produce myopathic-appearing MUAPs.',
    factors: [
      'The muscle sampled, recording position, and degree of voluntary effort.',
      'Amplitude and duration assessed with recruitment, rather than isolated waveform size.',
      'Spontaneous activity, which requires etiological correlation.',
      'CK, imaging or tissue evidence, and separate NMJ physiology when relevant.',
    ],
    evidence: domains(
      'A motor unit includes a motor neuron and its muscle fibers. Needle recordings sample local electrical contributions during activation.',
      'Consensus describes myopathic units and early recruitment within a multidomain assessment. Skolka also reports myopathic-appearing units in confirmed NMJ disease.',
      'Muscle physiology and transmission impairment may contribute together; a schematic myopathic pattern cannot determine inflammatory cause.',
      cohortNeedle,
      ['guidon-2021', 'stalberg-2019', 'skolka-2022'],
    ),
  },
}

export const findings: EvidenceFinding[] = [
  {
    id: 'fatigable', label: 'Fatigable weakness', domain: 'Clinical phenotype',
    measures: 'An observed decline in strength during sustained or repeated activity; history and examination establish the pattern.',
    supports: [
      'Supports consideration of transmission dysfunction when reproducible and clinically concordant.',
      'Reduced endurance may accompany muscle injury; clinical fatigability alone cannot establish a muscle cause.',
      'A fatigable pattern can coexist with independent evidence of muscle injury.',
    ],
    limits: 'Fatigable weakness is not a direct measurement of NMJ transmission or a uniquely specific diagnosis of MG.',
    clarify: 'NMJ physiology can test transmission; CK and needle EMG address muscle involvement.',
    evidence: domains('Observed force over time describes function rather than immune target.', 'Published consensus integrates examination with distinct diagnostic domains.', 'Clinical fatigability may arise within a presentation whose mechanism remains mixed or uncertain.', cohortPhenotype, ['guidon-2021']),
  },
  {
    id: 'fixed', label: 'Fixed or persistent weakness', domain: 'Clinical phenotype',
    measures: 'Weakness persisting during the examination or reported over time, without clear observed fluctuation.',
    supports: [
      'Persistent weakness does not exclude an NMJ contribution, including in a severe presentation.',
      'Supports consideration of muscle involvement when concordant muscle findings are present.',
      'Persistent weakness may reflect muscle injury, transmission dysfunction, or overlapping processes.',
    ],
    limits: 'Absence of observed fatigability does not prove muscle-only disease.',
    clarify: 'Correlate serial examination with muscle evidence and appropriately sampled NMJ studies.',
    evidence: domains('Sustained loss of force describes the phenotype, not its anatomical cause.', 'Plomp describes non-fluctuating weakness in ICI-associated muscle disease.', 'A persistent pattern can fit a muscle explanation but is not sufficient for an exclusive mechanism assignment.', cohortPhenotype, ['plomp-2025']),
  },
  {
    id: 'oculobulbar', label: 'Oculobulbar symptoms', domain: 'Clinical distribution',
    measures: 'Impaired eyelid elevation, eye movement, speech, chewing, or swallowing localizes affected functions.',
    supports: [
      'Supports consideration of NMJ disease because these functions can be impaired by transmission failure.',
      'Supports consideration of muscle disease because relevant ocular and bulbar muscles can be injured.',
      'The shared distribution is compatible with overlapping mechanisms.',
    ],
    limits: 'Ptosis, diplopia, and dysphagia alone do not distinguish NMJ dysfunction from skeletal-muscle injury.',
    clarify: 'Combine clinical distribution with serology, NMJ physiology, and muscle evidence; progressive bulbar symptoms need urgent assessment.',
    evidence: domains('Distinct skeletal muscles mediate eyelid, globe, and bulbar movements.', 'Published ICI-associated muscle disease includes MG-like ocular and bulbar symptoms.', 'Anatomical muscle vulnerability is one proposed explanation for the shared phenotype.', cohortPhenotype, ['plomp-2025', 'ucem-2026']),
  },
  {
    id: 'ck', label: 'Elevated CK', domain: 'Muscle-injury biomarker',
    measures: 'Increased serum creatine kinase indicates leakage of a muscle enzyme; clinical context determines the likely source and cause.',
    supports: [
      'CK does not test transmission; an elevation does not exclude concurrent NMJ disease.',
      'Provides biochemical evidence supporting muscle injury when consistent with the presentation.',
      'Can document muscle injury alongside separate evidence of NMJ dysfunction.',
    ],
    limits: 'CK elevation is not specific for inflammatory myositis. A normal CK does not automatically exclude muscle disease.',
    clarify: 'Needle EMG and muscle imaging or biopsy can characterize muscle involvement; RNS/SFEMG address transmission.',
    evidence: domains('Serum enzyme activity is a biochemical measurement, distinct from electrical transmission.', 'Consensus assesses CK alongside examination, electrophysiology, and tissue evidence.', 'The degree of biochemical injury cannot assign an exclusive cause of an MG-like phenotype.', 'The laboratory does not infer a CK–NMJ patient-level cross-tabulation from aggregate study results.', ['guidon-2021']),
  },
  {
    id: 'achr', label: 'Positive AChR antibodies', domain: 'Serology',
    measures: 'Detection of antibodies against the acetylcholine receptor, using the laboratory’s assay and reference range.',
    supports: [
      'Provides serological support for autoimmune MG when clinical and physiological evidence is concordant.',
      'Can occur in ICI-associated muscle disease; it does not negate muscle injury.',
      'Raises a question of NMJ autoimmunity while separate muscle and transmission evidence establish functional context.',
    ],
    limits: 'A positive assay does not independently demonstrate transmission failure or establish when antibodies first appeared.',
    clarify: 'Paired pre-ICI samples, when available, clarify timing; RNS/SFEMG assess physiological correlation.',
    evidence: domains('An antibody assay measures immunoreactivity, not endplate activation.', 'Plomp reports pre-existing positivity in available paired sera.', 'The functional role of antibodies in ICI-associated myotoxicity remains unresolved.', `${cohortSerology} ${cohortPairing}`, ['plomp-2025']),
  },
  {
    id: 'rns', label: 'RNS decrement', domain: 'NMJ physiology',
    measures: 'A reproducible fall in the evoked CMAP response during repeated motor nerve stimulation, interpreted under adequate technical conditions.',
    supports: [
      'Provides physiological evidence supporting transmission dysfunction when technically valid.',
      'Requires a transmission explanation and does not negate independently demonstrated muscle injury.',
      'Can support an NMJ contribution alongside separate evidence of muscle disease.',
    ],
    limits: 'A decrement does not independently identify autoimmune MG or its cause. A normal test does not definitively exclude MG.',
    clarify: 'Review test quality, sampled muscles, clinical distribution, serology, and complementary muscle findings.',
    evidence: domains('Sequential CMAPs reflect the population of muscle fibers activated by each stimulus.', 'Methodology standards address technical quality; consensus treats transmission physiology as a distinct domain.', 'A transmission abnormality can fit overlap rather than exclude muscle involvement.', cohortNmj, ['stalberg-2019', 'guidon-2021']),
  },
  {
    id: 'jitter', label: 'Increased SFEMG jitter', domain: 'Transmission timing',
    measures: 'Greater discharge-to-discharge variability in muscle-fiber activation timing; blocking may accompany marked instability.',
    supports: [
      'Provides evidence of transmission instability, requiring interpretation of its cause.',
      'Myopathic or neurogenic processes may also alter jitter; the finding is not unique to MG.',
      'Transmission instability can accompany muscle disease, so abnormal jitter alone cannot prove two separate diseases.',
    ],
    limits: 'Increased jitter is sensitive to instability but is not uniquely specific for MG.',
    clarify: 'Correlate the tested muscle and recording method with routine EMG, RNS, serology, and examination.',
    evidence: domains('Fiber response timing can vary even when a response remains present; blocking denotes a missing expected response.', 'Guidon recognizes abnormalities in myopathy; primary denervation/reinnervation observations demonstrate why jitter is not unique to MG.', 'Whether instability represents primary autoimmune NMJ disease or another neuromuscular process requires contextual evidence.', `Only ${frozenStudy.sfemg.tested} SFEMG evaluation was documented, nested within the formal NMJ subset; no raw jitter measurements are available.`, ['guidon-2021', 'stalberg-1974', 'kouyoumdjian-2020']),
  },
  {
    id: 'myopathic', label: 'Myopathic needle EMG', domain: 'Motor-unit physiology',
    measures: 'Motor-unit morphology and recruitment, including short-duration, low-amplitude potentials and early recruitment relative to force.',
    supports: [
      'Does not directly test synaptic transmission; myopathic-appearing units do not exclude an NMJ disorder.',
      'Supports muscle involvement when interpreted with distribution, effort, and other findings.',
      'Can accompany a separate NMJ abnormality, supporting consideration of overlapping processes.',
    ],
    limits: 'A myopathic pattern is not histological proof of inflammatory myositis or an exclusive mechanism assignment.',
    clarify: 'CK, imaging, or clinically indicated biopsy characterize muscle injury; RNS/SFEMG separately assess transmission.',
    evidence: domains('Needle EMG samples motor-unit electrical activity and recruitment rather than direct endplate transmission.', 'Consensus describes myopathic morphology within a multidomain assessment; Skolka documents myopathic-appearing units in NMJ disease.', 'An electrical muscle pattern may coexist with other mechanisms and does not settle inflammatory cause.', cohortNeedle, ['guidon-2021', 'stalberg-2019', 'skolka-2022']),
  },
  {
    id: 'tissue', label: 'Muscle imaging or biopsy', domain: 'Anatomical and tissue evidence',
    measures: 'MRI identifies the distribution of signal abnormalities such as edema. Biopsy examines a sampled tissue site for fiber injury, necrosis, inflammatory cells, and other pathological features.',
    supports: [
      'Neither MRI nor muscle biopsy tests synaptic transmission; muscle abnormalities do not exclude NMJ dysfunction.',
      'MRI supports anatomical muscle involvement. A biopsy can characterize a specific inflammatory or necrotizing pattern in the sampled muscle.',
      'Tissue or imaging findings can document muscle involvement alongside independent NMJ evidence.',
    ],
    limits: 'Edema is not specific for inflammatory myositis. Biopsy interpretation depends on the sampled site, timing, and pathological pattern; a specimen does not describe every symptomatic muscle.',
    clarify: 'Distinguish the imaging report from the histopathology report, correlate each with CK and EMG, and assess NMJ physiology separately.',
    evidence: domains('MRI measures tissue signal; microscopy assesses structural and cellular features in a specimen.', 'Selected ICI-associated extraocular and diaphragm specimens demonstrate muscle inflammation.', 'A sample-based muscle explanation cannot establish cohort-wide pathology or exclude concurrent transmission impairment.', 'Muscle imaging and pathology were not uniformly available; no unreported specimen is treated as normal or assigned an inflammatory pattern.', ['plomp-2025', 'ucem-2026']),
  },
]

export const interpretationStates: Record<InterpretiveState, InterpretationContent> = {
  nmj: {
    label: 'Primary NMJ dysfunction',
    title: 'Consider the transmission domain',
    text: 'Ask whether technically valid physiology demonstrates transmission impairment and how serology and clinical distribution support its interpretation. The selected finding alone does not establish autoimmune MG.',
    evidence: domains('Transmission physiology addresses activation across the neuromuscular junction.', 'Consensus distinguishes functional transmission evidence from immune markers and clinical symptoms.', 'An NMJ contribution is one possible explanation; it need not exclude muscle injury.', cohortNmj, ['guidon-2021']),
  },
  muscle: {
    label: 'Muscle-predominant immune toxicity',
    title: 'Consider the muscle domain',
    text: 'Ask whether biochemical, motor-unit, imaging, or tissue evidence supports muscle injury. A muscle explanation can account for an MG-like distribution without establishing the absence of a concurrent NMJ disorder.',
    evidence: domains('Injured muscle fibers can generate less force despite successful nerve-to-muscle activation.', 'Published ICI-associated muscle disease includes MG-like ocular, bulbar, and respiratory manifestations.', 'Anatomical muscle involvement offers a possible explanation for the phenotype, rather than a cohort-wide mechanism assignment.', cohortNeedle, ['plomp-2025', 'ucem-2026']),
  },
  overlap: {
    label: 'Potentially overlapping mechanisms',
    title: 'Keep both domains in view',
    text: 'Muscle injury and primary NMJ dysfunction may coexist. Separate evidence for each domain is needed to characterize overlap; missing or discordant findings can leave interpretation unresolved.',
    evidence: domains('Muscle-force generation and NMJ transmission are linked functions with distinct measurements.', 'Clinical consensus recognizes concurrent muscle, NMJ, and cardiac presentations.', 'A multidomain framework can retain uncertainty and potential coexistence; it is not a validated diagnostic algorithm.', `${cohortPairing} The tested subsets differ and do not provide an automatic mechanism classification.`, ['guidon-2021', 'sitc-2021']),
  },
}

export function findingInterpretation(finding: EvidenceFinding, state: InterpretiveState): string {
  const index: Record<InterpretiveState, 0 | 1 | 2> = { nmj: 0, muscle: 1, overlap: 2 }
  return finding.supports[index[state]]
}
