# PitchforkReview [example] v1.0.0
Pitchfork album reviews are dominated by the 'score' — a massive 96px+ numeric rating (e.g., '8.7') displayed prominently next to the album cover. The cover art is shown at ~480px square. Below the score is the artist name in 36px sans, album title in 56px serif italic. The review body uses a 720px column with serif type, with 'Best New Music' getting a special red badge.
domain: typography

## Label
Pitchfork — Album Review Layout

## Url
https://pitchfork.com/reviews/albums

## Observed
2026-Q1

## Brand
pitchfork

## Pattern Applied
@community/pattern-blog-article-layout

## Aesthetic Notes
- Score: 96px-128px (responsive) sans-serif (Akkurat or similar industrial sans), font-weight 700.
- Album cover: 480px square on desktop, with 1px solid #000 border.
- Artist name: 36px/40px sans, all caps, font-weight 500, letter-spacing 0.02em.
- Album title: 56px serif italic (Pitchfork uses Marr Sans or similar), font-weight 400.
- 'Best New Music' badge: 14px uppercase, white text on red #FF0000 (or near-pure red), pill-shaped, 8px padding.
- Body: serif 18px/32px, max-width 720px, with 24px paragraph spacing.

## What To Copy
- When a single number/metric is the story (review score), make it the largest element on the page — 96px+.
- Pair sans for metadata (artist name, score) with serif italic for titles — variety with role-based purpose.
- Use pure red (#FF0000) sparingly for 'Best New' or featured-content badges — it's an attention nuclear option.
- Album cover at 480px (vs full-width) keeps the score and title visible on the same screen — no scroll for hero info.

## What To Skip
- The score's color is the same regardless of value (8.7 vs 4.0 same color) — consider hue-mapping for at-a-glance.

## Screenshot Hint
scout query: pitchfork album review huge score serif italic title best new music

## Demonstrates
- Single-metric content layouts work when the metric is the largest visual element.
- Sans + serif italic role-pairing communicates 'metadata vs content' instantly.
- Saturated red is reserved for editorial badges, never for accents or borders.
