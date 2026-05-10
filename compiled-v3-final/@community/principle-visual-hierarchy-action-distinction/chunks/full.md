# VisualHierarchyActionDistinction [principle] v1.0.0
> Primary and secondary actions must differ visually across at least two dimensions — typically fill (solid vs transparent/outline), color emphasis (accent vs neutral), and font weight (semibold vs normal) — so users can identify the intended next step at a glance without reading every label.
domain: frontend-design

## Applies To
- ui
- button-design
- form-design
- call-to-action

## Differentiation Dimensions
- Fill: primary = solid filled background; secondary = outline or ghost
- Color: primary = accent/brand color; secondary = neutral border or muted bg
- Weight: primary label = font-weight: 600; secondary label = font-weight: 400
- Size: primary = lg (h-10); secondary = default (h-9) — size alone is not sufficient

## Examples
- Good: [Save changes — solid accent filled] vs [Cancel — ghost/transparent]
- Good: [Publish — primary solid] vs [Save draft — outline] vs [Discard — ghost text]
- Bad: [Save] vs [Cancel] — both solid with different labels but same visual weight
- Bad: [Delete] vs [Cancel] — both red and filled (two destructive-looking buttons)

## Rationale
Indistinguishable actions create decision paralysis and increase error rates. When a 'Save' button and a 'Cancel' button look identical (same fill, same border, same size), users must read both labels before acting. Adding a second visual dimension — fill + color — makes the primary action instantly distinguishable. This is not decoration; it reduces cognitive overhead on every interaction.
