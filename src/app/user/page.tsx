'use client'
import { Cart, Mail, Setting, User as UserIcon } from '@/components/icons'
import { useAuth } from '@/context/authContext'
import { api } from '@/lib/axios'
import { ResponseRequestType } from '@/types/ResponseRequestsType'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { Request } from './components/Request'
import { LoadingRequest } from './components/LoadingRequest'
import { Button } from '@/components/ui/button'
import { Gear, ShoppingCart } from '@phosphor-icons/react'

export default function User() {
  const { user } = useAuth()
  const { data, status } = useQuery<ResponseRequestType>(
    ['/requests'],
    async () => {
      const response = await api.get(
        `/requests?pageSize=10&page=1&ordemCreatedAt=desc`,
      )
      return response.data
    },
  )

  return (
    <div className="mx-auto mt-[140px] max-w-[1200px] space-y-2 md:px-5">
      <div className="flex w-full items-center justify-between rounded bg-white px-5 py-5 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <UserIcon className="h-8 w-8 fill-white" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-zinc-900">
              Welcome: {user?.name}
            </h1>

            <div className="flex items-center gap-2">
              <Mail className="fill-bg-blue h-4 w-4" />
              <p className="text-base font-normal text-zinc-900">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <Link href={'/user/settings'} className="h-6 w-6">
          <Gear className="h-6 w-6" />
        </Link>
      </div>

      <div className="w-full">
        <div className="my-8 flex w-full items-center gap-2">
          <ShoppingCart className="h-7 w-7" />
          <h2 className="text-lg font-medium">SUMMARY OF YOUR LAST ORDER</h2>
        </div>

        <div className="rounded bg-white px-10 py-10 shadow-2xl md:px-5">
          {status === 'loading' && <LoadingRequest />}

          <div className="flex w-full items-center justify-between">
            {status === 'success' && data.requests.length >= 1 && (
              <div className="w-full">
                <Request
                  date={data.requests[0].create_at}
                  address={data.requests[0].address}
                  productsRequest={data.requests[0].items}
                  totalPrice={data.requests[0].totalPrice}
                  numberId={data.requests[0].numberId}
                  paymentMethod={data.requests[0].paymentMethod}
                  status={data.requests[0].status}
                />
              </div>
            )}

            {status === 'success' && data.requests.length < 1 && (
              <p>You have not made any purchases on the website.</p>
            )}
          </div>

          <div className="mt-8 h-[1px] w-full bg-zinc-600/10"></div>

          <div className="mt-8 flex w-full items-center justify-start">
            <Button asChild variant={'outline'}>
              <Link href={'/user/requests'}>See all orders</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
