import { NextResponse } from "next/server";
import cookie from "cookie";

export function middleware(req) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const sessionToken = cookies["next-auth.session-token"];
  const publicPaths = [
    "/logIn",
    "/signUp",
    "/passwordRequest",
    "/passwordReset/:path*",
  ];
  console.log(req.nextUrl.pathname);

  // If the user is not logged in and trying to access a private route, redirect
  if (!sessionToken && !publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/logIn", req.url));
  }

  // If the user is logged in and trying to access public paths, redirect to a dashboard or home
  if (sessionToken && publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url)); // Adjust as needed
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/employerAccount/:path*", "/jobSeekerAccount/:path*"], // Adjust matcher as needed
};
