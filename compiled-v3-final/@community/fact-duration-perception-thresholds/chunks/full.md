# DurationPerceptionThresholds [fact] v1.0.0
Human perception of system response time crosses well-studied thresholds: ≤100 ms feels instantaneous, ≤1 s feels continuous (the user keeps their flow), ≤10 s is the upper limit of attention before context switch.
> Three response-time thresholds govern UI motion / latency perception (Card / Robertson / Mackinlay 1991, Nielsen 1993): 100 ms is the limit for perception of instantaneous response, 1 second is the limit for the user's flow of thought to stay uninterrupted, and 10 seconds is the upper limit of attention before users switch tasks.

## Confidence
proven

## Applies To
- UI animation duration choices
- perceived performance thresholds for loading states
- decision: skeleton vs spinner vs blocking modal
- feedback timing for direct manipulation

## Quantitative
- **Instantaneous Threshold**: 100 ms
- **Flow Threshold**: 1 s (1000 ms)
- **Attention Limit**: 10 s (10000 ms)
- **Typical Ui Animation**: 150–300 ms (well below the 1 s flow threshold)
- **Skeleton Loader Budget**: use skeleton if expected wait > 1 s; spinner only if wait > 10 s

## Counter Conditions
- These thresholds are for active, focused interactions — background tasks tolerate longer durations.
- Animation duration above ~500 ms in chrome / navigation feels sluggish even though it's well under 1 s — flow threshold is the upper bound, not a target.
- Mobile / touch contexts often demand even tighter thresholds — 50 ms tap feedback for direct-manipulation feel.

## Sources

## Confidence
proven

## Source
- Robert Miller, 'Response time in man-computer conversational transactions', AFIPS (1968)
- Card, Robertson & Mackinlay, 'The information visualizer, an information workspace', CHI (1991)
- Jakob Nielsen, 'Response Times: The 3 Important Limits' (NN/g, 1993)

## Applies To
- UI animation duration choices
- perceived performance thresholds for loading states
- decision: skeleton vs spinner vs blocking modal
- feedback timing for direct manipulation

## Quantitative
- **Instantaneous Threshold**: 100 ms
- **Flow Threshold**: 1 s (1000 ms)
- **Attention Limit**: 10 s (10000 ms)
- **Typical Ui Animation**: 150–300 ms (well below the 1 s flow threshold)
- **Skeleton Loader Budget**: use skeleton if expected wait > 1 s; spinner only if wait > 10 s

## Counter Conditions
- These thresholds are for active, focused interactions — background tasks tolerate longer durations.
- Animation duration above ~500 ms in chrome / navigation feels sluggish even though it's well under 1 s — flow threshold is the upper bound, not a target.
- Mobile / touch contexts often demand even tighter thresholds — 50 ms tap feedback for direct-manipulation feel.
