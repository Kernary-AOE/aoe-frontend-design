# PlatformInteractionConventions [rule] v1.0.0
Each platform's native interaction conventions — gestures on iOS/Android, keyboard shortcuts on desktop, pointer interactions on web — must be supported rather than overridden by custom implementations.
domain: frontend-design

## Severity
warning

## Per Platform
- **Ios**:
  - Swipe-to-delete on list items (UITableView / SwiftUI List)
  - Long-press for context menus
  - Swipe-back gesture (UINavigationController edge swipe)
  - Pull-to-refresh on scrollable content
  - Pinch-to-zoom on zoomable content
- **Android**:
  - Back button / gesture (system back) navigates up in the stack
  - Long-press for multi-select or context menu
  - Swipe to dismiss notifications / bottom sheets
- **Web**:
  - Right-click context menu (do not suppress globally)
  - Tab key navigates between interactive elements in DOM order
  - Enter activates buttons and submits forms
  - Space toggles checkboxes and scrolls page
  - Arrow keys navigate radio groups and custom listboxes

## Override Rules
- Custom swipe implementations on web must not conflict with browser navigation gestures.
- If overriding a platform gesture for a specific component (e.g. horizontal swipe on a carousel), provide an alternative interaction for the overridden gesture.
- Never suppress the browser context menu globally — only on specific canvas/drawing elements where it conflicts.
