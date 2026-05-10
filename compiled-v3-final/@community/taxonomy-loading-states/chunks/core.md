# LoadingStates [taxonomy] v1.0.0
A taxonomy of loading states by perceived duration. Different durations require different visual treatments: instant operations need no indicator at all; sub-second waits show progress in-context; multi-second waits need skeleton or progress-bar; long operations need progress with percentage and cancel.
domain: ux-design

## Label
Loading State Hierarchy by Duration and Context

## Members
- instant
- optimistic
- in-context-spinner
- button-loading
- skeleton
- progress-bar
- long-running-with-cancel
- background-task

## Styles
- **Instant**:
  - **Purpose**: Operation completes within ~100ms; no indicator needed.
  - **Visual**: No loading state. Result appears.
  - **Timing**: < 100ms (Doherty threshold; perceived as instantaneous)
  - **Examples**: Toggling a checkbox locally; switching tabs in a SPA; in-memory filter on a list.
- **Optimistic**:
  - **Purpose**: Apply the change locally before server confirms; revert with toast on failure.
  - **Visual**: Result appears instantly; subtle pending dot or 'Saved' that fades after confirm.
  - **Aria**: If background work matters, aria-live='polite' announces completion
  - **Examples**: Like / favorite buttons; mark-read on email; archive in Linear.
  - **Reference**: @community/principle-perceived-vs-actual
- **In Context Spinner**:
  - **Purpose**: Operation tied to a specific element; show small spinner inside or beside it.
  - **Visual**: Inline spinner (16-20px); replaces icon or sits next to label.
  - **Timing**: 100ms-1500ms
  - **Examples**: Saving a single field; loading a dropdown's options; refreshing a card.
- **Button Loading**:
  - **Purpose**: Button submits or triggers; user must know action was registered.
  - **Visual**: Spinner replaces or overlays button text; button disabled.
  - **Aria**: aria-busy='true' on the button; visible label preserved or replaced with localized 'Loading...'
  - **Timing**: Up to ~3s; beyond that, switch to progress or skeleton.
  - **Rule**: Disable the button (prevent double-submit) but keep it visually present. Don't shrink or move.
- **Skeleton**:
  - **Purpose**: Initial load of a section / page; show structure-shaped placeholders.
  - **Visual**: Gray rectangles in the shape of final content (text rows, image blocks, card grid). Subtle shimmer.
  - **Aria**: aria-busy='true' on container; aria-label='Loading' OR live region announces 'Loading content'
  - **Timing**: 300ms-3000ms; below 300ms skip skeleton (causes flash); above 3s consider progress
  - **Rule**: Skeleton dimensions MUST match final content dimensions to prevent CLS (see @community/rule-cls-budget).
- **Progress Bar**:
  - **Purpose**: Long operation with measurable progress (file upload, large query).
  - **Visual**: Determinate bar with percentage; optional ETA; current step described.
  - **Aria**: role='progressbar'; aria-valuenow / aria-valuemin / aria-valuemax
  - **Timing**: 1s-30s typical; > 30s should likely move to background-task pattern
  - **Rule**: Show actual progress; fake-progress (Stripe-like 30% jump every 2s) violates user trust if measured.
- **Long Running With Cancel**:
  - **Purpose**: Operation may take minutes; user must be able to cancel.
  - **Visual**: Progress bar (if measurable) or named indeterminate spinner; prominent Cancel button.
  - **Aria**: Cancel button labeled clearly; aria-describedby explains what is happening
  - **Examples**: Video transcoding; bulk import; ML inference.
  - **Rule**: Cancel must actually work — server-side abort, not just hide UI.
- **Background Task**:
  - **Purpose**: Operation continues without blocking the UI; user is notified on completion.
  - **Visual**: Toast or notification badge; user can navigate away and return.
  - **Aria**: aria-live='polite' announcement on start and completion; toast role='status'
  - **Examples**: Building a report; exporting data; long-running migration.
  - **Rule**: Provide a way to view in-progress tasks (notification center) so user doesn't lose track.

## Invariants
- Operations under 100ms MUST NOT show any loading indicator — flash is worse than no indicator.
- Skeleton dimensions MUST match final content dimensions (no CLS).
- Loading states MUST NOT block the entire UI when only a section is loading (see @community/anti-pattern-ios-fullscreen-spinner).
- Indeterminate spinners > 5s without progress information indicate a UX failure — switch to progress, partial results, or background-task.
- All loading states MUST satisfy `prefers-reduced-motion` — replace shimmer/spin with static placeholder when set.
