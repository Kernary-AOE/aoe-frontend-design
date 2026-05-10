# HeadingHierarchy [check] v1.0.0
Validates that heading levels (h1–h6) form a logical hierarchy: exactly one h1, no skipped levels (e.g. h2 → h4), and no empty headings. Required for screen-reader navigation (WCAG 2.4.6, 2.4.10).
domain: accessibility

signature: (html: string, context?: object) -> CheckResult
predicate: // 1. Exactly one <h1> per page (or per <main>).
// 2. No level skipped: an h3 cannot follow an h1 without an h2 between.
// 3. Heading order in DOM matches reading order (no h2 after h3 in same section).
headings = querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]')
h1s = headings.filter(h => level(h) === 1)
if h1s.length === 0:
yield { fail: 'no-h1' }
else if h1s.length > 1:
yield { fail: 'multiple-h1', count: h1s.length, selectors: h1s.map(cssPath) }

prevLevel = 0
for h in headings:
lvl = level(h) // 1..6
if prevLevel > 0 && lvl > prevLevel + 1:
yield { selector: cssPath(h), fail: 'level-skipped', from: prevLevel, to: lvl }
prevLevel = lvl

// Empty headings
for h in headings:
if h.textContent.trim() === '' && !h.getAttribute('aria-label'):
yield { selector: cssPath(h), fail: 'empty-heading' }

## Validates
@community/rule-heading-hierarchy

## Severity
high

## Failure Message Template
Heading hierarchy violation at '{selector}': {fail}. Details: from h{from} to h{to} (skipped level). Insert intermediate heading or demote the offending heading.

## Evaluation Method
automated

## Tools
- axe-core
- lighthouse
- @anthropic/claude-code

## False Positive Rate
low
