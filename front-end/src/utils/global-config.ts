import { envSchema } from '@/utils/env-validation'
import z from 'zod'

const { data, error } = envSchema.safeParse(import.meta.env)

if (error) {
    console.error('❌ Invalid environment variables:', z.treeifyError(error))
    throw new Error('Invalid environment configuration')
}

export const globalConfig = {
    apiBase: data.VITE_API_BASE,

    environment: data.MODE,
    isDevelopment: data.MODE === 'development',
    isProduction: data.MODE === 'production',
    isTest: data.MODE === 'test',

    features: {
        enableDevTools: data.MODE === 'development',
        enableAnalytics: data.MODE === 'production',
    },

    app: {
        name: 'Frontend App',
        version: '1.0.0',
    },
} as const

export type GlobalConfig = typeof globalConfig
