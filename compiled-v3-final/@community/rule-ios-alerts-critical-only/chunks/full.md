# IosAlertsCriticalOnly [rule] v1.0.0
> Reserve UIAlertController alerts for critical information that requires an immediate decision; prefer at most 2 action buttons, never more than 3.
domain: frontend-design

## Applies To
any iOS screen that needs to communicate feedback, warnings, tips, or confirmations to the user

## Examples
- Correct: alert asking 'Delete this item? This action cannot be undone.' with Cancel and Delete.
- Correct: alert for a permission escalation or destructive purchase confirmation.
- Wrong: alert saying 'Tip: swipe left to delete items' — use an inline tooltip or onboarding hint instead.

## Rationale
Alerts interrupt the user's flow and demand dismissal before any other action. Overuse trains users to dismiss without reading. Non-critical notifications belong in banners, inline messages, or action sheets.

## Applies To
any iOS screen that needs to communicate feedback, warnings, tips, or confirmations to the user
