# HoverOnlyInteraction [anti-pattern] v1.0.0
Building tooltips, hover cards, mega-menus, or row-action buttons that only appear on `:hover` or `mouseenter`, with no equivalent for keyboard focus or touch tap. On mobile devices (no hover), the content is unreachable. For keyboard users, the trigger never activates because focus doesn't fire `:hover`.
domain: accessibility
