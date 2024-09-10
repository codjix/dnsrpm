import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  if (!request.cookies.has("token") && !pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } else if(request.cookies.has("token") && pathname.startsWith("/auth/login")){
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
