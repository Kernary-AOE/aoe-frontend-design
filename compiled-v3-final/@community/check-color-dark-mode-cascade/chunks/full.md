# ColorDarkModeCascade [check] v1.0.0
Validates that dark-mode color theming is implemented as a single token-layer cascade (light tokens at :root, dark overrides at :root.dark) rather than scattered dark: utilities or component-level color forks.
domain: aesthetic

signature: (css: string, context?: object) -> CheckResult
predicate: // Dark mode must be a single :root.dark (or [data-theme="dark"]) override block
// that re-defines ONLY the semantic token layer — not raw component styles.
// Anti-pattern: dark:bg-* utilities sprinkled across components.
rootLight = findRule(css, ':root')
rootDark  = findRule(css, ':root.dark, [data-theme="dark"]')

if !rootLight: yield { fail: 'no-root-light' }
if !rootDark:  yield { fail: 'no-root-dark' }

if rootLight && rootDark:
lightTokens = rootLight.declarations.filter(d => d.property.startsWith('--'))
darkTokens  = rootDark.declarations.filter(d => d.property.startsWith('--'))
missing = lightTokens.map(t => t.property).filter(p => !darkTokens.find(d => d.property === p))
if missing.length > 0:
yield { fail: 'dark-missing-tokens', tokens: missing }

// Anti-pattern: dark: utilities outside of root override
darkUtils = matchAll(css, /\.dark\\:[a-z-]+/g)
if darkUtils.length > 50:
yield { fail: 'dark-utility-spread', count: darkUtils.length, threshold: 50 }

// Component CSS rules referencing oklch() directly outside :root → bypass cascade
nonRootOklch = parseCSS(css).filter(d => /oklch\(/.test(d.value) && !/^:root/.test(d.selector))
if nonRootOklch.length > 0:
yield { fail: 'oklch-outside-root', count: nonRootOklch.length, sample: nonRootOklch[0].selector }

## Validates
@community/rule-color-dark-mode-cascade

## Severity
medium

## Failure Message Template
Dark-mode cascade violation: {fail}. Details: {details}. Refactor so :root defines all --color-* tokens and :root.dark only re-defines the same tokens.

## Evaluation Method
automated

## Tools
- postcss
- regex
- @anthropic/claude-code

## False Positive Rate
medium

## Validates
@community/rule-color-dark-mode-cascade

## Severity
medium

## Failure Message Template
Dark-mode cascade violation: {fail}. Details: {details}. Refactor so :root defines all --color-* tokens and :root.dark only re-defines the same tokens.

## Evaluation Method
automated

## Tools
- postcss
- regex
- @anthropic/claude-code

## False Positive Rate
medium
