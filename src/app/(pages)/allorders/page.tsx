

'use client'

import { useEffect, useState } from 'react'
import { getUserOrdersAction } from './_action/actions'
import type { OrdersResponse, OrderItem } from '@/interfaces'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Loader2Icon, PackageIcon, TruckIcon, BadgeCheckIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function AllOrders() {
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  async function loadOrders() {
    setLoading(true)
    const userId = localStorage.getItem('userId')
    if (!userId) {
      toast.error('User ID not found')
      setLoading(false)
      return
    }
    const result = await getUserOrdersAction(userId)
    if (result.success) {
      const payload = result.data as OrdersResponse | OrderItem[]
      const normalized = Array.isArray(payload) ? payload : payload?.data ?? []
      setOrders(normalized)
    } else {
      toast.error(result.error || 'Failed to fetch orders')
    }
    setLoading(false)
  }

  useEffect(() => {
    loadOrders()
  }, [])

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Button variant="outline" onClick={loadOrders} disabled={loading}>
          {loading ? (<><Loader2Icon className="size-4 mr-2 animate-spin" />Refreshing...</>) : 'Refresh'}
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground"><Loader2Icon className="size-4 animate-spin" /> Loading orders...</div>
      ) : orders.length === 0 ? (
        <Card className="p-6 text-muted-foreground">
          You have no orders yet. <Link href="/products" className="underline ml-1">Start shopping</Link>
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order._id} className="p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <PackageIcon className="size-4 text-muted-foreground" />
                    <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                  <p className="text-sm">Total: <span className="font-semibold">{order.totalOrderPrice}</span></p>
                  {order.shippingAddress && (
                    <p className="text-sm text-muted-foreground">
                      Ship to: {order.shippingAddress.details || '—'}, {order.shippingAddress.city || '—'} ({order.shippingAddress.phone || '—'})
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-sm">
                    <TruckIcon className="size-4 text-muted-foreground" /> {order.isDelivered ? 'Delivered' : 'In transit'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm">
                    <BadgeCheckIcon className="size-4 text-muted-foreground" /> {order.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
              </div>

              {order.cartItems && order.cartItems.length > 0 && (
                <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {order.cartItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      {item.product?.imageCover && (
                        <img src={item.product.imageCover} alt={item.product.title} className="w-14 h-14 rounded object-cover border" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-medium">{item.product?.title}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.count} • {item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


