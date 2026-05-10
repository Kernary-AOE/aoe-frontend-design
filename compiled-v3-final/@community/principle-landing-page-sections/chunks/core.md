# LandingPageSections [principle] v1.0.0
> A high-converting landing page composes 7 distinct section types in varied structural sequence — hero, features, pricing, testimonials, navigation, footer, and spacing — never repeating the same layout consecutively. Section type selection is a design decision, not a template fill-in.
domain: frontend-design

## Applies To
- any marketing landing page or SaaS homepage
- hero section design decisions
- section sequence planning
- AI-generated landing page scaffolding

## Sections Taxonomy
- Hero: centered single-column OR 2-column split (60%/40%) OR left-aligned asymmetric with clamp(3rem, 7.5vw, 7rem) fluid h1
- Features: card grid (md:grid-cols-2 lg:grid-cols-3 gap-8) OR divider layout (horizontal rule between rows) OR alternating image/text
- Pricing: 3-column with featured card at scale(1.05) + z-index: 1 + border-top: 3px solid var(--accent) + shadow-xl
- Testimonials: masonry (columns: 3; break-inside: avoid) OR 3-column grid OR carousel with pauseOnMouseEnter
- Navigation: sticky top-0 with background: hsl(var(--bg) / 0.95) backdrop-filter: blur(8px), h-16, z-40
- Footer: grid-template-columns: 2fr repeat(4, 1fr) on xl; 2fr repeat(2, 1fr) on md; 1fr on mobile
- Section spacing: py-20 sm:py-32 vertical padding; max-w-6xl mx-auto px-4 container

## Counter Examples
- Card grid hero → card grid features → card grid pricing — three consecutive identical structures
- All sections centered, max-w-2xl, same padding — no structural variation, no rhythm
- Pure solid-color hero background — no depth, immediate AI-slop signal

## Behavior
- NEVER repeat the same section structure consecutively (two card grids in a row).
- Hero background: always add depth — radial-gradient, animated blur, or film grain. Never solid color.
- Featured pricing plan: use exactly ONE differentiation technique (scale OR accent border OR filled bg).
- Footer social icons: aria-label on each link; never rely on icon shape alone for accessibility.
- Section sequencing: hero → features → social proof (testimonials) → pricing → footer is the proven funnel.

## Child Atoms
- @community/pattern-hero-3-layouts
- @community/pattern-features-grid
- @community/pattern-pricing-section
- @community/pattern-testimonials-section
- @community/pattern-landing-navigation
- @community/pattern-landing-footer
- @community/constraint-section-spacing
