# InfiniteMarqueeNoPause [anti-pattern] v1.0.0
An infinite CSS marquee/ticker strip with no pause-on-hover, no pause-on-focus, and no prefers-reduced-motion stop — fails WCAG 2.1 criterion 2.2.2 (Pause, Stop, Hide) for any animation lasting more than 5 seconds.
domain: frontend-design

## What
Horizontally scrolling logo strips, social proof tickers, or news feeds implemented as animation: marquee linear infinite that run forever with no user control.

## Wcag Violation
WCAG 2.1 SC 2.2.2 Pause, Stop, Hide (Level A): Any moving content that starts automatically, lasts more than 5 seconds, and is presented alongside other content must have a mechanism to pause, stop, or hide it.

## Why Bad
- Constant peripheral motion disrupts reading of adjacent content — the eye is drawn to motion involuntarily.
- Screen readers encounter a stream of duplicate content as logos/items loop.
- Users with cognitive disabilities, ADHD, or vestibular disorders are specifically harmed by continuous horizontal scroll.
- prefers-reduced-motion violation when animation is not stopped.
- Touch devices: the infinite animation prevents touch-scroll when the strip captures touch events.

## Fix
Add animation-play-state: paused on :hover and :focus-within. Add @media (prefers-reduced-motion: reduce) { animation: none }. Provide a visible pause button for WCAG compliance.

## Wrong
```
    /* Wrong: no pause, no reduced-motion stop */
    .marquee-track {
      animation: scroll-left 20s linear infinite;
    }
    @keyframes scroll-left {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
  
```

## Correct
```
    /* Correct: pause on hover/focus, stop on reduced motion */
    .marquee-track {
      animation: scroll-left 20s linear infinite;
    }
    .marquee-track:hover,
    .marquee-wrapper:focus-within .marquee-track {
      animation-play-state: paused;
    }
    @keyframes scroll-left {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @media (prefers-reduced-motion: reduce) {
      .marquee-track { animation: none; }
    }

    /* Pause button (WCAG 2.2.2 compliant) */
    /*
    <button class="marquee-pause" aria-label="Pause scrolling logos"
            aria-pressed="false">⏸</button>
    */
  
```

## What
Horizontally scrolling logo strips, social proof tickers, or news feeds implemented as animation: marquee linear infinite that run forever with no user control.

## Wcag Violation
WCAG 2.1 SC 2.2.2 Pause, Stop, Hide (Level A): Any moving content that starts automatically, lasts more than 5 seconds, and is presented alongside other content must have a mechanism to pause, stop, or hide it.

## Why Bad
- Constant peripheral motion disrupts reading of adjacent content — the eye is drawn to motion involuntarily.
- Screen readers encounter a stream of duplicate content as logos/items loop.
- Users with cognitive disabilities, ADHD, or vestibular disorders are specifically harmed by continuous horizontal scroll.
- prefers-reduced-motion violation when animation is not stopped.
- Touch devices: the infinite animation prevents touch-scroll when the strip captures touch events.

## Fix
Add animation-play-state: paused on :hover and :focus-within. Add @media (prefers-reduced-motion: reduce) { animation: none }. Provide a visible pause button for WCAG compliance.

## Wrong
```
    /* Wrong: no pause, no reduced-motion stop */
    .marquee-track {
      animation: scroll-left 20s linear infinite;
    }
    @keyframes scroll-left {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
  
```

## Correct
```
    /* Correct: pause on hover/focus, stop on reduced motion */
    .marquee-track {
      animation: scroll-left 20s linear infinite;
    }
    .marquee-track:hover,
    .marquee-wrapper:focus-within .marquee-track {
      animation-play-state: paused;
    }
    @keyframes scroll-left {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @media (prefers-reduced-motion: reduce) {
      .marquee-track { animation: none; }
    }

    /* Pause button (WCAG 2.2.2 compliant) */
    /*
    <button class="marquee-pause" aria-label="Pause scrolling logos"
            aria-pressed="false">⏸</button>
    */
  
```
