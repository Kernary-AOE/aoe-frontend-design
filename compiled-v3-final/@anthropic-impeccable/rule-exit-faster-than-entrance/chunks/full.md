# ExitFasterThanEntrance [rule] v1.0.0
> Elements leaving the viewport or DOM should animate out in approximately 75% of the duration used for entering. Exit animations that match or exceed entrance duration feel sluggish because users are waiting to act on what replaces the departing element.
domain: frontend-design

## Label
Exit Animations Must Be Approximately 75% of Entrance Duration

## Sources

## Examples
- Modal enter: 300ms ease-out-expo; modal exit: 220ms ease-in
- Toast enter: 400ms slide-up; toast exit: 280ms fade-out
- Dropdown enter: 200ms; dropdown exit: 150ms

## Rationale
Entrance animations benefit from longer duration — the user is watching something arrive and building spatial understanding of where it landed. Exit animations are a mechanism for users to see confirmation that an element is gone so they can proceed; dwelling on the exit steals time from what the user actually wants to do. The asymmetry (slow entrance, faster exit) also creates a natural emphasis on the arriving content rather than the departing. This principle applies to modals, drawers, toasts, tooltips, dropdowns, and page transitions.

## Label
Exit Animations Must Be Approximately 75% of Entrance Duration
