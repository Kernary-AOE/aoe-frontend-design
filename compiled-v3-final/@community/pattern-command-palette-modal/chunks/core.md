# CommandPaletteModal [pattern] v1.0.0
A specific implementation of a command palette as a centered modal dialog (not full-screen, not inline) — a 480-640px-wide floating card overlaid on a scrim, opened with Cmd/Ctrl+K. Focuses on the modal-specific concerns: backdrop, focus trap, exit transition.
domain: frontend-design

## Facts

## Label
Command Palette Modal

## Problem
When a command palette is implemented as a centered modal rather than a top-bar inline input, the modal mechanics (scrim opacity, transform-from-y, focus trap, scroll lock) are easy to get wrong.

## Solution
Use a native `<dialog>` element (or a role=dialog with proper focus trap), centered with margin auto, sized 480-640px, with a translucent backdrop and a fast scale+fade entry transition.

## Structure
```
    <div class="palette-backdrop" aria-hidden="true"></div>
    <dialog
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      class="palette"
    >
      <header class="palette__search">
        <svg aria-hidden="true"><!-- magnifier --></svg>
        <input
          type="search"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-listbox"
          aria-autocomplete="list"
          aria-activedescendant="cmd-1"
          placeholder="Type a command or search…"
          autofocus
        />
        <kbd>Esc</kbd>
      </header>
      <ul id="palette-listbox" role="listbox">
        <li id="cmd-1" role="option" aria-selected="true">
          <span>Create issue</span><kbd>C</kbd>
        </li>
        <li id="cmd-2" role="option">
          <span>Open settings</span><kbd>⌘,</kbd>
        </li>
      </ul>
      <footer class="palette__hints" aria-hidden="true">
        <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
        <span><kbd>↵</kbd> select</span>
      </footer>
    </dialog>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Cmd+K (or Ctrl+K on Windows/Linux) opens the palette; Esc closes it.
- When opened, focus moves to the input; when closed, focus returns to the previously focused element.
- ArrowDown / ArrowUp move the highlighted option, updating aria-activedescendant — focus stays on the input.
- Enter activates the highlighted command and closes the palette.
- Backdrop click closes the palette unless the user has typed text (preserve typed input).
- Lock body scroll while open (overflow:hidden on body) so background does not scroll.
- Entry transition: scale 0.98 → 1 + opacity 0 → 1 over 120ms ease-out (skip if prefers-reduced-motion).

## A11y
- Use `<dialog>` or `role='dialog' aria-modal='true'` so screen readers trap their virtual cursor.
- Combobox pattern: input has `role='combobox'`, `aria-controls` pointing to listbox, `aria-activedescendant` on the highlighted option.
- Focus trap: Tab from the last focusable cycles to the first; Shift+Tab from first cycles to last.
- Result count must be in an `aria-live='polite'` region: 'Showing 12 results'.
- Honor `prefers-reduced-motion: reduce` by removing scale/opacity transitions.
