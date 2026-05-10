# KpiCardSecondaryVariation [rule] v1.0.0
In a 2x2 KPI grid, vary the secondary element across cards. Use each secondary type in at most 2 of the 4 cards. The most important metric goes top-left. Extracted from StyleSeed DESIGN-LANGUAGE.md §62 (github.com/bitjaru/styleseed, MIT).
> When rendering a 2×2 KPI grid, vary the secondary element in each card. Choose from the variation toolkit: trend % + arrow, mini progress bar (h-2), comparison text ('vs 380 last week'), sparkline (inline h-8 chart), status dot (● Active), sub-metric breakdown ('Desktop 60% · Mobile 40%'). Use at most 2 cards with the same secondary element in a 4-card grid. The most important metric sits top-left (reading order).
domain: frontend-design

## Label
KPI Card Secondary Element Variation — The 4-Card Rule

## Applies To
Any 2×2 or 4-column KPI/metric card grid in a dashboard layout.

## Counter Example
Four cards each with icon + label + big number + '+X% trend arrow' — every card identical in structure. Reads as auto-generated; user cannot tell which KPI is the primary focus.

## Examples
-       {/* CORRECT — 4 KPI cards, each with varied secondary elements */}
      <div className="grid grid-cols-2 gap-4 px-6">

        {/* Card 1: revenue — trend % */}
        <StatCard
          icon={CreditCard}
          label="Today's Revenue"
          value="48.2" unit="K"
          trend={{ value: "+8.2%", direction: "up" }}
        />

        {/* Card 2: users — trend % (2nd with same secondary — allowed, cap is 2) */}
        <StatCard
          icon={Users}
          label="Active Users"
          value="12,840"
          trend={{ value: "+3.1%", direction: "up" }}
        />

        {/* Card 3: storage — progress bar (h-2) */}
        <StatCard
          icon={HardDrive}
          label="Storage"
          value="68" unit="%"
          progress={68}
        />

        {/* Card 4: orders — comparison text */}
        <StatCard
          icon={Package}
          label="Orders"
          value="342"
          comparison="vs 380 last week"
        />

      </div>
    

## Rationale
A 2×2 grid of identical-structure cards is the single most common AI failure mode for dashboard composition. The prompt asks for '4 KPIs' and the model returns four cards that each have [icon] [label] [big number] [+X% trend] — identical except for the data. The user sees a wallpaper of repetition, not a set of distinct answers. Their eye can't tell which metric matters most because all four have the same visual weight. Varying the secondary element does three things: (1) Encodes metric character visually — a revenue number naturally wants a trend %, a storage number naturally wants a progress bar (capacity is bounded), a comparison number naturally wants comparison text. Matching the visual to the metric's meaning makes the grid legible. (2) Creates internal rhythm within a single section — the user's eye has four distinct shapes to parse, which holds attention longer than four identical rectangles. (3) Signals designer intent — identical cards read as 'generated'; varied cards read as 'someone chose each one deliberately'. The 2-card cap prevents the variation rule from becoming its own monotony — if all four cards have different secondaries the grid feels gimmicky; 2 trends + 1 progress + 1 comparison hits the sweet spot.

## Label
KPI Card Secondary Element Variation — The 4-Card Rule

## Applies To
Any 2×2 or 4-column KPI/metric card grid in a dashboard layout.

## Counter Example
Four cards each with icon + label + big number + '+X% trend arrow' — every card identical in structure. Reads as auto-generated; user cannot tell which KPI is the primary focus.
