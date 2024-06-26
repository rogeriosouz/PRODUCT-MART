'use client'

import { Product } from './components/Product'
import { api } from '@/lib/axios'
import { convertPrice } from '@/utils/convertePrice'
import { useQuery } from 'react-query'
import { clsx } from 'clsx'
import { LoadingProduct } from './components/LoadingProduct'
import { AlertTriangle } from 'lucide-react'
import { Pagination } from './components/Pagination'
import { useProducts } from '@/hooks/useProducts'
import { ResponseProductsType } from '@/types/ResponseProductsType'
import { ResponseCategoriesType } from '@/types/ResponseCategoriesType'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Products() {
  const {
    ordemProduct,
    page,
    setValueOrdemProduct,
    setValuePage,
    nextPage,
    prevPage,
    setCategoryQuerryParams,
    categoryParams,
    discount,
    search,
  } = useProducts()

  const { data: dataCategory, status: statusCategory } =
    useQuery<ResponseCategoriesType>(
      ['/categories'],
      async () => {
        const response = await api.get('/categories')
        return response.data
      },
      {},
    )

  const { data, status } = useQuery<ResponseProductsType>(
    ['/products', ordemProduct, categoryParams, page, search, discount],
    async () => {
      const response = await api.get(
        `/products?category=${categoryParams}&page=${page}&pageSize=10&ordemPrice=${ordemProduct}&search=${
          search !== null ? search : 'null'
        }&discount=${discount !== null ? discount : 'null'}`,
      )

      return response.data
    },
    {
      keepPreviousData: true,
      onError: (err) => {
        const error = err as { response: { data: { message: string } } }

        if (error.response.data.message === 'Products not found') {
          if (search !== null) {
            setCategoryQuerryParams('all-products')
          }
        }
      },
    },
  )

  return (
    <section className="mx-auto my-[160px] flex min-h-screen w-full px-12 lg:px-5">
      <div className="w-full flex-1">
        {statusCategory === 'loading' && (
          <div className="flex w-full gap-3">
            <div className="text-text-primary h-[72px] w-[246px] animate-pulse  bg-[#F3F3F3]"></div>
            <div className="text-text-primary h-[72px] w-[246px] animate-pulse  bg-[#F3F3F3]"></div>
            <div className="text-text-primary h-[72px] w-[246px] animate-pulse  bg-[#F3F3F3]"></div>
          </div>
        )}

        {statusCategory === 'success' && (
          <div className="grid w-full grid-cols-5 gap-3 md:grid-cols-2 sm:grid-cols-1">
            <Button
              onClick={() => setCategoryQuerryParams('all-products')}
              variant="default"
              className={clsx('w-full py-10 hover:text-white', {
                'bg-primary': categoryParams === 'all-products',
                'bg-[#F3F3F3]': categoryParams !== 'all-products',
                'text-white': categoryParams === 'all-products',
                'text-text-primary': categoryParams !== 'all-products',
              })}
            >
              Todos os produtos
            </Button>

            {dataCategory.categories.map((category) => (
              <div key={category.id}>
                {category.productsToCategory.length >= 1 && (
                  <Button
                    onClick={() => setCategoryQuerryParams(category.name)}
                    variant="default"
                    className={clsx('w-full py-10 hover:text-white', {
                      'bg-blue-500': categoryParams === category.name,
                      'bg-[#F3F3F3]': categoryParams !== category.name,
                      'text-white': categoryParams === category.name,
                      'text-text-primary': categoryParams !== category.name,
                    })}
                  >
                    {category.name}
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 w-full">
          <div className="flex w-full items-center justify-between md:flex-col md:items-start md:gap-2">
            <h1 className="text-text-primary text-xl font-normal">
              {status === 'loading' ? '0' : data?.products.length} Products
            </h1>

            <Select
              value={ordemProduct}
              onValueChange={(value) => setValueOrdemProduct(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="ordenar" />
              </SelectTrigger>
              <SelectContent className="max-h-[10rem] overflow-y-auto">
                <SelectItem value="asc">Lowest price</SelectItem>
                <SelectItem value="desc">Biggest price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {status === 'error' && (
            <div className="my-5 flex w-full items-center gap-3 bg-yellow-300 px-3 py-5">
              <AlertTriangle className="h-9 w-9 text-yellow-600" />
              <p className="text-lg font-medium text-yellow-800">Erro</p>
            </div>
          )}

          <div className="mt-10 grid w-full grid-cols-4 gap-10 lg:grid-cols-2 sm:grid-cols-1 ">
            {status === 'loading' && (
              <>
                <LoadingProduct />
                <LoadingProduct />
                <LoadingProduct />
              </>
            )}

            {status === 'success' && (
              <>
                {data.products.map((product) => (
                  <Product
                    key={product.id}
                    discountPrice={convertPrice(product.discountPrice)}
                    Promotion={product.Promotion}
                    image={product.images[0]}
                    name={product.name}
                    price={convertPrice(product.price)}
                    urlRedirect={`/products/${product.slug}`}
                  />
                ))}
              </>
            )}
          </div>

          {status === 'success' && data.totalPages > 1 && (
            <Pagination
              isNextPage={data.nextPage}
              isPrevPage={data.prevPage}
              totalPages={data.totalPages}
              page={page}
              nextPage={nextPage}
              prevPage={prevPage}
              setPage={setValuePage}
            />
          )}
        </div>
      </div>
    </section>
  )
}
