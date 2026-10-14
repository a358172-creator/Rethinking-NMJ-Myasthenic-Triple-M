export type StructureId = 'heart' | 'muscle' | 'nmj'

export type EvidenceKind = 'physiology' | 'literature' | 'proposed' | 'cohort'

/** Frozen aggregates shared by every module. No patient-level records.
 * Core categorical counts reproduce the Phase 3A.2 report; source attribution remains unresolved.
 */
export const frozenStudy = {
  cohort: { n: 38, sources: 27, phenotype: '38/38' },
  achr: { result: '11/30', percentage: '36.7%', positive: 11, tested: 30 },
  formalNmj: { tested: 4, evaluated: '4/38', abnormal: '0/4', ci: '0–60.2%' },
  nmjEvidence: { formalPositive: 0, formalNegative: 4, indeterminateQualitative: 2, notDocumented: 32 },
  sfemg: { tested: 1, nested: true },
  needleEmg: { result: '6/11', percentage: '54.5%', tested: 11, myopathic: 6, neuropathic: 1, normal: 1, indeterminate: 3, notDocumented: 27, ci: '23.4–83.3%' },
  pairedAchrNmj: { documented: 0, achrPositive: 11 },
  mortality: { result: '16/38', percentage: '42.1%' },
} as const

export interface EvidenceItem {
  kind: EvidenceKind
  text: string
  referenceIds?: string[]
}

export interface MechanismContent {
  id: StructureId
  eyebrow: string
  title: string
  summary: string
  evaluation: string[]
  caution: string
  evidence: EvidenceItem[]
}

export interface ScientificReference {
  id: string
  authors: string
  title: string
  publication: string
  doi?: string
  url?: string
  status: 'verified' | 'review'
}

export const evidenceLevels: Record<EvidenceKind, { label: string; description: string }> = {
  physiology: {
    label: 'Established physiology',
    description: 'Normal anatomy and function. These principles do not identify a patient’s mechanism of injury.',
  },
  literature: {
    label: 'Literature-supported observations',
    description: 'Findings reported in cited studies; their populations and tested subsets differ from the present analysis.',
  },
  proposed: {
    label: 'Emerging or proposed mechanisms',
    description: 'Conceptual explanations under investigation, not mechanisms established throughout Triple M.',
  },
  cohort: {
    label: 'Present N=38 analysis',
    description: 'Frozen aggregate findings from 38 published patients in 27 source publications, with evaluable denominators preserved.',
  },
}

