# ImageOptimization [rule] v1.0.0
Every raster image in an HTML artifact MUST: (a) declare `loading='lazy'` for below-the-fold images, (b) be served in a next-gen format (WebP or AVIF) with a fallback, and (c) provide a `srcset` / `<picture>` for responsive resolution selection. Missing any of these wastes bandwidth, blocks Largest Contentful Paint (LCP), and harms Core Web Vitals.
domain: performance

## Checks
- [ ] @community/check-image-optimization

## Applies To
@community/type-html-artifact

## Severity
high

## Severity Combination
```
below-fold image without loading='lazy'        → BLOCK
image served only as JPEG/PNG (no WebP/AVIF)   → BLOCK
image without srcset on responsive layout      → WARN
above-fold hero with loading='lazy' (regression) → BLOCK
all three present                              → PASS
```

## Failure Mode
First-load payload includes hundreds of KB of unused-yet image data; LCP exceeds 2.5s on 3G; Core Web Vitals fail; SEO ranking drops; users on data plans abandon.

## Remediation
- Use Next.js `<Image>` / Astro `<Image>` / WordPress 6.5+ — these handle lazy + srcset + format negotiation automatically.
- For raw `<img>`: `<img src='hero.webp' srcset='hero.webp 1x, hero@2x.webp 2x' loading='lazy' decoding='async' width='800' height='600' alt='...'>`.
- For art-direction breakpoints: use `<picture><source media='(min-width: 768px)' srcset='wide.avif' type='image/avif'><img ...></picture>`.
- Above-the-fold hero: `loading='eager'` AND `fetchpriority='high'` — never lazy-load LCP candidates.
- Always declare explicit `width` and `height` to prevent CLS.

## Exceptions
-
  - **Case**: SVG / icons
  - **Allowed When**: SVG is already optimal; lazy-loading inline SVG is a no-op. Format conversion does not apply.
-
  - **Case**: User-uploaded content
  - **Allowed When**: Server-side image pipeline (e.g. Cloudinary, Imgix) handles format / srcset; the source artifact may be the original.
-
  - **Case**: Above-the-fold hero
  - **Allowed When**: loading='lazy' is forbidden; use loading='eager' + fetchpriority='high'.

## Applies To
@community/type-html-artifact

## Severity
high

## Validates With
- @community/fact-consistency-standards

## Severity Combination
```
below-fold image without loading='lazy'        → BLOCK
image served only as JPEG/PNG (no WebP/AVIF)   → BLOCK
image without srcset on responsive layout      → WARN
above-fold hero with loading='lazy' (regression) → BLOCK
all three present                              → PASS
```

## Failure Mode
First-load payload includes hundreds of KB of unused-yet image data; LCP exceeds 2.5s on 3G; Core Web Vitals fail; SEO ranking drops; users on data plans abandon.

## Remediation
- Use Next.js `<Image>` / Astro `<Image>` / WordPress 6.5+ — these handle lazy + srcset + format negotiation automatically.
- For raw `<img>`: `<img src='hero.webp' srcset='hero.webp 1x, hero@2x.webp 2x' loading='lazy' decoding='async' width='800' height='600' alt='...'>`.
- For art-direction breakpoints: use `<picture><source media='(min-width: 768px)' srcset='wide.avif' type='image/avif'><img ...></picture>`.
- Above-the-fold hero: `loading='eager'` AND `fetchpriority='high'` — never lazy-load LCP candidates.
- Always declare explicit `width` and `height` to prevent CLS.

## Exceptions
-
  - **Case**: SVG / icons
  - **Allowed When**: SVG is already optimal; lazy-loading inline SVG is a no-op. Format conversion does not apply.
-
  - **Case**: User-uploaded content
  - **Allowed When**: Server-side image pipeline (e.g. Cloudinary, Imgix) handles format / srcset; the source artifact may be the original.
-
  - **Case**: Above-the-fold hero
  - **Allowed When**: loading='lazy' is forbidden; use loading='eager' + fetchpriority='high'.

## See Also
- @community/check-image-optimization
