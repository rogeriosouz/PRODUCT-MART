import { Search } from 'lucide-react'
import Link from 'next/link'
import { UseFormWatch } from 'react-hook-form'

interface LoadingSearchProps {
  closeSearch: () => void

  watch: UseFormWatch<{
    search: string
  }>
}

export function LoadingSearch({ closeSearch, watch }: LoadingSearchProps) {
  return (
    <div className="absolute left-0 right-0 top-[100%] flex items-center justify-end rounded">
      <div className="w-full rounded-b bg-primary px-2 py-5">
        <div className="mb-5 w-full">
          <Link
            href={`/products?search=${watch('search')}`}
            onClick={closeSearch}
            className="flex h-10 w-full items-center gap-2 rounded px-2 text-white transition-colors hover:bg-secondary hover:text-black"
          >
            <Search className="h-5 w-5" />

            <p className="text-sm font-normal">
              Procurar por: {watch('search')}
            </p>
          </Link>
        </div>

        <h2 className="mb-2 text-base font-medium text-white">Products:</h2>

        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] w-full animate-pulse items-center justify-between rounded bg-zinc-900/20">
            <div className="flex items-center gap-3">
              <div className="h-[60px] w-[65px] rounded bg-zinc-900/20"></div>
              <div className="h-2 w-44 rounded bg-zinc-900/20"></div>
            </div>

            <div className="mr-2 h-2 w-40 rounded bg-zinc-900/20"></div>
          </div>

          <div className="flex h-[60px] w-full animate-pulse items-center justify-between rounded bg-zinc-900/20">
            <div className="flex items-center gap-3">
              <div className="h-[60px] w-[65px] rounded bg-zinc-900/20"></div>
              <div className="h-2 w-44 rounded bg-zinc-900/20"></div>
            </div>

            <div className="mr-2 h-2 w-40 rounded bg-zinc-900/20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
