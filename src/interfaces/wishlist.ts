import { ProductInterface } from "./product"

export interface WishlistResponse {
    status: string
    message?: string
    count: number
    data: ProductInterface[]
}

export interface WishlistItem {
    _id: string
    product: ProductInterface
    user: string
}
