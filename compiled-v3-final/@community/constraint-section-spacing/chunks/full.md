# SectionSpacing [constraint] v1.0.0
Section vertical padding must use py-20 sm:py-32 (or clamp(80px, 10vw, 128px)) with max-w-6xl mx-auto px-4 sm:px-6 container — never arbitrary margins between sections. Extracted from shadcn-landing-page, open-react-template, and next-saas-starter analysis.
domain: frontend-design

## Label
Landing Page Section Spacing Standards

## Threshold
py-20 (80px) minimum vertical padding per section on desktop

## Unit
CSS px / Tailwind spacing scale

## Pass
>= 80px section padding-block

## Warn
48px – 79px — acceptable only for compact dashboard sections, not marketing pages

## Block
<= 32px — destroys vertical breathing room, sections merge visually

## Spacing Table
```
    | Element                     | Value                                    |
    |-----------------------------|------------------------------------------|
    | Section padding (vertical)  | py-20 sm:py-32 or clamp(80px, 10vw, 128px) |
    | Section gap (between)       | mt-24 or 15rem (rely on padding instead) |
    | Container max-width         | max-w-6xl (1152px) or 1200px             |
    | Container horizontal pad    | px-4 sm:px-6                             |
    | Card gap in grid            | gap-8 or gap-12                          |
    | CTA button spacing          | gap-4 horizontal, gap-3 stacked          |
    | Footer padding (top)        | pt-16 md:pt-24                           |
    | Footer bottom bar padding   | pt-6 pb-8                                |
    | Nav height                  | h-14 (56px) floating or h-16 (64px) sticky |
    | Hero min-height             | min-h-[80vh] or min-h-screen for immersive |
    | Section label → h2 gap      | mb-4                                     |
    | h2 → description gap        | mb-8 or mb-12                            |
  
```

## Code
```
    /* Section spacing standards */
    .section          { padding-block: clamp(80px, 10vw, 128px); }
    /* rely on padding for rhythm, NOT gaps between sections */
    .section + .section { margin-block-start: 0; }

    /* Container */
    .container        { max-width: 1152px; margin-inline: auto; padding-inline: 1rem; }
    @media (min-width: 640px) { .container { padding-inline: 1.5rem; } }

    /* Tailwind equivalent */
    /* <section class="py-20 sm:py-32"> */
    /* <div class="max-w-6xl mx-auto px-4 sm:px-6"> */

    /* Card grid in features section */
    .features-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;  /* gap-8 */
    }
    @media (min-width: 768px)  { .features-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .features-grid { grid-template-columns: repeat(3, 1fr); } }

    /* Featured pricing card */
    .pricing-card--featured {
      transform: scale(1.05);
      box-shadow: 0 20px 60px oklch(0 0 0 / 0.15);
      border-top: 3px solid hsl(var(--accent));
      z-index: 1;
      position: relative;
    }
  
```

## Behavior
- NEVER place mt-N or mb-N directly between <section> elements — double-spacing occurs with padding.
- Use padding-block (py-*) on the section itself for all vertical breathing room.
- Container max-width: max-w-6xl (1152px) is the standard — max-w-7xl (1280px) only for hero or full-bleed sections.
- Hero: min-h-[80vh] for standard hero, min-h-screen for immersive full-viewport hero.
- Nav height determines content offset: h-14 (56px) for floating bar, h-16 (64px) for sticky.
- Section label → h2 gap must be mb-4. h2 → description gap must be mb-8 or mb-12, not mb-4 (too tight).

## Sources

## Rationale
Marketing landing pages require generous vertical padding to create section boundaries and reading rhythm. py-20 sm:py-32 is the established baseline from the three most-starred open-source templates. clamp(80px, 10vw, 128px) provides fluid scaling. Arbitrary mt-N between sections creates double-spacing problems — rely on section padding only.
