# EmptyState [template] v1.0.0
Polite empty-state block: SVG illustration slot, heading, subtitle, primary CTA, secondary link. Centered layout, accessible heading hierarchy.
domain: states

## Language
html-css

## Body
```
    <style>
      .empty-state {
        max-width: 420px;
        margin: 64px auto;
        padding: 32px 24px;
        text-align: center;
        display: grid;
        gap: 12px;
        justify-items: center;
        color: oklch(35% 0.02 250);
      }
      .empty-state__illustration {
        width: 120px;
        height: 120px;
        opacity: 0.85;
        margin-bottom: 8px;
      }
      .empty-state__title {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
        color: oklch(20% 0.02 250);
      }
      .empty-state__subtitle {
        font-size: 0.95rem;
        margin: 0;
        line-height: 1.5;
        color: oklch(45% 0.02 250);
      }
      .empty-state__actions {
        display: flex;
        gap: 12px;
        margin-top: 8px;
        flex-wrap: wrap;
        justify-content: center;
      }
      .empty-state__cta {
        display: inline-block;
        padding: 10px 18px;
        border-radius: 8px;
        font-weight: 500;
        text-decoration: none;
        cursor: pointer;
        font: inherit;
        border: 1px solid transparent;
      }
      .empty-state__cta--primary {
        background: {ACCENT_COLOR};
        color: white;
      }
      .empty-state__cta--primary:hover {
        filter: brightness(1.08);
      }
      .empty-state__cta--secondary {
        background: transparent;
        color: {ACCENT_COLOR};
        border-color: oklch(85% 0.02 250);
      }
      .empty-state__cta:focus-visible {
        outline: 2px solid {ACCENT_COLOR};
        outline-offset: 2px;
      }
    </style>

    <section class="empty-state" role="region" aria-labelledby="empty-title">
      <svg class="empty-state__illustration"
           viewBox="0 0 120 120"
           role="img"
           aria-hidden="true">
        <circle cx="60" cy="60" r="52" fill="oklch(95% 0.01 250)"/>
        <rect x="38" y="44" width="44" height="36" rx="4"
              fill="none" stroke="oklch(70% 0.05 250)" stroke-width="2"/>
        <line x1="44" y1="56" x2="76" y2="56" stroke="oklch(80% 0.03 250)" stroke-width="2"/>
        <line x1="44" y1="64" x2="68" y2="64" stroke="oklch(80% 0.03 250)" stroke-width="2"/>
      </svg>
      <h2 id="empty-title" class="empty-state__title">{TITLE}</h2>
      <p class="empty-state__subtitle">{SUBTITLE}</p>
      <div class="empty-state__actions">
        <a class="empty-state__cta empty-state__cta--primary"
           href="{PRIMARY_HREF}">{PRIMARY_LABEL}</a>
        <a class="empty-state__cta empty-state__cta--secondary"
           href="{SECONDARY_HREF}">{SECONDARY_LABEL}</a>
      </div>
    </section>
  
```

## Usage Notes
- Heading level (h2) should match the surrounding document outline — bump to h1 if this is the page's only heading.
- Replace the inline SVG with a brand-specific illustration; keep aria-hidden=true since the heading carries meaning.
- Primary CTA must be the most likely next action — avoid stacking two equal-weight CTAs.
- Subtitle should explain WHY it's empty and HOW to fix it, not just restate the title.
- Use role=region + aria-labelledby so AT users can jump to this landmark.

## Tested In
- Chrome 120+
- Firefox 121
- Safari 17

## Accessibility
- Semantic h2 + aria-labelledby region.
- Decorative SVG marked aria-hidden.
- Focus-visible ring on both CTAs.
- Color contrast: subtitle 45% L vs page bg passes 4.5:1 on white.

## Relations
enhances: [@community/pattern-empty-state]

## Enhances
- @community/pattern-empty-state
