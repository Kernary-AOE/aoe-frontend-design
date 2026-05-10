# DivOnClickDropdown [counter-example] v1.0.0
A user account dropdown where the trigger is a `<div>` with `onClick`. Mouse users can open it; keyboard users cannot tab to it; screen reader users have no idea it's a menu.
domain: accessibility

## Label
Account Menu Built From `<div onClick>` With No Keyboard

## Bad Code
```
function AccountMenu() {
const [open, setOpen] = useState(false);

return (
<div className="account-menu">
<div
className="trigger"
onClick={() => setOpen(!open)}
>
<Avatar /> ▾
</div>
{open && (
<div className="panel">
<div onClick={goToProfile}>Profile</div>
<div onClick={goToSettings}>Settings</div>
<div onClick={signOut}>Sign out</div>
</div>
)}
</div>
);
}
```

## Why Bad
- `<div>` trigger is not focusable — Tab key skips right past it
- No keyboard activation: Enter and Space do nothing on a `<div onClick>`
- Escape doesn't close the panel — keyboard users have no way to dismiss it once opened by other means
- No `aria-expanded` / `aria-haspopup` — screen readers announce 'group' or nothing, not 'menu collapsed'
- Menu items are also `<div onClick>` — they share the same problem; no role='menuitem' or keyboard nav

## Good Code
```
function AccountMenu() {
const [open, setOpen] = useState(false);
const panelId = useId();

useEffect(() => {
if (!open) return;
const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
window.addEventListener("keydown", onKey);
return () => window.removeEventListener("keydown", onKey);
}, [open]);

return (
<div className="account-menu">
<button
type="button"
className="trigger"
aria-expanded={open}
aria-controls={panelId}
aria-haspopup="menu"
onClick={() => setOpen(o => !o)}
>
<Avatar /> <span aria-hidden="true">▾</span>
<span className="sr-only">Account menu</span>
</button>
{open && (
<ul id={panelId} role="menu" className="panel">
<li role="menuitem"><button onClick={goToProfile}>Profile</button></li>
<li role="menuitem"><button onClick={goToSettings}>Settings</button></li>
<li role="menuitem"><button onClick={signOut}>Sign out</button></li>
</ul>
)}
</div>
);
}
```

## Why Good
- `<button>` trigger is natively focusable and keyboard-activated by Enter/Space
- Escape handler closes the menu — users have a clear exit
- `aria-expanded` + `aria-controls` + `aria-haspopup='menu'` give screen readers the full disclosure semantics
- Menu items are real `<button>` elements inside `role='menuitem'` `<li>`s — keyboard reachable, touch-friendly
- Works with mouse, keyboard, touch, and screen readers without separate code paths

## Anti Pattern
@community/anti-pattern-click-to-open-only

## Label
Account Menu Built From `<div onClick>` With No Keyboard

## Bad Code
```
function AccountMenu() {
const [open, setOpen] = useState(false);

return (
<div className="account-menu">
<div
className="trigger"
onClick={() => setOpen(!open)}
>
<Avatar /> ▾
</div>
{open && (
<div className="panel">
<div onClick={goToProfile}>Profile</div>
<div onClick={goToSettings}>Settings</div>
<div onClick={signOut}>Sign out</div>
</div>
)}
</div>
);
}
```

## Why Bad
- `<div>` trigger is not focusable — Tab key skips right past it
- No keyboard activation: Enter and Space do nothing on a `<div onClick>`
- Escape doesn't close the panel — keyboard users have no way to dismiss it once opened by other means
- No `aria-expanded` / `aria-haspopup` — screen readers announce 'group' or nothing, not 'menu collapsed'
- Menu items are also `<div onClick>` — they share the same problem; no role='menuitem' or keyboard nav

## Good Code
```
function AccountMenu() {
const [open, setOpen] = useState(false);
const panelId = useId();

useEffect(() => {
if (!open) return;
const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
window.addEventListener("keydown", onKey);
return () => window.removeEventListener("keydown", onKey);
}, [open]);

return (
<div className="account-menu">
<button
type="button"
className="trigger"
aria-expanded={open}
aria-controls={panelId}
aria-haspopup="menu"
onClick={() => setOpen(o => !o)}
>
<Avatar /> <span aria-hidden="true">▾</span>
<span className="sr-only">Account menu</span>
</button>
{open && (
<ul id={panelId} role="menu" className="panel">
<li role="menuitem"><button onClick={goToProfile}>Profile</button></li>
<li role="menuitem"><button onClick={goToSettings}>Settings</button></li>
<li role="menuitem"><button onClick={signOut}>Sign out</button></li>
</ul>
)}
</div>
);
}
```

## Why Good
- `<button>` trigger is natively focusable and keyboard-activated by Enter/Space
- Escape handler closes the menu — users have a clear exit
- `aria-expanded` + `aria-controls` + `aria-haspopup='menu'` give screen readers the full disclosure semantics
- Menu items are real `<button>` elements inside `role='menuitem'` `<li>`s — keyboard reachable, touch-friendly
- Works with mouse, keyboard, touch, and screen readers without separate code paths

## Anti Pattern
@community/anti-pattern-click-to-open-only
