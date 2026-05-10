# ServerVsClientRendering [tradeoff] v1.0.0
Choosing where rendering happens shapes performance, SEO, complexity, and developer experience. SSR streams HTML on every request, SSG pre-renders at build time, and CSR ships a JS bundle that hydrates a shell. There is no globally correct answer — the choice depends on content freshness, traffic shape, and the team's operational maturity.
domain: frontend-engineering

## Label
Server (SSR/SSG) vs Client (CSR) Rendering

## Axes
- time-to-first-byte
- time-to-interactive
- seo
- build-time
- infra-cost
- data-freshness
- team-complexity

## Decision
```
if content-is-mostly-static AND personalization == none:
→ SSG (static-site-generation)
first-byte: <50ms (CDN edge)
seo: excellent (full HTML at crawl time)
cost: lowest (no runtime compute)
freshness: rebuild on content change OR use ISR/on-demand revalidation

elif page-needs-per-request-data OR auth-gated:
→ SSR (server-side rendering)
first-byte: 100–400ms (server compute)
seo: excellent
cost: middle (server cost scales with traffic)
freshness: real-time

elif app-is-behind-login AND seo-irrelevant:
→ CSR (client-side rendering / SPA)
first-byte: <50ms (static shell)
time-to-interactive: 1–4s (depends on bundle size)
seo: poor without prerender
cost: low (CDN-only)
freshness: real-time via API

else:
→ hybrid: SSG for marketing, SSR for app, CSR within app shell
modern frameworks (Next.js, Remix, SvelteKit) make this the default
```

## Cost Of Ssr
- Server compute scales linearly with traffic — cold starts on serverless add 100–500ms p99 latency
- Streaming/Suspense complexity for partial hydration
- Tighter coupling between server runtime and client bundle versions
- Edge-runtime constraints (no Node APIs, smaller cold-start budget)

## Cost Of Ssg
- Build time grows with page count — 10k+ pages may need ISR/on-demand instead of full rebuild
- Stale data window between builds (mitigated by ISR/revalidation)
- Personalized content must be deferred to client-side fetch

## Cost Of Csr
- Empty HTML shell hurts SEO unless prerendered
- Time-to-interactive penalty (LCP and FCP suffer) — see @community/metric-lcp-largest-contentful-paint
- JS-disabled users see nothing
- Layout shift risk during hydration — see @community/metric-cls-cumulative-layout-shift
