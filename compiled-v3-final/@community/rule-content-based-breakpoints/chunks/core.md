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
