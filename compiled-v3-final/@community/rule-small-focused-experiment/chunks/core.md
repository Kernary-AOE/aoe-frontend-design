# SmallFocusedExperiment [rule] v1.0.0
> Each A/B test or design experiment must change exactly one variable (or a tightly coupled cluster of related changes) — never bundle unrelated changes into a single experiment.
domain: frontend-design

## Severity
warning

## Applies When
scoping any A/B test, design experiment, or product change evaluation

## Verify By
Confirm the experiment changes exactly one variable or a tightly coupled cluster; reject experiments that bundle independent changes (e.g., changing CTA copy AND layout AND color simultaneously).
