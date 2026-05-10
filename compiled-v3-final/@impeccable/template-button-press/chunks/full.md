# ButtonPress [template] v1.0.0
Tactile button press feedback — transform-scale + shadow pulse + color darken on :active. Asymmetric timing (fast in, slower out) sells the physicality. Works on touch and mouse equally.
domain: motion

## Language
html-css

## Body
```
    <style>
      .btn-press {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        background: {BG_DEFAULT};
        color: white;
        font: 500 14px/1 system-ui, sans-serif;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        box-shadow:
          0 1px 2px oklch(20% 0.04 250 / 0.10),
          0 2px 6px oklch(20% 0.04 250 / 0.12);
        transition:
          transform   {RELEASE_DURATION} cubic-bezier(0.34, 1.56, 0.64, 1),
          background  {RELEASE_DURATION} ease-out,
          box-shadow  {RELEASE_DURATION} ease-out;
        will-change: transform;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      }

      .btn-press:hover {
        background: oklch(58% 0.22 250);
      }

      .btn-press:active {
        transform: scale({SCALE_PRESSED});
        background: {BG_PRESSED};
        box-shadow:
          0 0 0 oklch(20% 0.04 250 / 0),
          0 1px 2px oklch(20% 0.04 250 / 0.18);
        transition-duration: {PRESS_DURATION};
        transition-timing-function: ease-in;
      }

      .btn-press:focus-visible {
        outline: 2px solid oklch(54% 0.22 250);
        outline-offset: 3px;
      }

      .btn-press:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .btn-press {
          transition: background 100ms linear;
          will-change: auto;
        }
        .btn-press:active {
          transform: none;
          transition-duration: 0ms;
        }
      }
    </style>

    <button class="btn-press" type="button">Press me</button>
  
```

## Usage Notes
- Asymmetric timing is the trick: 80ms press IN (ease-in), 180ms release OUT (spring). Symmetric feels rubbery.
- Scale 0.97 is the sweet spot. 0.95 reads as 'broken'; 0.99 isn't perceptible.
- Shadow shrinks on press — reinforces 'pushed into the surface'. Without it scale alone reads as zoom.
- user-select: none prevents accidental text selection on long-press (mobile).
- tap-highlight-color: transparent removes the iOS gray flash that fights your custom feedback.
- On reduced-motion: keep the color shift (semantic feedback) but kill the scale (vestibular trigger).

## Tested In
- Chrome 120+
- Firefox 121
- Safari 17
- iOS Safari 17 (touch)

## Accessibility
- focus-visible outline 3px-offset so it doesn't merge with the press scale.
- prefers-reduced-motion preserves color feedback (informational), removes scale (motion).
- :disabled state visually + functionally distinct.
- Color contrast WCAG AA at default + pressed states (oklch lightness >= 48 on white text).
