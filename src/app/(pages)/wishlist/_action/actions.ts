'use server'

import { revalidatePath } from 'next/cache'
import { getUserToken } from '@/Helpers/getUserToken'

// Add to wishlist
export async function addToWishlistAction(productId: string) {
    try {
        const token = await getUserToken()
        if (!token) return { success: false as const, error: 'Unauthorized' }
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            method: 'POST',
            body: JSON.stringify({ productId }),
            headers: {
                token,
                "Content-Type": "application/json",
            }
        })

        const data = await response.json()

        if (data.status === 'success') {
            // After successful addition, fetch the updated wishlist
            const updatedWishlistResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                method: 'GET',
                headers: {
                    token,
                    "Content-Type": "application/json",
                }
            })

            const updatedWishlistData = await updatedWishlistResponse.json()

            revalidatePath('/wishlist')
            revalidatePath('/products')
            return { success: true, data: updatedWishlistData }
        } else {
            return { success: false, error: data.message || 'Failed to add to wishlist' }
        }
    } catch {
        return { success: false, error: 'Something went wrong' }
    }
}

// Remove from wishlist
export async function removeFromWishlistAction(productId: string) {
    try {
        const token = await getUserToken()
        if (!token) return { success: false as const, error: 'Unauthorized' }
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            method: 'DELETE',
            headers: {
                token,
            }
        })

        const data = await response.json()

        if (data.status === 'success') {
            // After successful removal, fetch the updated wishlist
            const updatedWishlistResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                method: 'GET',
                headers: {
                    token,
                    "Content-Type": "application/json",
                }
            })

            const updatedWishlistData = await updatedWishlistResponse.json()

            revalidatePath('/wishlist')
            revalidatePath('/products')
            return { success: true, data: updatedWishlistData }
        } else {
            return { success: false, error: data.message || 'Failed to remove from wishlist' }
        }
    } catch {
        return { success: false, error: 'Something went wrong' }
    }
}

// Get wishlist data
export async function getWishlistAction() {
    try {
        const token = await getUserToken()
        if (!token) return { success: false as const, error: 'Unauthorized' }
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            method: 'GET',
            headers: {
                token,
                "Content-Type": "application/json",
            }
        })

        const data = await response.json()
        return { success: true, data }
    } catch {
        return { success: false, error: 'Failed to fetch wishlist' }
    }
}
