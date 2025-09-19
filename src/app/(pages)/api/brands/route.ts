import { NextResponse } from "next/server"

export async function GET() {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching brands:', error)
        return NextResponse.json(
            { status: 'error', message: 'Failed to fetch brands', data: [] },
            { status: 500 }
        )
    }
}


