# ShadcnSettings [example] v1.0.0
shadcn's settings example is a two-pane layout: left navigation list (Profile / Account / Appearance / Notifications / Display) at 200px, and main pane at max-width 600px. Each settings section uses a section title (24px bold), description (14px muted-foreground), a divider, then form rows with label-on-top (12px font-medium) + input + 13px help text below.
domain: visual-design

## Label
shadcn/ui — Settings Page Layout

## Url
https://ui.shadcn.com/examples/forms

## Observed
2026-Q1

## Brand
shadcn

## Pattern Applied
@community/pattern-settings-page

## Aesthetic Notes
- Layout: 200px nav rail, 32px gap, 600px main pane (no max-width on smaller screens).
- Nav item: 36px tall, 8px padding, hover bg-muted, active text-foreground + bg-muted (no left accent stripe).
- Section title: text-xl (20px) font-semibold; description text-sm muted-foreground below with 8px gap.
- Field label: text-sm (14px) font-medium with 4px gap to input.
- Input: 36px tall (h-9), border-input (HSL 240 5.9% 90%), rounded-md (6px), focus ring-2 ring-ring.
- Help text: text-[0.8rem] muted-foreground below input.
- Save button: bottom-right of each section, primary variant, never sticky-footer (each section saves independently).

## What To Copy
- Per-section save buttons (vs one global Save) reduce error-cost and feel more reactive.
- Two-pane layout (nav + main) for settings — flat single-page settings get unwieldy past ~5 sections.
- Label-on-top form layout outperforms label-on-left for narrow main panes (<700px).
- Use muted-foreground for helper/description text — it's the cheapest hierarchy signal.

## What To Skip
- The 'Reset' button next to Save can be misclicked — make destructive actions need confirmation or keep them in a separate menu.

## Screenshot Hint
scout query: shadcn settings page two pane navigation form sections per-section save

## Demonstrates
- Per-section save reduces 'all-or-nothing' anxiety in settings.
- 200px nav + 600px main is the comfortable proportion for settings pages.
- Label-on-top is the right default for narrow forms; label-on-left only works at >800px.
