# OklchDarkModeCascade [template] v1.0.0
Single-variable OKLCH cascade: change one --hue and the entire palette + dark mode follow. Auto-flips via prefers-color-scheme and supports manual data-theme override.
domain: theming

## Language
css

## Body
```
    /* OKLCH cascade: one HUE drives both light and dark palettes */
    :root {
      --hue: {HUE};
      --chroma: {CHROMA};

      /* Lightness ramp — same across modes; chromatic anchors flip in dark */
      {PREFIX}-bg:        oklch(98% calc(var(--chroma) * 0.15) var(--hue));
      {PREFIX}-surface:   oklch(96% calc(var(--chroma) * 0.25) var(--hue));
      {PREFIX}-elevated:  oklch(99% calc(var(--chroma) * 0.10) var(--hue));
      {PREFIX}-border:    oklch(88% calc(var(--chroma) * 0.40) var(--hue));
      {PREFIX}-muted:     oklch(60% calc(var(--chroma) * 0.40) var(--hue));
      {PREFIX}-text:      oklch(22% calc(var(--chroma) * 0.30) var(--hue));
      {PREFIX}-text-soft: oklch(40% calc(var(--chroma) * 0.30) var(--hue));
      {PREFIX}-primary:        oklch(58% var(--chroma) var(--hue));
      {PREFIX}-primary-hover:  oklch(48% var(--chroma) var(--hue));
      {PREFIX}-primary-text:   oklch(99% 0.005 var(--hue));
    }

    /* Auto-flip via OS preference */
    @media (prefers-color-scheme: dark) {
      :root {
        {PREFIX}-bg:        oklch(14% calc(var(--chroma) * 0.40) var(--hue));
        {PREFIX}-surface:   oklch(20% calc(var(--chroma) * 0.50) var(--hue));
        {PREFIX}-elevated:  oklch(24% calc(var(--chroma) * 0.40) var(--hue));
        {PREFIX}-border:    oklch(32% calc(var(--chroma) * 0.60) var(--hue));
        {PREFIX}-muted:     oklch(58% calc(var(--chroma) * 0.50) var(--hue));
        {PREFIX}-text:      oklch(96% calc(var(--chroma) * 0.10) var(--hue));
        {PREFIX}-text-soft: oklch(75% calc(var(--chroma) * 0.20) var(--hue));
        {PREFIX}-primary:        oklch(72% var(--chroma) var(--hue));
        {PREFIX}-primary-hover:  oklch(80% var(--chroma) var(--hue));
        {PREFIX}-primary-text:   oklch(15% 0.01 var(--hue));
      }
    }

    /* Manual override — wins over OS preference */
    :root[data-theme="light"] {
      {PREFIX}-bg:        oklch(98% calc(var(--chroma) * 0.15) var(--hue));
      {PREFIX}-surface:   oklch(96% calc(var(--chroma) * 0.25) var(--hue));
      {PREFIX}-elevated:  oklch(99% calc(var(--chroma) * 0.10) var(--hue));
      {PREFIX}-border:    oklch(88% calc(var(--chroma) * 0.40) var(--hue));
      {PREFIX}-muted:     oklch(60% calc(var(--chroma) * 0.40) var(--hue));
      {PREFIX}-text:      oklch(22% calc(var(--chroma) * 0.30) var(--hue));
      {PREFIX}-text-soft: oklch(40% calc(var(--chroma) * 0.30) var(--hue));
      {PREFIX}-primary:        oklch(58% var(--chroma) var(--hue));
      {PREFIX}-primary-hover:  oklch(48% var(--chroma) var(--hue));
      {PREFIX}-primary-text:   oklch(99% 0.005 var(--hue));
    }

    :root[data-theme="dark"] {
      {PREFIX}-bg:        oklch(14% calc(var(--chroma) * 0.40) var(--hue));
      {PREFIX}-surface:   oklch(20% calc(var(--chroma) * 0.50) var(--hue));
      {PREFIX}-elevated:  oklch(24% calc(var(--chroma) * 0.40) var(--hue));
      {PREFIX}-border:    oklch(32% calc(var(--chroma) * 0.60) var(--hue));
      {PREFIX}-muted:     oklch(58% calc(var(--chroma) * 0.50) var(--hue));
      {PREFIX}-text:      oklch(96% calc(var(--chroma) * 0.10) var(--hue));
      {PREFIX}-text-soft: oklch(75% calc(var(--chroma) * 0.20) var(--hue));
      {PREFIX}-primary:        oklch(72% var(--chroma) var(--hue));
      {PREFIX}-primary-hover:  oklch(80% var(--chroma) var(--hue));
      {PREFIX}-primary-text:   oklch(15% 0.01 var(--hue));
    }

    /* Ready-to-apply body defaults */
    html, body {
      background: var({PREFIX}-bg);
      color: var({PREFIX}-text);
    }
  
```

## Usage Notes
- Change HUE alone to re-skin entire UI — chroma stays consistent across the ramp.
- Avoid hues 260..290 (default purple from major design systems) — pick something distinctive.
- Test contrast: text-on-bg must hit 4.5:1 in BOTH modes. Use a contrast checker.
- Manual override block wins over @media via data-theme — required for explicit user choice.
- Some browsers don't support oklch — provide a hex/rgb fallback layer if you need legacy support.

## Tested In
- Chrome 120+
- Firefox 121 (oklch supported)
- Safari 17

## Accessibility
- Lightness anchors chosen to maintain WCAG AA contrast in both modes.
- prefers-color-scheme respected by default.
- data-theme override allows user choice to win.
- Chroma reduced for surface/border tokens to avoid eye fatigue.
