# Overwatch bounded redesign — draft validation

Date: 2026-09-30  
Status: draft for review; not merged, released, or installed into a live project

## Result

PASS. The draft replaces the earlier invariant/envelope/value-gate machinery with four operating boundaries: a fixed closure checklist, a per-Task rejected-candidate stop, conditional preflight, and explicit Planner/authority boundaries. It adds no role, ceremony, or runtime artifact type. The closure checklist is stored in the existing Tracker Review State.

After Amendment A1, the affected shipped runtime sources are 1,395 lines before and 1,350 after, a net reduction of 45 lines. Including the affected normative workflow source, the count is 1,808 before and 1,751 after, a net reduction of 57 lines.

## Draft sources

- Planner and Manager: `templates/commands/apm-1-initiate-planner.md`, `templates/commands/apm-2-initiate-manager.md`
- Planning/runtime guides: `templates/guides/work-breakdown.md`, `templates/guides/task-assignment.md`, `templates/guides/task-review.md`, `templates/guides/task-execution.md`
- Existing APM artifacts: `templates/apm/spec.md`, `templates/apm/tracker.md`
- Normative workflow description: `templates/_standards/WORKFLOW.md`
- Static source validator: `scripts/validate-overwatch-v5.mjs`

## Line-count evidence

Counts use physical lines from pre-redesign commit `5f288ee` versus the A1 working tree. The first eight rows are shipped by the build; `WORKFLOW.md` is normative source but is not included in the generated target archives.

| Source | Before | After | Delta |
|---|---:|---:|---:|
| `templates/apm/spec.md` | 15 | 20 | +5 |
| `templates/apm/tracker.md` | 31 | 31 | 0 |
| `templates/commands/apm-1-initiate-planner.md` | 78 | 85 | +7 |
| `templates/commands/apm-2-initiate-manager.md` | 119 | 124 | +5 |
| `templates/guides/task-assignment.md` | 316 | 301 | -15 |
| `templates/guides/task-execution.md` | 151 | 138 | -13 |
| `templates/guides/task-review.md` | 373 | 342 | -31 |
| `templates/guides/work-breakdown.md` | 312 | 309 | -3 |
| **Shipped runtime subtotal** | **1,395** | **1,350** | **-45** |
| `templates/_standards/WORKFLOW.md` | 413 | 401 | -12 |
| **All affected normative source** | **1,808** | **1,751** | **-57** |

Removed vocabulary and machinery: `SAME_ROOT_HALT`, `SAME_INVARIANT_HALT`, Correction Envelopes, remediation-value gates, invariant/owning-layer declarations, mitigation-only verdicts, Scope Echo, stale-poll counters, and time-based intervention thresholds.

## Boundary trace and mechanism class

No boundary in this draft is class (a). Templates do not remove tools or technically prevent an agent from ignoring instructions. The static validator is class (b) only for source/build conformance; it does not turn prose into runtime enforcement.

| Boundary | Trace | Mechanism class | Demonstrated mechanism |
|---|---|---|---|
| Planner may research, read, and delegate discovery but may not implement, commit product code, or create PRs; transition only on “you are now the Manager” | Adjustment 4; frozen incident 1 | (c) prose reminder | Planner command and generated bundles contain the role boundary. |
| Dispatch fixes one closure checklist from in-scope Spec outcomes, later quoted User rulings, and Plan validation; only quoted rulings amend it | Adjustment 1; incidents 5 and 6; Aug. 3 waiver batch | (c) prose reminder | Existing Tracker Review State records `evidenced`, `open`, or `waived`; validator checks required source phrases. |
| Setup and harness repair may proceed before positive control; runtime acceptance and unrelated proof polishing may not proceed while runtime is blocked | Adjustment 2; incident 3 | (c) prose reminder | Assignment, review, and Worker guides use the same conditional rule; validator checks both permission and prohibition. |
| One rejected candidate counts once regardless of critic count or cause; the third rejection blocks another correction for that Task until quoted User continuation; amendments do not reset; unrelated work continues | Adjustment 3; incidents 2, 4, and 7 | (c) prose reminder | Tracker stores candidate/count/continuation; review applies the count before continuity, direct fixes, or follow-up; validator checks each clause. |
| New product reachability or obligation requires a User ruling; critics do not create product scope | Adjustment 1; incident 6 | (c) prose reminder | Finding dispositions include `NEEDS_USER_RULING`; closure sources are fixed at dispatch. |
| Relayed rulings require `composed-by` and `authorized-by`; missing attribution is asked once and not executed | In-scope relay requirement; incident 6 attribution ambiguity | (c) prose reminder | Manager operating rule and generated bundles contain both fields. |
| One authority per category; stale grants incompatible with the approved session scope are removed before Rules approval; conflicting worktree copies block dispatch/review | Adjustment 4; incident 8; config-cleanup requirement | (c) prose reminder | Rules/Spec/Plan/Tracker ownership is stated in Planner and Manager sources; validator checks stale-grant cleanup. |
| Rationale says “repeated consequential failures” and makes no prevalence claim | Adjustment 5 | (c) prose reminder | Normative workflow text states that no prevalence rate is claimed. |
| Required source phrases, removed machinery, and marker balance | Supports all boundaries without claiming runtime enforcement | (b) script check | `npm run validate:overwatch` checks source templates. `npm run build:release` packages them, and a separate archive-inspection command checks generated marker/phrase coverage. An agent can still skip or ignore these commands. |

