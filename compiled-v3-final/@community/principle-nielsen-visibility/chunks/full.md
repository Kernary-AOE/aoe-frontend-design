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

## Sources

## Examples
- Linear's progress bar during project import shows percentage + estimated time remaining — users know exactly how long to wait.
- Gmail's 'Sending…' → 'Message sent. Undo' sequence confirms the action completed and offers recovery in the same feedback moment.
- Figma's collaboration cursor labels show each collaborator's name in real time — the system status of 'who is here' is always visible.

## Source
- Jakob Nielsen, 'Heuristic Evaluation', in Nielsen & Mack (eds.), Usability Inspection Methods (1994)
- https://www.nngroup.com/articles/ten-usability-heuristics/
