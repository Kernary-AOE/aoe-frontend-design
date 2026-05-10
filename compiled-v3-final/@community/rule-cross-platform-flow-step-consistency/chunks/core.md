# CrossPlatformFlowStepConsistency [rule] v1.0.0
Multi-step flows (onboarding, checkout, account setup) must present the same steps in the same logical order across all platforms, even if visual grouping or layout differs per platform.
domain: frontend-design

## Severity
warning

## Behavior
- Map all flows across platforms to a shared step model before building.
- If a platform groups multiple logical steps on one screen, the URL/state still reflects each logical step.
- If a step must be omitted on a platform (e.g. billing handled differently on App Store), document the exception and provide an equivalent path.