## Eight frozen decision-point replay

This is a manual instruction replay: each row asks which decision the draft text prescribes at the frozen point. PASS does not demonstrate that a runtime agent will comply.

| # | Frozen case | Draft result | Reason |
|---:|---|---|---|
| 1 | Toolbox Planner crossover | PASS — hand off | Execution verbs cannot transition the Planner. Product-code edits, implementation commits, and PR creation remain outside Planner scope until the User explicitly says “you are now the Manager.” |
| 2 | Tax runner refinement | PASS — stop after candidate 3 | Both critics on one candidate count once. The third rejected candidate blocks the next correction for that Task until quoted User continuation; independent authorized work remains eligible. |
| 3 | Tax setup gates | PASS — continue bounded setup | Conditional preflight expressly permits dependency, fixture, target-format, and harness repair before positive control. It bars runtime acceptance and unrelated proof polishing, not necessary setup already authorized. |
| 4 | Citadel visual loop | PASS — stop after candidate 3 | The rule is candidate-based and cause-independent, so describing the next defect as new, narrow, or final does not permit Envelope 3. |
| 5 | Citadel completion mismatch | PASS — keep acceptance open | The fixed checklist includes Plan validation and Spec outcomes. Nearby-phone/local-width evidence remains `open` unless evidenced or waived by quoted User ruling. |
| 6 | Nora onboarding expansion | PASS — request product ruling | A critic finding must cite a checklist item or named material risk. A new reachable product state is `NEEDS_USER_RULING`, and a later quoted ruling can amend the fixed checklist. Missing relay attribution must be clarified before use. |
| 7 | Toolbox commit hygiene | PASS — hold, then continue only after quote | Packaging failures count as rejected candidates. Once the third rejection has occurred, only the quoted zero-implementation continuation permits the next correction. |
| 8 | Planning process / stale grants | PASS — revise before approval | Rules analysis must remove entries incompatible with the approved session scope. Rules is the only owner of durable implementation/proof/model/review policy, preventing a worktree copy from silently preserving incompatible grants. User-requested gates remain valid until a quoted ruling changes them. |

## Previously unexamined session checks

These three main Manager chats predate the screened 20-chat audit set and were not counted as automated child chats.

### Tax-Brain — 2026-07-06 Manager (`019f3a1b-466d-7ad3-a68e-5793bbc3316d`)

The Manager observed that the Spec required 17 `relationshipLinks[]` entries while the branch contained 16, then accepted and merged Stage 1 with the mismatch merely documented. Under the draft, that Spec outcome would be a fixed closure item and remain `open`; documentation alone could not close it without a quoted waiver. The session's VC conventions were written into the root Rules file, which is consistent with the draft's authority owner and therefore serves as a no-change authority control rather than evidence of divergence.

Evidence: `/Users/jeremytran/.codex/archived_sessions/rollout-2026-07-06T21-04-53-019f3a1b-466d-7ad3-a68e-5793bbc3316d.jsonl` lines 286–287, 676, and 803.

### Toolbox-3.0 — 2026-07-15 Manager (`019f67bb-78c4-7b31-89fe-a4d867e68d4a`)

This is a useful negative control. The Manager eventually halted the trust-boundary task rather than autonomously issuing a third correction. The draft preserves that outcome with a smaller and more countable rule: candidate 3 blocks candidate 4, without root-cause/invariant/value-gate taxonomy. Earlier in the chat, a stale integration-branch grant in root Rules also needed manual cleanup; the draft makes incompatible-grant removal part of Rules approval.

