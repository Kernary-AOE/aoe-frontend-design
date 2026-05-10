# LoadingSpinner [template] v1.0.0
SVG circle spinner with rotating arc — currentColor-aware, parameterized size, fully accessible (role=status + sr-only label). Single rotation animation, no JS, no GIF. Reduced-motion shows a static partial ring.
domain: motion

## Language
html-css

## Body
```
    <style>
      .spinner {
        display: inline-block;
        width: {SIZE};
        height: {SIZE};
        color: {COLOR};
        flex-shrink: 0;
        vertical-align: middle;
      }

      .spinner__svg {
        width: 100%;
        height: 100%;
        animation: spinner-rotate {DURATION} linear infinite;
      }

      .spinner__track {
        stroke: currentColor;
        opacity: {TRACK_OPACITY};
      }

      .spinner__head {
        stroke: currentColor;
        stroke-linecap: round;
        /* circumference of r=10 circle = 2*pi*10 ≈ 62.83 */
        stroke-dasharray: 47 63; /* ~75% gap, 25% arc */
        stroke-dashoffset: 0;
      }

      @keyframes spinner-rotate {
        to { transform: rotate(360deg); }
      }

      .spinner__sr {
        position: absolute;
        width: 1px; height: 1px;
        padding: 0; margin: -1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
        border: 0;
      }

      @media (prefers-reduced-motion: reduce) {
        .spinner__svg { animation: none; }
        .spinner__head { stroke-dasharray: 31 63; opacity: 0.6; } /* static partial ring */
      }
    </style>

    <span class="spinner" role="status" aria-live="polite">
      <svg class="spinner__svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle class="spinner__track" cx="12" cy="12" r="10" stroke-width="{STROKE}" />
        <circle class="spinner__head"  cx="12" cy="12" r="10" stroke-width="{STROKE}" />
      </svg>
      <span class="spinner__sr">Loading…</span>
    </span>
  
```

## Usage Notes
- currentColor inheritance lets you drop the spinner into any colored context — buttons, alerts, links.
- 900ms is the sweet spot. <700ms feels frantic; >1100ms feels stuck.
- Use linear easing (NOT ease-in-out) — circular motion looks wrong with non-linear curves.
- viewBox 0 0 24 24 with r=10 leaves stroke breathing room (radius + stroke/2 < 12).
- stroke-dasharray '47 63' = ~75% gap / 25% arc; tune to taste (longer arc = more 'solid' feel).
- Always pair with role=status + sr-only 'Loading…' — a spinner without a text label is invisible to screen readers.

## Tested In
- Chrome 120+
- Firefox 121
- Safari 17

## Accessibility
- role=status + aria-live=polite announces 'Loading' to screen readers.
- sr-only text label ensures meaning isn't conveyed by motion alone.
- prefers-reduced-motion freezes rotation, keeps a static dim partial ring as visual indicator.
- aria-hidden on the SVG so screen readers don't announce decorative graphic.
