"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className='min-h-[70vh] flex items-center'>
      <div className='container mx-auto px-12 w-full'>
        <div className='mx-auto max-w-2xl text-center'>
          <p className='text-sm font-mono tracking-wide text-muted-foreground'>ERROR 404</p>
          <h1 className='mt-2 text-4xl md:text-5xl font-extrabold tracking-tight'>
            Oops! We couldn&apos;t find that page
          </h1>
          <p className='mt-3 text-muted-foreground'>
            The page you are looking for may have been moved, deleted, or never existed.
          </p>

          <div className='mt-8 flex flex-col sm:flex-row items-center justify-center gap-3'>
            <Link href='/'>
              <Button className='w-full sm:w-auto'>
                <Home className='size-4 mr-2' />
                Back to Home
              </Button>
            </Link>
            <Button variant='secondary' className='w-full sm:w-auto' onClick={() => history.back()}>
              <ArrowLeft className='size-4 mr-2' />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
