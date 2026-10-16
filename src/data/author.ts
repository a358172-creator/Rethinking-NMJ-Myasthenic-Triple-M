// Professional information transcribed from the author-supplied English CV.
export const author = {
  name: 'Jesús Arturo López Holguín',
  role: 'Medical student · Neuroscience research',
  institution: 'Autonomous University of Chihuahua (UACH)',
  location: 'Chihuahua, México',
  email: 'arturolol559@gmail.com',
  academicEmail: 'a358172@uach.mx',
  cvPath: 'cv/CV_Arturo_Lopez_EN.docx',
  profile: 'Medical student at the Autonomous University of Chihuahua, with research experience at the National Institute of Neurology and Neurosurgery in Mexico City and an international exchange at the University of Belgrade. My interests connect neurophysiology, neuromuscular disease and the mechanisms underlying neurological disorders.',
  interests: [
    'Neurophysiology & neuromuscular disease',
    'Neuroimmunology & demyelinating disease',
    'Kynurenine pathway & excitotoxicity',
    'Neurodevelopment & oxidative stress',
    'Mitochondrial dysfunction',
    'Neurovascular & metabolic interactions',
    'Translational models of neurological disease',
  ],
} as const;

type CvEntry = {
  title: string;
  subtitle?: string;
  period?: string;
  details?: string[];
};

