# RadixDialog [example] v1.0.0
Radix Dialog implements full WAI-ARIA modal-dialog semantics: opens with focus moving to the first focusable element (or the explicitly-marked initialFocus), traps Tab cycling within the dialog, restores focus to the trigger on close, and dismisses on Escape. Background scroll is locked via aria-hidden on siblings. Backdrop click closes by default (configurable).
domain: accessibility

## Label
Radix UI — Dialog with Focus Trap

## Url
https://www.radix-ui.com/primitives/docs/components/dialog

## Observed
2026-Q1

## Brand
radix

## Pattern Applied
@impeccable/template-modal-focus-trap

## Aesthetic Notes
- Overlay: position fixed inset-0, bg rgba(0,0,0,0.5), with data-state attributes for fade-in/out animations.
- Content: position fixed centered (top 50%, left 50%, transform translate(-50%, -50%)), max-width 500px default.
- Border-radius 8px, padding 24px, bg-white, shadow 0 25px 50px -12px rgba(0,0,0,0.25).
- Close button: 24px X icon top-right, 8px padding, focus ring 2px #2563EB.
- Animation: 150ms ease-out fade + scale(0.95 → 1) on open, reversed on close.
- Focus ring on first focusable element after open is visible (assistive tech needs it).

## What To Copy
- Set inert on background siblings (or aria-hidden) — assistive tech must NOT see the page underneath.
- Restore focus to the trigger element on close — failing this is a top-3 a11y bug.
- Allow Escape AND backdrop-click to close — both are user expectations and either alone fails one expectation.
- Use data-state='open|closed' attribute for animations — Radix's pattern that integrates with Tailwind animation classes.

## What To Skip
- Don't disable the close button via CSS while keeping aria-disabled='false' — it traps users.
- Don't set initialFocus to the close button — focus the primary action or input instead.

## Screenshot Hint
scout query: radix dialog modal centered focus trap backdrop overlay

## Demonstrates
- Focus trap + restore is non-negotiable for modal a11y — every modal needs both.
- Background-inert via aria-hidden is more reliable than CSS-only z-index isolation.
- data-state attributes for animations is the cleanest CSS-driven approach.
