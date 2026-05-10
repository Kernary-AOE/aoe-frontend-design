# OptimisticUpdateTradeoff [fact] v1.0.0
Optimistic UI updates (apply the change locally before the server confirms) trade perceived speed against rollback complexity and the cost of user-visible failures when the server rejects the change.
> Optimistic updates exchange immediate perceived responsiveness for two costs: (1) implementation complexity for rollback / reconciliation when the server rejects the operation, and (2) erosion of user trust when a previously-confirmed action visibly reverses — making them most appropriate for high-frequency, low-failure operations (like / star / mark-read) and least appropriate for high-stakes, high-failure operations (payments, irreversible deletes).

## Confidence
strong

## Applies To
- list-item interactions (like, star, mark-read, follow)
- drag-and-drop reordering
- form save where success rate is very high
- decision matrix: when to optimistic-update vs blocking spinner

## Quantitative
- **Success Rate Threshold Rule Of Thumb**: ≥ 99% server-success rate is the practical floor for optimistic UX
- **Rollback Cost**: rollback animation duration should be at least as long as the original action's confirmation delay to be comprehensible

## Counter Conditions
- Payments and irreversible operations should never be optimistic — the cost of a visible reversal is too high.
- Operations with high server-failure rates (>1–5%) generate enough rollbacks to feel buggy.
- Operations with strong cross-user consistency requirements (collaborative editing) need conflict resolution, which is more than rollback.
