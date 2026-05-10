# IosNoOverrideSwipeBack [rule] v1.0.0
> Custom gesture recognizers must not intercept the system swipe-from-left-edge back navigation gesture; scope any custom horizontal DragGesture to avoid the leftmost 20pt edge.
domain: frontend-design

## Applies To
all iOS views with custom gesture recognizers, especially horizontal drag gestures

## Examples
- Wrong: .gesture(DragGesture().onChanged { }) on a full-width view — intercepts back swipe.
- Correct: limit horizontal drag to a named region that excludes the left 20pt, or use a vertical axis.
- Verify: swipe from the very left edge of a push view; it must navigate back every time.

## Rationale
The left-edge swipe is a core iOS navigation expectation built into every navigation stack. Breaking it disorients users and makes back navigation impossible without the Back button, which is a smaller target and often cut off by long titles.

## Applies To
all iOS views with custom gesture recognizers, especially horizontal drag gestures
