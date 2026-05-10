# ContentDrivenBreakpoints [pattern] v1.0.0
Responsive breakpoints should be placed where the content actually breaks — not at device-convention widths. Additionally, screen size alone does not reveal input method; use pointer and hover media queries to adapt to touch vs. cursor devices independently of viewport width.
domain: frontend-design

## Label
Content-Driven Breakpoints with Input Method Detection

## Problem
Standard device breakpoints (320, 768, 1024, 1440px) are not where real content breaks — they are where device conventions converged at a historical moment. A layout that breaks at 547px needs a breakpoint at 547px, not at 768px. More critically, a laptop with a touchscreen and a phone with a keyboard both fail the assumption that 'mobile = touch, desktop = mouse'. Screen size is a proxy for input method that fails in both directions.

## Method
```
    /* 1. Find your breakpoint from content, not devices */
    /* Stretch the browser until the layout looks wrong — that width is your breakpoint */

    /* 2. Use pointer/hover queries for input-method adaptation */
    @media (pointer: coarse) {
      /* Touch: larger targets, visible tap states */
      .btn { min-height: 44px; padding: 12px 20px; }
      .card { cursor: default; } /* no hover affordance */
    }

    @media (pointer: fine) {
      /* Cursor: tighter targets, hover states */
      .btn { min-height: 32px; padding: 8px 16px; }
      .card:hover { transform: translateY(-2px); }
    }

    @media (hover: none) {
      /* No hover capability — never rely on hover for function */
      .tooltip { display: none; } /* replace with visible labels */
    }

    /* 3. Use clamp() to eliminate breakpoints for continuous values */
    .heading {
      font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
    }
  
```
