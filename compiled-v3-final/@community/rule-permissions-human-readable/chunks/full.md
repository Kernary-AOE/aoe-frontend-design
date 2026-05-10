# PermissionsHumanReadable [rule] v1.0.0
Permission and role labels in UI must describe what the user can do in plain language, not surface technical flag names, database identifiers, or internal role codes.
domain: frontend-design

## Severity
medium

## Examples
- Correct: 'Admin — can manage billing, invite members, delete projects'
- Correct: 'Viewer — can see all content but not make changes'
- Violation: Role dropdown showing 'admin', 'editor', 'viewer' with no description
- Violation: 'ROLE_MANAGER_L2' visible in permission settings UI
- Correct: permission request modals: 'Allow location access to show nearby results' not 'geolocation'

## Severity
medium
