# ReplicateSignatureMarketing [pattern] v1.0.0
The seven signature design patterns that define Replicate's visual language: pill-radius absolutism (9999px everywhere), 128px manifesto closer, explosive orange-to-magenta hero gradient, dotted-underline links, AI-generated model gallery, heavy/light font contrast, and borders-not-shadows containment.
domain: frontend-design

## Label
Replicate Signature Marketing Patterns

## Problem
Replicate's developer-native brand identity is built on a radical set of design rules — maximum pill radius, extreme type scale, and a specific gradient formula — that cannot be approximated with conventional SaaS defaults.

## Solution
Apply all seven patterns: 9999px radius universally, 128px rb-freigeist-neue closing statement, #ea2804 orange explosive gradient, text-decoration dotted underlines, pill-shaped model gallery, weight 700/400 differential, and 1px solid borders with no shadows.

## Structure
```
    /* Pill-radius absolutism — applied to ALL elements */
    * {
      border-radius: 9999px; /* buttons, badges, cards, images — no exceptions */
    }
    /* Override for content-area elements that need rectangular treatment */
    article, section, .content-block {
      border-radius: 0;
    }

    /* 128px manifesto closer */
    .replicate-manifesto {
      font-family: 'rb-freigeist-neue', sans-serif;
      font-size: 128px;
      font-weight: 700;
      color: hsl(0 0% 100%); /* on dark */
      line-height: 1;
    }

    /* Explosive hero gradient — orange to magenta */
    .replicate-hero {
      background: linear-gradient(
        135deg,
        #ea2804 0%,        /* Replicate orange */
        #c0392b 25%,       /* deep red */
        #8e1abf 55%,       /* magenta */
        #e91e8c 100%       /* hot pink */
      );
    }

    /* Dotted-underline links — developer-notebook aesthetic */
    a {
      text-decoration: underline dotted #bbbbbb;
    }

    /* Borders not shadows */
    .replicate-card {
      border: 1px solid #202020;
      /* no box-shadow */
    }
    .replicate-card--featured {
      border: 1px solid #ea2804;
    }
  
```

## Label
Replicate Signature Marketing Patterns

## Problem
Replicate's developer-native brand identity is built on a radical set of design rules — maximum pill radius, extreme type scale, and a specific gradient formula — that cannot be approximated with conventional SaaS defaults.

## Solution
Apply all seven patterns: 9999px radius universally, 128px rb-freigeist-neue closing statement, #ea2804 orange explosive gradient, text-decoration dotted underlines, pill-shaped model gallery, weight 700/400 differential, and 1px solid borders with no shadows.

## Structure
```
    /* Pill-radius absolutism — applied to ALL elements */
    * {
      border-radius: 9999px; /* buttons, badges, cards, images — no exceptions */
    }
    /* Override for content-area elements that need rectangular treatment */
    article, section, .content-block {
      border-radius: 0;
    }

    /* 128px manifesto closer */
    .replicate-manifesto {
      font-family: 'rb-freigeist-neue', sans-serif;
      font-size: 128px;
      font-weight: 700;
      color: hsl(0 0% 100%); /* on dark */
      line-height: 1;
    }

    /* Explosive hero gradient — orange to magenta */
    .replicate-hero {
      background: linear-gradient(
        135deg,
        #ea2804 0%,        /* Replicate orange */
        #c0392b 25%,       /* deep red */
        #8e1abf 55%,       /* magenta */
        #e91e8c 100%       /* hot pink */
      );
    }

    /* Dotted-underline links — developer-notebook aesthetic */
    a {
      text-decoration: underline dotted #bbbbbb;
    }

    /* Borders not shadows */
    .replicate-card {
      border: 1px solid #202020;
      /* no box-shadow */
    }
    .replicate-card--featured {
      border: 1px solid #ea2804;
    }
  
```
