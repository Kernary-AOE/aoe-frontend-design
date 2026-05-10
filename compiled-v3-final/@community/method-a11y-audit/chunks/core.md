# A11yAudit [method] v1.0.0
A comprehensive accessibility audit combining automated tool analysis (axe-core + Lighthouse) with structured manual checks for keyboard navigation, focus management, and screen reader compatibility.
domain: accessibility

## Input
- **Artifact**: URL | FilePath
- **Wcag Level**: "A" | "AA" | "AAA" = "A

## Output
- **Violations**: A11yViolation[]
- **Score**: 0..100
- **Passed**: number
- **Failed**: number
- **Manual Required**: string[]
- **Report**: string

## Uses
- @community/step-load-artifact
- @community/step-run-axe
- @community/step-check-keyboard-nav

## Body
- @community/step-load-artifact(artifact) -> document
- @community/tool-axe-core(document.raw, { runOnly: [`wcag2${wcag-level.toLowerCase()}`, 'wcag22aa'] }) -> axe-results
- @community/tool-lighthouse(artifact, { onlyCategories: ['accessibility'] }) -> lh-results
- @community/check-contrast-aa
- on all document.text-elements
- @community/check-focus-visible
- on all document.interactive-elements
- @community/check-keyboard-reachable
- on all document.interactive-elements
- MERGE axe-results.violations + manual check failures
- DEDUPLICATE by element + criterion
- RANK by impact: critical > serious > moderate > minor
- score = lh-results.categories.accessibility.score * 100
- SUBTRACT 5 per critical manual violation
- 2
- per serious
- LIST manual-required items that axe cannot evaluate
- GENERATE markdown report with violation table
- score
- remediation steps

## Success Criteria
- @community/check-contrast-aa
- @community/check-focus-visible
