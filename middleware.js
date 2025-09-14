import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
    const path = request.nextUrl.pathname;

    // check for public routes

    if (path.startsWith("/api/admin/login") || path === "/admin/login") {
        return NextResponse.next()
  }

   //check for private or protected route

   if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.next();

    } catch (error) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }
   }

   return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};