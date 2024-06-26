'use client'

import { Gear, User, ShoppingCart } from '@phosphor-icons/react'
import Link from 'next/link'

const links = [
  {
    id: 1,
    title: 'user',
    href: '/user',
    Icon: User,
  },
  {
    id: 2,
    title: 'settings',
    href: '/user/settings',
    Icon: Gear,
  },
  {
    id: 3,
    title: 'requests',
    href: '/user/requests',
    Icon: ShoppingCart,
  },
]

export function AsideMenu() {
  return (
    <aside className="fixed bottom-0 left-0 top-0 z-10 mt-[120px] flex items-start bg-white pt-5 shadow-2xl md:hidden">
      <div className="group space-y-2">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="flex h-12 items-center gap-1 hover:bg-primary/20"
          >
            <div className="flex w-14 items-center justify-center">
              <link.Icon className="h-7 w-7" />
            </div>

            <div className="hidden w-[250px] group-hover:block">
              <p className="h-full w-[100px] text-base font-normal text-zinc-900">
                {link.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}
