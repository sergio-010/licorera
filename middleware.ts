import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export function middleware(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value

  if (token) {
    const payloadPart = token.split('.')[1]
    try {
      const payload = JSON.parse(Buffer.from(payloadPart, 'base64').toString('utf8'))
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        const res = NextResponse.redirect(new URL('/admin/login', req.url))
        res.cookies.set('sb-access-token', '', { maxAge: 0, path: '/' })
        res.cookies.set('sb-refresh-token', '', { maxAge: 0, path: '/' })
        return res
      }
    } catch {
      const res = NextResponse.redirect(new URL('/admin/login', req.url))
      res.cookies.set('sb-access-token', '', { maxAge: 0, path: '/' })
      res.cookies.set('sb-refresh-token', '', { maxAge: 0, path: '/' })
      return res
    }
  } else if (req.nextUrl.pathname.startsWith('/admin')) {
    const redirectUrl = new URL('/admin/login', req.url)
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
