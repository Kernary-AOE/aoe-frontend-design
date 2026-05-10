# HardcodedPixelValues [anti-pattern] v1.0.0
Writing raw pixel values (`padding: 16px`, `font-size: 14px`, `border-radius: 8px`) directly into component CSS instead of referencing CSS custom properties or design tokens. The values may individually look correct, but they bypass the token layer that allows theming, scaling, and consistent global change.
domain: design-system

## Label
Hardcoded Pixel Values Instead of Design Tokens

## Trap
Pixel values feel concrete and unambiguous — you can see them in the design tool and copy them directly. Tokens feel like extra indirection. AI agents in particular default to literal values because training data is full of inline pixel CSS, and the agent has no incentive to invent token names without instruction.

## Counter Examples
- @community/counter-example-hardcoded-pixel-padding

## Detection Heuristics
- Component CSS contains numeric `px`/`rem` literals (16px, 1.5rem) outside of a `:root` token-definition block
- More than 30% of spacing/sizing declarations use raw values instead of `var(--space-*)` or `var(--size-*)`
- Same pixel value (e.g. `16px`) appears in 5+ files — clear sign it should have been one token
- No `:root { --space-*: ... }` block exists in the project's base stylesheet
- Tailwind users: arbitrary values like `p-[13px]`, `text-[15px]`, `mt-[22px]` instead of theme scale classes

## Remediation
- Define a base token set: `--space-xs: 4px; --space-sm: 8px; --space-md: 16px; --space-lg: 24px; --space-xl: 32px;` in `:root`.
- Mirror for radius and font-size: `--radius-sm/md/lg`, `--font-size-sm/base/lg/xl`.
- Replace all raw px values with `var(--space-md)` etc. — use a codemod or find-and-replace per value.
- For Tailwind: extend `theme.spacing` in tailwind.config rather than using `[13px]` arbitrary values.
- See @community/type-design-token for the canonical token schema.

## Severity
high

## Label
Hardcoded Pixel Values Instead of Design Tokens

## Trap
Pixel values feel concrete and unambiguous — you can see them in the design tool and copy them directly. Tokens feel like extra indirection. AI agents in particular default to literal values because training data is full of inline pixel CSS, and the agent has no incentive to invent token names without instruction.

## Counter Examples
- @community/counter-example-hardcoded-pixel-padding

## Detection Heuristics
- Component CSS contains numeric `px`/`rem` literals (16px, 1.5rem) outside of a `:root` token-definition block
- More than 30% of spacing/sizing declarations use raw values instead of `var(--space-*)` or `var(--size-*)`
- Same pixel value (e.g. `16px`) appears in 5+ files — clear sign it should have been one token
- No `:root { --space-*: ... }` block exists in the project's base stylesheet
- Tailwind users: arbitrary values like `p-[13px]`, `text-[15px]`, `mt-[22px]` instead of theme scale classes

## Remediation
- Define a base token set: `--space-xs: 4px; --space-sm: 8px; --space-md: 16px; --space-lg: 24px; --space-xl: 32px;` in `:root`.
- Mirror for radius and font-size: `--radius-sm/md/lg`, `--font-size-sm/base/lg/xl`.
- Replace all raw px values with `var(--space-md)` etc. — use a codemod or find-and-replace per value.
- For Tailwind: extend `theme.spacing` in tailwind.config rather than using `[13px]` arbitrary values.
- See @community/type-design-token for the canonical token schema.

## Severity
high
