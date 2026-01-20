import { router } from '../trpc'
import { protectedProcedure } from '../middleware/auth.middleware'
import { createCheckoutSessionSchema, createPortalSessionSchema } from '../../utils/validations/billing.schemas'
import { createCheckoutSessionHandler, createCustomerPortalSessionHandler } from '../../controllers/billing.controller'

export const billingRouter = router({
    createCheckoutSession: protectedProcedure
        .input(createCheckoutSessionSchema)
        .mutation(async ({ input }) => {
            const result = await createCheckoutSessionHandler(input)
            return result.response
        }),

    createCustomerPortalSession: protectedProcedure
        .input(createPortalSessionSchema)
        .mutation(async ({ input }) => {
            const result = await createCustomerPortalSessionHandler(input)
            return result.response
        })
})