# CrossPlatformAccessibilityParity [rule] v1.0.0
Each platform must implement the accessibility conventions native to that platform — web requires ARIA and keyboard navigation, iOS requires Dynamic Type and VoiceOver labels, Android requires TalkBack support — and accessibility features must not be silently absent on one platform.
domain: frontend-design

## Severity
block

## Per Platform Requirements
- **Web**:
  - Keyboard navigation for all interactive elements
  - ARIA roles/labels/live regions for dynamic content
  - WCAG 2.1 AA color contrast (4.5:1 text, 3:1 large/UI)
  - Focus visible styling on all focusable elements
  - Skip navigation link
- **Ios**:
  - VoiceOver accessibilityLabel on all interactive controls
  - Dynamic Type support (minimum 17pt at default, scales with user preference)
  - Touch target minimum 44×44pt
  - Reduce Motion respected via UIAccessibility.isReduceMotionEnabled
  - Voice Control support via accessibilityIdentifier or label uniqueness
- **Android**:
  - TalkBack contentDescription on all interactive elements
  - Touch target minimum 48×48dp
  - Large Text accessibility support
  - Reduce Motion via Settings.Global.TRANSITION_ANIMATION_SCALE

## Severity
block

## Per Platform Requirements
- **Web**:
  - Keyboard navigation for all interactive elements
  - ARIA roles/labels/live regions for dynamic content
  - WCAG 2.1 AA color contrast (4.5:1 text, 3:1 large/UI)
  - Focus visible styling on all focusable elements
  - Skip navigation link
- **Ios**:
  - VoiceOver accessibilityLabel on all interactive controls
  - Dynamic Type support (minimum 17pt at default, scales with user preference)
  - Touch target minimum 44×44pt
  - Reduce Motion respected via UIAccessibility.isReduceMotionEnabled
  - Voice Control support via accessibilityIdentifier or label uniqueness
- **Android**:
  - TalkBack contentDescription on all interactive elements
  - Touch target minimum 48×48dp
  - Large Text accessibility support
  - Reduce Motion via Settings.Global.TRANSITION_ANIMATION_SCALE