Evidence: `/Users/jeremytran/.codex/archived_sessions/rollout-2026-07-15T17-42-47-019f67bb-78c4-7b31-89fe-a4d867e68d4a.jsonl` line 1288 and the initial root Rules snapshot.

### Nora-Prod — 2026-07-26 Manager (`019fa0b4-5531-7460-9ea2-2af54520cae3`)

Task 2.4 reached a recorded fourth-containment halt, but the chat also contains explicit User continuations for later correction work. The draft would record the third rejection and require those quoted continuations; it would not erase them or force an earlier halt. This is a negative control showing the exception can work while unrelated Task 2.2 review continues. Several pasted `ATHENA —`/`Ruling:` messages lacked the required two-field attribution, so the Manager would ask once for `composed-by` and `authorized-by` before treating them as rulings.

Evidence: `/Users/jeremytran/.codex/archived_sessions/rollout-2026-07-26T19-13-20-019fa0b4-5531-7460-9ea2-2af54520cae3.jsonl` lines 4225, 4899, 5026, and 5225.

## Build and artifact validation

Exact command-output evidence is preserved in `docs/audits/2026-09-30/bounded-redesign-validation.txt`.

- `npm ci` — PASS; 139 packages installed. npm reported 8 dependency audit findings (1 moderate, 7 high); no dependency or application changes were made because dependency remediation is outside this draft.
- `npm run validate:overwatch` — PASS. Twenty-eight required-policy checks, removed-machinery scan, and marker-balance checks passed.
- `npm run build:release` — PASS. All six targets built: GitHub Copilot, Claude Code, Antigravity, Cursor, OpenCode, and Codex CLI.
- Generated archive inspection — PASS for all six archives. Each contains 47 balanced `OVERWATCH BEGIN/END` marker pairs, all A1/stop phrases, and none of the seven retired terms. Statistical-honesty text remains in the normative `WORKFLOW.md`, which the build does not package.
- `git diff --check` — PASS.
- Test Gate Critic — PASS after correcting report attribution and preserving exact command output. It independently verified line counts, 22 source-policy checks, all six archives, retired-term absence, and the historical authorization context.
- Adversarial Change Critic — PASS after closing three bypasses: direct Manager correction after rejection three, unnecessary escalation for locally repairable setup, and Manager-authored product scope through a “small” planning edit.

## Amendment A1 — autonomous Manager loop and kickoff board

A1 adds no role, artifact, ceremony, or counter. The progress board is a chat rendering of existing Tracker Task state. From the bounded-redesign commit to A1, shipped templates increase by 10 lines (`apm-2-initiate-manager.md` +6, `task-assignment.md` +4); the normative workflow adds 2 lines. The combined redesign remains 45 shipped lines smaller than its pre-redesign baseline.

The Manager now drives the unchanged `apm-3-initiate-worker` / `apm-4-check-tasks` flow through the current Stage. It exits only on `BLOCKER`, `STAGE_COMPLETE`, or `QA_GATE`, and posts the Tracker-backed progress board before first dispatch, after Task closure, and at every exit. The autonomy rule cites the existing rejected-candidate stop, `NEEDS_USER_RULING`, Relay attribution, Authority ownership, Review and closure, and conditional preflight rather than redefining them.

| Frozen stop case | A1 replay | Result |
|---|---|---|
| 2. Tax runner refinement | “Continue automatically” reaches the existing rejected-candidate stop before any direct fix or dispatch; rejection three produces `BLOCKER`. | PASS |
| 4. Citadel visual loop | Narrow/final wording does not bypass the existing candidate count; rejection three produces `BLOCKER`. | PASS |
| 7. Toolbox commit hygiene | Mechanical packaging remains correction work; after rejection three it resumes only with the quoted User continuation. | PASS |

A1 validation: `validate:overwatch` PASS with 28 policy checks; `build:release` PASS for all six targets; archive inspection PASS with 47 balanced marker pairs per archive, all A1 phrases present, and all seven retired terms absent; `git diff --check` PASS. The A1 Test Gate and Adversarial Change critics both PASS, including static sabotage replays for frozen cases 2, 4, and 7. Exact output is appended to `bounded-redesign-validation.txt`.

## Residual limits

The redesign is behavioral. It can make the correct decision easier to identify and review, but it cannot technically prevent an agent from ignoring the templates. The source validator and separate archive inspection prove that the draft and generated bundles contain the required rules and omit the retired machinery; they do not prove runtime compliance. No full finding/task census was performed, and no prevalence claim is made.

No live project files, application source, tags, releases, or main-branch state were changed.
