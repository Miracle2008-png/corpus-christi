import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isProfileRoute = req.nextUrl.pathname.startsWith("/profile");

  if (isAdminRoute && (!token || (token as { role?: string })?.role !== "admin")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isProfileRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/bookmarks/:path*"],
};
