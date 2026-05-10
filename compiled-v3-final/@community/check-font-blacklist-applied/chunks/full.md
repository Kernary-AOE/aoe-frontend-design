# FontBlacklistApplied [check] v1.0.0
Detects blacklisted default font-families (Arial, Helvetica, Times New Roman, Comic Sans, Papyrus, Courier New) used as PRIMARY font, and detects sites that load no custom fonts at all (signaling lack of typographic care).
domain: typography

signature: (css: string, html: string, context?: object) -> CheckResult
predicate: // Blacklisted font-family stacks (signal "AI default" aesthetic):
BLACKLIST = [
'Comic Sans MS',
'Papyrus',
'Times New Roman',          // raw — system Times is fine, Times New Roman explicit is dated
'Arial',                    // when used alone without sans-serif fallback chain
'Helvetica',                // when used alone — modern stacks use Inter/SF
'Courier New',
]
// Also blacklist: any -apple-system-only stack with no custom font (signals "no design taste")
fontDecls = parseCSS(css).filter(d => d.property === 'font-family' || d.property === 'font')
for d in fontDecls:
stack = parseFontStack(d.value)
for f in stack.fonts:
for bad in BLACKLIST:
if f.toLowerCase() === bad.toLowerCase():
// Check if it's only the fallback (last in stack) — that's allowed
if stack.fonts.indexOf(f) === 0:
yield { selector: d.selector, value: d.value, fail: 'blacklisted-primary-font', font: f }

// Detect "no @font-face declared anywhere" → site relies on system defaults only
hasFontFace = /@font-face\s*\{/.test(css)
hasGoogleFonts = /fonts\.googleapis\.com|fonts\.bunny\.net/.test(html)
hasLocalFonts = /url\(['"]?[^)]*\.(woff2?|ttf|otf)/.test(css)
if !hasFontFace && !hasGoogleFonts && !hasLocalFonts:
yield { fail: 'no-custom-font-loaded', remedy: 'Load a custom display + body font pair' }

## Validates
@community/rule-font-blacklist-applied

## Severity
medium

## Failure Message Template
Selector '{selector}' uses blacklisted primary font '{font}' (declaration: {value}). Replace with a custom display/body pair (e.g. Inter + Source Serif, or Geist + Newsreader).

## Evaluation Method
automated

## Tools
- regex
- postcss
- @anthropic/claude-code

## False Positive Rate
low

## Validates
@community/rule-font-blacklist-applied

## Severity
medium

## Failure Message Template
Selector '{selector}' uses blacklisted primary font '{font}' (declaration: {value}). Replace with a custom display/body pair (e.g. Inter + Source Serif, or Geist + Newsreader).

## Evaluation Method
automated

## Tools
- regex
- postcss
- @anthropic/claude-code

## False Positive Rate
low
