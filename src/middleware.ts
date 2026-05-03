import { NextResponse, type NextRequest } from "next/server";
import { cafeCornerConfig } from "@/lib/cafecorner/config";

const CAFE_INTERNAL_PREFIX = "/__cafecorner";

function normalizedHost(request: NextRequest): string {
  const host = request.headers.get("host") ?? "";
  return host.toLowerCase().split(":")[0] ?? "";
}

function isCafeCornerHost(host: string): boolean {
  return host === cafeCornerConfig.subdomain || host === cafeCornerConfig.localSubdomain;
}

export function middleware(request: NextRequest) {
  const host = normalizedHost(request);
  const { pathname } = request.nextUrl;
  const isCafeHost = isCafeCornerHost(host);

  if (!isCafeHost && pathname.startsWith(CAFE_INTERNAL_PREFIX)) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  if (!isCafeHost) {
    return NextResponse.next();
  }

  if (pathname.startsWith(CAFE_INTERNAL_PREFIX)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `${CAFE_INTERNAL_PREFIX}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"]
};
