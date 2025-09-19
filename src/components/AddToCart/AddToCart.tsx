"use client"

import React, { useContext, useState } from 'react'
import { ShoppingCartIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { CardFooter } from '../ui/card'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { CartContext } from '../Context/CartContext'
import AddToWishlist from '../AddToWishlist/AddToWishlist'
import { addToCartAction } from '@/app/(pages)/cart/_action/actions'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AddToCart({ productId }: { productId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const { setCartData } = useContext(CartContext)
    const session = useSession()
    const router = useRouter()
    async function addProductToCart() {
        if (session.status === 'unauthenticated') {
            toast.error('Please login to add to cart')
            router.push('/login')
            return
        }
        else {
        setIsLoading(true)
        try {
            const result = await addToCartAction(productId)
            if (result.success) {
                toast.success('Product added successfully to your cart')
                setCartData(result.data)
            } else {
                toast.error(result.error || 'Failed to add to cart')
            }
        } catch {
                toast.error('Something went wrong')
            }
        }
        setIsLoading(false)
    }
    return (
        <CardFooter className='flex gap-2'>
            <AddToWishlist productId={productId} />
            <Button disabled={isLoading} onClick={addProductToCart} className='grow cursor-pointer px-8 '
            > {isLoading ? <Loader2Icon className='animate-spin' /> : <ShoppingCartIcon />} Add to Cart</Button>
        </CardFooter>
    )
}
