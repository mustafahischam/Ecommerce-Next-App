"use client"

import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationProps {
    currentPage: number
    totalPages: number
    totalResults: number
    resultsPerPage: number
}

export default function Pagination({ currentPage, totalPages, totalResults, resultsPerPage }: PaginationProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams)
        if (page === 1) {
            params.delete('page')
        } else {
            params.set('page', page.toString())
        }
        router.push(`/products?${params.toString()}`)
    }

    const getVisiblePages = () => {
        const pages = []
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push('...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            }
        }

        return pages
    }

    if (totalPages <= 1) return null

    const startResult = (currentPage - 1) * resultsPerPage + 1
    const endResult = Math.min(currentPage * resultsPerPage, totalResults)

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="text-sm text-muted-foreground">
                Showing {startResult}-{endResult} of {totalResults} results
            </div>

            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeftIcon className="size-4" />
                    Previous
                </Button>

                {getVisiblePages().map((page, index) => (
                    <div key={index}>
                        {page === '...' ? (
                            <Button variant="ghost" size="sm" disabled>
                                <MoreHorizontalIcon className="size-4" />
                            </Button>
                        ) : (
                            <Button
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => goToPage(page as number)}
                            >
                                {page}
                            </Button>
                        )}
                    </div>
                ))}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                    <ChevronRightIcon className="size-4" />
                </Button>
            </div>
        </div>
    )
}


