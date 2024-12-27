// pages/_middleware.js

import { NextResponse } from 'next/server';
import { getLoggedInUser } from './app/lib/server/appwrite.js'


export async function middleware(req: { url: string | URL | undefined; }) {
    const user = await getLoggedInUser();
    const url = req.url || ""
    if (typeof url === 'string') {
        console.log(url)
        if (url.includes('/login') || url.includes('/api/auth/login')) {
            return NextResponse.next();
        }
    }
    if (!user) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

}
export const config = {
    matcher: ['/dashboard/:path*', '/new-supervision'],
}

