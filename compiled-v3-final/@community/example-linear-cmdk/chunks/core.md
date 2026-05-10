# LinearCmdK [example] v1.0.0
Linear's Cmd+K palette opens as a centered modal at ~640px wide on a translucent dark overlay (#000 at 40% alpha + 8px backdrop-blur). The input is borderless 18px, and results are grouped under sticky section headers ('Issues', 'Projects', 'Navigation') with each item showing an icon, label, and right-aligned shortcut hint in #6E7178 monospace.
domain: visual-design

## Label
Linear — Cmd+K Command Palette

## Url
https://linear.app

## Observed
2026-Q1

## Brand
linear

## Pattern Applied
@community/pattern-command-palette

## Aesthetic Notes
- Modal width: 640px max, ~70vh max-height; centered with top offset 15vh (not 50vh — palettes feel right above center).
- Background: #1C1D21 with 1px #2C2D33 border, 12px border-radius.
- Backdrop: rgba(0,0,0,0.4) + backdrop-filter: blur(8px) — desaturates the page below.
- Input: 48px tall, 18px text, no border, no background, with a 16px search icon prefix in #6E7178.
- Section header: 11px/600 uppercase #6E7178 letter-spacing 0.08em, sticky during scroll.
- Result row: 36px tall, 12px padding, hover/selected #2C2D33 with 4px left accent #5E6AD2.

## What To Copy
- Position palette at top: 15vh, not vertically centered — matches eye's natural reading position.
- Group results under sticky headers; flat lists feel scattered above ~10 results.
- Right-align keyboard shortcuts in muted monospace — they're metadata, not primary content.
- Backdrop blur (8px) is the cheapest way to communicate 'modal mode' on dark UIs.

## What To Skip
- The 'recent' section sometimes shows stale results from a previous session — clear on logout.

## Screenshot Hint
scout query: linear command palette cmd k dark modal grouped results shortcuts

## Demonstrates
- Top-15vh placement reads more naturally than center-50vh for command palettes.
- Backdrop blur is a strong 'mode shift' signal even at 8px.
- Sticky section headers solve the 'where am I' problem in long result lists.
