import test from 'node:test';
import assert from 'node:assert/strict';
import { deriveArtifactPaths, getPipelineSteps } from '../scripts/translate-orchestrator.mjs';

test('getPipelineSteps returns expected mode pipeline', () => {
  assert.deepEqual(getPipelineSteps('auto'), ['auto-analyze', 'translate']);
  assert.deepEqual(getPipelineSteps('quick'), ['translate']);
  assert.deepEqual(getPipelineSteps('normal'), ['analyze', 'translate']);
  assert.deepEqual(getPipelineSteps('refined'), ['analyze', 'translate', 'review', 'revise']);
});

test('deriveArtifactPaths creates stable output filenames', () => {
  const p = deriveArtifactPaths('/tmp/x');
  assert.equal(p.analysis, '/tmp/x/01-analysis.md');
  assert.equal(p.assembledPrompt, '/tmp/x/02-prompt.md');
  assert.equal(p.final, '/tmp/x/translation.md');
});
