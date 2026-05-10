# ResourceHintsPreconnect [pattern] v1.0.0
Use <link rel='preconnect'> for critical third-party origins, <link rel='preload'> for critical first-party assets, and <link rel='dns-prefetch'> as a fallback for lower-priority origins — placed in <head> before any stylesheet or script tags.
domain: frontend-design

## Problem
Browsers discover third-party font, analytics, and API origins late in the parse — costing a full TCP/TLS handshake (100–300ms) before any data can transfer. First-party critical assets (fonts, hero images) are discovered even later in CSS.

## Solution
```
    Three hint types, in order of cost-effectiveness:

    1. preconnect — early TCP+TLS handshake with a cross-origin server.
       Use for: font providers, analytics, API hosts that will be hit on every page.
       <link rel="preconnect" href="https://fonts.googleapis.com">
       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    2. preload — fetch a specific resource with high priority before it is discovered in CSS/JS.
       Use for: above-the-fold fonts, hero images, critical JS chunks.
       <link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>
       <link rel="preload" href="/hero.avif" as="image">

    3. dns-prefetch — DNS lookup only, no TCP/TLS. Fallback for browsers not supporting preconnect.
       Use for: every cross-origin with a preconnect; add as a fallback.
       <link rel="dns-prefetch" href="https://analytics.example.com">
  
```

## Problem
Browsers discover third-party font, analytics, and API origins late in the parse — costing a full TCP/TLS handshake (100–300ms) before any data can transfer. First-party critical assets (fonts, hero images) are discovered even later in CSS.

## Solution
```
    Three hint types, in order of cost-effectiveness:

    1. preconnect — early TCP+TLS handshake with a cross-origin server.
       Use for: font providers, analytics, API hosts that will be hit on every page.
       <link rel="preconnect" href="https://fonts.googleapis.com">
       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    2. preload — fetch a specific resource with high priority before it is discovered in CSS/JS.
       Use for: above-the-fold fonts, hero images, critical JS chunks.
       <link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>
       <link rel="preload" href="/hero.avif" as="image">

    3. dns-prefetch — DNS lookup only, no TCP/TLS. Fallback for browsers not supporting preconnect.
       Use for: every cross-origin with a preconnect; add as a fallback.
       <link rel="dns-prefetch" href="https://analytics.example.com">
  
```
