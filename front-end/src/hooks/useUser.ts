import { useState } from 'react'
import { userService, type IUpdateUserInput } from '../services/user.service'
import { type IUserProfile } from '../utils/auth'

export interface UseUserReturn {
    isLoading: boolean
    error: string | null
    getProfile: () => Promise<IUserProfile>
    updateProfile: (updates: IUpdateUserInput) => Promise<IUserProfile>
}

export function useUser(): UseUserReturn {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getProfile = async (): Promise<IUserProfile> => {
        setIsLoading(true)
        setError(null)

        try {
            const profile = await userService.getProfile()
            if (!profile) {
                throw new Error('User not found')
            }
            return profile
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to get profile'
            setError(errorMessage)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const updateProfile = async (updates: IUpdateUserInput): Promise<IUserProfile> => {
        setIsLoading(true)
        setError(null)

        try {
            const updatedProfile = await userService.updateProfile(updates)
            return updatedProfile
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update profile'
            setError(errorMessage)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        error,
        getProfile,
        updateProfile
    }
}