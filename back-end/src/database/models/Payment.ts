export interface IPayment {
	// uuid
	id: string
	user_id: string
	stripe_subscription_id: string
	stripe_customer_id: string
	amount: number
	currency: string
	status: string
	type: string
	expires_at: Date
	description: string
}

export default class Payment implements IPayment {
	id: string
	user_id: string
	stripe_subscription_id: string
	stripe_customer_id: string
	amount: number
	currency: string
	status: string
	type: string
	expires_at: Date
	description: string

	constructor(data: IPayment) {
		this.id = crypto.randomUUID()
		this.user_id = data.user_id
		this.stripe_subscription_id = data.stripe_subscription_id
		this.stripe_customer_id = data.stripe_customer_id
		this.amount = data.amount
		this.currency = data.currency
		this.status = data.status
		this.type = data.type
		this.expires_at = data.expires_at
		this.description = data.description
	}

	toJSON() {
		return {
			id: this.id,
			user_id: this.user_id,
			stripe_subscription_id: this.stripe_subscription_id,
			stripe_customer_id: this.stripe_customer_id,
			amount: this.amount,
			currency: this.currency,
			status: this.status,
			type: this.type,
			expires_at: this.expires_at,
			description: this.description
		}
	}

	toDatabaseFormat() {
		return {
			id: this.id,
			user_id: this.user_id,
			stripe_subscription_id: this.stripe_subscription_id,
			stripe_customer_id: this.stripe_customer_id,
			amount: this.amount,
			currency: this.currency,
			status: this.status,
			type: this.type,
			expires_at: this.expires_at,
			description: this.description
		}
	}
}
