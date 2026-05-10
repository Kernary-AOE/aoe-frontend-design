# AdaptiveImagesDarkMode [pattern] v1.0.0
domain: frontend-design

## Label
Adaptive Images for Dark Mode via <picture> Element

## Problem
Logos, illustrations, and decorative images designed for light backgrounds become invisible, glaring, or aesthetically wrong when a dark-mode palette is applied. CSS `filter: invert()` is a blunt workaround that breaks color fidelity and ignores brand intent.

## Solution
Use the HTML <picture> element with a <source srcset> carrying a `media='(prefers-color-scheme: dark)'` attribute to serve a purpose-built dark variant. The fallback <img> serves the light version.

## Structure
```
    <!-- Adaptive image: serves dark variant when dark mode is active -->
    <picture>
      <source
        srcset="/assets/logo-dark.svg"
        media="(prefers-color-scheme: dark)"
      >
      <img
        src="/assets/logo-light.svg"
        alt="Company logo"
        width="120"
        height="40"
      >
    </picture>

    <!-- Same pattern for photographs that need a different crop/exposure -->
    <picture>
      <source
        srcset="/assets/hero-dark.webp"
        media="(prefers-color-scheme: dark)"
      >
      <img
        src="/assets/hero-light.webp"
        alt="Product hero illustration"
        loading="lazy"
        decoding="async"
      >
    </picture>
  
```

## Use When
- a logo, illustration, or icon looks invisible or harsh against a dark background
- a decorative hero image needs a different exposure, crop, or color treatment in dark mode
- a branded screenshot or mockup contains white backgrounds that break against dark surfaces
- an SVG illustration uses hardcoded fill values inappropriate for dark backgrounds
