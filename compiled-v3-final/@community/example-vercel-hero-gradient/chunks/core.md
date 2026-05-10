# VercelHeroGradient [example] v1.0.0
Vercel's homepage hero uses a mesh gradient (the 'Vercel beam') that drifts very slowly behind the headline — cyan #00DFD8 and magenta #FF0080 radial-gradient blobs at ~10% alpha, animating their position over a 16-20 second cycle. The motion is so slow it's subliminal: visible only as the page fills with motion-blur in your peripheral vision while you read the static white headline.
domain: motion

## Label
Vercel — Animated Mesh Gradient Hero Background

## Url
https://vercel.com

## Observed
2026-Q1

## Brand
vercel

## Pattern Applied
@community/pattern-fade-in-on-load

## Aesthetic Notes
- Two radial-gradient layers: one cyan #00DFD8 at top-left, one magenta #FF0080 at bottom-right, both at 8-12% alpha on #000.
- Each blob is ~60vw radius — large enough that movement is perceptible, small enough that center stays clean.
- Animation: transform: translate3d() of each blob over 18s, ease-in-out, alternate (yo-yo). Total drift ≈ 8-12vw.
- No keyframe rotation. Only translation. Rotation makes mesh gradients look like screensavers.
- background-blend-mode: screen on the magenta layer — keeps both colors readable on black, no muddy mix.
- filter: blur(40px) on each blob layer — the blur IS the gradient mesh effect. Without it you see two ovals.
- z-index: 0; the headline sits at z-index: 1 with a slight backdrop-filter: brightness(1.05) to stay legible.

## What To Copy
- 18-second cycle, ease-in-out alternate — 'so slow you don't see it move' is the goal. <10s feels nervous.
- blur(40px) on the blob layer is what turns 'two colored ovals' into 'mesh gradient'. The blur is non-negotiable.
- Limit to 2-3 colors. Vercel uses cyan + magenta on black; that's it. More colors = airport carpet.
- Position blobs at corners (top-left, bottom-right) so the headline center stays uncluttered.
- alpha 8-12% — anything more competes with content. The motion is supposed to be subliminal.

## What To Skip
- Don't auto-loop on mobile — the blur(40px) + 18s animation chews battery. Use a static image fallback at <768px.
- Skip prefers-reduced-motion entirely → static gradient (no animation), keep the colors. Don't strip the visual identity.
- Avoid 4+ color mesh gradients — they read as 'AI-generated stock' rather than intentional brand.
- Don't use this on dense content pages (dashboards, docs). It's a hero-only effect.

## Screenshot Hint
scout query: vercel hero black background cyan magenta gradient mesh subtle drift

## Demonstrates
- Subliminal motion (>15s cycle, low alpha, blurred) adds 'aliveness' without competing for attention.
- Two-color discipline beats five-color virtuosity for brand-defining backgrounds.
- Translation-only animation looks intentional; rotation looks like a screensaver.
- blur(40px) is the cheapest way to fake an expensive mesh-gradient renderer.
