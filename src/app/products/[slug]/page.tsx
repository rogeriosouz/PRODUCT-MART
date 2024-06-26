import { api } from '@/lib/axios'
import { ImageProduct } from '../components/ImageProduct'
import { convertPrice } from '@/utils/convertePrice'
import { TypesProduct } from '../components/TypesProduct'
import { ProductsSlider } from '@/components/ProductsSlider'
import { ProductType } from '@/types/ResponseProductsType'
import { Product as ProductComponent } from '@/app/products/components/Product'

interface ProductParamsType {
  params: {
    slug: string
  }
}

type ResponseType = {
  product: ProductType
  productsRecommends: ProductType[]
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}) {
  return {
    title: `Product ${slug}`,
  }
}

export default async function Product({ params: { slug } }: ProductParamsType) {
  const response = await api.get(`/products/${slug}`)
  const data: ResponseType = response.data

  return (
    <section className="my-[170px]">
      <div className="mx-auto flex max-w-[1200px] items-start justify-between lg:flex-col lg:items-center lg:gap-5">
        <ImageProduct images={data.product.images} />

        <div className="h-[500px] w-[501px] lg:w-full lg:px-5">
          <div className="flex w-full items-center justify-between sm:mb-2 sm:flex-col sm:items-start sm:gap-2">
            <h1 className="mb-1  text-3xl font-bold">{data.product.name}</h1>

            {data.product.Promotion !== null && (
              <div className="bg-red-500 px-6 py-1">
                <p className="text-base font-normal text-white">
                  {data.product.Promotion?.discount}% OFF
                </p>
              </div>
            )}
          </div>

          {data.product.Promotion === null ? (
            <p className="text-bg-red mb-8 text-xl font-bold">
              {convertPrice(data.product.price)}
            </p>
          ) : (
            <div className="flex items-center gap-2">
              <p className="mb-8 text-sm font-medium text-zinc-900/70 line-through">
                {convertPrice(data.product.price)}
              </p>
              <p className="text-bg-red mb-8 text-xl font-bold">
                {convertPrice(data.product.discountPrice)}
              </p>
            </div>
          )}

          <TypesProduct
            name={data.product.name}
            types={data.product.typesProduct}
            idProduct={data.product.id}
          />

          <p className="mt-2 text-sm font-normal text-muted-foreground">
            {data.product.description}
          </p>
        </div>
      </div>

      {data.productsRecommends.length >= 1 && (
        <div className="mx-auto mt-20 max-w-[1450px] px-12 md:mt-5 md:px-0">
          <h2 className="text-text-primary mb-16 text-center text-3xl font-bold uppercase">
            YOU MAY ALSO LIKE
          </h2>

          <div className="hidden w-full grid-cols-1 place-items-center gap-10 md:grid md:grid-cols-2 md:px-5 sm:grid-cols-1">
            {data.productsRecommends.map((product) => (
              <ProductComponent
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

          <div className="lg:hidden">
            <ProductsSlider productsList={data.productsRecommends} />
          </div>
        </div>
      )}
    </section>
  )
}