export const mechanisms: Record<StructureId, MechanismContent> = {
  heart: {
    id: 'heart',
    eyebrow: 'Cardiac injury',
    title: 'Myocardium',
    summary: 'ICI-associated myocarditis involves immune-mediated myocardial injury. Inflammation may affect electrical conduction and contraction, producing heart block or arrhythmias even when left ventricular ejection fraction is preserved.',
    evaluation: [
      'ECG and rhythm monitoring assess conduction disturbances and arrhythmias.',
      'Cardiac troponin indicates injury but does not independently confirm myocarditis. cTnT can also rise with myositis; cTnI is more specific for cardiac injury.',
      'Echocardiography evaluates ventricular function; preserved LVEF does not exclude myocarditis.',
      'Cardiac MRI assesses tissue abnormalities alongside clinical and specialist assessment.',
    ],
    caution: 'Suspected myocarditis warrants urgent specialist assessment. A normal echocardiogram or preserved LVEF cannot exclude clinically important cardiac disease.',
    evidence: [
      {
        kind: 'physiology',
        text: 'Coordinated electrical activation enables myocardial contraction. Damage to the conduction system can disrupt rhythm independently of global systolic function.',
      },
      {
        kind: 'literature',
        text: 'Published pathology describes myocardial lymphocytes, including CD8-positive cells, and myocyte injury. Clinical literature documents serious electrical complications despite preserved LVEF.',
        referenceIds: ['giovannini-2023', 'sitc-2021', 'guidon-2021'],
      },
      {
        kind: 'proposed',
        text: 'Shared antigenic targets may help explain concurrent cardiac and skeletal-muscle injury. A universal antigen linking heart, muscle, and NMJ has not been established in this analysis.',
      },
      {
        kind: 'cohort',
        text: 'Conduction abnormalities or arrhythmias were reported in 20/38. LVEF was preserved in 21/38, reduced in 5/38, and unreported in 12/38. These aggregates do not establish a patient-level cross-tabulation.',
      },
    ],
  },
  muscle: {
    id: 'muscle',
    eyebrow: 'Skeletal-muscle injury',
    title: 'Muscle fibers',
    summary: 'Immune-mediated muscle injury may involve proximal, cervical, ocular, bulbar, and respiratory muscles. Injury in these distributions can produce an MG-like phenotype while primary NMJ dysfunction may also coexist.',
    evaluation: [
      'CK reflects muscle injury and is interpreted with the clinical examination.',
      'Conventional needle EMG assesses motor-unit patterns and muscle membrane irritability; it does not directly test synaptic transmission.',
      'Muscle MRI can identify edema and the distribution of tissue abnormalities.',
      'Muscle biopsy can characterize inflammatory or necrotizing pathology when clinically indicated.',
    ],
    caution: 'A myopathic needle-EMG pattern supports muscle involvement but does not independently establish inflammatory myositis. Bulbar or respiratory compromise requires urgent assessment.',
    evidence: [
      {
        kind: 'physiology',
        text: 'Muscle fibers convert electrical activation into force. Extraocular, bulbar, cervical, and respiratory muscle function contributes to eye movement, swallowing, head support, and breathing.',
      },
      {
        kind: 'literature',
        text: 'Plomp and Ucem describe MG-like manifestations with muscle involvement. Selected biopsy and necropsy specimens show inflammatory infiltrates, including CD8-positive cells; these findings were not demonstrated in every N=38 patient.',
        referenceIds: ['plomp-2025', 'ucem-2026'],
      },
      {
        kind: 'proposed',
        text: 'Preferential injury of ocular, bulbar, and respiratory muscles is a possible explanation for an MG-like distribution of weakness. It does not establish that an individual has exclusively muscle-mediated disease.',
        referenceIds: ['plomp-2025'],
      },
      {
        kind: 'cohort',
        text: 'A myopathic pattern was documented in 6/11 needle-EMG-tested patients (54.5%). This muscle finding is distinct from formal RNS/SFEMG evidence and from biopsy-confirmed inflammatory myositis.',
      },
    ],
  },
  nmj: {
    id: 'nmj',
    eyebrow: 'Neuromuscular transmission',
    title: 'Neuromuscular junction',
    summary: 'The NMJ translates a motor nerve signal into muscle activation. Primary impairment can contribute to fatigable weakness, but an MG-like clinical phenotype or isolated AChR positivity does not by itself demonstrate transmission failure.',
    evaluation: [
      'Clinical fatigability and the temporal pattern characterize weakness; symptoms alone do not localize its mechanism.',
      'AChR and MuSK serology provides biological evidence, interpreted alongside clinical and physiological findings.',
      'Repetitive nerve stimulation (RNS) evaluates the muscle response to repeated nerve activation.',
      'Single-fiber EMG (SFEMG) assesses jitter and blocking; results require specialist interpretation and clinical correlation.',
    ],
    caution: 'Normal RNS does not universally exclude an NMJ disorder. Untested or unreported patients cannot be counted as negative, and muscle injury does not exclude concurrent NMJ dysfunction.',
    evidence: [
      {
        kind: 'physiology',
        text: 'A motor nerve action potential triggers acetylcholine release from presynaptic vesicles. Acetylcholine crosses the synaptic cleft and binds postsynaptic receptors, initiating depolarization and a muscle action potential.',
      },
      {
        kind: 'literature',
        text: 'Guidon’s consensus definitions separate serological support from electrodiagnostic evidence. Plomp found an RNS decrement in 1/41 tested patients, who had pre-existing MG; testing was not uniform across that cohort.',
        referenceIds: ['guidon-2021', 'plomp-2025'],
      },
      {
        kind: 'proposed',
        text: 'The impaired-transmission view illustrates a possible contribution of primary NMJ dysfunction. It does not depict a specific antibody attack as a demonstrated mechanism in every Triple M patient.',
      },
      {
        kind: 'cohort',
        text: 'Formal RNS and/or SFEMG was documented in 4/38; objective abnormality was 0/4 (exact 95% CI 0–60.2%). SFEMG in one patient is included within the four. None of the 11 AChR-positive patients had RNS/SFEMG documented.',
      },
    ],
  },
}

