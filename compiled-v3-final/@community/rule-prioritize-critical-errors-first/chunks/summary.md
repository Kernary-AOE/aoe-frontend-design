# PrioritizeCriticalErrorsFirst [rule] v1.0.0
When multiple validation errors exist simultaneously, surface the most critical error first rather than dumping a full list — guide users one issue at a time to reduce abandonment.
> When a form submission produces multiple validation errors: (1) rank errors by severity (blocker > warning > suggestion); (2) display the highest-severity error prominently at the top of the form, adjacent to the offending field; (3) show a maximum of 1–2 errors at a time; (4) only reveal subsequent errors after the top error is resolved. Never flood the user with a full list of all failures at once.
domain: frontend-design
