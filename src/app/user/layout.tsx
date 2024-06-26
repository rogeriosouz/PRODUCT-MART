import { Cart, Home, User } from '@/components/icons'
import Link from 'next/link'
import { ReactNode } from 'react'
import { AsideMenu } from './components/AsideMenu'

export const metadata = {
  title: 'User',
  description: 'Generated by create next app',
}

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <AsideMenu />

      {children}
    </main>
  )
}
