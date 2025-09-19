import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Brand interface (same structure as Category)
interface BrandInterface {
  _id: string
  name: string
  slug: string
  image: string
}

export default async function Brands() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/brands`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch brands: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const { data: brands }: { data: BrandInterface[] } = data

    if (!brands || brands.length === 0) {
      return (
        <div className="container mx-auto py-8 px-6">
          <div className="text-center">
            <h1 className='text-4xl font-bold text-foreground mb-3'>Shop by Brand</h1>
            <p className='text-muted-foreground text-lg'>No brands available at the moment.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="container mx-auto py-8 px-6">
        <div className="text-center mb-12">
          <h1 className='text-4xl font-bold text-foreground mb-3'>Shop by Brand</h1>
          <p className='text-muted-foreground text-lg'>Explore products from your favorite brands</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {brands.map((brand) => (
            <Link key={brand._id} href={`/products?brand=${brand._id}`} className="group">
              <div className='text-center w-50'>
                <div className='relative mb-4'>
                  <div className='w-52 h-52 mx-auto rounded-2xl overflow-hidden bg-background border shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1'>
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={200}
                      height={200}
                      className='w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500'
                    />
                  </div>
                </div>
                <h3 className='text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300'>
                  {brand.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading brands:', error)
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong'

    return (
      <div className="container mx-auto py-8 px-6">
        <div className="text-center">
          <h1 className='text-4xl font-bold text-foreground mb-3'>Brands</h1>
          <p className='text-muted-foreground text-lg mb-4'>Unable to load brands. Please try again later.</p>
          <p className='text-sm text-red-500 bg-red-50 p-3 rounded-lg max-w-md mx-auto'>
            Error: {errorMessage}
          </p>
        </div>
      </div>
    )
  }
}


