import { ImageIcon } from 'lucide-react'

export function LoadingItemCheckout() {
  return (
    <div className="flex  h-[120px] w-full animate-pulse  items-start gap-4 overflow-hidden rounded bg-white shadow-2xl">
      <div className="flex h-full w-[150px] items-center justify-center bg-bg-secondary">
        <ImageIcon className="h-10 w-10 text-zinc-900/10" />
      </div>
      <div className="flex h-full w-full items-start justify-between py-3">
        <div className="flex h-full flex-col gap-2">
          <div className="h-5 w-[160px] bg-bg-secondary"></div>
          <div className="h-2 w-[100px] bg-bg-secondary"></div>
          <div className="h-2 w-[100px] bg-bg-secondary"></div>
        </div>

        <div className="flex h-full w-[130px] items-center justify-center gap-2">
          <div className="flex h-2 w-12 items-center justify-center bg-bg-secondary"></div>
        </div>
      </div>
    </div>
  )
}
