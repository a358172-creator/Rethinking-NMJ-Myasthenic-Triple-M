/** Approval contracts for a future private loader. No exporter or loader is activated. */
export const coreAtlasSpecificationVersion = '1.0.0' as const;
export type ValidationStatus = 'PASS' | 'FAIL' | 'NOT_RUN';
export type ApprovalStatus = 'PENDING' | 'APPROVED';
export type AtlasValidationScope = 'FULL_STUDY' | 'CORE_NEUROMUSCULAR_ATLAS';

export interface AtlasReleaseStates {
  FULL_STUDY_VALIDATION: ValidationStatus;
  CORE_ATLAS_VALIDATION: ValidationStatus;
  CORE_ATLAS_PUBLICATION_APPROVAL: ApprovalStatus;
  CORE_ATLAS_PRIVATE_PREVIEW_APPROVAL: ApprovalStatus;
  CORE_ATLAS_EXPORT_POLICY: 'NOT_ACTIVATED' | 'APPROVED';
}

/** References must come from author-reviewed, hash-bound local approval records. */
export interface AtlasPrivatePreviewAuthorization {
  mode: 'LOCAL_PRIVATE';
  states: AtlasReleaseStates;
  policy: 'CURRENT_FULL_STUDY' | 'PROPOSED_CORE_SCOPE_1_0_0';
  sourceSha256: string;
  artifactSha256: string;
  specificationVersion: string;
  policyDecisionReference: string;
  privatePreviewDecisionReference: string;
  approvedAt: string;
}

export interface AtlasArtifactIdentity {
  scope: AtlasValidationScope;
  sourceSha256: string;
  artifactSha256: string;
  specificationVersion: string;
}

export function assessPrivateAtlasPreview(
  authorization: AtlasPrivatePreviewAuthorization | undefined,
  artifact: AtlasArtifactIdentity,
): { permitted: boolean; reasons: string[] } {
  if (!authorization || typeof authorization !== 'object' || !authorization.states || typeof authorization.states !== 'object') return { permitted: false, reasons: ['Private preview authorization is pending or incomplete.'] };
  const reasons: string[] = [];
  const { states } = authorization;
  if (!['PASS', 'FAIL', 'NOT_RUN'].includes(states.FULL_STUDY_VALIDATION) || !['PENDING', 'APPROVED'].includes(states.CORE_ATLAS_PUBLICATION_APPROVAL)) reasons.push('The independent study/release statuses are invalid.');
  if (authorization.mode !== 'LOCAL_PRIVATE') reasons.push('Only a reviewed local private preview is in scope.');
  if (states.CORE_ATLAS_VALIDATION !== 'PASS') reasons.push('Core scientific and source-integrity validation has not passed.');
  if (states.CORE_ATLAS_EXPORT_POLICY !== 'APPROVED') reasons.push('The export policy has not been approved or activated.');
  if (states.CORE_ATLAS_PRIVATE_PREVIEW_APPROVAL !== 'APPROVED') reasons.push('Private preview approval is pending.');
  if (authorization.policy === 'CURRENT_FULL_STUDY') {
    if (states.FULL_STUDY_VALIDATION !== 'PASS') reasons.push('The current full-study policy requires every frozen check to pass.');
    if (artifact.scope !== 'FULL_STUDY') reasons.push('A scoped artifact cannot use the legacy full-study validation marker.');
  } else if (authorization.policy === 'PROPOSED_CORE_SCOPE_1_0_0') {
    if (artifact.scope !== 'CORE_NEUROMUSCULAR_ATLAS') reasons.push('The proposed policy is limited to the six-field core atlas.');
  } else {
    reasons.push('The policy version is unrecognized.');
  }
  if (!/^[a-f0-9]{64}$/.test(artifact.sourceSha256) || !/^[a-f0-9]{64}$/.test(artifact.artifactSha256)) reasons.push('Artifact fingerprints are incomplete.');
  if (authorization.sourceSha256 !== artifact.sourceSha256 || authorization.artifactSha256 !== artifact.artifactSha256) reasons.push('Approval is not bound to this exact source and artifact.');
  if (authorization.specificationVersion !== coreAtlasSpecificationVersion || artifact.specificationVersion !== coreAtlasSpecificationVersion) reasons.push('The reviewed specification version does not match.');
  if (![authorization.policyDecisionReference, authorization.privatePreviewDecisionReference].every((reference) => typeof reference === 'string' && reference.trim()) || typeof authorization.approvedAt !== 'string' || !Number.isFinite(Date.parse(authorization.approvedAt))) reasons.push('Documented author decisions and approval time are required.');
  return { permitted: reasons.length === 0, reasons };
}
