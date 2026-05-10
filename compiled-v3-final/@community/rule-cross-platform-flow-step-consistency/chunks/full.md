# CrossPlatformFlowStepConsistency [rule] v1.0.0
Multi-step flows (onboarding, checkout, account setup) must present the same steps in the same logical order across all platforms, even if visual grouping or layout differs per platform.
domain: frontend-design

## Severity
warning

## Behavior
- Map all flows across platforms to a shared step model before building.
- If a platform groups multiple logical steps on one screen, the URL/state still reflects each logical step.
- If a step must be omitted on a platform (e.g. billing handled differently on App Store), document the exception and provide an equivalent path.

## Rationale
Users who start a flow on web and continue on mobile (or vice versa) depend on step order being consistent to orient themselves. Omitting or reordering steps between platforms creates confusion and support burden.

## Severity
warning

## Behavior
- Map all flows across platforms to a shared step model before building.
- If a platform groups multiple logical steps on one screen, the URL/state still reflects each logical step.
- If a step must be omitted on a platform (e.g. billing handled differently on App Store), document the exception and provide an equivalent path.
