import imageSectionPromotion from '@/assets/images/imga-section-home-3.png'
import { api } from '@/lib/axios'
import Image from 'next/image'
import { ProductsSlider } from '../ProductsSlider'
import { ProductType } from '@/types/ResponseProductsType'
import { convertPrice } from '@/utils/convertePrice'
import { Product } from '@/app/products/components/Product'
import Link from 'next/link'
import { Button } from '../ui/button'

type ResponseProductsType = {
  totalPages: number
  nextPage: boolean
  prevPage: boolean
  products: ProductType[]
}

export async function SectionPromotion() {
  const response = await api.get(
    '/products?category=all-products&page=1&pageSize=10&ordemPrice=desc&search=null',
  )

  const data: ResponseProductsType = response.data

  const productsPromotions = data.products.filter(
    (product) => product.Promotion !== null,
  )

  return (
    <section className="mt-[100px] flex w-full items-center justify-between lg:flex-col ">
      <Image
        src={imageSectionPromotion}
        alt="imageSectionPromotion"
        width={600}
        height={670}
      />

      <div className="w-full px-[70px] lg:mt-12 md:px-5">
        <div className="mb-12 flex w-full items-center justify-between ">
          <h2 className="text-text-primary text-4xl font-bold">
            WEEKLY <span className="text-red-600">DISCOUNT</span>
          </h2>

          <Button variant={'secondary'} asChild>
            <Link href={'/products?discount=true'}>VIEW ALL</Link>
          </Button>
        </div>

        <div className="hidden grid-cols-1 place-items-center gap-10 lg:grid md:grid-cols-2 md:px-5 sm:grid-cols-1">
          {data.products.map((product) => (
            <Product
              key={product.id}
              name={product.name}
              Promotion={product.Promotion}
              discountPrice={convertPrice(product.discountPrice)}
              image={product.images[0]}
              price={convertPrice(product.price)}
              urlRedirect={`/products/${product.slug}`}
            />
          ))}
        </div>

        <div className="block lg:hidden">
          <ProductsSlider productsList={productsPromotions} />
        </div>
      </div>
    </section>
  )
}
