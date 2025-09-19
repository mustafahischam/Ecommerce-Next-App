"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ProductInterface } from "@/interfaces/product"
import Image from 'next/image'
export default function ProductSlider({images,altContent}: {images: string[],altContent: string}) {
  return <>
          <Carousel>
                    <CarouselContent>
                       
                            {images.map((img , index) =>  <CarouselItem key={index}>
                                <Image src={img} className='w-full' alt={altContent} width={600} height={600} key={index}    />
                            
                        </CarouselItem>)}
                    
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
  </>
}
