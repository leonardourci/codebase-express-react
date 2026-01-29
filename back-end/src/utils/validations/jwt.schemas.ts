import { z } from 'zod'

export const validateTokenSchema = z.object({
    token: z.string().min(1, 'Token is required')
})
