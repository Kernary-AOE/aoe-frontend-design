# CanvasVisualTextRatio [rule] v1.0.0
> Static art and poster outputs must allocate approximately 90% of their composition to visual design and at most 10% to text. Outputs with text above 25% of composition area are rejected — they are documents, not art.
domain: frontend-design

## Severity
warning

## Applies When
Generating any .pdf or .png canvas art or poster.

## Thresholds
- **Pass**: text <= 10%
- **Warn**: text 10-25%
- **Block**: text > 25%
