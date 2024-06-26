'use client'
import { Header } from '@/components/Header'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'
import { querryClient } from '@/lib/querryClient'
import { QueryClientProvider } from 'react-query'
import { usePathname } from 'next/navigation'
import { AuthContextProvider } from '@/context/authContext'
import { Toaster } from 'react-hot-toast'
import { Next13ProgressBar } from 'next13-progressbar'
import 'animate.css'
import './globals.css'
import '@radix-ui/themes/styles.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
})

export const metadata = {
  title: 'Lojinha',
  description: 'Lojinha',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const path = usePathname()

  return (
    <html lang="en">
      <body
        className={`${poppins.className} scrollbar scrollbar-track-zinc-200 scrollbar-thumb-bg-blue scrollbar-w-3`}
      >
        <QueryClientProvider client={querryClient}>
          <AuthContextProvider>
            <Toaster position="top-center" reverseOrder={true} />

            {!path.includes('/auth') && <Header />}

            <Next13ProgressBar
              height="2px"
              color="#E2342D"
              options={{ showSpinner: false }}
              showOnShallow
            />

            {children}
          </AuthContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
