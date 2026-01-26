import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

interface PricingCardProps {
    name: string
    description: string
    price: number
    currency: string
    features: string[]
    popular?: boolean
}

export function PricingCard({ name, description, price, currency, features, popular }: PricingCardProps) {
    const pricingCardVariants = cva(
        "w-full max-w-sm flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-xl",
        {
            variants: {
                popular: {
                    true: "border-primary shadow-lg scale-105",
                    false: "border-border shadow-md",
                },
            },
            defaultVariants: {
                popular: false,
            },
        }
    )
    return (
        <div data-slot="pricing-card">
            <Card className={cn(pricingCardVariants({ popular: !!popular }))}>
                {popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                        POPULAR
                    </div>
                )}
                <CardHeader className="text-center pb-8 pt-6">
                    <CardTitle className="text-xl font-bold">{name}</CardTitle>
                    <CardDescription className="text-sm mt-2">{description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col items-center">
                    <div className="flex items-baseline justify-center mb-8">
                        <span className="text-3xl font-bold">{currency === 'USD' ? '$' : currency}</span>
                        <span className="text-5xl font-extrabold tracking-tight">{price}</span>
                        <span className="text-muted-foreground ml-1">/mo</span>
                    </div>
                    <ul className="space-y-3 w-full text-left">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-muted-foreground">
                                <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter className="pt-8 pb-6">
                    <Button className={cn("w-full transition-all duration-300", popular ? "bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg" : "bg-secondary text-secondary-foreground hover:bg-secondary/80")}>
                        Get Started
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
