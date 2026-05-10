# LoadingStateFeedback [rule] v1.0.0
The UI must acknowledge every user-initiated action within 100ms — either by showing the completed result immediately (optimistic update) or by entering a visible loading state that persists until completion.
domain: frontend-design

## Threshold
100ms — the Doherty Threshold below which response feels instantaneous; above 1000ms a spinner or progress indicator is required.

## Severity
high

## Patterns
- 0–100ms: optimistic update — show result immediately, revert on failure
- 100–1000ms: button enters loading state (inline spinner, aria-busy='true')
- 1000ms+: progress bar or skeleton replacing the affected content region
- On completion: brief success state (200ms) before returning to default
