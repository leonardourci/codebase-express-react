import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { AppLayout } from '@/components/layout/AppLayout'
import { useUser } from '@/hooks/useUser'
import { updateUserSchema } from '../../../back-end/src/utils/validations/user.schemas'
import { type IUpdateUserInput } from '@/services/user.service'
import { type IUserProfile } from '@/utils/auth'
import { User, Mail, Phone, Calendar, Save } from 'lucide-react'

export function ProfilePage() {
    const { isLoading, error, getProfile, updateProfile } = useUser()
    const [profile, setProfile] = useState<IUserProfile | null>(null)
    const [formData, setFormData] = useState<IUpdateUserInput>({})
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isUpdating, setIsUpdating] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const userProfile = await getProfile()
                setProfile(userProfile)
                setFormData({
                    fullName: userProfile.fullName,
                    email: userProfile.email,
                    phone: userProfile.phone,
                    age: userProfile.age
                })
            } catch (err) {
                console.error('Failed to load profile:', err)
            }
        }

        loadProfile()
    }, [getProfile])

    const handleInputChange = (field: keyof IUpdateUserInput, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        setSuccessMessage(null)

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})
        setSuccessMessage(null)

        // Only include changed fields
        const updates: IUpdateUserInput = {}
        if (formData.fullName !== profile?.fullName) updates.fullName = formData.fullName
        if (formData.email !== profile?.email) updates.email = formData.email
        if (formData.phone !== profile?.phone) updates.phone = formData.phone
        if (formData.age !== profile?.age) updates.age = formData.age

        if (Object.keys(updates).length === 0) {
            setSuccessMessage('No changes to save')
            return
        }

        const result = updateUserSchema.safeParse(updates)
        if (!result.success) {
            const validationErrors: Record<string, string> = {}
            result.error.issues.forEach((issue) => {
                const path = issue.path.join('.')
                validationErrors[path] = issue.message
            })
            setErrors(validationErrors)
            return
        }

        setIsUpdating(true)
        try {
            const updatedProfile = await updateProfile(updates)
            setProfile(updatedProfile)
            setSuccessMessage('Profile updated successfully!')
        } catch (err) {
            setErrors({
                general: err instanceof Error ? err.message : 'Failed to update profile'
            })
        } finally {
            setIsUpdating(false)
        }
    }

    if (isLoading && !profile) {
        return (
            <AppLayout showSidebar>
                <LoadingSpinner size="lg" text="Loading profile..." fullScreen />
            </AppLayout>
        )
    }

    if (error && !profile) {
        return (
            <AppLayout showSidebar>
                <div className="flex items-center justify-center min-h-[400px]">
                    <Card className="w-full max-w-md">
                        <CardContent className="pt-6">
                            <div className="text-center text-destructive">
                                <p>Failed to load profile: {error}</p>
                                <Button
                                    onClick={() => window.location.reload()}
                                    className="mt-4"
                                    variant="outline"
                                >
                                    Retry
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        )
    }

    return (
        <AppLayout showSidebar>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold">Profile Settings</h1>
                    <p className="text-muted-foreground">Manage your account information and preferences</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Personal Information
                                </CardTitle>
                                <CardDescription>
                                    Update your personal details and contact information
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {errors.general && (
                                        <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
                                            {errors.general}
                                        </div>
                                    )}

                                    {successMessage && (
                                        <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md">
                                            {successMessage}
                                        </div>
                                    )}

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="fullName" className="text-sm font-medium">
                                                Full Name
                                            </label>
                                            <Input
                                                id="fullName"
                                                type="text"
                                                placeholder="Enter your full name"
                                                value={formData.fullName || ''}
                                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                className={errors.fullName ? 'border-destructive' : ''}
                                            />
                                            {errors.fullName && (
                                                <p className="text-sm text-destructive">{errors.fullName}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium">
                                                Email Address
                                            </label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Enter your email"
                                                value={formData.email || ''}
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
                                                value={formData.phone || ''}
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
                                    </div>

                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={isUpdating}
                                            className="flex items-center gap-2"
                                        >
                                            {isUpdating ? (
                                                <>
                                                    <LoadingSpinner size="sm" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="h-4 w-4" />
                                                    Save Changes
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Profile Summary */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Summary</CardTitle>
                                <CardDescription>
                                    Current account information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {profile && (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">Full Name</p>
                                                <p className="text-sm text-muted-foreground">{profile.fullName}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">Email</p>
                                                <p className="text-sm text-muted-foreground">{profile.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">Phone</p>
                                                <p className="text-sm text-muted-foreground">{profile.phone}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">Age</p>
                                                <p className="text-sm text-muted-foreground">{profile.age} years old</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}