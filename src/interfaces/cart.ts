import { ProductInterface } from "./product"

export interface CartResponse {
  status: string
  message?: string
  numOfCartItems: number
  cartId: string
  data: Data
}

export interface CheckoutResponse {
  status: string
  session: {
    url: string
    [key: string]: unknown
  }
}

export interface Data {
  _id: string
  cartOwner: string
  products: Product[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface Product {
  count: number
  _id: string
  product: ProductInterface
  price: number
}

