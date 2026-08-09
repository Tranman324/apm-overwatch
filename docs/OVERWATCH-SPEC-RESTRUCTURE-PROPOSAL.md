# Overwatch Spec Restructuring Proposal

**Status:** Proposed for Athena review

**Date:** 2026-08-09

## Decision Requested

Approve retiring the 2026-07-03 implementation brief as current policy while preserving it unchanged as historical evidence. Adopt [`OVERWATCH-DESIGN-DRAFT.md`](OVERWATCH-DESIGN-DRAFT.md) as the compact current design index after review.

## Why This Change

The original brief now performs three incompatible jobs: historical execution plan, architecture explanation, and current policy. It still says `DRAFT`, describes completed phases, contains both autonomous-dispatch requirements and a prohibition on autonomous dispatch, and preserves rejection rules superseded by later Overwatch amendments. Editing it into apparent currency would erase useful provenance while leaving uncertainty about which statements are authoritative.

## Proposed Document Ownership

| Document | Responsibility |
| --- | --- |
| Original 2026-07-03 brief | Immutable historical intent and implementation record for `v1.0.2-overwatch.1`. Mark superseded in its archive metadata or surrounding index, not by rewriting its body. |
| `docs/OVERWATCH-DESIGN.md` | Compact current decision map after Athena approves and the draft suffix is removed. |
| `templates/_standards/WORKFLOW.md` | Behavioral source of truth. |
| Runtime templates | Executable procedures installed by Overwatch releases. |
| `README.md` | Human-facing overview and installation path. |
| `THIRD_PARTY_NOTICES.md` | Provenance and adapted-source record. |
| `docs/FORK-MAINTENANCE.md` | Upstream sync, build, and release operations. |

## Disposition Of The Suggested Cuts

| Suggested Change | Disposition | Adjustment |
| --- | --- | --- |
| Remove completed execution phases | Accept for the current design index | Preserve the phases in the immutable historical brief and release/session history. |
| Replace skill prose with a decision table | Accept | Map current V5 policies to authoritative files rather than restating the original V1 rules. |
| Collapse background into references | Accept | Retain license, repository, and inspected-commit facts in `THIRD_PARTY_NOTICES.md`. |
| Replace skipped-skill list with a notice link | Modify | The current notice is not a full 15-skill assessment. Do not claim that it is unless that assessment is added there. |
| Remove mitigated risks | Reject in part | Instruction density and over-gating remain monitored risks even with controls. Keep open risks, controls, and evaluation signals. |
| Keep only upstream drift and spec/promise drift | Modify | Also retain platform-forced termination and the lack of live V5 E2E evidence. |

## Pruning Rule

After 2-3 representative live sessions, review Manager behavior against the current design index. Remove or consolidate a rule when it repeatedly fails to affect a decision, duplicates another control, or is consistently skipped because its trigger is unclear. Preserve low-frequency controls for catastrophic security, privacy, legal, financial, irreversible data-loss, contract, or corruption risk even when they have not fired.

## Athena Review Questions

1. Does the draft accurately describe the current V5 policy rather than the original V1 implementation intent?
2. Should the original brief be copied into a tracked `docs/archive/` location, or remain in the existing external/session archive with a tracked index reference?
3. Should the full assessment of all skipped Fable skills be added to `THIRD_PARTY_NOTICES.md`, or should the current narrower provenance record remain?
4. After approval, should the design draft become `docs/OVERWATCH-DESIGN.md` immediately or remain draft through the first live V5 dogfood session?
