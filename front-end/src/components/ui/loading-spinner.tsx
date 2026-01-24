import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
    text?: string
    fullScreen?: boolean
}

const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
}

export function LoadingSpinner({
    size = 'md',
    className,
    text,
    fullScreen = false
}: LoadingSpinnerProps) {
    const spinner = (
        <div className={cn("flex items-center justify-center", fullScreen && "min-h-screen bg-background")}>
            <div className="text-center space-y-4">
                <Loader2 className={cn(
                    "animate-spin mx-auto text-primary",
                    sizeClasses[size],
                    className
                )} />
                {text && (
                    <p className="text-muted-foreground text-sm">{text}</p>
                )}
            </div>
        </div>
    )

    return spinner
}