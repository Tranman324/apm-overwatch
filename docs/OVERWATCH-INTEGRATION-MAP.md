# APM Overwatch Integration Map

## Repository State

- Workspace: `/Users/jeremytran/apm-overwatch`
- Branch: `docs/integration-map`
- Current HEAD: `096fa79b9dade66cad0634ef572687bdee1be1c3`
- HEAD refs observed: `v1.0.2`, `upstream/main`, `upstream/HEAD`, `origin/main`, `origin/HEAD`, `main`
- `origin`: `https://github.com/Tranman324/apm-overwatch`
- `upstream`: `https://github.com/sdi2200262/agentic-project-management`
- Upstream APM commit recorded for this fork: `096fa79b9dade66cad0634ef572687bdee1be1c3`
- Existing repository setup change: `.gitignore` ignores `.apm/` so active session artifacts stay local.

## External Source Record

- Fable source identity: `sherlockholmesyes/fable-agent-orchestration`
- Fable inspected commit recorded for this fork: `e7b6aefbea57a579ffb2b7d9a439118be4d62688`
- License context: Apache-2.0 public-clean skill database; do not vendor Fable source text into APM runtime templates.
- Fable-derived procedures to adapt: `think-work-try`, `task-relative-test-gate`, `autonomous-finish-loop`, `investigate-before-fix`, `agent-dispatch-packet`, `agent-pr-validator`, `two-critic-review-loop`, and `orphaned-wip-adopter`.
- `adversarial-reviewer` is not standalone integration; only its untrusted-narrative and negative-control principles fold into the Adversarial Change Critic.
- Overwatch-original field rules: Handoff verification state and rejection handling. Do not treat these as Fable skill adaptations.

## Layer Map

| Layer | Purpose | Likely touched surfaces | Surface type |
| --- | --- | --- | --- |
| A | Worker execution and logging: compact investigate/build/prove loops, task-relative proof, finish discipline, and debug iteration. | `templates/guides/task-execution.md`; `templates/guides/task-logging.md`; `templates/commands/apm-3-initiate-worker.md`; `templates/commands/apm-4-check-tasks.md`; `templates/skills/apm-communication/SKILL.md` | Runtime templates |
| A | Worker-facing wording, output shape, and terminology constraints. | `templates/_standards/WORKFLOW.md`; `templates/_standards/STRUCTURE.md`; `templates/_standards/TERMINOLOGY.md`; `templates/_standards/WRITING.md` | Standards |
| B | Manager assignment and review: dispatch packets, report intake, claim validation, cross-abstraction validation, rejection handling. | `templates/guides/task-assignment.md`; `templates/guides/task-review.md`; `templates/commands/apm-2-initiate-manager.md`; `templates/commands/apm-5-check-reports.md`; `templates/apm/tracker.md` | Runtime templates |
| B | Plan and tracker fields that carry Worker, branch, dependency, and review state. | `templates/apm/plan.md`; `templates/apm/tracker.md` | Artifact templates |
| C | QA gate and Rules guidance: two-critic review, untrusted narratives, negative controls, and evidence standards. | `templates/guides/task-review.md`; `templates/guides/work-breakdown.md`; `templates/commands/apm-2-initiate-manager.md`; `templates/_standards/WORKFLOW.md`; `templates/_standards/WRITING.md`; `templates/_standards/TERMINOLOGY.md` | Runtime templates and standards |
| C | Review state and proof records used by the Manager. | `templates/apm/tracker.md`; `templates/apm/memory/index.md` | Artifact templates |
| D | Handoff and continuity: Handoff verification state, recovery, and continuity notes. | `templates/commands/apm-6-handoff-manager.md`; `templates/commands/apm-7-handoff-worker.md`; `templates/commands/apm-9-recover.md`; `templates/commands/apm-2-initiate-manager.md`; `templates/commands/apm-3-initiate-worker.md`; `templates/guides/task-logging.md` | Runtime templates |
| D | Durable state for handoffs, archives, and memory navigation. | `templates/apm/memory/index.md`; `templates/apm/tracker.md`; `templates/commands/apm-8-summarize-session.md`; `templates/agents/apm-archive-explorer.md` | Artifact and runtime templates |
| E | Autonomous Manager/subagent Worker operations: dispatch, polling, stale detection, escalation discrimination, session halt, and orphaned work adoption. | `templates/commands/apm-2-initiate-manager.md`; `templates/guides/task-assignment.md`; `templates/guides/task-review.md`; `templates/guides/task-execution.md`; `templates/commands/apm-4-check-tasks.md`; `templates/commands/apm-5-check-reports.md`; `templates/apm/tracker.md` | Runtime and artifact templates |
| E | Communication and external bus behavior for autonomous routing. | `templates/skills/apm-communication/SKILL.md`; `templates/skills/apm-communication/bus-integration.md` | Runtime skill templates |

