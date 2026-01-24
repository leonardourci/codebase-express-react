import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from '@/hooks/useAuth'
import { signupSchema } from '../../../back-end/src/utils/validations/auth.schemas'
import { TSignupInput } from '../../../back-end/src/types/auth'

interface SignupFormData extends TSignupInput {
    confirmPassword: string
}

export function SignupPage() {
    const [formData, setFormData] = useState<SignupFormData>({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        age: 0
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const { signup, isLoading } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})

        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match' })
            return
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword: _, ...dataToValidate } = formData

        const result = signupSchema.safeParse(dataToValidate)
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
            await signup(result.data)
            navigate('/dashboard')
        } catch (error) {
            setErrors({
                general: error instanceof Error ? error.message : 'Signup failed. Please try again.'
            })
        }
    }

    const handleInputChange = (field: keyof SignupFormData, value: string | number) => {
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
                    <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                    <CardDescription>
                        Sign up to get started with your account
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
                            <label htmlFor="fullName" className="text-sm font-medium">
                                Full Name
                            </label>
                            <Input
                                id="fullName"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                className={errors.fullName ? 'border-destructive' : ''}
                            />
                            {errors.fullName && (
                                <p className="text-sm text-destructive">{errors.fullName}</p>
                            )}
                        </div>

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
                            <label htmlFor="phone" className="text-sm font-medium">
                                Phone Number
                            </label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className={errors.phone ? 'border-destructive' : ''}
                            />
                            {errors.phone && (
                                <p className="text-sm text-destructive">{errors.phone}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="age" className="text-sm font-medium">
                                Age
                            </label>
                            <Input
                                id="age"
                                type="number"
                                placeholder="Enter your age"
                                value={formData.age || ''}
                                onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                                className={errors.age ? 'border-destructive' : ''}
                                min="13"
                                max="120"
                            />
                            {errors.age && (
                                <p className="text-sm text-destructive">{errors.age}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                className={errors.password ? 'border-destructive' : ''}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium">
                                Confirm Password
                            </label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                className={errors.confirmPassword ? 'border-destructive' : ''}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
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
                                    Creating account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
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
    )
}