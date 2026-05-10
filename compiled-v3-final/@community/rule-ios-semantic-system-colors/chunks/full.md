# IosSemanticSystemColors [rule] v1.0.0
> Use iOS semantic system colors — Color.primary, Color.secondary, Color(UIColor.systemBackground), Color(UIColor.label), etc. — rather than hardcoded hex or named colors for all text and backgrounds.
domain: frontend-design

## Applies To
all foreground and background color assignments in iOS UI elements

## Examples
- Text: Color.primary (black in light, white in dark), Color.secondary (grey in both).
- Backgrounds: Color(UIColor.systemBackground) for primary surface, Color(UIColor.secondarySystemBackground) for cards.
- Destructive: Color.red → use Color(UIColor.systemRed) which also adapts to high-contrast mode.
- Verify: toggle between light and dark mode; all text and surfaces remain legible without inversion artifacts.

## Rationale
Hardcoded colors like .black or .white become invisible or glaring when the system appearance changes. Semantic system colors adapt automatically to light, dark, and high-contrast appearances without any extra code.

## Applies To
all foreground and background color assignments in iOS UI elements
