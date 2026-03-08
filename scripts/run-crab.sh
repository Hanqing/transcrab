#!/usr/bin/env bash
set -euo pipefail

# TransCrab bot wrapper (no translation inside scripts).
#
# Usage:
#   ./scripts/run-crab.sh <url> [--lang zh] [--mode auto|quick|normal|refined] [--audience <name>] [--style <name>] [--glossary <path>]
#
# Notes:
#   - In phase-1 these new flags are accepted and passed through for future orchestrator integration.
#
# What it does:
#   1) Fetch + extract + convert to Markdown
#   2) Writes content/articles/<slug>/source.md + meta.json
#   3) Writes a translation prompt file: content/articles/<slug>/translate.<lang>.prompt.txt
#
# Next step (OpenClaw assistant):
#   - Translate the prompt using the running conversation model
#   - Then write/apply the translation:
#       node scripts/apply-translation.mjs <slug> --lang <lang> --in <file>

node ./scripts/add-url.mjs "$@"
