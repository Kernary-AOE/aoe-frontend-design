# PosthogSignatureMarketing [pattern] v1.0.0
The seven signature design patterns that define PostHog's visual language: hidden orange hover flash, sage/olive anti-corporate palette, hand-drawn hedgehog illustrations, opacity-based button hover, bold IBM Plex Sans headings, generous body line-height, and a single-shadow system.
domain: frontend-design

## Label
PostHog Signature Marketing Patterns

## Problem
PostHog's identity is deliberately anti-corporate — its warmth and personality come from a very specific set of choices that reject conventional SaaS blue-and-white aesthetics. Individual elements copied without context produce generic results.

## Solution
Apply all seven patterns as a system: #F54E00 orange only on hover, olive/sage/parchment palette, mascot art over stock photos, opacity:0.7 button hover, IBM Plex Sans 700/800 headings, 1.50–1.71 body line-height, and single-shadow modal system.

## Structure
```
    /* Hidden orange hover flash */
    .posthog-btn:hover {
      color: #F54E00;  /* PostHog Orange — hover only, not default */
    }

    /* Sage/olive palette — anti-SaaS-blue */
    :root {
      --color-text-primary: #4d4f46;      /* olive */
      --color-border:       #bfc1b7;      /* sage */
      --color-canvas:       #fdfdf8;      /* warm parchment */
    }

    /* Opacity-based button hover */
    .posthog-btn-dark:hover {
      opacity: 0.7;
      /* amber text on dark bg signals warmth */
    }

    /* Bold IBM Plex Sans headings */
    h1, h2, h3 {
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 700; /* or 800 for hero headings */
    }

    /* Generous body line-height */
    body {
      line-height: 1.5; /* 1.50–1.71 range for editorial comfort */
    }

    /* Single-shadow system — modals/dropdowns only */
    .posthog-modal {
      box-shadow: 0px 25px 50px -12px rgba(0,0,0,0.25);
    }
    /* All other containment: borders only */
    .posthog-card {
      border: 1px solid #bfc1b7; /* no shadow */
    }
  
```

## Label
PostHog Signature Marketing Patterns

## Problem
PostHog's identity is deliberately anti-corporate — its warmth and personality come from a very specific set of choices that reject conventional SaaS blue-and-white aesthetics. Individual elements copied without context produce generic results.

## Solution
Apply all seven patterns as a system: #F54E00 orange only on hover, olive/sage/parchment palette, mascot art over stock photos, opacity:0.7 button hover, IBM Plex Sans 700/800 headings, 1.50–1.71 body line-height, and single-shadow modal system.

## Structure
```
    /* Hidden orange hover flash */
    .posthog-btn:hover {
      color: #F54E00;  /* PostHog Orange — hover only, not default */
    }

    /* Sage/olive palette — anti-SaaS-blue */
    :root {
      --color-text-primary: #4d4f46;      /* olive */
      --color-border:       #bfc1b7;      /* sage */
      --color-canvas:       #fdfdf8;      /* warm parchment */
    }

    /* Opacity-based button hover */
    .posthog-btn-dark:hover {
      opacity: 0.7;
      /* amber text on dark bg signals warmth */
    }

    /* Bold IBM Plex Sans headings */
    h1, h2, h3 {
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 700; /* or 800 for hero headings */
    }

    /* Generous body line-height */
    body {
      line-height: 1.5; /* 1.50–1.71 range for editorial comfort */
    }

    /* Single-shadow system — modals/dropdowns only */
    .posthog-modal {
      box-shadow: 0px 25px 50px -12px rgba(0,0,0,0.25);
    }
    /* All other containment: borders only */
    .posthog-card {
      border: 1px solid #bfc1b7; /* no shadow */
    }
  
```
