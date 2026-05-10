# TextInImage [anti-pattern] v1.0.0
Rasterizing important headlines, CTAs, prices, or product names directly into a JPG/PNG hero image instead of marking them up as HTML text. The text cannot be selected, copied, translated, screen-readered, or scaled. On retina displays it looks blurry; on small viewports it doesn't reflow. SEO crawlers don't see it. The page's primary message is invisible to half the access methods on the web.
domain: accessibility

## Label
Critical Copy Burned Into Hero / Banner Image

## Trap
The marketing team designs hero banners in Figma with custom typography effects (gradients, masks, kerning, drop shadows) that 'aren't possible in CSS'. Exporting as PNG is the path of least resistance — it ships pixel-perfect from design. But almost every effect IS possible in CSS now (gradients, text-stroke, background-clip, variable fonts) — the team just doesn't know it. AI agents will follow Figma exports literally and emit `<img>` tags for hero banners.

## Counter Examples
- @community/counter-example-hero-png-text

## Detection Heuristics
- Hero `<img>` element's `alt` text matches body copy that should be HTML (more than ~10 words)
- Image filename suggests text content: `headline-launch.png`, `pricing-banner.jpg`
- Text in the rendered hero cannot be selected with cursor
- View page source: hero contains a single `<img>` tag where you'd expect `<h1>` + `<p>`
- Image asset is a transparent PNG containing only text and effects (no photographic content)
- Localization team can't translate the banner without re-exporting from design tool

## Remediation
- Move all text out of the image into HTML. Use real `<h1>`, `<h2>`, `<p>`, `<a>` elements.
- Reproduce visual effects in CSS: `background: linear-gradient(...) text` + `-webkit-background-clip: text`, `text-shadow`, `font-feature-settings`, variable fonts for unusual weights.
- If the image must remain (photographic background), layer text on top with `position: absolute` + a contrast-safe overlay.
- For decorative typography (logos, brand marks), keep as SVG with `<title>` element — vector, scalable, accessible.
- Provide rich `alt` text only for genuinely image-conveyed information; keep `alt=''` for decorative.
- Satisfies WCAG 1.4.5 (Images of Text, Level AA) — text in images must be avoided unless it's a logo or essential.

## Severity
high
