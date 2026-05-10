# ShadcnPricingToggle [template] v1.0.0
Monthly/yearly billing toggle from shadboard full-kit: a single discountRate state (0 = monthly, 0.15 = yearly) toggled by a shadcn/ui Switch, passed as prop to PricingPlans which threads it to each card's RenderPrice component via getDiscountedPrice(price, discountRate, true). Featured card gets border-primary and absolute-positioned Badge at -top-2.5.
domain: frontend-design

## Language
tsx

## Body
```
    "use client"
    import { useState } from "react"
    import { Label } from "@/components/ui/label"
    import { Switch } from "@/components/ui/switch"
    import { PricingPlans } from "@/components/pricing-plans"

    const DISCOUNT_RATE = 0.15  // 15% annual discount

    export function Pricing({ data }: { data: PricingPlansType[] }) {
      const [discountRate, setDiscountRate] = useState(0)
      const hasDiscount = discountRate !== 0
      const toggleDiscount = () => setDiscountRate(hasDiscount ? 0 : DISCOUNT_RATE)

      return (
        <>
          {/* Switch must have id matching Label's htmlFor */}
          <Label htmlFor="annual-billing" className="flex items-center justify-center gap-2">
            <span>Monthly</span>
            <Switch id="annual-billing" checked={hasDiscount} onCheckedChange={toggleDiscount} />
            <span>Yearly (Save {ratingToPercentage(DISCOUNT_RATE, 1)})</span>
          </Label>
          <PricingPlans data={data} discountRate={discountRate} />
        </>
      )
    }

    // RenderPrice — applies discount before formatting
    function RenderPrice({ price, period, discountRate }) {
      if (!price) return null
      // getDiscountedPrice(price, rate, round=true) rounds to 2 decimals — prevents float artifacts
      const finalPrice = discountRate ? getDiscountedPrice(price, discountRate, true) : price
      return (
        <div className="flex justify-center items-baseline mb-8 mt-2">
          <span className="text-4xl font-black">{formatCurrency(finalPrice)}</span>
          {period && <span className="text-muted-foreground">/{period}</span>}
        </div>
      )
    }

    // Card — featured gets border-primary + absolute Badge at -top-2.5
    function PricingPlansCard({ title, description, price, period, discountRate,
                                features, isFeatured, isCurrentPlan, href, buttonOptions, buttonContent }) {
      const router = useRouter()
      return (
        <Card className={cn("relative h-full flex flex-col", isFeatured && "border-primary")} asChild>
          <li>
            {isFeatured && <Badge className="absolute -top-2.5 start-3 w-fit">Featured</Badge>}
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <RenderPrice price={price} period={period} discountRate={discountRate} />
              <ul className="space-y-2">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-x-3">
                    <Check className="size-4 text-success" /><span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button size="lg" className="w-full" disabled={isCurrentPlan}
                      onClick={() => router.push(href)} {...buttonOptions}>
                {buttonContent || (isCurrentPlan ? "Your Current Plan" : "Upgrade")}
              </Button>
            </CardFooter>
          </li>
        </Card>
      )
    }

    // Grid — 3-column on md+
    export function PricingPlans({ data, discountRate, className }) {
      return (
        <ul className={cn("grid gap-4 md:grid-cols-3", className)}>
          {data.map(item => <PricingPlansCard key={item.title} discountRate={discountRate} {...item} />)}
        </ul>
      )
    }
  
```

## Usage Notes
- period label stays 'month' in both modes — the template shows discounted monthly equivalent in yearly mode, not annual total. Decide your convention upfront.
- getDiscountedPrice(price, rate, true) — third arg round=true is critical; false gives float artifacts like $25.4915.
- Card asChild + <li> — the wrapping <ul> in PricingPlans makes this semantically correct. Don't break with a wrapper <div>.
- start-3 (not left-3) on Badge — Tailwind v4 logical property for RTL support. Ensure your config enables it.
- isCurrentPlan must come from real subscription data — never hardcode it.

## Gotchas
- Switch id must match Label htmlFor for correct a11y association — don't omit.
- To animate price change: wrap price span in AnimatePresence + motion.span with key={discountRate} for remount.
- To persist toggle in URL: use URLSearchParams + router.replace on toggle; restore from searchParams on mount.
