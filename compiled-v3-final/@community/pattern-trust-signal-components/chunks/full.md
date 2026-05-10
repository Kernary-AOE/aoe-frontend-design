# TrustSignalComponents [pattern] v1.0.0
Five trust signal component types for landing pages — badge rows, logo strips, social proof numbers, testimonial micro-quotes, and security certification badges — each placed at the specific conversion objection it resolves.
domain: frontend-design

## Problem
Trust signals placed arbitrarily, overused, or fabricated either fail to convert or actively destroy credibility. Each signal type resolves one specific user objection and loses effectiveness when misplaced.

## Solution
Map each trust component to the objection it resolves. Place in sequence: badge row after hero CTA ('is this legit?'), logo strip below fold ('who else uses this?'), social proof numbers mid-page, testimonial beside pricing ('has someone like me succeeded?'), certs in footer ('is my data safe?').

## Placement Map
```
    [Hero headline + CTA]
    [Trust badge row]         ← "Is this legit?" — immediately after CTA
    ──────────────────────
    [Logo strip "Trusted by"] ← "Who else uses this?" — below fold
    ──────────────────────
    [Features / Product]
    ──────────────────────
    [Social proof numbers]    ← "How big is this really?" — after features
    ──────────────────────
    [Pricing]
    [Testimonial micro-quote] ← "Has someone like me succeeded?" — beside price
    ──────────────────────
    [Footer]
    [Security certs]          ← "Is my data safe?" — bottom, where procurement looks
  
```

## Code
```
    /* Badge row — pill-style inline trust attributes */
    .trust-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--surface-warm); padding: 6px 16px;
      border-radius: 100px; font-size: 0.75rem; font-weight: 500;
      color: var(--text-muted); border: 1px solid hsl(var(--border));
      white-space: nowrap;
    }
    .trust-badge-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }

    /* Logo strip — grayscale at rest, color on hover */
    .logo-strip img {
      height: 24px; width: auto;
      filter: grayscale(100%); opacity: 0.45;
      transition: opacity 200ms ease, filter 200ms ease;
    }
    .logo-strip img:hover { opacity: 1; filter: grayscale(0%); }

    /* Social proof numbers */
    .social-proof-item .number {
      font-family: var(--font-display); font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 700; font-variant-numeric: tabular-nums;
      letter-spacing: -0.02em; line-height: 1; display: block;
    }

    /* Testimonial micro-quote */
    .testimonial-micro {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.875rem 1.25rem;
      border: 1px solid hsl(var(--border));
      border-left: 3px solid hsl(var(--primary));
      border-radius: 0 0.5rem 0.5rem 0; max-width: 36rem;
    }
    .testimonial-micro .avatar { width: 36px; height: 36px; border-radius: 50%; }
  
```

## Anti Patterns
- NEVER fabricate social proof numbers — destroys trust on verification, legal liability.
- NEVER use stock photo testimonial avatars — immediately recognized as fake.
- NEVER repeat the same trust component type in multiple sections — signal fatigue.
- NEVER place trust badges above the hero — they confuse before value is established.
- '100% satisfaction guaranteed' without terms increases skepticism — be specific instead.

## Problem
Trust signals placed arbitrarily, overused, or fabricated either fail to convert or actively destroy credibility. Each signal type resolves one specific user objection and loses effectiveness when misplaced.

## Solution
Map each trust component to the objection it resolves. Place in sequence: badge row after hero CTA ('is this legit?'), logo strip below fold ('who else uses this?'), social proof numbers mid-page, testimonial beside pricing ('has someone like me succeeded?'), certs in footer ('is my data safe?').

## Placement Map
```
    [Hero headline + CTA]
    [Trust badge row]         ← "Is this legit?" — immediately after CTA
    ──────────────────────
    [Logo strip "Trusted by"] ← "Who else uses this?" — below fold
    ──────────────────────
    [Features / Product]
    ──────────────────────
    [Social proof numbers]    ← "How big is this really?" — after features
    ──────────────────────
    [Pricing]
    [Testimonial micro-quote] ← "Has someone like me succeeded?" — beside price
    ──────────────────────
    [Footer]
    [Security certs]          ← "Is my data safe?" — bottom, where procurement looks
  
```

## Code
```
    /* Badge row — pill-style inline trust attributes */
    .trust-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--surface-warm); padding: 6px 16px;
      border-radius: 100px; font-size: 0.75rem; font-weight: 500;
      color: var(--text-muted); border: 1px solid hsl(var(--border));
      white-space: nowrap;
    }
    .trust-badge-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }

    /* Logo strip — grayscale at rest, color on hover */
    .logo-strip img {
      height: 24px; width: auto;
      filter: grayscale(100%); opacity: 0.45;
      transition: opacity 200ms ease, filter 200ms ease;
    }
    .logo-strip img:hover { opacity: 1; filter: grayscale(0%); }

    /* Social proof numbers */
    .social-proof-item .number {
      font-family: var(--font-display); font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 700; font-variant-numeric: tabular-nums;
      letter-spacing: -0.02em; line-height: 1; display: block;
    }

    /* Testimonial micro-quote */
    .testimonial-micro {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.875rem 1.25rem;
      border: 1px solid hsl(var(--border));
      border-left: 3px solid hsl(var(--primary));
      border-radius: 0 0.5rem 0.5rem 0; max-width: 36rem;
    }
    .testimonial-micro .avatar { width: 36px; height: 36px; border-radius: 50%; }
  
```

## Anti Patterns
- NEVER fabricate social proof numbers — destroys trust on verification, legal liability.
- NEVER use stock photo testimonial avatars — immediately recognized as fake.
- NEVER repeat the same trust component type in multiple sections — signal fatigue.
- NEVER place trust badges above the hero — they confuse before value is established.
- '100% satisfaction guaranteed' without terms increases skepticism — be specific instead.
