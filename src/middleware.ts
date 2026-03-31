import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes chỉ cho phép khi CHƯA đăng nhập
const AUTH_ROUTES = [ '/', '/login', '/register' ]

// Routes yêu cầu phải có JWT
const PROTECTED_ROUTES = ['/data']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r))
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r))

  // Chưa có JWT → cố vào /data → redirect /login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Đã có JWT → cố vào /login hoặc /register → redirect /data
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/data', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Chạy middleware trên các route này (bỏ qua _next, api, static)
  matcher: ['/','/login', '/register', '/data/:path*'],
}