import { TLoginInput, TSignupInput, ILoginResponse } from '../../../back-end/src/types/auth'
import { IUser, IUserProfile } from '../../../back-end/src/types/user'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'user'

export type { TLoginInput, TSignupInput, IUser, IUserProfile, ILoginResponse }

export interface IAuthTokens {
    accessToken: string
    refreshToken: string
}

// Frontend-specific auth response that includes user data
export interface IAuthResponse {
    user: IUser
    accessToken: string
    refreshToken: string
}

export const setAccessToken = (token: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const getAccessToken = (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const setRefreshToken = (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

export const getRefreshToken = (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const setUser = (user: IUserProfile): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getUser = (): IUserProfile | null => {
    const userStr = localStorage.getItem(USER_KEY)
    return userStr ? JSON.parse(userStr) : null
}

export const setTokens = (accessToken: string, refreshToken: string): void => {
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
}

export const clearAuthData = (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
}

export const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const currentTime = Date.now() / 1000
        return payload.exp < currentTime
    } catch {
        return true
    }
}

export const hasValidAccessToken = (): boolean => {
    const token = getAccessToken()
    return token !== null && !isTokenExpired(token)
}

export const hasRefreshToken = (): boolean => {
    return getRefreshToken() !== null
}

export const isAuthenticated = (): boolean => {
    return hasValidAccessToken() || hasRefreshToken()
}