# ViewportMetaRequired [rule] v1.0.0
> Every web page must include <meta name='viewport' content='width=device-width, initial-scale=1'> and must never set maximum-scale or user-scalable=no.
domain: frontend-design

## Severity
block

## Applies When
any web page served to mobile or tablet browsers

## Verify By
Check <head> for viewport meta. Confirm content contains 'width=device-width'. Confirm no maximum-scale or user-scalable=no is present. Test with browser DevTools mobile emulation.

## Code
```
    <!-- Correct -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Also acceptable -->
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">

    <!-- WRONG: blocks pinch-to-zoom (WCAG SC 1.4.4 violation) -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  
```
