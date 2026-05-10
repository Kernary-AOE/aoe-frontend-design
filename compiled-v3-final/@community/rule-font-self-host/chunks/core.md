# FontSelfHost [rule] v1.0.0
Production web fonts MUST be self-hosted as WOFF2 files under the project's origin, not loaded from Google Fonts CDN or third-party font services, to eliminate third-party DNS latency (50–200 ms per domain), comply with GDPR (no IP leak to Google), and ensure availability when external CDNs are blocked.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
high

## Remediation
- Download WOFF2 files from Google Fonts (use google-webfonts-helper.herokuapp.com or fontsource npm packages).
- Use `npm install @fontsource/geist` (Fontsource) for maintained self-hosted packages with tree-shaking.
- Place files under `/public/fonts/` and reference with relative URL in @font-face.
- Add `Cache-Control: public, max-age=31536000, immutable` for font files — they are versioned by filename.
- For variable fonts: a single WOFF2 file replaces multiple weight files; ensure the font supports the required axes.

## Exceptions
-
  - **Case**: Rapid prototype or internal tool
  - **Allowed When**: GDPR does not apply (internal EU exemption), performance is not critical, and the prototype will not ship to production.
-
  - **Case**: Licensed fonts requiring CDN delivery
  - **Allowed When**: The font license explicitly requires delivery via the vendor's CDN (e.g., some Adobe Fonts plans); document the exception in BRAND.md.
