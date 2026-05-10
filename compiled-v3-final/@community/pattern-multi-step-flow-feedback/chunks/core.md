# MultiStepFlowFeedback [pattern] v1.0.0
Each step in a multi-step flow must carry a clear step label, current position indicator, logical step order, and per-step validation feedback before advancing.
domain: frontend-design

## Problem
Multi-step flows without progress indicators leave users uncertain how many steps remain, which causes abandonment. Flows that advance without validating the current step deliver errors at the wrong moment.

## Patterns
- Progress indicator: 'Step 2 of 5 — Account Details' at the top of every step
- Step label: a short noun phrase naming the step's purpose, not just a number
- Validation-before-advance: run client-side validation on 'Next'; show errors inline before moving
- Back button: always visible; returns to the previous step without clearing current step data
- Completion feedback: final step confirmation screen with summary of what was entered
- aria-current='step' on the active step in a stepper progress component

## Thresholds
- Minimum steps that warrant a stepper: 3
- Maximum steps before considering branching: 7
- Step label max: 3 words
