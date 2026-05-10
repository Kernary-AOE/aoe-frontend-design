# WebSafeFallbackStack [rule] v1.0.0
Every `font-family` declaration for a custom web font MUST include a web-safe generic fallback stack ending in `serif`, `sans-serif`, or `monospace` — and SHOULD include at least one OS-native font (system-ui, -apple-system, 'Segoe UI', Roboto) before the generic to minimize layout shift when the custom font is absent.
domain: frontend-design
