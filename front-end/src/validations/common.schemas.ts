import { z } from 'zod'

export const requiredString = (fieldName: string) => z.string().min(1, `${fieldName} is required`)
export const optionalString = z.string().optional()
export const requiredNumber = (fieldName: string) => z.number({ message: `${fieldName} is required` })
export const optionalNumber = z.number().optional()

export const urlSchema = z.string().url('Please enter a valid URL')
export const optionalUrlSchema = z.string().url('Please enter a valid URL').optional().or(z.literal(''))

export const dateSchema = z.date()
export const futureDateSchema = z.date().refine((date) => date > new Date(), {
    message: "Date must be in the future"
})
export const pastDateSchema = z.date().refine((date) => date < new Date(), {
    message: "Date must be in the past"
})

export const createPasswordConfirmationSchema = <T extends z.ZodRawShape>(baseSchema: z.ZodObject<T>) => {
    return baseSchema.extend({
        confirmPassword: z.string()
    }).refine((data: any) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })
}