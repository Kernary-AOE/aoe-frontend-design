# TxDndKitNestedTree [pattern] v1.0.0
dnd-kit nested tree drag with depth projection: flattens recursive tree to FlattenedItem[] (depth, parentId, id), projects drag depth from pointer transform.x divided by indentation (default 50px), clamps projected depth with getProjection() to prevent illegal nesting, removes descendants during drag and re-attaches via buildTree() on dragEnd.
domain: frontend-design

## Code
```
    export function Tree({ items, indentation = 50, onChange }: Props) {
      const [flattenedItems, setFlattenedItems] = useState(() => flattenTree(items));
      const initialDepth = useRef(0);
      const sourceChildren = useRef<FlattenedItem[]>([]);

      return (
        <DragDropProvider
          onDragStart={(event) => {
            const { source } = event.operation;
            const { depth } = flattenedItems.find(({ id }) => id === source.id)!;
            initialDepth.current = depth;
            // Remove descendants from list during drag (they follow the parent)
            setFlattenedItems((items) => {
              const descendants = getDescendants(items, source.id);
              sourceChildren.current = items.filter(i => descendants.has(i.id));
              return items.filter(i => !descendants.has(i.id));
            });
          }}
          onDragOver={(event, manager) => {
            const { source, target } = event.operation;
            event.preventDefault();
            if (source && target && source.id !== target.id) {
              setFlattenedItems((items) => {
                const offsetLeft = manager.dragOperation.transform.x;
                const dragDepth = getDragDepth(offsetLeft, indentation);
                const projectedDepth = initialDepth.current + dragDepth;
                const { depth, parentId } = getProjection(items, target.id, projectedDepth);
                return move(items, event).map(item =>
                  item.id === source.id ? { ...item, depth, parentId } : item
                );
              });
            }
          }}
          onDragEnd={(event) => {
            if (event.canceled) return setFlattenedItems(flattenTree(items));
            // Re-attach descendants and rebuild tree
            const updatedTree = buildTree([...flattenedItems, ...sourceChildren.current]);
            setFlattenedItems(flattenTree(updatedTree));
            onChange(updatedTree);
          }}
        >
          <ul>{flattenedItems.map((item, index) => <TreeItem key={item.id} {...item} index={index} />)}</ul>
          <DragOverlay>
            {(source) => <TreeItemOverlay id={source.id} count={sourceChildren.current.length} />}
          </DragOverlay>
        </DragDropProvider>
      );
    }
  
```

## How To Adapt
- indentation=50px is standard; Notion-tight is 24px; Gmail-label style is 32px — keep configurable.
- DragOverlay count badge ('+ 3 descendants') is a crucial affordance — do not omit it.
- Keyboard users: read horizontal arrow movement as depth change (isKeyboardEvent check in onDragMove).
- manager.actions.move({ by, propagate: false }) for keyboard indent prevents infinite recursion.

## Gotchas
- Hiding descendants during drag (filter them out) is why the UX feels clean — without it, children jitter during parent drag.
- getProjection() must clamp depth so dragged item cannot become a sibling of its own descendants.
- propagate: false on keyboard move action prevents onDragMove from firing again on the programmatic offset.

## Sources
- apps/stories/stories/react/Sortable/Tree/Tree.tsx

## Source
- **Repo**: https://github.com/clauderic/dnd-kit
- **File**: apps/stories/stories/react/Sortable/Tree/Tree.tsx
- **Lines**: 24-186
- **License**: MIT

## Code
```
    export function Tree({ items, indentation = 50, onChange }: Props) {
      const [flattenedItems, setFlattenedItems] = useState(() => flattenTree(items));
      const initialDepth = useRef(0);
      const sourceChildren = useRef<FlattenedItem[]>([]);

      return (
        <DragDropProvider
          onDragStart={(event) => {
            const { source } = event.operation;
            const { depth } = flattenedItems.find(({ id }) => id === source.id)!;
            initialDepth.current = depth;
            // Remove descendants from list during drag (they follow the parent)
            setFlattenedItems((items) => {
              const descendants = getDescendants(items, source.id);
              sourceChildren.current = items.filter(i => descendants.has(i.id));
              return items.filter(i => !descendants.has(i.id));
            });
          }}
          onDragOver={(event, manager) => {
            const { source, target } = event.operation;
            event.preventDefault();
            if (source && target && source.id !== target.id) {
              setFlattenedItems((items) => {
                const offsetLeft = manager.dragOperation.transform.x;
                const dragDepth = getDragDepth(offsetLeft, indentation);
                const projectedDepth = initialDepth.current + dragDepth;
                const { depth, parentId } = getProjection(items, target.id, projectedDepth);
                return move(items, event).map(item =>
                  item.id === source.id ? { ...item, depth, parentId } : item
                );
              });
            }
          }}
          onDragEnd={(event) => {
            if (event.canceled) return setFlattenedItems(flattenTree(items));
            // Re-attach descendants and rebuild tree
            const updatedTree = buildTree([...flattenedItems, ...sourceChildren.current]);
            setFlattenedItems(flattenTree(updatedTree));
            onChange(updatedTree);
          }}
        >
          <ul>{flattenedItems.map((item, index) => <TreeItem key={item.id} {...item} index={index} />)}</ul>
          <DragOverlay>
            {(source) => <TreeItemOverlay id={source.id} count={sourceChildren.current.length} />}
          </DragOverlay>
        </DragDropProvider>
      );
    }
  
```

## How To Adapt
- indentation=50px is standard; Notion-tight is 24px; Gmail-label style is 32px — keep configurable.
- DragOverlay count badge ('+ 3 descendants') is a crucial affordance — do not omit it.
- Keyboard users: read horizontal arrow movement as depth change (isKeyboardEvent check in onDragMove).
- manager.actions.move({ by, propagate: false }) for keyboard indent prevents infinite recursion.

## Gotchas
- Hiding descendants during drag (filter them out) is why the UX feels clean — without it, children jitter during parent drag.
- getProjection() must clamp depth so dragged item cannot become a sibling of its own descendants.
- propagate: false on keyboard move action prevents onDragMove from firing again on the programmatic offset.
