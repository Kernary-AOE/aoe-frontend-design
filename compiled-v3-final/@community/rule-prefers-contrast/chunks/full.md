# PrefersContrast [rule] v1.0.0
Designs must respond to prefers-contrast:more by increasing text and border contrast, and must use CSS system color keywords when prefers-contrast:forced is active to support Windows High Contrast Mode.
domain: frontend-design

## Severity
high

## Implementation
- @media (prefers-contrast: more): increase text contrast to 7:1, thicken borders to at least 2px, remove low-opacity decorative elements
- @media (forced-colors: active): use system color keywords (ButtonText, Canvas, Highlight) — do not fight the OS-provided color scheme
- Do not use box-shadow as the sole border indicator — shadows are invisible in forced-colors mode
- Focus indicators must use outline, not box-shadow, in forced-colors mode

## Css Skeleton
```
    @media (prefers-contrast: more) {
      :root {
        --color-text: oklch(10% 0 0);    /* near-black */
        --color-border: oklch(20% 0 0);  /* heavy border */
      }
      .btn { border: 2px solid currentColor; }
    }
    @media (forced-colors: active) {
      .btn { forced-color-adjust: auto; }
      /* Do not override: let OS colors apply */
    }
  
```

## Severity
high

## Implementation
- @media (prefers-contrast: more): increase text contrast to 7:1, thicken borders to at least 2px, remove low-opacity decorative elements
- @media (forced-colors: active): use system color keywords (ButtonText, Canvas, Highlight) — do not fight the OS-provided color scheme
- Do not use box-shadow as the sole border indicator — shadows are invisible in forced-colors mode
- Focus indicators must use outline, not box-shadow, in forced-colors mode

## Css Skeleton
```
    @media (prefers-contrast: more) {
      :root {
        --color-text: oklch(10% 0 0);    /* near-black */
        --color-border: oklch(20% 0 0);  /* heavy border */
      }
      .btn { border: 2px solid currentColor; }
    }
    @media (forced-colors: active) {
      .btn { forced-color-adjust: auto; }
      /* Do not override: let OS colors apply */
    }
  
```
