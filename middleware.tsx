// pages/_middleware.js

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getLoggedInUser } from './app/lib/server/appwrite';

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const user = await getLoggedInUser();
  const url = req.url ?? '';
  if (typeof url === 'string') {
    return NextResponse.next();
  }
  if (user === null) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/dashboard/:path*', '/new-supervision'],
};
