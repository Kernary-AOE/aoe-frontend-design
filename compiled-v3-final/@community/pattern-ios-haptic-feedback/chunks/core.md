# IosHapticFeedback [pattern] v1.0.0
Pair visual state changes with haptic feedback for significant user actions using UIFeedbackGenerator. Haptic confirmation closes the feedback loop — the user feels the device acknowledge their action, not just sees it.
domain: frontend-design

## Label
iOS Haptic Feedback for Significant Actions

## Problem
On touchscreens, users lack the tactile click of physical buttons. Significant actions (form submit, task complete, error) can feel unacknowledged if the only response is a visual change that may be subtle or off-screen.

## Solution
Trigger the appropriate UIFeedbackGenerator subclass immediately when a significant state change occurs. Match the intensity/type to the weight of the action: .success for completion, .error for failure, .warning for caution, .medium impact for discrete selections.
