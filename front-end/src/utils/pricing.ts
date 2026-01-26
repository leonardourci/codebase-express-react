import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../../back-end/src/trpc/router'

export type PricingProduct = {
    id: string
    name: string
    description: string
    price: number
    currency: string
    features: string[]
}

export function transformProduct(p: any): PricingProduct {
    return {
        id: p.id,
        name: p.name,
        description: p.description,
        price: typeof p.price === 'number' ? p.price : (p.priceInCents ? Math.round(p.priceInCents) / 100 : 0),
        currency: p.currency || 'USD',
        features: Array.isArray(p.features) ? p.features : [],
    }
}

export async function fetchPricingProducts(apiBase?: string): Promise<PricingProduct[]> {
    const client = createTRPCProxyClient<AppRouter>({
        links: [
            httpBatchLink({
                url: apiBase || import.meta.env.VITE_API_BASE || 'http://localhost:3000/trpc',
                maxURLLength: 2083,
            }),
        ],
    })

    const raw = await client.product.getAll.query()
    return raw.map(transformProduct)
}

export const MOCK_PRICING_PRODUCTS: PricingProduct[] = [
    {
        id: 'prod_mock_1',
        name: 'Pro Plan',
        description: 'Everything you need to grow your business.',
        price: 29.99,
        currency: 'USD',
        features: ['Unlimited Projects', 'Analytics Dashboard', 'Priority Support', 'Custom Domain'],
    },
]