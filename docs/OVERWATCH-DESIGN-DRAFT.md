# APM Overwatch Current Design - Draft

**Status:** Draft for Athena review

**Updated:** 2026-08-09

**Target:** `v1.0.3-overwatch.5`

## Purpose And Authority

Overwatch adds bounded verification, scope control, remediation economics, and autonomous coordination to APM while preserving APM artifacts and lifecycle vocabulary. This document is the compact decision index. [`templates/_standards/WORKFLOW.md`](../templates/_standards/WORKFLOW.md) is the behavioral source of truth, and runtime templates are the executable implementation.

The original 2026-07-03 implementation brief remains historical evidence for `v1.0.2-overwatch.1`; it is not current runtime policy. Where that brief conflicts with current templates, current templates govern.

## Current Decision Map

| Layer | Concern | Authoritative Surfaces | Current Rule |
| --- | --- | --- | --- |
| A | Worker execution and proof | `task-execution.md`, `task-logging.md`, Worker command | Investigate the premise, make a narrow in-scope change, and provide task-relative proof with real command output when practical. Preserve APM `Success`/`Partial`/`Failed`; proof verdicts remain evidence only. |
| B | Planning and dispatch scope | `work-breakdown.md`, `task-assignment.md`, Manager command | Declare invariant ownership, fix layer, closure, likely rejection, and shared-state write/reaction paths when applicable. Every Worker echoes the Scope Fence before editing. |
| C | Review and proof integrity | `task-review.md`, Manager command | Treat reports as hypotheses, pin the validated commit, review the bounded diff and immediate production-real neighborhood, and select review weight by risk. Findings cannot expand the Plan. |
| D | Remediation and continuity | `task-review.md`, Tracker, Handoff/recovery commands | Classify and dispose every escalated finding, use bounded Correction Envelopes, inventory the pattern class on first rejection, preserve verification state, and halt on repeated root cause or an invariant surviving two envelopes. |
| E | Autonomous coordination | Manager command, `task-review.md`, `WORKFLOW.md` | Record `DIRECT` or `RELAY`. In `DIRECT`, status prose never replaces polling and the Manager does not voluntarily end its turn while autonomous work remains. Stale work is recovered, adopted, or reassigned. |

## Review Routing

- Low-risk contained work receives one compact Manager critic pass.
- Add one independent critic when the diff introduces an unbriefed file, dependency, infrastructure, or artifact, or when Manager rejection and re-review repeats.
- Security, privacy, schema, API, release-critical, multi-module, or demonstrated false-green risk receives Test Gate and Adversarial Change critics.
- Negative-control sabotage is required only when false-green risk is plausible.
- Every critic report pins the exact validated commit. Amend or rebase invalidates the report.

## Finding And Remediation Rules

Every escalated finding is checked against the Task Base Commit, classified as introduced-here or pre-existing, and assigned one disposition: `FIX_IN_SCOPE`, `DEFER_RESIDUAL`, `PROPOSE_PLAN_CHANGE`, `ACCEPT_RISK`, or `REJECT_FINDING`. Pre-existing findings default to deferral unless severe security, privacy, data-loss, financial, legal, contract, corruption, or catastrophic risk justifies adjudication.

A first pattern-class rejection triggers an inventory of the Plan-defined target set. The same root cause recurring after Envelope 1 triggers `SAME_ROOT_HALT`; the same invariant remaining violated after Envelope 2 triggers `SAME_INVARIANT_HALT`. Three total counting rejections, remediation above roughly half the original Task cost, or 60-90 minutes without convergence triggers value review. Multi-hour continuation requires a User-approved Plan change.

## Autonomous Coordination Rules

`DIRECT` overrides command-mediated wait-state and report-relay instructions. A Manager turn remains active while a Worker, reviewer, or validation command is active; a report or candidate awaits review; a Ready Task exists; or safe in-scope remediation remains. Local tests, builds, reviews, routine merges, and Correction Envelopes are autonomous steps rather than human gates.

An active-status claim cites a current child handle, recent file or log change, running command, report, commit, or concrete blocker and is followed by the next bounded coordination action. `RELAY` may end a turn only while awaiting a named User relay action and cannot claim continued polling.

Overwatch cannot prevent host-enforced timeout, disconnection, compaction, or forced interruption. Handoff and recovery re-establish coordination mode from durable artifacts.

## Non-Goals

- Guaranteeing spec correctness or eliminating product, promise, or requirement drift.
- Authorizing critic findings to expand the Plan.
- Replacing APM lifecycle states, Task outcome statuses, or durable coordination artifacts.
- Adding vendor-specific runtime dependencies or modifying the APM CLI without a concrete install blocker.

## Open Risks And Evaluation

| Risk | Current Control | Evaluation Signal |
| --- | --- | --- |
| Manager instruction density | Risk-triggered procedures and surgical re-review | After 2-3 live sessions, identify rules that were skipped, duplicated, or did not affect a decision. Do not remove rare catastrophic-risk controls solely because they did not fire. |
| Voluntary versus host-forced exit | Direct-mode terminal guard plus recovery | Separate policy violations from platform termination in session review. |
| Behavioral proof gap | V5 source and bundle validators | Run one live `DIRECT` Task cycle without mid-task User prompting before broad deployment. |
| Upstream template drift | Overwatch markers and documented sync procedure | Rebuild and inspect all bundles after every upstream sync. |
| Spec/promise drift | Planner invariant and closure scrutiny | Treat residual product-intent gaps as a separate future capability, not an Overwatch execution claim. |

## References

- [`templates/_standards/WORKFLOW.md`](../templates/_standards/WORKFLOW.md) - behavioral source of truth.
- [`templates/commands/apm-2-initiate-manager.md`](../templates/commands/apm-2-initiate-manager.md) - Manager runtime entry point.
- [`templates/guides/task-review.md`](../templates/guides/task-review.md) - detailed review and remediation procedure.
- [`templates/guides/task-assignment.md`](../templates/guides/task-assignment.md) and [`templates/guides/work-breakdown.md`](../templates/guides/work-breakdown.md) - scope and planning controls.
- [`THIRD_PARTY_NOTICES.md`](../THIRD_PARTY_NOTICES.md) - attribution and adapted-source record.
- [`FORK-MAINTENANCE.md`](FORK-MAINTENANCE.md) - upstream sync and release procedure.
- [`v1.0.2-overwatch.1`](https://github.com/Tranman324/apm-overwatch/releases/tag/v1.0.2-overwatch.1) - original shipped release history.
