# LowContrastFocus [counter-example] v1.0.0
A button focus state that uses a 1px light-gray outline. Technically a focus indicator exists, but at 1.4:1 contrast it is invisible at normal viewing distance. Auditors checking 'is outline non-zero' pass it; humans tabbing through cannot see where focus is.
domain: accessibility

## Label
1px Light-Gray Focus Outline On White Card

## Bad Code
```
.btn:focus,
.btn:focus-visible {
outline: 1px solid #d1d5db;  /* gray-300 */
outline-offset: 0;
}

/* The button sits in a card with overflow: hidden,
and the focus state uses box-shadow that gets clipped: */
.card {
overflow: hidden;
border-radius: 8px;
}
.btn-inner:focus-visible {
box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
/* Clipped by .card overflow hidden — invisible at the edge */
}
```

## Why Bad
- `#d1d5db` on white achieves only ~1.4:1 contrast — fails WCAG 2.2 SC 1.4.11 (3:1 minimum for non-text UI)
- 1px outline width fails the minimum perimeter area requirement of SC 2.4.11
- `outline-offset: 0` lets the ring touch the button edge — easy to lose against any colored background
- Box-shadow approach gets silently clipped by `.card { overflow: hidden }` — focus literally invisible on edge buttons
- rgba(59, 130, 246, 0.5) at 50% opacity drops the effective contrast even further

## Good Code
```
:root {
--ring: oklch(60% 0.18 250);          /* high-chroma blue, 5:1+ on white */
--ring-offset: var(--surface-base);
}

.btn:focus-visible {
outline: 2px solid var(--ring);
outline-offset: 2px;
/* outline isn't clipped by parent overflow: hidden */
}

/* For dark/colored buttons, invert the ring */
.btn-primary:focus-visible {
outline-color: var(--surface-base);     /* white ring on dark button */
box-shadow: 0 0 0 4px var(--ring);      /* outer color ring for contrast against page */
}

/* Card no longer needs to clip — outline floats above */
.card {
border-radius: var(--radius-lg);
}
```

## Why Good
- `oklch(60% 0.18 250)` ring achieves 5:1+ contrast on white — passes WCAG SC 1.4.11 with margin
- 2px outline + 2px offset gives a 4px-thick visible ring — meets SC 2.4.11 perimeter area
- `outline` (not box-shadow) is not clipped by parent `overflow: hidden` — works on edge components
- Two-color ring on primary buttons (white inner + brand outer) ensures contrast against both button AND page background
- Tokenized via `--ring` — single theme change updates focus across the entire codebase

## Anti Pattern
@community/anti-pattern-invisible-focus
