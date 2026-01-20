import BaseModel, { IBaseModel } from './Base.model'

export interface IProduct extends IBaseModel {
	name: string
	description: string
	price: number
	currency: string
	type: string
	externalProductId: string
	externalPriceId: string
	active: boolean
}

export default class Product extends BaseModel<IProduct> implements IProduct {
	static tableName = 'products'

	name: string
	description: string
	price: number
	currency: string
	type: string
	externalProductId: string
	externalPriceId: string
	active: boolean

	constructor(data: IProduct) {
		super()
		this.name = data.name
		this.description = data.description
		this.price = data.price
		this.currency = data.currency
		this.type = data.type
		this.externalProductId = data.externalProductId
		this.externalPriceId = data.externalPriceId
		this.active = data.active
	}

	toJSON(): IProduct {
		return new Product({
			id: this.id,
			name: this.name,
			description: this.description,
			price: this.price,
			currency: this.currency,
			type: this.type,
			externalProductId: this.externalProductId,
			externalPriceId: this.externalPriceId,
			active: this.active,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		})
	}

	toDatabaseFormat() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			price: this.price,
			currency: this.currency,
			type: this.type,
			external_product_id: this.externalProductId,
			external_price_id: this.externalPriceId,
			active: this.active,
			created_at: this.createdAt,
			updated_at: this.updatedAt
		}
	}
}
