import { IBaseModel } from "./base"

export interface IProduct extends IBaseModel {
    name: string
    description: string
    priceInCents: number
    currency: string
    type: string
    externalProductId: string
    externalPriceId: string
    active: boolean
}

export interface IProductDbRow {
    id?: string
    name?: string
    description?: string
    price_in_cents?: number
    currency?: string
    type?: string
    external_product_id?: string
    external_price_id?: string
    active?: boolean
    created_at?: Date
    updated_at?: Date | null
}