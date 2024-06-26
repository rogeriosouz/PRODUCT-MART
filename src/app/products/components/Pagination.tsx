import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  totalPages: number
  isPrevPage: boolean
  isNextPage: boolean
  nextPage: (page: number) => void
  prevPage: (page: number) => void
  setPage: (page: number) => void
  page: number
}

export function Pagination({
  totalPages,
  isNextPage,
  isPrevPage,
  nextPage,
  prevPage,
  setPage,
  page,
}: PaginationProps) {
  return (
    <div className="mt-10 w-full ">
      <div className="flex items-center justify-start gap-2">
        <Button
          disabled={!isPrevPage}
          onClick={() => prevPage(page - 1)}
          size={'icon'}
          variant={'secondary'}
          className="flex items-center justify-center rounded transition-all hover:bg-primary hover:text-white disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5 " />
        </Button>

        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => setPage(index + 1)}
            size={'icon'}
            className={clsx(
              'flex items-center justify-center rounded text-white transition-all hover:bg-primary hover:text-white',
              {
                'bg-primary': page === index + 1,
                'bg-secondary text-black': page !== index + 1,
              },
            )}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          disabled={!isNextPage}
          onClick={() => nextPage(page + 1)}
          size={'icon'}
          variant={'secondary'}
          className="flex items-center justify-center rounded transition-all hover:bg-primary hover:text-white disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
