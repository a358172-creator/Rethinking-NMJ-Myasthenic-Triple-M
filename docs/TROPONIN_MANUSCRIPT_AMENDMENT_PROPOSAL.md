# Troponin manuscript amendment proposal

Version: 1.0 — Phase 3A.2, 13 October 2026.

Proposal status: **PENDING AUTHOR APPROVAL**.

Implementation status: **PROPOSAL ONLY; ORIGINAL WORKBOOK AND MANUSCRIPT UNCHANGED**.

Full-study validation: **FAIL**; the four frozen troponin checks remain unresolved.

This document proposes a correction to the troponin component of the frozen N=38 manuscript. The recommended immediate amendment withdraws the unsupported pooled peak distribution and its dependent comparisons. It supplies complete English replacement text that can be reviewed without inventing a corrected numerical cohort. A later quantitative replacement requires a signed protocol, resolved source evidence and a reproducible analysis; the earlier diagnostic n=25 calculation is not that replacement.

This tracked proposal contains aggregate findings and methodological text only. Patient identifiers, measurement rows, source-to-patient links, source excerpts and individual decision narratives remain in the ignored [local troponin adjudication directory](../esearch_sources/_processed/troponin_adjudication/). Those private files are review evidence, not attachments authorized for public disclosure.

## 1. Evidence status and review locations

The existing [validation report](../DATA_VALIDATION_REPORT.md), [data dictionary](../DATA_DICTIONARY.md), [restricted review instructions](atlas-data-review.md) and [independent source review](phase3-source-review.md) were inspected alongside the frozen workbook, manuscript and private adjudication records. The master worksheet remains the cohort source; its secondary audit sheet is not an additional cohort.

The private review location contains `TROPONIN_ADJUDICATION_REPORT.md`, `TROPONIN_AUTHOR_DECISIONS.md`, `TROPONIN_ADJUDICATION_TABLE.private.csv`, `TROPONIN_MEASUREMENT_LEDGER.private.csv`, the CSV/JSON author-decision companions, and `methodology_review.private.json`. Review the exact source locations and individual questions there. Do not copy these files into tracked documentation, browser assets or manuscript supplements without a separate disclosure review.

| Status | Finding or action | Meaning |
| --- | --- | --- |
| VERIFIED DOCUMENTARY FACT | The private adjudication table has 38 case entries; the measurement ledger has 69 measurement entries; the decision register has 40 decisions, comprising two global decisions and 38 case decisions. | These are artifact counts, not counts of eligible peaks or independent observations. |
| VERIFIED DOCUMENTARY FACT | The frozen workbook has 33 troponin entries containing numeric text, four qualitative entries and one not-reported entry. | Numeric text does not establish an exact peak; workbook reporting categories are not independently verified primary-source elevation categories. |
| VERIFIED DOCUMENTARY FACT | The source review documents distinct cTnI, cTnT and unidentified-analyte observations, different timepoints, explicitly stated peaks, a highest value in a documented series, intervals, inequalities, approximate values and qualitative reports. | Preserve these distinct roles. A published concentration or peak label may still have an unresolved unit, assay or internal source conflict. |
| VERIFIED DOCUMENTARY FACT | All 69 existing ledger entries have an empty assay-platform field. Some reference-limit entries are absent, incomplete or ambiguously linked. | No complete platform-specific quantitative stratum is established by this ledger. A blank platform must remain unknown. |
| VERIFIED COMPUTATION, LIMITED SCOPE | The unchanged parser accepts 25 numeric entries and fails all four frozen troponin comparisons. | Parser acceptance is not verification of 25 peaks. Its diagnostic median/IQR/range must not become amended manuscript results. |
| RECOMMENDED AUTHOR DECISION | Withdraw the pooled peak-troponin summary and both dependent troponin subgroup tests now; retain source evidence privately and describe the reporting limitations. | Proposed replacement wording is below. Nothing is applied automatically. |
| RECOMMENDED AUTHOR DECISION | If quantitative troponin reporting is retained later, approve an analyte-, platform- and timepoint-specific protocol before recomputation. | Matching mass units alone does not establish assay comparability. |
| UNRESOLVED | The original selected 33-case vector, its extraction code and the exact assay/timepoint choices were not supplied. Unit/value conflicts, peak roles, incomplete originals and a source-case provenance question remain open. | The frozen distribution and dependent group denominators are unsupported. Recovering an original vector does not by itself establish that its choices were defensible. |
| PENDING AUTHOR APPROVAL | No author decision or manuscript amendment is signed/applied in the reviewed register. | Documentary verification and unsigned proposed eligibility do not confer analysis or publication approval. |

