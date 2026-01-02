import Stripe from 'stripe'
import { NextFunction, Request, Response } from 'express'

import stripe from '../utils/stripe'
import globalConfig from '../utils/globalConfig'

export interface PaymentRequest extends Request {
	paymentEvent: Stripe.Event
}

export const verifyStripeWebhookSignature = (req: Request, res: Response, next: NextFunction) => {
	const signature = req.headers['stripe-signature']
	if (!signature) {
		console.log('⚠️  No Stripe signature found on request')
		return res.sendStatus(400)
	}

	try {
		(req as PaymentRequest).paymentEvent = stripe
			.webhooks
			.constructEvent(
				req.body,
				signature,
				globalConfig.stripeSecretKey
			)

		next()
	} catch (err: any) {
		console.log(`⚠️  Webhook signature verification failed.`, err.message)
		return res.sendStatus(400)
	}
}
