import { z } from 'zod'

export const validateTokenSchema = z.object({
    token: z.string()
        .min(1, 'Token is required')
        .refine(
            (value) => value.startsWith('Bearer '),
            { message: 'Token must start with "Bearer "' }
        )
})
