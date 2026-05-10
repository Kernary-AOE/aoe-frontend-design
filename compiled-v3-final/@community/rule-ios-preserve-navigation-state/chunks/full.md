# IosPreserveNavigationState [rule] v1.0.0
> Persist and restore scroll position, selected tab, search text, filters, and any user-entered state across navigation transitions and app foregrounding.
domain: frontend-design

## Applies To
all iOS views where the user may navigate away and return (tab switching, push/pop, backgrounding)

## Examples
- Switching tabs: return to the same scroll offset and selected item that was visible before leaving.
- After backgrounding: restore the active list filter and search text.
- Verify: navigate away and return; scroll position and any user-entered state must be preserved.

## Rationale
Forcing users to reconstruct context from memory adds cognitive load; recognition (seeing the restored state) is faster and less error-prone than recall (re-entering the same settings). Resetting scroll or filter state on tab switch is a common source of frustration.

## Applies To
all iOS views where the user may navigate away and return (tab switching, push/pop, backgrounding)
