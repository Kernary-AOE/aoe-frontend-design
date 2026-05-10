# NielsenAesthetic [principle] v1.0.0
Nielsen Heuristic 8: dialogues should not contain irrelevant or rarely needed information; every extra unit of information competes with relevant information and diminishes its relative visibility.
> Dialogues should not contain irrelevant or rarely needed information. Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.
domain: ux-design

## Attributed To
Jakob Nielsen, 1994

## Applies To
- form design: show only the fields required for the task at this step
- dashboard design: every widget must earn its presence — remove unused metrics
- modal dialogs: strip to the minimum decision information needed
- onboarding: progressive disclosure rather than front-loading all features
- error messages: the error and the fix, nothing else
- navigation: prune items users rarely need out of primary navigation

## Counter Examples
- A signup form that asks for phone number, date of birth, job title, and company size when all the product needs is an email and password to get started.
- A dashboard crammed with 20 widgets showing every possible metric — the most important KPIs are lost in the noise.
- An error dialog that shows the full stack trace alongside the user message — the technical detail adds no value to the user but obscures the actionable guidance.

## Sources

## Examples
- Stripe Checkout presents only the fields essential for payment — name, card, and billing ZIP — nothing else, maximising the focus on completing the transaction.
- Apple's macOS setup assistant shows one question per screen, removing all UI chrome that doesn't relate to that step.
- Linear's issue view surfaces status, priority, and assignee prominently while hiding rarely-changed fields (like creation date) in a collapsed section.

## Source
- Jakob Nielsen, 'Heuristic Evaluation', in Nielsen & Mack (eds.), Usability Inspection Methods (1994)
- https://www.nngroup.com/articles/ten-usability-heuristics/
