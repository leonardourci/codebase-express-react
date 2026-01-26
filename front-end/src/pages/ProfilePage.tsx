import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { AppLayout } from '@/components/layout/AppLayout'
import { useUser } from '@/hooks/useUser'
import { useFormValidation } from '@/hooks/useFormValidation'
import type { IUserProfile, TUpdateUserInput } from '@/types/user'
import { User, Mail, Phone, Calendar, Save } from 'lucide-react'
import { updateUserSchema } from '@/validations/user.schemas'

export function ProfilePage() {
    const { isLoading, error, getProfile, updateProfile } = useUser()
    const [profile, setProfile] = useState<IUserProfile | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const {
        formData,
        setFormData,
        errors,
        handleInputChange,
        handleSubmit,
        isSubmitting,
    } = useFormValidation<TUpdateUserInput>(
        {
            fullName: '',
            email: '',
            phone: '',
            age: 0
        },
        updateUserSchema
    )

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
    }, [getProfile, setFormData])

    const onSubmit = async (data: TUpdateUserInput) => {
        // Only include changed fields
        const updates: TUpdateUserInput = {}
        if (data.fullName !== profile?.fullName) updates.fullName = data.fullName
        if (data.email !== profile?.email) updates.email = data.email
        if (data.phone !== profile?.phone) updates.phone = data.phone
        if (data.age !== profile?.age) updates.age = data.age

        if (Object.keys(updates).length === 0) {
            setSuccessMessage('No changes to save')
            return
        }

        const updatedProfile = await updateProfile(updates)
        setProfile(updatedProfile)
        setSuccessMessage('Profile updated successfully!')
    }

    const handleFormInputChange = (field: keyof TUpdateUserInput, value: string | number) => {
        handleInputChange(field, value)
        setSuccessMessage(null)
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
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSubmit(onSubmit)
                                }} className="space-y-4">
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
                                                onChange={(e) => handleFormInputChange('fullName', e.target.value)}
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
                                                onChange={(e) => handleFormInputChange('email', e.target.value)}
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
                                                onChange={(e) => handleFormInputChange('phone', e.target.value)}
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
                                                onChange={(e) => handleFormInputChange('age', parseInt(e.target.value) || 0)}
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
                                            disabled={isSubmitting}
                                            className="flex items-center gap-2"
                                        >
                                            {isSubmitting ? (
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