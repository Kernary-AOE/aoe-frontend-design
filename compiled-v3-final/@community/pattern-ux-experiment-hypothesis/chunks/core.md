# UxExperimentHypothesis [pattern] v1.0.0
A structured sentence template for writing testable UX experiment hypotheses: 'If we change X for Y users, we expect Z metric to move in direction because reason' — ensuring every experiment has a defined independent variable, target population, measurable outcome, and causal rationale.
domain: frontend-design

## Label
UX Experiment Hypothesis Format

## Problem
Teams launch A/B tests or design changes without stating a falsifiable prediction, making it impossible to learn from the results — 'we tried a new button color' is not a hypothesis.

## Solution
Every proposed UX change must be framed as a hypothesis using the structured format below before implementation begins, so the success metric is defined upfront and results can be unambiguously interpreted.

## Format
If we [change X] for [target users Y], we expect [metric Z] to [direction: increase/decrease/remain stable] because [causal reason].

## Props
- **X**: The specific design change being made (independent variable)
- **Y**: The user segment affected — be specific (mobile users, new signups, users with >10 items)
- **Z**: The primary metric to measure (task completion rate, form abandonment rate, error rate, time-on-task)
- **Direction**: increase | decrease | remain stable — commit to a direction before running the test
- **Reason**: The UX principle or user behavior model that makes this direction plausible

## Applies When
- Planning an A/B test or UX experiment
- Proposing a design change for research review
- Writing acceptance criteria for a feature with a measurable UX goal
- Documenting a design decision retrospectively for learning

## Quality Checks
- Is X a single, clearly defined change? (No 'we redesigned the whole form')
- Is Y specific enough to be a real segment? (Not just 'users')
- Is Z a metric that can actually be measured in your analytics setup?
- Is the direction committed? (Not 'we expect it to change somehow')
- Is the reason grounded in a UX principle, not just intuition?
