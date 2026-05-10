# FeaturesGrid [pattern] v1.0.0
Three features section layout variants — card grid (md:grid-cols-2 lg:grid-cols-3 gap-8), horizontal divider rows (editorial anti-card), and alternating flex-row/flex-row-reverse image layout — extracted from shadcn-landing-page and open-react-template.
domain: frontend-design

## Label
Features Section — Grid Variants

## Problem
AI defaults to 'icon + heading + text × 6' card grid for every features section, creating identical template-feeling pages. Real differentiation comes from structural variation between the three layout modes.

## Solution
Choose variant based on content density and brand persona. Card grid for 4–9 discrete features. Divider layout for 3–5 features with richer descriptions. Alternating image for 2–4 deep-dive features with screenshots.

## Structure
```
    <!-- Variant 1: Card Grid (most common) -->
    <!--
    [section label — uppercase, small]
    [h2 — section title]
    [description]
    [card] [card] [card]
    [card] [card] [card]
    -->
    <section class="py-20 sm:py-32">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <span class="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Features</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2">Section Title</h2>
          <p class="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Description text.</p>
        </div>
        <!-- Grid: md:grid-cols-2 lg:grid-cols-3, gap gap-8 -->
        <!-- Responsive: 1 col mobile → 2 col tablet → 3 col desktop -->
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Card: icon (24px SVG) + h3 (text-[1rem] font-semibold) + description -->
          <div class="card p-6">
            <svg class="w-6 h-6 text-accent mb-4" ...></svg>
            <h3 class="text-[1rem] font-semibold mb-2">Feature Name</h3>
            <p class="text-sm text-muted-foreground">Feature description.</p>
          </div>
          <!-- repeat × N -->
        </div>
      </div>
    </section>

    <!-- Variant 2: Divider Layout (anti-card editorial alternative) -->
    <!--
    [feature title          | feature description]
    ————————————————————————————————————————————
    [feature title          | feature description]
    -->
    <!-- 用分割线代替卡片 — 更有编辑感，避免 "icon + heading + text × 6" 模板感 -->
    <section class="py-20 sm:py-32">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="divide-y divide-border">
          <div class="grid md:grid-cols-2 gap-8 py-8">
            <h3 class="text-xl font-semibold">Feature Title</h3>
            <p class="text-muted-foreground">Feature description paragraph.</p>
          </div>
          <div class="grid md:grid-cols-2 gap-8 py-8">
            <h3 class="text-xl font-semibold">Feature Title</h3>
            <p class="text-muted-foreground">Feature description paragraph.</p>
          </div>
          <!-- repeat rows -->
        </div>
      </div>
    </section>

    <!-- Variant 3: Alternating Image Layout -->
    <!--
    [text ←→ image]
    [image ←→ text]
    [text ←→ image]
    -->
    <!-- flex-row / flex-row-reverse alternating -->
    <section class="py-20 sm:py-32">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 space-y-24">
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <div class="flex-1">
            <h3 class="text-2xl font-bold mb-4">Feature Heading</h3>
            <p class="text-muted-foreground">Description.</p>
          </div>
          <!-- 图片用 rounded-lg overflow-hidden -->
          <div class="flex-1 rounded-lg overflow-hidden">
            <img src="..." alt="Feature visual" class="w-full h-auto" />
          </div>
        </div>
        <!-- Next row: flex-row-reverse for alternation -->
        <div class="flex flex-col lg:flex-row-reverse items-center gap-12">
          <div class="flex-1">
            <h3 class="text-2xl font-bold mb-4">Feature Heading</h3>
            <p class="text-muted-foreground">Description.</p>
          </div>
          <div class="flex-1 rounded-lg overflow-hidden">
            <img src="..." alt="Feature visual" class="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  
```

## Behavior
- NEVER: 完全相同的卡片网格 (card-card-card 重复) — vary card depth, size, or structure within the grid.
- Card grid: use when presenting 4–9 discrete, parallel features of similar weight.
- Divider layout: use for 3–5 features that need prose descriptions, or when editorial feel is required.
- Alternating image: use for 2–4 deep-dive features with screenshots or product illustrations.
- Section label (uppercase tracking-widest text-xs) is optional but improves scanability — place above h2.
- Card icon size is exactly 24px (w-6 h-6) — no larger to keep visual hierarchy clean.
