import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const sessionUser = await decrypt(req.cookies.get("session_user")?.value);
  const sessionAdmin = await decrypt(req.cookies.get("session_admin")?.value);

  if (path.startsWith("/dashboard")) {
    if (!sessionAdmin?.userId) {
      return NextResponse.redirect(new URL("/dashboard-login", req.nextUrl));
    }
  }

  if (path.startsWith("/lobby")) {
    if (!sessionUser?.userId) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  if (path === "/dashboard-login" && sessionAdmin?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  if (path === "/login" && sessionUser?.userId) {
    return NextResponse.redirect(new URL("/lobby", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/dashboard/:path*",
    "/dashboard/*",
    "/dashboard",
  ],
};
