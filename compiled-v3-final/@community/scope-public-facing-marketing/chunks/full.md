# PublicFacingMarketing [scope] v1.0.0
Defines the applicability scope for atoms aimed at public landing pages, marketing sites, blog/docs, and pre-auth surfaces. These atoms emphasize brand expressiveness, SEO, conversion, and first-paint performance — and are NOT appropriate for authenticated app surfaces (dashboards, settings, data tables).
domain: frontend-design

## Label
Public-Facing Marketing / Landing Pages

## Preconditions
-
  - **Id**: audience-anonymous
  - **Check**: page audience includes first-time anonymous visitors who have NOT logged in
  - **On Fail**: Use app-scope atoms for authenticated surfaces.
-
  - **Id**: seo-matters
  - **Check**: page is indexable by search engines (no `noindex` meta) and ranking matters for the business
  - **On Fail**: If purely internal/auth-walled, treat as app surface.
-
  - **Id**: first-paint-critical
  - **Check**: LCP target < 2.5s on 4G, FCP target < 1.8s — see @community/metric-lcp-largest-contentful-paint
  - **On Fail**: Marketing pages must hit Core Web Vitals; defer heavy interactivity.

## Applies To
- Landing pages, hero sections, feature pages
- Pricing pages, comparison pages
- Public blog and changelog
- Documentation and help center (when public)
- Sign-up flows pre-account-creation
- About/team/careers pages

## Out Of Scope
- Authenticated dashboards, admin panels, settings
- Internal-only B2B applications
- Component library demos (use design-system scope)
- Customer support tools and CRMs (use app scope)

## Defaults
- **Rendering**: SSG or SSR with CDN cache — see @community/tradeoff-server-vs-client-rendering
- **Interactivity Budget**: minimal — JS only for nav, forms, conditional reveals
- **Image Strategy**: AVIF/WebP with responsive srcset; LCP image preloaded
- **Font Strategy**: self-hosted with `font-display: swap`; preload primary face
- **Analytics**: consent-gated; respect Do-Not-Track and GPC

## Brand Expressiveness
- **Tone**: high — marketing is the primary brand surface
- **Distinctiveness**: required — see @impeccable/principle-distinctiveness
- **Motion**: purposeful, respects prefers-reduced-motion
- **Typography**: may use display fonts; body must remain legible
