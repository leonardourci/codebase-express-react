import { useState } from 'react'
import { z } from 'zod'
import { handleTRPCError } from '@/utils/error-handling'

export function useFormValidation<T extends Record<string, any>>(
    initialData: T,
    schema: z.ZodSchema<T>
) {
    const [formData, setFormData] = useState<T>(initialData)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (field: keyof T, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }))

        // Clear error for this field when user starts typing
        if (errors[field as string]) {
            setErrors(prev => ({ ...prev, [field as string]: '' }))
        }
    }

    const validate = (data: T = formData): boolean => {
        const result = schema.safeParse(data)

        if (!result.success) {
            const validationErrors: Record<string, string> = {}
            result.error.issues.forEach((issue) => {
                const path = issue.path.join('.')
                validationErrors[path] = issue.message
            })
            setErrors(validationErrors)
            return false
        }

        setErrors({})
        return true
    }

    const handleSubmit = async (
        onSubmit: (data: T) => Promise<void>,
        data: T = formData
    ) => {
        if (!validate(data)) {
            return false
        }

        setIsSubmitting(true)
        try {
            await onSubmit(data)
            return true
        } catch (error) {
            const errorMessage = handleTRPCError(error)
            setErrors({
                general: errorMessage
            })
            return false
        } finally {
            setIsSubmitting(false)
        }
    }

    const setFieldError = (field: string, message: string) => {
        setErrors(prev => ({ ...prev, [field]: message }))
    }

    const clearErrors = () => {
        setErrors({})
    }

    return {
        formData,
        setFormData,
        errors,
        setErrors,
        isSubmitting,
        handleInputChange,
        validate,
        handleSubmit,
        setFieldError,
        clearErrors,
    }
}