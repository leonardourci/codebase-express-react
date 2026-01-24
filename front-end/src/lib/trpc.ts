import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../../back-end/src/trpc/router'
import { getAccessToken } from '../utils/auth'

// Maximum URL length supported by Internet Explorer and most browsers/proxies
// Used to determine when tRPC should switch from GET to POST for batched requests
const MAX_URL_LENGTH_FOR_GET_REQUESTS = 2083

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc',
            headers: () => {
                const token = getAccessToken()
                return token ? { Authorization: `Bearer ${token}` } : {}
            },
            // Enable request batching for better performance
            maxURLLength: MAX_URL_LENGTH_FOR_GET_REQUESTS,
        }),
    ],
})