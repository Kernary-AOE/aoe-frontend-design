# ContentWidthConstrained [check] v1.0.0
Validates that main content containers constrain max-width to keep prose readable: ≤ 720px (~75ch) for prose, ≤ 1280px for general content. Unconstrained containers stretch text across full 1440+ viewports, breaking the 45–75 CPL rule.
domain: layout

signature: (html: string, css: string, context?: object) -> CheckResult
predicate: // Main content containers (<main>, <article>, .prose, .container) must constrain width
// to keep prose readable at large viewports.
//   - Prose: max-width <= 75ch (~720px at 18px)
//   - General content: max-width <= 1280px
//   - Full-bleed sections (hero, banner) are exempt — detected via class hint or explicit width: 100%
PROSE_MAX_PX = 720
CONTENT_MAX_PX = 1280
containers = querySelectorAll('main, article, .prose, .container, [role="main"], [role="article"]')
for c in containers:
cs = getComputedStyle(c)
maxWidth = cs.maxWidth
if maxWidth === 'none':
rect = c.getBoundingClientRect()
viewport = window.innerWidth
// Container fills viewport at large screens — likely needs constraint
if viewport >= 1440 && rect.width > 1400:
// Check if it has class indicating full-bleed
if /full-bleed|hero|banner/.test(c.className): continue
yield { selector: cssPath(c), fail: 'no-max-width-constraint', width: rect.width, suggested: CONTENT_MAX_PX }
continue
maxPx = parseFloat(maxWidth)
if maxWidth.endsWith('ch'):
// Convert ch → px using font-size
fs = parseFloat(cs.fontSize)
maxPx = parseFloat(maxWidth) * fs * 0.5

// Prose containers should be tighter
isProse = /prose|article/.test(c.className) || c.tagName === 'ARTICLE'
limit = isProse ? PROSE_MAX_PX : CONTENT_MAX_PX
if maxPx > limit:
yield { selector: cssPath(c), fail: 'max-width-too-wide', actual: maxPx, max: limit, isProse }

## Validates
@community/rule-content-width-constrained

## Severity
medium

## Failure Message Template
Container '{selector}' is {actual}px wide — exceeds {max}px max. Add `max-width: {max}px; margin-inline: auto;` (or `max-width: 65ch` for prose).

## Evaluation Method
automated

## Tools
- playwright
- puppeteer
- postcss

## False Positive Rate
medium
