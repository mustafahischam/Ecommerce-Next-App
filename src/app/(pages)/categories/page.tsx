import React from 'react'
import { CategoryInterface } from '@/interfaces/category'
import Image from 'next/image'
import Link from 'next/link'

export default async function Categories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/categories`)

    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }

    const data = await response.json()
    const { data: categories }: { data: CategoryInterface[] } = data

    return (
      <div className="container mx-auto py-8 px-6">
        <div className="text-center mb-12">
          <h1 className='text-4xl font-bold text-foreground mb-3'>Shop by Category</h1>
          <p className='text-muted-foreground text-lg'>Discover our curated product collections</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Link key={category._id} href={`/products?category=${category._id}`} className="group">
              <div className='text-center w-50'>
                <div className='relative mb-4'>
                  <div className='w-52 h-69 mx-auto rounded-2xl overflow-hidden bg-background border shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1'>
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={300}
                      height={300}
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                  </div>
                </div>
                <h3 className='text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300'>
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading categories:', error)
    return (
      <div className="container mx-auto py-8 px-6">
        <div className="text-center">
          <h1 className='text-4xl font-bold text-foreground mb-3'>Categories</h1>
          <p className='text-muted-foreground text-lg'>Unable to load categories. Please try again later.</p>
        </div>
      </div>
    )
  }
}

