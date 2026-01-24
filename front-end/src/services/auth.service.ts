import { trpcClient } from '../lib/trpc'
import {
    setTokens,
    setUser,
    clearAuthData,
    getRefreshToken,
    hasValidAccessToken,
    type TLoginInput,
    type TSignupInput,
    type IUser,
    type ILoginResponse
} from '../utils/auth'

export interface IAuthResponse {
    user: IUser
    accessToken: string
    refreshToken: string
}

export class AuthService {
    private refreshPromise: Promise<void> | null = null

    async login(credentials: TLoginInput): Promise<IAuthResponse> {
        const response: ILoginResponse = await trpcClient.auth.login.mutate(credentials)

        setTokens(response.accessToken, response.refreshToken)

        const user: IUser = {
            id: '',
            email: credentials.email,
            fullName: '',
            phone: '',
            age: 0,
            passwordHash: '',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        setUser(user)

        return {
            user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
        }
    }

    async signup(userData: TSignupInput): Promise<IAuthResponse> {
        await trpcClient.auth.signup.mutate(userData)

        // For signup, we need to login to get tokens since signup doesn't return them
        const loginResponse = await this.login({
            email: userData.email,
            password: userData.password
        })

        return loginResponse
    }

    async refreshTokens(): Promise<void> {
        // Prevent multiple simultaneous refresh attempts
        if (this.refreshPromise) {
            return this.refreshPromise
        }

        this.refreshPromise = this.performRefresh()
        return this.refreshPromise
    }

    private async performRefresh(): Promise<void> {
        try {
            const refreshToken = getRefreshToken()
            if (!refreshToken) {
                throw new Error('No refresh token available')
            }

            const response = await trpcClient.auth.refresh.mutate({ refreshToken })

            setTokens(response.accessToken, response.refreshToken)

        } catch (error) {
            this.logout()
            throw error
        } finally {
            this.refreshPromise = null
        }
    }

    async logout(): Promise<void> {
        try {
            if (hasValidAccessToken()) {
                await trpcClient.auth.logout.mutate()
            }
        } catch (error) {
            console.warn('Logout request failed:', error)
        } finally {
            clearAuthData()
        }
    }

    getCurrentUser(): IUser | null {
        return getUser()
    }

    isAuthenticated(): boolean {
        return hasValidAccessToken()
    }
}

export const authService = new AuthService()

import { getUser } from '../utils/auth'
export { getUser }