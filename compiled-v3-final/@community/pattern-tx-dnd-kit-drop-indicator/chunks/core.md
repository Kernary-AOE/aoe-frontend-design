# TxDndKitDropIndicator [pattern] v1.0.0
dnd-kit (@dnd-kit/abstract) drag feedback pattern: DragOverlay ghost that follows the cursor with a +N count badge for descendants, CSS data-shadow='true' for source lift (scale 1.03 + heavier shadow), and aria-hidden='true' for source dim (opacity 0.4) — the lift+ghost+dim model preferred over thin insertion-line indicators.
domain: frontend-design

## Code
```
    // Ghost overlay with descendant count badge
    export function TreeItemOverlay({ id, count }: { id: UniqueIdentifier; count: number }) {
      return (
        <div className={styles.TreeItem} data-overlay>
          <Handle />
          {id}
          {count > 0 ? <span className={styles.Badge}>{count}</span> : null}
        </div>
      );
    }

    /* CSS: lift-shadow + source-dim state machine */
    .Item {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .Item[aria-hidden="true"] { opacity: 0.5; }  /* source dim */
    .Item[data-shadow="true"]:not([aria-hidden="true"]) {
      transform: scale(1.03);               /* lifted state */
      backdrop-filter: blur(5px);
      --box-shadow: 0px 15px 15px 0 rgba(34, 33, 81, 0.25);
    }

    /* Overlay shadow — y-offset 15px makes ghost appear to float above list */
    .TreeItem[data-overlay] {
      box-shadow: 0px 15px 15px 0 rgba(34, 33, 81, 0.1);
    }

    /* Descendant count badge */
    .Badge {
      position: absolute; top: -10px; right: -10px;
      width: 24px; height: 24px; border-radius: 50%;
      background: #2389ff; color: #fff;
      font-size: 0.8rem; font-weight: 500;
      display: flex; align-items: center; justify-content: center;
    }
  
```

## How To Adapt
- Use data-shadow and aria-hidden as CSS hooks — they decouple from dnd-kit internals and port to react-dnd or custom implementations.
- scale(1.03) is deliberately subtle — 1.05 reads as 'popping out'; 1.02 is invisible on small items.
- On mobile: use a heavier shadow (30px blur) since the ghost must read against a finger.
- DragOverlay with +N badge is essential for tree/multi-select drags — users must know descendants move too.

## Gotchas
- :not([aria-hidden='true']) on lift-shadow prevents dim and lift from compositing — critical selector.
- box-shadow y-offset 15px on overlay is load-bearing — without it, ghost looks glued to cursor, not floating.
- transition: transform 0.3s on .Item must match ~150ms dnd-kit drag-start animation for smooth pickup feel.
