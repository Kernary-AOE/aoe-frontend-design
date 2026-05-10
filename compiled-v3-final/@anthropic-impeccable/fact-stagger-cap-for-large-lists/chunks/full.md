# StaggerCapForLargeLists [fact] v1.0.0
> CSS stagger animations must cap total stagger time. 10 items at 50ms/item = 500ms before the last element begins its entrance. For lists with many items, reduce per-item delay or cap the staggered item count.
domain: frontend-design

## Detail
Stagger animations (sequential delays across a list of items) feel organic when the delay per item is visible but the total stagger time remains within a comfortable window. Beyond 600-700ms of total stagger, the last items feel like they are arriving late rather than part of a choreographed sequence. The cap rule: total_stagger_time = delay_per_item × item_count. If this exceeds ~600ms, either reduce delay_per_item (e.g., 50ms → 30ms for 20 items) or cap the staggered count (only stagger the first 12 items, rest enter simultaneously with the 12th).

## Formula
```
    /* Formula: delay_per_item × min(index, stagger_cap) */
    .list-item {
      animation-delay: calc(var(--i, 0) * 50ms);
    }

    /* For large lists, cap the stagger at item 10 */
    .list-item {
      --capped-i: min(var(--i, 0), 10);
      animation-delay: calc(var(--capped-i) * 40ms);
    }

    /* CSS-only cap via custom property clamping */
    :root { --stagger-delay: 40ms; --stagger-max-items: 12; }
  
```

## Sources

## Detail
Stagger animations (sequential delays across a list of items) feel organic when the delay per item is visible but the total stagger time remains within a comfortable window. Beyond 600-700ms of total stagger, the last items feel like they are arriving late rather than part of a choreographed sequence. The cap rule: total_stagger_time = delay_per_item × item_count. If this exceeds ~600ms, either reduce delay_per_item (e.g., 50ms → 30ms for 20 items) or cap the staggered count (only stagger the first 12 items, rest enter simultaneously with the 12th).

## Formula
```
    /* Formula: delay_per_item × min(index, stagger_cap) */
    .list-item {
      animation-delay: calc(var(--i, 0) * 50ms);
    }

    /* For large lists, cap the stagger at item 10 */
    .list-item {
      --capped-i: min(var(--i, 0), 10);
      animation-delay: calc(var(--capped-i) * 40ms);
    }

    /* CSS-only cap via custom property clamping */
    :root { --stagger-delay: 40ms; --stagger-max-items: 12; }
  
```
