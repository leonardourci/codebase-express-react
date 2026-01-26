import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { PricingView } from '../src/routes/pricing'
import { fetchPricingProducts, MOCK_PRICING_PRODUCTS, type PricingProduct } from '../src/utils/pricing'

async function main() {
    const distDir = path.resolve(__dirname, '../dist')
    const indexHtmlPath = path.join(distDir, 'index.html')
    const targetDir = path.join(distDir, 'pricing')
    const targetHtmlPath = path.join(targetDir, 'index.html')

    if (!fs.existsSync(indexHtmlPath)) {
        throw new Error('dist/index.html not found. Run "vite build" before prerendering.')
    }

    let products: PricingProduct[]
    try {
        const apiBase = process.env.VITE_API_BASE || 'http://localhost:3000/trpc'
        products = await fetchPricingProducts(apiBase)
    } catch (err) {
        if (process.env.NODE_ENV === 'production') {
            console.error('[prerender] Failed to fetch products in production.')
            throw err
        }
        products = MOCK_PRICING_PRODUCTS
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
