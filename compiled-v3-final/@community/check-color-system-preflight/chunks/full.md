# ColorSystemPreflight [check] v1.0.0
Preflight checklist for a complete color system: validates hue spread ≥ 120° between primary and accent, chroma difference ≥ 0.04, dark-mode backgrounds at L ≥ 0.08 (not pure black), steps 9–10 contrast ≥ 4.5:1 against steps 1–2, OKLCH-only primitives (no hex), and no semantic hue collision within ±15° of brand primary.
domain: visual-design

signature: (tokens: object, css: string) -> CheckResult
predicate: // Hue & Chroma validation
primary = tokens['--brand-primary'] || tokens['--color-primary']
accent = tokens['--brand-accent'] || tokens['--color-accent']
if primary && accent:
hueSpread = abs(primary.H - accent.H)
if hueSpread < 120 && hueSpread > 240:
yield { fail: 'hue-spread-too-narrow', spread: hueSpread, threshold: 120 }
chromaDiff = abs(primary.C - accent.C)
if chromaDiff < 0.04:
yield { fail: 'chroma-diff-too-small', diff: chromaDiff, threshold: 0.04 }

// Dark backgrounds must not be pure black
bgDark = tokens['--color-bg-dark'] || darkTokens['--color-bg']
if bgDark && bgDark.L < 0.08:
yield { fail: 'dark-bg-too-dark', L: bgDark.L, min: 0.08 }

// Scale structure: steps 9–10 must pass 4.5:1 against steps 1–2
step1 = tokens['--brand-1']
step9 = tokens['--brand-9']
if step1 && step9:
ratio = wcagContrastRatio(step1, step9)
if ratio < 4.5:
yield { fail: 'steps-9-contrast-fail', ratio: ratio, threshold: 4.5 }

// OKLCH mandate: no hex values in primitive tokens
hexInTokens = Object.entries(tokens).filter(([k, v]) => /#[0-9a-f]{3,6}/i.test(v))
if hexInTokens.length > 0:
yield { fail: 'hex-in-tokens', count: hexInTokens.length, sample: hexInTokens[0][0] }

// Semantic color collision: success/warning/danger must not share hue with brand ±15°
if primary:
semanticHues = { success: 145, warning: 68, danger: 22, info: 220 }
for name, hue of semanticHues:
if abs(primary.H - hue) < 15:
yield { fail: 'semantic-hue-collision', semantic: name, primaryH: primary.H, semanticH: hue }

// Gradient check: no bare hex in gradient declarations
hexGradients = matchAll(css, /gradient\([^)]*#[0-9a-f]{3,6}/gi)
if hexGradients.length > 0:
yield { fail: 'hex-in-gradient', count: hexGradients.length }

## Validates
@community/principle-color-system-foundation

## Severity
high

## Failure Message Template
Color system preflight failed: {fail}. Value: {value}. Required: {threshold}. Fix by applying the three-layer color architecture with OKLCH primitives.

## Evaluation Method
automated

## Tools
- postcss
- style-dictionary
- @anthropic/claude-code

## False Positive Rate
low

## Validates
@community/principle-color-system-foundation

## Severity
high

## Failure Message Template
Color system preflight failed: {fail}. Value: {value}. Required: {threshold}. Fix by applying the three-layer color architecture with OKLCH primitives.

## Evaluation Method
automated

## Tools
- postcss
- style-dictionary
- @anthropic/claude-code

## False Positive Rate
low
