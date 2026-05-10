# ThreeViewportBreakpoints [constraint] v1.0.0
Responsive layouts must define distinct behavior for at least three viewport ranges — narrow (< 640px mobile), medium (640px–1023px tablet/small desktop), and wide (≥ 1024px desktop) — ensuring the mainstream device spectrum is fully covered.
domain: frontend-design

## Label
Minimum Three Responsive Viewport Ranges

## Threshold
number of distinct viewport ranges with defined layout behavior

## Unit
count

## Pass
>= 3

## Warn
== 2

## Block
<= 1

## Standard Ranges
```
    /* Mobile-first three-range baseline */

    /* Narrow: 0px – 639px (phones) */
    .layout { grid-template-columns: 1fr; }

    /* Medium: 640px – 1023px (tablets, small laptops) */
    @media (min-width: 640px) {
      .layout { grid-template-columns: repeat(2, 1fr); }
    }

    /* Wide: 1024px+ (desktop) */
    @media (min-width: 1024px) {
      .layout { grid-template-columns: repeat(3, 1fr); }
    }

    /* Optional fourth range for extra-wide (1280px+) */
    @media (min-width: 1280px) {
      .layout { grid-template-columns: repeat(4, 1fr); }
    }
  
```

## Verify By
Count @media query breakpoints in the layout. If only one breakpoint exists (only mobile vs desktop), add a medium-range breakpoint.

## Severity
warning

## Rationale
Two breakpoints miss the tablet-class range (iPad, narrow laptop). Modern analytics consistently show 15–25% of traffic on medium-width viewports. Layouts with only mobile and desktop breakpoints often look broken or cramped on tablets and small laptops.
