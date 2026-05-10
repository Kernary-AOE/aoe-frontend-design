# HeuristicReview [method] v1.0.0
A structured heuristic evaluation of a UI artifact against Nielsen's 10 usability heuristics. Produces a scored report with evidence-backed issues ranked by severity.
domain: design-review

## Input
- **Artifact**: URL | FilePath | Base64Image
- **Depth**: "quick" | "dee

## Output
- **Issues**: HeuristicIssue[]
- **Scores**: HeuristicScores
- **Overall**: 0..4
- **Summary**: string

## Uses
- @community/step-load-artifact
- @community/step-apply-heuristics
- @community/step-generate-report

## Body
- @community/step-load-artifact(artifact) -> document
- @community/step-apply-heuristics(document, @nielsen/taxonomy-10-heuristics) -> scores
- if depth == "deep":
- for each heuristic H where scores.scores[H] < 3:
- deepen analysis of H — read H.chunks/full.md
- gather additional evidence from document.components
- RANK issues by severity (0 = critical first)
- SUMMARIZE: "X/10 heuristics scored good or better. Top issues: [...
- @community/step-generate-report(scores, issues) -> report

## Success Criteria
- @community/check-all-heuristics-evaluated

## Input
- **Artifact**: URL | FilePath | Base64Image
- **Depth**: "quick" | "dee

## Output
- **Issues**: HeuristicIssue[]
- **Scores**: HeuristicScores
- **Overall**: 0..4
- **Summary**: string

## Uses
- @community/step-load-artifact
- @community/step-apply-heuristics
- @community/step-generate-report

## Body
- @community/step-load-artifact(artifact) -> document
- @community/step-apply-heuristics(document, @nielsen/taxonomy-10-heuristics) -> scores
- if depth == "deep":
- for each heuristic H where scores.scores[H] < 3:
- deepen analysis of H — read H.chunks/full.md
- gather additional evidence from document.components
- RANK issues by severity (0 = critical first)
- SUMMARIZE: "X/10 heuristics scored good or better. Top issues: [...
- @community/step-generate-report(scores, issues) -> report

## Success Criteria
- @community/check-all-heuristics-evaluated
