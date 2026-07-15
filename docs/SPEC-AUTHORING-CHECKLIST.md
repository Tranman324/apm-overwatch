# Overwatch Spec-Authoring Checklist

Use this checklist when an implementation brief enters APM from outside the Planner flow, including Athena-authored specifications. It is an authoring aid, not a Worker runtime procedure.

For each proposed Task, provide:

```text
Invariant I-<id>: <truth> | owner: <layer> | fix: <layer> | closure: CLOSEABLE_HERE / MITIGATION_ONLY / UNKNOWN
Likely rejection: <one Plan-bounded way the Task could fail its invariant or proof>
```

For a Task that writes or gates shared, auth, concurrency, cross-session, or otherwise shared mutable state, also provide State/Reaction-Path Evidence. Inventory direct writers, wrappers, queued or deferred operations, shared clients, immediate callers, and subscriptions, listeners, event handlers, timers, or callbacks that react to the same state or events. Cite the inventory by path and result; name any exception left outside the fence.

`MITIGATION_ONLY` requires a named residual risk and a critic check that tests containment rather than claiming the invariant is closed. Its title and objective must describe mitigation. `UNKNOWN` becomes a no-production-change spike whose output is the inventory, owning-layer recommendation, and Plan-change or deferral recommendation.

Preserve the invariant ID in the brief so the Manager can distinguish a repeated root cause from distinct causes violating the same invariant. The Manager owns the same-root and same-invariant halt sequence; this checklist does not authorize additional scope or a third correction envelope.

These checks scrutinize declared invariant ownership and state/reaction coverage. They do not guarantee spec correctness or eliminate general requirement misreads.
