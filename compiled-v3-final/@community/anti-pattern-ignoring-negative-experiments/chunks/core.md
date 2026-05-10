# IgnoringNegativeExperiments [anti-pattern] v1.0.0
Treating a negative or inconclusive A/B test result as a failure to hide rather than a learning to document, causing the same losing hypothesis to be retested repeatedly.
domain: frontend-design

## Label
Discarding Negative or Inconclusive Experiment Results

## Trap
Teams conflate 'experiment succeeded' with 'we shipped' and 'experiment failed' with 'nothing happened'. Negative results are high-value signal: they falsify a hypothesis, reveal product constraints, and prevent future teams from repeating the same test.

## Detection Heuristics
- Experiment records show only winning variants; losing variants have no write-up
- The same design change is proposed multiple times across quarters
- No 'learning' field exists in the experiment tracking document
- Stakeholder asks 'did it work?' and discards context when the answer is 'no'

## Remediation
- Log every experiment result — positive, negative, and inconclusive — in the same system
- Write a required 'what we learned' paragraph for every negative result
- Tag inconclusive results with the confounding variable, not just 'underpowered'
- Reference prior negative results when proposing similar hypotheses
