import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { hasRefreshToken, hasValidAccessToken } from '@/utils/auth'

interface ProtectedRouteProps {
    children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, refreshTokens } = useAuth()
    const location = useLocation()
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        const attemptTokenRefresh = async () => {
            const hasValidAccess = hasValidAccessToken()
            const hasRefresh = hasRefreshToken()

            if (!hasValidAccess && hasRefresh && !isAuthenticated && !isLoading) {
                setIsRefreshing(true)
                try {
                    await refreshTokens()
                } catch (error) {
                    // Refresh failed - refresh token might be expired or invalid
                    // User will be redirected to login
                    console.warn('Token refresh failed:', error)
                } finally {
                    setIsRefreshing(false)
                }
            }
        }

        attemptTokenRefresh()
    }, [isAuthenticated, isLoading, refreshTokens])

    if (isLoading || isRefreshing) {
        return (
            <LoadingSpinner
                size="lg"
                text={isRefreshing ? "Refreshing session..." : "Loading..."}
                fullScreen
            />
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <>{children}</>
}