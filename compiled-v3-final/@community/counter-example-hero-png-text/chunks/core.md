# HeroPngText [counter-example] v1.0.0
A landing-page hero where the gradient headline 'The future of finance.' and the 'Get started' button are both inside a single transparent PNG export from Figma. The page's main value proposition is invisible to screen readers, search engines, and translation tools.
domain: accessibility

## Label
Hero Section Where Headline And CTA Are Baked Into A PNG

## Bad Code
```
<section className="hero">
<img
src="/hero-banner.png"
alt="The future of finance. Get started."
width="1440"
height="600"
/>
</section>
```

## Why Bad
- Headline and CTA are both rasterized — text cannot be selected, copied, or translated by browser tools
- Screen readers announce one long alt string instead of an H1 followed by a button (no landmark structure)
- Search engines index the alt text as a single phrase — no heading weight for SEO
- On retina displays the PNG renders blurry unless served at 2x/3x densities (extra weight)
- On mobile, text doesn't reflow — overflows or shrinks below 12px
- 'Get started' is an image, not a `<button>` or `<a>` — clicking the image is the only path; keyboard users can't tab to it
- Violates WCAG 1.4.5 (Images of Text, Level AA)

## Good Code
```
<section className="hero">
<div className="hero__bg" aria-hidden="true">
{/* decorative gradient background — no text inside */}
</div>
<div className="hero__content">
<h1 className="hero__title">
The future of finance.
</h1>
<p className="hero__lede">
Banking infrastructure for the next billion users.
</p>
<a href="/signup" className="hero__cta">
Get started
</a>
</div>
</section>

/* CSS — gradient text effect in CSS, no PNG needed */
.hero__title {
font-size: clamp(2.5rem, 6vw, 5rem);
font-weight: 700;
background: linear-gradient(135deg, var(--brand-500), var(--brand-700));
-webkit-background-clip: text;
background-clip: text;
color: transparent;
}
.hero__cta {
display: inline-block;
background: var(--brand-500);
color: var(--brand-fg);
padding: var(--space-md) var(--space-xl);
border-radius: var(--radius-md);
font-weight: 600;
}
.hero__cta:focus-visible {
outline: 2px solid var(--ring);
outline-offset: 2px;
}
```

## Why Good
- Real `<h1>` — search engines index it as the page's primary heading; screen readers navigate by landmark
- Real `<a>` for the CTA — keyboard tab-reachable, Enter activates, screen readers announce 'link, Get started'
- Gradient effect achieved with `background-clip: text` — same visual, fully accessible text underneath
- `clamp()` font-size reflows fluidly from mobile to desktop without rasterization blur
- Translation tools (browser auto-translate, locale builds) can replace strings without re-exporting from design
- Satisfies WCAG 1.4.5 — no text in images except where essential (logo, brand mark)

## Anti Pattern
@community/anti-pattern-text-in-image
