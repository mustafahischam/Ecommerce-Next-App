"use client"
import React from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { ShoppingCartIcon, User2Icon, HeartIcon } from 'lucide-react'
import { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
import { WishlistContext } from '../Context/WishlistContext'
import { Loader2Icon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
export default function Navbar() {
    const { cartData, isLoading: cartLoading } = useContext(CartContext)
    const { wishlistData, isLoading: wishlistLoading } = useContext(WishlistContext)
    const session = useSession()
    return <>


        <nav className='bg-gradient-to-r from-gray-800 to-gray-900 py-4 shadow-md border-b border-gray-700 sticky top-0 z-50'>
            <div className="container mx-auto px-12">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="relative">
                            {/* Shopping bag icon with gradient */}
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-950 to-cyan-900 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                                <ShoppingCartIcon className="w-6 h-6 text-white" />
                            </div>
                            {/* Small decorative dot */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-200 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-extrabold text-white  leading-none group-hover:text-blue-300 transition-colors duration-200">
                                Shop<span className="text-blue-400">Mart</span>
                            </h1>
                            <p className="text-xs text-gray-400 ">Your Shopping Destination</p>
                        </div>
                    </Link>

                    <NavigationMenu>
                        <NavigationMenuList className="space-x-2">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/products" className="px-4 py-2 text-white font-semibold hover:text-gray-200 transition-colors duration-200 rounded-md hover:bg-gray-700">
                                        Products
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/categories" className="px-4 py-2 text-white font-semibold hover:text-gray-200 transition-colors duration-200 rounded-md hover:bg-gray-700">
                                        Categories
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/brands" className="px-4 py-2 text-white font-semibold hover:text-gray-200 transition-colors duration-200 rounded-md hover:bg-gray-700">
                                        Brands
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex items-center">
                        {session.status == "authenticated" && <h2 className='text-white mr-2'>
                            Hello {session.data?.user.name}</h2>}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type="button"
                                    aria-label="Open user menu"
                                    className='mr-2 inline-flex items-center justify-center rounded-full p-2 bg-gray-700/10 hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'
                                >
                                    <User2Icon className='text-white size-5.5' />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {session.status == "authenticated" ? <>
                                    <Link href={"/profile"}>
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                    </Link>
                                    <Link href={"/allorders"}>
                                        <DropdownMenuItem>Orders</DropdownMenuItem>
                                    </Link>
                                    <Link href={"/addresses"}>
                                        <DropdownMenuItem>Addresses</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>Logout</DropdownMenuItem>

                                </> : <>

                                    <Link href={"/login "}>
                                        <DropdownMenuItem>Login</DropdownMenuItem>
                                    </Link>
                                    <Link href={"/register"}>
                                        <DropdownMenuItem>Register</DropdownMenuItem>
                                    </Link>

                                </>}




                            </DropdownMenuContent>
                        </DropdownMenu>


                        <div className='relative mr-2'>
                            {session.status === "authenticated" && (
                                <>
                                    <Link
                                        href="/wishlist"
                                        className='group inline-flex items-center justify-center rounded-full p-2 bg-gray-700/10 hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                                        aria-label='Open wishlist'
                                    >
                                        <HeartIcon className='text-white size-5 transition-transform group-hover:scale-105' />
                                    </Link>
                                    {wishlistLoading ? (
                                        <Loader2Icon className='animate-spin text-white absolute -top-1 -right-1 size-4' />
                                    ) : (
                                        wishlistData && wishlistData.count > 0 && (
                                            <span
                                                className='absolute -top-2 -right-2 min-w-5 h-5 rounded-full px-1.5 bg-red-500 text-white text-xs font-semibold flex items-center justify-center tabular-nums shadow-sm'
                                            >
                                                {wishlistData.count > 99 ? '99+' : wishlistData.count}
                                            </span>
                                        )
                                    )}
                                </>
                            )}
                        </div>

                        <div className='relative'>
                            {session.status === "authenticated" && (
                                <>
                                    <Link
                                        href="/cart"
                                        className='group inline-flex items-center justify-center rounded-full p-2 bg-gray-700/10 hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                                        aria-label='Open cart'
                                    >
                                        <ShoppingCartIcon className='text-white size-5 transition-transform group-hover:scale-105' />
                                    </Link>
                                    {cartLoading ? (
                                        <Loader2Icon className='animate-spin text-white absolute -top-1 -right-1 size-4' />
                                    ) : (
                                        <span
                                            className='absolute -top-2 -right-2 min-w-5 h-5 rounded-full px-1.5 bg-red-500 text-white text-sm font-bold flex items-center justify-center tabular-nums shadow-sm'
                                        >
                                            {cartData?.numOfCartItems ?? 0}
                                        </span>
                                    )}
                                </>
                            )}


                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
}
