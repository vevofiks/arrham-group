import { NextResponse } from "next/server";
import {jwtVerify} from "jose";

export function middleware(request) {
    console.log("🚀 Middleware running for:", request.nextUrl.pathname);
    const path = request.nextUrl.pathname;
    console.log(`This is the path : ${path}`)

    // check for public routes

    if (path.startsWith("/api/admin/login") || path === "/admin/login") {
        return NextResponse.next()
    }

    //check for private or protected route

    if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
        const token = request.cookies.get("token")?.value;
            console.log(`This is the token for request check : ${path}`)


        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET)
            jwtVerify(token, secret);
            return NextResponse.next();

        } catch (err) {
            console.error("JWT verify failed:", err.message);
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};
