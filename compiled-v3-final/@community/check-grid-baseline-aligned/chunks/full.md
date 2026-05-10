# GridBaselineAligned [check] v1.0.0
Validates vertical rhythm by checking that block gaps, heading margins, and body line-height are integer multiples of a baseline grid (4px or 8px). Off-baseline values create visual misalignment that compounds across long documents.
domain: layout

signature: (html: string, css: string, context?: object) -> CheckResult
predicate: // Block-level elements should align to a vertical baseline grid:
//   - baseline = body line-height in px (e.g. 1rem * 1.6 = 25.6px → round 24)
//   - typical baseline: 4px or 8px
// Heuristic: top edges of consecutive same-level blocks should differ by multiples of baseline.
BASELINE = context?.baseline ?? 8
topLevel = querySelectorAll('main > *, article > *, section > *, .prose > *')
prevBottom = null
for el in topLevel:
rect = el.getBoundingClientRect()
if prevBottom !== null:
gap = rect.top - prevBottom
if gap >= 0 && gap % BASELINE !== 0:
yield { selector: cssPath(el), gap, fail: 'gap-off-baseline', baseline: BASELINE }
prevBottom = rect.bottom

// Heading bottom-margin should be a multiple of baseline (h1..h3)
headings = querySelectorAll('h1, h2, h3')
for h in headings:
cs = getComputedStyle(h)
mb = parseFloat(cs.marginBottom)
if mb && mb % BASELINE !== 0:
yield { selector: cssPath(h), prop: 'margin-bottom', value: cs.marginBottom, fail: 'heading-margin-off-baseline', baseline: BASELINE }

// Line-height of body must be an integer multiple of baseline (or close)
body = document.body
bcs = getComputedStyle(body)
bfs = parseFloat(bcs.fontSize)
blh = parseFloat(bcs.lineHeight)
if blh && bfs:
if blh % BASELINE !== 0:
yield { selector: 'body', prop: 'line-height', value: blh, fail: 'body-line-height-off-baseline', baseline: BASELINE, suggested: round(blh / BASELINE) * BASELINE }

## Validates
@community/rule-grid-baseline-aligned

## Severity
low

## Failure Message Template
'{selector}' off baseline grid: {prop} = {value}px (baseline: {baseline}px). Suggested: {suggested}px.

## Evaluation Method
automated

## Tools
- playwright
- puppeteer

## False Positive Rate
high

## Validates
@community/rule-grid-baseline-aligned

## Severity
low

## Failure Message Template
'{selector}' off baseline grid: {prop} = {value}px (baseline: {baseline}px). Suggested: {suggested}px.

## Evaluation Method
automated

## Tools
- playwright
- puppeteer

## False Positive Rate
high
