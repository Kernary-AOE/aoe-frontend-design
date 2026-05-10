# FramerPageTransition [example] v1.0.0
Framer's marketing site uses a two-stage page transition: outgoing content fades down (opacity 1 → 0, translateY 0 → -8px) over 280ms, immediately followed by incoming content fading up (opacity 0 → 1, translateY 12px → 0) over 360ms. Total: ~640ms with a tight 80ms overlap. Uses cubic-bezier(0.32, 0.72, 0, 1) — a custom 'long-tail decel' that feels unmistakably Framer.
domain: motion

## Label
Framer — Site-to-Site Page Transition

## Url
https://framer.com

## Observed
2026-Q1

## Brand
framer

## Pattern Applied
@community/pattern-slide-up-reveal

## Aesthetic Notes
- Outgoing: opacity 1 → 0, transform translateY(0) → translateY(-8px). Duration 280ms, easing cubic-bezier(0.32, 0.72, 0, 1).
- Incoming: opacity 0 → 1, transform translateY(12px) → translateY(0). Duration 360ms, same easing, delay 200ms (starts before outgoing finishes — 80ms overlap).
- Asymmetry: outgoing distance is 8px (small, unobtrusive exit), incoming distance is 12px (more emphasis on arrival). Always favor the entry.
- Easing cubic-bezier(0.32, 0.72, 0, 1): rapid acceleration, very long deceleration tail. Feels 'considered' — slower at the end where you're absorbing the new content.
- No cross-fade. Framer specifically does NOT crossfade; the 80ms overlap is darkness. Crossfade looks like a slideshow; this looks like teleportation.
- Headline-only stagger on incoming: H1 leads (delay 200ms), body content follows at 240ms, CTAs at 280ms. Each step +40ms.
- Background never moves — only content layers translate. Static background = stable orientation cue.

## What To Copy
- Asymmetric distance (exit small, entry bigger) is the Framer move. It signals 'arrival is more important than departure'.
- 80ms intentional darkness between fade-out and fade-in beats crossfade for SPAs that load fast — gives the brain a hard scene cut.
- cubic-bezier(0.32, 0.72, 0, 1) is the 'long tail' easing worth memorizing. Use it anywhere you want motion to feel 'thoughtful' (>300ms durations).
- Stage stagger on entry: heading first, body, CTAs last (40ms gaps). Reading order matches arrival order.
- Total budget ~640ms is the upper limit before users perceive 'slow'. Don't go past 800ms unless it's a celebrate-able moment.
- Translate-only, no scale. Page-level scale animations look like zoom transitions on phones — disorienting.

## What To Skip
- Don't apply this to in-app navigation (sidebar nav clicks). 640ms × 50 navigations/day = a tax. Reserve for marketing-site or major route changes.
- Skip the overlap for slow-loading targets — if data isn't ready, you'll fade into a skeleton, which kills the magic. Use only when content is pre-fetched.
- Avoid reusing the 8px translate distance everywhere. The numbers (8px exit, 12px entry) are tuned to ~720px viewport heights; adjust for full-bleed editorial layouts.
- Don't combine page-transition + scroll-reveal on the same arrival — content gets two stagger animations stacked, which feels janky.

## Screenshot Hint
scout query: framer site page transition fade slide arrival smooth

## Demonstrates
- Asymmetric exit/entry distances (exit smaller) is a deliberate hierarchy choice — entries are foreground, exits are background.
- Intentional dark gap (80ms) between scenes is more confident than crossfade.
- Custom long-tail easing (0.32, 0.72, 0, 1) reads as 'considered' on durations >300ms in a way standard ease-in-out cannot.
- Reserved staging (heading → body → CTA, 40ms gaps) gives the page a reading order that matches its visual hierarchy.

## Label
Framer — Site-to-Site Page Transition

## Url
https://framer.com

## Observed
2026-Q1

## Brand
framer

## Pattern Applied
@community/pattern-slide-up-reveal

## Aesthetic Notes
- Outgoing: opacity 1 → 0, transform translateY(0) → translateY(-8px). Duration 280ms, easing cubic-bezier(0.32, 0.72, 0, 1).
- Incoming: opacity 0 → 1, transform translateY(12px) → translateY(0). Duration 360ms, same easing, delay 200ms (starts before outgoing finishes — 80ms overlap).
- Asymmetry: outgoing distance is 8px (small, unobtrusive exit), incoming distance is 12px (more emphasis on arrival). Always favor the entry.
- Easing cubic-bezier(0.32, 0.72, 0, 1): rapid acceleration, very long deceleration tail. Feels 'considered' — slower at the end where you're absorbing the new content.
- No cross-fade. Framer specifically does NOT crossfade; the 80ms overlap is darkness. Crossfade looks like a slideshow; this looks like teleportation.
- Headline-only stagger on incoming: H1 leads (delay 200ms), body content follows at 240ms, CTAs at 280ms. Each step +40ms.
- Background never moves — only content layers translate. Static background = stable orientation cue.

## What To Copy
- Asymmetric distance (exit small, entry bigger) is the Framer move. It signals 'arrival is more important than departure'.
- 80ms intentional darkness between fade-out and fade-in beats crossfade for SPAs that load fast — gives the brain a hard scene cut.
- cubic-bezier(0.32, 0.72, 0, 1) is the 'long tail' easing worth memorizing. Use it anywhere you want motion to feel 'thoughtful' (>300ms durations).
- Stage stagger on entry: heading first, body, CTAs last (40ms gaps). Reading order matches arrival order.
- Total budget ~640ms is the upper limit before users perceive 'slow'. Don't go past 800ms unless it's a celebrate-able moment.
- Translate-only, no scale. Page-level scale animations look like zoom transitions on phones — disorienting.

## What To Skip
- Don't apply this to in-app navigation (sidebar nav clicks). 640ms × 50 navigations/day = a tax. Reserve for marketing-site or major route changes.
- Skip the overlap for slow-loading targets — if data isn't ready, you'll fade into a skeleton, which kills the magic. Use only when content is pre-fetched.
- Avoid reusing the 8px translate distance everywhere. The numbers (8px exit, 12px entry) are tuned to ~720px viewport heights; adjust for full-bleed editorial layouts.
- Don't combine page-transition + scroll-reveal on the same arrival — content gets two stagger animations stacked, which feels janky.

## Screenshot Hint
scout query: framer site page transition fade slide arrival smooth

## Demonstrates
- Asymmetric exit/entry distances (exit smaller) is a deliberate hierarchy choice — entries are foreground, exits are background.
- Intentional dark gap (80ms) between scenes is more confident than crossfade.
- Custom long-tail easing (0.32, 0.72, 0, 1) reads as 'considered' on durations >300ms in a way standard ease-in-out cannot.
- Reserved staging (heading → body → CTA, 40ms gaps) gives the page a reading order that matches its visual hierarchy.
