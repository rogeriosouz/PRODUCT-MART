import { Image as ImageIcon } from 'lucide-react'
export function LoadingProduct() {
  return (
    <div className="flex h-[530px] w-[320px] flex-col">
      <div className="flex w-full flex-1 animate-pulse items-center justify-center bg-zinc-600/30">
        <ImageIcon className="h-20 w-20 text-zinc-200" />
      </div>

      <div className="h-[76px] w-full animate-pulse bg-zinc-600/10 text-center"></div>
    </div>
  )
}
