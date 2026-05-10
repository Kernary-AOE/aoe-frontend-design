# HeadingHierarchyLogical [rule] v1.0.0
> Heading levels must progress sequentially (h1 → h2 → h3) mirroring visual hierarchy. Skipped heading levels (e.g. h1 → h3) are forbidden.
domain: frontend-design

## Applies To
- composing page or component structure with headings
- HTML artifact output
- accessibility audits
- any content with multiple heading levels

## Examples
- h1 (page title) → h2 (section) → h3 (subsection) — correct sequential hierarchy
- h1 per page, multiple h2 sections, h3 sub-items within h2 — valid outline

## Rationale
Screen reader users navigate by headings; skipped or reversed levels break the document outline. Assistive technologies build a virtual navigation tree from heading elements — skipped levels create gaps that make sections unreachable by heading navigation shortcuts. The DOM heading order must match the visual reading order.

## Applies To
- composing page or component structure with headings
- HTML artifact output
- accessibility audits
- any content with multiple heading levels
