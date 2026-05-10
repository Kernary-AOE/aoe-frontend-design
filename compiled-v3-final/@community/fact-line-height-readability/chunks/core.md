# LineHeightReadability [fact] v1.0.0
Body line-height between 1.5 and 1.7 produces the most legible reading rhythm for prose; tighter (≤1.3) crowds ascenders into descenders, looser (≥1.8) breaks the reader's vertical tracking between lines.
> Optimal line-height for body prose is in the 1.5–1.7 range (unitless multiplier of font-size), with editorial / long-form content tending toward 1.6–1.7 and dense UI body text tending toward 1.4–1.5; values below 1.3 cause ascender / descender collisions and values above 1.8 break inter-line continuity.

## Confidence
strong

## Applies To
- body / paragraph CSS line-height
- type-scale design (each step gets matched line-height)
- WCAG 2.2 text-spacing compliance (SC 1.4.12)
- responsive type: line-height may tighten slightly at larger font-sizes

## Quantitative
- **Body Prose Range**: 1.5–1.7
- **Editorial Target**: 1.6–1.7
- **Dense Ui Target**: 1.4–1.5
- **Headline Target**: 1.1–1.3 (tighter — display sizes need less leading)
- **Wcag Floor**: 1.5 (SC 1.4.12, minimum for paragraphs to support user style overrides)

## Counter Conditions
- CJK / Indic / Arabic typography has different optical needs — ranges shift.
- Tight UI density (Linear, Notion sidebars) may legitimately use 1.3–1.4 line-height for compact lists.
- Display-size headlines need lower multipliers (1.0–1.2) because the absolute leading is already large.
