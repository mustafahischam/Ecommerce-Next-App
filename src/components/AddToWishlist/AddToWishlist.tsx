"use client"

import { HeartIcon, Loader2Icon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { WishlistContext } from '../Context/WishlistContext'
import { ProductInterface } from '@/interfaces/product'
import { toast } from 'react-hot-toast'
import { addToWishlistAction, removeFromWishlistAction } from '@/app/(pages)/wishlist/_action/actions'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
export default function AddToWishlist({ productId }: { productId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const { wishlistData, setWishlistData } = useContext(WishlistContext)
    const session = useSession()
    const router = useRouter()
    // Robust membership check: supports string ids or ProductInterface objects
    const isInWishlist = (wishlistData?.data as Array<ProductInterface | string> | undefined)?.some((item) => (
        typeof item === 'string' ? item === productId : (item.id === productId || item._id === productId)
    )) || false

    async function toggleWishlist() {
        if (session.status === 'unauthenticated') {
            toast.error('Please login to add to wishlist')
            router.push('/login')
            return
        }
        else {
        setIsLoading(true)

        try {
            if (isInWishlist) {
                // remove from wishlist
                const result = await removeFromWishlistAction(productId)

                if (result.success && result.data) {
                    setWishlistData(result.data)
                    toast.success('Removed from wishlist')
                } else {
                    toast.error(result.error || 'Failed to remove from wishlist')
                }
            } else {
                // add to wishlist
                const result = await addToWishlistAction(productId)

                if (result.success && result.data) {
                    setWishlistData(result.data)
                    toast.success('Added to wishlist')
                } else {
                    toast.error(result.error || 'Failed to add to wishlist')
                }
            }
        } catch (error: unknown) {
            console.error('Error toggling wishlist:', error)
                toast.error('Something went wrong')
            }
        }

        setIsLoading(false)
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleWishlist}
            disabled={isLoading}
            className='hover:bg-transparent'
        >
            {isLoading ? (
                <Loader2Icon className='size-5 animate-spin text-muted-foreground' />
            ) : (
                <HeartIcon
                    className={`size-5 transition-colors ${isInWishlist
                        ? 'text-red-500 fill-red-500'
                        : 'text-muted-foreground hover:text-red-500'
                        }`}
                />
            )}
        </Button>
    )
}
