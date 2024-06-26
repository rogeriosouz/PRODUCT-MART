import { NextRequest, NextResponse } from 'next/server'
import { getAllRoutersMiddleware, routersType } from './utils/routers'

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('authUser')?.value
  const signinUrl = new URL('/auth/signin', request.url)
  const homeUrl = new URL('/', request.url)

  const routerType = routersType(request.nextUrl.pathname)

  if (routerType === 'auth' && token) {
    return NextResponse.redirect(homeUrl)
  }

  if (routerType === 'private' && !token) {
    return NextResponse.redirect(signinUrl)
  }
}

export const config = {
  matcher: getAllRoutersMiddleware(),
}
