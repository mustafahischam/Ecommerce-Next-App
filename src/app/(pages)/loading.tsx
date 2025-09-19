import React from 'react'

export default function Loading() {
    return (
        <div className='min-h-[60vh] flex items-center'>
            <div className='container mx-auto px-12 w-full'>
                <div className='mx-auto max-w-xl text-center'>
                    <h1 className='text-3xl md:text-4xl font-extrabold tracking-wide bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent'>
                        ShopMart
                    </h1>

                    <div className='mt-4 relative inline-flex items-center justify-center'>
                        <div className='relative inline-flex items-center justify-center size-24'>
                            <div className='absolute inset-0 rounded-full border-2 border-gray-700/50 border-t-transparent animate-spin [animation-duration:1.2s]' aria-hidden='true' />
                            <div className='absolute inset-2 rounded-full border-2 border-gray-600/40 border-b-transparent animate-[spin_1.8s_linear_infinite] [animation-direction:reverse]' aria-hidden='true' />
                            <div className='relative size-16 rounded-2xl bg-background border border-input shadow-sm flex items-center justify-center'>
                                <span className='text-3xl font-extrabold tracking-widest'>S</span>
                            </div>
                        </div>
                    </div>

                    <h2 className='mt-5 text-xl font-semibold'>Loading...</h2>
                    <p className='mt-1 text-sm text-muted-foreground'>Getting your shopping experience ready.</p>

                    <div className='mt-6 space-y-3'>
                        <div className='h-3 w-3/4 mx-auto rounded bg-accent/60' />
                        <div className='h-3 w-2/3 mx-auto rounded bg-accent/50' />
                        <div className='h-3 w-1/2 mx-auto rounded bg-accent/40' />
                    </div>
                </div>
            </div>
        </div>
    )
}
