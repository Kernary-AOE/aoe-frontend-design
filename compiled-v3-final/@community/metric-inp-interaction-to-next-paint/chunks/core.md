# Interaction to Next Paint (INP) [metric] v1.0.0
INP measures the latency from a discrete user input (click, tap, key press) to the next frame painted by the browser. Replaced FID (First Input Delay) as an official Core Web Vital in March 2024. Reports the 98th-percentile interaction across an entire page session — captures the worst-case responsiveness, not the average.
domain: performance

## Unit
milliseconds

## Thresholds
-
  - **Level**: Good
  - **Value**: ≤ 200ms
  - **Meaning**: Interactions feel snappy; below conscious notice for most users.
  - **Target**: engineering should target this for all interactive surfaces
-
  - **Level**: Needs Improvement
  - **Value**: 200ms < INP ≤ 500ms
  - **Meaning**: Interactions noticeable; users perceive lag on heavy actions.
  - **Action**: investigate top-3 slow interactions; profile main-thread work
-
  - **Level**: Poor
  - **Value**: > 500ms
  - **Meaning**: Interactions feel broken; users may double-click or abandon.
  - **Action**: block release until profiled and fixed; usually long-task or large state update

## Formula
For each session: INP = the 98th-percentile latency across all eligible interactions (click, tap, key press; excludes scroll and continuous gestures), with a minimum of one interaction. Page-level INP reported is this per-session value at p75 across CrUX/RUM data.

## Measurement
- **Api**: PerformanceObserver with type='event' + 'first-input' (with durationThreshold:40ms); web-vitals.js library wraps this
- **Field Data**: Chrome User Experience Report (CrUX), web-vitals.js, RUM tools (Sentry, Vercel Speed Insights, Cloudflare, DebugBear)
- **Lab Data**: Lighthouse 'TBT' (Total Blocking Time) is a synthetic proxy; Chrome DevTools Performance panel for per-interaction profiling
- **Note**: Lab tools approximate INP via interaction simulation; field RUM is the source of truth Google ranks on.

## Common Causes
-
  - **Cause**: Long-running JavaScript handler (> 50ms)
  - **Fix**: Yield to main thread: `await scheduler.yield()` (Chrome 120+) or `await new Promise(r => setTimeout(r, 0))`. Break large work into chunks.
-
  - **Cause**: Forced synchronous layout (e.g. reading offsetHeight after style change)
  - **Fix**: Batch reads and writes; use ResizeObserver / IntersectionObserver instead of polling layout.
-
  - **Cause**: Large React state update triggering full re-render
  - **Fix**: Mark non-urgent updates with `useTransition` / `startTransition` (React 18). Memoize expensive subtrees.
-
  - **Cause**: Hydration on user interaction blocking the click handler
  - **Fix**: Pre-hydrate critical components; consider islands architecture or progressive hydration (Astro, Qwik).
-
  - **Cause**: Heavy event listener on document/window (analytics, instrumentation)
  - **Fix**: Defer instrumentation listeners; use `passive: true` for scroll/touch listeners; pull to Web Worker (Partytown).
-
  - **Cause**: Synchronous IndexedDB / localStorage on click
  - **Fix**: Move storage to async path; use cache + lazy-write pattern.
