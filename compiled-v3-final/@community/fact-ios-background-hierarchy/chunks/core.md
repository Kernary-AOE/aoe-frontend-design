# IosBackgroundHierarchy [fact] v1.0.0
iOS defines three system background color levels — systemBackground, secondarySystemBackground, tertiarySystemBackground — that automatically adapt to light and dark mode to create visual depth in grouped layouts.
domain: frontend-design

## Evidence
- systemBackground: primary surface for main content areas (white in light mode, black in dark mode).
- secondarySystemBackground: grouped content areas, cards, and inset grouped table sections.
- tertiarySystemBackground: elements nested within grouped content (e.g., cells inside a grouped section).
- All three levels are semantic UIColor / SwiftUI Color tokens that adjust automatically when the system appearance changes.
