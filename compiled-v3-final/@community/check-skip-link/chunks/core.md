# SkipLink [check] v1.0.0
Validates that a skip-to-main-content link is present as the first focusable element in <body>, points to an existing target (#main, #content), uses skip-pattern text, and reveals on focus.
domain: accessibility

signature: (html: string, context?: object) -> CheckResult
predicate: // 1. First focusable element inside <body> must be a skip link
//    (<a href="#main"> or <a href="#content">).
// 2. Target id must exist (#main, #content, or context.skipTarget).
// 3. Skip link is visually hidden by default but visible on :focus.
body = document.body
firstFocusable = body.querySelector('a[href], button, [tabindex]:not([tabindex="-1"])')
if !firstFocusable:
yield { fail: 'no-focusable-elements' }
return

if firstFocusable.tagName !== 'A':
yield { fail: 'first-focusable-not-link', actual: firstFocusable.tagName, selector: cssPath(firstFocusable) }
return

href = firstFocusable.getAttribute('href') || ''
if !/^#/.test(href):
yield { fail: 'first-link-not-internal', href }
return

targetId = href.slice(1)
target = document.getElementById(targetId)
if !target:
yield { fail: 'skip-target-missing', href, expected: '#main or #content' }

// Validate text content suggests "skip"
text = firstFocusable.textContent.trim().toLowerCase()
if !/skip|jump|main content/.test(text):
yield { selector: cssPath(firstFocusable), fail: 'text-not-skip-pattern', text, suggested: 'Skip to main content' }

// Validate visibility behavior: hidden by default, visible on focus
cs = getComputedStyle(firstFocusable)
csFocus = getComputedStyle(firstFocusable, ':focus')
if cs.position === 'absolute' || cs.transform.includes('translate') || cs.clip || cs.clipPath:
// Visually hidden — good
if !cs.position && csFocus.position === cs.position:
yield { selector: cssPath(firstFocusable), fail: 'no-focus-reveal', remedy: 'Reveal on :focus (e.g. top: 0)' }

## Validates
@community/rule-skip-link

## Severity
high

## Failure Message Template
Skip link check failed: {fail}. Details: {details}. Add `<a href="#main" class="sr-only focus:not-sr-only">Skip to main content</a>` as first child of <body>.

## Evaluation Method
automated + manual

## Tools
- axe-core
- playwright
- lighthouse

## False Positive Rate
medium
