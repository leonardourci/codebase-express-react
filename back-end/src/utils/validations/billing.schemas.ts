import { z } from 'zod'

export const createCheckoutSessionSchema = z.object({
    productId: z.string().min(1, 'Product ID is required'),
    successUrl: z.url('Success URL must be a valid URI'),
    cancelUrl: z.url('Cancel URL must be a valid URI'),
    token: z.string().min(1, 'Token is required')
})

export const createPortalSessionSchema = z.object({
    returnUrl: z.url('Return URL must be a valid URI'),
    token: z.string().min(1, 'Token is required')
})