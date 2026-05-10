# ModalAsDefault [anti-pattern] v1.0.0
Using modal dialogs as the default mechanism for confirmations, forms, detail views, and settings — without considering less disruptive alternatives like inline expansion, side drawers, popovers, or dedicated pages.
domain: frontend-design

## Label
Modal Dialog as Default Content Interruption Strategy

## Trap
Modals are the path of least resistance: a single floating layer that does not require redesigning the surrounding page. But modals are expensive: they interrupt task flow, trap keyboard focus, require explicit dismissal, stack poorly on mobile, and communicate urgency the content rarely warrants. Every modal is an implicit claim that the content is so important it cannot coexist with the page. In practice, most content shipped in modals would work better inline or in a slide-over panel.

## Alternatives
- Inline expand — form or detail revealed in-place without leaving context (use <details> or animated height)
- Side drawer/sheet — persistent panel that preserves background context, dismissable with back gesture
- Popover — for lightweight menus, tooltips, and pickers (native popover API, light-dismiss built in)
- Dedicated page/route — for complex forms or multi-step flows that warrant full attention
- Toast + undo — for destructive confirmations; removes immediately, provides undo window instead of confirm step

## When Modals Are Justified
- Truly irreversible destructive actions where a friction barrier is a safety feature (account deletion)
- Authentication flows that must block page interaction (sign-in gate)
- Quick-create flows where the user explicitly invoked a 'new item' action and expects to remain on current page
- Media lightboxes where full-screen focus on a single image is expected behavior
