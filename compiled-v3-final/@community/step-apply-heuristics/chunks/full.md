# ApplyHeuristics [step] v1.0.0
domain: design-review

signature: (document: Document, heuristics: Taxonomy) -> HeuristicScores
effect: read-only

## Errors
- InsufficientData
- TaxonomyMismatch

## Body
```
    For each heuristic H in heuristics.members:
      1. Read H's description and examples (H.chunks/core.md).
      2. Inspect document.components for evidence of compliance or violation.
      3. Score H on a 0–4 scale:
           0 = critical violation (completely absent / broken)
           1 = major issue (present but poorly implemented)
           2 = minor issue (partial, needs improvement)
           3 = good (present, minor rough edges)
           4 = excellent (textbook implementation)
      4. Record up to 3 evidence citations per heuristic:
           { component: CSS-selector-or-description, observation: string, severity: 0|1|2|3 }
      5. Note which heuristics could not be evaluated from static artifact alone
         (e.g., H1 system-status may require live interaction).

    Return HeuristicScores = {
      scores: Record<heuristic-id, 0..4>,
      evidence: Record<heuristic-id, Evidence[]>,
      unevaluated: heuristic-id[],
      overall: average of evaluated scores
    }
  
```

## Errors
- InsufficientData
- TaxonomyMismatch

## Body
```
    For each heuristic H in heuristics.members:
      1. Read H's description and examples (H.chunks/core.md).
      2. Inspect document.components for evidence of compliance or violation.
      3. Score H on a 0–4 scale:
           0 = critical violation (completely absent / broken)
           1 = major issue (present but poorly implemented)
           2 = minor issue (partial, needs improvement)
           3 = good (present, minor rough edges)
           4 = excellent (textbook implementation)
      4. Record up to 3 evidence citations per heuristic:
           { component: CSS-selector-or-description, observation: string, severity: 0|1|2|3 }
      5. Note which heuristics could not be evaluated from static artifact alone
         (e.g., H1 system-status may require live interaction).

    Return HeuristicScores = {
      scores: Record<heuristic-id, 0..4>,
      evidence: Record<heuristic-id, Evidence[]>,
      unevaluated: heuristic-id[],
      overall: average of evaluated scores
    }
  
```
