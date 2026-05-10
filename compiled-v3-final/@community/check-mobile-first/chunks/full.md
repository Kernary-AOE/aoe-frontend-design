# MobileFirst [check] v1.0.0
Validates mobile-first responsive authoring: viewport meta tag is correct, media queries layer up via min-width (not max-width), zoom is not disabled, and no fixed widths exceed 375px in default styles.
domain: layout

signature: (css: string, html: string, context?: object) -> CheckResult
predicate: // Mobile-first authoring conventions:
//   1. Default styles (outside media queries) target mobile (small viewport).
//   2. Media queries use min-width (not max-width) to layer up.
//   3. Viewport meta tag is correct: <meta name="viewport" content="width=device-width, initial-scale=1">
//   4. No horizontal scroll at 375px viewport (no fixed widths > 375px without overflow handling).

// 1. Viewport meta
vp = querySelector('meta[name="viewport"]')
if !vp:
yield { fail: 'no-viewport-meta', remedy: 'add <meta name="viewport" content="width=device-width, initial-scale=1">' }
else:
content = vp.getAttribute('content') || ''
if !/width=device-width/.test(content):
yield { fail: 'viewport-missing-device-width', content }
if /user-scalable=no|maximum-scale=1/.test(content):
yield { fail: 'viewport-disables-zoom', content, severity: 'high', wcag: '1.4.4' }

// 2. Media query direction — count min-width vs max-width
mq = matchAll(css, /@media[^{]*\([^)]*\)/g)
minCount = mq.filter(q => /min-width/.test(q)).length
maxCount = mq.filter(q => /max-width/.test(q)).length
if maxCount > minCount && (maxCount + minCount) >= 3:
yield { fail: 'desktop-first-media-queries', minWidth: minCount, maxWidth: maxCount, remedy: 'rewrite as mobile-first using min-width breakpoints' }

// 3. Fixed pixel widths > 375 in default styles (outside media queries) cause horizontal scroll on mobile
rules = parseCSS(css).filter(r => !r.media || r.media === '')
for r in rules:
widthDecl = r.declarations.find(d => d.property === 'width' || d.property === 'min-width')
if !widthDecl: continue
px = toPx(widthDecl.value)
if px && px > 375 && !/^(max-width|width: 100%)/.test(widthDecl.value):
yield { selector: r.selector, fail: 'fixed-width-overflows-mobile', value: widthDecl.value, px }

## Validates
@community/rule-mobile-first

## Severity
high

## Failure Message Template
Mobile-first violation: {fail}. Details: {details}. {remedy}.

## Evaluation Method
automated + manual

## Tools
- postcss
- regex
- playwright
- lighthouse

## False Positive Rate
medium

## Validates
@community/rule-mobile-first

## Severity
high

## Failure Message Template
Mobile-first violation: {fail}. Details: {details}. {remedy}.

## Evaluation Method
automated + manual

## Tools
- postcss
- regex
- playwright
- lighthouse

## False Positive Rate
medium
