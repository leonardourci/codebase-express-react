import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProfilePage } from './pages/ProfilePage'
import { ProtectedRoute } from './components/routes/ProtectedRoute'
import { PublicRoute } from './components/routes/PublicRoute'
import { LoadingSpinner } from './components/ui/loading-spinner'
import { useAuth } from './hooks/useAuth'
import { PricingRoute } from './routes/pricing'

function App() {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return <LoadingSpinner size="lg" text="Loading application..." fullScreen />
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <PublicRoute>
                    <LandingPage />
                </PublicRoute>
            ),
        },
        {
            path: "/pricing",
            element: (
                <PublicRoute>
                    <PricingRoute />
                </PublicRoute>
            ),
        },
        {
            path: "/login",
            element: (
                <PublicRoute>
                    <LoginPage />
                </PublicRoute>
            ),
        },
        {
            path: "/signup",
            element: (
                <PublicRoute>
                    <SignupPage />
                </PublicRoute>
            ),
        },
        {
            path: "/dashboard",
            element: (
                <ProtectedRoute>
                    <DashboardPage />
                </ProtectedRoute>
            ),
        },
        {
            path: "/profile",
            element: (
                <ProtectedRoute>
                    <ProfilePage />
                </ProtectedRoute>
            ),
        },
        {
            path: "*",
            element: <Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />,
        },
    ])

    return <RouterProvider router={router} />
}

export default App
