# TouchTargetMin [check] v1.0.0
Validates that interactive elements (buttons, links, inputs, ARIA-interactive) meet WCAG 2.2 SC 2.5.8 minimum touch target size of 24×24 CSS pixels. Warns when below the 44×44 mobile recommendation.
domain: accessibility

signature: (html: string, context?: object) -> CheckResult
predicate: // WCAG 2.2 SC 2.5.8 (Level AA): touch targets must be at least 24x24 CSS px.
// Recommended: 44x44 (Apple HIG) / 48x48 (Material).
MIN_AA = 24
RECOMMENDED = 44
interactive = querySelectorAll('button, a[href], input:not([type=hidden]), select, textarea, [role="button"], [role="link"], [role="checkbox"], [role="radio"], [role="switch"], [role="tab"], [role="menuitem"], [tabindex]:not([tabindex="-1"])')
for el in interactive:
// Skip if disabled or aria-hidden
if el.disabled || el.getAttribute('aria-hidden') === 'true': continue
// Skip inline links inside paragraph text (WCAG 2.5.8 exemption)
if el.tagName === 'A' && isInlineFlow(el) && hasTextSiblings(el): continue
rect = el.getBoundingClientRect()
// Include CSS padding via offsetWidth/Height already; account for ::before pseudo-target via larger hit area
hitW = max(rect.width, getPseudoTargetWidth(el))
hitH = max(rect.height, getPseudoTargetHeight(el))
if hitW < MIN_AA || hitH < MIN_AA:
yield { selector: cssPath(el), w: hitW, h: hitH, fail: 'below-aa-min', required: MIN_AA }
else if hitW < RECOMMENDED || hitH < RECOMMENDED:
yield { selector: cssPath(el), w: hitW, h: hitH, fail: 'below-recommended', recommended: RECOMMENDED, severity: 'warn' }

## Validates
@community/rule-touch-target-min

## Severity
high

## Failure Message Template
Interactive element '{selector}' has hit area {w}×{h}px — below WCAG 2.2 minimum {required}×{required}px. Increase padding or add an ::before overlay to expand the hit target.

## Evaluation Method
automated

## Tools
- axe-core
- playwright
- lighthouse

## False Positive Rate
low

## Validates
@community/rule-touch-target-min

## Severity
high

## Failure Message Template
Interactive element '{selector}' has hit area {w}×{h}px — below WCAG 2.2 minimum {required}×{required}px. Increase padding or add an ::before overlay to expand the hit target.

## Evaluation Method
automated

## Tools
- axe-core
- playwright
- lighthouse

## False Positive Rate
low
