# FeatureFlagRollout [pattern] v1.0.0
A staged rollout strategy using feature flags to release new UI features to incrementally larger user segments — starting with internal users, then a small percentage of real users, then full rollout — with a kill switch to disable at any stage.
domain: frontend-design

## Label
Progressive Feature Flag Rollout

## Use When
- Shipping a major UI change (navigation restructure, new onboarding flow, redesigned component)
- Testing a new feature with a subset of users before committing to full rollout
- Deploying a change that cannot be fully tested in staging (requires production data or traffic patterns)

## Stages
-
  - **Stage**: 1 — Internal
  - **Audience**: Team members and internal employees only (0.1% of users)
  - **Purpose**: Catch obvious bugs and regressions before any external exposure
  - **Duration**: 1–3 days
-
  - **Stage**: 2 — Canary
  - **Audience**: 1–5% of production users, randomly sampled
  - **Purpose**: Measure real-world performance, error rates, and core interaction metrics
  - **Duration**: 3–7 days
-
  - **Stage**: 3 — Beta
  - **Audience**: 10–25% of production users
  - **Purpose**: Collect qualitative feedback and confirm metrics at scale
  - **Duration**: 1–2 weeks
-
  - **Stage**: 4 — General Availability
  - **Audience**: 100% of production users
  - **Purpose**: Full rollout — flag removed from code in next sprint

## Kill Switch
The feature flag must have a runtime kill switch that can disable the feature within 5 minutes of detection without a code deploy.

## Cleanup
Remove the feature flag from the codebase within 2 sprints of reaching 100% rollout. Dead flags accumulate and become unmaintainable.

## Label
Progressive Feature Flag Rollout

## Use When
- Shipping a major UI change (navigation restructure, new onboarding flow, redesigned component)
- Testing a new feature with a subset of users before committing to full rollout
- Deploying a change that cannot be fully tested in staging (requires production data or traffic patterns)

## Stages
-
  - **Stage**: 1 — Internal
  - **Audience**: Team members and internal employees only (0.1% of users)
  - **Purpose**: Catch obvious bugs and regressions before any external exposure
  - **Duration**: 1–3 days
-
  - **Stage**: 2 — Canary
  - **Audience**: 1–5% of production users, randomly sampled
  - **Purpose**: Measure real-world performance, error rates, and core interaction metrics
  - **Duration**: 3–7 days
-
  - **Stage**: 3 — Beta
  - **Audience**: 10–25% of production users
  - **Purpose**: Collect qualitative feedback and confirm metrics at scale
  - **Duration**: 1–2 weeks
-
  - **Stage**: 4 — General Availability
  - **Audience**: 100% of production users
  - **Purpose**: Full rollout — flag removed from code in next sprint

## Kill Switch
The feature flag must have a runtime kill switch that can disable the feature within 5 minutes of detection without a code deploy.

## Cleanup
Remove the feature flag from the codebase within 2 sprints of reaching 100% rollout. Dead flags accumulate and become unmaintainable.
