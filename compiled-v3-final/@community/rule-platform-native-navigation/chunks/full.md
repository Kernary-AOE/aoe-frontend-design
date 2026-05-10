# PlatformNativeNavigation [rule] v1.0.0
Navigation structure and affordances must conform to the established conventions of each target platform — iOS uses tab bar + navigation stack, Android uses bottom navigation + back stack, web uses top nav + breadcrumbs.
domain: frontend-design

## Severity
warning

## Per Platform Conventions
- **Ios**:
  - **Primary Nav**: Tab bar at the bottom (UITabBarController) for top-level destinations (3-5 items max)
  - **Drill Down**: Navigation stack with back button in top-left (UINavigationController)
  - **Settings**: Dedicated Settings app or in-app Settings tab, not buried in a hamburger
  - **Modal**: Bottom sheet or full-screen modal for sub-tasks; dismissed with swipe-down or Cancel button
- **Android**:
  - **Primary Nav**: Bottom navigation bar for 3-5 top-level destinations
  - **Drill Down**: Back stack with system back button / up arrow in top-left
  - **Overflow**: 3-dot overflow menu (kebab) for secondary actions
  - **Drawer**: Navigation drawer acceptable for apps with many destinations
- **Web**:
  - **Primary Nav**: Top navigation bar with logo left, actions right
  - **Secondary Nav**: Sidebar for multi-section apps (admin dashboards, docs)
  - **Breadcrumbs**: For 3+ level hierarchies
  - **Mobile Web**: Hamburger or bottom nav acceptable for responsive web — prefer bottom for thumb reach

## Anti Patterns
- Hamburger menu as the only navigation on iOS (anti-pattern since iOS 7).
- Tab bar at the top on iOS (Android convention, feels wrong on iOS).
- Back button in bottom-left on web (iOS convention, not web convention).
- Fixed bottom nav on desktop web (mobile pattern, wastes desktop vertical space).

## Severity
warning

## Per Platform Conventions
- **Ios**:
  - **Primary Nav**: Tab bar at the bottom (UITabBarController) for top-level destinations (3-5 items max)
  - **Drill Down**: Navigation stack with back button in top-left (UINavigationController)
  - **Settings**: Dedicated Settings app or in-app Settings tab, not buried in a hamburger
  - **Modal**: Bottom sheet or full-screen modal for sub-tasks; dismissed with swipe-down or Cancel button
- **Android**:
  - **Primary Nav**: Bottom navigation bar for 3-5 top-level destinations
  - **Drill Down**: Back stack with system back button / up arrow in top-left
  - **Overflow**: 3-dot overflow menu (kebab) for secondary actions
  - **Drawer**: Navigation drawer acceptable for apps with many destinations
- **Web**:
  - **Primary Nav**: Top navigation bar with logo left, actions right
  - **Secondary Nav**: Sidebar for multi-section apps (admin dashboards, docs)
  - **Breadcrumbs**: For 3+ level hierarchies
  - **Mobile Web**: Hamburger or bottom nav acceptable for responsive web — prefer bottom for thumb reach

## Anti Patterns
- Hamburger menu as the only navigation on iOS (anti-pattern since iOS 7).
- Tab bar at the top on iOS (Android convention, feels wrong on iOS).
- Back button in bottom-left on web (iOS convention, not web convention).
- Fixed bottom nav on desktop web (mobile pattern, wastes desktop vertical space).
