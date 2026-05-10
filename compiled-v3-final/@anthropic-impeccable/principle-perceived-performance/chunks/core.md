# PerceivedPerformance [principle] v1.0.0
> Perceived performance — how fast an interface feels — is as important as measured performance. The 80ms threshold, preemptive transitions, and optimistic UI are perceptual engineering tools, not just nice-to-haves.
domain: frontend-design

## Techniques
-
  - **Name**: 80ms micro-feedback
  - **Description**: Button press visual feedback must land under 80ms. At this threshold users perceive cause and effect as simultaneous.
-
  - **Name**: Preemptive start
  - **Description**: Begin entrance transitions immediately while loading completes. iOS app zoom during launch is the canonical example. Users perceive work happening rather than blank waiting.
-
  - **Name**: Skeleton screens
  - **Description**: Preview content shape during fetch. Reduces perceived wait compared to generic spinners because it communicates what is loading.
-
  - **Name**: Optimistic UI
  - **Description**: Apply UI changes before server confirms. Use for toggles, likes, reorders. Never for payments or destructive operations.
-
  - **Name**: Progressive content reveal
  - **Description**: Stream content as it arrives rather than waiting for complete payloads. Video buffering and streaming HTML are canonical examples.

## Caution
Too-fast responses for complex operations (search, ML inference) can decrease trust. Users may suspect the result was not computed. A brief deliberate delay signals 'real work happened'.
