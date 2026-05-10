# RefactorWhenEvidenceShowsIt [principle] v1.0.0
> Refactor a design decision only when evidence (usability test, analytics, A/B result, error log) specifically shows the current implementation is failing — not because the code looks improvable, trends have shifted, or a new pattern became available.
domain: frontend-design

## Implications
- Keep a living record of why each design decision was made (design.md) so you know whether a proposed refactor contradicts validated evidence.
- A/B test results, session recordings, and error rates are valid evidence triggers. Designer preference and 'it could be cleaner' are not.
- When evidence shows a problem, refactor the specific failing component — not the whole system.

## Rationale
Design refactors without evidence-trigger are expensive, risk-prone changes that may solve a non-problem while introducing new ones. Evidence-triggered refactors, by contrast, have a defined success criterion (the same metric that surfaced the problem) and a clear stopping condition.
