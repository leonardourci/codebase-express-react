# Yearly and Monthly Subscription Plans Design

**Date:** 2026-02-04
**Status:** Approved

## Overview

Add support for both yearly and monthly billing periods to the subscription system. Users can toggle between viewing yearly and monthly plans, with yearly plans offering a "2 months free" discount (16.67% off).

## Requirements

- Frontend toggle switch to display yearly or monthly plans (yearly as default)
- 6 total pricing plans: Free, Pro Monthly, Pro Yearly, Enterprise Monthly, Enterprise Yearly
- Free tier visible in both yearly and monthly views
- Yearly plans offer 2 months free (16.67% discount)
- Backend automatically handles date calculations based on Stripe subscription intervals
- No database schema changes required

## Design Decisions

### 1. Data Structure & Pricing Config

**Shared Types (`shared/types/pricing.types.ts`)**

Add billing period enum:
```typescript
export enum BillingPeriod {
  MONTHLY = "monthly",
  YEARLY = "yearly",
}
```

Update pricing plan interface:
```typescript
export interface IPricingPlan {
  name: string;
  description: string;
  priceInCents: number;
  billingPeriod: BillingPeriod; // NEW FIELD
  externalProductId: string | null;
  externalPriceId: string | null;
  active: boolean;
  isFreeTier: boolean;
  maxProjects: number | null;
  features: string[];
}
```

**Pricing Config (`shared/config/pricing.config.ts`)**

Expand to 6 plans:

| Plan | Billing Period | Monthly Price | Yearly Price | Annual Savings |
|------|---------------|---------------|--------------|----------------|
| Free | monthly | $0 | N/A | N/A |
| Pro | monthly | $49.99/mo | N/A | N/A |
| Pro | yearly | N/A | $499.90/year ($41.66/mo) | $99.90 (2 months) |
| Enterprise | monthly | $99.99/mo | N/A | N/A |
| Enterprise | yearly | N/A | $999.90/year ($83.33/mo) | $199.90 (2 months) |

Each plan needs its own Stripe Price ID:
- Free tier: `externalPriceId: null`
- Pro Monthly: New Stripe Price ID (recurring: monthly)
- Pro Yearly: New Stripe Price ID (recurring: yearly)
- Enterprise Monthly: New Stripe Price ID (recurring: monthly)
- Enterprise Yearly: New Stripe Price ID (recurring: yearly)

**Free Tier Handling:**
- Set `billingPeriod: BillingPeriod.MONTHLY`
- Special-case in filter logic to show in both views

### 2. Frontend Implementation

**Toggle Component (`front-end/src/routes/pricing.tsx`)**

Add billing period toggle:
```typescript
const [selectedPeriod, setSelectedPeriod] = useState<BillingPeriod>(BillingPeriod.YEARLY)

const displayedPlans = PRICING_PLANS.filter(plan =>
  plan.isFreeTier || plan.billingPeriod === selectedPeriod
)
```

**UI Design:**
- Segmented control or switch component above pricing grid
- Labels: "Billed Monthly" | "Billed Yearly"
- Badge on yearly option: "Save 17%" or "2 months free"
- Yearly selected by default
- Centered above pricing cards

**Price Display Updates (`SubscriptionPricingGrid.tsx`)**

Current implementation shows:
```tsx
<span className="text-muted-foreground ml-1 text-lg">/mo</span>
```

Update to show:
- Monthly plans: "$49 /mo"
- Yearly plans: "$499 /year" with subtext "($41.66/mo)"

**Component Props:**
- `SubscriptionPricingGrid` receives filtered plans
- No changes to core grid logic
- Current plan matching via `externalPriceId` still works

### 3. Backend Verification

**No Code Changes Required**

The existing billing service already handles subscription dates correctly:

**How It Works:**
1. Stripe manages billing intervals (monthly/yearly)
2. When user subscribes to a yearly price, Stripe sets `current_period_end` to 1 year out
3. Webhook handlers already update `expires_at` from `current_period_end`
4. No explicit billing_period tracking needed in database

