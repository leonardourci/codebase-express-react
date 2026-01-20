import knex from '../knex'
import Billing from '../models/Billing.model'
import { ICreateBilling, IBilling } from '../../types/billing'
import { IUser } from '../../types/user'

export const createBilling = async (input: ICreateBilling): Promise<IBilling> => {
	const [row] = await knex
		.insert(new Billing(input).toDatabaseFormat())
		.into(Billing.tableName)
		.returning([
			'id',
			'user_id',
			'product_id',
			'external_payment_intent_id',
			'external_subscription_id',
			'external_customer_id',
			'status',
			'expires_at',
			'created_at',
			'updated_at'
		])

	return new Billing(row).toJSON()
}

export const getBillingByUserId = async ({ userId }: { userId: IUser['id'] }): Promise<IBilling | null> => {
	const [row] = await knex(Billing.tableName).where({ user_id: userId }).select()

	if (!row) return null

	return new Billing(row).toJSON()
}

export const updateBillingByUserId = async (input: { id: string; expiresAt: Date }): Promise<IBilling> => {
	const [row] = await knex(Billing.tableName)
		.update({
			expires_at: input.expiresAt,
			status: 'active',
			updated_at: new Date()
		})
		.where({ id: input.id })
		.returning([
			'id',
			'user_id',
			'product_id',
			'external_payment_intent_id',
			'external_subscription_id',
			'external_customer_id',
			'status',
			'expires_at',
			'created_at',
			'updated_at'
		])

	return new Billing(row).toJSON()
}

export const getBillingByExternalSubscriptionId = async ({ externalSubscriptionId }: { externalSubscriptionId: string }): Promise<IBilling | null> => {
	const [row] = await knex(Billing.tableName).where({ external_subscription_id: externalSubscriptionId }).select()

	if (!row) return null

	return new Billing(row).toJSON()
}

export const updateBillingById = async (input: { id: string; status?: string; expiresAt?: Date }): Promise<IBilling> => {
	const updates: Record<string, any> = { updated_at: new Date() }
	if (input.status) updates.status = input.status
	if (input.expiresAt) updates.expires_at = input.expiresAt

	const [row] = await knex(Billing.tableName)
		.update(updates)
		.where({ id: input.id })
		.returning([
			'id',
			'user_id',
			'product_id',
			'external_payment_intent_id',
			'external_subscription_id',
			'external_customer_id',
			'status',
			'expires_at',
			'created_at',
			'updated_at'
		])

	return new Billing(row).toJSON()
}
