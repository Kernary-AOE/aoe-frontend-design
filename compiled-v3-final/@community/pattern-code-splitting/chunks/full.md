# CodeSplitting [pattern] v1.0.0
Load JavaScript modules only when needed using dynamic import() — splitting bundles by route (load page code when navigated to) or by interaction (load heavy component code when user triggers it).
domain: frontend-design

## Label
Code Splitting via Dynamic Import

## Use When
- A route or feature is not needed on initial page load
- A heavy component (rich text editor, chart library, large modal) is only triggered by user interaction
- Bundle size analysis shows a module contributing more than ~50KB to initial load

## Structure
```
    // Route-based: load when user navigates to /editor
    const EditorPage = React.lazy(() => import('./pages/EditorPage'));

    // Interaction-based: load when user clicks 'Open editor'
    button.addEventListener('click', async () => {
      const { openEditor } = await import('./editor.js');
      openEditor();
    });

    // Next.js dynamic import with loading state
    const HeavyChart = dynamic(() => import('./HeavyChart'), {
      loading: () => <Skeleton height={240} />,
      ssr: false,
    });
  
```

## Behavior
- Always provide a loading fallback — either a skeleton or spinner — for the async boundary.
- Route-based splits load on navigation; interaction-based splits load on first trigger.
- Do not split components that are used on every route — the HTTP overhead outweighs the bundle savings.
- Combine with @community/pattern-skeleton-loader for seamless perceived performance.

## Sources

## Label
Code Splitting via Dynamic Import

## Use When
- A route or feature is not needed on initial page load
- A heavy component (rich text editor, chart library, large modal) is only triggered by user interaction
- Bundle size analysis shows a module contributing more than ~50KB to initial load

## Structure
```
    // Route-based: load when user navigates to /editor
    const EditorPage = React.lazy(() => import('./pages/EditorPage'));

    // Interaction-based: load when user clicks 'Open editor'
    button.addEventListener('click', async () => {
      const { openEditor } = await import('./editor.js');
      openEditor();
    });

    // Next.js dynamic import with loading state
    const HeavyChart = dynamic(() => import('./HeavyChart'), {
      loading: () => <Skeleton height={240} />,
      ssr: false,
    });
  
```

## Behavior
- Always provide a loading fallback — either a skeleton or spinner — for the async boundary.
- Route-based splits load on navigation; interaction-based splits load on first trigger.
- Do not split components that are used on every route — the HTTP overhead outweighs the bundle savings.
- Combine with @community/pattern-skeleton-loader for seamless perceived performance.
