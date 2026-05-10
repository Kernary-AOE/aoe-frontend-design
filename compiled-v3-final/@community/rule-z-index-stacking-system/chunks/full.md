# ZIndexStackingSystem [rule] v1.0.0
> All z-index values must be drawn from a named token scale (base: 0, raised: 10, dropdown: 100, sticky: 200, overlay-backdrop: 300, overlay: 400, toast/notification: 500, tooltip: 600) — never hard-coded arbitrary integers. Magic z-index values like z-index: 9999 are prohibited.
domain: frontend-design

## Label
Z-Index Must Use a Named Token Stacking System

## Applies When
any CSS property that sets z-index on a positioned element

## Verify By
Search codebase for z-index values > 10 that are not from the token scale. Replace with the appropriate named token.

## Token Scale
```
    :root {
      --z-base:             0;
      --z-raised:          10;   /* card hover lift, floating labels */
      --z-dropdown:       100;   /* dropdown menus, autocomplete */
      --z-sticky:         200;   /* sticky headers, sticky sidebars */
      --z-overlay-backdrop: 300; /* modal/sheet backdrop */
      --z-overlay:        400;   /* modal panels, sheet panels, dialogs */
      --z-toast:          500;   /* toast notification stack */
      --z-tooltip:        600;   /* tooltips — must be above everything */
    }

    /* Usage */
    .dropdown__menu   { z-index: var(--z-dropdown);        }
    .site-header      { z-index: var(--z-sticky);          }
    .modal-backdrop   { z-index: var(--z-overlay-backdrop);}
    .modal-panel      { z-index: var(--z-overlay);         }
    .toast-region     { z-index: var(--z-toast);           }
    .tooltip          { z-index: var(--z-tooltip);         }
  
```

## Anti Patterns
- z-index: 9999 — magic number; breaks as soon as someone adds z-index: 10000 elsewhere
- z-index: 1 on a dropdown — invisible behind sticky headers at z-index: 40
- Inline style z-index values — cannot be tracked or overridden systematically
- Using z-index without position: relative/absolute/fixed/sticky — has no effect but adds confusion

## Severity
warning

## Rationale
Ad-hoc z-index values create stacking context race conditions. When one developer writes z-index: 9999 and another writes z-index: 10000, the system has failed. A named scale ensures predictable layering, makes stacking order self-documenting, and prevents unintentional clipping of tooltips behind modals.

## Label
Z-Index Must Use a Named Token Stacking System

## Applies When
any CSS property that sets z-index on a positioned element

## Verify By
Search codebase for z-index values > 10 that are not from the token scale. Replace with the appropriate named token.

## Token Scale
```
    :root {
      --z-base:             0;
      --z-raised:          10;   /* card hover lift, floating labels */
      --z-dropdown:       100;   /* dropdown menus, autocomplete */
      --z-sticky:         200;   /* sticky headers, sticky sidebars */
      --z-overlay-backdrop: 300; /* modal/sheet backdrop */
      --z-overlay:        400;   /* modal panels, sheet panels, dialogs */
      --z-toast:          500;   /* toast notification stack */
      --z-tooltip:        600;   /* tooltips — must be above everything */
    }

    /* Usage */
    .dropdown__menu   { z-index: var(--z-dropdown);        }
    .site-header      { z-index: var(--z-sticky);          }
    .modal-backdrop   { z-index: var(--z-overlay-backdrop);}
    .modal-panel      { z-index: var(--z-overlay);         }
    .toast-region     { z-index: var(--z-toast);           }
    .tooltip          { z-index: var(--z-tooltip);         }
  
```

## Anti Patterns
- z-index: 9999 — magic number; breaks as soon as someone adds z-index: 10000 elsewhere
- z-index: 1 on a dropdown — invisible behind sticky headers at z-index: 40
- Inline style z-index values — cannot be tracked or overridden systematically
- Using z-index without position: relative/absolute/fixed/sticky — has no effect but adds confusion

## Severity
warning
