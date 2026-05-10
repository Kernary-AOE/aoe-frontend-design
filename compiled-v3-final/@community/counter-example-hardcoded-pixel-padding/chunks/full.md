# HardcodedPixelPadding [counter-example] v1.0.0
A typical card component CSS where every dimension — padding, margin, radius, gap — is written as a raw pixel literal. Looks fine in isolation but represents the failure to extract a token layer.
domain: design-system

## Label
Card Component With Raw Pixel Spacing

## Bad Code
```
.card {
padding: 16px 24px;
margin-bottom: 32px;
border-radius: 8px;
gap: 12px;
font-size: 14px;
line-height: 20px;
}

.card__title {
font-size: 18px;
margin-bottom: 8px;
}
```

## Why Bad
- Six different magnitudes (8/12/14/16/18/20/24/32) hardcoded — none traceable to a design system step
- Cannot adjust global spacing rhythm without find-and-replacing across the codebase
- Dark mode / responsive scaling cannot adjust these values uniformly because there is no central knob
- If two engineers write the same component twice, they will pick different values (16 vs 14, 8 vs 10)
- Tailwind/Figma exporters often produce this exact shape — it is the default failure mode

## Good Code
```
.card {
padding: var(--space-md) var(--space-lg);
margin-bottom: var(--space-xl);
border-radius: var(--radius-md);
gap: var(--space-sm);
font-size: var(--font-size-sm);
line-height: var(--line-height-sm);
}

.card__title {
font-size: var(--font-size-lg);
margin-bottom: var(--space-xs);
}
```

## Why Good
- Every value resolves to a named scale step — readable as design intent (`md` not `16`)
- Adjusting `--space-md` in `:root` updates every card in the codebase atomically
- Theme variants (dark mode, compact density, large-text accessibility) just override the tokens at a different cascade root
- Two engineers writing two cards both use `--space-md` — visual consistency by construction
- Token names survive design refactors — value changes don't ripple through component code

## Anti Pattern
@community/anti-pattern-hardcoded-pixel-values

## Label
Card Component With Raw Pixel Spacing

## Bad Code
```
.card {
padding: 16px 24px;
margin-bottom: 32px;
border-radius: 8px;
gap: 12px;
font-size: 14px;
line-height: 20px;
}

.card__title {
font-size: 18px;
margin-bottom: 8px;
}
```

## Why Bad
- Six different magnitudes (8/12/14/16/18/20/24/32) hardcoded — none traceable to a design system step
- Cannot adjust global spacing rhythm without find-and-replacing across the codebase
- Dark mode / responsive scaling cannot adjust these values uniformly because there is no central knob
- If two engineers write the same component twice, they will pick different values (16 vs 14, 8 vs 10)
- Tailwind/Figma exporters often produce this exact shape — it is the default failure mode

## Good Code
```
.card {
padding: var(--space-md) var(--space-lg);
margin-bottom: var(--space-xl);
border-radius: var(--radius-md);
gap: var(--space-sm);
font-size: var(--font-size-sm);
line-height: var(--line-height-sm);
}

.card__title {
font-size: var(--font-size-lg);
margin-bottom: var(--space-xs);
}
```

## Why Good
- Every value resolves to a named scale step — readable as design intent (`md` not `16`)
- Adjusting `--space-md` in `:root` updates every card in the codebase atomically
- Theme variants (dark mode, compact density, large-text accessibility) just override the tokens at a different cascade root
- Two engineers writing two cards both use `--space-md` — visual consistency by construction
- Token names survive design refactors — value changes don't ripple through component code

## Anti Pattern
@community/anti-pattern-hardcoded-pixel-values
