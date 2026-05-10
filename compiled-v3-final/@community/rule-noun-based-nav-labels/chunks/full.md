# NounBasedNavLabels [rule] v1.0.0
Navigation labels must be noun-based, consistent, present-tense, and free of jargon, marketing language, or cleverness — users navigate to destinations, not actions.
domain: frontend-design

## Severity
medium

## Exceptions
- Action-oriented apps (to-do lists, task managers) where the primary nav item is a verb+noun: 'Add Task' as a shortcut — acceptable if accompanied by a noun destination

## Examples
- Correct: Dashboard, Projects, Settings, Billing, Team
- Violation: 'Discover' — verb, not a destination
- Violation: 'Your Journey' — vague, no specific meaning
- Violation: 'HQ' for Settings — internal jargon
- Violation: 'Explore Plans' in main nav — CTA, belongs on a button

## Rationale
Navigation is a wayfinding system. Users scan nav items to recognize their destination, not to be persuaded. Verbs ('Discover', 'Explore') describe actions and belong on buttons, not nav items. Jargon requires domain knowledge that new users lack.

## Severity
medium

## Exceptions
- Action-oriented apps (to-do lists, task managers) where the primary nav item is a verb+noun: 'Add Task' as a shortcut — acceptable if accompanied by a noun destination
