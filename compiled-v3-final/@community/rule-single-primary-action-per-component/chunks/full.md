# SinglePrimaryActionPerComponent [rule] v1.0.0
> Every interactive component must expose exactly one primary action; all other actions must use visually subordinate treatment (secondary, ghost, or icon-only styles).
domain: frontend-design

## Severity
warning

## Applies When
designing or reviewing any component that exposes more than one action

## Verify By
Confirm only one action uses primary visual treatment (filled button, prominent position, full accent color). All others must use lower-weight styles.

## Examples
- Card footer: 'View details' (filled primary) + 'Share' (ghost icon) — correct.
- Table row actions: 'Edit' (text link) + 'Delete' (icon button, destructive hover only) — correct.
- Bad: card with two filled primary buttons — 'Accept' and 'Schedule' — equally weighted, paralysing.

## Rationale
Multiple equally prominent actions within a single component create decision paralysis and blur the intended next step. The primary action should be unmistakable at a glance.

## Severity
warning

## Applies When
designing or reviewing any component that exposes more than one action

## Verify By
Confirm only one action uses primary visual treatment (filled button, prominent position, full accent color). All others must use lower-weight styles.
