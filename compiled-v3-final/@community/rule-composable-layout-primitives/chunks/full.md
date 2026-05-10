# ComposableLayoutPrimitives [rule] v1.0.0
> Structure every view using named layout primitives — Stack (single-axis flex), Grid (two-dimensional CSS grid), Cluster (wrapping inline-flex for tags/chips), Sidebar (one fixed + one fluid column) — rather than arbitrarily nested <div> wrappers with ad-hoc positioning.
domain: frontend-design

## Label
Use Composable Layout Primitives Over Nested Containers

## Applies When
structuring any view, page, or component layout in React/TSX, Vue, Svelte, or plain HTML/CSS

## Verify By
Inspect component tree for <div> elements with no semantic or layout purpose; replace with a named layout primitive component

## Primitives
- Stack: `display: flex; flex-direction: column; gap: {token}` — vertical sequences
- Row: `display: flex; flex-direction: row; gap: {token}` — horizontal sequences
- Grid: `display: grid; grid-template-columns: {cols}; gap: {token}` — two-dimensional
- Cluster: `display: flex; flex-wrap: wrap; gap: {token}` — tag lists, chip groups
- Sidebar: `display: grid; grid-template-columns: {fixed} 1fr` — nav + content shells

## Code
```
    /* Stack primitive */
    .stack { display: flex; flex-direction: column; }
    .stack > * + * { margin-top: var(--space); }  /* or gap: var(--space) */

    /* Cluster primitive (wrapping inline group) */
    .cluster { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }

    /* Sidebar + main two-column shell */
    .app-shell {
      display: grid;
      grid-template-columns: 240px 1fr;
      min-height: 100dvh;
    }
    @media (max-width: 768px) {
      .app-shell { grid-template-columns: 1fr; }
    }
  
```

## Severity
warning

## Rationale
Named layout primitives make layout intent explicit and self-documenting. Arbitrary nesting forces readers to decode spacing from implementation. Primitives reduce nesting depth, simplify responsive behavior, and prevent the 'wrapper div soup' anti-pattern.

## Label
Use Composable Layout Primitives Over Nested Containers

## Applies When
structuring any view, page, or component layout in React/TSX, Vue, Svelte, or plain HTML/CSS

## Verify By
Inspect component tree for <div> elements with no semantic or layout purpose; replace with a named layout primitive component

## Primitives
- Stack: `display: flex; flex-direction: column; gap: {token}` — vertical sequences
- Row: `display: flex; flex-direction: row; gap: {token}` — horizontal sequences
- Grid: `display: grid; grid-template-columns: {cols}; gap: {token}` — two-dimensional
- Cluster: `display: flex; flex-wrap: wrap; gap: {token}` — tag lists, chip groups
- Sidebar: `display: grid; grid-template-columns: {fixed} 1fr` — nav + content shells

## Code
```
    /* Stack primitive */
    .stack { display: flex; flex-direction: column; }
    .stack > * + * { margin-top: var(--space); }  /* or gap: var(--space) */

    /* Cluster primitive (wrapping inline group) */
    .cluster { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }

    /* Sidebar + main two-column shell */
    .app-shell {
      display: grid;
      grid-template-columns: 240px 1fr;
      min-height: 100dvh;
    }
    @media (max-width: 768px) {
      .app-shell { grid-template-columns: 1fr; }
    }
  
```

## Severity
warning
