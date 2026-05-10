# WhiteSpaceAsDesignElement [principle] v1.0.0
> White space (negative space) is an active design element, not wasted space. Generous padding around elements communicates quality, focus, and hierarchy. The rule: start with too much white space and reduce, not the reverse — over-spacing reveals hierarchy issues; under-spacing conceals them.
domain: frontend-design

## Applies To
- frontend-design
- landing-pages
- design-systems
- marketing-sites

## Practical Rules
- Padding inside a container must be >= padding between items inside it (Rule 6 of Hobday safe rules).
- Section-level spacing must be 4× item-level spacing minimum (see principle-vertical-rhythm).
- When in doubt between two spacing values, choose the larger one.
- White space is not empty — it separates, groups, and emphasizes without adding visual elements.
- Tight spacing is appropriate for dense data applications (tables, logs); never for marketing or onboarding.

## Examples
- Marketing hero: padding-block: 128px — content floats; feels premium
- SaaS dashboard: padding: 24px — functional density balanced with breathing room
- Data table: padding: 8px 12px per cell — maximum density without merging rows visually
- Bad: form fields with 4px gap between them — inputs appear merged into one blob
- Good: form fields with 16px gap, field groups with 32px gap — hierarchy is readable

## Rationale
Cramped interfaces signal low quality and make content harder to scan. White space reduces visual noise, creates implicit grouping (Gestalt proximity), and gives important elements room to 'breathe' — making them stand out without added decoration. Designs that look cheap are almost always under-spaced, not over-designed.
