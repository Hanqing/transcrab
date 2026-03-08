#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { loadTranslateConfig, normalizeMode } from './lib/translate-config.mjs';
import { buildTranslatePrompt } from './lib/translate-prompt.mjs';

export function getPipelineSteps(mode) {
  const normalized = normalizeMode(mode);
  if (normalized === 'quick') return ['translate'];
  if (normalized === 'auto') return ['auto-analyze', 'translate'];
  if (normalized === 'normal') return ['analyze', 'translate'];
  return ['analyze', 'translate', 'review', 'revise'];
}

export function deriveArtifactPaths(outputDir) {
  return {
    analysis: path.join(outputDir, '01-analysis.md'),
    assembledPrompt: path.join(outputDir, '02-prompt.md'),
    draft: path.join(outputDir, '03-draft.md'),
    critique: path.join(outputDir, '04-critique.md'),
    revision: path.join(outputDir, '05-revision.md'),
    final: path.join(outputDir, 'translation.md'),
  };
}

export function resolveExecutionMode(profile = {}, autoProfile = null) {
  const requested = normalizeMode(profile.mode);
  if (requested !== 'auto') return requested;
  const resolved = autoProfile?.resolved?.mode;
  if (resolved === 'quick' || resolved === 'normal' || resolved === 'refined') return resolved;
  return 'normal';
}

export async function materializePipelineArtifacts({
  outputDir,
  markdown,
  lang = 'zh',
  profile = {},
  autoProfile = null,
  sourceTitle = '',
  sourceUrl = '',
} = {}) {
  const absOut = path.resolve(outputDir);
  await fs.mkdir(absOut, { recursive: true });

  const artifacts = deriveArtifactPaths(absOut);
  const executionMode = resolveExecutionMode(profile, autoProfile);
  const executionSteps = getPipelineSteps(executionMode);
  const prompt = buildTranslatePrompt(markdown, lang, {
    ...profile,
    steps: executionSteps,
    autoProfile,
  });

  const created = [];

  await fs.writeFile(artifacts.assembledPrompt, prompt + '\n', 'utf8');
  created.push(artifacts.assembledPrompt);

  if (executionMode !== 'quick') {
    const analysisTemplate = [
      '# Analysis Notes',
      '',
      `- sourceTitle: ${sourceTitle || 'unknown'}`,
      `- sourceUrl: ${sourceUrl || 'unknown'}`,
      `- requestedMode: ${normalizeMode(profile.mode)}`,
      `- executionMode: ${executionMode}`,
      '- terminology: TODO',
      '- audience-fit: TODO',
      '- tone/style risks: TODO',
      '',
      '> Fill this file during translation analysis; keep it concise and actionable.',
      '',
    ].join('\n');

    await fs.writeFile(artifacts.analysis, analysisTemplate, 'utf8');
    created.push(artifacts.analysis);
  }

  const draftTemplate = [
    '# Initial Translation Draft',
    '',
    '> Put the first complete translation here (H1 + blank line + body).',
    '',
  ].join('\n');
  await fs.writeFile(artifacts.draft, draftTemplate, 'utf8');
  created.push(artifacts.draft);

  if (executionMode === 'refined') {
    await fs.writeFile(
      artifacts.critique,
      '# Critique Notes',
      'utf8'
    );
    await fs.appendFile(
      artifacts.critique,
      '\n\n- factual accuracy: TODO\n- terminology drift: TODO\n- markdown integrity: TODO\n- readability issues: TODO\n- style alignment: TODO\n',
      'utf8'
    );
    created.push(artifacts.critique);

    await fs.writeFile(
      artifacts.revision,
      '# Revision Notes\n\n- changes applied: TODO\n- unresolved issues: TODO\n- final polish checklist: TODO\n',
      'utf8'
    );
    created.push(artifacts.revision);
  }

  return {
    artifacts,
    executionMode,
    executionSteps,
    createdFiles: created,
  };
}

function argValue(args, key, def = null) {
  const idx = args.indexOf(key);
  if (idx >= 0 && idx + 1 < args.length) return args[idx + 1];
  return def;
}

function parseArgs(argv) {
  const args = argv.slice(2);
  return {
    source: argValue(args, '--source'),
    outputDir: argValue(args, '--out'),
    mode: argValue(args, '--mode'),
    audience: argValue(args, '--audience'),
    style: argValue(args, '--style'),
    configPath: argValue(args, '--config'),
    dryRun: args.includes('--dry-run'),
  };
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.source || !args.outputDir) {
    console.log(
      'Usage: node scripts/translate-orchestrator.mjs --source <source.md> --out <dir> [--mode auto|quick|normal|refined] [--audience <name>] [--style <name>] [--config <path>] [--dry-run]'
    );
    process.exit(2);
  }

  const { config, configPath, loadedFromFile } = await loadTranslateConfig({
    cwd: process.cwd(),
    configPath: args.configPath,
    cli: {
      mode: args.mode,
      audience: args.audience,
      style: args.style,
    },
  });

  const steps = getPipelineSteps(config.mode);
  const artifacts = deriveArtifactPaths(path.resolve(args.outputDir));

  await fs.mkdir(path.resolve(args.outputDir), { recursive: true });

  const plan = {
    ok: true,
    source: path.resolve(args.source),
    outputDir: path.resolve(args.outputDir),
    config,
    steps,
    artifacts,
    configPath,
    loadedFromFile,
    dryRun: Boolean(args.dryRun),
  };

  if (args.dryRun) {
    console.log(JSON.stringify(plan, null, 2));
    return;
  }

  await fs.writeFile(path.join(path.resolve(args.outputDir), 'pipeline-plan.json'), JSON.stringify(plan, null, 2) + '\n');
  console.log(JSON.stringify(plan, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err?.stack || String(err));
    process.exit(1);
  });
}
