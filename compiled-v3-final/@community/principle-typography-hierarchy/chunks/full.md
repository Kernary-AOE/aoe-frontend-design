# TypographyHierarchy [principle] v1.0.0
> Preserve clear typographic hierarchy so headings dominate body, and captions or metadata remain distinct but legible. Headings, body text, and metadata must be typographically differentiated so users can scan structure — uniform text flattens hierarchy and increases cognitive load.
domain: frontend-design

## Applies To
- typography
- component-styling
- content-layout
- ui

## Counter Examples
- All text at 14px regular — no heading hierarchy visible
- Using only color (no size or weight) to distinguish heading from body
- Uniform 16px medium weight for H2, H3, body, and labels — cognitive scan fails

## Examples
- H1 at 2.5rem bold, body at 1rem regular, caption at 0.875rem text-muted — three distinct levels
- Card with title (1.25rem semibold), description (0.875rem muted), metadata (0.75rem uppercase tracked)

## Rationale
Consistent size and weight relationships let users scan content structure instead of reading linearly. When every text element is the same weight, size, and color, readers must parse the full text to understand structure. Typographic differentiation makes structure legible at a glance — the same way whitespace communicates grouping without requiring dividers.
