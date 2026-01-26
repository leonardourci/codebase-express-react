import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { PricingView } from '../src/routes/pricing'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../back-end/src/trpc/router'

async function fetchProducts() {
    const API_BASE = process.env.VITE_API_BASE || 'http://localhost:3000/trpc'
    const client = createTRPCProxyClient<AppRouter>({
        links: [httpBatchLink({ url: API_BASE, maxURLLength: 2083 })],
    })
    return await client.product.getAll.query()
}

async function main() {
    const distDir = path.resolve(__dirname, '../dist')
    const indexHtmlPath = path.join(distDir, 'index.html')
    const targetDir = path.join(distDir, 'pricing')
    const targetHtmlPath = path.join(targetDir, 'index.html')

    if (!fs.existsSync(indexHtmlPath)) {
        throw new Error('dist/index.html not found. Run "vite build" before prerendering.')
    }

    let products: Array<{ id: string; name: string; description: string; price: number; currency: string; features?: string[] }>
    try {
        const raw = await fetchProducts()
        products = raw.map((p: any) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: typeof p.price === 'number' ? p.price : (p.priceInCents ? Math.round(p.priceInCents) / 100 : 0),
            currency: p.currency || 'USD',
            features: Array.isArray(p.features) ? p.features : [],
        }))
    } catch (err) {
        if (process.env.NODE_ENV === 'production') {
            console.error('[prerender] Failed to fetch products in production.')
            throw err
        }
        products = [
            {
                id: 'prod_mock_1',
                name: 'Pro Plan',
                description: 'Everything you need to grow your business.',
                price: 29.99,
                currency: 'USD',
                features: ['Unlimited Projects', 'Analytics Dashboard', 'Priority Support', 'Custom Domain'],
            },
        ]
        console.warn('[prerender] Using mock products (development only).')
    }

    const appHtml = renderToString(React.createElement(PricingView, { products }))
    const template = fs.readFileSync(indexHtmlPath, 'utf-8')
    const result = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

    fs.mkdirSync(targetDir, { recursive: true })
    fs.writeFileSync(targetHtmlPath, result, 'utf-8')
    console.log(`[prerender] Wrote ${targetHtmlPath}`)
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
