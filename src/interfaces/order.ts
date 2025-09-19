export interface OrderProductItem {
    count: number
    price: number
    product: {
        _id: string
        title: string
        imageCover?: string
    }
}

export interface OrderItem {
    _id: string
    paymentMethodType?: string
    isPaid?: boolean
    isDelivered?: boolean
    totalOrderPrice: number
    createdAt: string
    updatedAt?: string
    shippingAddress?: {
        details?: string
        phone?: string
        city?: string
    }
    cartItems?: OrderProductItem[]
}

export interface OrdersResponse {
    status?: string
    message?: string
    data: OrderItem[]
}




