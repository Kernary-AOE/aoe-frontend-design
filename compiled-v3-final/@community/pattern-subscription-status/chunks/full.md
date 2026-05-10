# SubscriptionStatus [pattern] v1.0.0
A settings-page card summarizing the user's current plan, billing cycle, next charge date, payment method on file, and seat usage, with primary actions (Upgrade, Manage seats, Update payment) and a secondary Cancel link.
domain: frontend-design

## Facts

## Label
Subscription Status Card

## Problem
Subscription state is scattered across invoices, payment settings, and plan pages. Users need a single card that answers: what plan am I on, when am I next charged, how do I change it?

## Solution
A bordered card on the Billing settings page showing plan name + status badge, period end date, payment method last-4, seat usage progress, and a row of action buttons. A subtle danger link at the bottom for cancellation.

## Structure
```
    <article class="sub-card" aria-labelledby="sc-title">
      <header>
        <h2 id="sc-title">
          Pro plan
          <span class="badge ok" aria-label="Active subscription">Active</span>
        </h2>
        <p class="meta">
          Billed annually - $230/user/year
        </p>
      </header>

      <dl class="facts">
        <div>
          <dt>Next invoice</dt>
          <dd><time datetime="2027-04-12">April 12, 2027</time> - $1,610.00</dd>
        </div>
        <div>
          <dt>Payment method</dt>
          <dd>
            <svg aria-hidden="true"><!-- visa --></svg>
            Visa ending 4242
            <button class="link">Change</button>
          </dd>
        </div>
        <div>
          <dt>Seats</dt>
          <dd>
            <span>5 of 7 used</span>
            <progress value="5" max="7" aria-label="5 of 7 seats used">5/7</progress>
          </dd>
        </div>
      </dl>

      <footer class="actions">
        <a href="/billing/upgrade" class="primary">Upgrade plan</a>
        <a href="/billing/seats">Manage seats</a>
        <a href="/billing/invoices">View invoices</a>
      </footer>

      <div class="danger-zone">
        <button class="link danger">Cancel subscription</button>
      </div>
    </article>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Status badge mirrors backend state: Active (green), Trialing (blue), Past due (amber), Canceled (gray), Paused (gray).
- Past-due state surfaces a banner inside the card: 'Payment failed Apr 12. Update card to avoid suspension.' with an Update button.
- Trialing state shows days remaining ('Trial ends in 6 days') with a 'Pick a plan' CTA.
- Cancel action opens a confirm modal that explains end-of-period access (not immediate cutoff) and offers a downgrade alternative.
- Seat usage progress shows red when at 100% and offers an 'Add seats' shortcut.
- All dates render as both human format ('April 12, 2027') and `<time datetime>` for machine readability.

## A11y
- Status badge needs `aria-label` like 'Active subscription' so screen readers do not just hear 'Active' out of context.
- Use `<dl>` for the fact list (Next invoice / Payment method / Seats) so screen readers pair labels with values.
- Seat usage uses `<progress>` with `aria-label='5 of 7 seats used'`.
- Cancel button is a real `<button>` with destructive styling AND a verb-specific label — never just an X icon.
- Date values use `<time datetime>` for screen readers and machine parsers.

## Examples
- @community/example-stripe-billing-card
- @community/example-vercel-team-billing
- @community/example-linear-workspace-billing

## Label
Subscription Status Card

## Problem
Subscription state is scattered across invoices, payment settings, and plan pages. Users need a single card that answers: what plan am I on, when am I next charged, how do I change it?

## Solution
A bordered card on the Billing settings page showing plan name + status badge, period end date, payment method last-4, seat usage progress, and a row of action buttons. A subtle danger link at the bottom for cancellation.

## Structure
```
    <article class="sub-card" aria-labelledby="sc-title">
      <header>
        <h2 id="sc-title">
          Pro plan
          <span class="badge ok" aria-label="Active subscription">Active</span>
        </h2>
        <p class="meta">
          Billed annually - $230/user/year
        </p>
      </header>

      <dl class="facts">
        <div>
          <dt>Next invoice</dt>
          <dd><time datetime="2027-04-12">April 12, 2027</time> - $1,610.00</dd>
        </div>
        <div>
          <dt>Payment method</dt>
          <dd>
            <svg aria-hidden="true"><!-- visa --></svg>
            Visa ending 4242
            <button class="link">Change</button>
          </dd>
        </div>
        <div>
          <dt>Seats</dt>
          <dd>
            <span>5 of 7 used</span>
            <progress value="5" max="7" aria-label="5 of 7 seats used">5/7</progress>
          </dd>
        </div>
      </dl>

      <footer class="actions">
        <a href="/billing/upgrade" class="primary">Upgrade plan</a>
        <a href="/billing/seats">Manage seats</a>
        <a href="/billing/invoices">View invoices</a>
      </footer>

      <div class="danger-zone">
        <button class="link danger">Cancel subscription</button>
      </div>
    </article>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Status badge mirrors backend state: Active (green), Trialing (blue), Past due (amber), Canceled (gray), Paused (gray).
- Past-due state surfaces a banner inside the card: 'Payment failed Apr 12. Update card to avoid suspension.' with an Update button.
- Trialing state shows days remaining ('Trial ends in 6 days') with a 'Pick a plan' CTA.
- Cancel action opens a confirm modal that explains end-of-period access (not immediate cutoff) and offers a downgrade alternative.
- Seat usage progress shows red when at 100% and offers an 'Add seats' shortcut.
- All dates render as both human format ('April 12, 2027') and `<time datetime>` for machine readability.

## A11y
- Status badge needs `aria-label` like 'Active subscription' so screen readers do not just hear 'Active' out of context.
- Use `<dl>` for the fact list (Next invoice / Payment method / Seats) so screen readers pair labels with values.
- Seat usage uses `<progress>` with `aria-label='5 of 7 seats used'`.
- Cancel button is a real `<button>` with destructive styling AND a verb-specific label — never just an X icon.
- Date values use `<time datetime>` for screen readers and machine parsers.

## Compatible
- @community/pattern-pricing-tiers-toggle
- @community/pattern-modal-confirm
- @community/pattern-toast-stack
