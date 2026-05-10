# FreezeDesignDecisions [rule] v1.0.0
> Once a design decision has been shipped to production users and validated with evidence, freeze it. Do not revisit shipped, validated decisions without new contradictory evidence — revisiting settled questions wastes team bandwidth and reintroduces resolved debates.
domain: frontend-design

## Severity
warning

## Applies When
Any proposal to change a design decision that was already shipped and validated with user data or research.

## Verify By
Ask: is there new evidence (new A/B result, new usability study, new error data) that contradicts the original decision? If not, the freeze holds.

## Exceptions
- New contradictory evidence (user study, analytics showing degraded metric, accessibility audit finding) justifies unfreezing.
- Regulatory or platform requirement changes that invalidate the original design context.
- The original decision was a workaround explicitly planned for replacement after a dependency became available.
