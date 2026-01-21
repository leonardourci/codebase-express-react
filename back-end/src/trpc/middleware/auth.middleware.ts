import { TRPCError } from '@trpc/server'
import { middleware, procedure } from '../trpc'
import { verifyJwtToken, decodeJwtToken } from '../../utils/jwt'
import { getUserById } from '../../database/repositories/user.repository'
import { getBillingByUserId } from '../../database/repositories/billing.repository'

/**
 * tRPC middleware that verifies JWT token and adds user to context
 */
export const authMiddleware = middleware(async ({ ctx, next }) => {
    const token = ctx.req.headers['authorization']

    if (!token) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'No authorization token provided'
        })
    }

    try {
        verifyJwtToken({ token })

        const { userId } = decodeJwtToken({ token })

        const user = await getUserById({ id: userId })

        if (!user) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'User not found'
            })
        }

        return next({
            ctx: {
                ...ctx,
                user
            }
        })
    } catch (error: any) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: error.message || 'Invalid token'
        })
    }
})

/**
 * Create a protected procedure that requires authentication
 */
export const protectedProcedure = procedure.use(authMiddleware)

/**
 * tRPC middleware that verifies user billing status
 * Reuses existing billing verification logic from Express middleware
 */
export const billingMiddleware = middleware(async ({ ctx, next }) => {
    // Ensure user is authenticated first
    if (!ctx.user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Authentication required'
        })
    }

    try {
        const userBilling = await getBillingByUserId({ userId: ctx.user.id })

        if (!userBilling) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'User billing not found'
            })
        }

        if (userBilling.expiresAt < new Date()) {
            throw new TRPCError({
                code: 'PAYMENT_REQUIRED',
                message: 'User billing has expired'
            })
        }

        return next()
    } catch (error: any) {
        if (error instanceof TRPCError) {
            throw error
        }

        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: error.message || 'Billing verification failed'
        })
    }
})

export const billingProtectedProcedure = procedure.use(authMiddleware).use(billingMiddleware)