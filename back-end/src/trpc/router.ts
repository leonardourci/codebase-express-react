import { router } from './trpc'

// Main tRPC router - will be populated with procedures in subsequent tasks
export const appRouter = router({
  // Placeholder - procedures will be added in later tasks
})

// Export the router type for client-side usage
export type AppRouter = typeof appRouter