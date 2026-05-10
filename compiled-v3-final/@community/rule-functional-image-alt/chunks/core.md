# FunctionalImageAlt [rule] v1.0.0
An <img> that is the sole content of a <button> or <a> element must have alt text describing the action the control performs, not the visual appearance of the image, so screen readers announce an actionable label (WCAG SC 1.1.1 Non-text Content, Level A).
domain: frontend-design

## Rule
```
// Question to answer: "What does this button/link DO?" not "What does this image SHOW?"

// ✅ Functional — describes the action
<a href="/"><img src="logo.svg" alt="Go to homepage" /></a>
<button type="submit"><img src="search-icon.svg" alt="Search" /></button>
<a href="/cart"><img src="cart.svg" alt="View shopping cart" /></a>

// ❌ Describes image content, not action
<a href="/"><img src="logo.svg" alt="Company logo" /></a>
<button><img src="search-icon.svg" alt="Magnifying glass icon" /></button>

// ✅ Icon + visible text: alt="" (empty) — the visible text provides the accessible name
<button><img src="cart.svg" alt="" /> View cart</button>
```

## Severity
block

## Verification
For every <img> inside a <button> or <a> with no other text content, read the alt value aloud and ask 'does this tell me what the control does?' If not, rewrite to describe the action.

## Tools
- axe-core
- lighthouse
