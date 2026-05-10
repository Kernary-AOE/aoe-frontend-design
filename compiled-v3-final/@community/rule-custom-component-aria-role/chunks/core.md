# CustomComponentAriaRole [rule] v1.0.0
> Any custom component replacing a native HTML widget must carry the matching ARIA role attribute. Dropdowns need role=menu + role=menuitem. Modals need role=dialog + aria-modal=true. Tab panels need role=tablist + role=tab + role=tabpanel. Disclosure buttons need aria-expanded. Screen readers rely entirely on role to announce widget type and available keyboard interactions.
domain: frontend-design

## Label
Custom Interactive Components Must Declare the Correct ARIA Role

## Applies When
building any non-native widget: dropdown, modal, tab panel, combobox, listbox, tooltip, accordion, tree, or grid

## Verify By
Inspect element role attribute in DevTools; confirm it matches the ARIA widget pattern. Run axe-core — role violations appear as critical errors.

## Role Map
```
    /* ARIA Widget Pattern → Required Roles */
    Dropdown menu   : trigger [aria-haspopup=menu aria-expanded] + ul[role=menu] > li[role=none] > [role=menuitem]
    Modal dialog    : [role=dialog aria-modal=true aria-labelledby aria-describedby]
    Tab panel       : [role=tablist] > [role=tab aria-selected aria-controls] + [role=tabpanel aria-labelledby]
    Combobox        : input[role=combobox aria-autocomplete aria-expanded aria-controls] + ul[role=listbox] > li[role=option]
    Tooltip         : trigger[aria-describedby=TT_ID] + [id=TT_ID role=tooltip hidden]
    Accordion       : button[aria-expanded aria-controls=PANEL_ID] + [id=PANEL_ID] (no ARIA role on panel needed)
    Disclosure      : button[aria-expanded aria-controls=REGION_ID] + [id=REGION_ID]
    Alert dialog    : [role=alertdialog aria-modal=true aria-labelledby] (assertive; use sparingly)
  
```

## Severity
block
