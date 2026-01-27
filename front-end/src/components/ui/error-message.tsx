import { cn } from '@/lib/utils'

interface ErrorMessageProps {
    message?: string | null
    className?: string
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
    if (!message) return null

    return (
        <div className={cn(
            'p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg',
            className
        )}>
            {message}
        </div>
    )
}
