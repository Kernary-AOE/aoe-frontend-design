# ColorDarkModeCascade [rule] v1.0.0
Dark mode MUST be implemented via a CSS-cascade strategy keyed on `@media (prefers-color-scheme: dark)` or a single root-level `[data-theme='dark']` selector that flips token values. Hand-edited per-component dark colors, JS-driven inline-style toggling, and duplicated 'dark' class variants are forbidden.
domain: visual-design

## Checks
- [ ] @community/check-color-dark-mode-cascade

## Applies To
@community/type-html-artifact

## Severity
high

## Severity Combination
```
component contains hardcoded dark-mode color literal       → BLOCK
dark mode driven by inline `style` set by JS               → BLOCK
dark mode delivered via cascading CSS custom properties    → PASS
```

## Failure Mode
Dark mode rollout requires editing every component; tokens drift between light and dark; users see flash-of-incorrect-theme (FOIT) on hydration; preference changes do not propagate without a reload.

## Remediation
- Define semantic tokens at `:root` (e.g. `--color-bg`, `--color-text`) and re-bind them inside `@media (prefers-color-scheme: dark) { :root { ... } }`.
- For user override, add `[data-theme='dark'] { ... }` at root only — never on individual components.
- Replace `<div className={isDark ? 'bg-black' : 'bg-white'}>` with `<div className='bg-surface'>` where `bg-surface` resolves through the cascade.
- See @impeccable/template-oklch-dark-mode-cascade for the canonical scaffold.

## Exceptions
-
  - **Case**: Brand asset with intentional fixed appearance
  - **Allowed When**: A logo or hero illustration is brand-locked; document with a comment and exclude via `@media (prefers-color-scheme) { ... }` opt-out.
