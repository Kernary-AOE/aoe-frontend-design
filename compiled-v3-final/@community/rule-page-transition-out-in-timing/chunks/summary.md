# PageTransitionOutInTiming [rule] v1.0.0
Exit is intentional — the user chose to leave. The animation should confirm the decision quickly (150ms) with an accelerating curve (ease-in) that reads as 'departing'. Entrance is discovery — the user is absorbing new content. It should decelerate into position (ease-out, 300ms) giving the eye time to orient. Symmetric timing (same duration for both) feels indecisive and makes the total transition 100ms longer than necessary.
> Page transitions must use asymmetric timing: exit in 150-200ms (ease-in, accelerating out of view) and entrance in 250-400ms (ease-out, decelerating into position) — exits must complete before entrance begins in route-based systems, or overlap by ≤50ms via out-in mode.
domain: frontend-design
