# Third Party Notices

APM Overwatch is distributed under this repository's MPL-2.0 license. This notice records third-party reference material used while adapting Overwatch's execution-layer procedures.

## Fable Agent Orchestration

- Source: `sherlockholmesyes/fable-agent-orchestration`
- Repository: <https://github.com/sherlockholmesyes/fable-agent-orchestration>
- License: `Apache-2.0`
- Inspected commit: `e7b6aefbea57a579ffb2b7d9a439118be4d62688`

Overwatch adapts compact procedural ideas from Fable into APM's template voice. It does not vendor Fable source text or reproduce Fable source files.

Adapted procedure references:

- `think-work-try`
- `task-relative-test-gate`
- `autonomous-finish-loop`
- `investigate-before-fix`
- `agent-dispatch-packet`
- `agent-pr-validator`
- `two-critic-review-loop`
- `orphaned-wip-adopter`

The Fable `adversarial-reviewer` procedure is not integrated as a standalone Overwatch procedure. Only its untrusted-narrative and negative-control principles are folded into the Adversarial Change Critic.

Handoff verification state and rejection handling are Overwatch-original field rules, not Fable-derived adaptations.
