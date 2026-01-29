import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Header } from '@/components/layout/Header'
import { trpc } from '@/lib/trpc'

export function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const forgotPasswordMutation = trpc.auth.forgotPassword.useMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setEmailError('')

        if (!email) {
            setEmailError('Email is required')
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Please enter a valid email address')
            return
        }

        forgotPasswordMutation.mutate(
            { email },
            {
                onSuccess: () => {
                    setSubmitted(true)
                },
                onError: () => {
                    // Still show success to prevent email enumeration
                    setSubmitted(true)
                }
            }
        )
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background pt-16 md:pt-20">
                <Header />
                <div className="flex items-center justify-center px-4 py-12 md:py-20">
                    <Card className="w-full max-w-md">
                        <CardHeader className="text-center space-y-2">
                            <div className="text-green-500 text-5xl mb-2">✓</div>
                            <CardTitle className="text-2xl md:text-3xl font-bold">Check Your Email</CardTitle>
                            <CardDescription className="text-base">
                                If an account exists with <strong>{email}</strong>, we've sent a password reset link.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground text-center">
                                The link will expire in 15 minutes. Don't forget to check your spam folder.
                            </p>
                            <div className="text-center">
                                <Link
                                    to="/login"
                                    className="font-medium text-primary hover:underline"
                                >
                                    Back to Sign In
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background pt-16 md:pt-20">
            <Header />
            <div className="flex items-center justify-center px-4 py-12 md:py-20">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl md:text-3xl font-bold">Forgot Password?</CardTitle>
                        <CardDescription className="text-base">
                            Enter your email and we'll send you a link to reset your password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-base font-medium">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={emailError ? 'border-destructive' : ''}
                                />
                                {emailError && (
                                    <p className="text-sm text-destructive mt-1">{emailError}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={forgotPasswordMutation.isPending}
                                size="lg"
                            >
                                {forgotPasswordMutation.isPending ? (
                                    <div className="flex items-center justify-center">
                                        <LoadingSpinner size="sm" className="mr-2" />
                                        Sending...
                                    </div>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-muted-foreground">Remember your password? </span>
                            <Link
                                to="/login"
                                className="font-medium text-primary hover:underline"
                            >
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
