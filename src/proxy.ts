import { NextRequest, NextResponse } from 'next/server';

/**
 * Google crawled the Sitelinks Search Box template as a real URL:
 *   /?s={search_term_string}
 * This site has no search. 301 to the same path without `s` so Search Console
 * drops the "alternate page with proper canonical" entry after recrawl.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (!url.searchParams.has('s')) {
    return NextResponse.next();
  }

  url.searchParams.delete('s');
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|api/|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|json|xml|txt|js|css|map)$).*)',
  ],
};
