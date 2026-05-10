# TxBlocknoteDragHandle [pattern] v1.0.0
BlockNote hover-gutter drag handle pattern: a six-dot MdDragIndicator button that is simultaneously a drag source (draggable={true}) and a dropdown menu trigger, with sideMenu.freezeMenu() / unfreezeMenu() preventing the 'menu flies away' bug when cursor leaves the handle toward the dropdown.
domain: frontend-design

## Code
```
    export const DragHandleButton = (props) => {
      const sideMenu = useExtension(SideMenuExtension);
      const block = useExtensionState(SideMenuExtension, {
        selector: (state) => state?.block,
      });
      if (block === undefined) return null;  // guard: no orphan button during transitions

      return (
        <Components.Generic.Menu.Root
          onOpenChange={(open) => {
            // freeze/unfreeze is THE key — prevents menu from detaching when
            // cursor moves from handle to dropdown items
            if (open) { sideMenu.freezeMenu(); }
            else       { sideMenu.unfreezeMenu(); }
          }}
          position="left"
        >
          <Components.Generic.Menu.Trigger>
            <Components.SideMenu.Button
              draggable={true}
              onDragStart={(e) => sideMenu.blockDragStart(e, block)}
              onDragEnd={sideMenu.blockDragEnd}
              icon={<MdDragIndicator size={24} data-test="dragHandle" />}
            />
          </Components.Generic.Menu.Trigger>
          <DragHandleMenu>{props.children}</DragHandleMenu>
        </Components.Generic.Menu.Root>
      );
    };
  
```

## How To Adapt
- For kanban cards: use position='top' or embed handle on card surface — hover gutter is poor for touch.
- Keep icon hit target >= 24px; MdDragIndicator at size={24} is the minimum.
- freezeMenu/unfreezeMenu are NOT idempotent — nested submenus need a counter, not a boolean.

## Gotchas
- Without freezeMenu, hovering toward the dropdown repositions the gutter to a different block — 'menu flies away' bug.
- draggable={true} means keyboard users can't activate the menu with Enter unless you add onKeyDown handling.
- if (block === undefined) return null is critical — prevents orphan buttons during state transitions.

## Sources
- packages/react/src/components/SideMenu/DefaultButtons/DragHandleButton.tsx

## Source
- **Repo**: https://github.com/TypeCellOS/BlockNote
- **File**: packages/react/src/components/SideMenu/DefaultButtons/DragHandleButton.tsx
- **Lines**: 13-56
- **License**: MPL-2.0

## Code
```
    export const DragHandleButton = (props) => {
      const sideMenu = useExtension(SideMenuExtension);
      const block = useExtensionState(SideMenuExtension, {
        selector: (state) => state?.block,
      });
      if (block === undefined) return null;  // guard: no orphan button during transitions

      return (
        <Components.Generic.Menu.Root
          onOpenChange={(open) => {
            // freeze/unfreeze is THE key — prevents menu from detaching when
            // cursor moves from handle to dropdown items
            if (open) { sideMenu.freezeMenu(); }
            else       { sideMenu.unfreezeMenu(); }
          }}
          position="left"
        >
          <Components.Generic.Menu.Trigger>
            <Components.SideMenu.Button
              draggable={true}
              onDragStart={(e) => sideMenu.blockDragStart(e, block)}
              onDragEnd={sideMenu.blockDragEnd}
              icon={<MdDragIndicator size={24} data-test="dragHandle" />}
            />
          </Components.Generic.Menu.Trigger>
          <DragHandleMenu>{props.children}</DragHandleMenu>
        </Components.Generic.Menu.Root>
      );
    };
  
```

## How To Adapt
- For kanban cards: use position='top' or embed handle on card surface — hover gutter is poor for touch.
- Keep icon hit target >= 24px; MdDragIndicator at size={24} is the minimum.
- freezeMenu/unfreezeMenu are NOT idempotent — nested submenus need a counter, not a boolean.

## Gotchas
- Without freezeMenu, hovering toward the dropdown repositions the gutter to a different block — 'menu flies away' bug.
- draggable={true} means keyboard users can't activate the menu with Enter unless you add onKeyDown handling.
- if (block === undefined) return null is critical — prevents orphan buttons during state transitions.