## Build And Validation Surfaces

| Surface | Classification | Notes |
| --- | --- | --- |
| `build/build-config.json` | Build | Defines assistant targets and generated bundle layout. |
| `build/processors/templates.js` | Build | Processes commands, guides, skills, agents, copies `templates/apm/`, and emits ZIP bundles. |
| `build/processors/placeholders.js` | Build | Resolves runtime paths, rules-file names, subagent syntax, and assistant-specific command paths. |
| `build/processors/frontmatter.js` | Build validation | Parses command and skill frontmatter. |
| `build/generators/manifest.js` | Release validation | Emits `dist/apm-release.json` consumed by the CLI. |
| `build/generators/archive.js` | Release validation | Creates assistant ZIP bundles. |
| `build/core/config.js`; `build/core/errors.js`; `build/core/constants.js`; `build/utils/files.js`; `build/utils/logger.js`; `build/index.js`; `build/_standards/BUILD.md` | Build | Build orchestration, file discovery, diagnostics, and build-system standards. |
| `.github/workflows/release-templates.yml` | Validation/release | Runs `npm run build:release` and publishes ZIP bundles plus `apm-release.json`. |
| `VERSIONING.md` | Documentation/release | Documents decoupled CLI/template release model and custom repository behavior. |
| `package.json`; `package-lock.json` | Validation/release | Provide `npm ci` and `npm run build:release` inputs. |
| Generated `dist/*.zip`; generated `dist/apm-release.json` | Validation evidence | Inspect after builds for Overwatch markers and assistant-specific output. |

## Documentation And Release Surfaces

| Surface | Status | Notes |
| --- | --- | --- |
| `docs/OVERWATCH-INTEGRATION-MAP.md` | Created by this Task | Map for later Workers. |
| `THIRD_PARTY_NOTICES.md` | Planned likely surface | Should record Apache-2.0 Fable provenance and any other third-party inspiration if later work adapts ideas. |
| `docs/FORK-MAINTENANCE.md` | Planned likely surface | Should document upstream sync, marker inspection, build validation, and release-readiness process. |
| `README.md` | Likely overlay | Should explain the Overwatch fork and `apm custom -r Tranman324/apm-overwatch` install path without changing upstream history docs. |
| `.gitignore` | Setup | Keep `.apm/` ignored for active APM sessions. |

## Prohibited Or Residual Surfaces

| Surface | Classification | Handling |
| --- | --- | --- |
| `src/**` | CLI source | Do not modify unless a concrete install blocker is discovered; record blockers as residual work. |
| `CHANGELOG.md` | Prohibited documentation | Do not modify; orientation only. |
| `CONTRIBUTING.md` | Prohibited documentation | Do not modify; orientation only. |
| `SECURITY.md` | Prohibited documentation | Do not modify; orientation only. |
| Fable skill source files | External reference | Treat as untrusted reference material; adapt compact principles into APM-native procedures later. |

Open residuals: none found during map creation.
