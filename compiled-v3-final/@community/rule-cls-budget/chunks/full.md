# ClsBudget [rule] v1.0.0
Every page must enforce a Cumulative Layout Shift (CLS) budget of ≤ 0.1 (Google's 'Good' threshold). CI fails the build when synthetic measurement crosses the threshold; production RUM rolling-p75 above 0.1 triggers an alert.
> Set a CLS budget of 0.1 (Lighthouse synthetic, mobile preset). Block PRs whose budget regression is >0.05 above main. Track field CLS via RUM (web-vitals.js + analytics endpoint) and alert on rolling-p75 ≥ 0.1 over a 24h window. Reserve dimensions for every image (`width`/`height` HTML attrs OR `aspect-ratio` CSS), every iframe, every ad slot, and every async-loaded section above the fold. Use `font-display: optional` or `swap` paired with `size-adjust`/`ascent-override` to eliminate FOUT-induced shifts. Animate only `transform` and `opacity` — never `top`/`left`/`width`/`height` for hover/focus/state transitions.
domain: performance

## Applies To
- Public-facing marketing pages (highest SEO leverage)
- Product detail pages with images, videos, and dynamic specs
- Article and blog pages with embeds (Twitter, YouTube, CodePen)
- App shell loading states — placeholders must match final dimensions
- Any page that monetizes via ads

## Implementation Checklist
- Lighthouse CI configured with `assertions: { 'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }] }`
- Every <img> has explicit width and height attributes (or aspect-ratio CSS)
- Every <iframe>, <video>, <embed> has reserved dimensions
- Ad slots have `min-height` reserved before request fires; container does not collapse if ad fails
- Webfont strategy: `font-display: optional` for body OR swap with `size-adjust`/`ascent-override` matched to fallback metrics (use Capsize / Fontaine to compute)
- Cookie banner overlays via `position: fixed`; never pushes content down
- Skeleton loaders match final content dimensions exactly (test with screenshots)
- RUM client sends CLS to analytics with `getCLS({reportAllChanges: true})` from web-vitals.js

## Severity
block

## Counter Examples
- <img src='hero.jpg' /> with no width/height — image loads, pushes content down by 600px, CLS = 0.4 on first paint.
- Cookie banner appended to <body> with display: block — pushes hero text down 80px on every visit. CLS = 0.18.
- Web font swap from system to Inter with no size-adjust — line heights change between FOUT and FOIT, CLS spikes 0.15 on font load.

## Examples
- Vercel: ships CLS budgets via @vercel/speed-insights; blocks deploys when synthetic CLS regresses ≥ 0.05.
- Smashing Magazine: applied `aspect-ratio` to all images + size-adjust on Mija/Elena fonts — CLS dropped from 0.32 to 0.04.
- Lighthouse CI: `lhci autorun` in GitHub Actions on every PR; comments synthetic CLS delta in PR description.

## Relations
enhances: @community/metric-cls-cumulative-layout-shift

## Rationale
CLS is one of three Core Web Vitals; Google ranks search results on it (since June 2021). Beyond SEO, CLS directly correlates with mis-tap rate: when an ad or banner appears where a button was, users tap the wrong target. Field studies (Google CrUX, Vercel Speed Insights) show median CLS is 0.05–0.15 on the average site — most failures are preventable by reserving space for known layout participants. The budget is enforceable; what gets measured gets fixed.

## Applies To
- Public-facing marketing pages (highest SEO leverage)
- Product detail pages with images, videos, and dynamic specs
- Article and blog pages with embeds (Twitter, YouTube, CodePen)
- App shell loading states — placeholders must match final dimensions
- Any page that monetizes via ads

## Implementation Checklist
- Lighthouse CI configured with `assertions: { 'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }] }`
- Every <img> has explicit width and height attributes (or aspect-ratio CSS)
- Every <iframe>, <video>, <embed> has reserved dimensions
- Ad slots have `min-height` reserved before request fires; container does not collapse if ad fails
- Webfont strategy: `font-display: optional` for body OR swap with `size-adjust`/`ascent-override` matched to fallback metrics (use Capsize / Fontaine to compute)
- Cookie banner overlays via `position: fixed`; never pushes content down
- Skeleton loaders match final content dimensions exactly (test with screenshots)
- RUM client sends CLS to analytics with `getCLS({reportAllChanges: true})` from web-vitals.js

## Severity
block

## Counter Examples
- <img src='hero.jpg' /> with no width/height — image loads, pushes content down by 600px, CLS = 0.4 on first paint.
- Cookie banner appended to <body> with display: block — pushes hero text down 80px on every visit. CLS = 0.18.
- Web font swap from system to Inter with no size-adjust — line heights change between FOUT and FOIT, CLS spikes 0.15 on font load.

## Enhances
@community/metric-cls-cumulative-layout-shift
