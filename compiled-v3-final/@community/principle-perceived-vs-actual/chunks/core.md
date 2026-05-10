# PerceivedVsActual [principle] v1.0.0
Perceived performance — what the user feels — diverges from instrumented performance metrics in predictable ways. Optimize for the perceived experience: progressive rendering, optimistic UI, skeleton states, and immediate acknowledgment of input matter more than the wall-clock total. A 200ms response with a 50ms acknowledgment feels faster than a 100ms response that waits for the whole result.
> Hard upper bounds for perception (RAIL model + Doherty threshold): user input MUST acknowledge within 100ms (button press feedback, focus ring, ripple); animation frames MUST commit within 16.67ms (60fps); idle work MUST yield to the main thread every 50ms; loads SHOULD reach 'meaningfully interactive' within 5000ms on slow 4G. Optimize the FIRST 100ms aggressively — use optimistic updates, skeleton placeholders, streaming HTML, and pre-rendering — even when total work takes longer. Perception of speed correlates with progress signals, not with completion time.
domain: performance

## Attributed To
Walter Doherty / IBM (1979 'Doherty Threshold' study); Steve Souders ('High Performance Websites'); Google Chrome RAIL model (2015).

## Applies To
- Form submissions (optimistic local update before server confirms)
- List operations: like, favorite, archive, mark-read — apply locally first
- Navigation: prefetch on hover/intent, render skeleton on click, stream HTML
- Search-as-you-type: debounce ≥ 200ms but render input echo immediately
- Drag & drop: visual update on dragstart, persist on drop
- Long operations: show progress, partial results, cancel button

## Counter Examples
- Submit button shows spinner for 800ms with no other feedback. User wonders if click registered, taps again. 800ms feels like 2 seconds.
- Page navigates to blank white screen for 1.2s before content loads. Even though TTI is 1.2s, perceived load is 'forever' because no progress signal.
- Heavy JavaScript blocks main thread for 350ms on click. Button visually depresses but no further feedback until done. Feels broken.
