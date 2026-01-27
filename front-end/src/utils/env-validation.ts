import { z } from 'zod'

export const frontendEnvSchema = z.object({
    VITE_API_BASE: z.url('VITE_API_BASE must be a valid URL').default('http://localhost:3000/trpc'),
    VITE_GOOGLE_CLIENT_ID: z.string().min(1, 'VITE_GOOGLE_CLIENT_ID is required'),
    MODE: z.enum(['development', 'production', 'test']).default('development'),
})

export type FrontendEnv = z.infer<typeof frontendEnvSchema>