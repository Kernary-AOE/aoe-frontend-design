# FocusVisibleStyled [check] v1.0.0
Validates that focus-visible styling is intentional and tokenized (uses CSS custom properties, has outline-offset or box-shadow spread, and is not suppressed by an unreplaced global outline:none reset). Goes beyond mere existence — checks design quality.
domain: accessibility

signature: (css: string, html: string, context?: object) -> CheckResult
predicate: // Beyond the basic check-focus-visible (which verifies a ring exists with 3:1 contrast),
// this check verifies the focus ring is INTENTIONALLY STYLED — not just a default UA outline.
//
// Pass criteria:
//   1. A :focus-visible rule exists somewhere in the cascade.
//   2. Ring style includes outline-offset >= 2px OR a box-shadow ring with spread.
//   3. Ring color is from the design token layer (var(--ring) or var(--color-*)) — not a hardcoded color.
//   4. NOT suppressed by a global `*:focus { outline: none }` reset that lacks a :focus-visible replacement.
rules = parseCSS(css)

// Detect global focus suppression
suppressors = rules.filter(r => /^(\*|:focus|button:focus|a:focus|input:focus|.*:focus)$/.test(r.selector))
.filter(r => r.declarations.find(d => d.property === 'outline' && /none|0( |;|$)/.test(d.value)))
fvReplaces = rules.filter(r => /:focus-visible/.test(r.selector))
if suppressors.length > 0 && fvReplaces.length === 0:
yield { fail: 'outline-suppressed-no-replacement', suppressors: suppressors.map(s => s.selector) }

// For each :focus-visible rule, verify quality
for r in fvReplaces:
hasOffset = r.declarations.find(d => d.property === 'outline-offset' && parseFloat(d.value) >= 2)
hasShadow = r.declarations.find(d => d.property === 'box-shadow' && /\d+px\s+\d+px/.test(d.value))
if !hasOffset && !hasShadow:
yield { selector: r.selector, fail: 'no-offset-or-shadow', remedy: 'add outline-offset: 2px or use a box-shadow ring' }

// Color must be tokenized
colorDecl = r.declarations.find(d => d.property === 'outline-color' || d.property === 'outline')
if colorDecl && !/var\(--/.test(colorDecl.value):
yield { selector: r.selector, fail: 'hardcoded-ring-color', value: colorDecl.value }

## Validates
@community/check-focus-visible-styled

## Severity
high

## Failure Message Template
Focus-visible styling fails at '{selector}': {fail}. Details: {details}. Define a :focus-visible rule with `outline: 2px solid var(--ring); outline-offset: 2px;` using a tokenized color.

## Evaluation Method
automated

## Tools
- postcss
- playwright
- axe-core

## False Positive Rate
medium

## Validates
@community/check-focus-visible-styled

## Severity
high

## Failure Message Template
Focus-visible styling fails at '{selector}': {fail}. Details: {details}. Define a :focus-visible rule with `outline: 2px solid var(--ring); outline-offset: 2px;` using a tokenized color.

## Evaluation Method
automated

## Tools
- postcss
- playwright
- axe-core

## False Positive Rate
medium
