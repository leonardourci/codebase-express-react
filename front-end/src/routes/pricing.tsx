import { PricingCard } from '@/components/pricing/PricingCard'
import { Header } from '@/components/layout/Header'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { trpc } from '@/lib/trpc'
import type { IProduct } from '@/types/product'

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

export function PricingView({ products }: { products: PricingPlan[] }) {
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
                            features={p.features}
                            popular
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}

export function PricingRoute() {
    const { data: products, isLoading, error } = trpc.product.getAll.useQuery()

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <LoadingSpinner />
                </main>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-destructive mb-2">Failed to load pricing</h2>
                        <p className="text-muted-foreground">Please try again later</p>
                    </div>
                </main>
            </div>
        )
    }

    const transformedProducts = products?.map(transformProduct) || []

    return <PricingView products={transformedProducts} />
}
