import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import {
  DEFAULT_TRANSLATE_CONFIG,
  normalizeMode,
  mergeTranslateConfig,
  loadTranslateConfig,
} from '../scripts/lib/translate-config.mjs';

test('normalizeMode accepts valid modes', () => {
  assert.equal(normalizeMode('AUTO'), 'auto');
  assert.equal(normalizeMode('QUICK'), 'quick');
  assert.equal(normalizeMode('normal'), 'normal');
  assert.equal(normalizeMode('refined'), 'refined');
});

test('normalizeMode rejects invalid mode', () => {
  assert.throws(() => normalizeMode('turbo'), /Invalid mode/);
});

test('mergeTranslateConfig applies defaults and sanitizes values', () => {
  const cfg = mergeTranslateConfig(
    { audience: 'tech', chunkThreshold: '1200' },
    { style: 'formal', glossary: [' API ', '', null], chunkMaxWords: 9000 }
  );

  assert.equal(cfg.mode, DEFAULT_TRANSLATE_CONFIG.mode);
  assert.equal(cfg.audience, 'tech');
  assert.equal(cfg.style, 'formal');
  assert.equal(cfg.chunkThreshold, 1200);
  assert.equal(cfg.chunkMaxWords, 9000);
  assert.deepEqual(cfg.glossary, ['API']);
});

test('loadTranslateConfig merges file + cli overrides', async () => {
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'transcrab-config-'));
  const filePath = path.join(tmp, 'transcrab.translate.config.json');
  await fs.writeFile(
    filePath,
    JSON.stringify(
      {
        mode: 'quick',
        audience: 'general',
        style: 'literal',
        chunkThreshold: 3333,
      },
      null,
      2
    )
  );

  const { config, loadedFromFile, configPath } = await loadTranslateConfig({
    cwd: tmp,
    cli: { mode: 'refined', style: 'storytelling' },
  });

  assert.equal(loadedFromFile, true);
  assert.equal(configPath, filePath);
  assert.equal(config.mode, 'refined');
  assert.equal(config.style, 'storytelling');
  assert.equal(config.audience, 'general');
  assert.equal(config.chunkThreshold, 3333);
});
