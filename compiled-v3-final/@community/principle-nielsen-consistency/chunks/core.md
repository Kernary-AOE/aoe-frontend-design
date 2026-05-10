# NielsenConsistency [principle] v1.0.0
Nielsen Heuristic 4: users should not have to wonder whether different words, situations, or actions mean the same thing; follow platform and industry conventions.
> Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions.
domain: ux-design

## Attributed To
Jakob Nielsen, 1994

## Applies To
- icon usage: same icon for same action across all screens
- color semantics: red = error/danger used uniformly, not decoratively
- keyboard shortcuts: matching OS conventions (Cmd+S, Ctrl+Z)
- terminology: using one term for one concept throughout all UI copy
- interaction patterns: identical controls behave identically everywhere
- component libraries: enforcing internal consistency via a design system

## Counter Examples
- A SaaS product where the primary action button is blue in the dashboard, green in settings, and purple in onboarding — users lose confidence in which button is 'safe'.
- An app where Escape closes modals in some flows but does nothing in others — users can't form a reliable mental model.
- Different pages calling the same object 'Project' in one place and 'Workspace' in another, creating permanent user confusion about whether they're the same thing.
