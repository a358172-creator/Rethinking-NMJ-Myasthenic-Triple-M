# Core atlas privacy and release review

Version 1.0.0 — Phase 3A.2, 13 October 2026.

**No patient preview, export-policy activation or public patient-data release is authorized.** This checklist specifies review of a future concrete artifact; completing numerical checks or creating this document does not complete author review.

The [core specification](CORE_NEUROMUSCULAR_ATLAS_VALIDATION.md), [executed core report](CORE_ATLAS_VALIDATION_REPORT.md), [source-provenance review](CORE_ATLAS_PROVENANCE_REVIEW.md) and [troponin amendment proposal](TROPONIN_MANUSCRIPT_AMENDMENT_PROPOSAL.md) have separate scopes. The original full-study report still contains four failed troponin checks. The legacy exporter still requires every frozen check to pass. A domain-specific core exporter is proposed, with no implementation or activation in this phase.

## Exact representation and serialization proposal

Each future browser record may have exactly these six keys; additional keys must fail the export review:

| Key | Allowed representation | Review requirement |
| --- | --- | --- |
| `label` | Stable neutral `Case 01`…`Case 38` | Private one-to-one crosswalk; no ID/DOI/date encoding; verify linkage and ordering risk. |
| `achr` | `positive`, `negative`, `not_documented` | Result and test availability agree; missing never becomes negative. |
| `formalNmj` | `documented`, `not_documented` | Unique RNS/SFEMG union, never conventional needle EMG; SFEMG remains nested. |
| `nmjEvidence` | `formal_negative`, `indeterminate_qualitative`, `not_documented` | Negative requires a formal negative result; two qualitative cases remain distinct from 32 undocumented cases. |
| `needleEmg` | `myopathic`, `neuropathic`, `normal`, `indeterminate`, `not_documented` | Source interpretation only, with explicit unavailable evaluation. |
| `vitalStatus` | `death`, `survival`, `unknown` | Correct original-case mapping and consistent reported follow-up; unknown remains outside known-status denominator. |

Serialize UTF-8 JSON, with stable record order and an explicitly versioned envelope. No examples containing substitute patient records are provided. Version 1 of the existing dataset contract denotes the legacy full-study workflow; a proposed version 2 envelope declares `CORE_NEUROMUSCULAR_ATLAS`, specification `1.0.0`, and core validation status explicitly. A v1 `validation.passed:true` must never be used to describe core-only success.

The exact approved serialization needs a SHA-256 digest. Approval must bind that digest, source fingerprint, specification version, field list and intended destination. Source fingerprints, authority records and the raw crosswalk belong to restricted local review by default; any public envelope metadata would require separate explicit disclosure review. An approved public serializer is not implemented.

Raw source identifiers, DOI-to-patient links, article case labels, narratives, troponin, CK, age, LVEF, demographics, treatment and clinical dates are excluded. Private provenance must preserve the full audit linkage; original raw text cannot be copied into tooltips, titles, accessibility attributes, downloadable data, source maps, logs or build assets.

## Mapping and recognition risk

The current private mapping assigns neutral labels by lexical sorting of the unchanged source-ID set. It is stable across workbook row reordering, but is not an anonymity guarantee. Review whether ordering itself allows a known publication/extraction list to recover identities; a future approved opaque fixed ordering may be preferable. No relabeling or new patient artifact was generated here.

A private, in-memory review of the frozen six-field shape found **15 distinct categorical profiles, with seven profiles represented by one record each**. This describes internal uniqueness in the current working representation, not a population-level re-identification probability, a clinical result, or a formal anonymity guarantee. No rare combination, patient label, DOI or individual profile is disclosed in this document. The private diagnostic is in the ignored core-atlas review directory and must be rerun after any authorized source reconciliation.

Even coarse published-case categories may link to recognizable reports. AChR/formal-NMJ gaps, unusual EMG classes and unknown vital status can increase recognizability in combination. Removing demographics alone does not resolve that risk. If author review finds the exact matrix unsuitable for public disclosure, retain an aggregate-only public site or propose an explicitly reviewed alternative presentation. Do not hide missingness by changing it to negative/normal, or silently combine distinct physiological categories.

