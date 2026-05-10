# PricingSection [pattern] v1.0.0
Standard 3-column pricing layout with a featured card using transform: scale(1.05) + border-top: 3px solid var(--accent) + shadow-xl, monthly/annual toggle with React key remount animation, and exact CSS for card differentiation — extracted from shadcn-landing-page and next-saas-starter.
domain: frontend-design

## Label
Pricing Section

## Problem
AI-generated pricing sections produce three identical cards that differ only in price number and feature count, with no visual hierarchy between tiers and no monthly/annual toggle.

## Solution
Apply one differentiation technique to the featured card (scale OR accent border OR filled bg — never all three). Always include a monthly/annual toggle with animated price cross-fade. Use variant='default' CTA only for featured plan.

## Structure
```
    <!-- Standard 3-Column Pricing -->
    <!--
    [toggle: monthly / annual]
    [Free]  [Pro ★ featured]  [Enterprise]
    -->
    <section class="py-20 sm:py-32">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <!-- Toggle: monthly / annual -->
        <div class="flex items-center justify-center gap-4 mb-12">
          <span class="text-sm">Monthly</span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
          <span class="text-sm">Annual</span>
          <!-- "Save 20%" badge -->
          <span class="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full">Save 20%</span>
        </div>

        <!-- 3-column grid -->
        <div class="grid gap-8 md:grid-cols-3">

          <!-- Free tier -->
          <div class="card p-8 flex flex-col">
            <h3 class="text-xl font-bold">Free</h3>
            <div class="mt-4">
              <!-- text-4xl font-bold tabular-nums + /month in text-muted text-base -->
              <span class="text-4xl font-bold tabular-nums">$0</span>
              <span class="text-muted text-base">/month</span>
            </div>
            <ul class="mt-6 space-y-3 flex-1">
              <!-- Check icon (green, 16px) + text-sm text, gap-y-3 -->
              <li class="flex items-center gap-2 text-sm">
                <CheckIcon class="w-4 h-4 text-green-500" /> Feature one
              </li>
            </ul>
            <!-- CTA: variant="outline" for non-featured -->
            <Button variant="outline" class="w-full mt-8">Get Started</Button>
          </div>

          <!-- Pro — FEATURED -->
          <!-- Featured card: scale(1.05) + shadow-xl + border-top: 3px solid var(--accent) -->
          <div class="pricing-card-featured card p-8 flex flex-col">
            <h3 class="text-xl font-bold">Pro</h3>
            <div class="mt-4">
              <!-- Price animates via React key remount on isAnnual toggle -->
              <span key={isAnnual ? 'annual' : 'monthly'} class="text-4xl font-bold tabular-nums">
                {isAnnual ? '$19' : '$29'}
              </span>
              <span class="text-muted text-base">/month</span>
            </div>
            <ul class="mt-6 space-y-3 flex-1">
              <li class="flex items-center gap-2 text-sm">
                <CheckIcon class="w-4 h-4 text-green-500" /> Everything in Free
              </li>
              <!-- more features -->
            </ul>
            <!-- CTA: variant="default" for featured only -->
            <Button variant="default" class="w-full mt-8">Get Pro</Button>
          </div>

          <!-- Enterprise tier -->
          <div class="card p-8 flex flex-col">
            <h3 class="text-xl font-bold">Enterprise</h3>
            <div class="mt-4">
              <span class="text-4xl font-bold tabular-nums">Custom</span>
            </div>
            <ul class="mt-6 space-y-3 flex-1">
              <li class="flex items-center gap-2 text-sm">
                <CheckIcon class="w-4 h-4 text-green-500" /> Everything in Pro
              </li>
            </ul>
            <Button variant="outline" class="w-full mt-8">Contact Sales</Button>
          </div>

        </div>
      </div>
    </section>
  
```

## Css
```
    /* Featured pricing card — ONE differentiation technique */
    .pricing-card-featured {
      border-top: 3px solid var(--accent);
      transform: scale(1.05);
      box-shadow: 0 20px 60px oklch(0 0 0 / 0.15);
      position: relative;
      z-index: 1;  /* rises above sibling cards */
    }
  
```

## Toggle Implementation
```
    // Toggle implementation — React key remount for animated price cross-fade
    const [isAnnual, setIsAnnual] = useState(false);
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    // Animate the price number change:
    // wrap <span> in key={isAnnual ? 'annual' : 'monthly'} for React remount
    // The remount triggers entry animation on the number, creating cross-fade feel
  
```

## Behavior
- NEVER: 3 张完全相同的卡片只换价格数字 — differentiate with color, scale, or border treatment.
- NEVER: 缺少月/年切换 — monthly/annual toggle is a user expectation, its absence feels unfinished.
- NEVER: hide annual savings — show 'Save $X' or 'Save 20%' prominently on the toggle badge.
- Featured card uses ONE differentiation technique only: scale(1.05) OR accent border-top OR filled background.
- Price display: text-4xl font-bold tabular-nums ensures number column alignment across tiers.
- Benefits list gap: gap-y-3 between items — not gap-y-1 (too dense) or gap-y-6 (too loose).
- CTA: only the featured plan gets variant='default' (filled); all others get variant='outline'.
