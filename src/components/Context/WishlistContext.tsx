"use client"
import { WishlistResponse } from "@/interfaces/wishlist";
import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getWishlistAction } from '@/app/(pages)/wishlist/_action/actions';

export const WishlistContext = createContext<({
    wishlistData: WishlistResponse | null,
    setWishlistData: (value: WishlistResponse | null) => void,
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void,
    getWishlist: (silent?: boolean) => Promise<void>
})>({
    wishlistData: null,
    setWishlistData: () => { },
    isLoading: false,
    setIsLoading: () => { },
    getWishlist: async () => { }
})

export default function WishlistContextProvider({ children }: { children: React.ReactNode }) {
    const [wishlistData, setWishlistData] = useState<WishlistResponse | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const session = useSession()

    async function getWishlist(silent: boolean = false) {
        if (session.status !== 'authenticated') {
            setWishlistData(null)
            setIsLoading(false)
            return
        }

        if (!silent) setIsLoading(true)
        try {
            const result = await getWishlistAction()

            if (result.success) {
                setWishlistData(result.data)
            } else {
                console.error('Error fetching wishlist:', result.error)
                setWishlistData({ status: 'error', count: 0, data: [] })
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error)
            setWishlistData({ status: 'error', count: 0, data: [] })
        }
        if (!silent) setIsLoading(false)
    }

    useEffect(() => {
        if (session.status === 'authenticated') {
            getWishlist()
        } else if (session.status === 'unauthenticated') {
            setWishlistData(null)
            setIsLoading(false)
        }
    }, [session.status])

    return (
        <WishlistContext.Provider value={{ wishlistData, setWishlistData, isLoading, setIsLoading, getWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}
