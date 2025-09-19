'use server'

import { getUserToken } from '@/Helpers/getUserToken'
import { revalidatePath } from 'next/cache'


// add to cart
export async function addToCartAction(productId: string) {
    const token = await getUserToken()
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
            method: 'POST',
            body: JSON.stringify({ productId }),
            headers: {
                token: token || '',
                "Content-Type": "application/json",
            }
        })

        if (!response.ok) {
            console.error('Add to cart failed:', response.status, response.statusText)
            const errorText = await response.text()
            console.error('Error response:', errorText)
            return { success: false, error: `Server error: ${response.status}` }
        }

        const data = await response.json()

        if (data.status === 'success') {
            revalidatePath('/cart')
            return { success: true, data }
        } else {
            return { success: false, error: data.message || 'Failed to add to cart' }
        }
    } catch (error) {
        console.error('Add to cart error:', error)
        return { success: false, error: 'Something went wrong' }
    }
}

export async function removeFromCartAction(productId: string) {
    const token = await getUserToken()
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            method: 'DELETE',
            headers: {
                token: token || '',
            }
        })

        const data = await response.json()

        if (data.status === 'success') {
            revalidatePath('/cart')
            return { success: true, data }
        } else {
            return { success: false, error: data.message || 'Failed to remove from cart' }
        }
    } catch {
        return { success: false, error: 'Something went wrong' }
    }
}

export async function updateCartItemAction(productId: string, count: number) {
    const token = await getUserToken()
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({ count }),
            headers: {
                token: token || '',
                "Content-Type": "application/json",
            }
        })

        const data = await response.json()

        if (data.status === 'success') {
            revalidatePath('/cart')
            return { success: true, data }
        } else {
            return { success: false, error: data.message || 'Failed to update cart item' }
        }
    } catch {
        return { success: false, error: 'Something went wrong' }
    }
}

export async function clearCartAction() {
    const token = await getUserToken()
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
            method: 'DELETE',
            headers: {
                token: token || '',
            }
        })

        const data = await response.json()

        if (data.message === 'success') {
            revalidatePath('/cart')
            return { success: true, data }
        } else {
            return { success: false, error: 'Failed to clear cart' }
        }
    } catch {
        return { success: false, error: 'Something went wrong' }
    }
}

export async function getCartAction() {
    const token = await getUserToken()
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
            method: 'GET',
            headers: {
                token: token || '',
            }
        })

        const data = await response.json()
        return { success: true, data }
    } catch {
        return { success: false, error: 'Failed to fetch cart' }
    }
}
