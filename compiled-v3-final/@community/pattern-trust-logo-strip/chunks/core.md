# TrustLogoStrip [pattern] v1.0.0
A row of company logos communicates social proof through brand recognition. Logos are grayscale at 0.45 opacity at rest, full-color on hover. Positioned below the fold after initial interest is established.
domain: frontend-design

## Label
Logo Strip (Trusted By)

## Problem
Visitors ask 'who else uses this?' after their initial interest is sparked — but logo strips placed too high in the hero compete with the headline and distract before context is set.

## Solution
A centered flex row with a small all-caps label ('Trusted by teams at'). Images are standardised to 24px height, grayscale at 0.45 opacity with a 200ms ease transition to full-color on hover.

## Structure
```
    .logo-strip {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 2.5rem;
      padding: 2rem 0;
    }

    .logo-strip-label {
      width: 100%;
      text-align: center;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: hsl(var(--muted-foreground));
      margin-bottom: 1.5rem;
    }

    .logo-strip img {
      height: 24px;              /* standardise height; let width be natural */
      width: auto;
      filter: grayscale(100%);
      opacity: 0.45;
      transition: opacity 200ms ease, filter 200ms ease;
    }

    .logo-strip img:hover {
      opacity: 1;
      filter: grayscale(0%);
    }

    <!-- HTML -->
    <div class="logo-strip-wrapper">
      <p class="logo-strip-label">Trusted by teams at</p>
      <div class="logo-strip" role="list" aria-label="Companies that use this product">
        <img src="/logos/acme.svg" alt="Acme Corp" role="listitem" />
        <img src="/logos/globex.svg" alt="Globex" role="listitem" />
        <img src="/logos/initech.svg" alt="Initech" role="listitem" />
        <img src="/logos/umbrella.svg" alt="Umbrella" role="listitem" />
        <img src="/logos/hooli.svg" alt="Hooli" role="listitem" />
      </div>
    </div>
  
```