**Existing Webhook Handlers:**
- `customer.subscription.updated` → updates `expires_at` with `current_period_end`
- `invoice.payment_succeeded` → updates `expires_at` with subscription end date
- `customer.subscription.deleted` → sets `expires_at` to now

These handlers receive dates from Stripe, which automatically calculates the correct period end based on the price's interval.

**What to Verify:**

Manual testing in Stripe test mode:
1. Subscribe to monthly plan → verify `expires_at` is ~30 days from now
2. Subscribe to yearly plan → verify `expires_at` is ~365 days from now
3. Trigger renewal webhook → verify `expires_at` extends by correct period
4. Check `billings` table data matches Stripe dashboard

### 4. Stripe Setup

**Required Actions:**

Create 4 new Price objects in Stripe Dashboard:

1. **Pro Monthly**
   - Product: Same as current Pro product
   - Recurring: Monthly
   - Amount: $49.99 USD

2. **Pro Yearly**
   - Product: Same as current Pro product
   - Recurring: Yearly
   - Amount: $499.90 USD

3. **Enterprise Monthly**
   - Product: Same as current Enterprise product
   - Recurring: Monthly
   - Amount: $99.99 USD

4. **Enterprise Yearly**
   - Product: Same as current Enterprise product
   - Recurring: Yearly
   - Amount: $999.90 USD

After creating prices, update `pricing.config.ts` with the real Price IDs.

## Implementation Order

1. **Shared Layer**
   - Add `BillingPeriod` enum to `shared/types/pricing.types.ts`
   - Update `IPricingPlan` interface
   - Expand `pricing.config.ts` to 6 plans (use placeholder IDs initially)
   - Update validation function to handle new structure

2. **Stripe Configuration**
   - Create 4 new Price objects in Stripe Dashboard (test mode first)
   - Update `pricing.config.ts` with real test mode Price IDs
   - Later: repeat for production mode

3. **Frontend Development**
   - Add billing period toggle component to `pricing.tsx`
   - Implement filter logic for displayed plans
   - Update `SubscriptionPricingGrid` to show yearly prices correctly
   - Add "Save X%" badge or messaging
   - Test toggle interaction and plan filtering

4. **Backend Verification**
   - Test checkout flow with monthly plan (Stripe test card)
   - Test checkout flow with yearly plan
   - Verify `expires_at` dates in database
   - Use Stripe CLI to trigger test webhooks
   - Verify renewal date calculations

5. **Production Deployment**
   - Create production Stripe prices
   - Update production `pricing.config.ts`
   - Deploy changes
   - Monitor first subscriptions

## Testing Strategy

**Manual Testing:**
- Use Stripe test card: `4242 4242 4242 4242`
- Create monthly subscription → check `expires_at` in database (~30 days)
- Create yearly subscription → check `expires_at` in database (~365 days)
- Toggle between yearly/monthly views → verify correct plans display
- Verify Free tier shows in both views
- Check "Current Plan" badge works for both periods

**Webhook Testing:**
- Use Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Trigger subscription renewal events
- Verify `expires_at` updates correctly
- Test both monthly and yearly renewals

**Edge Cases:**
- User switches from monthly to yearly (handled by Stripe)
- User switches from yearly to monthly (handled by Stripe)
- Subscription cancelation (existing logic works)
- Payment failure (existing logic works)

## Migration Strategy

**Existing Users:**
- No migration needed
- Current subscriptions continue unchanged
- Users can switch billing period on next renewal if desired
- No database changes required

**New Users:**
- See both monthly and yearly options
- Can choose preferred billing period at signup

## Success Criteria

- Toggle switch works smoothly between yearly/monthly views
- Free tier visible in both views
- Prices calculate correctly (yearly = monthly * 10)
- Stripe checkout creates correct subscription interval
- Database `expires_at` dates are accurate for both periods
- Webhook handlers update dates correctly
- Current plan indicator works for both billing periods

## Non-Goals

- Proration logic for mid-period switches (handled by Stripe)
- Custom billing periods (quarterly, bi-annually)
- Per-tier discount variations
- Database schema changes
