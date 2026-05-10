# ColorOklchRequired [check] v1.0.0
Verifies that every color-bearing CSS property uses the oklch() function (directly or via a CSS custom property that resolves to oklch()). Rejects hex, rgb(), hsl(), and named colors.
domain: aesthetic

signature: (css: string, context?: object) -> CheckResult
predicate: // Every color declaration must use oklch() (or var() referencing an oklch token).
// Disallowed: hex, rgb(), rgba(), hsl(), named colors.
declarations = parseCSS(css).filter(d => /^(color|background-color|border-color|outline-color|fill|stroke|text-decoration-color)$/.test(d.property))
for d in declarations:
val = d.value.trim().toLowerCase()
if /^var\(--/.test(val):
token = resolveVar(val)
if !/^oklch\(/.test(token):
yield { selector: d.selector, prop: d.property, value: d.value, fail: 'var-resolves-non-oklch', resolved: token }
continue
if /^oklch\(/.test(val): continue
if /^(transparent|currentcolor|inherit|initial|unset|none)$/.test(val): continue
// Anything else (#hex, rgb, hsl, named) is a violation
yield { selector: d.selector, prop: d.property, value: d.value, fail: 'non-oklch-color' }

## Validates
@community/rule-color-oklch-required

## Severity
high

## Failure Message Template
Selector '{selector}' uses non-oklch color '{value}' on property '{prop}'. Convert to oklch() — e.g. transform-rgb-to-oklch({value}). Resolved token: {resolved}.

## Evaluation Method
automated

## Tools
- postcss
- regex
- @anthropic/claude-code

## False Positive Rate
low
