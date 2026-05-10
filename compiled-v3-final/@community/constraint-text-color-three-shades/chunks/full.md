# TextColorThreeShades [constraint] v1.0.0
A complete UI text color system MUST use exactly three lightness tiers — primary (foreground, weight 500+, highest contrast), secondary (muted-foreground, ~60–70% lightness relative to primary), and tertiary (disabled/placeholder, ~40–50% relative to primary) — to create scannable hierarchy without requiring size or weight alone.
domain: frontend-design

## Target
text color system across UI

## Severity
medium

## Values
-
  - **Tier**: primary
  - **Token**: --color-foreground / text-foreground
  - **Typical Oklch**: oklch(15% 0 0) light / oklch(95% 0 0) dark
  - **Contrast**: ≥ 7:1 on background (AAA)
  - **Use**: Headings, primary labels, body prose, key values
-
  - **Tier**: secondary
  - **Token**: --color-muted-foreground / text-muted
  - **Typical Oklch**: oklch(45% 0 0) light / oklch(65% 0 0) dark
  - **Contrast**: ≥ 4.5:1 on background (AA)
  - **Use**: Supporting labels, captions, metadata, secondary body text
-
  - **Tier**: tertiary
  - **Token**: --color-placeholder / text-placeholder
  - **Typical Oklch**: oklch(65% 0 0) light / oklch(45% 0 0) dark
  - **Contrast**: ≥ 3:1 on background (AA large / decorative minimum)
  - **Use**: Placeholder text, disabled state labels, legal fine print only

## Forbidden
- Using only one text color across the entire UI (flattens hierarchy)
- Using four or more text colors without a design-token system to manage them (creates inconsistency)
- Tertiary text below 3:1 contrast on its background (WCAG fail for non-decorative text)
- Using color as the ONLY hierarchy signal — must combine with size and/or weight

## Rationale
Three distinct text weights (foreground / muted / placeholder) give AI agents and designers a deterministic hierarchy model: primary content gets primary color, supporting context gets muted, empty/disabled states get placeholder. This matches Refactoring UI's hierarchy rules and Radix Colors' three functional text steps (steps 11, 12 for text; step 8 for placeholders).
