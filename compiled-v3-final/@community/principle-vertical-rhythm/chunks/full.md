# VerticalRhythm [principle] v1.0.0
> Spacing between sections must be greater than spacing between items within a section. Differentiated spacing communicates containment and hierarchy to users without requiring explicit borders or dividers.
domain: frontend-design

## Applies To
- frontend-design
- design-systems

## Counter Examples
- Every margin set to 16px regardless of whether it separates items or sections
- Using border-bottom: 1px solid to create section separation instead of spacing
- Identical gap between all heading levels and their following content

## Examples
- Section margin-top: 64px; item gap within section: 16px — ratio 4:1, clear grouping
- Form with 24px between fields (within group) and 48px between field groups — double-gap rule
- Card grid: 8px gap between cards in a row, 32px between section headers and card rows

## Rationale
Vertical rhythm creates visual grouping through proximity — a direct application of Gestalt law of proximity. When section-level gaps match item-level gaps, the content reads as an undifferentiated list. When section gaps exceed item gaps, the eye naturally groups nearby items and perceives section breaks without needing dividers or background color changes. This reduces visual noise and creates cleaner layouts.
