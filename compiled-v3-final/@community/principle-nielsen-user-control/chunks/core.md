# NielsenUserControl [principle] v1.0.0
Nielsen Heuristic 3: users often choose system functions by mistake and need clearly marked emergency exits; undo and redo must be supported.
> Users often choose system functions by mistake and will need a clearly marked 'emergency exit' to leave the unwanted state without having to go through an extended dialogue. Support undo and redo.
domain: ux-design

## Attributed To
Jakob Nielsen, 1994

## Applies To
- destructive actions: delete, archive, bulk operations
- multi-step wizards: back navigation must always be available
- modal dialogs: Escape key and explicit Cancel button required
- text editing: undo/redo history of sufficient depth
- navigation: browser Back button must work predictably
- settings changes: ability to revert to defaults or previous state

## Counter Examples
- A 'Delete Account' flow that executes immediately on confirmation with no grace period or recovery email — data loss is irreversible.
- A checkout wizard where clicking Back resets the entire form, forcing users to re-enter all information they already provided.
- A long-running CLI operation with no interrupt mechanism — users must kill the process and restart from scratch.
