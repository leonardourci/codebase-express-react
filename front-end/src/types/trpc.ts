// Frontend tRPC types (to avoid cross-package imports)
// This is a simplified version of the backend AppRouter type

import type { TRPCClientError } from '@trpc/client'

// Simplified router type structure
export interface AppRouter {
    auth: {
        login: any
        signup: any
        refreshToken: any
        logout: any
    }
    user: {
        getProfile: any
        updateProfile: any
    }
    product: {
        getAll: any
        getById: any
        create: any
        update: any
        delete: any
    }
    billing: {
        createCheckoutSession: any
        getSubscription: any
        cancelSubscription: any
    }
}

// Re-export TRPCClientError for convenience
export type { TRPCClientError }