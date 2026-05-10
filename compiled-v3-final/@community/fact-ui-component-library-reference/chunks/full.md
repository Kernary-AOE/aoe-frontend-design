# UiComponentLibraryReference [fact] v1.0.0
Curated tier-ranked reference of high-quality open-source component libraries for studying API design, accessibility patterns, and token architecture — not for blind npm install, but for extracting proven patterns.
> Study component libraries for their design decisions and a11y implementation. Extract patterns; don't blindly install them unless the task specifically requires it.
domain: frontend-design

## Tier 1 Api Design
- shadcn/ui (80k+ stars) — React + Radix + Tailwind: CVA variant composition, copy-paste architecture, token naming (--primary, --primary-foreground, --muted, --muted-foreground, --accent, --destructive)
- Radix Primitives (17k+) — unstyled accessible primitives: focus management, data-state attributes, roving tabindex for composite widgets (tabs, radio groups)
- Chakra UI (40k+) — dark mode tokens (useColorModeValue), as-prop polymorphism, a11y-first defaults

## Tier 2 Visual Tokens
- DaisyUI (40k+) — Tailwind semantic classes (btn-primary, card-body), 3000+ design tokens, theme presets
- Primer CSS (GitHub, 13k+) — production-tested semantic token architecture at scale
- Carbon (IBM, 9k+) — enterprise data-dense: table patterns, form patterns, data display

## Tier 3 Dashboard
- Tremor (tremor.so) — KPI cards, area/bar/donut charts, metric formatting
- Recharts (25k+) — React chart composition, ChartTooltip, ResponsiveContainer

## Key Patterns
- shadcn/ui CVA variants: cva('base-classes', { variants: { variant: {...}, size: {...} } })
- shadcn/ui radius cascade: --radius base → calc(var(--radius) - 2px) for sm, + 4px for xl
- Radix state attributes: data-state='open'/'closed', data-disabled — use for CSS-driven state
- Radix focus: onOpenAutoFocus, onCloseAutoFocus, modal prop for focus trapping

## Rules
- NEVER blindly npm install — understand the component first, then decide custom vs library.
- Study the a11y implementation — focus, keyboard, screen reader behavior.
- Extract the token architecture — how are colors, spacing, radius organized.
- Pick ONE library's patterns and be consistent — don't mix library conventions.

## Tier 1 Api Design
- shadcn/ui (80k+ stars) — React + Radix + Tailwind: CVA variant composition, copy-paste architecture, token naming (--primary, --primary-foreground, --muted, --muted-foreground, --accent, --destructive)
- Radix Primitives (17k+) — unstyled accessible primitives: focus management, data-state attributes, roving tabindex for composite widgets (tabs, radio groups)
- Chakra UI (40k+) — dark mode tokens (useColorModeValue), as-prop polymorphism, a11y-first defaults

## Tier 2 Visual Tokens
- DaisyUI (40k+) — Tailwind semantic classes (btn-primary, card-body), 3000+ design tokens, theme presets
- Primer CSS (GitHub, 13k+) — production-tested semantic token architecture at scale
- Carbon (IBM, 9k+) — enterprise data-dense: table patterns, form patterns, data display

## Tier 3 Dashboard
- Tremor (tremor.so) — KPI cards, area/bar/donut charts, metric formatting
- Recharts (25k+) — React chart composition, ChartTooltip, ResponsiveContainer

## Key Patterns
- shadcn/ui CVA variants: cva('base-classes', { variants: { variant: {...}, size: {...} } })
- shadcn/ui radius cascade: --radius base → calc(var(--radius) - 2px) for sm, + 4px for xl
- Radix state attributes: data-state='open'/'closed', data-disabled — use for CSS-driven state
- Radix focus: onOpenAutoFocus, onCloseAutoFocus, modal prop for focus trapping

## Rules
- NEVER blindly npm install — understand the component first, then decide custom vs library.
- Study the a11y implementation — focus, keyboard, screen reader behavior.
- Extract the token architecture — how are colors, spacing, radius organized.
- Pick ONE library's patterns and be consistent — don't mix library conventions.
