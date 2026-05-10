# ButtonTypeExplicit [rule] v1.0.0
Every `<button>` element MUST declare an explicit `type` attribute (`button`, `submit`, or `reset`). The HTML default is `submit`, which inside a `<form>` causes any unrelated button (e.g. an icon toggle) to submit the form on click — a common, hard-to-debug bug.
domain: frontend-engineering
