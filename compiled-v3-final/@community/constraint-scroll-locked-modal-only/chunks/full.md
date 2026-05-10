# ScrollLockedModalOnly [constraint] v1.0.0
Body scroll lock (overflow:hidden / scroll-position pinning) is permitted only while a fully-blocking overlay (modal dialog, full-screen drawer, lightbox) is visible. It must be released the moment the overlay closes.
domain: interaction

## Target
- document-level scroll lock on body / html
- scroll-prevention when overlay UI is open

## Severity
high

## Values
-
  - **Allowed When**: modal dialog with role=dialog aria-modal=true is open
-
  - **Allowed When**: full-screen drawer / sheet covering the viewport
-
  - **Allowed When**: lightbox / image viewer in fullscreen
-
  - **Forbidden**: global default scroll lock applied at page load
-
  - **Forbidden**: scroll lock during transient toasts, popovers, tooltips, dropdowns
-
  - **Forbidden**: scroll lock that persists after overlay close (state leak)

## Exceptions
- Mobile Safari: scroll lock may need to additionally fix `position: fixed; top: -<scrollY>` to defeat rubber-band scrolling — release pattern must restore exact scrollY on close.
- Native fullscreen API contexts (video player) where the browser itself locks the parent.

## Approved Alternatives
- Popovers / dropdowns / toasts: do not lock scroll — let the user scroll the page underneath.
- Modal libraries (Radix Dialog, React Aria Modal) handle lock + restore correctly out of the box — prefer over hand-rolled.
- scroll-padding-top to keep underlying focus from sliding under sticky headers.

## Enforcement
Code review: search for `document.body.style.overflow = 'hidden'` outside of modal mount/unmount lifecycles. Cypress test: open + close overlay, assert scroll position preserved.

## Rationale
Scroll lock is a heavy hand. When applied incorrectly it traps users on a page, breaks scroll-restoration on Safari iOS, hides content behind a fixed header, and ejects the user from their reading position. The only justified case is when the overlay genuinely blocks all underlying content — anything else can scroll-through.
