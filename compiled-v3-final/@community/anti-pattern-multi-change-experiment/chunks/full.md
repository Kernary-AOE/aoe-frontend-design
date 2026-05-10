# MultiChangeExperiment [anti-pattern] v1.0.0
Bundling two or more independent design changes into a single experiment variant makes it impossible to attribute outcome to any individual change — a fundamental confounding error.
domain: frontend-design

## Label
Running Multiple Changes in a Single A/B Experiment

## Trap
Teams bundle changes to ship faster ('let's test the new CTA color AND the new hero copy AND the updated layout together'). When the variant wins or loses, no individual change can be credited or blamed, and the learnings are worthless.

## Detection Heuristics
- Experiment description lists more than one change in the variant
- Post-experiment write-up cannot say which change drove the result
- Design review has simultaneous changes to copy, layout, and color in one PR

## Remediation
- One experiment = one variable changed. Everything else held constant.
- If multiple changes must ship together for technical reasons, document them as a 'bundle' and forgo causal claims
- Prioritize experiments by expected impact; run sequentially, not concurrently

## Label
Running Multiple Changes in a Single A/B Experiment

## Trap
Teams bundle changes to ship faster ('let's test the new CTA color AND the new hero copy AND the updated layout together'). When the variant wins or loses, no individual change can be credited or blamed, and the learnings are worthless.

## Detection Heuristics
- Experiment description lists more than one change in the variant
- Post-experiment write-up cannot say which change drove the result
- Design review has simultaneous changes to copy, layout, and color in one PR

## Remediation
- One experiment = one variable changed. Everything else held constant.
- If multiple changes must ship together for technical reasons, document them as a 'bundle' and forgo causal claims
- Prioritize experiments by expected impact; run sequentially, not concurrently
