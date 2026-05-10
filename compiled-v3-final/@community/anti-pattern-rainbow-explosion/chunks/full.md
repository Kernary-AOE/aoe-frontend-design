# RainbowExplosion [anti-pattern] v1.0.0
Applying five or more distinct hue families (e.g., red badges, orange warnings, yellow highlights, green successes, blue links, purple headings, teal cards) in a single product UI without a systematic hierarchy — producing a carnival aesthetic that destroys visual hierarchy and brand identity.
domain: visual-design

## Label
Rainbow Explosion — Using 5+ Distinct Hues in a Single UI

## Trap
Color feels like a free resource. Adding a new hue to differentiate a new element costs nothing in CSS and feels like solving a design problem with color. AI agents are particularly susceptible to this — when asked to 'make it visually distinct,' they reach for a new hue. After 3–4 feature additions, the UI has 8 hues with no hierarchy and no brand memory.

## Detection Heuristics
- More than 7 semantic color roles in the token system (excluding data-viz categorical palettes)
- Hue count in rendered components exceeds 5 distinct families (±30° tolerance per family)
- No single hue appears on more than 2 component types — no dominant brand color
- Feature sections each have their own accent color with no shared palette relationship
- Status colors (success/warning/danger/info) appear in decorative contexts outside of feedback UI

## Remediation
- Reduce to one primary brand hue + one accent hue with ≥ 120° spread. Everything else is neutral.
- Map all semantic roles to the 7-role constraint: bg, surface, border, text, text-muted, primary, accent.
- Status colors (success/warning/danger/info) belong in a separate status namespace — never as decorative elements.
- Use lightness and chroma variation within one hue family to create differentiation without new hues.
- Audit with @community/check-color-system-preflight to count role-layer tokens.

## Severity
high

## Label
Rainbow Explosion — Using 5+ Distinct Hues in a Single UI

## Trap
Color feels like a free resource. Adding a new hue to differentiate a new element costs nothing in CSS and feels like solving a design problem with color. AI agents are particularly susceptible to this — when asked to 'make it visually distinct,' they reach for a new hue. After 3–4 feature additions, the UI has 8 hues with no hierarchy and no brand memory.

## Detection Heuristics
- More than 7 semantic color roles in the token system (excluding data-viz categorical palettes)
- Hue count in rendered components exceeds 5 distinct families (±30° tolerance per family)
- No single hue appears on more than 2 component types — no dominant brand color
- Feature sections each have their own accent color with no shared palette relationship
- Status colors (success/warning/danger/info) appear in decorative contexts outside of feedback UI

## Remediation
- Reduce to one primary brand hue + one accent hue with ≥ 120° spread. Everything else is neutral.
- Map all semantic roles to the 7-role constraint: bg, surface, border, text, text-muted, primary, accent.
- Status colors (success/warning/danger/info) belong in a separate status namespace — never as decorative elements.
- Use lightness and chroma variation within one hue family to create differentiation without new hues.
- Audit with @community/check-color-system-preflight to count role-layer tokens.

## Severity
high
