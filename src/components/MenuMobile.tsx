import Link from 'next/link'
import { Cart, Home, Setting, User } from './icons'
import clsx from 'clsx'
import { useAuth } from '@/context/authContext'

interface MenuMobileProps {
  openMenu: boolean
}

export function MenuMobile({ openMenu }: MenuMobileProps) {
  const { isAuthenticate } = useAuth()

  return (
    <div
      className={clsx(
        'fixed left-0 right-0 top-[120px] z-10  hidden h-min  w-full border-b border-zinc-500/50 bg-white transition-all md:block',
        {
          '-translate-y-[100%]': !openMenu,
          'translate-y-[0]': openMenu,
        },
      )}
    >
      <nav className="flex flex-col gap-10 px-5 py-6">
        <Link href={'/'} className="flex items-center gap-2 transition-all">
          <Home className="h-6 w-6 fill-zinc-900" />
          <p className="text-lg font-normal">Home</p>
        </Link>

        <Link
          href={'/products'}
          className="flex items-center gap-2  transition-all"
        >
          <Cart className="h-6 w-6 fill-zinc-900" />
          <p className="text-lg font-normal">Products</p>
        </Link>

        {!isAuthenticate ? (
          <>
            <Link
              href={'/auth/signin'}
              className="flex items-center gap-2  transition-all"
            >
              <User className="h-5 w-5 fill-zinc-900" />
              <p className="text-lg font-normal">Signin</p>
            </Link>
          </>
        ) : (
          <>
            <Link
              href={'/user'}
              className="flex items-center gap-2  transition-all"
            >
              <User className="h-6 w-6 fill-zinc-900" />
              <p className="text-lg font-normal">My data</p>
            </Link>

            <Link
              href={'/user/requests'}
              className="flex items-center gap-2  transition-all"
            >
              <Cart className="h-6 w-6 fill-zinc-900" />
              <p className="text-lg font-normal">My requests</p>
            </Link>

            <Link
              href={'/user/settings'}
              className="flex items-center gap-2  transition-all"
            >
              <Setting className="h-6 w-6 fill-zinc-900" />
              <p className="text-lg font-normal">Settings</p>
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}
