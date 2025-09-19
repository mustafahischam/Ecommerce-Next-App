
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import { ProductInterface } from '@/interfaces/product'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { StarIcon } from 'lucide-react'
import ProductSlider from '@/components/ProductSlider/ProductSlider'
import AddToCart from '@/components/AddToCart/AddToCart'
export default async function ProductDetails({ params }: { params: Params }) {

    const { productId } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/products/` + productId);

    if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`)
    }

    const responseData = await response.json();
    const { data: product }: { data: ProductInterface } = responseData;
    return <>

        <Card className='grid md:grid-cols-3 items-center '>
            <div className="grid col-span-1 p-4">

                <ProductSlider images={product.images} altContent={product.title} />
            </div>
            <div className="md:grid-cols-2 space-y-4 col-span-2">
                <CardHeader>
                    <CardDescription>{product.brand.name}</CardDescription>
                    <CardTitle className='text-2xl font-bold'>{product.title}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <CardDescription>{product.category.name}</CardDescription>
                    <div className="flex justify-between gap-10 items-center mt-2">
                        <p className='flex items-center gap-1'><span >{product.ratingsAverage}</span> <StarIcon className='text-yellow-500 fill-yellow-500' /></p>
                        <p>{product.ratingsQuantity} reviews</p>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <p className='text-sm'><span className=' font-bold'>{product.quantity}</span> Available</p>
                        <p className='flex items-center gap-1'><span className=' font-bold'>{product.price}</span> EGP</p>
                    </div>
                </CardContent>
                <AddToCart productId={product.id} />
            </div>

        </Card>


    </>


}
