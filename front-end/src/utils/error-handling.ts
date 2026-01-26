import { TRPCClientError } from '@trpc/client'
import type { AppRouter } from '../../../back-end/src/trpc/router'

export class AppError extends Error {
    constructor(
        message: string,
        public code?: string,
        public statusCode?: number
    ) {
        super(message)
        this.name = 'AppError'
    }
}

export function formatError(error: unknown): string {
    if (error instanceof AppError) return error.message
    if (error instanceof TRPCClientError) return error.message
    if (error instanceof Error) return error.message
    return 'An unexpected error occurred'
}

export function isTRPCError(error: unknown): error is TRPCClientError<AppRouter> {
    return error instanceof TRPCClientError
}

export function handleTRPCError(error: unknown): string {
    if (isTRPCError(error)) {
        switch (error.data?.code) {
            case 'UNAUTHORIZED':
                return 'You are not authorized to perform this action'
            case 'FORBIDDEN':
                return 'Access denied'
            case 'NOT_FOUND':
                return 'The requested resource was not found'
            case 'BAD_REQUEST':
                return error.message || 'Invalid request'
            case 'INTERNAL_SERVER_ERROR':
                return 'An internal server error occurred'
            default:
                return error.message || 'An error occurred'
        }
    }

    return formatError(error)
}

export function createErrorHandler(context: string) {
    return (error: unknown) => {
        console.error(`Error in ${context}:`, error)
        return handleTRPCError(error)
    }
}