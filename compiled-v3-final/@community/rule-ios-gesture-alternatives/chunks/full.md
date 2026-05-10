# IosGestureAlternatives [rule] v1.0.0
> Every custom gesture must have an equivalent action accessible via a visible button or menu — no action may be gesture-only.
domain: frontend-design

## Applies To
any iOS view that introduces a non-standard gesture (long press for exclusive action, multi-finger swipe, custom drag, force touch)

## Examples
- A two-finger swipe to reorder items also has a drag handle visible on each row.
- A long-press for 'Mark as favourite' also appears in the item's action sheet or row swipe action.

## Rationale
Users with motor impairments, Switch Control users, and older users cannot reliably perform complex or multi-touch gestures. A visible alternative ensures equal access to every feature. This is required by Apple HIG Rule 5.7 and is a practical accessibility blocker for App Store review.

## Applies To
any iOS view that introduces a non-standard gesture (long press for exclusive action, multi-finger swipe, custom drag, force touch)