export const studyStats: { id: string; value: string; label: string; detail: string }[] = [
  {
    id: 'cohort',
    value: `N=${frozenStudy.cohort.n}`,
    label: 'Published patients',
    detail: '27 source publications; a clinically defined MG-like phenotype in 38/38. Literature-derived individual patient-level pooled analysis.',
  },
  {
    id: 'achr',
    value: frozenStudy.achr.result,
    label: 'AChR-positive',
    detail: '36.7% among 30 evaluated; exact 95% CI 19.9–56.1%. Seropositivity is not physiological confirmation of transmission failure.',
  },
  {
    id: 'nmj',
    value: frozenStudy.formalNmj.abnormal,
    label: 'Objective NMJ abnormality',
    detail: 'Formal RNS and/or SFEMG in 4/38; exact 95% CI 0–60.2%. SFEMG in one patient is a subset of these four, not a fifth case.',
  },
  {
    id: 'needle-emg',
    value: frozenStudy.needleEmg.result,
    label: 'Myopathic needle EMG',
    detail: '54.5% among 11 evaluated; exact 95% CI 23.4–83.3%. A myopathic pattern does not independently prove inflammatory myositis.',
  },
  {
    id: 'mortality',
    value: frozenStudy.mortality.result,
    label: 'Documented mortality',
    detail: '42.1% of the full analytical cohort; exact 95% CI 26.3–59.2%. Follow-up varies by source; one vital status was unreported.',
  },
]

export const sharedManifestations: string[] = [
  'Ptosis',
  'Diplopia',
  'Bulbar weakness',
  'Neck weakness',
  'Proximal weakness',
  'Respiratory muscle weakness',
]

export const sourceLimitations: string[] = [
  'Four supplied documents were reviewed: the frozen N=38 manuscript, numerical audit, Spanish narrative review, and scientific guardrails. The referenced conference abstract was not supplied and has not been reviewed.',
  'The source workbook is available and its categorical totals have been independently reproduced. Numerical agreement does not resolve patient-to-source attribution or category discrepancies. Patient-level exploration remains on hold pending source validation and separate author review; the full biochemical analysis is unresolved.',
  'This literature-derived analysis includes 38 published patients from 27 sources. Targeted case ascertainment, publication bias, and reporting bias limit generalizability; it is not a prospective cohort or a formal PRISMA-compliant systematic review.',
  'Only 4/38 had evaluable formal NMJ testing. The 0/4 result (exact 95% CI 0–60.2%) does not establish absence of NMJ disease; missing testing is not a negative result.',
  'None of the 11 AChR-positive patients had documented RNS/SFEMG. This is absence of paired evidence, not evidence of normal transmission in seropositive cases.',
  'The serology, needle-EMG, and formal NMJ subsets differ. Their proportions should not be interpreted as direct comparisons or as patient-level mechanism assignments.',
  'Diagnostic methods, assay types, test timing, prior treatment, pathology availability, and follow-up varied. Muscle injury and primary NMJ dysfunction can coexist.',
]

