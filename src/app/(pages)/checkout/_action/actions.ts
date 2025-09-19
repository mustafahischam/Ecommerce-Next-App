'use server'

import { getUserToken } from '@/Helpers/getUserToken'

export async function getUserOrdersAction(userId: string) {
    try {
        const token = await getUserToken()
        if (!token) {
            return { success: false as const, error: 'Unauthorized' }
        }

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token,
            },
            cache: 'no-store',
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false as const,
                error: data?.error || data?.message || 'Failed to fetch orders'
            }
        }

        const normalized = Array.isArray(data) ? { data } : data

        return {
            success: true as const,
            data: normalized,
        }
    } catch (error) {
        return {
            success: false as const,
            error: 'Something went wrong'
        }
    }
}
