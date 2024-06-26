import { api } from '@/lib/axios'
import { ProductsSlider } from '../ProductsSlider'
import { ResponseProductsType } from '@/types/ResponseProductsType'
import { Product } from '@/app/products/components/Product'
import { convertPrice } from '@/utils/convertePrice'

export async function SectionNewProduct() {
  const response = await api.get(
    '/products?category=all-products&page=1&pageSize=4&ordemPrice=desc&search=null',
  )
  const data: ResponseProductsType = response.data

  return (
    <section className="mt-[100px]  w-full">
      <h2 className="text-bg-blue mb-9 text-center text-[36px] font-bold md:px-5 md:text-left">
        <span className="text-red-600">NEW</span> PRODUCTS
      </h2>

      <div className="hidden grid-cols-1 place-items-center gap-10 md:grid md:grid-cols-2 md:px-5 sm:grid-cols-1">
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

      <div className="w-full px-14 md:hidden">
        <ProductsSlider productsList={data.products} />
      </div>
    </section>
  )
}
