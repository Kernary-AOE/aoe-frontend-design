# NoTerminologyDrift [rule] v1.0.0
A concept must be named identically throughout a single user flow — switching between synonyms or related terms mid-flow (e.g., 'Workspace' → 'Project' → 'Team') is forbidden.
domain: frontend-design

## Severity
medium

## Examples
- Violation: step 1 says 'Create a Project', step 3 says 'Your Workspace is ready'
- Violation: button says 'Delete Account', confirmation dialog says 'Remove Profile'
- Correct: create a terminology glossary before building; freeze labels at design system level

## Rationale
Term inconsistency forces users to mentally track whether 'Workspace', 'Project', and 'Team' are the same thing. This creates cognitive overhead and leads to errors, especially in multi-step flows where users carry context from prior steps.

## Severity
medium
