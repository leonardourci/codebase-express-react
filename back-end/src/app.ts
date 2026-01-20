import express from 'express'
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express'

import { processBillingWebhookHandler } from './controllers/billing.controller'
import { verifyStripeWebhookSignatureMiddleware } from './middlewares/billing.middleware'
import { appRouter, createTRPCContext } from './trpc'

const app = express()

app.post('/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  verifyStripeWebhookSignatureMiddleware,
  processBillingWebhookHandler
)

app.options('*', cors())
app.use(cors())

// to parse incoming JSON data from requests
app.use(express.json())

// Mount tRPC on /trpc route
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  })
)

export default app
