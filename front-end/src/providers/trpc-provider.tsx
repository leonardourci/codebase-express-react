import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { trpc, trpcClient } from '../lib/trpc'

interface TRPCProviderProps {
    children: React.ReactNode
}

export function TRPCProvider({ children }: TRPCProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Disable automatic refetching on window focus for better UX
                        refetchOnWindowFocus: false,
                        // Retry failed requests up to 3 times
                        retry: 3,
                        // Cache data for 5 minutes
                        staleTime: 5 * 60 * 1000,
                    },
                    mutations: {
                        // Retry failed mutations once
                        retry: 1,
                    },
                },
            })
    )

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}