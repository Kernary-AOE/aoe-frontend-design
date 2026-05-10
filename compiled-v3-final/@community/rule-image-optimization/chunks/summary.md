# ImageOptimization [rule] v1.0.0
Every raster image in an HTML artifact MUST: (a) declare `loading='lazy'` for below-the-fold images, (b) be served in a next-gen format (WebP or AVIF) with a fallback, and (c) provide a `srcset` / `<picture>` for responsive resolution selection. Missing any of these wastes bandwidth, blocks Largest Contentful Paint (LCP), and harms Core Web Vitals.
domain: performance
