# AutocompleteCombobox [pattern] v1.0.0
A text input that filters and surfaces a popup listbox of suggestions as the user types, allowing free-text entry and selection. Used for tag pickers, address inputs, mention pickers, and search-as-you-type.
domain: frontend-design

## Facts

## Label
Autocomplete Combobox

## Problem
Free-text inputs accept invalid values and force memorization; static `<select>` elements cannot scale to thousands of options or accept new values. Users need both suggestion and freedom.

## Solution
Combine a text input (combobox) with a popup listbox of filtered suggestions. ArrowDown opens; typing filters; Arrow keys move highlight; Enter selects (or accepts free text if no match).

## Structure
```
    <div class="combobox">
      <label for="city">City</label>
      <div class="combo-wrap">
        <input
          id="city"
          role="combobox"
          aria-expanded="true"
          aria-controls="city-list"
          aria-autocomplete="list"
          aria-activedescendant="city-2"
          autocomplete="off"
          placeholder="Search cities"
          value="San"
        />
        <button aria-label="Toggle suggestions" tabindex="-1">
          <svg aria-hidden="true"></svg>
        </button>
      </div>
      <ul
        id="city-list"
        role="listbox"
        aria-label="City suggestions"
      >
        <li id="city-1" role="option" aria-selected="false">
          <mark>San</mark> Diego
        </li>
        <li id="city-2" role="option" aria-selected="true">
          <mark>San</mark> Francisco
        </li>
        <li id="city-3" role="option" aria-selected="false">
          <mark>San</mark> Jose
        </li>
      </ul>
      <div class="sr-only" aria-live="polite">3 suggestions</div>
    </div>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Open the popup on first keystroke or on ArrowDown / button click.
- ArrowDown / ArrowUp move highlight; first ArrowDown from input goes to first option, last ArrowUp to input.
- Update `aria-activedescendant` on the input to point at the highlighted option — focus stays on input.
- Enter selects highlighted; if no highlight, accept typed text as free entry (when allowed).
- Esc closes popup without selection; second Esc clears the input.
- Highlight matched substring with `<mark>` for scannability.
- Debounce remote suggestion fetches by 200-300ms to avoid request flood.

## A11y
- Follow ARIA 1.2 combobox pattern: input has `role='combobox'`, `aria-expanded`, `aria-controls`, `aria-autocomplete='list'`.
- Highlighted option uses `aria-activedescendant` from input — DO NOT move focus into the listbox.
- Listbox has `role='listbox'` and an accessible name; options have `role='option'` and `aria-selected`.
- Suggestion count must be announced via `aria-live='polite'`: '3 suggestions'.
- `autocomplete='off'` on the input prevents browser autofill from competing with custom suggestions.
