'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { convertPrice } from '@/utils/convertePrice'
import { useProductsSlider } from '@/hooks/useProductsSlider'
import { Product } from '@/app/products/components/Product'
import { ProductType } from '@/types/ResponseProductsType'

interface ProductsSliderProps {
  productsList: ProductType[]
}

export function ProductsSlider({ productsList }: ProductsSliderProps) {
  const { canNext, canPrev, next, outerDivRef, prev } = useProductsSlider({
    productsListLength: productsList.length,
  })

  return (
    <div className="flex w-full items-center justify-center">
      <button
        onClick={prev}
        disabled={!canPrev}
        className={`mr-2 flex h-10 w-10 items-center justify-center bg-zinc-900 ${
          !canPrev && 'cursor-not-allowed opacity-50'
        }`}
      >
        <ChevronLeft className="h-5 w-5 text-zinc-50" />
      </button>

      <div
        ref={outerDivRef}
        className="relative flex h-[530px] w-full overflow-hidden scroll-smooth"
      >
        <div className="absolute flex h-full gap-5">
          {productsList.map((product) => (
            <Product
              key={product.id}
              Promotion={product.Promotion}
              discountPrice={convertPrice(product.discountPrice)}
              image={product.images[0]}
              name={product.name}
              price={convertPrice(product.price)}
              urlRedirect={`/products/${product.slug}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={next}
        disabled={!canNext}
        className={` ml-2 flex h-10 w-10 items-center justify-center bg-zinc-900 ${
          !canNext && 'cursor-not-allowed opacity-50'
        }`}
      >
        <ChevronRight className="h-5 w-5 text-zinc-50" />
      </button>
    </div>
  )
}
