# HeroWithDemo [pattern] v1.0.0
A landing-page hero combining a left-side text block (eyebrow + H1 + sub + dual CTA) with a right-side interactive product demo (video, animated mockup, or actual embedded UI). The demo replaces a static screenshot with proof of capability.
domain: frontend-design

## Facts

## Label
Hero with Embedded Demo

## Problem
Static hero screenshots tell, not show — visitors must imagine the product. A dense paragraph of value props gets skimmed and discarded. Conversion needs both clarity and demonstration.

## Solution
A 2-column hero: left column carries the message (eyebrow tag, ~10-word H1, ~25-word sub, primary + secondary CTAs); right column embeds a real or video demo. Stack vertically on mobile with demo below text.

## Structure
```
    <section class="hero" aria-labelledby="hero-h1">
      <div class="hero-text">
        <p class="eyebrow">
          <span class="dot"></span>
          New: AI SDK v5 is here
        </p>
        <h1 id="hero-h1">Ship code, not infrastructure</h1>
        <p class="sub">
          Deploy any framework to a global edge in seconds.
          Preview every commit. Roll back without thinking.
        </p>
        <div class="cta">
          <a href="/signup" class="primary">Start deploying</a>
          <a href="/contact-sales">Talk to sales</a>
        </div>
        <ul class="logos" aria-label="Trusted by">
          <li><img alt="Stripe" src="/logo-stripe.svg" /></li>
          <li><img alt="Notion" src="/logo-notion.svg" /></li>
          <li><img alt="Linear" src="/logo-linear.svg" /></li>
        </ul>
      </div>

      <div class="hero-demo" aria-label="Product demo">
        <video
          src="/hero.mp4"
          autoplay
          muted
          loop
          playsinline
          poster="/hero-poster.jpg"
          aria-label="Demo: deploying a Next.js app from CLI in 8 seconds"
        ></video>
      </div>
    </section>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- H1 should be 6-12 words, written as benefit not feature ('Ship code, not infrastructure').
- Sub-headline 20-30 words explaining who it is for and the core mechanism.
- Always two CTAs: a primary (account creation) and a secondary (sales / demo / docs).
- Demo should loop silently and load lazily — autoplay only when in viewport.
- Provide a poster image so the area does not flash empty during video load.
- Logo strip below text builds social proof — 4-6 recognizable customer logos, monochrome.
- On mobile, demo collapses below text; cap demo aspect ratio so CTAs stay above the fold.

## A11y
- Demo video must have `aria-label` describing what it shows ('Demo: deploying a Next.js app in 8 seconds') — autoplay+muted+loop has no spoken context otherwise.
- Provide a captions track for any narration; for silent demos, the aria-label is the description.
- Honor `prefers-reduced-motion`: replace autoplay video with the poster image when set.
- Logos in the trust strip need real `alt` text (the company name), not empty `alt`.
- Both CTAs are real `<a>` elements with verb labels — 'Start deploying', 'Talk to sales'.
