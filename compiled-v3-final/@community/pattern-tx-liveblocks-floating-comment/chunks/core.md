# TxLiveblocksFloatingComment [pattern] v1.0.0
Liveblocks FloatingThread component (Apache-2.0): comment thread anchored to any trigger via Radix Popover with updatePositionStrategy='always' to survive scroll, onInteractOutside guard to prevent emoji picker / nested portals from dismissing the thread, and onEscapeKeyDown that closes the thread without propagating to parent modal layers.
domain: frontend-design

## Code
```
    <PopoverPrimitive.Content
      updatePositionStrategy="always"        // stays glued to trigger during scroll
      onEscapeKeyDown={(event) => {
        if (event.defaultPrevented) return;
        setIsOpen(false);
        event.preventDefault();              // stop propagation to parent dialog layers
      }}
      onInteractOutside={(event) => {
        // Don't close when user interacts with nested portals (emoji picker, dropdowns)
        const target = event.target as HTMLElement;
        if (target.closest(".lb-portal")) {
          event.preventDefault();
        }
      }}
      asChild
    >
      <Thread ref={forwardedRef} thread={thread} overrides={overrides} {...props} />
    </PopoverPrimitive.Content>
  
```

## How To Adapt
- Give all nested popovers a shared class (Liveblocks uses .lb-portal) so the closest('.lb-portal') guard works.
- updatePositionStrategy='always' recomputes on every scroll/resize — for many simultaneous threads, use 'optimized'.
- For timeline/calendar anchors: flip side='right' to side='top'.
- Thread lives in a Portal via portalContainer so it's never clipped by ancestor overflow:hidden.

## Gotchas
- updatePositionStrategy='always' has non-trivial cost at scale — only bump to 'always' for the thread in focus.
- event.preventDefault() in onEscapeKeyDown stops propagation to ancestor modal layers — intended; document it.
- asChild forwards Popover props to Thread root div — wrapping Thread in another div breaks Popover measurement.
