# NielsenVisibility [principle] v1.0.0
Nielsen Heuristic 1: the system should always keep users informed about what is going on, through appropriate feedback within reasonable time.
> The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.
domain: ux-design

## Attributed To
Jakob Nielsen, 1994

## Applies To
- async operations: file uploads, form submissions, payments
- background processes: sync, indexing, AI generation
- navigation: indicating current location in a hierarchy
- multi-step workflows: showing progress and step count
- real-time data: dashboards, chats, collaborative editors

## Counter Examples
- A form's Submit button that freezes with no loading state — users click repeatedly, causing duplicate submissions.
- A background data sync that silently fails — users work with stale data without knowing the fetch errored.
- A wizard-style checkout with no step indicator — users don't know if they are on step 2 of 3 or step 2 of 8.
