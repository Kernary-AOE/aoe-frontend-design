# MagicNumbers [anti-pattern] v1.0.0
Numeric values that have no traceable origin: `padding: 13px`, `top: 47px`, `width: calc(100% - 73px)`, `transform: translateY(-2.5rem)`. Unlike hardcoded-pixel-values (which are at least canonical step sizes like 16/24/32), magic numbers are off-grid values invented to make a particular layout look right at one viewport. They are unmaintainable because nobody — including the original author — remembers why they exist.
domain: design-system

## Label
Magic Numbers in Style and Layout Code

## Trap
When pushing pixels at 2am to fix a misaligned element, the fastest path is to nudge the value until it looks right. `12px` becomes `13px` becomes `13.5px`. There is no immediate cost. The cost arrives later: the next person cannot tell whether the 13px is intentional or a leftover from someone's drift.

## Counter Examples
- @community/counter-example-magic-number-padding

## Detection Heuristics
- Spacing values are off the 4px or 8px grid: `7px`, `13px`, `17px`, `23px`
- `calc()` expressions with raw constants: `calc(100% - 73px)`, `calc(50vh + 41px)`
- Negative margins or transforms with arbitrary offsets: `margin-top: -23px`
- `z-index` values like `999`, `9999`, `99999` (no scale defined)
- Comments next to values explaining the magic: `/* magic number to fix Safari */ height: 41px;`

## Remediation
- Round to the nearest token step (4px or 8px grid). If 13px was needed for visual reasons, the underlying problem is usually wrong line-height or padding on a sibling — fix that.
- Replace `calc(100% - 73px)` with named CSS variables: `calc(100% - var(--header-height))`.
- Define a z-index scale: `--z-dropdown: 10; --z-sticky: 20; --z-overlay: 30; --z-modal: 40; --z-toast: 50;`
- If a magic number is truly needed (e.g. browser bug workaround), name it with a CSS custom property and add a comment explaining the bug.
- Run a linter rule (e.g. `stylelint-no-magic-number`) to block future regressions.

## Severity
medium

## Label
Magic Numbers in Style and Layout Code

## Trap
When pushing pixels at 2am to fix a misaligned element, the fastest path is to nudge the value until it looks right. `12px` becomes `13px` becomes `13.5px`. There is no immediate cost. The cost arrives later: the next person cannot tell whether the 13px is intentional or a leftover from someone's drift.

## Counter Examples
- @community/counter-example-magic-number-padding

## Detection Heuristics
- Spacing values are off the 4px or 8px grid: `7px`, `13px`, `17px`, `23px`
- `calc()` expressions with raw constants: `calc(100% - 73px)`, `calc(50vh + 41px)`
- Negative margins or transforms with arbitrary offsets: `margin-top: -23px`
- `z-index` values like `999`, `9999`, `99999` (no scale defined)
- Comments next to values explaining the magic: `/* magic number to fix Safari */ height: 41px;`

## Remediation
- Round to the nearest token step (4px or 8px grid). If 13px was needed for visual reasons, the underlying problem is usually wrong line-height or padding on a sibling — fix that.
- Replace `calc(100% - 73px)` with named CSS variables: `calc(100% - var(--header-height))`.
- Define a z-index scale: `--z-dropdown: 10; --z-sticky: 20; --z-overlay: 30; --z-modal: 40; --z-toast: 50;`
- If a magic number is truly needed (e.g. browser bug workaround), name it with a CSS custom property and add a comment explaining the bug.
- Run a linter rule (e.g. `stylelint-no-magic-number`) to block future regressions.

## Severity
medium
