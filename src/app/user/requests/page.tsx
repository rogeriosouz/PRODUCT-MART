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
import { Search } from './components/Search'
import { ArrowCounterClockwise, CircleNotch } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

export default function Requests() {
  const {
    nextPage,
    page,
    prevPage,
    setValuePage,
    ordemCreatedAt,
    setValueOrdemCreatedAt,
    search,
    debouncedSearchFn,
  } = useRequests()

  const { data, status, refetch, isFetching } = useQuery<ResponseRequestType>(
    ['/requests', page, ordemCreatedAt, search],
    async () => {
      const response = await api.get(
        `/requests?pageSize=7&page=${page}&ordemCreatedAt=${ordemCreatedAt}&search=${search}`,
      )
      return response.data
    },

    {
      keepPreviousData: true,
    },
  )

  const isNotRequest = status === 'success' && data.requests.length < 1

  function refetchFn() {
    refetch()
  }

  return (
    <div className="mx-auto mt-[140px] max-w-[1200px]">
      <div className="my-8 flex w-full items-center gap-2 md:px-5">
        <Cart className="h-7 w-7 fill-zinc-900" />
        <h1 className="text-lg font-medium">MY REQUESTS</h1>
      </div>

      <div className="my-8 flex w-full items-center justify-between gap-2 md:px-5">
        <div className="flex items-center gap-2">
          <p className="text-lg font-normal uppercase text-zinc-900">
            FILTER BY:
          </p>

          <Select
            onValueChange={(value) => setValueOrdemCreatedAt(value)}
            value={ordemCreatedAt}
            defaultValue="desc"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">New</SelectItem>
              <SelectItem value="asc">Old</SelectItem>
            </SelectContent>
          </Select>

          <Button variant={'outline'} size={'icon'} onClick={refetchFn}>
            {isFetching ? (
              <CircleNotch className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowCounterClockwise className="h-5 w-5" weight="bold" />
            )}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Search debouncedSearch={debouncedSearchFn} search={search || ''} />
        </div>
      </div>

      {isNotRequest && (
        <div className="flex w-full items-center gap-2">
          <p>No purchases found.</p>
        </div>
      )}

      <div className="flex w-full flex-col gap-3 md:px-5">
        {status === 'loading' && (
          <>
            <LoadingRequest />
            <LoadingRequest />
            <LoadingRequest />
            <LoadingRequest />
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
