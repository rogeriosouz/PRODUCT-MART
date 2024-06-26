import { convertPrice } from '@/utils/convertePrice'
import Image from 'next/image'

interface ItemCheckoutProps {
  id: string
  name: string
  imageUrl: string
  type: string
  priceTotalQuant: number
  quant: number
}

export function ItemCheckout({
  id,
  imageUrl,
  name,
  priceTotalQuant,
  quant,
  type,
}: ItemCheckoutProps) {
  return (
    <div
      key={id}
      className="flex h-[120px] w-full justify-between  overflow-hidden rounded bg-white shadow-2xl"
    >
      <div className="flex gap-4">
        <div className="flex h-full w-[150px] items-center justify-center">
          <Image src={imageUrl} alt={name} width={120} height={120} />
        </div>

        <div className="h-full space-y-1 py-3">
          <h2 className="text-base font-normal text-zinc-500">{name}</h2>

          <p className="text-xs font-normal text-zinc-500">Type: {type}</p>

          <p className="text-sm font-bold text-bg-red">
            {convertPrice(priceTotalQuant)}
          </p>
        </div>
      </div>
      <div className="flex h-full w-[100px] items-center justify-center">
        <p className="text-base font-normal text-zinc-600">Quant: {quant}</p>
      </div>
    </div>
  )
}
