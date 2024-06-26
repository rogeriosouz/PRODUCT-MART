import { convertPrice } from '@/utils/convertePrice'
import clsx from 'clsx'
import { Search as SearchIcon } from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'
import { ResponseProductsType } from '@/types/ResponseProductsType'
import { api } from '@/lib/axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { LoadingSearch } from './LoadingSearch'
import { Button } from './ui/button'
import Link from 'next/link'

interface SearchProps {
  openSearch: boolean
  closeSearch: () => void
}

const schemaSearch = z.object({
  search: z.string().transform((values) => values.toLocaleLowerCase()),
})

type SearchType = z.infer<typeof schemaSearch>

export function Search({ closeSearch, openSearch }: SearchProps) {
  const mutation = useMutation<ResponseProductsType, any, { search: string }>(
    async ({ search }) => {
      const response = await api.get(
        `/products?category=all-products&page=1&pageSize=5&ordemPrice=desc&search=${search}&discount=null`,
      )

      return response.data
    },
  )

  const { handleSubmit, register, watch } = useForm<SearchType>({
    resolver: zodResolver(schemaSearch),
  })

  function submit(data: SearchType) {
    mutation.mutate({ search: data.search })
  }

  useEffect(() => {
    if (!openSearch) {
      mutation.reset()
    }
  }, [openSearch])

  return (
    <div
      className={clsx(
        'fixed left-0 right-0 top-[120px] z-20 flex h-[60px] w-full items-center justify-end bg-primary',
        {
          'animate__animated animate__fadeOutUp': !openSearch,
          'animate__animated animate__fadeInDown': openSearch,
        },
      )}
    >
      <div className="relative flex w-full items-center gap-2 px-12 sm:px-5">
        <div className="flex w-full items-center gap-2">
          <div className="w-full flex-1">
            <Input.Root>
              <Input.Input
                nameRegister="search"
                register={register}
                isErro={false}
                typeInput="text"
                className="border-none bg-transparent !py-[12px] text-white"
                placeholder="Enter what you are looking for"
              />
            </Input.Root>
          </div>

          <Button
            onClick={handleSubmit(submit)}
            variant={'ghost'}
            className="text-white hover:text-primary"
          >
            <SearchIcon className="h-6 w-6" />
          </Button>
        </div>

        {mutation.status === 'loading' && (
          <LoadingSearch closeSearch={closeSearch} watch={watch} />
        )}

        {mutation.status === 'success' && (
          <div className="absolute left-0 right-0 top-[100%] flex items-center justify-end rounded bg-primary px-12 sm:px-5">
            <div className="w-full rounded-b bg-primary py-5">
              <div className="w-full">
                <Link
                  href={`/products?search=${watch('search')}`}
                  onClick={closeSearch}
                  className="flex h-10 w-full items-center gap-2 rounded px-2 text-white transition-colors hover:bg-secondary hover:text-black"
                >
                  <SearchIcon className="h-5 w-5" />
                  <p className="text-sm font-normal">
                    Procurar por: {watch('search')} - (
                    {mutation.data.products.length} resultados)
                  </p>
                </Link>
              </div>

              <div className="mt-5 flex flex-col gap-1">
                <h2 className="mb-2 text-base font-medium text-white">
                  Products ({mutation.data.products.length}):
                </h2>

                {mutation.data.products.map((product) => (
                  <Link
                    href={`/products/${product.slug}`}
                    key={product.id}
                    onClick={closeSearch}
                    className="flex h-[60px] w-full items-center justify-between rounded text-white transition-colors hover:bg-secondary/20"
                  >
                    <div className="flex h-full items-center gap-2">
                      <div className="flex h-full w-[70px] items-center justify-center overflow-hidden rounded bg-white">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={50}
                          height={50}
                        />
                      </div>
                      <p className="text-base font-normal ">{product.name}</p>
                    </div>

                    <div className="pr-2">
                      {product.Promotion !== null ? (
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-normal text-white line-through">
                            {convertPrice(product.price)}
                            {product.price}
                          </p>
                          <p className="text-bg-red text-lg font-semibold">
                            {convertPrice(product.discountPrice)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-lg font-semibold text-white">
                          {convertPrice(product.price)}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {mutation.status === 'error' && (
          <div className="absolute left-0 right-0 top-[100%] flex items-center justify-end rounded ">
            <div className="w-full rounded-b bg-primary px-12 py-5 sm:px-5">
              <h1 className="text-base font-medium text-white">
                {mutation.error.response.data.message}: ({watch('search')})
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
