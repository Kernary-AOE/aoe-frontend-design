# ImageOptimization [check] v1.0.0
Validates image optimization: modern formats (webp/avif), responsive srcset, lazy-loading for below-fold, intrinsic width/height for CLS prevention, and decoded-byte-size proportional to displayed dimensions.
domain: performance

signature: (html: string, network?: object, context?: object) -> CheckResult
predicate: // Image optimization requirements:
//   1. Format: prefer .webp/.avif over .jpg/.png (except SVG, GIF for animation)
//   2. Responsive: <img> must have srcset OR be wrapped in <picture> with sources
//   3. Lazy loading: below-fold images need loading="lazy" (decoding="async" recommended)
//   4. Dimensions: width + height attributes set to prevent CLS
//   5. Compressed: file size sanity (< 500KB for hero, < 100KB for thumbnails)
images = querySelectorAll('img:not([aria-hidden="true"])')
for img in images:
src = img.getAttribute('src') || ''
ext = src.match(/\.(\w+)(?:\?|$)/)?.[1]?.toLowerCase()

// 1. Format
if ['jpg','jpeg','png'].includes(ext):
// Allow if <picture><source type="image/webp"> wraps it
picture = img.closest('picture')
if !picture || !picture.querySelector('source[type*="webp"], source[type*="avif"]'):
yield { selector: cssPath(img), src, fail: 'legacy-format-no-modern-source', remedy: 'wrap in <picture> with <source srcset="*.webp" type="image/webp">' }

// 2. Responsive
hasSrcset = img.hasAttribute('srcset') || img.closest('picture')?.querySelector('source[srcset]')
rect = img.getBoundingClientRect()
if !hasSrcset && rect.width > 400:
yield { selector: cssPath(img), fail: 'no-srcset-large-image', width: rect.width, remedy: 'add srcset with 1x/2x or w-density variants' }

// 3. Lazy loading
isAboveFold = rect.top < window.innerHeight
loading = img.getAttribute('loading')
if !isAboveFold && loading !== 'lazy':
yield { selector: cssPath(img), fail: 'below-fold-not-lazy', remedy: 'add loading="lazy"' }
if isAboveFold && loading === 'lazy':
yield { selector: cssPath(img), fail: 'above-fold-lazy', remedy: 'remove loading="lazy" or add fetchpriority="high"', severity: 'warn' }

// 4. Dimensions for CLS prevention
if !img.hasAttribute('width') || !img.hasAttribute('height'):
// Allow if CSS aspect-ratio is set
cs = getComputedStyle(img)
if !cs.aspectRatio || cs.aspectRatio === 'auto':
yield { selector: cssPath(img), fail: 'no-intrinsic-dimensions', remedy: 'add width/height attributes or CSS aspect-ratio to prevent CLS' }

// 5. Decoded size (if network info available)
if network?.byUrl?.[src]:
bytes = network.byUrl[src].size
if bytes > 500_000 && rect.width < 800:
yield { selector: cssPath(img), src, fail: 'oversized-payload', bytes, displayed: rect.width, remedy: 'compress + resize to displayed dimensions' }

## Validates
@community/rule-image-optimization

## Severity
medium

## Failure Message Template
Image '{selector}' fails optimization: {fail}. Details: {details}. {remedy}.

## Evaluation Method
automated

## Tools
- lighthouse
- playwright
- @anthropic/claude-code

## False Positive Rate
medium

## Validates
@community/rule-image-optimization

## Severity
medium

## Failure Message Template
Image '{selector}' fails optimization: {fail}. Details: {details}. {remedy}.

## Evaluation Method
automated

## Tools
- lighthouse
- playwright
- @anthropic/claude-code

## False Positive Rate
medium
