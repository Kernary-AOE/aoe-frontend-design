# ButtonLabelFormula [fact] v1.0.0
> Button labels must follow the verb + object pattern. Generic confirmations (OK, Submit, Yes, Cancel) are lazy and ambiguous — they force the user to reread the surrounding context to understand what the button will do.
domain: frontend-design

## Detail
The verb + object pattern makes the action and its target explicit in the button label itself, eliminating the need to parse surrounding context. This matters most for destructive actions (where the cost of misunderstanding is high) and for multi-step flows (where the user may have forgotten the framing). For destructive actions specifically: name the destruction, include the count if relevant. 'Cancel' is almost always wrong — it should describe what is preserved or what the user is returning to.

## Table
```
    | Bad label    | Good label            | Why improved                    |
    |--------------|-----------------------|---------------------------------|
    | OK           | Save changes          | States the action               |
    | Submit       | Create account        | Outcome-focused                 |
    | Yes          | Delete message        | Confirms the specific action    |
    | Cancel       | Keep editing          | Clarifies the alternative       |
    | Click here   | Download PDF          | Describes destination           |
    | Delete       | Delete 5 items        | Shows scope of destruction      |
    | Remove       | Delete (permanently)  | Delete = permanent, remove = not|
  
```
