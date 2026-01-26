export const PRICING_PLANS = [
    {
        id: 'basic',
        name: 'Basic',
        description: 'Perfect for getting started',
        price: 9.99,
        currency: 'USD',
        features: [
            'Up to 5 projects',
            'Basic analytics',
            'Email support',
            'Community access'
        ]
    },
    {
        id: 'pro',
        name: 'Pro',
        description: 'Everything you need to grow your business',
        price: 29.99,
        currency: 'USD',
        features: [
            'Unlimited projects',
            'Advanced analytics',
            'Priority support',
            'Custom domain',
            'API access'
        ]
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'For large teams and organizations',
        price: 99.99,
        currency: 'USD',
        features: [
            'Everything in Pro',
            'SSO integration',
            'Dedicated support',
            'Custom integrations',
            'SLA guarantee'
        ]
    }
] as const

export type PricingPlan = typeof PRICING_PLANS[number]