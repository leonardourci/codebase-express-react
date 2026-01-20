import { router } from './trpc'
import { authRouter } from './routers/auth.router'
import { billingRouter } from './routers/billing.router'
import { productRouter } from './routers/product.router'

export const appRouter = router({
  auth: authRouter,
  billing: billingRouter,
  product: productRouter
})

// Export the router type for client-side usage
export type AppRouter = typeof appRouter