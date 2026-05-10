# RailTargets [fact] v1.0.0
The Chrome RAIL performance model defines four user-centric performance budgets: Response (≤100ms), Animation (≤16.67ms per frame), Idle (yield ≤50ms), Load (interactive ≤5000ms on slow 4G). These targets reflect human perception thresholds and remain the canonical engineering goals for web performance.
> Chrome's RAIL model (introduced 2015 by Paul Lewis & Paul Irish, reaffirmed in 2024 documentation) defines four perceptual budgets keyed to user activity: (1) RESPONSE — input acknowledgment within 100ms (Doherty threshold variant; below this users perceive interaction as instantaneous). (2) ANIMATION — each frame within 16.67ms to maintain 60fps; janks above this are immediately visible. With higher-refresh displays (120Hz/8.33ms, 240Hz/4.17ms), the bar continues to rise. (3) IDLE — main-thread tasks that exceed 50ms must yield (`requestIdleCallback`, `scheduler.yield`); long tasks above 50ms block input handling and are flagged by Lighthouse's TBT metric. (4) LOAD — interactive within 5 seconds on a typical 4G connection (≈1.6Mbps effective, 150ms RTT; the slowest 75th percentile of mobile users globally per CrUX). Core Web Vitals are derived from RAIL: LCP (≤2.5s) is the loading sub-target; INP (≤200ms) extends Response to all interactions; CLS (≤0.1) constrains layout stability.
domain: performance

## Confidence
strong

## Applies To
- All web performance budgets and CI gates
- Synthetic testing (Lighthouse, WebPageTest)
- Real User Monitoring (web-vitals.js, Sentry, DebugBear, SpeedCurve)
- Mobile-first product decisions — slow 4G + low-end Android remains the global p75
- Native app performance — analogous targets exist (iOS 60fps scroll, Android jank-free, sub-100ms tap response)

## Quantitative
- **Response 100ms**: Input → visible feedback within 100ms (Doherty boundary). Above 100ms, users perceive lag.
- **Animation 16 67ms**: 60fps target per frame budget. With 120Hz displays (iPad Pro, ProMotion), 8.33ms is required.
- **Idle 50ms Yield**: Long Tasks API flags any main-thread block ≥ 50ms. Use breaks via setTimeout(0), scheduler.yield(), or React 18 concurrent features.
- **Load 5000ms Tti**: Time to Interactive ≤ 5s on slow 4G — 1.6Mbps down, 150ms RTT, mid-tier mobile CPU. P75 of global mobile traffic.
- **Core Web Vitals Thresholds**: LCP ≤ 2.5s ('Good'), 2.5–4s ('Needs Improvement'), > 4s ('Poor'). INP ≤ 200ms / ≤ 500ms / > 500ms. CLS ≤ 0.1 / ≤ 0.25 / > 0.25.
- **P75 Distribution**: All Core Web Vitals are evaluated at the 75th percentile of page loads — 75% of real users must hit 'Good' for the page to count as passing.

## Counter Conditions
- Animation budget assumes 60Hz; high-refresh displays raise the bar (8.33ms at 120Hz). Test on the target device's refresh rate.
- 100ms response budget includes ALL work between input and visible feedback — event handler + reflow + paint. JavaScript that takes 80ms leaves only 20ms for layout/paint.
- 5s TTI on slow 4G is the 75th-percentile target; faster connections expect proportionally faster loads. Don't optimize only for desktop fiber.
- INP replaced FID in March 2024 as the official Core Web Vital — measure all interactions, not just first.
- On low-end mobile CPUs (e.g. Moto E series), the same JS executes 4–6x slower than on a flagship. CPU throttling in Lighthouse simulates this.
