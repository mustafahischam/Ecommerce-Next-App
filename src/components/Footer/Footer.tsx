"use client"
import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 border-t border-gray-700 mt-8">
            <div className="container mx-auto px-12 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h2 className="text-white text-2xl font-extrabold tracking-wide">ShopMart</h2>
                        <p className="mt-3 text-sm text-gray-400 max-w-sm">
                            Your one-stop shop for the latest products, great deals, and fast delivery.
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            <Link href="#" className="p-2 rounded-md bg-gray-700/60 hover:bg-gray-700 transition-colors" aria-label="Facebook">
                                <Facebook className="size-4 text-white" />
                            </Link>
                            <Link href="#" className="p-2 rounded-md bg-gray-700/60 hover:bg-gray-700 transition-colors" aria-label="Instagram">
                                <Instagram className="size-4 text-white" />
                            </Link>
                            <Link href="#" className="p-2 rounded-md bg-gray-700/60 hover:bg-gray-700 transition-colors" aria-label="Twitter">
                                <Twitter className="size-4 text-white" />
                            </Link>
                            <Link href="#" className="p-2 rounded-md bg-gray-700/60 hover:bg-gray-700 transition-colors" aria-label="YouTube">
                                <Youtube className="size-4 text-white" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-3">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
                            <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                            <li><Link href="/brands" className="hover:text-white transition-colors">Brands</Link></li>
                            <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-3">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
                        <p className="text-sm text-gray-400 mb-3">Subscribe to our newsletter for the latest deals.</p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                            }}
                            className="flex gap-2"
                        >
                            <div className="flex-1">
                                <label htmlFor="newsletter" className="sr-only">Email</label>
                                <input
                                    id="newsletter"
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    className="w-full h-10 rounded-md bg-gray-700/60 text-white placeholder:text-gray-400 px-3 border border-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                                />
                            </div>
                            <Button type="submit" className="shrink-0">
                                <Mail className="mr-2 size-4" />
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-sm flex flex-col md:flex-row items-center justify-between">
                    <p className="text-gray-400">© {new Date().getFullYear()} ShopMart. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Service</Link>
                        <Link href="#" className="hover:text-white">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
