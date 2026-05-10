# Cumulative Layout Shift (CLS) [metric] v1.0.0
CLS is one of Google's three Core Web Vitals (alongside LCP and INP). It measures the visual stability of a page by summing the impact-fraction × distance-fraction of every unexpected layout shift during the page's lifetime. A 'shift' is any visible element that moves position between two rendered frames without the user initiating it. High CLS makes pages feel unstable and causes mis-clicks (e.g. user taps an ad that just appeared where a button was).
domain: frontend-engineering

## Unit
unitless score (sum of layout shift fractions)

## Thresholds
-
  - **Level**: Good
  - **Value**: ≤ 0.1
  - **Meaning**: User experience is stable; rare or insignificant shifts only.
  - **Target**: design and engineering should target this for all pages
-
  - **Level**: Needs Improvement
  - **Value**: 0.1 < CLS ≤ 0.25
  - **Meaning**: Noticeable shifts; user may experience mis-clicks or disorientation.
  - **Action**: investigate and fix top contributors
-
  - **Level**: Poor
  - **Value**: > 0.25
  - **Meaning**: Severe instability; users actively frustrated.
  - **Action**: block release until fixed

## Formula
CLS = sum over all non-user-initiated layout-shift entries of (impact-fraction × distance-fraction), measured within session windows of up to 5 seconds with max 1 second gap

## Measurement
- **Api**: PerformanceObserver with type='layout-shift'
- **Field Data**: Chrome User Experience Report (CrUX), web-vitals.js library, RUM tools (SpeedCurve, Calibre, DebugBear)
- **Lab Data**: Lighthouse, WebPageTest, PageSpeed Insights
- **Note**: Lab CLS measures only initial page load; field CLS includes the entire user session and is the metric Google ranks on.

## Common Causes
-
  - **Cause**: Images without explicit width/height
  - **Fix**: Always set <img width=W height=H> attributes (or aspect-ratio CSS) so the browser reserves space.
-
  - **Cause**: Web fonts swapping (FOUT / FOIT)
  - **Fix**: Use `font-display: optional` or `swap` with `size-adjust` and `ascent-override` to match metrics; preload primary font.
-
  - **Cause**: Ads, embeds, iframes loading without reserved space
  - **Fix**: Reserve min-height for ad slots and embeds. Never load ads above the fold without space pre-reservation.
-
  - **Cause**: Dynamic content injected above existing content
  - **Fix**: Insert below the fold or use animation/transform (which doesn't shift layout); cookie banners must overlay, not push.
-
  - **Cause**: Lazy-loaded images popping in
  - **Fix**: Use aspect-ratio + intrinsic size hints to reserve space.
-
  - **Cause**: Animations using `top`/`left` instead of `transform`
  - **Fix**: Animate transform/opacity (composited, no layout shift) instead of layout-affecting properties.