## Scientific and source prerequisites

- [ ] Every versioned core numerical, ingestion, row/ID/source-mapping and privacy prerequisite passes on the exact reviewed source.
- [ ] Resolve both mappings and the category disagreements identified in the targeted provenance review; document original case/page/table evidence and distinctness/duplication decisions.
- [ ] Any necessary source/category/membership amendment has evidence and explicit author approval. Preserve the original workbook, expected-target history and prior adjudication records; use a versioned derivative if later authorized.
- [ ] Validate each label-to-source correspondence and every six-field value against the approved mappings. Unique labels and a count of 27 canonical DOI strings do not demonstrate independent clinical patients or correct source attribution.
- [ ] Retain the separate full-study FAIL and biochemical limitations. Core PASS is scoped scientific agreement, not certification of the manuscript or biochemical analysis.

## Required policy change — proposed, not activated

The current legacy full-study gate remains active. The proposal is to allow a future independent six-field core artifact to advance after its own complete source/scientific validation, even if an unrelated biochemical analysis remains unresolved. This is a policy change requiring explicit author approval of the versioned scope, prerequisites, serializer, approval-binding method and permitted destination. It must not be inferred from the instruction to prepare this architecture.

- [ ] Review and approve the exact `CORE_NEUROMUSCULAR_ATLAS_VALIDATION` specification and the proposed v2 envelope.
- [ ] Approve a concrete implementation of the new exporter/local loader after inspection. No such implementation, activation command or approval-writing command exists now.
- [ ] Record the author decision and approved policy version separately from validation output. The validator reports `CORE_ATLAS_EXPORT_POLICY=NOT_ACTIVATED`; it cannot change that to APPROVED.
- [ ] Keep `FULL_STUDY_VALIDATION`, `CORE_ATLAS_VALIDATION` and `CORE_ATLAS_PUBLICATION_APPROVAL` separate. Do not convert scientific failures into release warnings.

## Private preview approval

- [ ] Inspect the actual proposed records, exact serialization/digest, private source crosswalk and source review before signing preview approval.
- [ ] Approve the exact viewer, local environment, access method, permitted users and artifact version. This approval is separate from policy activation and public disclosure approval.
- [ ] Verify approved authority records outside the browser. The TypeScript metadata gate is a defensive display contract, not authentication, a signature verifier or an approval authority.
- [ ] A future private server must bind only to an approved local interface, with no public Codespaces port forwarding or publicly accessible tunnel, no public data endpoint and no production import. Browser caches/logs/screenshots require the same restricted handling.
- [ ] Test the actual matrix, all filter combinations, resets, AChR-positive shortcut, profiles, missingness and denominators only in that approved environment.

Prepared components remain unmounted. No local private server, endpoint, loader, exporter, approval manifest or patient UI test fixture was created. The existing aggregate-only availability notice is still what public builds render. The ordinary Vite commands remain aggregate-only; they are not a private patient-preview procedure.

## Public disclosure approval

- [ ] Review the exact field combinations and ordering for linkage risk, reuse permissions and publication context.
- [ ] Inspect the actual public candidate serialization, permitted metadata, all UI text and accessibility descriptions. Approve that exact digest and destination, not a generic future dataset.
- [ ] Explicitly authorize public patient-data disclosure and any required publication-policy change. A private-preview decision does not imply public approval, and public approval does not silently activate a different preview workflow.
- [ ] Independently run the scientific checks, artifact-whitelist checks, production boundary, relevant browser tests and author scientific/privacy review against the exact approved version.
- [ ] Authorize any commit, push or deployment separately. The current production verifier rejects private artifacts and patient markers; any future patient-enabled deployment needs a reviewed boundary change rather than disabling that verifier.

Current approvals: **export policy NOT_ACTIVATED; private preview PENDING; public publication PENDING**. No checklist item is marked complete on the author's behalf.
