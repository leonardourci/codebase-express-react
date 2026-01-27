import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

interface AuthDividerProps extends ComponentProps<'div'> {}

export function AuthDivider({ className, ref, ...props }: AuthDividerProps) {
    return (
        <div
            ref={ref}
            className={cn('relative my-4', className)}
            data-slot="auth-divider"
            {...props}
        >
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
            </div> 

            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                    or
                </span>
            </div>
        </div>
    )
}