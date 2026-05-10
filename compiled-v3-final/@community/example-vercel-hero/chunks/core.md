# VercelHero [example] v1.0.0
Vercel's homepage opens with a tightly-kerned headline ('Your complete platform for the web') in white Geist Sans on a #000 background, followed by a sub-headline in #A1A1A1, twin CTAs (primary white, secondary outlined), and a live deploy-preview embed beneath the fold. The visual signature is the gradient mesh ('Vercel beam') that sweeps cyan/magenta through ~10% alpha behind the headline.
domain: visual-design

## Label
Vercel — Homepage Hero with Live Demo

## Url
https://vercel.com

## Observed
2026-Q1

## Brand
vercel

## Pattern Applied
@community/pattern-hero-with-demo

## Aesthetic Notes
- Background: solid #000 with an animated radial-gradient overlay using cyan #00DFD8 and magenta #FF0080 at 8-12% alpha.
- Headline: Geist Sans 72px/64px on desktop, font-weight 600, letter-spacing -0.04em — the negative tracking is the signature.
- Sub-headline: 20px/28px #A1A1A1, max-width ~640px to enforce single-line-feel readability.
- Primary CTA: white fill #FFFFFF, black text, 14px/500, 12px vertical padding, 24px horizontal padding, 6px border-radius.
- Beneath the fold: an iframe-like deploy preview with a Mac-style window chrome (3 traffic-light dots) at ~80% width.

## What To Copy
- Use letter-spacing: -0.04em on display headlines >=48px — the tighter tracking is what reads as 'modern' vs default tracking.
- Pair white primary CTA + outlined secondary on dark backgrounds — never two outlined or two filled side-by-side.
- The 'live demo below the fold' anchor: don't show the demo first; show the value prop, then the proof.
- Constrain sub-headline width (max-width: 640px) even on wide viewports — keeps reading rhythm.

## What To Skip
- The animated mesh gradient is expensive on low-end devices; provide a static fallback or respect prefers-reduced-motion.
- Don't auto-play the demo iframe — it competes with the headline for attention.

## Screenshot Hint
scout query: vercel hero black gradient mesh tight headline with deploy preview

## Demonstrates
- Negative letter-spacing communicates 'design-forward' more than any single color choice.
- Subtle gradient overlays on black give visual interest without competing with content.
- Twin CTAs with deliberate hierarchy (filled vs outlined) reduce decision fatigue.
