import { z } from 'zod'
import { requiredString, optionalString, requiredNumber } from './common.schemas'

export const createProductSchema = z.object({
    name: requiredString('Product name'),
    description: requiredString('Product description'),
    priceInCents: requiredNumber('Price in cents').positive('Price must be positive'),
    currency: z.string().length(3, 'Currency must be 3 characters (e.g., USD)').default('USD'),
    type: requiredString('Product type'),
    externalProductId: requiredString('External product ID'),
    externalPriceId: requiredString('External price ID'),
    active: z.boolean().default(true)
})

export const updateProductSchema = createProductSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    {
        message: 'At least one field must be provided for update'
    }
)

export const productFilterSchema = z.object({
    search: optionalString,
    type: optionalString,
    minPrice: z.number().positive().optional(),
    maxPrice: z.number().positive().optional(),
    active: z.boolean().optional(),
    sortBy: z.enum(['name', 'priceInCents', 'createdAt']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional().default('asc')
}).refine(
    (data) => !data.minPrice || !data.maxPrice || data.minPrice <= data.maxPrice,
    {
        message: 'Minimum price cannot be greater than maximum price',
        path: ['minPrice']
    }
)

export type CreateProductData = z.infer<typeof createProductSchema>
export type UpdateProductData = z.infer<typeof updateProductSchema>
export type ProductFilterData = z.infer<typeof productFilterSchema>