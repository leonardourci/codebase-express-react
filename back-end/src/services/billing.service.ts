import { getUserByEmail } from '../database/repositories/user.repository'
import {
	createBilling,
	getBillingByUserId as getBillingByUserId,
	updateBillingByUserId,
	getBillingByExternalSubscriptionId,
	updateBillingById
} from '../database/repositories/billing.repository'

export interface IUpdateUserBillingInput {
	userEmail: string
	productId: string
	externalCustomerId: string
	externalSubscriptionId: string
	expiresAt: number
	externalPaymentIntentId: string
}

export const registerUserBilling = async (input: IUpdateUserBillingInput) => {
	const user = await getUserByEmail({ email: input.userEmail })
	if (!user) {
		throw new Error(`User with email "${input.userEmail}" not found`)
	}

	const billing = await getBillingByUserId({ userId: user.id })
	if (!billing) {
		await createBilling({
			userId: user.id,
			productId: input.productId,
			externalPaymentIntentId: input.externalPaymentIntentId,
			externalSubscriptionId: input.externalSubscriptionId,
			externalCustomerId: input.externalCustomerId,
			status: 'active',
			expiresAt: new Date(input.expiresAt * 1000)
		})
	} else {
		await updateBillingByUserId({
			id: billing.id as string,
			expiresAt: new Date(input.expiresAt * 1000)
		})
	}
}

export const updateBillingOnPaymentFailed = async (externalSubscriptionId: string) => {
	if (!externalSubscriptionId) return
	const billing = await getBillingByExternalSubscriptionId({ externalSubscriptionId })
	if (!billing) return
	await updateBillingById({ id: billing.id as string, status: 'past_due' })
}

export const updateBillingOnSubscriptionUpdated = async (input: { externalSubscriptionId: string; status?: string; currentPeriodEnd: Date }) => {
	if (!input.externalSubscriptionId) return
	const billing = await getBillingByExternalSubscriptionId({ externalSubscriptionId: input.externalSubscriptionId })
	if (!billing) return
	await updateBillingById({
		id: billing.id as string,
		status: input.status,
		expiresAt: input.currentPeriodEnd
	})
}

export const updateBillingOnSubscriptionDeleted = async (externalSubscriptionId: string) => {
	if (!externalSubscriptionId) return
	const billing = await getBillingByExternalSubscriptionId({ externalSubscriptionId })
	if (!billing) return
	await updateBillingById({
		id: billing.id as string,
		status: 'canceled',
		expiresAt: new Date()
	})
}
