# motion-duration-fast [value] v1.0.0
domain: visual-design

## Constant
150ms

## Type
css-duration

## Usage
```
    :root {
      --motion-fast:    150ms;   /* hover, focus, button press, ripple, color transition */
      --motion-base:    250ms;   /* default ease for entering/exiting components */
      --motion-medium:  350ms;   /* drawer slide, modal entrance */
      --motion-slow:    500ms;   /* page-level transitions, accordion expand */
      --easing-out:     cubic-bezier(0.0, 0.0, 0.2, 1);   /* enter, ease-out */
      --easing-in:      cubic-bezier(0.4, 0.0, 1.0, 1);   /* exit, ease-in */
      --easing-in-out:  cubic-bezier(0.4, 0.0, 0.2, 1);   /* both ends */
    }

    /* Hover/focus/press */
    .button {
      transition:
        background-color var(--motion-fast) var(--easing-out),
        box-shadow var(--motion-fast) var(--easing-out);
    }

    /* Reduced motion — kill durations */
    @media (prefers-reduced-motion: reduce) {
      :root {
        --motion-fast:   1ms;
        --motion-base:   1ms;
        --motion-medium: 1ms;
        --motion-slow:   1ms;
      }
    }
  
```

## Variants
- **Apple HIG**: 100-150ms for state changes (button press, switch toggle)
- **Material 3**: M3 motion tokens — short1: 50ms, short2: 100ms, short3: 150ms, short4: 200ms
- **Carbon IBM**: fast-01: 70ms, fast-02: 110ms, moderate-01: 150ms
- **Linear App**: ui-fast: 80ms, ui: 150ms, ui-slow: 280ms
