import { cookies } from 'next/headers';
import { NextResponse, NextRequest, NextFetchEvent } from 'next/server';

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/']

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
    const { pathname } = req.nextUrl

    // -- Check the current route is protected or public
    const isProtectedRoute = protectedRoutes.includes(pathname)
    const isPublicRoute = publicRoutes.includes(pathname)

    const accessToken = cookies().get('accessToken')?.value
    const refreshToken = cookies().get('refreshToken')?.value
    console.log('accessToken: ', accessToken)
    console.log('refreshToken: ', refreshToken)

    if (!accessToken && refreshToken) {
        console.log('go to refresh token')
        return NextResponse.redirect(new URL('/refresh', req.url))
    }

    // if (req.nextUrl.pathname.startsWith('/api/auth/refresh') &&
    //     accessToken &&
    //     refreshToken
    // ) {
    //     console.log('from refresh to ...')
    //     return NextResponse.redirect(new URL('/dashboard', req.url))
    // }
    // event.waitUntil(
        
    // )

    // Redirect to login if the user is not authenticated
    if (isProtectedRoute && !accessToken) {
        console.log('token expired')
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // Redirect to dasboard if the user is authenticated
    if (isPublicRoute &&
        accessToken &&
        !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
}

// Routes middleware should not run on
export const config = {
    matcher: ['/((?!api|refresh|_next/static|_next/image|.*\\.png$).*)'],
}
