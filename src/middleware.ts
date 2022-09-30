import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(
  request: NextRequest,
  next: () => Promise<NextResponse>
) {
  const token = request.cookies.get("shaw-token");
  const { origin } = request.nextUrl

  if (!token) {
    return NextResponse.redirect(`${origin}/`);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/users", "/users/:path*"],
};
