# ProgressiveDisclosure [pattern] v1.0.0
A UX pattern that initially shows only the most important information or options, revealing additional detail on user demand. Reduces cognitive load for new users while remaining efficient for experts who trigger disclosure shortcuts.
domain: frontend-design

## Facts

## Label
Progressive Disclosure

## Problem
Complex interfaces overwhelm first-time users with too many options simultaneously, while power users need rapid access to advanced features. A single fixed UI cannot serve both without compromise.

## Solution
Layer information: show the minimal-sufficient view by default; provide clear affordances (chevrons, 'more options', detail panels) that reveal advanced content on demand.

## Levels
-
  - **Level**: 1
  - **Label**: Primary
  - **Description**: Core actions and most-needed information. Always visible.
  - **Example**: Card with title, key metric, and a single primary action button.
-
  - **Level**: 2
  - **Label**: Secondary
  - **Description**: Contextual details available on hover/focus or explicit expand.
  - **Example**: Hovering a card reveals secondary actions (edit, archive, share).
-
  - **Level**: 3
  - **Label**: Tertiary
  - **Description**: Advanced or rarely-needed configuration, behind an explicit 'Advanced' expand.
  - **Example**: A 'Show advanced options' accordion in a settings form.

## Uses
- @community/method-heuristic-review

## A11y
- Disclosure widgets must use `aria-expanded` on the trigger element.
- Revealed content must follow the trigger in DOM order for logical tab sequence.
- Use `aria-controls` to associate trigger with the region it controls.
