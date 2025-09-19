import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ categoryId: string }> }
) {
    try {
        const { categoryId } = await params
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching category:', error)
        return NextResponse.json(
            { status: 'error', message: 'Failed to fetch category', data: null },
            { status: 500 }
        )
    }
}


