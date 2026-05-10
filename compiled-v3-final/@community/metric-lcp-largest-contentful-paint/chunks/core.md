# Largest Contentful Paint (LCP) [metric] v1.0.0
LCP is one of Google's three Core Web Vitals — it measures the render time of the largest image, video poster, or text block visible within the viewport during initial page load. LCP is a perception metric: it approximates 'when does the page feel loaded?' from the user's point of view. Optimizing LCP almost always improves user-reported satisfaction and conversion.
domain: frontend-engineering

## Unit
milliseconds

## Thresholds
-
  - **Level**: Good
  - **Value**: ≤ 2.5s
  - **Meaning**: Page feels fast on average network conditions.
  - **Target**: design and engineering should target this for the 75th percentile of users
-
  - **Level**: Needs Improvement
  - **Value**: 2.5s < LCP ≤ 4.0s
  - **Meaning**: Page feels sluggish; users may abandon.
  - **Action**: investigate top contributors (image weight, server TTFB, render-blocking JS/CSS)
-
  - **Level**: Poor
  - **Value**: > 4.0s
  - **Meaning**: Page is unacceptably slow; significant abandonment expected.
  - **Action**: block release for marketing pages; treat as outage for ecommerce

## Formula
LCP = render time of the largest contentful element (img, video poster, text block, background image) within the initial viewport, reported when the element first paints OR is replaced

## Measurement
- **Api**: PerformanceObserver with type='largest-contentful-paint'
- **Field Data**: Chrome User Experience Report (CrUX), web-vitals.js library
- **Lab Data**: Lighthouse, WebPageTest, PageSpeed Insights
- **Note**: Field LCP at p75 is what Google search ranking uses. Lab LCP is for diagnostic only.

## What Counts
- <img>, <image> in <svg>
- <video> poster image
- background-image set on the largest visible element
- block-level text element (heading, paragraph, list)

## What Does Not Count
- Empty/invisible elements
- Elements with low opacity at first paint
- Elements clipped or off-screen (above the fold rule applies)

## Common Causes
-
  - **Cause**: Slow server response (high TTFB)
  - **Fix**: Server-side caching, CDN, edge rendering. TTFB > 600ms makes LCP < 2.5s nearly impossible.
-
  - **Cause**: Large unoptimized hero image
  - **Fix**: AVIF/WebP, responsive srcset, preload with <link rel='preload' as='image' fetchpriority='high'>.
-
  - **Cause**: Render-blocking CSS/JS
  - **Fix**: Inline critical CSS; defer non-critical scripts; remove unused CSS.
-
  - **Cause**: Web font loading delays text paint
  - **Fix**: font-display: swap or optional; preload primary font; size-adjust to match metrics.
-
  - **Cause**: Client-side rendering with empty initial HTML
  - **Fix**: Use SSR or SSG (see @community/tradeoff-server-vs-client-rendering); the largest element must be in HTML at first byte.
