import { useModal } from '@/hooks/useModal'
import { convertPrice } from '@/utils/convertePrice'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ModalRemoveProduct } from './ModalRemoveProduct'
import { Button } from '@/components/ui/button'

interface ProductsCartProps {
  id: string
  quant: number
  image: string
  name: string
  slug: string
  type: string
  priceTotalQuant: number
  discount: number
  updateQuant: ({
    idItemCart,
    quantItem,
  }: {
    idItemCart: string
    quantItem: number
  }) => void
  startLoadingCart: () => void
  stopLoadingCart: () => void
}

export function ProductsCart({
  id,
  quant,
  name,
  slug,
  priceTotalQuant,
  image,
  type,
  updateQuant,
  discount,
  startLoadingCart,
  stopLoadingCart,
}: ProductsCartProps) {
  const { close, open, openModal } = useModal()

  return (
    <div className="flex h-40 w-full items-start gap-4 overflow-hidden rounded bg-white shadow-xl">
      <Link
        href={`/products/${slug}`}
        className="flex h-full w-40 items-center justify-center overflow-hidden"
      >
        <Image src={image} alt="image" width={150} height={150} />
      </Link>

      <ModalRemoveProduct
        id={id}
        quant={quant}
        name={name}
        close={close}
        open={openModal}
        startLoadingCart={startLoadingCart}
        stopLoadingCart={stopLoadingCart}
      />

      <div className="flex h-full w-full items-start justify-between py-5">
        <div className="h-full">
          <h2 className="mb-1 text-lg font-normal text-zinc-900">{name}</h2>

          {type.length >= 1 && (
            <h2 className="mb-1 text-sm font-normal text-zinc-700/90">
              type: {type}
            </h2>
          )}

          <div className="flex items-center gap-2 md:flex-col md:items-start">
            <p className="text-bg-red text-lg font-bold">
              {convertPrice(priceTotalQuant)}
            </p>

            {discount >= 1 && (
              <p className="text-bg-red text-lg font-bold sm:hidden">|</p>
            )}

            {discount >= 1 && (
              <p className="text-bg-red/90 text-xs font-bold uppercase">
                Product {discount}% OFF
              </p>
            )}
          </div>
        </div>

        <div className="flex h-full w-[130px] items-center justify-center gap-3 md:w-[100px]">
          <Button
            onClick={() => {
              if (quant - 1 === 0) {
                open()
              } else {
                updateQuant({
                  idItemCart: id,
                  quantItem: quant - 1,
                })
              }
            }}
            variant={'default'}
            size={'icon'}
          >
            <Minus className="h-5 w-5 text-zinc-50" />
          </Button>

          <p className="text-bg-blue text-lg font-black">{quant}</p>

          <Button
            onClick={() =>
              updateQuant({
                idItemCart: id,
                quantItem: quant + 1,
              })
            }
            variant={'default'}
            size={'icon'}
          >
            <Plus className=" h-5 w-5 text-zinc-50" />
          </Button>
        </div>
      </div>
    </div>
  )
}
