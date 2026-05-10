# SkeletonLoader [pattern] v1.0.0
Placeholder shapes (gray bars, rectangles, circles) that mimic the final content layout while data is loading. Reduces perceived wait time and prevents layout shift compared to spinners or empty space.
domain: frontend-design

## Facts

## Label
Skeleton Loader

## Problem
Spinners give no indication of what is loading or how complex it is. Empty space causes layout shift when content arrives. Users perceive longer waits when nothing visual hints at progress.

## Solution
Render placeholder rectangles matching the final content's outer dimensions: heading bars, paragraph lines, avatar circles, image rectangles. Animate with a subtle shimmer to signal 'in progress'.

## Structure
```
    <article aria-busy="true" aria-label="Loading article">
      <div class="skeleton skeleton-img" aria-hidden="true"></div>
      <div class="skeleton skeleton-h1" aria-hidden="true"></div>
      <div class="skeleton skeleton-meta" aria-hidden="true"></div>
      <div class="skeleton skeleton-line" aria-hidden="true"></div>
      <div class="skeleton skeleton-line" aria-hidden="true"></div>
      <div class="skeleton skeleton-line skeleton-short" aria-hidden="true"></div>
      <span class="sr-only">Loading article, please wait</span>
    </article>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Skeleton dimensions must match the eventual content footprint to avoid layout shift on swap.
- Apply a shimmer animation (linear-gradient sweeping across at 1.5s loop) — but disable when `prefers-reduced-motion: reduce`.
- Use a neutral background (e.g., 4% / 8% surface) so skeletons recede behind any UI chrome.
- Show skeletons only after a 200ms initial delay — if data returns faster, skip skeleton entirely to avoid flash.
- Cap skeleton display at 6-8 seconds; if data has not arrived, switch to an explicit error or 'Still loading...' message.
- Match skeleton count and shape to expected content: 5 list rows = 5 skeleton rows, not a spinner.

## A11y
- Mark the parent container with `aria-busy='true'` so screen readers know the region is updating.
- Skeleton shapes themselves have `aria-hidden='true'` (they are decorative).
- Provide a screen-reader-only message: 'Loading <region>, please wait'.
- Honor `prefers-reduced-motion: reduce` by replacing shimmer with a static neutral fill.
- Once content loads, remove `aria-busy` and announce completion via `aria-live` if the load was significant.

## Examples
- @community/example-linear-skeleton
- @community/example-youtube-skeleton
- @community/example-vercel-dashboard-skeleton

## Label
Skeleton Loader

## Problem
Spinners give no indication of what is loading or how complex it is. Empty space causes layout shift when content arrives. Users perceive longer waits when nothing visual hints at progress.

## Solution
Render placeholder rectangles matching the final content's outer dimensions: heading bars, paragraph lines, avatar circles, image rectangles. Animate with a subtle shimmer to signal 'in progress'.

## Structure
```
    <article aria-busy="true" aria-label="Loading article">
      <div class="skeleton skeleton-img" aria-hidden="true"></div>
      <div class="skeleton skeleton-h1" aria-hidden="true"></div>
      <div class="skeleton skeleton-meta" aria-hidden="true"></div>
      <div class="skeleton skeleton-line" aria-hidden="true"></div>
      <div class="skeleton skeleton-line" aria-hidden="true"></div>
      <div class="skeleton skeleton-line skeleton-short" aria-hidden="true"></div>
      <span class="sr-only">Loading article, please wait</span>
    </article>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Skeleton dimensions must match the eventual content footprint to avoid layout shift on swap.
- Apply a shimmer animation (linear-gradient sweeping across at 1.5s loop) — but disable when `prefers-reduced-motion: reduce`.
- Use a neutral background (e.g., 4% / 8% surface) so skeletons recede behind any UI chrome.
- Show skeletons only after a 200ms initial delay — if data returns faster, skip skeleton entirely to avoid flash.
- Cap skeleton display at 6-8 seconds; if data has not arrived, switch to an explicit error or 'Still loading...' message.
- Match skeleton count and shape to expected content: 5 list rows = 5 skeleton rows, not a spinner.

## A11y
- Mark the parent container with `aria-busy='true'` so screen readers know the region is updating.
- Skeleton shapes themselves have `aria-hidden='true'` (they are decorative).
- Provide a screen-reader-only message: 'Loading <region>, please wait'.
- Honor `prefers-reduced-motion: reduce` by replacing shimmer with a static neutral fill.
- Once content loads, remove `aria-busy` and announce completion via `aria-live` if the load was significant.

## Compatible
- @community/pattern-dashboard-grid
- @community/pattern-empty-state
