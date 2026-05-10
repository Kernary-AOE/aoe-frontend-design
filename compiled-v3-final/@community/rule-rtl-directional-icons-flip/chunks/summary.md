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
