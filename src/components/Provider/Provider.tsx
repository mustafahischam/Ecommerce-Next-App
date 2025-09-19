"use client"
import React from 'react'
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "@/components/Context/CartContext";
import WishlistContextProvider from "@/components/Context/WishlistContext";
import Footer from "@/components/Footer/Footer";
import { SessionProvider } from "next-auth/react";

export default function Provider({ children }: { children: React.ReactNode }) { 
    return (
    <SessionProvider>
    <CartContextProvider>
      <WishlistContextProvider>
        <Navbar />
        <div className="container mx-auto py-4">
          <Toaster />
          {children}
        </div>
        <Footer />
        </WishlistContextProvider>
      </CartContextProvider>
    </SessionProvider>
    )
}
