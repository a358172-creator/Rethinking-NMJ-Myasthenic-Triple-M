import assert from 'node:assert/strict';
import { test } from 'node:test';
import { assessPrivateAtlasPreview } from '../../../src/data/atlasRelease.ts';

// Only approval metadata is simulated; there are no fictional patient records.
const identity = {
  scope: 'CORE_NEUROMUSCULAR_ATLAS', sourceSha256: 'a'.repeat(64),
  artifactSha256: 'b'.repeat(64), specificationVersion: '1.0.0',
};
function proposedAuthorization() {
  return {
    mode: 'LOCAL_PRIVATE',
    states: {
      FULL_STUDY_VALIDATION: 'FAIL', CORE_ATLAS_VALIDATION: 'PASS',
      CORE_ATLAS_PUBLICATION_APPROVAL: 'PENDING', CORE_ATLAS_PRIVATE_PREVIEW_APPROVAL: 'APPROVED',
      CORE_ATLAS_EXPORT_POLICY: 'APPROVED',
    },
    policy: 'PROPOSED_CORE_SCOPE_1_0_0', ...identity,
    policyDecisionReference: 'test-policy-decision', privatePreviewDecisionReference: 'test-private-decision',
    approvedAt: '2026-10-13T12:00:00Z',
  };
}

test('numerical or core PASS without private authorization stays closed', () => {
  assert.equal(assessPrivateAtlasPreview(undefined, identity).permitted, false);
});
test('current policy cannot use a scoped PASS to bypass full-study failure', () => {
  const authorization = proposedAuthorization();
  authorization.policy = 'CURRENT_FULL_STUDY';
  assert.equal(assessPrivateAtlasPreview(authorization, identity).permitted, false);
});
test('future scoped policy needs both policy activation and private approval', () => {
  for (const field of ['CORE_ATLAS_EXPORT_POLICY', 'CORE_ATLAS_PRIVATE_PREVIEW_APPROVAL']) {
    const authorization = proposedAuthorization();
    authorization.states[field] = field === 'CORE_ATLAS_EXPORT_POLICY' ? 'NOT_ACTIVATED' : 'PENDING';
    assert.equal(assessPrivateAtlasPreview(authorization, identity).permitted, false);
  }
});
test('source-integrity failure blocks even with approved decision metadata', () => {
  const authorization = proposedAuthorization();
  authorization.states.CORE_ATLAS_VALIDATION = 'FAIL';
  assert.equal(assessPrivateAtlasPreview(authorization, identity).permitted, false);
});
test('approval cannot carry over to a different artifact or source fingerprint', () => {
  for (const field of ['sourceSha256', 'artifactSha256']) {
    const authorization = proposedAuthorization();
    authorization[field] = 'c'.repeat(64);
    assert.equal(assessPrivateAtlasPreview(authorization, identity).permitted, false);
  }
});
test('unknown scope, version, policy or incomplete fingerprints are rejected', () => {
  assert.equal(assessPrivateAtlasPreview(proposedAuthorization(), { ...identity, scope: 'OTHER' }).permitted, false);
  assert.equal(assessPrivateAtlasPreview(proposedAuthorization(), { ...identity, specificationVersion: '0.0.0' }).permitted, false);
  assert.equal(assessPrivateAtlasPreview(proposedAuthorization(), { ...identity, artifactSha256: '' }).permitted, false);
  const authorization = proposedAuthorization();
  authorization.policy = 'OTHER';
  assert.equal(assessPrivateAtlasPreview(authorization, identity).permitted, false);
});
test('synthetic complete scoped approval leaves full FAIL and public PENDING intact', () => {
  const authorization = proposedAuthorization();
  assert.equal(assessPrivateAtlasPreview(authorization, identity).permitted, true);
  assert.equal(authorization.states.FULL_STUDY_VALIDATION, 'FAIL');
  assert.equal(authorization.states.CORE_ATLAS_PUBLICATION_APPROVAL, 'PENDING');
});
test('decision references and valid approval timestamps are mandatory', () => {
  for (const field of ['policyDecisionReference', 'privatePreviewDecisionReference', 'approvedAt']) {
    const authorization = proposedAuthorization();
    authorization[field] = '';
    assert.equal(assessPrivateAtlasPreview(authorization, identity).permitted, false);
  }
});
test('malformed runtime authorization fails closed without throwing', () => {
  for (const authorization of [{}, { states: null }, { ...proposedAuthorization(), policyDecisionReference: undefined }]) {
    assert.equal(assessPrivateAtlasPreview(authorization, identity).permitted, false);
  }
});
test('public approval does not activate a private preview', () => {
  const authorization = proposedAuthorization();
  authorization.states.CORE_ATLAS_PUBLICATION_APPROVAL = 'APPROVED';
  authorization.states.CORE_ATLAS_PRIVATE_PREVIEW_APPROVAL = 'PENDING';
  assert.equal(assessPrivateAtlasPreview(authorization, identity).permitted, false);
});
