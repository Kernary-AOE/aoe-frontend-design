# CrossPlatformA11yParity [rule] v1.0.0
Each platform must implement the accessibility conventions native to that platform — touch targets ≥ 44×44pt on iOS/Android and full keyboard navigation on desktop — because ignoring platform-specific assistive-technology conventions excludes users with disabilities.
domain: frontend-design

## Platform Requirements
- **Mobile**:
  - Touch targets ≥ 44×44 CSS pixels (iOS HIG) / 48×48dp (Android)
  - All interactive elements reachable via swipe-focus (VoiceOver, TalkBack)
  - No hover-only interactions — pointer: fine is not guaranteed
  - Support Dynamic Type / system font scaling (iOS) or sp units (Android)
- **Desktop**:
  - All interactive elements reachable via Tab key in logical order
  - Visible focus indicator on every focusable element
  - Keyboard shortcuts follow platform conventions (Esc closes modal, Enter activates)
  - No pointer-only interactions without keyboard equivalents
- **Shared**:
  - Color contrast ≥ 4.5:1 for text (WCAG SC 1.4.3 AA)
  - prefers-reduced-motion respected
  - Screen reader labels on all interactive elements

## Severity
block

## Verification
```
Mobile: enable VoiceOver (iOS) or TalkBack (Android); navigate via swipe; confirm all controls are reachable and labeled.
Desktop: navigate entire page with keyboard only (no mouse); confirm every control is reachable and focus is visible.
```
