# Phase 2 scientific review

Review date: 12 October 2026. This record documents the educational content of the Virtual Neuromuscular Diagnostic Laboratory. It is not an independent reanalysis, clinical guideline, or scientific-author approval.

## Sources inspected

All four supplied files in `esearch_sources/` were reviewed: the frozen clean v3 manuscript, final numerical audit, Spanish narrative review, and scientific guardrails. DOCX text was extracted locally from `word/document.xml` with the Python standard library. The manuscript and audit retain precedence for study results. Narrative-review §§8, 9, 11, 12, 17, Table 16, and proposed Figure 8 supplied context; their comparison language was not converted into a diagnostic classifier.

The SfN abstract named in the request is absent. The audit’s source spreadsheet is also absent. Neither was reviewed, and no independent spreadsheet recalculation or patient-level inference was performed. No new records, antibody proportions, imaging counts, or pathology counts were added. Source documents and extracted document text are not public application assets.

## Frozen results and separation of domains

Phase 2 imports the shared `frozenStudy` object from `src/data/science.ts`; scientific runtime sentences use its values instead of separate hard-coded study results. The preserved results are the cohort size and clinical phenotype, AChR-positive tested subset, formal NMJ-tested subset and exact interval, nested SFEMG evaluation, myopathic needle-EMG tested subset, and absence of documented paired NMJ testing among AChR-positive patients. The Phase 1 scientific-review table records the frozen values and denominators.

Clinical phenotype describes function and distribution. Serology detects an immune marker. RNS compares compound muscle action potentials after repeated motor nerve stimulation. SFEMG evaluates timing instability and blocking. Conventional needle EMG evaluates motor-unit morphology, recruitment, and spontaneous activity. These are complementary measurements, rather than interchangeable proof of a single mechanism.

The implementation preserves these boundaries:

- Positive AChR serology does not independently demonstrate physiological transmission failure. Pre-ICI samples, when available, inform temporal interpretation; their absence does not imply treatment-emergent antibodies.
- Negative serology and one normal RNS do not categorically exclude NMJ disease. Missing or unreported testing remains missing.
- Increased jitter is sensitive to instability but is not uniquely specific for MG. Myopathic and neurogenic processes can also affect jitter; muscle choice, recording technique, and reference limits matter.
- Myopathic needle-EMG patterns can support muscle involvement without proving inflammatory pathology or excluding NMJ disease. Myopathic-appearing units can also occur in NMJ disorders.
- MRI edema localizes tissue abnormality but is not specific for inflammation. Biopsy can characterize the pathological pattern in a sampled muscle; it does not establish pathology in every symptomatic muscle or the entire cohort.
- Fixed weakness, fatigability, and oculobulbar distribution do not determine an exclusive mechanism. Muscle injury and primary transmission dysfunction may coexist.

Each interactive region, serology panel, electrophysiology panel, finding, and interpretive lens carries the four Phase 1 evidence categories. Proposed entries explicitly describe uncertainty rather than promote a conceptual mechanism to an observed cohort finding. Cohort entries retain aggregate scope and differing tested subsets.

## Primary-source verification

Publication identities and claim-bearing passages were checked against indexed primary article/consensus text and NLM records. Several direct PMC opens returned browser checks, and some publisher opens returned HTTP errors; accessible indexed article text supported the reviewed claims. The Skolka full text and the original jitter-study PubMed record were also readable directly during the reference update. These access limitations are recorded rather than described as universally successful full-page retrievals.

