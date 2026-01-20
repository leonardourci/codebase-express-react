import { TRPCError } from '@trpc/server'
import { router } from '../trpc'
import { protectedProcedure } from '../middleware/auth.middleware'
import { createCheckoutSessionSchema, createPortalSessionSchema } from '../../utils/validations/billing.schemas'
import { getProductById } from '../../database/repositories/product.repository'
import { getBillingByUserId } from '../../database/repositories/billing.repository'
import { decodeJwtToken } from '../../utils/jwt'
import stripe from '../../utils/stripe'

export const billingRouter = router({
    createCheckoutSession: protectedProcedure
        .input(createCheckoutSessionSchema)
        .mutation(async ({ input }) => {
            const product = await getProductById({ id: input.productId })
            if (!product) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Product not found'
                })
            }

            const session = await stripe.checkout.sessions.create({
                mode: 'subscription',
                line_items: [{ price: product.externalPriceId, quantity: 1 }],
                success_url: input.successUrl,
                cancel_url: input.cancelUrl,
                metadata: { productId: product.id },
                allow_promotion_codes: true
            })

            if (!session.url) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Checkout URL not available'
                })
            }

            return { id: session.id, url: session.url }
        }),

    createCustomerPortalSession: protectedProcedure
        .input(createPortalSessionSchema)
        .mutation(async ({ input }) => {
            const { userId } = decodeJwtToken({ token: input.token })
            const billing = await getBillingByUserId({ userId })

            if (!billing) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'User billing not found'
                })
            }

            if (!billing.externalCustomerId) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Stripe customer not found'
                })
            }

            const portal = await stripe.billingPortal.sessions.create({
                customer: billing.externalCustomerId,
                return_url: input.returnUrl
            })

            return { url: portal.url }
        })
})