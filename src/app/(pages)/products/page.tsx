import React from 'react'
import { ProductInterface } from '@/interfaces/product'
import { CategoryInterface } from '@/interfaces/category'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { StarIcon } from 'lucide-react'
import Link from 'next/link'
import AddToCart from '@/components/AddToCart/AddToCart'
import ProductSearch from '@/components/ProductSearch/ProductSearch'
import Pagination from '@/components/Pagination/Pagination'

interface ProductsPageProps {
  searchParams: {
    category?: string
    brand?: string
    sort?: string
    page?: string
    limit?: string
    'price[gte]'?: string
    'price[lte]'?: string
  }
}

export default async function Products({ searchParams }: ProductsPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  // Build products URL with all search parameters
  const productsParams = new URLSearchParams()
  if (searchParams.category) productsParams.set('category[in]', searchParams.category)
  if (searchParams.brand) productsParams.set('brand[in]', searchParams.brand)
  if (searchParams.sort) productsParams.set('sort', searchParams.sort)
  if (searchParams.page) productsParams.set('page', searchParams.page)
  if (searchParams.limit) productsParams.set('limit', searchParams.limit)
  if (searchParams['price[gte]']) productsParams.set('price[gte]', searchParams['price[gte]'])
  if (searchParams['price[lte]']) productsParams.set('price[lte]', searchParams['price[lte]'])

  // Set default limit if not specified
  if (!searchParams.limit) productsParams.set('limit', '12')

  const productsUrl = `${baseUrl}/api/products?${productsParams.toString()}`

  // Fetch products, categories, and brands in parallel
  const [productsResponse, categoriesResponse, brandsResponse] = await Promise.all([
    fetch(productsUrl),
    fetch(`${baseUrl}/api/categories`),
    fetch(`${baseUrl}/api/brands`)
  ])

  if (!productsResponse.ok) {
    throw new Error(`Failed to fetch products: ${productsResponse.status}`)
  }

  const responseData = await productsResponse.json()
  const { data: products, results, paginationResult }: {
    data: ProductInterface[]
    results: number
    paginationResult?: {
      currentPage: number
      numberOfPages: number
      limit: number
    }
  } = responseData

  // Get categories and brands for filters
  let categories: CategoryInterface[] = []
  let brands: CategoryInterface[] = []

  if (categoriesResponse.ok) {
    const categoriesData = await categoriesResponse.json()
    categories = categoriesData?.data || []
  }

  if (brandsResponse.ok) {
    const brandsData = await brandsResponse.json()
    brands = brandsData?.data || []
  }

  // Get filter display name
  let filterName = ''
  let filterType = ''

  if (searchParams.category) {
    const category = categories.find(cat => cat._id === searchParams.category)
    if (category) {
      filterName = category.name
      filterType = 'Category'
    }
  } else if (searchParams.brand) {
    const brand = brands.find(br => br._id === searchParams.brand)
    if (brand) {
      filterName = brand.name
      filterType = 'Brand'
    }
  }

  const currentPage = parseInt(searchParams.page || '1')
  const limit = parseInt(searchParams.limit || '12')
  const totalPages = paginationResult?.numberOfPages || Math.ceil(results / limit)

  return (
    <div className="container mx-auto py-6 px-4">
      {/* search and filters */}
      <ProductSearch categories={categories} brands={brands} />

      {/* results header */}
      <div className="flex items-center justify-between mt-8 mb-6">
        <div>
          {filterName ? (
            <>
              <h1 className='text-3xl font-bold'>{filterType}: {filterName}</h1>
              <Link href="/products" className="text-primary hover:underline mt-2 inline-block">
                ← View All Products
              </Link>
            </>
          ) : (
            <h1 className='text-3xl font-bold'>All Products</h1>
          )}
          <p className='text-muted-foreground mt-2'>{results || products.length} products found</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {
          products.map((product) =>
            <div key={product.id} className=' p-1'>

              <Card className=' '>
                <Link href={`/products/${product.id}`} >
                  <Image src={product.imageCover} className='w-full ' alt='' width={300} height={300} />
                  <CardHeader>
                    <CardTitle className=''>{product.title.split(' ').slice(0, 2).join(' ')}</CardTitle>
                    <CardDescription>{product.category.name}</CardDescription>
                    <CardAction>{product.brand.name} EGP</CardAction>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between ">
                      <div className='flex'>
                        <StarIcon className='text-yellow-500 fill-yellow-500' />
                        <p>{product.ratingsAverage}</p></div>
                    </div>
                    <p className='pt-2'>Price: <span className=' text font-bold'>{product.price}</span> EGP</p>

                  </CardContent>
                </Link>
                <AddToCart productId={product.id} />
              </Card>
            </div>)
        }
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={results || products.length}
          resultsPerPage={limit}
        />
      )}
    </div>
  )
}
