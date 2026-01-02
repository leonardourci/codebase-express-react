import knex from '../knex'
import Payment from '../models/Payment.model'
import { IPayment } from '../../types/payment'

export const createPayment = async (payload: IPayment): Promise<IPayment> => {
	const [row] = await knex
		.insert(payload)
		.into('payments')
		.returning([
			'id',
			'user_id',
			'stripe_payment_intent_id',
			'stripe_subscription_id',
			'stripe_customer_id',
			'amount',
			'currency',
			'status',
			'type',
			'expires_at',
			'description',
			'createdAt',
			'updatedAt'
		])

	return new Payment(row).toJSON()
}
