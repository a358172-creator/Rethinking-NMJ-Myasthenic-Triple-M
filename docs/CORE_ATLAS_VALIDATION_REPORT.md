# Independent core atlas validation report

Executed at: 2026-10-14T00:05:58+00:00.

Specification: `CORE_NEUROMUSCULAR_ATLAS_VALIDATION.md`, version 1.0.0.

This is an independent scoped workflow. Numerical agreement does not resolve source provenance, validate the full manuscript, or authorize disclosure.

| Status | Result |
| --- | --- |
| FULL_STUDY_VALIDATION | FAIL |
| CORE_ATLAS_NUMERICAL_VALIDATION | PASS |
| CORE_ATLAS_VALIDATION | FAIL |
| CORE_ATLAS_PUBLICATION_APPROVAL | PENDING |
| CORE_ATLAS_PRIVATE_PREVIEW_APPROVAL | PENDING |
| CORE_ATLAS_EXPORT_POLICY | NOT_ACTIVATED |

Scoped prerequisite checks: 44/46 passed.

Full-study audit verified against this source: true; required checks passed/total: [44, 48].

| Scoped check | Domain | Expected | Observed | Result |
| --- | --- | --- | --- | --- |
| Authoritative master sheet available | integrity | true | true | PASS |
| Every scoped header maps exactly once | integrity | 0 | 0 | PASS |
| All physical master data rows | integrity | 38 | 38 | PASS |
| Scoped input formula cells | integrity | 0 | 0 | PASS |
| Scoped input spreadsheet error cells | integrity | 0 | 0 | PASS |
| Scoped normalization errors without inference | integrity | 0 | 0 | PASS |
| No source rows dropped during scoped mapping | integrity | 38 | 38 | PASS |
| Actual normalized patient records | numerical | 38 | 38 | PASS |
| Unique private patient identifiers | integrity | 38 | 38 | PASS |
| Unique canonical source publications | numerical | 27 | 27 | PASS |
| Private source rows map one-to-one | integrity | true | true | PASS |
| Private source identity fields present and typed | integrity | true | true | PASS |
| Every internal core category has an allowed value | integrity | true | true | PASS |
| AChR tested / positive / negative / not documented | numerical | [30, 11, 19, 8] | [30, 11, 19, 8] | PASS |
| AChR availability agrees with documented result | numerical | 0 | 0 | PASS |
| Unique RNS and/or SFEMG patients | numerical | 4 | 4 | PASS |
| RNS evaluated patients | numerical | 4 | 4 | PASS |
| SFEMG evaluated patients | numerical | 1 | 1 | PASS |
| SFEMG is nested in the RNS cohort | numerical | true | true | PASS |
| Formal availability matches each row's RNS/SFEMG union | numerical | true | true | PASS |
| Formal patient identity set equals testing union | numerical | true | true | PASS |
| Performed formal studies have explicit negative results | numerical | true | true | PASS |
| Abnormal formal NMJ patients / evaluated patients | numerical | [0, 4] | [0, 4] | PASS |
| Unperformed formal studies never gain a result | numerical | 0 | 0 | PASS |
| Objective NMJ evidence categories | numerical | {"formal_negative": 4, "indeterminate_qualitative": 2, "not_documented": 32} | {"formal_negative": 4, "indeterminate_qualitative": 2, "not_documented": 32} | PASS |
| Formal-negative evidence requires explicit formal negativity | numerical | true | true | PASS |
| Qualitative indeterminate evidence has no formal confirmation | numerical | 0 | 0 | PASS |
| AChR-positive and formally evaluated overlap | numerical | 0 | 0 | PASS |
| Needle EMG evaluated / not documented | numerical | [11, 27] | [11, 27] | PASS |
| Needle EMG categories among evaluated | numerical | {"myopathic": 6, "neuropathic": 1, "normal": 1, "indeterminate": 3} | {"myopathic": 6, "neuropathic": 1, "normal": 1, "indeterminate": 3} | PASS |
| Needle availability agrees with an interpretation | numerical | 0 | 0 | PASS |
| Documented vital status categories | numerical | {"death": 16, "survival": 21, "unknown": 1} | {"death": 16, "survival": 21, "unknown": 1} | PASS |
| Unknown vital status remains outside known denominator | numerical | 37 | 37 | PASS |
| Frozen authoritative source fingerprint | integrity | "d6ced420d83eb046559ea445422ea7a838990989ab535a2f4530ef40db674fcb" | "d6ced420d83eb046559ea445422ea7a838990989ab535a2f4530ef40db674fcb" | PASS |
| Original workbook unchanged during scoped ingestion | integrity | true | true | PASS |
| Existing private crosswalk is versioned and source-bound | provenance | true | true | PASS |
| Existing labels map actual source identity and rows exactly | provenance | true | true | PASS |
| Targeted Siu provenance review bound to actual frozen row | provenance | true | true | PASS |
| Targeted review has evidence locations and facts | provenance | true | true | PASS |
| Linked source review bound to both actual frozen mappings | provenance | true | true | PASS |
| Linked source identity, possible duplication and category disagreements resolved | provenance | true | false | FAIL |
| Targeted Siu source mapping resolved without unauthorized membership change | provenance | true | false | FAIL |
| Private crosswalk remains ignored, untracked and owner-only | privacy | true | true | PASS |
| Private targeted provenance remains ignored, untracked and owner-only | privacy | true | true | PASS |
| Existing patient review export remains absent | privacy | false | false | PASS |
| Browser field whitelist remains exactly six scoped fields | privacy | ["achr", "formalNmj", "label", "needleEmg", "nmjEvidence", "vitalStatus"] | ["achr", "formalNmj", "label", "needleEmg", "nmjEvidence", "vitalStatus"] | PASS |

The required 38 records, 27 publication keys, categorical denominators and testing unions are evaluated from the actual frozen rows. No rows are reconstructed from aggregate targets. Missing or unperformed testing is never a negative result.

The Siu review remains a mandatory source-integrity prerequisite. The private review must establish both linked case mappings, resolve the possible source misattribution or duplicate and reconcile the category disagreements without an unauthorized membership change. Unresolved questions remain blocking failures. Numerical reproduction of source rows is not proof of 38 clinically distinct patients or 27 correctly attributed publications.

The full-study workflow retains all frozen targets and its failed troponin checks. Its separate audit is summarized for status reporting; no full-study failure is filtered, converted to a warning, or used to define this specification.

No patient-level export was generated, loaded, approved, committed or published by this workflow. It does not write or replace any original private crosswalk or adjudication record. The existing export policy remains active; a core export policy has not been activated. Private preview and publication require separate explicit author authorization of concrete, exact records under the documented privacy review.

The JSON companion contains validation metadata and aggregate checks only. It contains no browser records, raw source identifiers, DOI crosswalk, source row lists, clinical narratives, or review evidence. Patient UI interactions cannot be claimed as tested by this validation.
