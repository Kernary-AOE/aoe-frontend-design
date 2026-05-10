# LoadingSkeletonVsSpinner [fact] v1.0.0
Skeleton loaders (content-shaped placeholders) outperform spinners on perceived performance because they preview the layout, set the user's expectation about what's loading, and avoid the 'time-passing' connotation of a spinning element.
> Skeleton loaders produce shorter perceived wait times than spinners for content-shaped surfaces (lists, cards, articles) because they communicate what is loading, preserve final layout dimensions to avoid layout shift, and avoid the spinning-element connotation of unbounded waiting — though for indeterminate or short waits (< 1 s) a spinner remains appropriate.

## Confidence
strong

## Applies To
- list / card / article load states
- dashboard widget loading
- decision: skeleton vs spinner vs blocking modal
- preventing cumulative layout shift (CLS)

## Quantitative
- **Skeleton Budget**: use skeleton for waits expected > 300 ms, especially > 1 s
- **Spinner Budget**: use spinner only for short / indeterminate waits or progress where shape is unknown
- **Layout Shift Savings**: skeletons that match final dimensions can keep CLS at 0

## Counter Conditions
- Very short waits (< 300 ms) — neither skeleton nor spinner; render directly to avoid flicker.
- Operations where the result shape is unknown (search returning unknown # of results) — spinner or progress bar fits better than skeleton.
- Repeated identical operations may benefit from cached optimistic state instead of any loading indicator.
