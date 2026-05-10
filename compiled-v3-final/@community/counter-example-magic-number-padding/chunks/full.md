# MagicNumberPadding [counter-example] v1.0.0
A header layout that uses off-grid pixel values and a `calc()` expression with a bare numeric constant. The values were nudged into place visually with no underlying system.
domain: design-system

## Label
Off-Grid `13px` and `calc()` With Unnamed Constants

## Bad Code
```
.site-header {
height: 73px;
padding: 13px 21px;
z-index: 999;
}

.site-content {
min-height: calc(100vh - 73px);
margin-top: 7px;
}

.modal {
z-index: 9999;
top: 47px;
}
```

## Why Bad
- 73/13/21/7/47 are not on any 4px or 8px grid — they are pure visual nudges
- `calc(100vh - 73px)` duplicates the magic 73px — change header height and the layout breaks silently
- z-index values (999, 9999) have no scale; the next dev will write 99999 to win
- No way for the next reader to tell which numbers were intentional vs leftover from debugging
- Pixel-perfect look is fragile — a 14px font bump pushes everything out of alignment again

## Good Code
```
:root {
--header-height: 64px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--z-dropdown: 10;
--z-modal: 40;
}

.site-header {
height: var(--header-height);
padding: var(--space-md) var(--space-lg);
z-index: var(--z-dropdown);
}

.site-content {
min-height: calc(100vh - var(--header-height));
margin-top: var(--space-sm);
}

.modal {
z-index: var(--z-modal);
top: var(--header-height);
}
```

## Why Good
- All values land on an 8px grid — `header-height: 64px` (8 * 8) is intentional, not accidental
- Single source of truth: change `--header-height` once, content min-height + modal offset both update
- Z-index scale prevents the 999 → 9999 → 99999 escalation war
- Token names communicate intent: `--z-modal` is self-documenting, `9999` is not
- Future adjustments happen at the token layer, not scattered through component CSS

## Anti Pattern
@community/anti-pattern-magic-numbers

## Label
Off-Grid `13px` and `calc()` With Unnamed Constants

## Bad Code
```
.site-header {
height: 73px;
padding: 13px 21px;
z-index: 999;
}

.site-content {
min-height: calc(100vh - 73px);
margin-top: 7px;
}

.modal {
z-index: 9999;
top: 47px;
}
```

## Why Bad
- 73/13/21/7/47 are not on any 4px or 8px grid — they are pure visual nudges
- `calc(100vh - 73px)` duplicates the magic 73px — change header height and the layout breaks silently
- z-index values (999, 9999) have no scale; the next dev will write 99999 to win
- No way for the next reader to tell which numbers were intentional vs leftover from debugging
- Pixel-perfect look is fragile — a 14px font bump pushes everything out of alignment again

## Good Code
```
:root {
--header-height: 64px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--z-dropdown: 10;
--z-modal: 40;
}

.site-header {
height: var(--header-height);
padding: var(--space-md) var(--space-lg);
z-index: var(--z-dropdown);
}

.site-content {
min-height: calc(100vh - var(--header-height));
margin-top: var(--space-sm);
}

.modal {
z-index: var(--z-modal);
top: var(--header-height);
}
```

## Why Good
- All values land on an 8px grid — `header-height: 64px` (8 * 8) is intentional, not accidental
- Single source of truth: change `--header-height` once, content min-height + modal offset both update
- Z-index scale prevents the 999 → 9999 → 99999 escalation war
- Token names communicate intent: `--z-modal` is self-documenting, `9999` is not
- Future adjustments happen at the token layer, not scattered through component CSS

## Anti Pattern
@community/anti-pattern-magic-numbers
