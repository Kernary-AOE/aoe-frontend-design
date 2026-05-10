# ThinWeightBody [anti-pattern] v1.0.0
Using font-weight 100–300 for body prose or UI labels at 16px and below causes illegibility on low-DPI displays, fails WCAG contrast requirements at lower contrast ratios, and reads as fragile or insubstantial to most users.
domain: frontend-design

## Label
Thin/Light Weight (100–300) for Body Text

## Why Harmful
- Hairline strokes (weight 100–200) at 16px body size become 0.5–1px rendered strokes on 1×/1.5× displays — physically indistinguishable from background at small sizes.
- Weight 200–300 on body text typically fails WCAG SC 1.4.3 AA contrast (4.5:1) when paired with muted colors — both failure modes compound.
- Most variable fonts have suboptimal hinting for ultra-light weights in the 12–18px range; rendering is inconsistent across OS rendering engines.
- Users with astigmatism, low vision, or in bright-light environments find thin-weight text nearly unreadable.

## Signal
CSS body / p / label selector with `font-weight: 100`, `font-weight: 200`, `font-weight: 300`, or `font-weight: thin`, `font-weight: extralight`, `font-weight: light`.

## Correct Alternative
Body and UI text MUST use font-weight 400 (Regular) as minimum; captions and secondary labels may use 400 but not lower. Weight 300 is acceptable ONLY for display text at 48px+ where stroke weight is large enough to render cleanly.

## Examples Of Violation
- `p { font-weight: 300; }` — light weight on paragraph text
- `label { font-weight: 200; font-size: 14px; }` — extralight UI label
- Using a typeface where the regular weight is labeled 300 (e.g., some Thin-default variable fonts configured incorrectly)

## Label
Thin/Light Weight (100–300) for Body Text

## Why Harmful
- Hairline strokes (weight 100–200) at 16px body size become 0.5–1px rendered strokes on 1×/1.5× displays — physically indistinguishable from background at small sizes.
- Weight 200–300 on body text typically fails WCAG SC 1.4.3 AA contrast (4.5:1) when paired with muted colors — both failure modes compound.
- Most variable fonts have suboptimal hinting for ultra-light weights in the 12–18px range; rendering is inconsistent across OS rendering engines.
- Users with astigmatism, low vision, or in bright-light environments find thin-weight text nearly unreadable.

## Signal
CSS body / p / label selector with `font-weight: 100`, `font-weight: 200`, `font-weight: 300`, or `font-weight: thin`, `font-weight: extralight`, `font-weight: light`.

## Correct Alternative
Body and UI text MUST use font-weight 400 (Regular) as minimum; captions and secondary labels may use 400 but not lower. Weight 300 is acceptable ONLY for display text at 48px+ where stroke weight is large enough to render cleanly.

## Examples Of Violation
- `p { font-weight: 300; }` — light weight on paragraph text
- `label { font-weight: 200; font-size: 14px; }` — extralight UI label
- Using a typeface where the regular weight is labeled 300 (e.g., some Thin-default variable fonts configured incorrectly)
