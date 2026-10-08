import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Serves the standalone birthday page at a clean URL: /birthday/margoweesi
export function middleware(req: NextRequest) {
  return NextResponse.rewrite(new URL('/birthday/margoweesi/index.html', req.url))
}

export const config = {
  matcher: ['/birthday/margoweesi'],
}
