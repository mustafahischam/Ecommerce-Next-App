import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ brandId: string }> }
) {
    try {
        const { brandId } = await params
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching brand:', error)
        return NextResponse.json(
            { status: 'error', message: 'Failed to fetch brand', data: null },
            { status: 500 }
        )
    }
}


