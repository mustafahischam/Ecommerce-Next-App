import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Truck, Shield, Clock, Zap, HeadphonesIcon, Gift, Mail, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CategoryInterface } from '@/interfaces/category';

export default async function Home() {
  // Fetch featured categories and brands
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  try {
    const [categoriesRes, brandsRes] = await Promise.all([
      fetch(`${baseUrl}/api/categories`),
      fetch(`${baseUrl}/api/brands`)
    ]);

    // Handle responses with fallbacks
    let categories: CategoryInterface[] = [];
    let brands: CategoryInterface[] = [];

    if (categoriesRes.ok) {
      try {
        const categoriesData = await categoriesRes.json();
        categories = categoriesData?.data || [];
      } catch (e) {
        console.error('Error parsing categories:', e);
      }
    }

    if (brandsRes.ok) {
      try {
        const brandsData = await brandsRes.json();
        brands = brandsData?.data || [];
      } catch (e) {
        console.error('Error parsing brands:', e);
      }
    }

    // Take first 6 categories and 8 brands for featured sections
    const featuredCategories = categories?.slice(0, 6) || [];
    const featuredBrands = brands?.slice(0, 8) || [];

    return (
      <div className="min-h-screen">
        {/* Hero Slider Section */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <Carousel className="w-full h-full">
            <CarouselContent>
              <CarouselItem>
                <div className="relative h-[60vh] md:h-[70vh]">
                  <Image
                    src="/assets/slider-image-1.jpeg"
                    alt="Hero Banner 1"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 container mx-auto px-6 flex items-center">
                    <div className="max-w-2xl text-white">
                      <Badge className="mb-4 bg-primary text-primary-foreground">
                        🔥 Limited Time Offer
                      </Badge>
                      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        Shop Smart, Live Better
                      </h1>
                      <p className="text-xl md:text-2xl mb-8 text-gray-200">
                        Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/products">
                          <Button size="lg" className="text-lg px-8 py-3">
                            Shop Now <ArrowRight className="ml-2 size-5" />
                          </Button>
                        </Link>
                        <Link href="/categories">
                          <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-white/10 border-white text-white hover:bg-white hover:text-black">
                            Browse Categories
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="relative h-[60vh] md:h-[70vh]">
                  <Image
                    src="/assets/slider-image-2.jpeg"
                    alt="Hero Banner 2"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 container mx-auto px-6 flex items-center">
                    <div className="max-w-2xl text-white">
                      <Badge className="mb-4 bg-green-500 text-white">
                        ✨ New Collection
                      </Badge>
                      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        Trending Products
                      </h1>
                      <p className="text-xl md:text-2xl mb-8 text-gray-200">
                        Stay ahead with the latest trends and must-have items from top brands.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/brands">
                          <Button size="lg" className="text-lg px-8 py-3 bg-green-500 hover:bg-green-600">
                            Explore Brands <ArrowRight className="ml-2 size-5" />
                          </Button>
                        </Link>
                        <Link href="/products">
                          <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-white/10 border-white text-white hover:bg-white hover:text-black">
                            View All
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="relative h-[60vh] md:h-[70vh]">
                  <Image
                    src="/assets/slider-image-3.jpeg"
                    alt="Hero Banner 3"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 container mx-auto px-6 flex items-center">
                    <div className="max-w-2xl text-white">
                      <Badge className="mb-4 bg-purple-500 text-white">
                        🎁 Special Deals
                      </Badge>
                      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        Exclusive Offers
                      </h1>
                      <p className="text-xl md:text-2xl mb-8 text-gray-200">
                        Don&apos;t miss out on our exclusive deals and limited-time offers.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/products">
                          <Button size="lg" className="text-lg px-8 py-3 bg-purple-500 hover:bg-purple-600">
                            Shop Deals <Zap className="ml-2 size-5" />
                          </Button>
                        </Link>
                        <Link href="/brands">
                          <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-white/10 border-white text-white hover:bg-white hover:text-black">
                            Discover Brands
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </section>

        {/* Why Shop With Us Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ShopMart?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We&apos;re committed to providing you with the best shopping experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Truck className="size-8 text-primary" />
                  </div>
                  <CardTitle className="mb-2">Free Shipping</CardTitle>
                  <p className="text-muted-foreground">Free delivery on orders over $50</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="size-8 text-primary" />
                  </div>
                  <CardTitle className="mb-2">Secure Payment</CardTitle>
                  <p className="text-muted-foreground">100% secure payment processing</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="size-8 text-primary" />
                  </div>
                  <CardTitle className="mb-2">Fast Delivery</CardTitle>
                  <p className="text-muted-foreground">Express delivery in 24-48 hours</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <HeadphonesIcon className="size-8 text-primary" />
                  </div>
                  <CardTitle className="mb-2">24/7 Support</CardTitle>
                  <p className="text-muted-foreground">Round-the-clock customer service</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
              <p className="text-muted-foreground text-lg">Explore our diverse product collections</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {featuredCategories.map((category) => (
                <Link key={category._id} href={`/products?category=${category._id}`} className="group">
                  <Card className="text-center hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    <CardContent className="">
                      <div className="w-40 h-40 mx-auto mb-4 rounded-sm overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/categories">
                <Button variant="outline" size="lg">
                  View All Categories <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Sales Banner Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/assets/grocery-banner-2.jpeg"
              alt="Sale Banner"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          </div>
          <div className="relative z-10 container mx-auto px-6 text-center text-white">
            <Badge className="mb-4 bg-red-500 text-white animate-pulse">
              ⚡ FLASH SALE
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Up to 50% Off Everything!
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Limited time offer. Don&apos;t miss out on incredible savings!
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white text-lg px-8 py-3">
                <Zap className="mr-2 size-5" />
                Shop Sale Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Featured Brands Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Brands</h2>
              <p className="text-muted-foreground text-lg">Shop from your favorite trusted brands</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {featuredBrands.map((brand) => (
                <Link key={brand._id} href={`/products?brand=${brand._id}`} className="group">
                  <Card className="p-4 hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
                    <div className="aspect-square flex items-center justify-center">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        width={80}
                        height={80}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/brands">
                <Button variant="outline" size="lg">
                  View All Brands <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Creative VIP Newsletter Section */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-green-400/20 rounded-full blur-xl animate-pulse delay-500" />
          </div>

          <div className="relative z-10 container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                  <Sparkles className="size-5 text-yellow-300" />
                  <span className="text-sm font-medium">Exclusive Member Benefits</span>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Join the VIP Club
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
                Get early access to sales, exclusive discounts, and be the first to know about new arrivals
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="flex items-center justify-center gap-3 text-white/90">
                  <Gift className="size-6 text-yellow-300" />
                  <span className="font-medium">Early Sale Access</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-white/90">
                  <Mail className="size-6 text-blue-300" />
                  <span className="font-medium">Weekly Deals</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-white/90">
                  <Sparkles className="size-6 text-pink-300" />
                  <span className="font-medium">Member-Only Offers</span>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 rounded-full backdrop-blur-sm">
                  <input
                    type="email"
                    placeholder="Enter your email for VIP access"
                    className="flex-1 px-6 py-3 rounded-full text-white placeholder:text-white/70 bg-white/20 border-0 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <Button size="lg" className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-8">
                    <Sparkles className="mr-2 size-4" />
                    Join Now
                  </Button>
                </div>
                <p className="text-sm text-white/70 mt-3">
                  Join 50,000+ happy shoppers. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error loading home page:', error);

    // Return a fallback UI with empty data
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground mb-4">
            Something went wrong
          </h2>
          <p className="text-muted-foreground mb-6">
            Unable to load the home page content. Please try refreshing the page.
          </p>
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }
}
