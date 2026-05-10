# ButtonHierarchyWeb [pattern] v1.0.0
A 5-variant (primary, secondary, outline, ghost, destructive) × 3-size (h-8/h-9/h-10) button system with loading states, icon-only variants sized to 44×44 CSS px on mobile, and CVA class-variance-authority composition pattern.
domain: frontend-design

## Label
Web Button Hierarchy (5 Variants × 3 Sizes)

## Problem
Flat button systems assign equal visual weight to all actions. Users cannot identify the most important action at a glance, leading to decision paralysis and errors.

## Solution
Assign exactly one primary button per context. Pair with secondary, outline, or ghost for supporting actions. Destructive actions always use the danger variant and must never appear next to a primary.

## Structure
```
    <!-- Button group: primary + ghost cancel -->
    <div class="btn-group">
      <button type="button" class="btn btn-ghost">Cancel</button>
      <button type="submit" class="btn btn-primary">Save changes</button>
    </div>

    <!-- Icon-only with aria-label -->
    <button type="button" class="btn btn-icon btn-ghost" aria-label="Close dialog">
      <svg aria-hidden="true" width="16" height="16"></svg>
    </button>

    <!-- Loading state -->
    <button type="submit" class="btn btn-primary" disabled aria-busy="true">
      <svg class="spinner" aria-hidden="true"></svg>
      Saving…
    </button>
  
```

## Css
```
    /* Sizes */
    .btn         { height: 2.25rem; padding: 0 1rem;    font-size: 0.875rem; border-radius: calc(var(--radius) - 2px); }
    .btn-sm      { height: 2rem;    padding: 0 0.75rem; }
    .btn-lg      { height: 2.5rem;  padding: 0 2rem;    }
    .btn-icon    { height: 2.25rem; width: 2.25rem; padding: 0; }

    /* Mobile touch target: expand to 44px without altering visual size */
    @media (pointer: coarse) {
      .btn       { min-height: 2.75rem; }
      .btn-icon  { min-height: 2.75rem; min-width: 2.75rem; }
    }

    /* Variants (token-based) */
    .btn-primary     { background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); }
    .btn-secondary   { background: hsl(var(--secondary)); color: hsl(var(--secondary-foreground)); }
    .btn-outline     { background: transparent; border: 1px solid hsl(var(--border)); }
    .btn-ghost       { background: transparent; border: 1px solid transparent; }
    .btn-destructive { background: hsl(var(--destructive)); color: hsl(var(--destructive-foreground)); }

    /* States */
    .btn:active               { transform: translateY(1px); transition-duration: 75ms; }
    .btn:focus-visible        { outline: 2px solid hsl(var(--ring)); outline-offset: 2px; }
    .btn:disabled             { opacity: 0.5; pointer-events: none; }
    .btn { transition: background-color 150ms ease, color 150ms ease, box-shadow 150ms ease, transform 75ms ease; }
  
```

## Behavior
- NEVER place two primary buttons side-by-side — only one primary per context.
- Destructive button must be spatially separated from safe actions (gap ≥ 16px or separate group).
- Loading state: add disabled + aria-busy=true + inline spinner; keep button width stable with min-width.
- Icon-only buttons must carry aria-label — the SVG uses aria-hidden=true.
- Mobile coarse-pointer: enforce 44×44 CSS px minimum hit area via min-height/min-width.
- Do NOT use transition: all — causes unnecessary repaints on scroll.

## A11y
- All <button> elements have type=button or type=submit — never omit type.
- Loading state uses aria-busy=true on the button so screen readers announce 'Saving… (busy)'.
- Icon-only buttons: aria-label on the <button>; aria-hidden=true on the icon.
- Focus ring: 2px solid hsl(var(--ring)) with outline-offset: 2px — never outline: none without replacement.
