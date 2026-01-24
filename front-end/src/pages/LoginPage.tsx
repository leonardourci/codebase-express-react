import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema } from '../../../back-end/src/utils/validations/auth.schemas'
import { TLoginInput } from '../../../back-end/src/types/auth'

export function LoginPage() {
    const [formData, setFormData] = useState<TLoginInput>({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const { login, isLoading } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})

        const result = loginSchema.safeParse(formData)
        if (!result.success) {
            const validationErrors: Record<string, string> = {}
            result.error.issues.forEach((issue) => {
                const path = issue.path.join('.')
                validationErrors[path] = issue.message
            })
            setErrors(validationErrors)
            return
        }

        try {
            await login(result.data)
            navigate('/dashboard')
        } catch (error) {
            setErrors({
                general: error instanceof Error ? error.message : 'Login failed. Please try again.'
            })
        }
    }

    const handleInputChange = (field: keyof TLoginInput, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription>
                        Sign in to your account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {errors.general && (
                            <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
                                {errors.general}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={errors.email ? 'border-destructive' : ''}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                className={errors.password ? 'border-destructive' : ''}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <LoadingSpinner size="sm" className="mr-2" />
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">Don't have an account? </span>
                        <Link
                            to="/signup"
                            className="font-medium text-primary hover:underline"
                        >
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}