# ContrastAA [check] v1.0.0
Evaluates whether the contrast ratio between foreground text color and background color meets WCAG 2.2 SC 1.4.3 Level AA. Large text (≥ 18pt regular or ≥ 14pt bold) requires 3:1; normal text requires 4.5:1.
domain: accessibility

signature: (fg: Color, bg: Color, fontSize: px, fontWeight: number) -> bool
predicate: wcag-contrast-ratio(fg, bg) >= (fontSize >= 18 OR (fontSize >= 14 AND fontWeight >= 700) ? 3.0 : 4.5)

## Evidence
@w3c/fact-wcag-contrast-aa

## Uses Metric
@community/metric-contrast-ratio

## Severity
block

## Failure Message
Color pair ({fg}, {bg}) achieves {actual_ratio}:1 — required {required}:1 for {size}pt/{weight} text. Change fg or bg to meet minimum.

## Exemptions
- Decorative text (no informational content, aria-hidden=true)
- Logo / wordmark text (brand exemption per WCAG 1.4.3)
- Disabled UI controls (visually grayed-out, not interactive)

## Evidence
@w3c/fact-wcag-contrast-aa

## Uses Metric
@community/metric-contrast-ratio

## Severity
block

## Failure Message
Color pair ({fg}, {bg}) achieves {actual_ratio}:1 — required {required}:1 for {size}pt/{weight} text. Change fg or bg to meet minimum.

## Exemptions
- Decorative text (no informational content, aria-hidden=true)
- Logo / wordmark text (brand exemption per WCAG 1.4.3)
- Disabled UI controls (visually grayed-out, not interactive)
