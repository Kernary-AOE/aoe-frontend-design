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
