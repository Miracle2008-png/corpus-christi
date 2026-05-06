import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Admin access is granted by EMAIL, not by role
const ADMIN_EMAILS = [
  "miraclechimdindu2008@gmail.com",
  "miraclechimdindu2025@gmail.com",
];

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isProfileRoute = req.nextUrl.pathname.startsWith("/profile");

  if (isAdminRoute) {
    // Not logged in → go to login
    if (!token?.email) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    // Logged in but not admin email → go home
    if (!ADMIN_EMAILS.includes(token.email as string)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // Admin email → allow through
  }

  if (isProfileRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
