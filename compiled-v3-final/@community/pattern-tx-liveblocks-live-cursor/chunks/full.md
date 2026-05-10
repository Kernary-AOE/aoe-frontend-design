# TxLiveblocksLiveCursor [pattern] v1.0.0
Liveblocks Cursor + PresenceCursor pattern (Apache-2.0): arrow SVG with fill='currentColor' inheriting from --lb-cursor-color CSS custom property, presence stored as normalized 0-1 coordinates multiplied by ResizeObserver-tracked container size, spring-interpolated via makeCursorSpring() to smooth chunky WebSocket packets, rendered with translate3d for GPU compositing.
domain: frontend-design

## Code
```
    // Cursor.tsx — visual primitive
    export const Cursor = forwardRef<HTMLDivElement, CursorProps>(
      ({ className, label, color, style, ...props }, ref) => (
        <div style={{ "--lb-cursor-color": color, ...style } as CSSProperties} ref={ref} {...props}>
          {/* Arrow SVG — tip at (0,0) in 32×32 viewBox; fill inherits --lb-cursor-color */}
          <svg viewBox="0 0 32 32" className="lb-cursor-pointer">
            <path fill="currentColor" d="m.088 1.75 11.25 29.422c.409 1.07 1.908 1.113 2.377.067l5.223-11.653c.13-.288.36-.518.648-.648l11.653-5.223c1.046-.47 1.004-1.968-.067-2.377L1.75.088C.71-.31-.31.71.088 1.75Z" />
          </svg>
          {label ? <div className="lb-cursor-bubble"><span>{label}</span></div> : null}
        </div>
      )
    );

    // PresenceCursor — spring-interpolated position loop
    // Presence stores {x: 0..1, y: 0..1} normalized coordinates.
    // Multiply by container size (ResizeObserver) for correct cross-screen positions.
    useLayoutEffect(() => {
      const spring = makeCursorSpring();
      function update() {
        const coordinates = spring.get();
        if (!element) return;
        if (coordinates === null) { element.style.display = "none"; return; }
        element.style.transform = `translate3d(
          ${coordinates.x * sizeRef.current.width}px,
          ${coordinates.y * sizeRef.current.height}px, 0)`;
        element.style.display = "";
      }
      const unsub = room.events.others.subscribe(({ others }) => {
        const cursor = others.find(o => o.connectionId === connectionId)?.presence[presenceKey];
        spring.set(cursor ?? null);
      });
      return () => { spring.dispose(); unsub(); };
    }, []);
  
```

## How To Adapt
- Store cursor position as normalized 0-1 coordinates — absolute pixels break on window resize and different screen sizes.
- Spring the receiver side, never the sender — chunky WebSocket packets (50-80ms) become smooth with spring interpolation.
- For custom backends: sender emits {x: 0..1, y: 0..1} on pointermove; receiver multiplies by its own bounding rect.
- Hide cursor on window blur via useWindowFocus — seeing an inactive cursor is unsettling.

## Gotchas
- translate3d (not translate) is load-bearing — forces GPU compositing; plain translate causes jank under text selection.
- element.style.display='none' when coordinates are null prevents stray cursor at (0,0) during data arrival.
- Use useOther(connectionId, ...) not the full others array — only re-renders when that specific user changes.

## Sources
- https://github.com/liveblocks/liveblocks

## Source
- **Repo**: https://github.com/liveblocks/liveblocks
- **Files**:
  - packages/liveblocks-react-ui/src/components/Cursor.tsx (lines 1-48)
  - packages/liveblocks-react-ui/src/components/Cursors.tsx (lines 101-170)
- **License**: Apache-2.0

## Code
```
    // Cursor.tsx — visual primitive
    export const Cursor = forwardRef<HTMLDivElement, CursorProps>(
      ({ className, label, color, style, ...props }, ref) => (
        <div style={{ "--lb-cursor-color": color, ...style } as CSSProperties} ref={ref} {...props}>
          {/* Arrow SVG — tip at (0,0) in 32×32 viewBox; fill inherits --lb-cursor-color */}
          <svg viewBox="0 0 32 32" className="lb-cursor-pointer">
            <path fill="currentColor" d="m.088 1.75 11.25 29.422c.409 1.07 1.908 1.113 2.377.067l5.223-11.653c.13-.288.36-.518.648-.648l11.653-5.223c1.046-.47 1.004-1.968-.067-2.377L1.75.088C.71-.31-.31.71.088 1.75Z" />
          </svg>
          {label ? <div className="lb-cursor-bubble"><span>{label}</span></div> : null}
        </div>
      )
    );

    // PresenceCursor — spring-interpolated position loop
    // Presence stores {x: 0..1, y: 0..1} normalized coordinates.
    // Multiply by container size (ResizeObserver) for correct cross-screen positions.
    useLayoutEffect(() => {
      const spring = makeCursorSpring();
      function update() {
        const coordinates = spring.get();
        if (!element) return;
        if (coordinates === null) { element.style.display = "none"; return; }
        element.style.transform = `translate3d(
          ${coordinates.x * sizeRef.current.width}px,
          ${coordinates.y * sizeRef.current.height}px, 0)`;
        element.style.display = "";
      }
      const unsub = room.events.others.subscribe(({ others }) => {
        const cursor = others.find(o => o.connectionId === connectionId)?.presence[presenceKey];
        spring.set(cursor ?? null);
      });
      return () => { spring.dispose(); unsub(); };
    }, []);
  
```

## How To Adapt
- Store cursor position as normalized 0-1 coordinates — absolute pixels break on window resize and different screen sizes.
- Spring the receiver side, never the sender — chunky WebSocket packets (50-80ms) become smooth with spring interpolation.
- For custom backends: sender emits {x: 0..1, y: 0..1} on pointermove; receiver multiplies by its own bounding rect.
- Hide cursor on window blur via useWindowFocus — seeing an inactive cursor is unsettling.

## Gotchas
- translate3d (not translate) is load-bearing — forces GPU compositing; plain translate causes jank under text selection.
- element.style.display='none' when coordinates are null prevents stray cursor at (0,0) during data arrival.
- Use useOther(connectionId, ...) not the full others array — only re-renders when that specific user changes.
