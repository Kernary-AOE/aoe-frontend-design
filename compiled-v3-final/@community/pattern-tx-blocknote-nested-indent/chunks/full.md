# TxBlocknoteNestedIndent [pattern] v1.0.0
BlockNote smart-Enter keyboard handler for nested list items: when a bulletListItem, numberedListItem, checkListItem, or toggleListItem is empty and Enter is pressed, convert the block back to a paragraph (exit the list) rather than creating another empty bullet. Uses Tiptap commands.first() with priority ordering.
domain: frontend-design

## Code
```
    export const handleEnter = (editor: BlockNoteEditor<any, any, any>) => {
      const { blockInfo, selectionEmpty } = editor.transact((tr) => ({
        blockInfo: getBlockInfoFromTransaction(tr),
        selectionEmpty: tr.selection.anchor === tr.selection.head,
      }));
      if (!blockInfo.isBlockContainer) return false;
      const { bnBlock: blockContainer, blockContent } = blockInfo;

      // Only handle list item types; also skip if text is selected
      if (!isListItemType(blockContent.node.type.name) || !selectionEmpty) return false;

      return editor._tiptapEditor.commands.first(({ commands }) => [
        // Priority 1: empty list item → exit list (convert to paragraph)
        () => commands.command(() => {
          if (blockContent.node.childCount === 0) {
            return commands.command(
              updateBlockCommand(blockContainer.beforePos, { type: "paragraph", props: {} })
            );
          }
          return false;
        }),
        // Priority 2: non-empty list item → split and create sibling of same type
        () => commands.command(() => {
          if (blockContent.node.childCount > 0) {
            chain().deleteSelection().command(splitBlockCommand(selection.from, true)).run();
            return true;
          }
          return false;
        }),
      ]);
    };
  
```

## How To Adapt
- Implement identical two-tier Enter ladder for every nestable block type (checklists, toggles, quote blocks).
- The commands.first() fallback shape lets you add more branches without rewriting the handler.
- Add Tab/Shift-Tab for indent/outdent as sibling handlers in the same file.
- Companion: handleBackspace at position 0 for outdent-on-backspace — check ListItemKeyboardShortcuts.ts in same dir.

## Gotchas
- !selectionEmpty guard is critical — without it, Enter on an empty selected list item corrupts the document.
- Returning false from Tiptap keymap handler lets the next handler run; returning true swallows the key.
- The paragraph-conversion branch must preserve cursor position — use updateBlockCommand, not naive insertParagraph()+delete().

## Sources
- packages/core/src/blocks/ListItem/ListItemKeyboardShortcuts.ts

## Source
- **Repo**: https://github.com/TypeCellOS/BlockNote
- **File**: packages/core/src/blocks/ListItem/ListItemKeyboardShortcuts.ts
- **Lines**: 6-63
- **License**: MPL-2.0

## Code
```
    export const handleEnter = (editor: BlockNoteEditor<any, any, any>) => {
      const { blockInfo, selectionEmpty } = editor.transact((tr) => ({
        blockInfo: getBlockInfoFromTransaction(tr),
        selectionEmpty: tr.selection.anchor === tr.selection.head,
      }));
      if (!blockInfo.isBlockContainer) return false;
      const { bnBlock: blockContainer, blockContent } = blockInfo;

      // Only handle list item types; also skip if text is selected
      if (!isListItemType(blockContent.node.type.name) || !selectionEmpty) return false;

      return editor._tiptapEditor.commands.first(({ commands }) => [
        // Priority 1: empty list item → exit list (convert to paragraph)
        () => commands.command(() => {
          if (blockContent.node.childCount === 0) {
            return commands.command(
              updateBlockCommand(blockContainer.beforePos, { type: "paragraph", props: {} })
            );
          }
          return false;
        }),
        // Priority 2: non-empty list item → split and create sibling of same type
        () => commands.command(() => {
          if (blockContent.node.childCount > 0) {
            chain().deleteSelection().command(splitBlockCommand(selection.from, true)).run();
            return true;
          }
          return false;
        }),
      ]);
    };
  
```

## How To Adapt
- Implement identical two-tier Enter ladder for every nestable block type (checklists, toggles, quote blocks).
- The commands.first() fallback shape lets you add more branches without rewriting the handler.
- Add Tab/Shift-Tab for indent/outdent as sibling handlers in the same file.
- Companion: handleBackspace at position 0 for outdent-on-backspace — check ListItemKeyboardShortcuts.ts in same dir.

## Gotchas
- !selectionEmpty guard is critical — without it, Enter on an empty selected list item corrupts the document.
- Returning false from Tiptap keymap handler lets the next handler run; returning true swallows the key.
- The paragraph-conversion branch must preserve cursor position — use updateBlockCommand, not naive insertParagraph()+delete().
