import { cookies } from 'next/headers';
import { NextResponse, NextRequest, NextFetchEvent } from 'next/server';

const protectedRoutes = ['/dashboard', '/refresh', '/invoice']
const publicRoutes = ['/signin', '/']

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
    const { pathname } = req.nextUrl
    console.log('req:', req.nextUrl.pathname)

    // -- Check the current route is protected or public
    const isProtectedRoute = protectedRoutes.includes(pathname)
    const isPublicRoute = publicRoutes.includes(pathname)

    const accessToken = cookies().get('accessToken')?.value
    const refreshToken = cookies().get('refreshToken')?.value
    // console.log('accessToken: ', accessToken)
    // console.log('refreshToken: ', refreshToken)

    if (!accessToken && refreshToken) {
        console.log('MIDDLEWARE: go to refresh token')
        return NextResponse.redirect(new URL(`/refresh?origin=${pathname.replace('/', '')}`, req.url))
    }

    // Redirect to login if the user is not authenticated
    if (isProtectedRoute && !accessToken && !refreshToken) {
        console.log('MIDDLEWARE: token expired')
        return NextResponse.redirect(new URL('/signin', req.url))
    }

    // Redirect to dasboard if the user is authenticated
    if (isPublicRoute &&
        accessToken &&
        !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
        console.log('MIDDLEWARE: signed in')
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
}

// Routes middleware should not run on
export const config = {
    matcher: ['/((?!api|favicon.ico|_next/static|_next/image|.*\\.png$|refresh).*)'],
}
