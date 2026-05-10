# IaGroupByUserTasksNotOrg [rule] v1.0.0
> Navigation groupings must reflect user mental models — organized around the tasks users do, the objects they operate on, or the domains they think about — not around internal team ownership boundaries, engineering module names, or org chart divisions.
domain: frontend-design

## Label
Group Navigation by User Tasks and Mental Models, Not Org Chart

## Applies When
defining top-level navigation labels, sidebar sections, or any primary information architecture hierarchy

## Verify By
Show the navigation structure to 5 users. If > 2 of them ask 'which section has X?' for a common task, the grouping mirrors internal structure rather than user expectations. Run tree testing.

## Anti Pattern
Navigation sections named by team: 'Platform', 'Core', 'Growth', 'Infrastructure' — each owned by a different engineering team

## Remedy
Rename and re-group to task/object framing: 'Projects', 'Team', 'Billing', 'Settings' — named by what users do or manage, regardless of internal ownership

## Severity
warning

## Examples
- Bad: 'Platform Settings | User Management | Entitlements | Billing Core' → maps to 4 internal teams
- Good: 'Account | Team & Roles | Plan & Billing | Security' → maps to user tasks
- Bad: 'Frontend Services | Backend API | Data Pipeline' → engineering architecture
- Good: 'Dashboard | Integrations | Analytics | Logs' → user workflow objects

## Rationale
Org-chart navigation forces users to learn the company's internal structure before they can find what they need. Users do not know (or care) which team owns 'Billing' vs 'Subscriptions' vs 'Payments'. Task-based grouping allows users to navigate by asking 'what am I trying to do?' rather than 'who inside the company handles this?'

## Label
Group Navigation by User Tasks and Mental Models, Not Org Chart

## Applies When
defining top-level navigation labels, sidebar sections, or any primary information architecture hierarchy

## Verify By
Show the navigation structure to 5 users. If > 2 of them ask 'which section has X?' for a common task, the grouping mirrors internal structure rather than user expectations. Run tree testing.

## Anti Pattern
Navigation sections named by team: 'Platform', 'Core', 'Growth', 'Infrastructure' — each owned by a different engineering team

## Remedy
Rename and re-group to task/object framing: 'Projects', 'Team', 'Billing', 'Settings' — named by what users do or manage, regardless of internal ownership

## Severity
warning
