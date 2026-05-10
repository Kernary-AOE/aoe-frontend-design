# ReducedMotionRequired [check] v1.0.0
Validates that any site using CSS animations/transitions also provides a @media (prefers-reduced-motion: reduce) block that effectively neutralizes motion (duration ≤ 0.01ms). Required for WCAG 2.2 SC 2.3.3 and vestibular safety.
domain: accessibility

signature: (css: string, context?: object) -> CheckResult
predicate: // Site declares any animation/transition with duration > 0?
//   → Then a @media (prefers-reduced-motion: reduce) block MUST exist
//     that disables / shortens animations to <= 0.01s.
decls = parseCSS(css)
hasMotion = decls.some(d =>
(d.property === 'transition' || d.property === 'animation' ||
d.property.startsWith('transition-') || d.property.startsWith('animation-')) &&
!/none|0s|0ms/.test(d.value)
)
if !hasMotion: return  // No motion → no requirement

rmRule = findMediaQuery(css, 'prefers-reduced-motion: reduce')
if !rmRule:
yield { fail: 'no-reduced-motion-block', remedy: 'Add @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }' }
return

// Validate the block actually neutralizes motion
rmDecls = rmRule.declarations
neutralizes = rmDecls.some(d =>
(d.property === 'animation-duration' || d.property === 'transition-duration') &&
/0(\.\d+)?(s|ms)/.test(d.value) &&
parseFloat(d.value) < 0.05
)
if !neutralizes:
yield { fail: 'reduced-motion-block-ineffective', present: true, remedy: 'set animation-duration <= 0.01ms in the reduced-motion block' }

// Detect parallax/auto-play that ignores prefers-reduced-motion
if /parallax|auto-play|autoplay/i.test(css):
if !/prefers-reduced-motion[\s\S]*animation:\s*none/.test(css):
yield { fail: 'parallax-not-disabled-on-reduce', severity: 'warn' }

## Validates
@community/rule-reduced-motion-required

## Severity
high

## Failure Message Template
Reduced-motion support missing: {fail}. {remedy}.

## Evaluation Method
automated

## Tools
- postcss
- regex
- lighthouse

## False Positive Rate
low

## Validates
@community/rule-reduced-motion-required

## Severity
high

## Failure Message Template
Reduced-motion support missing: {fail}. {remedy}.

## Evaluation Method
automated

## Tools
- postcss
- regex
- lighthouse

## False Positive Rate
low
