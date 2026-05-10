# SkipLink [rule] v1.0.0
Documents with repeated header / navigation chrome MUST provide a 'skip to main content' link as the first focusable element. WCAG 2.2 SC 2.4.1 (Bypass Blocks) requires a mechanism for keyboard users to skip past blocks of content that repeat across pages.
domain: accessibility

## Checks
- [ ] @community/check-skip-link

## Applies To
@community/type-html-artifact

## Severity
high

## Severity Combination
```
no skip link AND nav has >5 links → BLOCK  (SC 2.4.1)
skip link present but hidden (display: none) → BLOCK  (not focusable)
skip link present, visually-hidden until focus → PASS
skip link present, always visible              → PASS
```

## Failure Mode
Keyboard users tab through 30+ navigation links on every page load before reaching content; screen-reader users without a 'navigate by landmark' shortcut are equally stuck. WCAG Level A fails.

## Remediation
- Add as the first child of `<body>`: `<a class='skip-link' href='#main'>Skip to main content</a>` and ensure `<main id='main' tabindex='-1'>` exists.
- Style with visually-hidden until focus: `.skip-link { position: absolute; left: -9999px; } .skip-link:focus { left: 1rem; top: 1rem; }`.
- Verify on focus that the indicator is visible (not behind a sticky header).

## Exceptions
-
  - **Case**: Single-page widget with no navigation
  - **Allowed When**: An embedded widget has no repeating chrome to skip; the rule does not apply.
-
  - **Case**: Sites using ARIA landmarks
  - **Allowed When**: WCAG accepts ARIA landmark navigation as an equivalent bypass mechanism — but a visible skip link is still recommended for non-screen-reader keyboard users.
