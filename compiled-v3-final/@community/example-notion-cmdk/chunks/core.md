# NotionCmdK [example] v1.0.0
Notion's Cmd+P (Quick Find) opens a centered modal on a light cream background (#FFFFFF over a 50% rgba(15,15,15,0.5) backdrop) with results grouped by recency: 'Last visited' first, then 'Other'. Each result shows the page icon (emoji or custom image), page title, and a breadcrumb trail of parent pages in #9B9A97 below.
domain: visual-design

## Label
Notion — Quick Find / Cmd+K

## Url
https://notion.so

## Observed
2026-Q1

## Brand
notion

## Pattern Applied
@community/pattern-command-palette

## Aesthetic Notes
- Modal: 600px max-width, white #FFFFFF on backdrop rgba(15,15,15,0.4) — no blur, classic Notion 'paper-on-paper'.
- Border: 1px rgba(55,53,47,0.09), border-radius 6px, shadow 0 14px 28px rgba(0,0,0,0.25).
- Input: 16px text, no border, color #37352F (Notion's signature off-black).
- Result row: 32px tall, with 18px emoji/icon, page title 14px #37352F, breadcrumb 12px #9B9A97 separated by '/'.
- Hover/selected: rgba(55,53,47,0.06) row background; no left accent stripe.
- Section labels: 11px/500 #9B9A97, sentence case (not uppercase), 8px top margin.

## What To Copy
- Show breadcrumb path on each result — disambiguation matters when you have 50 'Meeting notes' pages.
- Page icons (emoji) work as visual anchors better than generic file/folder icons.
- Sentence case section labels (Notion-style) feel more conversational than uppercase (Linear-style).
- Use shadow + 1px border together — neither alone is enough on a light background.

## What To Skip
- The 'Other' section is alphabetical — switch to 'most recently edited' to surface relevant matches.

## Screenshot Hint
scout query: notion quick find cmd p light modal page icons breadcrumb

## Demonstrates
- Light-mode palettes need shadow + border (light backgrounds swallow either alone).
- Page-icon-as-anchor (emoji) outperforms generic icons for memory-based navigation.
- Breadcrumbs in result rows solve the 'which Meeting notes' disambiguation problem.
