# LinkPurposeClear [check] v1.0.0
Validates link text is descriptive enough to convey purpose without surrounding context (WCAG 2.4.4 / 2.4.9). Flags generic phrases ('click here', 'read more'), raw URLs as text, and same-text links pointing to different destinations.
domain: accessibility

signature: (html: string, context?: object) -> CheckResult
predicate: // WCAG 2.4.4: Link purpose must be determinable from link text alone (or with programmatically determined context).
// Reject generic link text:
GENERIC = ['click here', 'click', 'here', 'read more', 'more', 'learn more', 'this', 'this link', 'link', 'go', 'continue', 'see more', '更多', '点击', '点这里']
links = querySelectorAll('a[href]')
for a in links:
text = (computeAccessibleName(a) || a.textContent).trim().toLowerCase()
if text === '':
// Empty link — caught by check-aria-label-required, skip here
continue
if GENERIC.includes(text):
// Acceptable IF surrounding context provides clarity AND aria-label/aria-labelledby fills it
ariaLabel = a.getAttribute('aria-label')
if ariaLabel && ariaLabel.trim().length > text.length + 3:
continue
yield { selector: cssPath(a), text, fail: 'generic-link-text', remedy: 'replace with descriptive text or add aria-label' }

// 2. Multiple links with identical text but different hrefs
// (handled in batch — group by text, check distinct href set)
// Pseudocode: see batch logic below.

// 3. URLs as link text — bad UX
if /^https?:\/\//.test(text) && text.length > 30:
yield { selector: cssPath(a), text, fail: 'url-as-text', remedy: 'use descriptive text for the URL' }

// Batch: same-text different-href
grouped = groupBy(links, l => (computeAccessibleName(l) || l.textContent).trim().toLowerCase())
for [text, group] in grouped:
if group.length < 2: continue
hrefs = new Set(group.map(g => g.getAttribute('href')))
if hrefs.size > 1:
yield { fail: 'duplicate-link-text-different-targets', text, count: group.length, hrefs: [...hrefs] }

## Validates
@community/rule-link-purpose-clear

## Severity
medium

## Failure Message Template
Link '{selector}' has generic/ambiguous text '{text}': {fail}. {remedy}.

## Evaluation Method
automated

## Tools
- axe-core
- lighthouse
- @anthropic/claude-code

## False Positive Rate
medium

## Validates
@community/rule-link-purpose-clear

## Severity
medium

## Failure Message Template
Link '{selector}' has generic/ambiguous text '{text}': {fail}. {remedy}.

## Evaluation Method
automated

## Tools
- axe-core
- lighthouse
- @anthropic/claude-code

## False Positive Rate
medium
