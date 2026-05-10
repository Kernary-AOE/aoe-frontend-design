# NoDivergentPlatformFlows [rule] v1.0.0
Entirely different task flows for the same user goal on different platforms are prohibited unless the platform constraints that necessitate the divergence are explicitly documented and justified.
domain: frontend-design

## Severity
warning

## Distinction
This rule targets FLOW divergence (different steps, different decision points, different outcomes) — not LAYOUT divergence (responsive design adapting the same flow to a narrower screen is expected and correct).

## Process
- Document every platform flow divergence in a decision record: what diverges, on which platform, and why.
- Review the divergence at each design review to confirm the platform constraint still holds.
- If a constraint is removed (e.g. Apple relaxes IAP rules), resolve the divergence.
