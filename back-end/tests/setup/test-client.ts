import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../src/trpc/router'

export function createTestClient(baseUrl: string) {
    return createTRPCProxyClient<AppRouter>({
        links: [
            httpBatchLink({
                url: `${baseUrl}/trpc`,
                headers: () => {
                    // Individual tests can override this by creating their own client
                    // or we can add auth token management here if needed
                    return {}
                }
            })
        ]
    })
}

export function createAuthenticatedTestClient(baseUrl: string, token: string) {
    return createTRPCProxyClient<AppRouter>({
        links: [
            httpBatchLink({
                url: `${baseUrl}/trpc`,
                headers: () => ({
                    authorization: `Bearer ${token}`
                })
            })
        ]
    })
}