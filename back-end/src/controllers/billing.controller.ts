import { Response } from 'express'

import { IBillingRequest } from '../middlewares/billing.middleware'
import { getProductByExternalProductId } from '../database/repositories/product.repository'
import { registerUserBilling, updateBillingOnPaymentFailed, updateBillingOnSubscriptionUpdated, updateBillingOnSubscriptionDeleted } from '../services/billing.service'
import { EStatusCodes } from '../utils/status-codes'

export const processBillingWebhookHandler = async (req: IBillingRequest, res: Response): Promise<void> => {
	if (!req.billingEvent) {
		throw new Error('req.billingEvent is missing in processBillingWebhookHandler')
	}

	const { billingEvent } = req

	switch (billingEvent.type) {
		case 'invoice.paid': {
			const paidInvoice = billingEvent.data.object
			const lineItems = paidInvoice.lines.data
			if (lineItems[0]) {
				const externalProductId = lineItems[0].pricing?.price_details?.product
				const product = await getProductByExternalProductId({ id: externalProductId ?? '' })

				if (!product) {
					throw new Error(`Product with external ID "${externalProductId}" not found`)
				}

				console.log({
					userEmail: paidInvoice.customer_email,
					productId: product.id,
					stripeCustomerId: paidInvoice.customer,
					stripeSubscriptionId: lineItems[0].subscription,
					expiresAt: lineItems[0].period.end
				})

				await registerUserBilling({
					userEmail: paidInvoice.customer_email || '',
					productId: product.id,
					externalCustomerId: paidInvoice.customer as string,
					externalSubscriptionId: lineItems[0].subscription as string,
					expiresAt: lineItems[0].period.end,

					externalPaymentIntentId: String(paidInvoice)
				})
			}
			break
		}

		case 'invoice.payment_failed': {
			const failedInvoice = billingEvent.data.object
			console.log('invoice.payment_failed', {
				customer: failedInvoice.customer,
				invoiceId: failedInvoice.id,
				status: failedInvoice.status
			})
			const subscriptionId = failedInvoice.lines?.data?.[0]?.subscription
			await updateBillingOnPaymentFailed(String(subscriptionId || ''))
			break
		}

		case 'customer.subscription.updated': {
			const updatedSubscription = billingEvent.data.object
			if (updatedSubscription.cancel_at_period_end) {
				await updateBillingOnSubscriptionUpdated({
					externalSubscriptionId: updatedSubscription.id,
					status: updatedSubscription.status,
					currentPeriodEnd: new Date((updatedSubscription.cancel_at || new Date().getTime()) * 1000)
				})
				console.log('customer.subscription.updated cancel_at_period_end', {
					subscriptionId: updatedSubscription.id,
					cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end
				})
			} else {
				console.log('customer.subscription.updated', {
					subscriptionId: updatedSubscription.id,
					status: updatedSubscription.status
				})
			}

			break
		}

		case 'customer.subscription.deleted': {
			const deletedSubscription = billingEvent.data.object
			console.log('customer.subscription.deleted', {
				subscriptionId: deletedSubscription.id,
				customer: deletedSubscription.customer
			})
			await updateBillingOnSubscriptionDeleted(deletedSubscription.id)
			break
		}
	}
	res.status(EStatusCodes.OK).send('Webhook processed successfully')
}
