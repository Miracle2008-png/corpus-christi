import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const session = req.auth;

  if (isAdminRoute && (!session || (session.user as { role?: string })?.role !== "admin")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/profile") && !session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/bookmarks/:path*"],
};
