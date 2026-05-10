# UppercaseLabelsTracking [rule] v1.0.0
Category and section labels above metrics or data groups must be uppercase, 12px, medium weight (500), secondary-text color, with 0.05em letter-spacing — sentence-case labels or labels without tracking are prohibited.
>     Every label that identifies a data category, section heading in a card, or column header in a stat grid uses this exact recipe:
    className="text-[12px] text-text-secondary font-medium uppercase tracking-[0.05em]"

    That is: 12px · weight 500 · uppercase · 0.05em letter-spacing · secondary-text color.

    Applies to: 'TODAY'S REVENUE', 'ACTIVE USERS', 'REVENUE TREND', column labels in stat footers ('WEB', 'MOBILE', 'API'),
    badge pill labels ('ALERT', 'NEW'), section divider labels.

    Do NOT use: sentence-case ('Today's revenue'), lowercase, tracking-normal (0em), or bold weight on labels.
  
domain: frontend-design

## Applies To
- Stat card column headers
- KPI card labels above metrics
- Chart card section titles
- Badge pill text
- Any label whose purpose is to name a category, not describe it

## Counter Example
```
    {/* WRONG — sentence-case without tracking */}
    <p className="text-[12px] text-text-secondary font-medium mb-1.5">
      Today's revenue
    </p>
    {/* Reads as body copy, not a label — loses the hierarchy signal */}
  
```
