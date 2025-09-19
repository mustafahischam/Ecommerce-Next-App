import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getNextAuthSecret } from "./lib/env";

const protectedPages = ['/cart', '/checkout', '/profile', '/wishlist', '/addresses', '/allorders']
const authPages = ['/login', '/register']

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: getNextAuthSecret() })
    const pathname = req.nextUrl.pathname

    if (protectedPages.includes(pathname) && !token) {
        const loginUrl = new URL('/login', req.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    if (authPages.includes(pathname) && token) {
        const homeUrl = new URL('/', req.url)
        homeUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(homeUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/cart', '/checkout', '/profile', '/wishlist', '/addresses', '/allorders', '/login', '/register']
}