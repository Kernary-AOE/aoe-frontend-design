# IosSingleAccentColor [rule] v1.0.0
> Set a single app-wide tint/accent color applied uniformly to all buttons, links, and toggles; avoid using multiple competing accent colors across the interface.
domain: frontend-design

## Applies To
all interactive controls in an iOS app (buttons, links, toggles, tab bar selection)

## Examples
- Set the app accent color once in Assets.xcassets → AccentColor → Appearance Any/Dark.
- SwiftUI applies AccentColor automatically to all tintable controls unless overridden.
- Audit: scan all screens; interactive elements must share one consistent tint color.

## Rationale
A consistent accent color trains users to recognize interactive affordances at a glance. Multiple accent colors create ambiguity about what is tappable and weaken the visual language. iOS enforces this pattern through the global tintColor system.

## Applies To
all interactive controls in an iOS app (buttons, links, toggles, tab bar selection)
