# WebSafeFallbackStack [rule] v1.0.0
Every `font-family` declaration for a custom web font MUST include a web-safe generic fallback stack ending in `serif`, `sans-serif`, or `monospace` — and SHOULD include at least one OS-native font (system-ui, -apple-system, 'Segoe UI', Roboto) before the generic to minimize layout shift when the custom font is absent.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
medium

## Quantitative
- **Sans Serif Stack**: 'CustomFont', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
- **Serif Stack**: 'CustomFont', Georgia, 'Times New Roman', serif
- **Monospace Stack**: 'CustomFont', 'JetBrains Mono', 'Fira Code', ui-monospace, 'Courier New', monospace
- **Size Adjust Note**: Use @font-face size-adjust + ascent-override + descent-override + line-gap-override to metric-match the fallback to the primary font and minimize FOUT-induced layout shift

## Remediation
- Always append `sans-serif` / `serif` / `monospace` as the final entry in every font-family stack.
- Include at least one OS-native font before the generic: `system-ui, -apple-system` (Apple), `'Segoe UI'` (Windows), `Roboto` (Android).
- For advanced FOUT elimination: use `@font-face` with `size-adjust` to metric-match the fallback to the primary.
- Test fallback by disabling web fonts in DevTools (Network tab → Block requests matching *.woff2).

## Rationale
When a web font fails to load (blocked CDN, font service outage, GDPR cookie rejection, offline mode), the browser falls back to the next font in the stack. Without a fallback, the browser applies the user-agent default — usually Times New Roman or equivalent — which often produces layout breaks. A curated fallback stack ensures legible, proportionally close rendering and prevents gross layout degradation.

## Applies To
@community/type-html-artifact

## Severity
medium

## Quantitative
- **Sans Serif Stack**: 'CustomFont', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
- **Serif Stack**: 'CustomFont', Georgia, 'Times New Roman', serif
- **Monospace Stack**: 'CustomFont', 'JetBrains Mono', 'Fira Code', ui-monospace, 'Courier New', monospace
- **Size Adjust Note**: Use @font-face size-adjust + ascent-override + descent-override + line-gap-override to metric-match the fallback to the primary font and minimize FOUT-induced layout shift

## Remediation
- Always append `sans-serif` / `serif` / `monospace` as the final entry in every font-family stack.
- Include at least one OS-native font before the generic: `system-ui, -apple-system` (Apple), `'Segoe UI'` (Windows), `Roboto` (Android).
- For advanced FOUT elimination: use `@font-face` with `size-adjust` to metric-match the fallback to the primary.
- Test fallback by disabling web fonts in DevTools (Network tab → Block requests matching *.woff2).
