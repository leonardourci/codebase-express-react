import { z } from 'zod'

export const updateUserSchema = z.object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters').optional(),
    email: z.email('Invalid email format').optional(),
    phone: z.string().min(1, 'Phone is required').optional(),
    age: z.number().int('Age must be an integer').positive('Age must be positive').optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: 'At least one field must be provided for update'
    }
)