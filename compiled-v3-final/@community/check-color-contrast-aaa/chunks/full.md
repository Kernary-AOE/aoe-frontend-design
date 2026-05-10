# ColorContrastAAA [check] v1.0.0
Evaluates contrast against WCAG 2.2 SC 1.4.6 Level AAA: 7:1 for normal text, 4.5:1 for large text (≥18pt or ≥14pt bold). Stricter than AA — recommended for prose-heavy products and a11y-first brands.
domain: accessibility

signature: (fg: Color, bg: Color, fontSize: px, fontWeight: number) -> bool
predicate: // WCAG 2.2 SC 1.4.6 Level AAA:
//   - Large text (>= 18pt regular OR >= 14pt bold): 4.5:1
//   - Normal text: 7.0:1
isLarge = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700)
required = isLarge ? 4.5 : 7.0
ratio = wcag-contrast-ratio(fg, bg)
return ratio >= required

## Validates
@community/rule-color-contrast-aaa

## Severity
medium

## Failure Message Template
Color pair (fg={fg}, bg={bg}) achieves {actual_ratio}:1 — required {required}:1 for {size}pt/{weight} text at AAA level. Increase contrast or relax target to AA (4.5:1).

## Evaluation Method
automated

## Tools
- axe-core
- lighthouse
- @anthropic/claude-code

## False Positive Rate
low

## Validates
@community/rule-color-contrast-aaa

## Severity
medium

## Failure Message Template
Color pair (fg={fg}, bg={bg}) achieves {actual_ratio}:1 — required {required}:1 for {size}pt/{weight} text at AAA level. Increase contrast or relax target to AA (4.5:1).

## Evaluation Method
automated

## Tools
- axe-core
- lighthouse
- @anthropic/claude-code

## False Positive Rate
low
