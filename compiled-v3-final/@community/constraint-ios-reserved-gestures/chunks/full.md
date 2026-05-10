# IosReservedGestures [constraint] v1.0.0
> Apps must never attach gesture recognizers that intercept the four iOS reserved system gestures: swipe from left edge (back navigation), swipe down from top-left (Notification Center), swipe down from top-right (Control Center), and swipe up from bottom (home / app switcher).
domain: frontend-design

## Target
- all custom UIGestureRecognizer or SwiftUI gesture modifiers in iOS apps

## Rationale
These four gestures trigger system-level functions that iOS users rely on for navigation and device control. Intercepting them breaks system navigation, traps users inside the app, and violates App Store Review Guidelines — apps that do so are routinely rejected. Apple HIG source: Rule 6.2 — Never Override System Gestures.
