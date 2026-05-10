# IosContextMenuRedundant [rule] v1.0.0
> Every action in a context menu must also be accessible through a visible button, swipe action, or toolbar item — a context menu must never be the only path to an action.
domain: frontend-design

## Applies To
any iOS view that exposes actions via a long-press context menu

## Examples
- A long-press on a message reveals Share, Copy, Reply — all of which also appear in a toolbar or action sheet reachable by tapping a visible '...' button.
- Anti-example: long-press is the only way to delete a photo; there is no trash icon or swipe action.

## Rationale
Context menus are not discoverable by all users: users who don't know to long-press never see them. Users with motor impairments, and Switch Control users, may be unable to trigger a long-press reliably. Providing context menus as shortcuts (not sole paths) improves both accessibility and discoverability. Apple HIG source: Rule 7.7 — Context Menus.

## Applies To
any iOS view that exposes actions via a long-press context menu
