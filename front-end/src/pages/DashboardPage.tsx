import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { LogOut, User, Mail, Phone, Calendar } from 'lucide-react'

export function DashboardPage() {
    const { user, logout, isLoading } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Loading...</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, {user.fullName}</p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="flex items-center gap-2"
                    >
                        <LogOut className="h-4 w-4" />
                        {isLoading ? 'Signing out...' : 'Sign Out'}
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Profile Information
                            </CardTitle>
                            <CardDescription>
                                Your account details and information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Full Name</p>
                                    <p className="text-sm text-muted-foreground">{user.fullName}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>

                            {user.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Phone</p>
                                        <p className="text-sm text-muted-foreground">{user.phone}</p>
                                    </div>
                                </div>
                            )}

                            {user.age && (
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Age</p>
                                        <p className="text-sm text-muted-foreground">{user.age} years old</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to Your Dashboard</CardTitle>
                            <CardDescription>
                                This is your personal dashboard where you can manage your account and access features.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    You're successfully authenticated and can now access all the features of the application.
                                </p>
                                <div className="flex gap-2">
                                    <Button size="sm">Get Started</Button>
                                    <Button variant="outline" size="sm">Learn More</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Common tasks and shortcuts
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Button variant="ghost" className="w-full justify-start">
                                    View Profile Settings
                                </Button>
                                <Button variant="ghost" className="w-full justify-start">
                                    Update Account Info
                                </Button>
                                <Button variant="ghost" className="w-full justify-start">
                                    Security Settings
                                </Button>
                                <Button variant="ghost" className="w-full justify-start">
                                    Help & Support
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Application Features</CardTitle>
                            <CardDescription>
                                This template provides a solid foundation for your SaaS application
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <div className="p-4 border border-border rounded-lg">
                                    <h3 className="font-semibold mb-2">Authentication</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Complete login/signup system with form validation and error handling
                                    </p>
                                </div>

                                <div className="p-4 border border-border rounded-lg">
                                    <h3 className="font-semibold mb-2">Protected Routes</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Automatic redirection and session management for secure areas
                                    </p>
                                </div>

                                <div className="p-4 border border-border rounded-lg">
                                    <h3 className="font-semibold mb-2">Responsive Design</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Mobile-first design that works perfectly on all devices
                                    </p>
                                </div>

                                <div className="p-4 border border-border rounded-lg">
                                    <h3 className="font-semibold mb-2">Modern UI</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Beautiful components built with shadcn/ui and Tailwind CSS
                                    </p>
                                </div>

                                <div className="p-4 border border-border rounded-lg">
                                    <h3 className="font-semibold mb-2">Type Safety</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Full TypeScript support with tRPC for end-to-end type safety
                                    </p>
                                </div>

                                <div className="p-4 border border-border rounded-lg">
                                    <h3 className="font-semibold mb-2">Production Ready</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Optimized build process and deployment-ready configuration
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}