# ButtonNoLoading [counter-example] v1.0.0
A typical submit handler that awaits a network request without any visible feedback. The button stays enabled, no spinner appears, the user can click it five times and trigger five duplicate POSTs.
domain: ux-design

## Label
Save Button That Awaits Without Disabling Or Showing Spinner

## Bad Code
```
function SaveButton({ data }) {
const onClick = async () => {
await fetch("/api/save", {
method: "POST",
body: JSON.stringify(data),
});
toast("Saved!");
};

return <button onClick={onClick}>Save</button>;
}
```

## Why Bad
- Button stays enabled during the fetch — user can click 5 times and trigger 5 duplicate POSTs
- No spinner or label change — user has no idea if the click registered
- If fetch throws, the toast never fires and the user is left wondering — silent failure
- Screen readers announce nothing during the pending state (no `aria-busy`)
- Violates Nielsen heuristic 1 (visibility of system status) — the system gives no feedback for 1+ seconds

## Good Code
```
function SaveButton({ data }) {
const [isPending, setPending] = useState(false);

const onClick = async () => {
if (isPending) return;
setPending(true);
try {
const res = await fetch("/api/save", {
method: "POST",
body: JSON.stringify(data),
});
if (!res.ok) throw new Error("Save failed");
toast.success("Saved");
} catch (e) {
toast.error("Could not save. Try again.");
} finally {
setPending(false);
}
};

return (
<button
onClick={onClick}
disabled={isPending}
aria-busy={isPending}
>
{isPending ? <Spinner aria-hidden="true" /> : null}
{isPending ? "Saving…" : "Save"}
</button>
);
}
```

## Why Good
- `disabled={isPending}` prevents duplicate submissions during the pending window
- Label changes ('Save' → 'Saving…') gives unambiguous status — user knows the click registered
- `aria-busy='true'` announces the busy state to screen readers
- Try/catch surfaces errors via toast — no silent failure
- `finally` block guarantees the loading state clears even on error — no stuck spinner

## Anti Pattern
@community/anti-pattern-no-loading-state

## Label
Save Button That Awaits Without Disabling Or Showing Spinner

## Bad Code
```
function SaveButton({ data }) {
const onClick = async () => {
await fetch("/api/save", {
method: "POST",
body: JSON.stringify(data),
});
toast("Saved!");
};

return <button onClick={onClick}>Save</button>;
}
```

## Why Bad
- Button stays enabled during the fetch — user can click 5 times and trigger 5 duplicate POSTs
- No spinner or label change — user has no idea if the click registered
- If fetch throws, the toast never fires and the user is left wondering — silent failure
- Screen readers announce nothing during the pending state (no `aria-busy`)
- Violates Nielsen heuristic 1 (visibility of system status) — the system gives no feedback for 1+ seconds

## Good Code
```
function SaveButton({ data }) {
const [isPending, setPending] = useState(false);

const onClick = async () => {
if (isPending) return;
setPending(true);
try {
const res = await fetch("/api/save", {
method: "POST",
body: JSON.stringify(data),
});
if (!res.ok) throw new Error("Save failed");
toast.success("Saved");
} catch (e) {
toast.error("Could not save. Try again.");
} finally {
setPending(false);
}
};

return (
<button
onClick={onClick}
disabled={isPending}
aria-busy={isPending}
>
{isPending ? <Spinner aria-hidden="true" /> : null}
{isPending ? "Saving…" : "Save"}
</button>
);
}
```

## Why Good
- `disabled={isPending}` prevents duplicate submissions during the pending window
- Label changes ('Save' → 'Saving…') gives unambiguous status — user knows the click registered
- `aria-busy='true'` announces the busy state to screen readers
- Try/catch surfaces errors via toast — no silent failure
- `finally` block guarantees the loading state clears even on error — no stuck spinner

## Anti Pattern
@community/anti-pattern-no-loading-state
