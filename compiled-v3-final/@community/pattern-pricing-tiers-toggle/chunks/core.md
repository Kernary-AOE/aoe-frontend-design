# PricingTiersToggle [pattern] v1.0.0
A 3-column pricing layout (typically Free / Pro / Team) with a monthly/annual billing toggle that updates all prices simultaneously, an emphasized recommended tier, and a feature checklist per column.
domain: frontend-design

## Facts

## Label
Pricing Tiers with Billing Toggle

## Problem
Users comparing plans need to weigh price, feature set, and billing frequency in one view. Separate pages per plan or per billing cadence force back-and-forth and hurt conversion.

## Solution
Three side-by-side cards on desktop (stack on mobile). Top toggle switches all prices between monthly and annual (with savings callout). Middle tier has an accent border and 'Most popular' badge. Each card lists 5-8 included features with check icons.

## Structure
```
    <section aria-labelledby="pricing-title">
      <header>
        <h1 id="pricing-title">Plans for every team</h1>
        <div class="billing-toggle" role="radiogroup" aria-label="Billing cadence">
          <label>
            <input type="radio" name="cadence" value="monthly" checked />
            <span>Monthly</span>
          </label>
          <label>
            <input type="radio" name="cadence" value="annual" />
            <span>Annual <em class="save">save 20%</em></span>
          </label>
        </div>
      </header>

      <div class="tiers" role="list">
        <article role="listitem" class="tier">
          <h2>Starter</h2>
          <p class="price"><span class="amount">$0</span> / month</p>
          <a href="/signup" class="cta">Get started</a>
          <ul role="list">
            <li><svg aria-hidden="true"></svg> Up to 5 projects</li>
            <li><svg aria-hidden="true"></svg> Community support</li>
          </ul>
        </article>

        <article role="listitem" class="tier featured" aria-label="Pro plan, most popular">
          <span class="badge">Most popular</span>
          <h2>Pro</h2>
          <p class="price"><span class="amount">$24</span> / user / month</p>
          <a href="/signup?plan=pro" class="cta primary">Start free trial</a>
          <ul role="list">
            <li><svg aria-hidden="true"></svg> Unlimited projects</li>
            <li><svg aria-hidden="true"></svg> Priority email support</li>
          </ul>
        </article>

        <article role="listitem" class="tier">
          <h2>Team</h2>
          <p class="price"><span class="amount">$48</span> / user / month</p>
          <a href="/contact" class="cta">Contact sales</a>
        </article>
      </div>
    </section>
  
```

## Uses
- @community/method-heuristic-review

## Behavior
- Billing toggle updates all prices in place; animate the digit change with crossfade (140ms) — skip when reduced-motion.
- Annual prices show as monthly equivalent (e.g., $19/month, billed annually) plus a 'save 20%' badge.
- Featured tier has a contrasting border and 'Most popular' badge; its CTA uses the primary button style.
- Tier card height equalizes via grid to keep CTAs aligned across columns.
- On mobile, stack tiers; place the featured tier first so it appears above the fold.
- Each feature row uses a check icon + plain text — never a yes/no matrix as the only differentiator.

## A11y
- Billing toggle is a `role='radiogroup'` with two radios — not two buttons — so keyboard users can use Arrow keys.
- Featured tier has an `aria-label` like 'Pro plan, most popular' so the badge content is conveyed.
- Price changes from the toggle should update an `aria-live='polite'` summary like 'Annual billing, save 20%'.
- Feature check icons must be `aria-hidden='true'`; the feature text alone conveys inclusion.
- CTAs are real `<a>` elements with verb labels (Start free trial, Contact sales) — not 'Click here'.
