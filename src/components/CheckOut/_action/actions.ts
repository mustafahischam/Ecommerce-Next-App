'use server'

import { getUserToken } from '@/Helpers/getUserToken'
import { Address } from '@/interfaces/address'

export async function createCashOrderAction(cartId: string, shippingAddress: Address) {
    try {
        const token = await getUserToken()
        if (!token) {
            return { success: false as const, error: 'Unauthorized' }
        }

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token,
            },
            body: JSON.stringify({ shippingAddress }),
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false as const,
                error: data?.error || data?.message || 'Failed to create cash order'
            }
        }

        return {
            success: true as const,
            data: data,
        }
    } catch {
        return {
            success: false as const,
            error: 'Something went wrong'
        }
    }
}

export async function createCheckoutSessionAction(cartId: string, shippingAddress: Address) {
    try {
        const token = await getUserToken()
        if (!token) {
            return { success: false as const, error: 'Unauthorized' }
        }

        // Use NEXT_PUBLIC_BASE_URL from environment or fallback to localhost
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token,
            },
            body: JSON.stringify({ shippingAddress }),
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false as const,
                error: data?.error || data?.message || 'Failed to create checkout session'
            }
        }

        return {
            success: true as const,
            data: data,
        }
    } catch {
        return {
            success: false as const,
            error: 'Something went wrong'
        }
    }
}
