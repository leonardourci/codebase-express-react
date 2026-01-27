import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { cn } from '@/lib/utils'
import { trpc } from '@/lib/trpc'
import { getAccessToken } from '@/utils/auth'
import {
    Home,
    User,
    CreditCard,
    X
} from 'lucide-react'

interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
    className?: string
}

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Profile', href: '/profile', icon: User },
]

export function Sidebar({ isOpen = true, onClose, className }: SidebarProps) {
    const location = useLocation()
    const [isLoadingPortal, setIsLoadingPortal] = useState(false)
    const [portalError, setPortalError] = useState<string | null>(null)

    const createPortalSession = trpc.billing.createCustomerPortalSession.useMutation()

    const handleManageSubscription = async () => {
        setIsLoadingPortal(true)
        setPortalError(null)

        try {
            const token = getAccessToken()
            if (!token) {
                setPortalError('Authentication required')
                setIsLoadingPortal(false)
                return
            }

            const result = await createPortalSession.mutateAsync({
                token,
                returnUrl: `${window.location.origin}/dashboard`
            })

            if (result.url) {
                // Close sidebar on mobile before redirect
                onClose?.()
                // Redirect to Stripe Customer Portal
                window.location.href = result.url
            }
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to access billing portal'
            setPortalError(errorMessage)
            setIsLoadingPortal(false)
        }
    }

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-full w-64 bg-background/95 backdrop-blur-md border-r border-border/50 shadow-xl transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    className
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b border-border/50 lg:hidden">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
                                <span className="text-primary-foreground font-bold text-sm">A</span>
                            </div>
                            <span className="font-semibold text-lg">App Name</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            aria-label="Close sidebar"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href
                            const Icon = item.icon

                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={onClose}
                                    className={cn(
                                        "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-md"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </Link>
                            )
                        })}

                        <div className="pt-2 mt-2 border-t border-border/50">
                            <Button
                                onClick={handleManageSubscription}
                                disabled={isLoadingPortal}
                                variant="ghost"
                                className="w-full justify-start px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            >
                                {isLoadingPortal ? (
                                    <>
                                        <LoadingSpinner size="sm" className="mr-3" />
                                        <span>Loading...</span>
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="h-5 w-5 mr-3" />
                                        <span>Manage Subscription</span>
                                    </>
                                )}
                            </Button>
                            {portalError && (
                                <p className="text-xs text-destructive px-4 mt-1">
                                    {portalError}
                                </p>
                            )}
                        </div>
                    </nav>

                    <div className="p-4 border-t border-border/50">
                        <div className="text-xs text-muted-foreground">
                            © 2024 App Name
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
