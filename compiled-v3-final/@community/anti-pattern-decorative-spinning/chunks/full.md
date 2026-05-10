# DecorativeSpinning [anti-pattern] v1.0.0
Applying infinite CSS rotate animation to logos, icons, decorative shapes, or background elements purely for visual interest — spinning adds no information, loops forever triggering motion sickness risk, and violates prefers-reduced-motion.
domain: frontend-design

## What
CSS animation: logo-spin 2s linear infinite — the infamous Create React App spinner applied to brand logos, gear icons, or decorative orbs that serve no functional purpose.

## Why Bad
- Looping rotational motion is one of the highest motion sickness triggers — especially for users with vestibular disorders.
- prefers-reduced-motion: reduce must stop all decorative spinning — most implementations forget this.
- Infinite animations keep the GPU/CPU rendering indefinitely even when the element is off-screen.
- A spinning logo communicates nothing — users cannot derive meaning from decorative motion.
- Spinning icons next to text cause reading difficulty via peripheral motion distraction.

## Fix
Remove the animation entirely. If a spinning indicator is needed to communicate 'loading', use a spinner only inside small containers (button, icon slot) and stop it when loading ends. Never loop a decorative element.

## Wrong
```
    /* Wrong: decorative logo spin */
    .logo { animation: spin 4s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Wrong: decorative gear icon */
    .settings-icon { animation: spin 3s linear infinite; }
  
```

## Correct
```
    /* Correct: spinner ONLY for loading state, stopped when done */
    .loading-spinner {
      animation: spin 0.8s linear infinite;
    }
    /* Stop when not loading */
    .loading-spinner[hidden] { display: none; }

    /* Correct: reduced motion guard — mandatory */
    @media (prefers-reduced-motion: reduce) {
      .loading-spinner { animation: none; }
    }
  
```

## What
CSS animation: logo-spin 2s linear infinite — the infamous Create React App spinner applied to brand logos, gear icons, or decorative orbs that serve no functional purpose.

## Why Bad
- Looping rotational motion is one of the highest motion sickness triggers — especially for users with vestibular disorders.
- prefers-reduced-motion: reduce must stop all decorative spinning — most implementations forget this.
- Infinite animations keep the GPU/CPU rendering indefinitely even when the element is off-screen.
- A spinning logo communicates nothing — users cannot derive meaning from decorative motion.
- Spinning icons next to text cause reading difficulty via peripheral motion distraction.

## Fix
Remove the animation entirely. If a spinning indicator is needed to communicate 'loading', use a spinner only inside small containers (button, icon slot) and stop it when loading ends. Never loop a decorative element.

## Wrong
```
    /* Wrong: decorative logo spin */
    .logo { animation: spin 4s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Wrong: decorative gear icon */
    .settings-icon { animation: spin 3s linear infinite; }
  
```

## Correct
```
    /* Correct: spinner ONLY for loading state, stopped when done */
    .loading-spinner {
      animation: spin 0.8s linear infinite;
    }
    /* Stop when not loading */
    .loading-spinner[hidden] { display: none; }

    /* Correct: reduced motion guard — mandatory */
    @media (prefers-reduced-motion: reduce) {
      .loading-spinner { animation: none; }
    }
  
```
