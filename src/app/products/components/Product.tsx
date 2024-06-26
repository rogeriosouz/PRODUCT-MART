import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

type PromotionType = {
  id: string
  discount: string
}

interface ProductProps {
  name: string
  price: string
  image: string
  urlRedirect: string
  Promotion: null | PromotionType
  discountPrice: string
}

export function Product({
  name,
  image,
  price,
  urlRedirect,
  discountPrice,
  Promotion,
}: ProductProps) {
  return (
    <Link
      href={urlRedirect}
      className="flex h-[530px] w-[320px] flex-col  overflow-hidden rounded shadow-lg shadow-zinc-900/10 md:w-full"
    >
      <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden bg-zinc-100/40">
        <Image src={image} alt={name} width={280} height={280} />

        {Promotion !== null && (
          <div className="rotate-4 bg-bg-red absolute right-0 top-0 flex h-[31px] w-[147px] items-center justify-center">
            <p className="text-base font-normal text-white">
              {Promotion.discount}% OOF
            </p>
          </div>
        )}
      </div>

      <div className="w-full py-3 text-center">
        <h1 className="text-text-primary text-lg font-semibold capitalize">
          {name}
        </h1>

        <div className="flex items-center justify-center gap-2">
          <p
            className={clsx('h-full font-normal', {
              'text-sm text-zinc-900/80 line-through': Promotion !== null,
              'text-base': Promotion === null,
            })}
          >
            {price}
          </p>

          {Promotion !== null && (
            <p className="text-lg font-normal">{discountPrice}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