| Source | Verified link | Phase 2 use |
| --- | --- | --- |
| Guidon et al., 2021; DOI 10.1136/jitc-2021-002890 | [NLM article](https://pmc.ncbi.nlm.nih.gov/articles/PMC8291304/) | Separation of serology, transmission electrophysiology, and myopathy; short-duration/low-amplitude units and early recruitment; SFEMG abnormalities may occur in myopathy. |
| Plomp et al., 2025; DOI 10.1016/j.lanepe.2024.101192 | [NLM article](https://pmc.ncbi.nlm.nih.gov/articles/PMC11782875/) | MG-like muscle distributions, selected ocular/diaphragm pathology, multi-muscle RNS sampling, and pre-ICI antibody context. External cohort results are not merged with the frozen analysis. |
| Ucem et al., 2026; DOI 10.7759/cureus.103430 | [NLM article](https://pmc.ncbi.nlm.nih.gov/articles/PMC12988698/) | Small-series clinical and muscle observations. No treatment-response claim is used as a diagnostic rule. |
| Brahmer et al., SITC 2021; DOI 10.1136/jitc-2021-002435 | [NLM article](https://pmc.ncbi.nlm.nih.gov/articles/PMC8237720/) | Clinical overlap and urgent assessment of cardiac, bulbar, or respiratory compromise, without treatment doses or a prescribing algorithm. |
| Stålberg et al., 2019; DOI 10.1016/j.clinph.2019.05.008 | [NLM record](https://pubmed.ncbi.nlm.nih.gov/31213353/); [publisher article](https://doi.org/10.1016/j.clinph.2019.05.008) | Authoritative methodology for RNS: CMAP decrement, stable electrodes, consistent stimulation, motion artifacts, temperature, and protocol context. Indexed publisher sections were accessible. |
| Stålberg, Ekstedt and Broman, 1974; DOI 10.1136/jnnp.37.5.540 | [NLM article](https://pmc.ncbi.nlm.nih.gov/articles/PMC494698/) | Original physiological study defining paired-fiber interval variability and recording blocking. No historical sensitivity estimates or jitter values are copied into the interface. |
| Skolka et al., 2022; DOI 10.1212/CPJ.0000000000001166 | [NLM article](https://pmc.ncbi.nlm.nih.gov/articles/PMC9208421/) | Original observational evidence that myopathic-appearing motor-unit morphology and early recruitment can occur in NMJ disease. No new numerical comparisons are displayed. |
| Kouyoumdjian, Ronchi and de Faria, 2020; DOI 10.1016/j.cnp.2020.07.006 | [NLM article](https://pmc.ncbi.nlm.nih.gov/articles/PMC7479254/); [NLM record](https://pubmed.ncbi.nlm.nih.gov/32939421/) | Original observations of increased jitter in denervated/reinnervated muscles, supporting the neurogenic caveat without importing jitter values or study proportions. |
| Müller-Jensen et al., 2023; DOI 10.3389/fimmu.2023.1108116 | [NLM record](https://pubmed.ncbi.nlm.nih.gov/36845122/); [NLM article](https://pmc.ncbi.nlm.nih.gov/articles/PMC9945255/) | Primary observational antibody study confirming anti-titin among reported markers in ICI-associated neuromuscular toxicity. It supports a concise serological-context statement, not a functional transmission claim; no study accuracy estimates or proportions are imported. |

Contextual interface links use the verified reference registry in `science.ts`, including the four additional specialist references for trace physiology, RNS methodology, and the limits of interpreting jitter or myopathic-appearing motor units. Publication metadata were verified in primary NLM records. The unverified ENMC workshop and unidentified Neurology multicenter reference remain excluded. There are no invented citations.

## Illustrative content and interpretive interaction

All trace views are qualitative educational schematics, never recordings from the frozen cohort. The visible label is “Illustrative educational waveform — not a patient recording.” No numerical amplitudes, jitter measurements, diagnostic thresholds, or patient results are invented. The SFEMG paired recording aligns the first potential and illustrates timing variation in the second; blocking means an expected second response is absent. The needle-EMG comparison depicts motor-unit morphology and recruitment relative to schematic force, without claiming that appearance proves inflammatory myositis.

The evidence board selects one finding and one interpretive lens. Its text explains direct measurement, possible support, limitations, and complementary evidence. It does not aggregate findings into scores, estimate probabilities, or classify a patient. The muscle-imaging/biopsy finding explicitly distinguishes signal abnormalities from sampled histopathology. No hypothetical patient scenarios were added.

Ocular content distinguishes the eyelid-elevating levator from muscles moving the globe. The respiratory region includes diaphragm, intercostal, and accessory muscles, and acknowledges cardiac and pulmonary causes of breathlessness. The anatomically schematic regions are educational, not a map of every affected muscle or a pathological distribution measured in the study.

## Clinical safety and remaining review

The laboratory states that suspected ICI-related myocarditis, rapidly progressive bulbar weakness, or respiratory compromise requires urgent clinical evaluation and management. Completing all diagnostic tests is not a prerequisite for urgent care. It provides no individual therapeutic recommendations, doses, or automated decisions.

Scientific limitations remain sparse and nonuniform formal NMJ testing, distinct tested subsets, variable assays and test timing, potential prior-treatment effects, incomplete baseline serology, limited pathology, and publication/reporting bias. The educational waveforms do not model the full diversity of clinical recordings. Source checks do not substitute for the clinician/scientific-author review requested by the supplied guardrails before public launch. Browser, accessibility, TypeScript, build, lint, and interaction validation are reported separately by the integration task; this document does not assert unperformed test results.

## Final integrated scientific check

The integrated laboratory views, shared NMJ and regional anatomy source, waveform explanations, evidence rendering, README, and Phase 2 delivery record were reviewed. The shared frozen object matches every required aggregate and denominator. All 23 regions, panels, findings, and interpretive lenses retain exactly the four evidence categories; their reference IDs resolve. No material scientific discrepancy was identified. The MuSK cohort row makes no new aggregate claim and retains missing-data boundaries. The board remains a manually selected educational interpretation, and the urgent-care statement does not require completing tests before necessary care. The publication-boundary check passed for the current four build files, with no raw research documents, internal source paths, or known patient-record markers detected; this is a scoped check, not a general privacy certification.

Two primary anatomical studies support the simplified placement of receptor symbols near fold crests/openings: [Flucher and Daniels, 1989, PMID 2560390](https://pubmed.ncbi.nlm.nih.gov/2560390/), DOI 10.1016/0896-6273(89)90029-9, examined receptor and sodium-channel localization in rat endplates; [York and Zheng, 2017, PMID 28798955](https://pubmed.ncbi.nlm.nih.gov/28798955/), DOI 10.1523/ENEURO.0232-17.2017, examined nanoscale receptor organization in mouse NMJs. Their NLM records and supporting abstracts were checked. They inform normal anatomical schematics, not human ICI pathology, cohort mechanism assignments, or an assertion of precise nanoscale fidelity. The original drawings remain simplified and not to scale.
