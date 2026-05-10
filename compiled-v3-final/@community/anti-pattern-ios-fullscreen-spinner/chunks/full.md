# IosFullscreenSpinner [anti-pattern] v1.0.0
Showing a full-screen ProgressView (or activity indicator overlay) that blocks all interaction while content loads. The spinner occupies the entire viewport with no contextual information, leaving the user with nothing to look at and no sense of progress.
domain: frontend-design

## Label
iOS Full-Screen Blocking Spinner

## Why Bad
Full-screen spinners make the app feel frozen and unresponsive. They provide zero content context, give no indication of how long the wait will be, and prevent any interaction (e.g., navigating away or reading cached content). Skeleton views that mirror the final layout reduce perceived load time and improve user confidence. Apple HIG source: Rules 7.8 and 8.2; Anti-Pattern #3.

## Instead Do
Use skeleton/placeholder views that match the final content layout (same card shapes, row heights, image placeholders). For known-duration operations, use a determinate ProgressView. For inline refreshes (pull-to-refresh, pagination), use a small inline progress indicator scoped to the updating region.

## Label
iOS Full-Screen Blocking Spinner

## Why Bad
Full-screen spinners make the app feel frozen and unresponsive. They provide zero content context, give no indication of how long the wait will be, and prevent any interaction (e.g., navigating away or reading cached content). Skeleton views that mirror the final layout reduce perceived load time and improve user confidence. Apple HIG source: Rules 7.8 and 8.2; Anti-Pattern #3.

## Instead Do
Use skeleton/placeholder views that match the final content layout (same card shapes, row heights, image placeholders). For known-duration operations, use a determinate ProgressView. For inline refreshes (pull-to-refresh, pagination), use a small inline progress indicator scoped to the updating region.