The frozen figures remain audit targets: n=33, median 1,506 ng/L, IQR 1,028–3,891 ng/L and range 498–162,000 ng/L. They must not guide case selection, unit changes or figure estimation. The audit's literal unit-conversion discrepancy is evidence of a conflict, not a reason to edit a printed unit. No new pooled peak denominator or distribution is asserted here.

## 2. Recommended protocol for author decision

The following rules define the proposed scientific correction. They are not changes to the frozen workbook or existing full-study parser.

| Element | Proposed rule | Required author review |
| --- | --- | --- |
| Source transcription | Preserve every originally reported value, comparator, unit, analyte wording, sampling context and source location. Retain both conflicting statements when a source disagrees internally. | Confirm original-source access and adjudication; indexed metadata or secondary summaries are retrieval leads, not primary measurement verification. |
| Analyte and assay | Keep cTnI, cTnT and unidentified analyte separate; record high-sensitivity designation only when stated. Retain platform/method/version as known or unknown. | Do not infer an analyte or platform from a threshold, numerical magnitude, publication year or the word “high-sensitivity.” |
| Presentation observation | Retain a result explicitly associated with presentation/admission in that temporal category. | Specify any later analytical window and handling of treatment before sampling; do not assume separate analytes were sampled simultaneously. |
| Highest reported serial value | Select only from an explicitly documented same-analyte, same-assay series, with the reported observation window and number of samples retained. | Label it “highest reported value in the documented series”; incomplete follow-up does not establish a course-wide peak. An isolated observation is not a serial maximum. |
| Source-stated peak | Preserve an explicitly stated peak as a source claim, with its analyte, unit, timing and any conflict flag. | Its documentary peak label does not resolve a contradictory value, missing unit, unknown platform or incomplete reference limit. |
| Interval, censoring and approximation | Retain ranges, inequality direction and bounds, and approximation indicators. | No midpoint, interval endpoint, censoring bound or approximate value enters an exact-point peak median. No removal of a comparator. |
| Units | Keep the original unit and a separately labeled dimensional equivalent only for unambiguous, source-supported units: ng/mL ×1,000 = ng/L; pg/mL ×1 = ng/L. | Withhold conversion for a missing, disputed or unresolved unit. Preserve the printed value/unit privately while a suspected publication error is investigated. No magnitude-based correction or decimal reinterpretation. |
| Figures | Accept exact numerical labels or underlying numerical data only when analyte, unit, timing and source attribution are clear. | No exact concentration from an unlabeled curve or visual graph estimate. If those facts are absent, request the original numeric data or leave the peak unresolved. |
| Multiple analytes and observations | Retain all analytes/timepoints; do not choose the larger I/T number, sum or average I/T, substitute one assay for another, or join different assays into a trajectory. | Count unique patients within each defined stratum, separately from measurement counts. One patient may contribute to both analyte descriptions; stratum denominators must not be summed as unique cohort patients. |
| Absolute-concentration summaries | Summarize only an adequately documented, compatible analyte/platform/temporal-role stratum; show unique-patient n, observation-window definition and missingness. | Approve comparability and the minimum useful descriptive sample before inspecting resulting summaries. Unknown platform is a missingness category, not evidence of a common assay. If the data are too sparse, omit the median/IQR. |
| Reference-limit multiples | Derive xULN only when the measurement and its applicable source-specific upper reference limit have explicit values, units, analyte/assay linkage and valid applicability to that sample. Preserve the type of reference limit as stated. | Resolve platform and reference-limit ambiguity first. Do not borrow a manufacturer's current threshold, another paper's threshold, another analyte's limit or a prognostic cutoff. Do not relabel an unspecified normal-range endpoint as a 99th-percentile URL. A source-printed multiple can be retained as a reported claim without certifying a newly calculated multiple. |
| Normalization limits | Keep analyte/platform/timepoint labels and any inequality in eligible reference-limit multiples. | xULN does not automatically harmonize assays or justify a pooled prognostic analysis. No eligible xULN cohort or new normalized result is established here. |
| Reporting availability and elevation | Re-adjudicate source-reported numeric, qualitative, normal, unreported and source-unavailable categories; report evaluated denominators and unknowns explicitly. | Absence of accessible original detail is not “not reported” in the complete article and is never a normal/negative result. Troponin elevation is source evidence, not independent proof of myocardial injury or ICI myocarditis. |
| Inferential analysis | Withdraw the current cross-assay troponin subgroup tests. Consider a new comparison only after a signed protocol establishes compatible groups and adequate data. | Preserve separate missingness and group eligibility decisions. No new p-value from the diagnostic n=25 subset or from selecting entries to fit frozen targets. |

