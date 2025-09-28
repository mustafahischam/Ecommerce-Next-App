"use client"
import React, { useState } from 'react'
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
import { ShoppingCartIcon, User2Icon, HeartIcon, MenuIcon, XIcon } from 'lucide-react'
import { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
import { WishlistContext } from '../Context/WishlistContext'
import { Loader2Icon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
export default function Navbar() {
    const { cartData, isLoading: cartLoading } = useContext(CartContext)
    const { wishlistData, isLoading: wishlistLoading } = useContext(WishlistContext)
    const session = useSession()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    return <>


        <nav className='bg-gradient-to-r from-gray-800 to-gray-900 py-4 shadow-md border-b border-gray-700 sticky top-0 z-50'>
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="relative">
                            {/* Shopping bag icon with gradient */}
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-950 to-cyan-900 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                                <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            {/* Small decorative dot */}
                            <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-blue-200 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg sm:text-2xl font-extrabold text-white leading-none group-hover:text-blue-300 transition-colors duration-200">
                                Shop<span className="text-blue-400">Mart</span>
                            </h1>
                            <p className="text-xs text-gray-400 hidden sm:block">Your Shopping Destination</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden md:block">
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
                        {session.status == "authenticated" && <h2 className='text-white mr-2 hidden sm:block'>
                            Hello {session.data?.user.name}</h2>}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type="button"
                                    aria-label="Open user menu"
                                    className='mr-2 hidden md:inline-flex items-center justify-center rounded-full p-2 bg-gray-700/10 hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'
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


                        <div className='relative mr-1 sm:mr-2 hidden md:block'>
                            {session.status === "authenticated" && (
                                <>
                                    <Link
                                        href="/wishlist"
                                        className='group inline-flex items-center justify-center rounded-full p-1.5 sm:p-2 bg-gray-700/10 hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                                        aria-label='Open wishlist'
                                    >
                                        <HeartIcon className='text-white size-4 sm:size-5 transition-transform group-hover:scale-105' />
                                    </Link>
                                    {wishlistLoading ? (
                                        <Loader2Icon className='animate-spin text-white absolute -top-1 -right-1 size-3 sm:size-4' />
                                    ) : (
                                        wishlistData && wishlistData.count > 0 && (
                                            <span
                                                className='absolute -top-1 -right-1 sm:-top-2 sm:-right-2 min-w-4 h-4 sm:min-w-5 sm:h-5 rounded-full px-1 sm:px-1.5 bg-red-500 text-white text-xs font-semibold flex items-center justify-center tabular-nums shadow-sm'
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
                                        className='group inline-flex items-center justify-center rounded-full p-1.5 sm:p-2 bg-gray-700/10 hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                                        aria-label='Open cart'
                                    >
                                        <ShoppingCartIcon className='text-white size-4 sm:size-5 transition-transform group-hover:scale-105' />
                                    </Link>
                                    {cartLoading ? (
                                        <Loader2Icon className='animate-spin text-white absolute -top-1 -right-1 size-3 sm:size-4' />
                                    ) : (
                                        <span
                                            className='absolute -top-1 -right-1 sm:-top-2 sm:-right-2 min-w-4 h-4 sm:min-w-5 sm:h-5 rounded-full px-1 sm:px-1.5 bg-red-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center tabular-nums shadow-sm'
                                        >
                                            {cartData?.numOfCartItems ?? 0}
                                        </span>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => {
                                if (isMobileMenuOpen) {
                                    setIsClosing(true)
                                    setTimeout(() => {
                                        setIsMobileMenuOpen(false)
                                        setIsClosing(false)
                                    }, 300)
                                } else {
                                    setIsMobileMenuOpen(true)
                                }
                            }}
                            className="md:hidden ml-2 inline-flex items-center justify-center rounded-full p-2 bg-gray-700/10 hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label="Toggle mobile menu"
                        >
                            <div className="relative w-5 h-5">
                                <MenuIcon className={`text-white size-5 transition-all duration-400 ${isMobileMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                                    }`} />
                                <XIcon className={`text-white size-5 absolute top-0 left-0 transition-all duration-400 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                                    }`} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
            <div className={`md:hidden fixed inset-0 z-50 bg-gradient-to-b from-gray-800 to-gray-900 transform transition-transform duration-300 ease-in-out ${isClosing ? 'translate-x-full' : 'translate-x-0'
                } animate-in slide-in-from-right`}>
                <div className="h-full flex flex-col">
                    {/* Fixed Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 sticky top-0 z-10">
                        <Link href="/" className="flex items-center space-x-2 group" onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="relative">
                                {/* Shopping bag icon with gradient */}
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-950 to-cyan-900 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                                    <ShoppingCartIcon className="w-5 h-5 text-white" />
                                </div>
                                {/* Small decorative dot */}
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-200 rounded-full animate-pulse"></div>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-extrabold text-white leading-none group-hover:text-blue-300 transition-colors duration-200">
                                    Shop<span className="text-blue-400">Mart</span>
                                </h1>
                                <p className="text-xs text-gray-400">Your Shopping Destination</p>
                            </div>
                        </Link>
                        <button
                            onClick={() => {
                                setIsClosing(true)
                                setTimeout(() => {
                                    setIsMobileMenuOpen(false)
                                    setIsClosing(false)
                                }, 300)
                            }}
                            className="p-2 rounded-full bg-gray-700/10 hover:bg-gray-700 transition-colors"
                            aria-label="Close mobile menu"
                        >
                            <XIcon className="text-white size-6" />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-6">

                            {/* Mobile Navigation Links */}
                            <nav className="space-y-2 mb-8">
                                <Link
                                    href="/products"
                                    className="block px-6 py-4 text-white text-lg font-semibold hover:text-blue-300 transition-colors duration-200 rounded-lg hover:bg-gray-700"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Products
                                </Link>
                                <Link
                                    href="/categories"
                                    className="block px-6 py-4 text-white text-lg font-semibold hover:text-blue-300 transition-colors duration-200 rounded-lg hover:bg-gray-700"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Categories
                                </Link>
                                <Link
                                    href="/brands"
                                    className="block px-6 py-4 text-white text-lg font-semibold hover:text-blue-300 transition-colors duration-200 rounded-lg hover:bg-gray-700"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Brands
                                </Link>
                            </nav>

                            {/* Mobile User Actions */}
                            <div className="border-t border-gray-700 pt-6">
                                {session.status === "authenticated" ? (
                                    <div className="space-y-4">
                                        <div className="text-white mb-6">
                                            <p className="text-gray-400">Welcome back</p>
                                            <p className="text-xl font-semibold">{session.data?.user.name}</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Link
                                                href="/profile"
                                                className="flex items-center space-x-4 px-6 py-4 bg-gray-700/10 hover:bg-gray-700 rounded-lg transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <User2Icon className="text-white size-5" />
                                                <span className="text-white text-lg">Profile</span>
                                            </Link>

                                            <Link
                                                href="/allorders"
                                                className="flex items-center space-x-4 px-6 py-4 bg-gray-700/10 hover:bg-gray-700 rounded-lg transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <ShoppingCartIcon className="text-white size-5" />
                                                <span className="text-white text-lg">Orders</span>
                                            </Link>

                                            <Link
                                                href="/addresses"
                                                className="flex items-center space-x-4 px-6 py-4 bg-gray-700/10 hover:bg-gray-700 rounded-lg transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <User2Icon className="text-white size-5" />
                                                <span className="text-white text-lg">Addresses</span>
                                            </Link>

                                            <Link
                                                href="/wishlist"
                                                className="flex items-center space-x-4 px-6 py-4 bg-gray-700/10 hover:bg-gray-700 rounded-lg transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <HeartIcon className="text-white size-5" />
                                                <span className="text-white text-lg">Wishlist</span>
                                                {wishlistData && wishlistData.count > 0 && (
                                                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full ml-auto">
                                                        {wishlistData.count > 99 ? '99+' : wishlistData.count}
                                                    </span>
                                                )}
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    signOut({ callbackUrl: "/" })
                                                    setIsMobileMenuOpen(false)
                                                }}
                                                className="flex items-center space-x-4 px-6 py-4 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-colors w-full text-left"
                                            >
                                                <User2Icon className="text-red-400 size-5" />
                                                <span className="text-red-400 text-lg">Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Link
                                            href="/login"
                                            className="flex items-center space-x-4 px-6 py-4 bg-gray-700/10 hover:bg-gray-700 rounded-lg transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <User2Icon className="text-white size-5" />
                                            <span className="text-white text-lg">Login</span>
                                        </Link>

                                        <Link
                                            href="/register"
                                            className="flex items-center space-x-4 px-6 py-4 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <User2Icon className="text-blue-400 size-5" />
                                            <span className="text-blue-400 text-lg">Register</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
}
