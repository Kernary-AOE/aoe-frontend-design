# BodyReadability [check] v1.0.0
Verifies body prose meets readability requirements: 16px+ font-size, 1.5–1.7 line-height, letter-spacing within ±0.025em, and font-weight 400–500. Based on Butterick + Bringhurst typographic conventions.
domain: typography

signature: (html: string, css: string, context?: object) -> CheckResult
predicate: // Body prose readability:
//   1. font-size >= 16px on body (or root prose container)
//   2. line-height between 1.5 and 1.7 (unitless)
//   3. letter-spacing between -0.011em and 0.025em
//   4. font-weight in [400, 500] for body (no thin 100-300 prose)
proseSelectors = ['body', 'article', '.prose', '[role="article"]', 'main p']
for sel in proseSelectors:
el = querySelector(sel)
if !el: continue
cs = getComputedStyle(el)
fs = parseFloat(cs.fontSize)
lh = parseFloat(cs.lineHeight) / fs  // normalize to unitless
ls = cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing) / fs
fw = parseInt(cs.fontWeight, 10)

if fs < 16:
yield { selector: sel, fail: 'font-size-too-small', actual: fs, required: 16 }
if lh < 1.5 || lh > 1.7:
yield { selector: sel, fail: 'line-height-out-of-range', actual: round(lh, 2), required: '1.5-1.7' }
if ls < -0.011 || ls > 0.025:
yield { selector: sel, fail: 'letter-spacing-out-of-range', actual: ls, required: '-0.011em to 0.025em' }
if fw < 400 || fw > 500:
yield { selector: sel, fail: 'font-weight-not-body', actual: fw, required: '400-500' }

## Validates
@community/rule-body-readability

## Severity
medium

## Failure Message Template
Prose '{selector}' fails readability: {fail}. Actual: {actual}, required: {required}. Adjust body CSS — typically `font-size: 1rem; line-height: 1.6; letter-spacing: 0;`.

## Evaluation Method
automated

## Tools
- playwright
- puppeteer
- @anthropic/claude-code

## False Positive Rate
low

## Validates
@community/rule-body-readability

## Severity
medium

## Failure Message Template
Prose '{selector}' fails readability: {fail}. Actual: {actual}, required: {required}. Adjust body CSS — typically `font-size: 1rem; line-height: 1.6; letter-spacing: 0;`.

## Evaluation Method
automated

## Tools
- playwright
- puppeteer
- @anthropic/claude-code

## False Positive Rate
low
