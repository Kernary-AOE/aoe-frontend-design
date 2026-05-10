# AirbnbSignatureMarketing [pattern] v1.0.0
The eight signature design patterns that define Airbnb's visual language: three-layer shadow lift, Rausch Red as singular accent, warm near-black, circular navigation controls, generous radius scale, Cereal VF weights, palette-token system, and photography-first listing cards.
domain: frontend-design

## Label
Airbnb Signature Marketing Patterns

## Problem
Airbnb's brand warmth and approachability are achieved through a very specific set of decisions that work as a system — copying individual elements without the others produces off-brand results.

## Solution
Apply all eight patterns together: graduated shadow elevation, #ff385c only for CTAs/logo, #222222 near-black, 50% circular controls, 20/32/50% radius scale, Cereal VF 500–700, palette-token variables, and image-dominant listing cards.

## Structure
```
    /* Three-layer shadow lift */
    .airbnb-card {
      box-shadow:
        rgba(0,0,0,0.02) 0px 0px 0px 1px,      /* border ring */
        rgba(0,0,0,0.04) 0px 2px 6px,            /* ambient */
        rgba(0,0,0,0.1)  0px 4px 8px;            /* primary lift */
    }

    /* Rausch Red — singular CTA/logo accent only */
    :root {
      --color-rausch: #ff385c;
    }

    /* Warm near-black — never pure #000 */
    :root {
      --color-text-primary: #222222;
    }

    /* Circular controls */
    .airbnb-circle-control {
      border-radius: 50%;
    }

    /* Radius scale */
    :root {
      --radius-card:    20px;
      --radius-large:   32px;
      --radius-control: 50%;
    }
  
```

## Label
Airbnb Signature Marketing Patterns

## Problem
Airbnb's brand warmth and approachability are achieved through a very specific set of decisions that work as a system — copying individual elements without the others produces off-brand results.

## Solution
Apply all eight patterns together: graduated shadow elevation, #ff385c only for CTAs/logo, #222222 near-black, 50% circular controls, 20/32/50% radius scale, Cereal VF 500–700, palette-token variables, and image-dominant listing cards.

## Structure
```
    /* Three-layer shadow lift */
    .airbnb-card {
      box-shadow:
        rgba(0,0,0,0.02) 0px 0px 0px 1px,      /* border ring */
        rgba(0,0,0,0.04) 0px 2px 6px,            /* ambient */
        rgba(0,0,0,0.1)  0px 4px 8px;            /* primary lift */
    }

    /* Rausch Red — singular CTA/logo accent only */
    :root {
      --color-rausch: #ff385c;
    }

    /* Warm near-black — never pure #000 */
    :root {
      --color-text-primary: #222222;
    }

    /* Circular controls */
    .airbnb-circle-control {
      border-radius: 50%;
    }

    /* Radius scale */
    :root {
      --radius-card:    20px;
      --radius-large:   32px;
      --radius-control: 50%;
    }
  
```
