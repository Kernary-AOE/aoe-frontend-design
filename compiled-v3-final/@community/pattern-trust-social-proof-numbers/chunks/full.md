# TrustSocialProofNumbers [pattern] v1.0.0
Large, scannable numbers in a responsive grid make abstract claims concrete. Uses tabular-nums, display font at clamp(1.75rem, 4vw, 2.5rem), and muted labels. Placed mid-page after feature sections.
domain: frontend-design

## Label
Social Proof Numbers

## Problem
Vague phrases like 'thousands of users' or 'high uptime' are unpersuasive. Visitors mid-page need concrete, auditable data to overcome 'how big is this really?' skepticism before pricing.

## Solution
A CSS grid of auto-fit 140px minimum columns, each with a large display number and a brief descriptive label. Numbers use tabular-nums for visual alignment.

## Structure
```
    .social-proof-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 2rem;
      text-align: center;
    }

    .social-proof-item .number {
      font-family: var(--font-display);
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.02em;
      color: hsl(var(--foreground));
      line-height: 1;
      display: block;
    }

    .social-proof-item .label {
      font-size: 0.8125rem;
      color: hsl(var(--muted-foreground));
      margin-top: 0.375rem;
      line-height: 1.3;
    }

    <!-- HTML -->
    <div class="social-proof-grid">
      <div class="social-proof-item">
        <span class="number">10,000+</span>
        <span class="label">active users</span>
      </div>
      <div class="social-proof-item">
        <span class="number">99.9%</span>
        <span class="label">uptime SLA</span>
      </div>
      <div class="social-proof-item">
        <span class="number">$50M+</span>
        <span class="label">secured to date</span>
      </div>
      <div class="social-proof-item">
        <span class="number">&lt;2min</span>
        <span class="label">median support response</span>
      </div>
    </div>
  
```

## Label
Social Proof Numbers

## Problem
Vague phrases like 'thousands of users' or 'high uptime' are unpersuasive. Visitors mid-page need concrete, auditable data to overcome 'how big is this really?' skepticism before pricing.

## Solution
A CSS grid of auto-fit 140px minimum columns, each with a large display number and a brief descriptive label. Numbers use tabular-nums for visual alignment.

## Structure
```
    .social-proof-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 2rem;
      text-align: center;
    }

    .social-proof-item .number {
      font-family: var(--font-display);
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.02em;
      color: hsl(var(--foreground));
      line-height: 1;
      display: block;
    }

    .social-proof-item .label {
      font-size: 0.8125rem;
      color: hsl(var(--muted-foreground));
      margin-top: 0.375rem;
      line-height: 1.3;
    }

    <!-- HTML -->
    <div class="social-proof-grid">
      <div class="social-proof-item">
        <span class="number">10,000+</span>
        <span class="label">active users</span>
      </div>
      <div class="social-proof-item">
        <span class="number">99.9%</span>
        <span class="label">uptime SLA</span>
      </div>
      <div class="social-proof-item">
        <span class="number">$50M+</span>
        <span class="label">secured to date</span>
      </div>
      <div class="social-proof-item">
        <span class="number">&lt;2min</span>
        <span class="label">median support response</span>
      </div>
    </div>
  
```
