# ClearUserMentalModel [principle] v1.0.0
> Every interface must make three things immediately clear: what the user can do here, where they currently are in the product structure, and what happens if they take each visible action. An interface that fails any of these three points has a broken mental model.
domain: frontend-design

## Implications
- Current location must always be indicated in navigation (@community/rule-current-location-indicator).
- Every interactive element must have a label or affordance that communicates its function.
- Destructive actions must be visually differentiated from constructive ones.
- Multi-step flows must show progress and remaining steps.

## Rationale
A coherent mental model prevents disorientation and reduces errors caused by uncertainty. Users who do not know where they are cannot navigate purposefully. Users who do not know what actions do cannot act confidently. Both conditions cause abandonment.