export const references: ScientificReference[] = [
  {
    id: 'guidon-2021',
    authors: 'Guidon AC, Burton LB, Chwalisz BK, et al.',
    title: 'Consensus disease definitions for neurologic immune-related adverse events of immune checkpoint inhibitors',
    publication: 'Journal for ImmunoTherapy of Cancer. 2021;9(7):e002890.',
    doi: '10.1136/jitc-2021-002890',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8291304/',
    status: 'verified',
  },
  {
    id: 'plomp-2025',
    authors: 'Plomp L, Chassepot H, Psimaras D, et al.',
    title: 'Features of myositis and myasthenia gravis in patients treated with immune checkpoint inhibitors: a multicentric, retrospective cohort study',
    publication: 'The Lancet Regional Health – Europe. 2025;50:101192.',
    doi: '10.1016/j.lanepe.2024.101192',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11782875/',
    status: 'verified',
  },
  {
    id: 'ucem-2026',
    authors: 'Ucem S, Yunisova G, Bulus E, Lacin S, Oflazer P.',
    title: 'Myasthenia-Like Presentations Following PD-1 Inhibitors: CD8+ Myositis, Myasthenia, or Both?',
    publication: 'Cureus. 2026;18(2):e103430.',
    doi: '10.7759/cureus.103430',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12988698/',
    status: 'verified',
  },
  {
    id: 'wei-2026',
    authors: 'Wei M, Hu T, Yang L, Duan Y, Li Y.',
    title: 'Immune checkpoint inhibitor-related myositis, myocarditis, and myasthenia gravis overlap syndrome: a systematic review and pooled analysis of individual cases',
    publication: 'Frontiers in Immunology. 2026;17:1854723.',
    doi: '10.3389/fimmu.2026.1854723',
    url: 'https://www.frontiersin.org/journals/immunology/articles/10.3389/fimmu.2026.1854723/full',
    status: 'verified',
  },
  {
    id: 'sitc-2021',
    authors: 'Brahmer JR, Abu-Sbeih H, Ascierto PA, et al.',
    title: 'Society for Immunotherapy of Cancer (SITC) clinical practice guideline on immune checkpoint inhibitor-related adverse events',
    publication: 'Journal for ImmunoTherapy of Cancer. 2021;9(6):e002435.',
    doi: '10.1136/jitc-2021-002435',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8237720/',
    status: 'verified',
  },
  {
    id: 'giovannini-2023',
    authors: 'Giovannini E, Bonasoni MP, D’Aleo M, et al.',
    title: 'Pembrolizumab-Induced Fatal Myasthenia, Myocarditis, and Myositis in a Patient with Metastatic Melanoma: Autopsy, Histological, and Immunohistochemical Findings—A Case Report and Literature Review',
    publication: 'International Journal of Molecular Sciences. 2023;24(13):10919.',
    doi: '10.3390/ijms241310919',
    url: 'https://www.mdpi.com/1422-0067/24/13/10919',
    status: 'verified',
  },
  {
    id: 'stalberg-2019',
    authors: 'Stålberg E, van Dijk H, Falck B, et al.',
    title: 'Standards for quantification of EMG and neurography',
    publication: 'Clinical Neurophysiology. 2019;130(9):1688–1729.',
    doi: '10.1016/j.clinph.2019.05.008',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31213353/',
    status: 'verified',
  },
  {
    id: 'stalberg-1974',
    authors: 'Stålberg E, Ekstedt J, Broman A.',
    title: 'Neuromuscular transmission in myasthenia gravis studied with single fibre electromyography',
    publication: 'Journal of Neurology, Neurosurgery & Psychiatry. 1974;37(5):540–547.',
    doi: '10.1136/jnnp.37.5.540',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC494698/',
    status: 'verified',
  },
  {
    id: 'skolka-2022',
    authors: 'Skolka M, Lamb CJ, Rubin DI, Klein CJ, Laughlin RS.',
    title: 'Electrodiagnostic Characteristics Suggestive of Muscle-Specific Kinase Myasthenia Gravis',
    publication: 'Neurology: Clinical Practice. 2022;12(3):211–217.',
    doi: '10.1212/CPJ.0000000000001166',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9208421/',
    status: 'verified',
  },
  {
    id: 'kouyoumdjian-2020',
    authors: 'Kouyoumdjian JA, Ronchi LG, de Faria FO.',
    title: 'Jitter evaluation in denervation and reinnervation in 32 cases of chronic radiculopathy',
    publication: 'Clinical Neurophysiology Practice. 2020;5:165–172.',
    doi: '10.1016/j.cnp.2020.07.006',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7479254/',
    status: 'verified',
  },
  {
    id: 'muller-jensen-2023',
    authors: 'Müller-Jensen L, Knauss S, Ginesta Roque L, et al.',
    title: 'Autoantibody profiles in patients with immune checkpoint inhibitor-induced neurological immune related adverse events',
    publication: 'Frontiers in Immunology. 2023;14:1108116.',
    doi: '10.3389/fimmu.2023.1108116',
    url: 'https://pubmed.ncbi.nlm.nih.gov/36845122/',
    status: 'verified',
  },
]
