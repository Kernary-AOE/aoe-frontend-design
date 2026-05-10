# MotionModal [pattern] v1.0.0
Modal animation choreography: backdrop fades in at 200ms ease-out while panel slides from translateY(12px) to 0 at 300ms cubic-bezier(0.16,1,0.3,1) — exit reverses in 150ms; body scroll locked during open lifecycle.
domain: frontend-design

## Problem
Modals that pop in instantly feel jarring. Modals with long animations (>400ms) feel sluggish and block urgent actions. Most implementations miss the exit animation entirely, causing a flash-cut close.

## Solution
Two-layer choreography: backdrop (200ms opacity ease-out) + panel (300ms translate+opacity with ease-spring). Exit is faster than enter — 150ms with ease-in to signal dismissal. Body scroll locked via overflow:hidden on <body> during open lifecycle.

## Structure
```
    <div class="modal-backdrop" aria-hidden="true"></div>
    <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">Dialog title</h2>
      <div class="modal-content">...</div>
      <button class="modal-close" aria-label="Close dialog">×</button>
    </div>
  
```

## Styles
```
    /* ── Backdrop ────────────────────────────────────────────────────────── */
    .modal-backdrop {
      position: fixed; inset: 0;
      background: oklch(0 0 0 / 0.4);
      animation: backdrop-in 200ms ease-out both;
    }
    @keyframes backdrop-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    /* ── Panel ────────────────────────────────────────────────────────────── */
    .modal-panel {
      position: fixed;
      top: 50%; left: 50%;
      translate: -50% -50%;
      animation: panel-in 300ms cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes panel-in {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    /* ── Exit (add .is-closing class via JS before removing from DOM) ────── */
    .modal-panel.is-closing {
      animation: panel-out 150ms ease-in both;
    }
    .modal-backdrop.is-closing {
      animation: backdrop-out 150ms ease-in both;
    }
    @keyframes panel-out   { to { opacity: 0; transform: translateY(8px); } }
    @keyframes backdrop-out { to { opacity: 0; } }

    /* ── Body scroll lock ─────────────────────────────────────────────────── */
    body.modal-open {
      overflow: hidden;
      /* Prevent layout shift from scrollbar disappearing: */
      padding-right: var(--scrollbar-width, 0px);
    }

    /* ── Reduced motion ──────────────────────────────────────────────────── */
    @media (prefers-reduced-motion: reduce) {
      .modal-backdrop, .modal-panel,
      .modal-backdrop.is-closing, .modal-panel.is-closing {
        animation: none;
      }
    }
  
```

## Timing
- **Backdrop Enter**: 200ms ease-out
- **Panel Enter**: 300ms cubic-bezier(0.16, 1, 0.3, 1)
- **Exit**: 150ms ease-in (faster than enter — dismissal is intentional)
- **Translate Distance**: 12px (enter), 8px (exit)

## A11y
- Move focus to modal on open (first focusable element or h2).
- Trap focus inside modal — Tab must cycle within dialog.
- Escape key closes modal.
- Restore focus to trigger element on close.
- body.modal-open overflow:hidden prevents scroll confusion.
