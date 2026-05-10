# FintechHeroAmountCard [pattern] v1.0.0
A card component that establishes the primary financial metric as the visual focal point. The hero amount uses clamp(2.5rem, 6vw, 4rem) display font, tabular-nums, and a decorative gold radial gradient corner. The large number is 3–4× larger than any surrounding supporting text.
domain: frontend-design

## Label
Fintech Hero Amount Card

## Problem
Fintech dashboards bury the primary balance or amount in a sea of equal-weight data. Users need to instantly identify their key metric — the number they came to see — without scanning the entire UI.

## Solution
A raised-surface card with generous radius (1.25rem / 20px), a decorative gold accent in the top-right corner via a pseudo-element radial gradient, and a display-font hero amount at clamp(2.5rem, 6vw, 4rem). Supporting change indicator sits below at body scale.

## Structure
```
    .hero-amount-card {
      background: hsl(var(--surface-raised));
      border-radius: 1.25rem;           /* 20px — generous for luxury feel */
      box-shadow: 0 4px 24px hsl(0 0% 0% / 0.08);
      padding: 2rem 2.5rem;
      position: relative;
      overflow: hidden;
    }

    /* Gold accent gradient corner — decorative, not functional */
    .hero-amount-card::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 120px;
      height: 120px;
      background: radial-gradient(
        circle at top right,
        hsl(45 90% 60% / 0.18),
        transparent 70%
      );
      pointer-events: none;
    }

    .hero-amount {
      font-family: var(--font-display);  /* serif or high-contrast display font */
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 600;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: hsl(var(--foreground));
      line-height: 1;
    }

    <!-- HTML -->
    <div class="hero-amount-card">
      <p class="overline-label">Total Balance</p>
      <p class="hero-amount">$22,933.00</p>
      <div class="change-indicator positive">
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M6 2L10 8H2L6 2Z" fill="currentColor"/>
        </svg>
        +12.4% this month
      </div>
    </div>
  
```
