import Link from 'next/link'
import { useQuery } from 'react-query'
import { ResponseCartType } from '@/types/ResponseCartType'
import { api } from '@/lib/axios'
import { Button } from './ui/button'
import { ShoppingCart } from '@phosphor-icons/react'

export function IconCart() {
  const { data, status } = useQuery<ResponseCartType>(['/cart'], async () => {
    const response = await api.get('/cart')
    return response.data
  })

  return (
    <>
      {status === 'success' && (
        <Button asChild variant={'ghost'}>
          <Link href={'/cart'}>
            <div className="relative">
              <div className="bg-bg-blue absolute -top-1 left-4 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                {data.cart.itemsCarts.length}
              </div>
              <ShoppingCart className="h-6 w-6" />
            </div>
          </Link>
        </Button>
      )}
    </>
  )
}
