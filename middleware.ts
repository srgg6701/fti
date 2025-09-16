import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

const PROTECTED = [
  /^\/(home|portfolio(_balancer)?|terminal|trading_history|new_follower|add_forex_account|new_provider)(\/|$)/,
];

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (!PROTECTED.some((r) => r.test(pathname))) return NextResponse.next();
  if (req.cookies.has('jwt')) return NextResponse.next();

  const url = req.nextUrl.clone();

  url.pathname = '/login';
  url.searchParams.set('next', pathname + search);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/home',
    '/portfolio',
    '/portfolio_balancer',
    '/terminal',
    '/trading_history',
    '/new_follower',
    '/add_forex_account',
    '/new_provider',
  ],
};
