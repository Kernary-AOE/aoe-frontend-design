# FieldsetLegend [rule] v1.0.0
Logically related input groups (radio buttons, checkboxes, or multi-field address blocks) must be wrapped in `<fieldset>` with a `<legend>` that names the group, so screen readers announce the group context before each option.
domain: frontend-design

## Applies To
@community/type-html-artifact

## Severity
warning

## Structure
```
    <!-- Radio group -->
    <fieldset>
      <legend>Preferred contact method</legend>
      <label><input type="radio" name="contact" value="email"> Email</label>
      <label><input type="radio" name="contact" value="sms">   SMS</label>
      <label><input type="radio" name="contact" value="phone"> Phone</label>
    </fieldset>

    <!-- Checkbox group -->
    <fieldset>
      <legend>Notification preferences</legend>
      <label><input type="checkbox" name="notif" value="product"> Product updates</label>
      <label><input type="checkbox" name="notif" value="security"> Security alerts</label>
    </fieldset>

    <!-- Multi-field address -->
    <fieldset>
      <legend>Billing address</legend>
      <label for="street">Street</label><input id="street" name="street" autocomplete="street-address">
      <label for="city">City</label><input id="city" name="city" autocomplete="address-level2">
      <label for="zip">Zip</label><input id="zip" name="zip" autocomplete="postal-code">
    </fieldset>
  
```

## Exceptions
-
  - **Case**: Single standalone checkbox (e.g. 'I agree to terms')
  - **Allowed When**: A plain <label> + <input type=checkbox> is sufficient; fieldset/legend not required.
