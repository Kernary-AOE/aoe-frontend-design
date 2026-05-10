# IosNonDismissableModal [anti-pattern] v1.0.0
Presenting a sheet or full-screen modal with no cancel button and swipe-to-dismiss disabled, trapping the user until they complete a forced step.
domain: frontend-design

## Label
iOS Non-Dismissable Modal (Trapped User)

## Why Bad
Users feel trapped and cannot exit to other app features or use the back button. There is always an interruption scenario (phone call, wrong tap) where the user needs to abandon the flow. iOS sheet dismissal is expected behavior and disabling it without a Cancel button violates the HIG — Apple HIG Rule 8.4 and Anti-Pattern #11.

## Instead Do
Always provide at least one dismiss path: a Cancel/Close button in the toolbar, or preserve the default swipe-to-dismiss behavior on sheets (.presentationDetents). If the task requires confirmation before exit, present a .confirmationDialog asking 'Discard changes?' rather than blocking dismiss entirely.
