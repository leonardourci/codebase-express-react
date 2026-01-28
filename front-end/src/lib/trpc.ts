import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../../back-end/src/trpc/router'
import { getAccessToken, getRefreshToken, setTokens, clearAuthData } from '../utils/auth'
import { globalConfig } from '@/utils/global-config'

// Maximum URL length supported by Internet Explorer and most browsers/proxies
// Used to determine when tRPC should switch from GET to POST for batched requests
const MAX_URL_LENGTH_FOR_GET_REQUESTS = 2083

// Track if we're currently refreshing to prevent multiple simultaneous refreshes
let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null

async function refreshAccessToken(): Promise<boolean> {
    if (isRefreshing && refreshPromise) {
        return refreshPromise
    }

    isRefreshing = true
    refreshPromise = (async () => {
        try {
            const refreshToken = getRefreshToken()
            if (!refreshToken) {
                clearAuthData()
                return false
            }

            const response = await fetch(`${globalConfig.apiBase}/auth.refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            })

            if (!response.ok) {
                clearAuthData()
                return false
            }

            const data = await response.json()
            setTokens(data.result.data.accessToken, data.result.data.refreshToken)
            return true
        } catch {
            clearAuthData()
            return false
        } finally {
            isRefreshing = false
            refreshPromise = null
        }
    })()

    return refreshPromise
}

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: globalConfig.apiBase,
            headers: () => {
                const token = getAccessToken()
                return token ? { Authorization: `Bearer ${token}` } : {}
            },
            // Enable request batching for better performance
            maxURLLength: MAX_URL_LENGTH_FOR_GET_REQUESTS,
            // Automatically retry with fresh token on 401
            fetch: async (url, options) => {
                const response = await fetch(url, options)

                // If unauthorized, try to refresh token and retry once
                if (response.status === 401 && !isRefreshing) {
                    const refreshed = await refreshAccessToken()
                    if (refreshed) {
                        // Retry the request with new token
                        const token = getAccessToken()
                        const newOptions = {
                            ...options,
                            headers: {
                                ...options?.headers,
                                Authorization: token ? `Bearer ${token}` : '',
                            },
                        }
                        return fetch(url, newOptions)
                    }
                }

                return response
            },
        }),
    ],
})