export const cvSections: { title: string; entries: CvEntry[] }[] = [
  {
    title: 'Education',
    entries: [{
      title: 'Medical degree (M.D. program)',
      subtitle: 'Faculty of Medicine and Biomedical Sciences, UACH · Chihuahua, México',
      period: '2021–present',
      details: [
        'Cumulative GPA: 9.47/10.00. First Place of Class; Honors Distinction.',
        'Nine semesters of academic coursework completed. Pre-Graduate Medical Internship (2026–2027) — in progress.',
      ],
    }],
  },
  {
    title: 'Research experience',
    entries: [
      {
        title: 'Research rotation · Neurobiochemistry and Behavior Laboratory',
        subtitle: 'National Institute of Neurology and Neurosurgery (INNN) “Manuel Velasco Suárez” · Mexico City',
        period: 'Winter 2024–summer 2025',
        details: [
          'Supervisor: Dr. Verónica Pérez de la Cruz (SNII Level 3), Researcher in Medical Sciences.',
          'Experimental research on tryptophan catabolism modulation in prenatal stress rodent models.',
          'Brain dissection and tissue processing for HPLC; quantification of reactive oxygen species, lipid peroxidation (TBARS), and mitochondrial function (MTT assay).',
          'Experimental design, multi-group treatment analysis and statistical interpretation of biochemical data.',
        ],
      },
      {
        title: 'International research exchange · Sleep and neurophysiology',
        subtitle: 'Institute of Medical Physiology “Richard Burian”, Faculty of Medicine, University of Belgrade · Serbia',
        period: 'January–February 2024',
        details: [
          'Supervisor: Prof. Dr. Dragan Hrnčić, MD, MSc, PhD, Associate Professor of Medical Physiology.',
          'IFMSA/SCOPE professional exchange, endorsed by the World Federation for Medical Education.',
          'Research and academic activities in sleep physiology and neurological disorders; scientific reasoning, experimental interpretation and international collaboration.',
        ],
      },
    ],
  },
  {
    title: 'Manuscripts in preparation',
    entries: [
      { title: 'Effect of tryptophan catabolism modulation on cognitive and molecular alterations in a prenatal stress rodent model.', subtitle: 'Experimental study · Neurobiochemistry and Behavior Laboratory, INNN' },
      { title: 'Quinolinic acid (QUIN) and excitotoxic mechanisms in neurological diseases.', subtitle: 'Narrative review' },
      { title: 'Pathophysiology of diabetic retinopathy and its association with the kynurenine pathway.', subtitle: 'Narrative review' },
      { title: 'Rethinking the “Myasthenic” Component of Immune Checkpoint Inhibitor–Associated Triple M Syndrome: An Individual Patient-Level Pooled Analysis' },
      { title: 'Immune-Related Cardiac and Neuromuscular Adverse Events with Overlap in the Context of Immune Checkpoint Inhibitors: A Unified Narrative Review of “Triple M” Syndrome and Non-Cardiac Overlap Phenotypes' },
    ],
  },
  {
    title: 'Book chapter',
    entries: [{
      title: 'Co-author · Amenorrhea',
      period: '2026',
      subtitle: 'Guide to Gynecology for Higher Education, first edition. Edited by Bernardo Octavio Enríquez Guillén. Red de Docentes Transdisciplinar de México, Mexico. ISBN: 978-970-96083-1-1.',
    }],
  },
  {
    title: 'Scientific presentations',
    entries: [{
      title: 'Oral presentation · 1st International Congress',
      period: 'May 2025',
      subtitle: '“Neurosciences, Teaching and Learning: A Bridge Under Construction” · Online · UACH, UPNESA, CIENE, UNAAPAM',
      details: ['A 15–20 minute academic presentation on intersections between neuroscience and educational neurology, cognition and learning.'],
    }],
  },
  {
    title: 'Teaching experience',
    entries: [{
      title: 'Undergraduate instructor · Medical Physiology',
      subtitle: 'Faculty of Medicine and Biomedical Sciences, UACH',
      period: 'August 2023–present',
      details: [
        'Supplementary instruction in Medical Physiology for undergraduate medical students. Previously an Anatomy Instructor (2022–2023).',
        'Recognized by the Chair of the Physiology Department, Dr. Daniel H. Castillo, for academic performance and interpersonal skills.',
      ],
    }],
  },
  {
    title: 'Laboratory & research skills',
    entries: [
      { title: 'Neurochemistry & biochemistry', details: ['HPLC sample preparation and quantitative analysis; ROS quantification, TBARS and MTT assays.', 'Brain dissection, regional tissue sectioning and tissue processing for biochemical assays.'] },
      { title: 'Research & academic skills', details: ['Multi-treatment experimental design, biological data processing and statistical analysis.', 'Critical appraisal of biomedical literature, evidence-based reasoning and cross-cultural laboratory collaboration.'] },
    ],
  },
  {
    title: 'Courses, certifications & continuing education',
    entries: [
      { title: 'NeuroECHO: Updates in Neurological Endovascular Therapy', subtitle: 'INNN / Mexican Academy of Neurology · 5 hrs', period: 'March–April 2025' },
      { title: 'NeuroECHO: Headaches · Presenter', subtitle: 'INNN · 2 hrs', period: 'November 2024' },
      { title: 'NeuroECHO: Neuromuscular Diseases', subtitle: 'INNN · 4 hrs', period: 'April–May 2024' },
      { title: '2nd Mexican Congress of Neuro-Rheumatology', subtitle: 'INNN · 35 hrs', period: 'September–October 2024' },
      { title: '8th Annual Course: Selected Topics in Human Genetics — Structural Genomic Alterations in Complex Diseases', subtitle: 'UAM Xochimilco / INNN / AMGH', period: 'October 2024' },
      { title: 'ABC of Cervical Cancer Prevention and Early Detection (MICAELA Program)', subtitle: 'National Cancer Institute · 10 hrs', period: 'October 2024' },
      { title: 'Priority Program for Epilepsy — Northern Regional Meeting', subtitle: 'Chihuahua, México · Attendee', period: 'March 2025' },
      { title: 'Artificial Intelligence Applied to Medicine', subtitle: 'Universidad Privada del Norte – Lima Norte / IEEE Student Branch · International webinar', period: 'September 2024' },
      { title: 'Updates in Neurology Topics', subtitle: 'LIVEMED / Medchannel · 10 credit hrs · 6 CONAMEGE points', period: 'August 2022' },
      { title: 'Emerging Disease: Mpox (Monkeypox)', subtitle: 'AST Capacitación México · 20 pedagogical hrs · Score: 88.8/100', period: 'July 2022' },
      { title: 'Respiratory Infections: From Diagnosis to Treatment', subtitle: 'Medchannel · 2 credit hrs · 3 CONAMEGE points', period: 'August 2022' },
      { title: 'Acute Pain Management', subtitle: 'Medchannel · 10 credit hrs · 5 CONAMEGE points', period: 'October 2022' },
      { title: 'Gastrointestinal Disorders: Clinical Reasoning for Diagnosis and Therapy', subtitle: 'Medchannel · 5 CONAMEGE points', period: 'January 2023' },
      { title: 'Correct Completion of Death Certificates', subtitle: 'RELACSIS / PAHO Virtual Campus · 3 hrs', period: 'October 2024' },
      { title: 'Medical Emergencies Workshop', subtitle: 'Gescons / Colombian Medical Federation · Virtual · 3 hrs', period: 'July 2022' },
      { title: 'International EKG Update Workshop', subtitle: 'Gescons / Colombian Medical Federation · Virtual · 3 hrs', period: 'July 2022' },
      { title: 'Pharmacology in Nursing — Update Workshop', subtitle: 'CIAP / GIE · Directed at faculty and licensed nursing professionals', period: 'August 2022' },
    ],
  },
  {
    title: 'Congress & conference attendance',
    entries: [
      { title: 'Hospital Ángeles Medical Days 2024', subtitle: 'UACH / Hospital Ángeles Chihuahua · 11 curricular hrs', period: 'June 2024' },
      { title: 'Critical Care Medicine Days 2024', subtitle: 'College of Critical Medicine and Intensive Therapy, Chihuahua · 15 curricular hrs', period: 'June 2024' },
      { title: 'Critical Care Medicine Days 2023', subtitle: 'College of Critical Medicine and Intensive Therapy, Chihuahua', period: 'November 2023' },
    ],
  },
  {
    title: 'Languages',
    entries: [{ title: 'Spanish · Native' }, { title: 'English · B2' }],
  },
];
