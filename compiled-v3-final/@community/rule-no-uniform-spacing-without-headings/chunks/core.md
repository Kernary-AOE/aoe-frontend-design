# NoUniformSpacingWithoutHeadings [rule] v1.0.0
Unrelated content blocks must not use identical spacing between them when no heading or visual separator distinguishes their boundaries — spacing variation is itself a structural signal, and uniform spacing creates an undifferentiated wall of content.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
warning

## Spacing Ratio
Inter-section gap ≥ 1.5× intra-section gap. A common scale: 16px within a section, 48–80px between sections.

## Remediation
- Audit margins: identify cases where consecutive sections share identical top/bottom margins.
- Either add section headings (h2/h3) or increase the gap between unrelated blocks.
- Use a spacing scale (8, 16, 24, 32, 48, 64, 80, 96) and reserve the larger values for inter-section gaps.