Assay differences provide an analytical reason for these restrictions: IFCC guidance describes differences in antibody recognition, calibration and reference limits, and emphasizes clinical context in interpretation. The cTnI assay comparison by Tate and colleagues assessed measurement equivalence through recalibration rather than dimensional unit conversion. Applying those findings to the present heterogeneous ledger is a methodological inference, not a newly validated result of the N=38 cohort. [IFCC Cardiac Q&A Series IV](https://ifccfiles.com/2026/01/Faq_4_171225_FINAL-VERSION.pdf), [Tate et al., IFCC pilot study](https://pubmed.ncbi.nlm.nih.gov/25999287/).

An analyte/timepoint-aware approach is also consistent with the original ICI-myocarditis biomarker study by Lehmann and colleagues, which considered cTnI and cTnT separately against reference limits and explicit time windows. Its cohort, diagnostic performance and prognostic thresholds must not be transferred into this study. [Lehmann et al., Cardiomuscular Biomarkers](https://pmc.ncbi.nlm.nih.gov/articles/PMC10527069/).

## 3. Exact proposed English manuscript replacements

These blocks constitute the recommended **withdrawal amendment**, ready for author review. They contain no uncomputed numerical replacements. They become manuscript text only after explicit approval and confirmation that the revised manuscript, tables and analyses follow the same withdrawal decision. Any later quantified alternative requires a new version of this proposal with actual verified stratum results.

### Methods 2.4 — replace the biochemical paragraph

Replace the paragraph beginning “Serum cardiac and skeletal-muscle biomarkers were extracted…” with:

> Serum cardiac and skeletal-muscle biomarkers were reviewed in the reported clinical course. Troponin was reviewed at the measurement level wherever original source information was accessible. Original concentrations, units, inequality signs, reference-limit statements, analyte designations, assay information and sampling contexts were retained without imputing missing information. Cardiac troponin I, cardiac troponin T and troponin of unidentified subtype were treated as separate categories. High-sensitivity designation did not establish a specific assay platform.
>
> Presentation observations, subsequent observations, the highest value in an explicitly documented same-assay series and explicitly source-stated peaks were distinguished. An isolated concentration was not classified as a peak; the highest value in an incomplete reported series was not assumed to be the maximum during the entire clinical course. Source ranges, censored results and approximate concentrations were retained in their reported form and did not contribute exact point values. Exact values were not estimated from unlabeled figures. Conflicting source statements were retained as unresolved rather than resolved by selecting the larger value.
>
> Dimensional conversion was used only when the original unit was explicit and unambiguous, with the original value and unit retained alongside the equivalent concentration. Conversion was withheld when the unit was missing, disputed or unresolved. Unit conversion was not treated as assay harmonization. Measurements from different analytes, platforms or sampling contexts were not combined into a standardized pooled peak-troponin distribution. Multiples of a source-specific upper reference limit required an explicitly documented and applicable measurement–reference-limit pairing; absent assay information or an uncertain limit precluded a derived multiple. No reference limit or prognostic threshold was borrowed from another source.
>
> Source-reported troponin elevation was retained descriptively and was not used as independent confirmation of myocardial injury or immune checkpoint inhibitor–associated myocarditis. Missing or inaccessible source information was not interpreted as a normal result. Peak total CK was recorded in U/L. When a source reported a biomarker only as elevated without an exact numerical value, the result was retained qualitatively and was not converted into an artificial numeric measurement.

### Methods 2.9 — replace the continuous-summary and exploratory-comparison paragraphs

Replace the paragraph beginning “Categorical variables were summarized…” with:

> Categorical variables were summarized as absolute counts and percentages, preserving variable-specific evaluated denominators. Continuous variables other than troponin were summarized primarily as median and interquartile range (IQR), with minimum–maximum ranges reported when available. Mean and standard deviation were retained as secondary descriptive measures where informative. A comparable pooled peak-troponin endpoint was not established by source adjudication; therefore pooled troponin concentration summaries, including mean and standard deviation, were omitted. Measurement-level troponin observations were preserved in the restricted source-review record, with analyte, temporal role and unresolved information kept separate.

Replace the paragraph beginning “Exploratory subgroup comparisons were performed…” with:

> The retained exploratory continuous-variable comparison evaluated age according to documented vital status using the two-sided Mann–Whitney U test. Troponin comparisons according to AChR serostatus and vital status were omitted because the required comparable patient-level peak endpoint was not established. Exploratory analyses were considered hypothesis-generating and were not intended to establish causal or prognostic relationships. No multivariable regression or survival modeling was performed because of the limited sample size, substantial missingness and risk of model overfitting.

Retain the existing primary/secondary neuromuscular endpoints, exact binomial interval paragraph and strictly numeric age eligibility paragraph. The proposed replacements do not certify the historical software-version or whole-workflow validation statements; the author must verify those statements against the actual retained analysis records before submission.

### Results 3.3 — replace only the troponin sentences

Replace the text from “Quantitative peak troponin was available in 33 patients…” through “…one patient lacked a reported troponin result” with:

> Troponin reports were heterogeneous in analyte, assay documentation, units and sampling context. Source adjudication distinguished presentation and subsequent observations, highest reported serial values, explicitly stated peaks, intervals, censored results and qualitative reports. A comparable pooled peak-troponin distribution was not established; therefore no pooled quantitative denominator, median, IQR or range is reported. The source-reported elevation and qualitative-only reporting counts also remained incompletely verified and are not presented as validated cohort proportions. Unavailable source information was not interpreted as a normal troponin result.

Retain the subsequent CK and skeletal-muscle biopsy sentences, and the separate cardiac electrical/LVEF paragraphs, without using them to resolve the troponin measurement discrepancies.

### Results 3.7 — replace the exploratory-analysis paragraph

> Troponin comparisons by AChR serostatus and documented vital status were omitted because source adjudication did not establish a comparable patient-level peak-troponin endpoint. These data therefore do not support a conclusion of similar or different troponin concentrations between those subgroups. Among patients with strictly numeric ages, deceased patients were older than survivors (median 77.0 vs 68.0 years; U=156.5, p=0.0069). This retained exploratory comparison was post hoc and hypothesis-generating and should not be interpreted as a causal or independent prognostic association.

The age sentence retains the frozen wording/numbers; this proposal does not re-analyze or withdraw the age comparison.

### Table 2 — replace both troponin rows and the associated elevation note

Use the following exact replacement rows in the existing four-column table:

| Domain / variable | Overall result | Reported / evaluable | Note |
| --- | --- | --- | --- |
| Troponin concentrations | Not pooled | Comparable quantitative denominator not established | Analyte, assay documentation and temporal roles differed; exact-point peak eligibility was unresolved. |
| Source-reported troponin elevation | Not summarized as a validated cohort proportion | Source-reporting denominator unresolved | Numeric and qualitative source evidence require separate adjudication; missing or inaccessible information is not a normal result. |

Add this exact table footnote:

> Troponin observations were not combined into a standardized peak distribution. Original values, units, analytes, temporal roles and uncertainty categories were preserved in the restricted source-review record. The formerly reported quantitative and qualitative-only denominators and overall elevation proportion are not retained as validated results.

Remove the old n=33 median/IQR/range row, the “4/38 (10.5%)” qualitative-only cell and the “Overall documented elevation 37/38 (97.4%)” note. No replacement count of eligible peaks or source-verified elevation is available. Retain other Table 2 rows under their existing review scope.

### Supplementary Table S2 — replace both troponin rows and its footnote

Retain the existing age-by-vital-status row verbatim. Replace only the two troponin rows with:

| Comparison | Group 1 | Group 2 | Statistic |
| --- | --- | --- | --- |
| Troponin by AChR status | Not estimated | Not estimated | Not tested: comparable peak endpoint not established. |
| Troponin by vital status | Not estimated | Not estimated | Not tested: comparable peak endpoint not established. |

Replace the existing S2 footnote with:

> The retained age comparison was post hoc and hypothesis-generating and was restricted to strictly numeric age values; qualitative age descriptions and missing values were not imputed. Troponin subgroup estimates and tests were omitted because source adjudication did not establish a comparable patient-level peak endpoint. Omission of those tests does not establish subgroup equivalence or absence of a prognostic association. No causal or independent association is inferred.

Any future quantitative troponin supplement must report analyte/platform/timepoint definitions, unique-patient denominators, source-access and missingness categories, and eligibility for reference-limit normalization. No patient-level supplement or downloadable ledger is authorized by this proposal.

### Discussion — insert the biochemical qualification in Section 4.4

Insert after the paragraph concerning electrical disease and categorical LVEF:

> Cardiac biomarker interpretation requires a separate qualification. The available troponin reports do not establish a standardized biochemical measure of cardiac involvement across this cohort. Cardiac troponin I and T, unknown assay platforms, different sampling contexts and incompletely resolved units cannot be treated as one interchangeable peak-concentration variable. The source review therefore does not support the previously pooled troponin distribution or its subgroup comparisons. Source-reported troponin elevation is evidence reported by the original authors and requires interpretation alongside the clinical, electrical, imaging and pathological assessment; it is not independent proof of myocardial injury or immune checkpoint inhibitor–associated myocarditis. This biochemical uncertainty should remain explicit when interpreting the separately reported cardiac and neuromuscular findings.

Attach the IFCC and Tate references to the assay-comparability sentence when the author updates the bibliography. The IFCC guidance also supports the need for overall clinical assessment. No source-specific diagnostic or prognostic threshold is transferred from these references. [IFCC Cardiac Q&A Series IV](https://ifccfiles.com/2026/01/Faq_4_171225_FINAL-VERSION.pdf), [Tate et al.](https://pubmed.ncbi.nlm.nih.gov/25999287/).

### Limitations — insert a dedicated paragraph in Section 4.8

Insert after the general source-report heterogeneity paragraph:

> The troponin analysis is additionally limited by incomplete access to original clinical information, absent assay-platform documentation, incomplete or ambiguously linked reference limits, conflicting source values or units, and nonuniform sampling times. Initial observations, subsequent observations and the highest value in an incomplete published series do not establish a maximum over the complete clinical course. Ranges, censored observations and unlabeled graphical trajectories cannot supply exact peak concentrations. The original selection record underlying the former pooled troponin summary was not available for reproducible verification. Consequently, that pooled summary and its dependent subgroup estimates and tests were omitted. Reporting gaps also prevent certification of the formerly stated numeric, qualitative-only and overall elevation proportions. These limitations preclude a standardized biochemical severity or prognostic interpretation of this troponin component; they do not justify interpreting missing information as absence of cardiac involvement.

Retain the existing sparse-NMJ-testing, unpaired-serology, outcome-follow-up and other limitations. Independent support for a neuromuscular subset must not be described as validation of the entire manuscript or its biochemical analysis.

## 4. Statistical dependency register

All entries below depend on the unsupported patient-level troponin vector. The recommended action is withdrawal under the text above. Recalculation is an alternative only after author-approved source adjudication and a new compatible protocol; no recalculation is performed here.

| Dependent result in frozen material | Required withdrawal/recomputation scope |
| --- | --- |
| Overall peak troponin n=33; median 1,506; IQR 1,028–3,891; range 498–162,000 ng/L | Remove the quantitative denominator and every descriptive statistic from Results 3.3/Table 2 and any duplicated abstract, figure, caption, summary or derivative display. Resolve any secondary troponin mean/SD before retaining it. |
| AChR-positive versus AChR-negative: U=103.0, p=0.3796 | Withdraw the test and the nonsignificance claim, plus AChR-positive n=10, median 1,506.5, IQR 1,117.0–4,512.4 and AChR-negative n=17, median 1,430.0, IQR 870.0–2,484.0 ng/L. Revised group sizes cannot be carried over. |
| Deceased versus surviving: U=153.0, p=0.5523 | Withdraw the test and the nonsignificance claim, plus deceased n=16, median 1,531.5, IQR 1,037.8–5,134.2 and survivor n=17, median 1,430.0, IQR 1,000.0–3,875.0 ng/L. Preserve unknown vital status when establishing any future eligible denominator. |
| Four qualitative-only entries and asserted overall elevation 37/38 | Re-adjudicate source-reporting categories and their denominators. Numeric observations can be omitted by workbook qualitative wording, and inaccessible originals cannot certify the complete-source category. Do not insert the parser's qualitative count as a verified primary-source result. |
| Any subsequent normalized, sensitivity, exclusion-of-outlier or prognostic troponin analysis | Requires a newly approved eligibility/normalization protocol and reproducible source-linked calculation. Removing an inconvenient value or selecting an assay to match a target is not a sensitivity analysis. |

The age-by-vital-status test (U=156.5, p=0.0069), its age subgroup counts and summaries, and the categorical neuromuscular endpoints have a separate validation scope. They are not withdrawn by the troponin dependency correction. Numerical agreement with workbook targets does not establish source integrity; unresolved source mapping and field provenance must be reviewed separately before those endpoints are described as scientifically validated. This draft does not authorize changes to their frozen values or case membership.

## 5. Unresolved evidence and approval checklist

Detailed case-specific decisions remain in the private register. The author must resolve missing/disputed units, source-internal conflicts, distinct analytes sampled at different times, isolated observations mislabeled as peaks, incomplete reference-limit information, unavailable original articles/abstracts and missing numerical figure data. Source-case mapping, linkage to another existing cohort entry, original-versus-reviewed-case identity and core-field source consistency remain unresolved in the separate provenance review; numerical target agreement cannot resolve them. No change to cohort membership or categorical source values is proposed or authorized here.

### Scientific approval

- [ ] Sign the global biochemical endpoint decision: approve the withdrawal amendment, or supply a revised analyte/platform/timepoint protocol for a later numerical amendment.
- [ ] Supply and audit the original 33-case selection vector/code if available; document why its choices were valid or explicitly authorize withdrawal/rebuilding of the affected analysis.
- [ ] Review all 38 individual decisions in the private register, including documentary facts that still require global analysis approval. Preserve the original source strings and record author, date, rationale and supporting evidence for each resolution.
- [ ] Confirm that units, comparators and observation/series-maximum/peak roles remain distinct; approve no inferred unit correction, unlabeled-figure value or cross-analyte selection.
- [ ] Resolve assay/platform and reference-limit eligibility before approving any newly calculated xULN result. Retain unknowns where evidence is insufficient.
- [ ] Recheck source-reported elevation/qualitative-only availability counts using originals and explicit evaluated denominators.
- [ ] Resolve the private source-provenance question; preserve existing case membership until evidence and explicit authorization support a change.
- [ ] Approve the exact Methods, Results, Table 2, S2, Discussion and Limitations wording together, including withdrawal of all old troponin subgroup n/median/IQR/U/p cells and related narrative conclusions.
- [ ] Check for repeated troponin claims elsewhere in the manuscript and supplements. If a quantitative alternative is requested, review its actual new tables and reproducible calculations before approving replacement text.

### Implementation and disclosure approval

- [ ] Create any approved scientific amendment as a versioned derivative with a recorded rationale and source fingerprint; preserve the frozen original workbook and manuscript.
- [ ] Preserve the unchanged expected targets and FAIL findings in the historical/full-study validation. A signed withdrawal may require an explicitly documented new manuscript validation specification; it must not silently turn old failed checks into PASS or warnings.
- [ ] Verify the approved derivative independently and disclose the difference between full-study and any separately scoped neuromuscular validation.
- [ ] Review the proposed manuscript/supplement disclosure independently of private adjudication. Publicly tracked text must remain aggregate-safe; no raw patient identifiers, case crosswalk, clinical notes or private measurement rows.
- [ ] Keep patient-dependent browser components gated until separately authorized. This manuscript proposal does not approve a private preview, patient-level export, public publication, commit, push or deployment.

Author decision: **PENDING**.

Author name/signature: ____________________

Decision date: ____________________

Approved proposal version and exact scope: ____________________

Scientific implementation authorized: ____________________

Disclosure/publication authorization, if separately granted: ____________________

## 6. Preparation checks and boundaries

The proposal was checked against the frozen DOCX section/table wording, the 38-entry adjudication table, 69-entry measurement ledger and 40-entry unsigned decision register. It does not claim that all measurement entries are peaks or that all unresolved source information is retrieved. No new quantitative troponin analysis or p-value was calculated, and no source, workbook, manuscript or processing rule was corrected by this document.

Approval of this proposal is a scientific decision about its exact text and analytical scope. It does not open a publication gate, certify the whole study or authorize public patient-level records. The current full-study troponin failure remains visible while the independent core neuromuscular validation proceeds under its own specification.
