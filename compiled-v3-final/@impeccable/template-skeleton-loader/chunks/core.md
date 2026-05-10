# SkeletonLoader [template] v1.0.0
Pure CSS skeleton screens with shimmer effect — no JS. Parameterized width/height via inline styles. Respects prefers-reduced-motion by halting animation.
domain: loading-states

## Language
html-css

## Body
```
    <style>
      .skeleton {
        position: relative;
        overflow: hidden;
        background: {BASE_COLOR};
        border-radius: {RADIUS};
        /* Default sizing — override with inline width/height or utility classes */
        display: block;
      }
      .skeleton::after {
        content: "";
        position: absolute;
        inset: 0;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent 0%,
          {SHIMMER_COLOR} 50%,
          transparent 100%
        );
        animation: skeleton-shimmer {DURATION} ease-in-out infinite;
      }

      .skeleton--text   { height: 0.9em; margin: 0.4em 0; }
      .skeleton--title  { height: 1.4em; width: 60%; margin: 0.6em 0; }
      .skeleton--avatar { height: 40px; width: 40px; border-radius: 50%; }
      .skeleton--card   { height: 180px; width: 100%; }

      @keyframes skeleton-shimmer {
        100% { transform: translateX(100%); }
      }

      @media (prefers-reduced-motion: reduce) {
        .skeleton::after {
          animation: none;
          opacity: 0.6;
        }
      }

      :root[data-theme="dark"] .skeleton {
        background: oklch(28% 0.02 250);
      }
      :root[data-theme="dark"] .skeleton::after {
        background: linear-gradient(
          90deg,
          transparent 0%,
          oklch(36% 0.02 250) 50%,
          transparent 100%
        );
      }
    </style>

    <!-- Example usage: card with avatar + title + 3 lines -->
    <div role="status" aria-live="polite" aria-label="Loading content">
      <div style="display:flex; gap:12px; align-items:center;">
        <div class="skeleton skeleton--avatar"></div>
        <div style="flex:1">
          <div class="skeleton skeleton--title"></div>
          <div class="skeleton skeleton--text" style="width:80%"></div>
        </div>
      </div>
      <div class="skeleton skeleton--card" style="margin-top:12px"></div>
      <div class="skeleton skeleton--text"></div>
      <div class="skeleton skeleton--text" style="width:90%"></div>
      <div class="skeleton skeleton--text" style="width:70%"></div>
      <span class="visually-hidden">Loading…</span>
    </div>
  
```

## Usage Notes
- Always wrap skeletons in role=status + aria-live=polite so screen readers announce loading.
- Keep DURATION between 1.2s and 1.8s — faster feels nervous, slower feels stuck.
- prefers-reduced-motion replaces shimmer with static dim — never just remove the placeholder.
- Match skeleton sizes to actual content footprint to prevent layout shift on swap.
- Add a hidden text fallback for assistive tech that ignores aria-label on visual containers.

## Tested In
- Chrome 120+
- Firefox 121
- Safari 17

## Accessibility
- role=status + aria-live=polite announces loading state.
- aria-label gives screen readers context.
- prefers-reduced-motion respected — no infinite animation for sensitive users.
- No focusable elements inside skeleton — keyboard tab order preserved.
