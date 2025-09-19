"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react'
import { CategoryInterface } from '@/interfaces/category'

interface ProductSearchProps {
    categories: CategoryInterface[]
    brands: CategoryInterface[]
}

export default function ProductSearch({ categories, brands }: ProductSearchProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
    const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'all')
    const [minPrice, setMinPrice] = useState(searchParams.get('price[gte]') || '')
    const [maxPrice, setMaxPrice] = useState(searchParams.get('price[lte]') || '')
    const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'default')
    const [showFilters, setShowFilters] = useState(false)

    const applyFilters = () => {
        const params = new URLSearchParams()

        if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory)
        if (selectedBrand && selectedBrand !== 'all') params.set('brand', selectedBrand)
        if (minPrice) params.set('price[gte]', minPrice)
        if (maxPrice) params.set('price[lte]', maxPrice)
        if (sortBy && sortBy !== 'default') params.set('sort', sortBy)

        router.push(`/products?${params.toString()}`)
    }

    const clearFilters = () => {
        setSelectedCategory('all')
        setSelectedBrand('all')
        setMinPrice('')
        setMaxPrice('')
        setSortBy('default')
        router.push('/products')
    }


    return (
        <div className="space-y-4">
            {/* filter controls */}
            <div className="flex gap-2">
                <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="flex-1 sm:flex-none">
                    <SlidersHorizontalIcon className="size-4 mr-2" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
                <Button onClick={applyFilters}>
                    Apply Filters
                </Button>
            </div>

            {/* filters panel */}
            {showFilters && (
                <Card className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* category filter */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">Category</label>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category._id} value={category._id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* brand filter */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">Brand</label>
                            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Brands" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Brands</SelectItem>
                                    {brands.map((brand) => (
                                        <SelectItem key={brand._id} value={brand._id}>
                                            {brand.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* price range */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">Min Price</label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Max Price</label>
                            <Input
                                type="number"
                                placeholder="1000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>

                        {/* sort */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">Sort By</label>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Default" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">Default</SelectItem>
                                    <SelectItem value="price">Price: Low to High</SelectItem>
                                    <SelectItem value="-price">Price: High to Low</SelectItem>
                                    <SelectItem value="title">Name: A to Z</SelectItem>
                                    <SelectItem value="-title">Name: Z to A</SelectItem>
                                    <SelectItem value="-ratingsAverage">Highest Rated</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Button onClick={applyFilters} className="flex-1">
                            Apply Filters
                        </Button>
                        <Button onClick={clearFilters} variant="outline">
                            <XIcon className="size-4 mr-2" />
                            Clear
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    )
}
