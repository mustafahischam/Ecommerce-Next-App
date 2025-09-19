"use client"
import React, { useContext } from 'react'
import { WishlistContext } from '@/components/Context/WishlistContext'
import Loading from '../loading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import formatCurrency from '@/Helpers/formatPrice'
import AddToCart from '@/components/AddToCart/AddToCart'

export default function Wishlist() {
  const { wishlistData, isLoading } = useContext(WishlistContext)

  if (isLoading) {
    return <Loading />
  }

  if (!wishlistData?.data || wishlistData.data.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center flex-col'>
        <h2 className='text-2xl text-muted-foreground text-center mb-3 font-bold'>Your Wishlist Is Empty</h2>
        <Link href="/products">
          <Button variant='outline' className='text-2xl mb-3 font-semibold cursor-pointer flex bg-primary border-primary text-primary-foreground items-center shadow-2xl justify-center gap-2 ms-auto'>
            <ShoppingCartIcon className='size-4' />
            Start Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className='text-3xl font-bold mb-8'>My Wishlist</h1>
      <p className='text-muted-foreground mb-6'>{wishlistData.count} items in your wishlist</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistData.data.filter(product => product.id || product._id).map((product) => (
          <Card key={product.id || product._id} className='hover:shadow-lg transition-all duration-300'>
            <div className='relative'>
              <Link href={`/products/${product.id}`}>
                {product.imageCover ? (
                  <Image
                    src={product.imageCover}
                    alt={product.title || 'Product image'}
                    width={300}
                    height={200}
                    className='w-full h-48 object-cover rounded-t-lg'
                  />
                ) : (
                  <div className='w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center'>
                    <span className='text-gray-500'>No Image</span>
                  </div>
                )}
              </Link>
            </div>
            <CardHeader>
              <CardTitle className='text-lg line-clamp-2'>{product.title}</CardTitle>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>{product.category?.name || 'Uncategorized'}</span>
                <span className='font-bold text-lg'>{formatCurrency(product.price)}</span>
              </div>
            </CardHeader>
            <CardContent>
              <AddToCart productId={product.id} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
