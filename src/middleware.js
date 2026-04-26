import { NextResponse } from "next/server";

export function middleware(req) {
  // Override forwarded protocol to http so NextAuth uses non-secure cookies.
  // This is needed when behind a reverse proxy (e.g. ngrok) that sets x-forwarded-proto: https.
  const response = NextResponse.next({
    request: {
      headers: (() => {
        const headers = new Headers(req.headers);
        headers.set("x-forwarded-proto", "http");
        headers.set("x-forwarded-host", "localhost:3005");
        return headers;
      })(),
    },
  });
  return response;
}

export const config = {
  matcher: "/api/auth/:path*",
};
