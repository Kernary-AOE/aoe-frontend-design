# ShadcnPricingToggle [template] v1.0.0
Monthly/yearly billing toggle from shadboard full-kit: a single discountRate state (0 = monthly, 0.15 = yearly) toggled by a shadcn/ui Switch, passed as prop to PricingPlans which threads it to each card's RenderPrice component via getDiscountedPrice(price, discountRate, true). Featured card gets border-primary and absolute-positioned Badge at -top-2.5.
domain: frontend-design
