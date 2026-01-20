import { z } from 'zod'

export const loginSchema = z.object({
    email: z.email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
})

export const signupSchema = z.object({
    fullName: z.string().min(3, 'Full name is required'),
    email: z.email('Invalid email format'),
    phone: z.string().min(1, 'Phone is required'),
    password: z.string().min(1, 'Password is required'),
    age: z.number().int('Age must be an integer').positive('Age must be positive')
})