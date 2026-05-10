# SmallFocusedExperiment [rule] v1.0.0
> Each A/B test or design experiment must change exactly one variable (or a tightly coupled cluster of related changes) — never bundle unrelated changes into a single experiment.
domain: frontend-design

## Severity
warning

## Applies When
scoping any A/B test, design experiment, or product change evaluation

## Verify By
Confirm the experiment changes exactly one variable or a tightly coupled cluster; reject experiments that bundle independent changes (e.g., changing CTA copy AND layout AND color simultaneously).

## Examples
- Good: test only the CTA button label — 'Start free trial' vs 'Get started'.
- Good: test a redesigned hero section (headline + subtext + CTA are one coupled cluster).
- Bad: test new nav + new pricing table + new onboarding modal in a single experiment — impossible to attribute.

## Rationale
Multi-change experiments produce ambiguous results where it is impossible to attribute outcomes to specific decisions. When an experiment moves the needle, you must know what caused it.

## Severity
warning

## Applies When
scoping any A/B test, design experiment, or product change evaluation

## Verify By
Confirm the experiment changes exactly one variable or a tightly coupled cluster; reject experiments that bundle independent changes (e.g., changing CTA copy AND layout AND color simultaneously).
