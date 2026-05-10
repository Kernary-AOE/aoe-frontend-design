# LineLengthOptimal [check] v1.0.0
Measures rendered characters-per-line (CPL) for prose blocks and flags content that violates the 45–75 character optimal range (35–90 acceptable). Long lines harm readability; short lines fragment reading rhythm.
domain: typography

signature: (html: string, css: string, context?: object) -> CheckResult
predicate: // For every text-bearing block (<p>, <li>, article > *, [role=article])
// measure the rendered line length in CHARACTERS at the default viewport.
// Optimal: 45–75 characters per line for body prose.
// Acceptable: 35–90 characters.
// Failure: < 30 or > 95.
blocks = querySelectorAll('p, li, blockquote, article p, [role="article"] p, .prose p')
for b in blocks:
// Skip captions, labels, and inline UI text (length < 40 chars total)
if b.textContent.length < 40: continue
width  = b.getBoundingClientRect().width
fontSize  = parseFloat(getComputedStyle(b).fontSize)
// ch ≈ 0.5em for proportional fonts; use measured avg char width
avgChar = measureAvgCharWidth(b) // canvas-based
cpl = width / avgChar
if cpl < 30 || cpl > 95:
yield { selector: cssPath(b), cpl: round(cpl), fail: 'cpl-out-of-range', acceptable: '35-90', optimal: '45-75' }
else if cpl < 35 || cpl > 90:
yield { selector: cssPath(b), cpl: round(cpl), fail: 'cpl-suboptimal', optimal: '45-75', severity: 'warn' }

## Validates
@community/rule-line-length-optimal

## Severity
medium

## Failure Message Template
Block '{selector}' renders at {cpl} characters per line — outside acceptable range ({acceptable}). Constrain max-width with `max-width: 65ch` or set container width to ~720px at 18px font-size.

## Evaluation Method
automated

## Tools
- playwright
- puppeteer
- canvas

## False Positive Rate
medium

## Validates
@community/rule-line-length-optimal

## Severity
medium

## Failure Message Template
Block '{selector}' renders at {cpl} characters per line — outside acceptable range ({acceptable}). Constrain max-width with `max-width: 65ch` or set container width to ~720px at 18px font-size.

## Evaluation Method
automated

## Tools
- playwright
- puppeteer
- canvas

## False Positive Rate
medium
