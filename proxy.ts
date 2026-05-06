import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const ADMIN_EMAILS = [
  "miraclechimdindu2008@gmail.com",
  "miraclechimdindu2025@gmail.com",
];

// Use NextAuth v5's auth() directly — compatible with v5 JWE token format
// (getToken from next-auth/jwt uses v4 format and returns null for v5 tokens)
export const proxy = auth((req) => {
  const session = req.auth;
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute) {
    if (!session?.user?.email) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }
    if (!ADMIN_EMAILS.includes(session.user.email)) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
