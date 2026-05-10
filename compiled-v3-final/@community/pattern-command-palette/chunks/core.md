# CommandPalette [pattern] v1.0.0
A full-screen or centered modal overlay triggered by a keyboard shortcut (typically Cmd/Ctrl+K) that provides a searchable, keyboard-navigable list of all application commands. Serves as a universal shortcut for power users and a discovery mechanism for new users.
domain: frontend-design

## Facts

## Label
Command Palette

## Problem
Applications with many features require users to memorize menu locations or keyboard shortcuts. Mouse-only navigation for expert tasks is slow. Documentation is rarely consulted.

## Solution
A single, universal entry point — a fuzzy-searchable command list — that is always one keystroke away. All commands, navigation targets, and actions are surfaced in one place.

## Structure
```
    <dialog role="dialog" aria-modal="true" aria-label="Command palette">
      <input
        type="search"
        role="combobox"
        aria-expanded="true"
        aria-controls="cmd-listbox"
        aria-autocomplete="list"
        placeholder="Search commands..."
      />
      <ul id="cmd-listbox" role="listbox" aria-label="Commands">
        <li role="option" aria-selected="true">
          <kbd>C</kbd> Create issue
        </li>
        <li role="option">
          <kbd>⌘P</kbd> Open project
        </li>
      </ul>
    </dialog>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Trap focus inside dialog while open (Tab cycles through results; Shift+Tab reverses).
- Arrow Up/Down navigate results; Enter activates selected command.
- Escape closes palette and returns focus to previously focused element.
- Fuzzy search: match non-contiguous characters (e.g., 'cri' matches 'Create issue').
- Show keyboard shortcut for each command next to its label.

## A11y
- Use `role=dialog aria-modal=true` to trap screen reader virtual cursor.
- Announce result count with `aria-live=polite` region: '12 results'.
- Input must have `aria-controls` pointing to the listbox id.
