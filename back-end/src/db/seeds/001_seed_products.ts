import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    await knex('products').del()

    await knex('products').insert([
        {
            name: 'Free',
            description: 'Free tier with basic features',
            price_in_cents: 0,
            external_product_id: null, // Free tier has no Stripe product
            external_price_id: null,
            active: true,
            is_free_tier: true, // Exactly one product must have is_free_tier = true
            max_projects: 5 // Example limit - null means unlimited
        },
        {
            name: 'Basic',
            description: 'Everything you need to get started',
            price_in_cents: 2999, // $29.99
            external_product_id: 'prod_YOUR_BASIC_ID',
            external_price_id: 'price_YOUR_BASIC_ID',
            active: true,
            is_free_tier: false,
            max_projects: 50
        },
        {
            name: 'Pro',
            description: 'Everything you need to grow',
            price_in_cents: 4999, // $49.99
            external_product_id: 'prod_YOUR_PRO_ID',
            external_price_id: 'price_YOUR_PRO_ID',
            active: true,
            is_free_tier: false,
            max_projects: null // null = unlimited
        },
        {
            name: 'Enterprise',
            description: 'For large teams',
            price_in_cents: 9999, // $99.99
            external_product_id: 'prod_YOUR_ENTERPRISE_ID',
            external_price_id: 'price_YOUR_ENTERPRISE_ID',
            active: true,
            is_free_tier: false,
            max_projects: null
        }
    ])
}
