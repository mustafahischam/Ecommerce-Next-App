"use client"
import { Button } from '@/components/ui/button'
import formatCurrency from '@/Helpers/formatPrice'
import { MinusIcon, PlusIcon, TrashIcon, Loader2Icon, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useState, useEffect } from 'react'
import { CartContext } from '@/components/Context/CartContext'
import Loading from '../loading'
import { toast } from 'react-hot-toast'
import { removeFromCartAction, updateCartItemAction, clearCartAction } from '@/app/(pages)/cart/_action/actions'

import CheckOut from '@/components/CheckOut/CheckOut'
export default function Cart() {
  const [removingItemId, setRemovingItemId] = useState<string | null>(null)
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null)
  const [clearingCart, setClearingCart] = useState<boolean>(false)
  const { cartData, isLoading, getCart, setCartData } = useContext(CartContext)

  useEffect(() => {
    if (cartData?.data?.products && cartData.data.products.length > 0 && typeof cartData.data.products[0].product === 'string') {
      getCart()
    }
  }, [cartData?.data?.products, getCart])

  async function removeCartItem(productId: string) {
    setRemovingItemId(productId)

    try {
      const result = await removeFromCartAction(productId)

      if (result.success) {
        setCartData(result.data)
        toast.success('Item removed from cart')
      } else {
        toast.error(result.error || 'Failed to remove item')
      }
    } catch {
      toast.error('Something went wrong')
    }

    setRemovingItemId(null)
  }
  async function updateCartItem(productId: string, count: number) {
    if (count == 0) {
      removeCartItem(productId)
    } else {
      setUpdatingItemId(productId)

      try {
        const result = await updateCartItemAction(productId, count)

        if (result.success) {
          setCartData(result.data)
          toast.success('Item Quantity Updated')
        } else {
          toast.error(result.error || 'Failed to update item')
        }
      } catch (error) {
        toast.error('Something went wrong')
      }

      setUpdatingItemId(null)
    }
  }

  async function clearCart() {
    setClearingCart(true)

    try {
      const result = await clearCartAction()

      if (result.success) {
        setCartData(result.data)
        toast.success('Cart cleared successfully')
      } else {
        toast.error(result.error || 'Failed to clear cart')
      }
    } catch {
      toast.error('Something went wrong')
    }

    setClearingCart(false)
  }


  return (
    <>
      {isLoading || (cartData?.data?.products && cartData.data.products.length > 0 && typeof cartData.data.products[0].product === 'string') ? <Loading /> : (cartData?.numOfCartItems ?? 0) > 0 ?
        <div className="container mx-auto py-6 px-4">
          <h1 className='text-2xl font-bold'>Shopping Cart</h1>
          <p className='text-muted-foreground mt-1'>1 item in your cart</p>


          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
            {/* items column */}
            <div className='lg:col-span-2 space-y-4'>


              {cartData?.data.products.map((item) =>
                <div
                  key={item.product._id}
                  className='flex gap-4 rounded-xl border p-4 shadow-sm bg-card'>
                  <img src={item.product.imageCover}
                    alt={item.product.title}
                    className='w-24 h-24 object-cover rounded-lg'
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className='text-xl font-semibold leading-tight tracking-wide'>{item.product.title}</h3>
                        <p className='text-sm text-muted-foreground mt-1 font-medium'>{item.product.category.name} • {item.product.brand.name}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-bold text-foreground">
                          {formatCurrency(item.price)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button className='cursor-pointer' variant="outline" size="icon" disabled={item.count == 1} onClick={() => updateCartItem(item.product.id, item.count - 1)}>
                          <MinusIcon className='size-4 cu' />
                        </Button>
                        <span className='font-semibold text-center min-w-8 text-base'>{updatingItemId === item.product.id ? <Loader2Icon className='size-4 animate-spin' /> : item.count}</span>
                        <Button className='cursor-pointer' variant="outline" size="icon" onClick={() => updateCartItem(item.product.id, item.count + 1)}>
                          <PlusIcon className='size-4' />
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className='ml-4'
                        disabled={removingItemId === item.product.id}
                        onClick={() => removeCartItem(item.product.id)}
                      >
                        {removingItemId === item.product.id ? (
                          <Loader2Icon className='size-4 animate-spin' />
                        ) : (
                          <TrashIcon className='size-4 text-destructive' />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>)}


            </div>

            {/* summary column */}
            <div className="lg:col-span-1 sticky top-16">
              <div className="rounded-xl border p-6 shadow-sm bg-card">
                <h3 className='text-xl font-bold tracking-wide'>Order Summary</h3>

                <div className='mt-4 space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground font-medium'>Items ({cartData?.numOfCartItems ?? 0})</span>
                    <span className='text-sm font-semibold'>{formatCurrency(cartData?.data.totalCartPrice ?? 0)}</span>
                  </div>

                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground font-medium'>Shipping</span>
                    <span className='text-sm text-green-600 font-bold'>Free</span>
                  </div>

                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground font-medium'>Tax</span>
                    <span className='text-sm font-medium'>Calculated at checkout</span>
                  </div>

                  <div className='pt-3 mt-3 border-t flex items-center justify-between'>
                    <span className='text-lg font-bold'>Total</span>
                    <span className='text-lg font-bold'>{formatCurrency(cartData?.data.totalCartPrice ?? 0)}</span>
                  </div>
                </div>

                <div className='mt-6 space-y-3'>
                  {cartData?.cartId && <CheckOut cartId={cartData.cartId} />}
                  <Link href="/products">
                    <Button variant='secondary' className='w-full h-11 text-base font-medium'>
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
              <Button onClick={clearCart} disabled={clearingCart} variant='outline' className='mt-4 text-destructive hover:text-destructive font-semibold flex items-center shadow-2xl  justify-center gap-2 ms-auto'
              >

                {clearingCart ? <Loader2Icon className='size-4 animate-spin' /> : <TrashIcon className='size-4' />}
                Clear Cart
              </Button>
            </div>
          </div>


        </div> : <div className='min-h-screen flex items-center justify-center flex-col'>
          <h2 className='text-2xl text-muted-foreground  text-center mb-3 font-bold'>Your Cart Is Empty</h2>
          <Link href="/products" >
            <Button variant='outline' className='text-2xl mb-3  font-semibold cursor-pointer flex bg-primary border-primary text-primary-foreground   items-center shadow-2xl  justify-center gap-2 ms-auto'>
              <ShoppingCartIcon className='size-4 ' />
              keep shopping
            </Button>
          </Link>
        </div>
      }
    </>
  )
}
