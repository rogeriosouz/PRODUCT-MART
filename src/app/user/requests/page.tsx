'use client'
import { Cart } from '@/components/icons'
import { Request } from '../components/Request'
import { useQuery } from 'react-query'
import { ResponseRequestType } from '@/types/ResponseRequestsType'
import { api } from '@/lib/axios'
import { LoadingRequest } from '../components/LoadingRequest'
import { useRequests } from '@/hooks/useRequests'
import { Pagination } from '@/app/products/components/Pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Requests() {
  const {
    nextPage,
    page,
    prevPage,
    setValuePage,
    ordemCreatedAt,
    setValueOrdemCreatedAt,
  } = useRequests()

  const { data, status } = useQuery<ResponseRequestType>(
    ['/requests', page, ordemCreatedAt],
    async () => {
      const response = await api.get(
        `/requests?pageSize=10&page=${page}&ordemCreatedAt=${ordemCreatedAt}`,
      )
      return response.data
    },

    {
      keepPreviousData: true,
    },
  )

  const isNotRequest = status === 'success' && data.requests.length < 1

  return (
    <div className="mx-auto mt-[140px] max-w-[1200px]">
      <div className="my-8 flex w-full items-center gap-2 md:px-5">
        <Cart className="h-7 w-7 fill-zinc-900" />
        <h1 className="text-lg font-medium">MY REQUESTS</h1>
      </div>

      {isNotRequest && <p>Você não possui nenhuma compra no site.</p>}

      {!isNotRequest && (
        <div className="my-8 flex items-center gap-2 md:px-5">
          <p className="text-lg font-normal uppercase text-zinc-900">
            FILTER BY:
          </p>

          <Select onValueChange={(value) => setValueOrdemCreatedAt(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">New</SelectItem>
              <SelectItem value="asc">Old</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex w-full flex-col gap-3 md:px-5">
        {status === 'loading' && (
          <>
            <LoadingRequest />
            <LoadingRequest />
            <LoadingRequest />
          </>
        )}

        {status === 'success' && (
          <>
            {data.requests.map((request) => (
              <div
                key={request.id}
                className="w-full rounded bg-white px-7 py-7 shadow-2xl md:px-5"
              >
                <Request
                  productsRequest={request.items}
                  date={request.create_at}
                  totalPrice={request.totalPrice}
                  address={request.address}
                  numberId={request.numberId}
                  paymentMethod={request.paymentMethod}
                  status={request.status}
                />
              </div>
            ))}

            {status === 'success' && data.totalPages > 1 && (
              <div className="my-10 w-full">
                <Pagination
                  isNextPage={data.nextPage}
                  isPrevPage={data.prevPage}
                  totalPages={data.totalPages}
                  page={page}
                  nextPage={nextPage}
                  prevPage={prevPage}
                  setPage={setValuePage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
