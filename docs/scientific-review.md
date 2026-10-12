# Phase 1 scientific source review

Review date: 11 October 2026. This is an original implementation record, not a clinical guideline or independent reanalysis. It contains aggregate findings and publication links only; no patient records or source-document reproductions are included.

## Source availability and precedence

The supplied documents are in `esearch_sources/`, rather than the `research_sources/` directory named in the request. All four available documents were inspected before the scientific content was written. DOCX content was read from text extracted from the native document XML.

| Supplied document | Availability | Role in this implementation |
| --- | --- | --- |
| `Triple_M_Manuscript_N38_Clean_References_v3.docx` | Present and readable | Frozen methods, aggregate results, interpretation, and bibliography |
| `Auditoria_Final_PreManuscrito_N38.md` | Present and readable | Corroborating numerical audit and earlier bibliographic cautions |
| `Revision_Sindromes_Superposicion_ICI_Espanol (2).docx` | Present and readable | Secondary conceptual context, especially §§3, 4, 9, 10, 11, 12, Table 16, and proposed Figure 8 |
| `Triple_M_Codex_Contexto_Fisiopatologico_Guardrails.md` | Present and readable | Constraints on mechanism attribution, missingness, and clinical content |
| `SfN_2026_Late_Breaking_Abstract_Triple_M_V3.docx` | Absent | Not reviewed; no abstract-specific claims are made |

The source spreadsheet mentioned by the audit was not supplied. The frozen results are preserved from the manuscript and audit; no independent spreadsheet recalculation was performed during Phase 1. The narrative review supplies explanatory context and is not an independent validation of the N=38 mechanism.

## Frozen results retained

| Finding | Frozen result | Interpretation retained |
| --- | --- | --- |
| Cohort | 38 patients; 27 publications | Literature-derived individual patient-level pooled analysis |
| MG-like phenotype | 38/38 | Clinical inclusion phenotype, not physiological confirmation |
| AChR-positive | 11/30; 36.7% | Denominator is the tested subset |
| Formal NMJ testing | 4/38 | RNS and/or SFEMG documented |
| Objective NMJ abnormality | 0/4; exact 95% CI 0–60.2% | Wide uncertainty; NMJ disease is not excluded |
| SFEMG | 1 patient | Included within the four formal NMJ-tested patients |
| Myopathic needle EMG | 6/11; 54.5% | Muscle physiology, not independent proof of inflammatory pathology |
| Documented mortality | 16/38; 42.1% | Full cohort denominator; follow-up varies across publications |
| Paired antibody–NMJ evidence | No RNS/SFEMG documented among 11 AChR-positive patients | Missing paired physiology, not negative physiology |

Tested subsets differ and are not depicted as directly comparable rates. Untested, indeterminate, and unreported observations are not recoded as negative. No patient-level cross-tabulation is inferred from aggregate cardiac results.

## Publication checks

Metadata and the specific supporting observations were checked against publisher or NLM-hosted primary article content. Some direct PMC/BMJ/MDPI opens were blocked by browser challenges or HTTP errors; indexed primary article text and publication records were accessible. Verification describes publication identity and support for the displayed claim, not endorsement of every conclusion in an article.

| Reference | Verified link and DOI | Appropriate use |
| --- | --- | --- |
| Guidon et al., 2021 | [NLM full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC8291304/); 10.1136/jitc-2021-002890 | Consensus distinguishes serology, NMJ electrophysiology, and muscle findings. cTnI is more specific for cardiac injury than cTnT in this context. |
| Plomp et al., 2025 | [NLM full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC11782875/); 10.1016/j.lanepe.2024.101192 | One of 41 RNS-tested patients had decrement and pre-existing MG. Selected specimens support direct muscle injury; absence of fatigability in others does not prove exclusively myopathic disease. |
| Ucem et al., 2026 | [NLM full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC12988698/); 10.7759/cureus.103430 | Small series supporting muscle involvement in myasthenia-like presentations. CD8-positive pathology is a published specimen finding, not universal N=38 pathology. |
| Wei et al., 2026 | [Publisher full text](https://www.frontiersin.org/journals/immunology/articles/10.3389/fimmu.2026.1854723/full); 10.3389/fimmu.2026.1854723 | Broader pooled clinical context; its 136-patient population is distinct from the frozen N=38 analysis. |
| Brahmer et al., SITC 2021 | [NLM full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC8237720/); 10.1136/jitc-2021-002435 | Clinical safety context, electrical complications, and limits of preserved LVEF. No treatment algorithm or doses are reproduced. |
| Giovannini et al., 2023 | [Publisher article](https://www.mdpi.com/1422-0067/24/13/10919); 10.3390/ijms241310919 | Primary autopsy observations of myocardial and skeletal-muscle inflammation; individual pathology does not establish a universal mechanism. |

The clean manuscript supplies the four priority references. SITC is recommended by the guardrails; Giovannini appears in the manuscript and narrative review. Public reference entries use verified publication titles, which may be longer than abbreviated source-list titles.

## Source discrepancies and excluded claims

The audit describes an earlier manuscript without numbered references. The supplied clean v3 document contains a numbered reference section with 31 entries, including Guidon and Ucem. The audit’s missing-bibliography finding therefore does not describe this clean version. Its previously unresolved Ucem DOI is now present in v3 and independently verified above. The clean discussion uses published clinical and consensus observations without depending on the unverified ENMC workshop.

The “2026 ENMC workshop on ICI-induced myotoxicity” and unidentified “2026 Neurology multicenter study” remain unresolved audit items and are excluded. No source is invented to fill either gap. The review’s stronger Table 16/Figure 8 language is not converted into a diagnostic classifier: normal RNS, AChR status, or lack of fatigability cannot assign an exclusive mechanism. The proposed figures are storyboards, not supplied image assets.

Shared autoantigens remain proposed. Arthritis-specific Treg/IL6R/CD137 findings are not depicted as established Triple M biology or as a basis for treatment selection. Pharmacovigilance report proportions are not presented as incidence. No comparative treatment efficacy, individual diagnostic probability, or prescribing advice is introduced.

## Review before public launch

Each tissue panel separates established physiology, literature observations, proposed mechanisms, and present-study aggregates. Mechanism comparison permits potential overlap. Test descriptions explain what is measured; they are not a sequence that must precede urgent specialist assessment.

The supplied guardrails request clinician/scientific-author approval of anatomy, attribution, missing-data handling, and clinical content before public launch. This implementation record documents the source checks; it does not claim that author approval has occurred. All source documents and raw records must remain outside tracked public assets and deployment artifacts.

The completed interface source was reviewed across the homepage, study overview, aggregate statistics, tissue panels, comparison states, evidence labels, references, and original SVGs. No material scientific discrepancies were identified. Normal NMJ architecture and possible impairment are explicitly separated; the muscle comparison describes reduced force despite intact transmission as a possibility, while retaining potential coexistence. This source review does not substitute for browser validation or the scientific-author approval described above.
