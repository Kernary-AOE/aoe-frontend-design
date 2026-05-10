# Hero3Layouts [pattern] v1.0.0
Three battle-tested hero section layouts extracted from open-react-template (4.6k★), shadcn-landing-page (1.9k★), and next-saas-starter (1.7k★) — centered single-column, 2-column split (60/40), and left-aligned asymmetric — each with exact Tailwind classes and fluid h1 sizing.
domain: frontend-design

## Label
Hero Section — 3 Proven Layouts

## Problem
AI-generated hero sections default to centered single-column with a gradient text h1, producing identical layouts across every project. Real landing pages differentiate with structural choice before any visual styling.

## Solution
Select one of three structural layouts based on content and brand persona. Layout A for content-first products. Layout B for product-with-visual (app screenshot/demo). Layout C for editorial/high-impact brands that want to break the centered default.

## Structure
```
    <!-- Layout A: Centered Single-Column (open-react-template) -->
    <!--
    [nav]
             [eyebrow / badge]
           [h1 — gradient text]
             [subtitle — muted]
           [CTA primary] [CTA ghost]
             [hero image / video]
    -->
    <section class="py-12 md:py-20 text-center">
      <div class="max-w-3xl mx-auto px-4">
        <span class="badge">Eyebrow</span>
        <!-- h1: text-4xl md:text-5xl, animated gradient bg-clip-text text-transparent -->
        <h1 class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ...">
          Headline text here
        </h1>
        <!-- Subtitle: text-xl text-muted/65 -->
        <p class="text-xl text-muted/65 mt-4">Supporting subtitle</p>
        <!-- CTAs: stacked mobile, horizontal desktop -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button class="btn-primary">Get Started</button>
          <button class="btn-ghost">Learn More</button>
        </div>
      </div>
      <div class="mt-12 max-w-5xl mx-auto px-4">
        <!-- hero image / video / demo -->
      </div>
    </section>

    <!-- Layout B: 2-Column Split (shadcn-landing / next-saas-starter) -->
    <!--
    [nav]
    [text col (60%)        ] [image/visual col (40%)]
      [badge]
      [h1 — bold]
      [description]
      [CTA group]
    -->
    <section class="py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-[60%_40%] gap-12 items-center">
        <!-- Text column -->
        <div>
          <span class="badge">Badge</span>
          <!-- shadcn variant: text-5xl md:text-6xl font-bold -->
          <!-- next-saas variant: font-size: 7.2rem; font-weight: 700; letter-spacing: -0.03em -->
          <h1 class="text-5xl md:text-6xl font-bold mt-4 leading-tight">
            Bold Headline
          </h1>
          <p class="text-lg text-muted-foreground mt-6 max-w-lg">Description text.</p>
          <div class="flex gap-4 mt-8">
            <button class="btn-primary w-full md:w-auto">Primary CTA</button>
            <button class="btn-outline w-full md:w-auto">Secondary</button>
          </div>
        </div>
        <!-- Image column: hidden mobile, lg:flex only -->
        <div class="hidden lg:flex items-center justify-center">
          <!-- visual / screenshot / illustration -->
        </div>
      </div>
    </section>

    <!-- Layout C: Left-Aligned Asymmetric (anti-AI-slop) -->
    <!--
    [nav ————————————]
    [h1 — oversized        ]
    [h1 continued          ]
        [subtitle — narrow col]
        [CTA]
                        [visual — offset right]
    -->
    <section class="py-20 md:py-32 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4">
        <!-- h1 uses clamp(3rem, 7.5vw, 7rem) fluid font-size — breaks centered default -->
        <h1 style="font-size: clamp(3rem, 7.5vw, 7rem); line-height: 1.05; font-weight: 800;">
          Oversized<br>Asymmetric
        </h1>
        <div class="grid lg:grid-cols-[1fr_1fr] gap-16 mt-8">
          <div class="lg:col-start-2">
            <!-- subtitle in narrow right column -->
            <p class="text-xl text-muted-foreground">Subtitle in narrow right column.</p>
            <button class="btn-primary mt-6">CTA</button>
          </div>
        </div>
        <!-- Visual offset right — positioned absolutely or via negative margin -->
        <div class="mt-16 lg:-mt-32 lg:ml-auto lg:w-1/2">
          <!-- offset visual -->
        </div>
      </div>
    </section>
  
```

## Background Treatments
```
    /* Gradient overlay — radial bloom from corner */
    .hero-bg-radial {
      background: radial-gradient(ellipse at 80% 30%, oklch(0.72 0.19 290 / 0.35) 0%, transparent 70%);
    }

    /* Animated blur orb — 4s infinite rotation */
    .hero-blur-orb {
      position: absolute;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      filter: blur(150px);
      opacity: 0.4;
      animation: spin 4s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Film grain overlay */
    /* feTurbulence SVG filter applied at opacity 0.02–0.04 — adds tactile texture */
    /* NEVER: pure solid color hero background */
  
```

## Behavior
- Layout A — centered single-column: default for content-first, developer-tool, or B2B SaaS with no clear visual asset.
- Layout B — 2-column split: use when you have a strong product screenshot, dashboard preview, or 3D illustration.
- Layout C — asymmetric: use for editorial, agency, or high-personality brands wanting to signal 'not AI slop'.
- NEVER use pure solid color hero background — always add depth via radial-gradient, blur orb, or film grain.
- h1 must be at least text-4xl on mobile. Fluid clamp() preferred for asymmetric layout.
- CTAs: primary (filled) + secondary (ghost or outline) — never two identical-style buttons.
