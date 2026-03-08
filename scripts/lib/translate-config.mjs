#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

export const DEFAULT_TRANSLATE_CONFIG = Object.freeze({
  mode: 'auto',
  audience: 'general',
  style: 'storytelling',
  chunkThreshold: 4000,
  chunkMaxWords: 5000,
  glossary: [],
});

const ALLOWED_MODES = new Set(['auto', 'quick', 'normal', 'refined']);

export function normalizeMode(mode, fallback = DEFAULT_TRANSLATE_CONFIG.mode) {
  const m = String(mode || '').trim().toLowerCase();
  if (!m) return fallback;
  if (!ALLOWED_MODES.has(m)) {
    throw new Error(`Invalid mode: ${mode}. Allowed: auto|quick|normal|refined`);
  }
  return m;
}

export function mergeTranslateConfig(base, patch) {
  const merged = {
    ...DEFAULT_TRANSLATE_CONFIG,
    ...(base || {}),
    ...(patch || {}),
  };

  merged.mode = normalizeMode(merged.mode);
  merged.audience = String(merged.audience || DEFAULT_TRANSLATE_CONFIG.audience).trim() || DEFAULT_TRANSLATE_CONFIG.audience;
  merged.style = String(merged.style || DEFAULT_TRANSLATE_CONFIG.style).trim() || DEFAULT_TRANSLATE_CONFIG.style;

  const threshold = Number(merged.chunkThreshold);
  merged.chunkThreshold = Number.isFinite(threshold) && threshold > 0
    ? Math.floor(threshold)
    : DEFAULT_TRANSLATE_CONFIG.chunkThreshold;

  const maxWords = Number(merged.chunkMaxWords);
  merged.chunkMaxWords = Number.isFinite(maxWords) && maxWords > 0
    ? Math.floor(maxWords)
    : DEFAULT_TRANSLATE_CONFIG.chunkMaxWords;

  merged.glossary = Array.isArray(merged.glossary)
    ? merged.glossary.filter(Boolean).map((x) => String(x).trim()).filter(Boolean)
    : [];

  return merged;
}

async function maybeReadJson(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err && err.code === 'ENOENT') return null;
    throw err;
  }
}

export async function loadTranslateConfig({ cwd = process.cwd(), configPath, cli = {} } = {}) {
  const resolvedPath = configPath
    ? path.resolve(cwd, configPath)
    : process.env.TRANSCRAB_TRANSLATE_CONFIG
      ? path.resolve(cwd, process.env.TRANSCRAB_TRANSLATE_CONFIG)
      : path.resolve(cwd, 'transcrab.translate.config.json');

  const fileConfig = await maybeReadJson(resolvedPath);
  const config = mergeTranslateConfig(fileConfig, cli);

  return {
    config,
    configPath: resolvedPath,
    loadedFromFile: Boolean(fileConfig),
  };
}
