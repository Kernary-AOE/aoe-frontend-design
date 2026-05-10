# PrimaryContentFirst [rule] v1.0.0
The primary task or content must appear first in DOM order and receive the highest visual prominence — supplementary content, sidebars, and ads must come after the main content both structurally and visually.
domain: frontend-design

## Severity
medium

## Examples
- Correct: main article in DOM before 'Related Articles' sidebar — CSS grid positions them side-by-side
- Violation: navigation sidebar in DOM before <main> — screen readers hear nav items before main content
- Correct: use CSS order: -1 on sidebar in grid to visually move it left while DOM order keeps main first
- Violation: hero section after a full-width cookie banner in DOM — banner occupies visual prime estate

## Rationale
Screen readers and keyboard users encounter content in DOM order. Search engines weight early DOM content as more important. Mobile single-column layouts collapse CSS side-by-side layouts to DOM order — if the sidebar is first in DOM, it appears first on mobile.

## Severity
medium
