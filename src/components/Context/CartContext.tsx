"use client"
import { CartResponse } from "@/interfaces/cart";
import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const CartContext = createContext<({
    cartData: CartResponse | null,
    setCartData: (value: CartResponse | null) => void,
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void,
    getCart: () => void
})>({
    cartData: null,
    setCartData: () => { },
    isLoading: false,
    setIsLoading: () => { },
    getCart: () => { },
})

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [cartData, setCartData] = useState<CartResponse | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const session = useSession()

    async function getCart() {
        if (session.status !== 'authenticated') {
            setCartData(null)
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        try {
            const { getCartAction } = await import('@/app/(pages)/cart/_action/actions')
            const result = await getCartAction()

            if (result.success) {
                setCartData(result.data)
                if (result.data?.data?.cartOwner) {
                    localStorage.setItem('userId', result.data.data.cartOwner)
                }
            } else {
                console.error('Error fetching cart:', result.error)
                setCartData(null)
            }
        } catch (error) {
            console.error('Error fetching cart:', error)
            setCartData(null)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (session.status === 'authenticated') {
            getCart()
        } else if (session.status === 'unauthenticated') {

            setCartData(null)
            setIsLoading(false)
        }
    }, [session.status])

    return (
        <CartContext.Provider value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}>
            {children}
        </CartContext.Provider>
    )
}