# APM Overwatch Fork Maintenance

APM Overwatch tracks upstream Agentic Project Management and adds execution-layer verification plus autonomous-operation hardening in template and documentation surfaces.

## Upstream Sync

1. Start from a clean worktree on a maintenance branch.
2. Fetch upstream:

   ```bash
   git fetch upstream
   ```

3. Merge the upstream base:

   ```bash
   git merge upstream/main
   ```

4. Resolve conflicts conservatively. Preserve upstream behavior unless the conflict touches a documented Overwatch layer.

Expected conflict surfaces:

- `templates/_standards/WORKFLOW.md`
- `templates/_standards/TERMINOLOGY.md`
- `templates/apm/tracker.md`
- `templates/commands/apm-2-initiate-manager.md`
- `templates/commands/apm-3-initiate-worker.md`
- `templates/commands/apm-5-check-reports.md`
- `templates/commands/apm-7-handoff-worker.md`
- `templates/commands/apm-9-recover.md`
- `templates/guides/task-assignment.md`
- `templates/guides/task-execution.md`
- `templates/guides/task-logging.md`
- `templates/guides/task-review.md`
- `templates/guides/work-breakdown.md`

## Rebuild And Validation

Run the dependency and release build checks:

```bash
npm ci
npm run build:release
```

After rebuilding, inspect generated Codex bundle output for the Overwatch layers:

- Worker task-relative proof and validation evidence.
- Manager dispatch packets, claim validation, and rejection handling.
- Two-critic review, untrusted-narrative handling, and negative-control checks.
- Handoff and recovery Verification State.
- Autonomous Manager and subagent Worker operation.
- Orphaned Worker output adoption.

Also verify:

- Generated template output preserves `<!-- OVERWATCH BEGIN -->` and `<!-- OVERWATCH END -->` markers where Overwatch owns additions.
- No generated file contains a `FABLE-GATES` marker.
- Markdown and template diffs receive a dogfood two-critic review before release readiness is accepted.

## Release Steps

Template release tags use:

```text
v<upstream>-overwatch.N
```

The intended first public Overwatch tag is:

```text
v1.0.2-overwatch.1
```

If using the release workflow, provide the version override without the leading `v`:

```text
1.0.2-overwatch.1
```

For later upstream bases, keep the upstream version visible in the tag. For example, the first Overwatch release based on upstream `v1.0.3` would be `v1.0.3-overwatch.1`.

Jeremy owns tag push, GitHub release creation, and post-release scratch install validation:

```bash
apm custom -r Tranman324/apm-overwatch
```

Do not tag, push, create GitHub releases, or accept post-release launch risk from an implementation Worker session.

## Coverage Boundary

Overwatch catches execution-layer failures such as stalls, weak reports, fake-green evidence, evidence ambiguity, rejection loops, and abandoned Worker output. It also scrutinizes declared invariant ownership, closeability, and shared-state write/reaction coverage before dispatch.

Overwatch does not guarantee spec correctness or solve general spec/promise drift, product gaps, requirement misreads, or planning promises that implementation quietly drops.

External brief authors use [the spec-authoring checklist](SPEC-AUTHORING-CHECKLIST.md) so their briefs carry the same invariant, closeability, state/reaction-path, residual, and pre-mortem information as Planner-produced Tasks.
