# BrandAccentShapes [rule] v1.0.0
> Non-text decorative shapes, icons, and graphic elements must use only the brand's defined accent colors (not the primary action color or semantic status colors), cycling through them in rotation to maintain visual interest while preserving brand cohesion.
domain: frontend-design

## Applies To
- decorative shapes, blobs, and geometric elements in brand materials
- icon fills and strokes used in illustrative (non-interactive) contexts
- background accent marks, underlines, and framing elements
- marketing illustration and hero imagery

## Counter Examples
- Using the same `--color-primary` for both decorative icons and CTA buttons — erases the signal value of primary
- Assigning success-green to a decorative check illustration on a pricing card — semantic collision
- All decorative shapes in a single accent color — monotone, no visual rhythm

## Examples
- Anthropic: decorative shapes cycle through Orange #d97757 → Blue #6a9bcc → Green #788c5d, never using the text-foreground Dark #141413 as a shape fill
- A SaaS hero section: three feature icons using three accent colors from the palette in rotation; primary CTA button uses the primary brand color only

## Rationale
Applying the primary CTA color to decorative shapes dilutes the signal value of that color — users begin to ignore it as background noise rather than action affordance. A dedicated accent rotation (e.g., orange → blue → green) fills decorative roles without competing with interactive elements. Overloading a single accent color on both decoration and interaction collapses visual hierarchy.

## Applies To
- decorative shapes, blobs, and geometric elements in brand materials
- icon fills and strokes used in illustrative (non-interactive) contexts
- background accent marks, underlines, and framing elements
- marketing illustration and hero imagery

## Counter Examples
- Using the same `--color-primary` for both decorative icons and CTA buttons — erases the signal value of primary
- Assigning success-green to a decorative check illustration on a pricing card — semantic collision
- All decorative shapes in a single accent color — monotone, no visual rhythm
