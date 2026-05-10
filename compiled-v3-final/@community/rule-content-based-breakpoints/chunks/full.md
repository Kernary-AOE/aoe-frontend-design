# ContentBasedBreakpoints [rule] v1.0.0
> Define responsive breakpoints at the specific widths where your actual content degrades — lines become too long, columns become too narrow, text overflows — rather than at named device categories (mobile/tablet/desktop). Use resize-and-observe to find the breaking point, then set the breakpoint there.
domain: frontend-design

## Label
Set Breakpoints Where Content Breaks, Not at Device Names

## Applies When
adding any @media query breakpoint to a layout or component

## Verify By
Drag the browser window slowly from narrow to wide; observe the first width where content looks broken; place the breakpoint 1px above that width

## Anti Patterns
- Using @media (max-width: 768px) because 'that is mobile' without checking if content actually breaks there
- Copying framework breakpoints (sm/md/lg/xl) without verifying they match your content's actual breaking points

## Severity
warning

## Examples
- Text runs longer than 80ch at 900px → add breakpoint at 900px to reduce line length
- 3-column grid becomes unreadable below 720px → add @media (min-width: 720px) { grid-cols: 3 }
- Navigation links wrap at 880px → add hamburger breakpoint at 880px, not at 768px

## Rationale
Device widths change every product cycle. A breakpoint at '768px for tablet' may not match any real device by the time the product ships. Content-driven breakpoints remain correct as the device landscape evolves, and they ensure every breakpoint has a visual reason to exist.

## Label
Set Breakpoints Where Content Breaks, Not at Device Names

## Applies When
adding any @media query breakpoint to a layout or component

## Verify By
Drag the browser window slowly from narrow to wide; observe the first width where content looks broken; place the breakpoint 1px above that width

## Anti Patterns
- Using @media (max-width: 768px) because 'that is mobile' without checking if content actually breaks there
- Copying framework breakpoints (sm/md/lg/xl) without verifying they match your content's actual breaking points

## Severity
warning
