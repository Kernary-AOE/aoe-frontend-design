# IosReduceMotion [rule] v1.0.0
> Disable or replace decorative animations with a simple crossfade when the Reduce Motion accessibility preference (UIAccessibility.isReduceMotionEnabled) is active.
domain: frontend-design

## Applies To
all iOS views with animations, transitions, or parallax effects

## Examples
- SwiftUI: wrap decorative withAnimation calls in a guard !UIAccessibility.isReduceMotionEnabled.
- Custom transitions: swap slide/zoom for .opacity when Reduce Motion is on.
- Verify: enable Reduce Motion in Settings → Accessibility → Motion → Reduce Motion; all decorative movement must stop.

## Rationale
Users with vestibular disorders enable Reduce Motion because animation causes dizziness or nausea. Ignoring this setting can cause physical discomfort. This is an accessibility requirement, not a preference.

## Applies To
all iOS views with animations, transitions, or parallax effects
