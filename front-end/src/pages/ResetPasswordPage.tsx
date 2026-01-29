import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorMessage } from '@/components/ui/error-message'
import { Header } from '@/components/layout/Header'
import { trpc } from '@/lib/trpc'

export function ResetPasswordPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get('token')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; general?: string }>({})
    const [success, setSuccess] = useState(false)

    const resetPasswordMutation = trpc.auth.resetPassword.useMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})

        const newErrors: typeof errors = {}

        if (!password) {
            newErrors.password = 'Password is required'
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters'
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        if (!token) {
            setErrors({ general: 'Invalid reset link. Please request a new one.' })
            return
        }

        resetPasswordMutation.mutate(
            { token, newPassword: password },
            {
                onSuccess: () => {
                    setSuccess(true)
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000)
                },
                onError: (error) => {
                    setErrors({ general: error.message || 'Failed to reset password. The link may have expired.' })
                }
            }
        )
    }

    if (!token) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background pt-16 md:pt-20">
                <Header />
                <div className="flex items-center justify-center px-4 py-12 md:py-20">
                    <Card className="w-full max-w-md">
                        <CardHeader className="text-center space-y-2">
                            <div className="text-red-500 text-5xl mb-2">!</div>
                            <CardTitle className="text-2xl md:text-3xl font-bold">Invalid Link</CardTitle>
                            <CardDescription className="text-base">
                                This password reset link is invalid or has expired.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <Link to="/forgot-password">
                                <Button size="lg">Request New Link</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background pt-16 md:pt-20">
                <Header />
                <div className="flex items-center justify-center px-4 py-12 md:py-20">
                    <Card className="w-full max-w-md">
                        <CardHeader className="text-center space-y-2">
                            <div className="text-green-500 text-5xl mb-2">✓</div>
                            <CardTitle className="text-2xl md:text-3xl font-bold">Password Reset!</CardTitle>
                            <CardDescription className="text-base">
                                Your password has been successfully reset. Redirecting to sign in...
                            </CardDescription>
                        </CardHeader>
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
                        <CardTitle className="text-2xl md:text-3xl font-bold">Reset Password</CardTitle>
                        <CardDescription className="text-base">
                            Enter your new password below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <ErrorMessage message={errors.general} />

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-base font-medium">
                                    New Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={errors.password ? 'border-destructive' : ''}
                                />
                                {errors.password && (
                                    <p className="text-sm text-destructive mt-1">{errors.password}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-base font-medium">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={errors.confirmPassword ? 'border-destructive' : ''}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={resetPasswordMutation.isPending}
                                size="lg"
                            >
                                {resetPasswordMutation.isPending ? (
                                    <div className="flex items-center justify-center">
                                        <LoadingSpinner size="sm" className="mr-2" />
                                        Resetting...
                                    </div>
                                ) : (
                                    'Reset Password'
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
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
