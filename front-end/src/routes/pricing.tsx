import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../../back-end/src/trpc/router'
import { PricingCard } from '@/components/pricing/PricingCard'
import { Header } from '@/components/layout/Header'
import { useLoaderData } from 'react-router-dom'

export async function pricingLoader() {
    const client = createTRPCProxyClient<AppRouter>({
        links: [
            httpBatchLink({
                url: import.meta.env.VITE_API_BASE,
                maxURLLength: 2083,
            }),
        ],
    })
    const raw = await client.product.getAll.query()
    const products = raw.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: typeof p.price === 'number' ? p.price : (p.priceInCents ? Math.round(p.priceInCents) / 100 : 0),
        currency: p.currency || 'USD',
        features: Array.isArray(p.features) ? p.features : [],
    }))
    return { products }
}

export function PricingView({ products }: { products: Array<{ id: string; name: string; description: string; price: number; currency: string; features?: string[] }> }) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center py-20 px-4">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Choose the plan that's right for you. No hidden fees.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 w-full max-w-sm">
                    {products.map((p) => (
                        <PricingCard
                            key={p.id}
                            name={p.name}
                            description={p.description}
                            price={p.price}
                            currency={p.currency}
                            features={p.features || []}
                            popular
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}

export function PricingRoute() {
    const { products } = useLoaderData() as { products: Array<{ id: string; name: string; description: string; price: number; currency: string; features?: string[] }> }
    return <PricingView products={products} />
}
