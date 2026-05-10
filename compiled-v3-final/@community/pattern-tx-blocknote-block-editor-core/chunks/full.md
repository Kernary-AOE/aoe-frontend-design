# TxBlocknoteBlockEditorCore [pattern] v1.0.0
Notion-style block editor composition using BlockNote v0.x (MPL-2.0): a single BlockNoteDefaultUI renders up to eight opt-in floating UIs (FormattingToolbarController, SuggestionMenuController for '/', GridSuggestionMenuController for ':', SideMenuController, FilePanelController, TableHandlesController, FloatingComposerController, FloatingThreadController) gated by feature detection via editor.getExtension().
domain: frontend-design

## Code
```
    // Each floating affordance is an independent controller behind a prop-guard.
    // The canvas (ProseMirror) never renders affordances — they're separate layers.
    export function BlockNoteDefaultUI(props: BlockNoteDefaultUIProps) {
      const editor = useBlockNoteEditor();
      return (
        <>
          {editor.getExtension(FormattingToolbarExtension) &&
            props.formattingToolbar !== false && <FormattingToolbarController />}
          {editor.getExtension(SuggestionMenu) && props.slashMenu !== false && (
            <SuggestionMenuController
              triggerCharacter="/"
              shouldOpen={(state) =>
                !state.selection.$from.parent.type.isInGroup("tableContent")
              }
            />
          )}
          {editor.getExtension(SuggestionMenu) && props.emojiPicker !== false && (
            <GridSuggestionMenuController triggerCharacter=":" columns={10} minQueryLength={2} />
          )}
          {editor.getExtension(SideMenuExtension) && props.sideMenu !== false && (
            <SideMenuController />
          )}
          {editor.getExtension(CommentsExtension) && props.comments !== false && (
            <Suspense>
              <FloatingComposerController />
              <FloatingThreadController />
            </Suspense>
          )}
        </>
      );
    }
  
```

## How To Adapt
- For workspace tools: keep prop-guard pattern — each affordance is opt-outable via a prop so document types can disable irrelevant UIs.
- Suppress slashMenu in table cells — the shouldOpen check is load-bearing; keyboard menus inside tables fight cell navigation.
- Comments bundle is heavy and lazy-loaded via Suspense — don't hoist the import eagerly.
- Every controller must be inside BlockNoteContext.Provider and mount after editor instance exists.
- App shell must not use overflow:hidden on ancestors — floating elements are clipped.

## Gotchas
- Controllers render as floating elements — any overflow:hidden ancestor crops them.
- Suspense wrapping on comments is intentional for bundle splitting — don't remove it.

## Sources
- packages/react/src/editor/BlockNoteDefaultUI.tsx

## Source
- **Repo**: https://github.com/TypeCellOS/BlockNote
- **File**: packages/react/src/editor/BlockNoteDefaultUI.tsx
- **Lines**: 79-125
- **License**: MPL-2.0

## Code
```
    // Each floating affordance is an independent controller behind a prop-guard.
    // The canvas (ProseMirror) never renders affordances — they're separate layers.
    export function BlockNoteDefaultUI(props: BlockNoteDefaultUIProps) {
      const editor = useBlockNoteEditor();
      return (
        <>
          {editor.getExtension(FormattingToolbarExtension) &&
            props.formattingToolbar !== false && <FormattingToolbarController />}
          {editor.getExtension(SuggestionMenu) && props.slashMenu !== false && (
            <SuggestionMenuController
              triggerCharacter="/"
              shouldOpen={(state) =>
                !state.selection.$from.parent.type.isInGroup("tableContent")
              }
            />
          )}
          {editor.getExtension(SuggestionMenu) && props.emojiPicker !== false && (
            <GridSuggestionMenuController triggerCharacter=":" columns={10} minQueryLength={2} />
          )}
          {editor.getExtension(SideMenuExtension) && props.sideMenu !== false && (
            <SideMenuController />
          )}
          {editor.getExtension(CommentsExtension) && props.comments !== false && (
            <Suspense>
              <FloatingComposerController />
              <FloatingThreadController />
            </Suspense>
          )}
        </>
      );
    }
  
```

## How To Adapt
- For workspace tools: keep prop-guard pattern — each affordance is opt-outable via a prop so document types can disable irrelevant UIs.
- Suppress slashMenu in table cells — the shouldOpen check is load-bearing; keyboard menus inside tables fight cell navigation.
- Comments bundle is heavy and lazy-loaded via Suspense — don't hoist the import eagerly.
- Every controller must be inside BlockNoteContext.Provider and mount after editor instance exists.
- App shell must not use overflow:hidden on ancestors — floating elements are clipped.

## Gotchas
- Controllers render as floating elements — any overflow:hidden ancestor crops them.
- Suspense wrapping on comments is intentional for bundle splitting — don't remove it.
