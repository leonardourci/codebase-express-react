import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../../back-end/src/trpc/router'
import type { IProduct } from '@/types/product'
import { globalConfig } from '@/utils/global-config'

export interface PricingPlan {
    id: string
    name: string
    description: string
    price: number
    currency: string
    features: string[]
}

export function transformProduct(p: IProduct): PricingPlan {
    return {
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.priceInCents / 100, // Convert cents to dollars
        currency: p.currency || 'USD',
        features: [], // Products don't have features in backend, could be added later
    }
}

export async function fetchPricingProducts(apiBase?: string): Promise<PricingPlan[]> {
    const client = createTRPCProxyClient<AppRouter>({
        links: [
            httpBatchLink({
                url: apiBase || globalConfig.apiBase,
                maxURLLength: 2083,
            }),
        ],
    })

    const raw = await client.product.getAll.query()
    return raw.map(transformProduct)
}

export const MOCK_PRICING_PRODUCTS: PricingPlan[] = [
    {
        id: 'prod_mock_1',
        name: 'Pro Plan',
        description: 'Everything you need to grow your business.',
        price: 29.99,
        currency: 'USD',
        features: ['Unlimited Projects', 'Analytics Dashboard', 'Priority Support', 'Custom Domain'],
    },
]