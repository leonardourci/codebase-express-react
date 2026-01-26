import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from '@/hooks/useAuth'
import { signupSchema } from '../../../../back-end/src/utils/validations/auth.schemas'
import { TSignupInput } from '../../../../back-end/src/types/auth'

interface SignupFormData extends TSignupInput {
    confirmPassword: string
}

export function SignupForm({ onSuccess }: { onSuccess?: () => void }) {
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
            onSuccess?.()
            navigate('/dashboard')
        } catch (error) {
            setErrors({
                general: error instanceof Error ? error.message : 'Signup failed. Please try again.'
            })
        }
    }

    const handleInputChange = (field: keyof SignupFormData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 text-center mb-4">
                <h3 className="font-semibold text-lg tracking-tight">Create Account</h3>
                <p className="text-sm text-muted-foreground">Enter your details to sign up</p>
            </div>

            {errors.general && (
                <div className="p-2 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
                    {errors.general}
                </div>
            )}

            <div className="grid gap-3">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={errors.fullName ? 'border-destructive' : ''}
                    />
                    {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            placeholder="+123..."
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                            id="age"
                            type="number"
                            placeholder="25"
                            value={formData.age || ''}
                            onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                            className={errors.age ? 'border-destructive' : ''}
                            min="13"
                        />
                        {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={errors.password ? 'border-destructive' : ''}
                    />
                    {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={errors.confirmPassword ? 'border-destructive' : ''}
                    />
                    {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                </div>
            </div>

            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                {isLoading ? <LoadingSpinner size="sm" /> : 'Sign Up'}
            </Button>
        </form>
    )
}
