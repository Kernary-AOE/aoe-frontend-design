# ColorBlacklistBrand [check] v1.0.0
Scans CSS color declarations for blacklisted default brand colors (Tailwind blue-500/600, violet-600, indigo-600, Bootstrap #007bff) that signal generic 'AI slop' aesthetic.
domain: aesthetic

signature: (css: string, context?: object) -> CheckResult
predicate: // Scan all color-bearing CSS declarations for blacklisted brand colors.
// Blacklist: pure tailwind defaults that signal "AI slop":
//   - blue-500 (#3b82f6) / blue-600 (#2563eb)
//   - violet-600 (#7c3aed) / purple-600 (#9333ea)
//   - indigo-600 (#4f46e5)
//   - the bootstrap blue #007bff
BLACKLIST_HEX = ['#3b82f6','#2563eb','#7c3aed','#9333ea','#4f46e5','#007bff','#0d6efd']
BLACKLIST_NAMED = ['blue-500','blue-600','violet-600','purple-600','indigo-600']

declarations = parseCSS(css).filter(d => /color|background|border|fill|stroke/.test(d.property))
for d in declarations:
hex = normalizeToHex(d.value)
if BLACKLIST_HEX.includes(hex):
yield { selector: d.selector, prop: d.property, value: d.value, fail: 'blacklisted-brand-hex' }
for token in BLACKLIST_NAMED:
if d.value.includes(token):
yield { selector: d.selector, prop: d.property, value: d.value, fail: 'blacklisted-tailwind-default' }

## Validates
@community/rule-color-blacklist-brand

## Severity
high

## Failure Message Template
Blacklisted brand color '{value}' found at selector '{selector}' (property: {prop}). Reason: {fail}. Replace with a custom oklch() palette derived from the brand.

## Evaluation Method
automated

## Tools
- regex
- postcss
- @anthropic/claude-code

## False Positive Rate
low
