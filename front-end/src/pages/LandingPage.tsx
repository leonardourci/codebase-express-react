import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Shield, Zap, Smartphone, Code, Users, Star } from 'lucide-react'

export function LandingPage() {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                            <Code className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold">Frontend Foundation</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="ghost">Sign In</Button>
                        </Link>
                        <Link to="/signup">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <section className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Production-Ready
                        <span className="text-primary"> SaaS Template</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        A complete, functional React template with authentication, protected routes,
                        and beautiful UI components. Deploy immediately and customize with your content.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup">
                            <Button size="lg" className="flex items-center gap-2">
                                Start Building
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" size="lg">
                                View Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Built with modern technologies and best practices for rapid SaaS development
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <Shield className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>Complete Authentication</CardTitle>
                            <CardDescription>
                                Full login/signup system with form validation, error handling, and secure token management
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Zap className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>Protected Routes</CardTitle>
                            <CardDescription>
                                Automatic redirection, session management, and secure access control for authenticated areas
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Smartphone className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>Mobile-First Design</CardTitle>
                            <CardDescription>
                                Responsive design that works perfectly on all devices with Tailwind CSS and modern patterns
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Code className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>Type-Safe API</CardTitle>
                            <CardDescription>
                                End-to-end type safety with tRPC, automatic API client generation, and React Query integration
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Users className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>Modern UI Components</CardTitle>
                            <CardDescription>
                                Beautiful, accessible components built with shadcn/ui, Radix UI primitives, and React 19
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Star className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>Production Ready</CardTitle>
                            <CardDescription>
                                Optimized build process, ESLint configuration, and deployment-ready setup for immediate use
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16 bg-muted/30">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Built With Modern Tech</h2>
                    <p className="text-muted-foreground">
                        Leveraging the best tools and frameworks for optimal developer experience
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
                    <div className="text-center p-4">
                        <div className="font-semibold">React 19</div>
                        <div className="text-sm text-muted-foreground">Latest React with modern patterns</div>
                    </div>
                    <div className="text-center p-4">
                        <div className="font-semibold">TypeScript</div>
                        <div className="text-sm text-muted-foreground">Full type safety and IntelliSense</div>
                    </div>
                    <div className="text-center p-4">
                        <div className="font-semibold">Tailwind CSS</div>
                        <div className="text-sm text-muted-foreground">Utility-first styling framework</div>
                    </div>
                    <div className="text-center p-4">
                        <div className="font-semibold">tRPC</div>
                        <div className="text-sm text-muted-foreground">End-to-end type-safe APIs</div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-2xl mx-auto space-y-6">
                    <h2 className="text-3xl font-bold">Ready to Start Building?</h2>
                    <p className="text-muted-foreground">
                        Get started with our production-ready template and launch your SaaS application faster than ever.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup">
                            <Button size="lg" className="flex items-center gap-2">
                                Create Account
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" size="lg">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="border-t border-border bg-card">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
                                <Code className="h-3 w-3 text-primary-foreground" />
                            </div>
                            <span className="font-semibold">Frontend Foundation</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Built with React 19, TypeScript, and Tailwind CSS
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}