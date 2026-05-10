# TxDndKitKanbanColumns [pattern] v1.0.0
dnd-kit (@dnd-kit/abstract) multi-list kanban board: both columns and items registered as useSortable with distinct type/accept tags, CollisionPriority.Low on columns so item drags never accidentally reorder columns, structuredClone snapshot for cancel-restore, and move() for cross-column transitions.
domain: frontend-design

## Code
```
    // Items use type:'item', accept:'item'
    const { handleRef, ref, isDragging } = useSortable({
      id, group: column, type: 'item', accept: 'item',
      plugins: [Feedback.configure({ feedback: 'clone' })], index, data: { group: column },
    });

    // Columns use CollisionPriority.Low — items never accidentally reorder columns
    const { handleRef, isDragging, ref } = useSortable({
      id, type: 'column',
      accept: ['column', 'item'],           // columns can accept both types
      collisionPriority: CollisionPriority.Low,
      index,
    });

    export default function App() {
      const [items, setItems] = useState({ A: [...], B: [...], C: [...], D: [] });
      const snapshot = useRef(structuredClone(items));

      return (
        <DragDropProvider
          onDragStart={() => { snapshot.current = structuredClone(items); }}
          onDragOver={(event) => {
            const { source } = event.operation;
            if (source?.type === 'column') return;  // skip column-over-column reorder during item drag
            setItems((items) => move(items, event));
          }}
          onDragEnd={(event) => {
            if (event.canceled) setItems(snapshot.current);  // restore on cancel
          }}
        >
          {columns.map((column, index) => (
            <SortableColumn key={column} id={column} index={index} rows={items[column]} />
          ))}
        </DragDropProvider>
      );
    }
  
```

## How To Adapt
- Empty column 'D: []' is required for testing — ensure drop zone renders with non-zero min-height for empty collections.
- structuredClone for snapshot is necessary — shallow clone shares inner arrays and cancel-restore no-ops.
- PointerSensor.configure activatorElements to [source.element, source.handle] for touch+handle parity.
- Identical pattern for: playlist-of-playlists, email-folders-with-messages, inbox triage by status.

## Gotchas
- if (source.type === 'column') return inside onDragOver short-circuits column drag — prevents items from resorting as column glides past.
- CollisionPriority.Low on columns ensures item-over-item collisions are always preferred when both are plausible.
- group per item must match column id — move() uses group to compute cross-column transitions correctly.
