# FontLoadingFoutFoit [rule] v1.0.0
Every `@font-face` declaration for a custom web font MUST include `font-display: swap` to prevent FOIT (Flash of Invisible Text — up to 3 s of blank text) and control FOUT (Flash of Unstyled Text) by showing the fallback font immediately.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
high

## Remediation
- Add `font-display: swap;` to every @font-face in author CSS.
- For Google Fonts URL: append `&display=swap` to the import URL.
- For Fontshare / Bunny Fonts: check their embed URLs include display=swap.
- For decorative display faces that cause layout shift: use `font-display: optional` instead.
- Supplement with `<link rel='preload' as='font' type='font/woff2' crossorigin>` for the above-the-fold font subset.

## Exceptions
-
  - **Case**: Icon fonts loaded as @font-face
  - **Allowed When**: Decorative icon fallback is invisible — `font-display: block` may be appropriate to avoid icon substitution flash.
