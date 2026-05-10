# NumberUnitRatio [rule] v1.0.0
Metric displays use a strict 2:1 size ratio between number and unit — 48px/24px for hero, 36px/18px for KPI cards, 24px/12px for donut centers — so the eye lands on the digit first and the unit whispers.
>     When displaying a metric with a unit (K, M, %, GB, /mo, $, etc.), render the number at 2× the unit's font size.
    The unit sits immediately after the number with ms-0.5 (2px) margin, at weight equal to or lighter than the number,
    same color, same baseline.

    Canonical size pairs:
    | Context       | Number | Unit | Ratio |
    |---------------|--------|------|-------|
    | Hero metric   | 48px   | 24px | 2:1   |
    | KPI card      | 36px   | 18px | 2:1   |
    | Donut center  | 24px   | 12px | 2:1   |
    | List amount   | 17px   | 11px | ~1.5:1|

    Implementation:
    <p className="text-[48px] font-bold leading-none">
      3.8
      <span className="text-[24px] font-medium ms-0.5">/mo</span>
    </p>
  
domain: frontend-design

## Applies To
- Dashboard KPI cards
- Fintech balance/metric displays
- Progress or usage stats
- Any numeric metric with a unit suffix

## Counter Example
A metric displayed as <p>3.8/mo</p> at uniform 24px — number and unit are indistinguishable in visual weight.
