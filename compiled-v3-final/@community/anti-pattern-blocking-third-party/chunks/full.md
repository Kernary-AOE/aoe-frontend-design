# BlockingThirdParty [anti-pattern] v1.0.0
Loading third-party JavaScript (analytics, ads, tag managers, marketing pixels, A/B testing snippets) synchronously in the <head> blocks the parser, delays First Contentful Paint, and exposes the page's performance to the slowest external dependency.
domain: performance

## Label
Blocking Third-Party Scripts in <head>

## Why Bad
A synchronous <script src='https://third-party.example/snippet.js'></script> in <head> halts HTML parsing until the script is fetched, parsed, and executed. If the third party is slow or unreachable (DNS timeout, regional outage, ad blocker partially blocking), your page is hostage. HTTPArchive 2024 data: median page loads 24 third-party requests; the slowest single third-party adds 800–1500ms to TTI on 4G. Worst offenders: Google Tag Manager loaded synchronously (often 200KB+ uncompressed once chained tags load), Optimizely / VWO snippets that flicker-block to prevent FOUC, Intercom messenger that ships 700KB on every page even when chat is closed. Result: LCP misses 'Good' threshold, mobile users bounce, SEO ranking drops. The third party usually does not need to block — analytics events work fine if fired 2 seconds later; marketing pixels work if loaded after main content.

## Instead Do
Default ALL third-party scripts to `async` or `defer`. Use `defer` when scripts depend on DOM (most analytics); use `async` when independent (RUM beacons). Lazy-load chat widgets (Intercom, Drift) only after user intent (scroll past 50% / open chat tab). Move marketing/analytics initialization behind `requestIdleCallback`. For tag managers, ship a static configuration at build time instead of runtime tag injection. Self-host critical third-party libraries you control (e.g. analytics) with a CDN edge. Audit with `<script src=...>` searches in your HTML and the Lighthouse 'third-party-summary' audit. Set a budget: third-party blocking time ≤ 250ms on a slow 4G run; CI fails if exceeded.

## Structure
```
    <!-- WRONG — synchronous render-blocking -->
    <head>
      <title>...</title>
      <script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
      <script src="https://www.googleoptimize.com/optimize.js?id=OPT-XXXX"></script>
      <script src="https://widget.intercom.io/widget/xxx.js"></script>
    </head>

    <!-- WRONG — defer + sync mixed; the sync one still blocks -->
    <script defer src="analytics.js"></script>
    <script src="critical.js"></script>   <!-- blocks despite defer above -->

    <!-- CORRECT — defer all third-party with explicit hints -->
    <head>
      <title>...</title>
      <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
      <link rel="dns-prefetch" href="https://widget.intercom.io">

      <!-- analytics: defer, runs after DOMContentLoaded -->
      <script defer src="https://www.googletagmanager.com/gtag/js?id=GA_X"></script>

      <!-- chat widget: lazy-load on intent -->
      <script>
        // Load Intercom only when user clicks the chat button OR after 30s idle
        const loadIntercom = () => {
          const s = document.createElement('script');
          s.src = 'https://widget.intercom.io/widget/xxx.js';
          s.async = true;
          document.head.appendChild(s);
        };
        document.querySelector('#chat-trigger')?.addEventListener('click', loadIntercom);
        if ('requestIdleCallback' in window) {
          requestIdleCallback(loadIntercom, { timeout: 30000 });
        }
      </script>
    </head>

    <!-- BETTER — main-thread offload via Partytown -->
    <script type="text/partytown" src="https://gtag.com/..."></script>
    <!-- runs in a Web Worker; main thread stays responsive -->
  
```

## Relations
enhances: @community/metric-lcp-largest-contentful-paint

## Label
Blocking Third-Party Scripts in <head>

## Why Bad
A synchronous <script src='https://third-party.example/snippet.js'></script> in <head> halts HTML parsing until the script is fetched, parsed, and executed. If the third party is slow or unreachable (DNS timeout, regional outage, ad blocker partially blocking), your page is hostage. HTTPArchive 2024 data: median page loads 24 third-party requests; the slowest single third-party adds 800–1500ms to TTI on 4G. Worst offenders: Google Tag Manager loaded synchronously (often 200KB+ uncompressed once chained tags load), Optimizely / VWO snippets that flicker-block to prevent FOUC, Intercom messenger that ships 700KB on every page even when chat is closed. Result: LCP misses 'Good' threshold, mobile users bounce, SEO ranking drops. The third party usually does not need to block — analytics events work fine if fired 2 seconds later; marketing pixels work if loaded after main content.

## Instead Do
Default ALL third-party scripts to `async` or `defer`. Use `defer` when scripts depend on DOM (most analytics); use `async` when independent (RUM beacons). Lazy-load chat widgets (Intercom, Drift) only after user intent (scroll past 50% / open chat tab). Move marketing/analytics initialization behind `requestIdleCallback`. For tag managers, ship a static configuration at build time instead of runtime tag injection. Self-host critical third-party libraries you control (e.g. analytics) with a CDN edge. Audit with `<script src=...>` searches in your HTML and the Lighthouse 'third-party-summary' audit. Set a budget: third-party blocking time ≤ 250ms on a slow 4G run; CI fails if exceeded.

## Structure
```
    <!-- WRONG — synchronous render-blocking -->
    <head>
      <title>...</title>
      <script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
      <script src="https://www.googleoptimize.com/optimize.js?id=OPT-XXXX"></script>
      <script src="https://widget.intercom.io/widget/xxx.js"></script>
    </head>

    <!-- WRONG — defer + sync mixed; the sync one still blocks -->
    <script defer src="analytics.js"></script>
    <script src="critical.js"></script>   <!-- blocks despite defer above -->

    <!-- CORRECT — defer all third-party with explicit hints -->
    <head>
      <title>...</title>
      <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
      <link rel="dns-prefetch" href="https://widget.intercom.io">

      <!-- analytics: defer, runs after DOMContentLoaded -->
      <script defer src="https://www.googletagmanager.com/gtag/js?id=GA_X"></script>

      <!-- chat widget: lazy-load on intent -->
      <script>
        // Load Intercom only when user clicks the chat button OR after 30s idle
        const loadIntercom = () => {
          const s = document.createElement('script');
          s.src = 'https://widget.intercom.io/widget/xxx.js';
          s.async = true;
          document.head.appendChild(s);
        };
        document.querySelector('#chat-trigger')?.addEventListener('click', loadIntercom);
        if ('requestIdleCallback' in window) {
          requestIdleCallback(loadIntercom, { timeout: 30000 });
        }
      </script>
    </head>

    <!-- BETTER — main-thread offload via Partytown -->
    <script type="text/partytown" src="https://gtag.com/..."></script>
    <!-- runs in a Web Worker; main thread stays responsive -->
  
```

## Enhances
@community/metric-lcp-largest-contentful-paint
