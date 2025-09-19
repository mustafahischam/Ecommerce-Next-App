import { CategoryInterface } from './category';


export interface ProductInterface {
  sold?: number
  images: string[]
  subcategory: CategoryInterface[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryInterface
  brand: CategoryInterface
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string

}

