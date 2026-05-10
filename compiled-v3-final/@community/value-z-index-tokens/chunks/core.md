# z-index-scale [value] v1.0.0
domain: visual-design

## Constant
[0, 10, 100, 1000, 1100, 1200, 1300, 9999]

## Type
z-index-token-set

## Usage
```
    /* Design tokens (CSS custom properties) */
    :root {
      --z-base: 0;
      --z-raised: 10;          /* slightly elevated content (sticky headers) */
      --z-dropdown: 100;       /* select menus, navigation flyouts */
      --z-overlay: 1000;       /* dark backdrop behind modal */
      --z-modal: 1100;         /* modal/dialog content */
      --z-popover: 1200;       /* popovers anchored to triggers */
      --z-toast: 1300;         /* notifications above everything */
      --z-debug: 9999;         /* devtools-only overlays */
    }

    /* Component usage */
    .modal-backdrop { z-index: var(--z-overlay); }
    .modal-dialog   { z-index: var(--z-modal); }
    .toast          { z-index: var(--z-toast); }
    .tooltip        { z-index: var(--z-popover); }
  
```

## Layers
- **Base**:
  - **Value**: 0
  - **Purpose**: default flow content
- **Raised**:
  - **Value**: 10
  - **Purpose**: sticky headers, raised cards
- **Dropdown**:
  - **Value**: 100
  - **Purpose**: select menus, nav flyouts, autocomplete lists
- **Overlay**:
  - **Value**: 1000
  - **Purpose**: dimmed backdrops behind modals
- **Modal**:
  - **Value**: 1100
  - **Purpose**: modal/dialog surfaces
- **Popover**:
  - **Value**: 1200
  - **Purpose**: popovers, anchored cards (ABOVE modals when triggered from modal)
- **Toast**:
  - **Value**: 1300
  - **Purpose**: transient notifications, snackbars
- **Debug**:
  - **Value**: 9999
  - **Purpose**: devtools, debug overlays — never in production UI
