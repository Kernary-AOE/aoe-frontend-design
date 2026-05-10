# ExpandableDisclosure [pattern] v1.0.0
A button with aria-expanded + aria-controls=PANEL_ID toggles the visibility of a collapsible region panel, using <details>/<summary> native HTML or a custom implementation with CSS transition: max-height on the controlled panel.
domain: frontend-design

## Label
Expandable Region (Disclosure / Accordion)

## Problem
Long pages with all content visible overwhelm users. Grouping related secondary content behind labeled toggles reduces cognitive load while keeping content accessible.

## Solution
A <button> acting as a disclosure trigger controls a sibling panel via aria-expanded + aria-controls. The panel slides open/closed. Native <details>/<summary> is preferred for simplicity; custom implementation is used when animation is required.

## Structure
```
    <!-- Option A: Native HTML (no JS, no ARIA needed) -->
    <details class="disclosure">
      <summary class="disclosure__trigger">
        Advanced options
        <svg class="disclosure__chevron" aria-hidden="true"><!-- chevron --></svg>
      </summary>
      <div class="disclosure__panel">
        <p>Hidden content revealed on expand.</p>
      </div>
    </details>

    <!-- Option B: Custom (for animation control) -->
    <div class="disclosure">
      <button
        class="disclosure__trigger"
        type="button"
        aria-expanded="false"
        aria-controls="panel-advanced"
      >
        Advanced options
        <svg class="disclosure__chevron" aria-hidden="true"><!-- chevron --></svg>
      </button>
      <div
        id="panel-advanced"
        class="disclosure__panel"
        hidden
      >
        <p>Hidden content revealed on expand.</p>
      </div>
    </div>
  
```

## Css
```
    .disclosure__trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      background: transparent;
      border: none;
      padding: 12px 16px;
      font: inherit;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      border-radius: 8px;
    }
    .disclosure__trigger:hover    { background: oklch(96% 0.01 250); }
    .disclosure__trigger:focus-visible { outline: 2px solid hsl(var(--ring)); outline-offset: 2px; }

    /* Chevron rotates on open */
    .disclosure__chevron { transition: transform 200ms ease; flex-shrink: 0; }
    .disclosure[data-open="true"] .disclosure__chevron { transform: rotate(180deg); }

    /* Animated panel (custom option) */
    .disclosure__panel {
      overflow: hidden;
      max-height: 0;
      transition: max-height 250ms ease;
    }
    .disclosure[data-open="true"] .disclosure__panel {
      max-height: 600px; /* generous upper bound; adjust to content */
    }

    /* Respect reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .disclosure__chevron    { transition: none; }
      .disclosure__panel      { transition: none; }
    }
  
```

## Behavior
- Click the trigger toggles aria-expanded between true/false and toggles data-open on the disclosure root.
- Use aria-controls pointing to the panel's id so screen readers can navigate directly to the controlled region.
- NEVER hide the trigger label — the trigger text must describe what will be revealed.
- Prefer <details>/<summary> for static content; use custom implementation only when slide animation is required.
- Accordion variant (only one open at a time): closing others uses the same toggle mechanism.

## A11y
- Custom trigger must be a <button type=button> with aria-expanded and aria-controls.
- When closed, the panel must be hidden from the accessibility tree (hidden attribute or display:none, not just max-height: 0).
- Trigger text is the accessible name — no icon-only triggers (see @community/anti-pattern-icon-only-expansion-triggers).
- prefers-reduced-motion: disable slide animation but keep toggle functional.
