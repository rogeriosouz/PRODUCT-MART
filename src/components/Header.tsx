import { X, Search as SearchIcon, Menu, User2 } from 'lucide-react'
import Link from 'next/link'
import { Search } from './Search'
import { MenuMobile } from './MenuMobile'
import { useHeader } from '@/hooks/useHeader'
import { useAuth } from '@/context/authContext'
import { IconCart } from './IconCart'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { User } from './User'
import clsx from 'clsx'
import { ShoppingCart } from '@phosphor-icons/react'

const links = [
  {
    id: 1,
    href: '/',
    title: 'Home',
  },
  {
    id: 2,
    href: '/products',
    title: 'Products',
  },
]

export function Header() {
  const {
    closeSearch,
    openAndCloseMenu,
    openAndCloseSearch,
    openMenu,
    openSearch,
  } = useHeader()

  const { isAuthenticate, user } = useAuth()
  const path = usePathname()

  return (
    <>
      <Search closeSearch={closeSearch} openSearch={openSearch} />

      <MenuMobile openMenu={openMenu} />

      <header className="fixed left-0 right-0 top-0 z-30 flex h-[120px] w-full items-center justify-between border-b border-zinc-900/10 bg-white px-12 py-3 md:px-5">
        <Link
          href={'/'}
          className="flex items-center gap-2 text-2xl font-bold uppercase"
        >
          Product <span className="text-red-600">Mart</span>
        </Link>

        <nav className="flex items-center md:hidden">
          <ul className="flex w-full items-center gap-10">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className={clsx(
                    'border-b-2 px-3 py-2 text-base font-normal transition-all hover:border-primary',
                    {
                      'border-primary': path === link.href,
                      'border-transparent': path !== link.href,
                    },
                  )}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant={'ghost'} onClick={openAndCloseSearch}>
            {openSearch ? (
              <X className="h-6 w-6 cursor-pointer" />
            ) : (
              <SearchIcon className="h-6 w-6 cursor-pointer" />
            )}
          </Button>

          {isAuthenticate && <IconCart />}

          {isAuthenticate && user ? (
            <User />
          ) : (
            <div className="flex items-center gap-2 md:hidden">
              <Button asChild variant={'outline'}>
                <Link href={'/auth/signin'} className="flex items-center gap-2">
                  <User2 className="h-6 w-6" />
                  login
                </Link>
              </Button>

              <Button asChild variant={'default'}>
                <Link href={'/auth/signup'} className="flex items-center gap-2">
                  register
                </Link>
              </Button>
            </div>
          )}

          <Button
            onClick={openAndCloseMenu}
            variant={'ghost'}
            className="hidden md:flex"
          >
            {openMenu ? (
              <X className="h-7 w-7 text-zinc-900" />
            ) : (
              <Menu className="h-7 w-7 text-zinc-900" />
            )}
          </Button>
        </div>
      </header>
    </>
  )
}
