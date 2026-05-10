# TailwindBlue500 [counter-example] v1.0.0
A button and link styling that uses Tailwind's default `blue-500` (#3b82f6) and `blue-600` (#2563eb) as the entire brand expression. Identical to thousands of v0 / shadcn / starter-kit landing pages.
domain: visual-design

## Label
Tailwind `bg-blue-500` as the Brand Primary Color

## Bad Code
```
/* Default Tailwind config — no theme customization */
.btn-primary {
background: #3b82f6;       /* tailwind blue-500 */
color: white;
}
.btn-primary:hover {
background: #2563eb;       /* tailwind blue-600 */
}
a {
color: #3b82f6;
}

/* Or in JSX with default Tailwind: */
/* <button class="bg-blue-500 hover:bg-blue-600 text-white"> */
```

## Why Bad
- Hex #3b82f6 is the literal Tailwind `blue-500` default — anyone who has seen a v0/shadcn page recognizes it instantly
- Communicates zero brand identity — the product looks like 50 other SaaS landing pages
- Hue 217° lands directly in the Bootstrap/Material/Tailwind blue band — the most over-represented color on the web
- `#3b82f6` on white achieves only 3.68:1 contrast — fails WCAG AA for small text
- The hover state `blue-600` is also the Tailwind default — the entire visual language is unconsidered

## Good Code
```
:root {
/* Custom oklch palette — distinctive hue at 22° (warm terracotta) */
--brand-500: oklch(60% 0.16 22);
--brand-600: oklch(54% 0.17 22);
--brand-fg:  oklch(99% 0.01 22);
}

.btn-primary {
background: var(--brand-500);
color: var(--brand-fg);
}
.btn-primary:hover {
background: var(--brand-600);
}
a {
color: var(--brand-600);   /* darker step for AA contrast on white */
}
```

## Why Good
- Hue 22° (warm terracotta) is rare on the web — the brand becomes recognizable from a single screenshot
- oklch palette gives perceptually uniform light/dark steps — no eyeballing hex values
- `--brand-600` on white achieves 4.5:1+ contrast (passes WCAG AA) by design, not by luck
- Token-based — switching brand hue is a one-line change at `:root`
- Documents intent: anyone reading the CSS sees 'this is a brand decision, not a default'

## Anti Pattern
@community/anti-pattern-generic-saas-blue

## Label
Tailwind `bg-blue-500` as the Brand Primary Color

## Bad Code
```
/* Default Tailwind config — no theme customization */
.btn-primary {
background: #3b82f6;       /* tailwind blue-500 */
color: white;
}
.btn-primary:hover {
background: #2563eb;       /* tailwind blue-600 */
}
a {
color: #3b82f6;
}

/* Or in JSX with default Tailwind: */
/* <button class="bg-blue-500 hover:bg-blue-600 text-white"> */
```

## Why Bad
- Hex #3b82f6 is the literal Tailwind `blue-500` default — anyone who has seen a v0/shadcn page recognizes it instantly
- Communicates zero brand identity — the product looks like 50 other SaaS landing pages
- Hue 217° lands directly in the Bootstrap/Material/Tailwind blue band — the most over-represented color on the web
- `#3b82f6` on white achieves only 3.68:1 contrast — fails WCAG AA for small text
- The hover state `blue-600` is also the Tailwind default — the entire visual language is unconsidered

## Good Code
```
:root {
/* Custom oklch palette — distinctive hue at 22° (warm terracotta) */
--brand-500: oklch(60% 0.16 22);
--brand-600: oklch(54% 0.17 22);
--brand-fg:  oklch(99% 0.01 22);
}

.btn-primary {
background: var(--brand-500);
color: var(--brand-fg);
}
.btn-primary:hover {
background: var(--brand-600);
}
a {
color: var(--brand-600);   /* darker step for AA contrast on white */
}
```

## Why Good
- Hue 22° (warm terracotta) is rare on the web — the brand becomes recognizable from a single screenshot
- oklch palette gives perceptually uniform light/dark steps — no eyeballing hex values
- `--brand-600` on white achieves 4.5:1+ contrast (passes WCAG AA) by design, not by luck
- Token-based — switching brand hue is a one-line change at `:root`
- Documents intent: anyone reading the CSS sees 'this is a brand decision, not a default'

## Anti Pattern
@community/anti-pattern-generic-saas-blue
