# Performance Budget Bundle [collection] v1.0.0
Atoms required to set up and enforce a Core Web Vitals performance budget across CI and production. Combines synthetic Lighthouse gates, RUM telemetry via web-vitals.js, image and third-party rules, and the underlying RAIL targets that anchor the budget.

## Includes
- @community/fact-rail-targets
- @community/principle-perceived-vs-actual
- @community/rule-cls-budget
- @community/metric-lcp-largest-contentful-paint
- @community/metric-cls-cumulative-layout-shift
- @community/pattern-image-lcp-priority
- @community/anti-pattern-blocking-third-party
- @community/tool-lighthouse
- @community/tool-web-vitals-js

## Target
claude-code

## Entry Point
```
    When establishing a performance budget for a web product, this bundle enforces:

    1. SET TARGETS (Core Web Vitals 'Good')
       - LCP ≤ 2.5s (75th percentile of mobile users on slow 4G)
       - INP ≤ 200ms
       - CLS ≤ 0.1
       - Use @community/fact-rail-targets as the canonical source.

    2. SYNTHETIC GATES (CI)
       - Run Lighthouse CI on every PR (mobile preset, simulated slow 4G).
       - Fail PRs whose performance score regresses ≥ 5 points OR whose CLS regresses ≥ 0.05.
       - Configure budgets in lighthouserc.json:
         {
           "assertions": {
             "categories:performance": ["error", { "minScore": 0.85 }],
             "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
             "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }]
           }
         }

    3. REAL USER MONITORING (Production)
       - Ship web-vitals.js to all users; report metrics to analytics endpoint.
       - Dashboard: p75 LCP, INP, CLS by route, country, device class.
       - Alert when rolling 24h p75 crosses 'Good' threshold.

    4. PATTERNS TO HIT TARGETS
       - LCP image: preload + fetchpriority=high + AVIF/WebP + reserved dimensions (@community/pattern-image-lcp-priority).
       - Webfonts: preload + font-display: optional or swap with size-adjust.
       - Third-party: defer/async, lazy-load on intent (@community/anti-pattern-blocking-third-party).
       - Layout stability: explicit width/height on every image/iframe (@community/rule-cls-budget).

    5. PERCEIVED PERFORMANCE
       - 100ms input acknowledgment (Doherty threshold).
       - Optimistic UI for list mutations.
       - Skeleton states match final dimensions.
       - See @community/principle-perceived-vs-actual.

    6. THIRD-PARTY DISCIPLINE
       - Audit script tags monthly; fail CI if total third-party blocking time > 250ms.
       - Self-host critical libraries; use Partytown for analytics/marketing where appropriate.

    7. PERFORMANCE REVIEW CADENCE
       - Weekly: review CrUX p75 vs synthetic Lighthouse delta.
       - Monthly: third-party audit; image audit (find oversized assets).
       - Quarterly: full performance review with leadership; reset budgets if needed.
  
```

## Recommended Implementation
```
    1. Install `@lhci/cli` and add to GitHub Actions / GitLab CI on every PR.
    2. Install `web-vitals` package; ship from layout/_app:
       ```ts
       import { onCLS, onINP, onLCP } from 'web-vitals';
       const send = (m) => navigator.sendBeacon('/vitals', JSON.stringify(m));
       onCLS(send); onINP(send); onLCP(send);
       ```
    3. Endpoint persists to ClickHouse / BigQuery / Snowflake.
    4. Dashboard: Grafana / Looker / Mode showing p75 by URL pattern, geography, device.
    5. Set up PagerDuty alert when p75 LCP > 2.5s for > 24h on a top-50-pageview route.
  
```
