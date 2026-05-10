# TxDndKitNestedTree [pattern] v1.0.0
dnd-kit nested tree drag with depth projection: flattens recursive tree to FlattenedItem[] (depth, parentId, id), projects drag depth from pointer transform.x divided by indentation (default 50px), clamps projected depth with getProjection() to prevent illegal nesting, removes descendants during drag and re-attaches via buildTree() on dragEnd.
domain: frontend-design
