import { router } from './trpc'
import { authRouter } from './routers/auth.router'
import { billingRouter } from './routers/billing.router'

export const appRouter = router({
  auth: authRouter,
  billing: billingRouter
})

// Export the router type for client-side usage
export type AppRouter = typeof appRouter