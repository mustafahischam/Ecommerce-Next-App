import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)

        const category = searchParams.get('category[in]')
        const brand = searchParams.get('brand[in]')
        const sort = searchParams.get('sort')
        const page = searchParams.get('page')
        const limit = searchParams.get('limit')
        const priceGte = searchParams.get('price[gte]') // price greater than or equal from server
        const priceLte = searchParams.get('price[lte]') // price less than or equal from server

        let apiUrl = 'https://ecommerce.routemisr.com/api/v1/products'
        const params = new URLSearchParams()

        if (category) {
            params.append('category[in]', category)
        }
        if (brand) {
            params.append('brand[in]', brand)
        }
        if (sort) {
            params.append('sort', sort)
        }
        if (page) {
            params.append('page', page)
        }
        if (limit) {
            params.append('limit', limit)
        }
        if (priceGte) {
            params.append('price[gte]', priceGte)
        }
        if (priceLte) {
            params.append('price[lte]', priceLte)
        }

        if (params.toString()) {
            apiUrl += `?${params.toString()}`
        }

        const response = await fetch(apiUrl)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json(
            { status: 'error', message: 'Failed to fetch products', data: [] },
            { status: 500 }
        )
    }
}
