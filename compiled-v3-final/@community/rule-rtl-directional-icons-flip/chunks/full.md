# RtlDirectionalIconsFlip [rule] v1.0.0
In RTL layouts, icons that imply directionality (arrows, chevrons, forward/back cues) must be horizontally mirrored via transform: scaleX(-1); icons with no directional meaning (star, heart, warning triangle) must not be flipped.
>     When dir="rtl" is applied to the document or a container:
    - Flip: arrow-right, arrow-left, chevron-right, chevron-left, forward, back, play, fast-forward, rewind,
            send (paper plane), next/prev, breadcrumb separators, carousel controls.
    - Do NOT flip: star, heart, warning, info circle, checkmark, close/X, spinner, upload/download (vertical),
                   logos, country flags, mirrored-by-design icons.

    Implementation:
    [dir="rtl"] .icon-directional { transform: scaleX(-1); }

    Or with a CSS utility:
    .rtl:dir(rtl) { transform: scaleX(-1); }
  
domain: frontend-design

## Applies To
- Navigation components with forward/back arrows
- Pagination controls
- Breadcrumb separators
- Carousel / slider controls
- Progress indicators with directional arrows
- Any icon that implies left-to-right flow

## Counter Example
An Arabic-language navigation that shows ← for 'back' and → for 'next' (same as LTR) — users must mentally invert the icon meaning, increasing cognitive load.

## Examples
-       /* CORRECT — flip directional icons in RTL */
      [dir="rtl"] .icon-arrow-right,
      [dir="rtl"] .icon-chevron-right,
      [dir="rtl"] .icon-forward {
        transform: scaleX(-1);
      }

      /* Non-directional icons — do not add scaleX(-1) */
      /* .icon-star, .icon-heart, .icon-warning — no transform */
    

## Rationale
In RTL languages (Arabic, Hebrew, Persian, Urdu), 'forward' means to the right visually becomes 'forward' to the left. An arrow-right that means 'next page' in LTR means 'previous page' in RTL because reading direction reversed. Without mirroring, the icon contradicts the action, breaking the user's mental model. This is a WCAG-adjacent accessibility issue for RTL-language users.

## Applies To
- Navigation components with forward/back arrows
- Pagination controls
- Breadcrumb separators
- Carousel / slider controls
- Progress indicators with directional arrows
- Any icon that implies left-to-right flow

## Counter Example
An Arabic-language navigation that shows ← for 'back' and → for 'next' (same as LTR) — users must mentally invert the icon meaning, increasing cognitive load.
