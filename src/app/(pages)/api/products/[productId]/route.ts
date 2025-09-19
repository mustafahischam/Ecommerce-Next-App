import { NextRequest, NextResponse } from "next/server"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ productId: string }> }
) {
    try {
        const { productId } = await params

        if (!productId) {
            return NextResponse.json(
                { status: 'error', message: 'Product ID is required' },
                { status: 400 }
            )
        }

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching product details:', error)
        return NextResponse.json(
            { status: 'error', message: 'Failed to fetch product details', data: null },
            { status: 500 }
        )
    }
}
