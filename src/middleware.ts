import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/utils/jwt";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  
  // If user is on login/signup pages
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup")
  ) {
    // If they have a valid token, redirect to dashboard
    if (token) {
      const payload = await verifyToken(token);
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    // If no token or invalid token, allow access to login/signup
    return NextResponse.next();
  }
  
  // If user is on dashboard and no token, redirect to login
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
