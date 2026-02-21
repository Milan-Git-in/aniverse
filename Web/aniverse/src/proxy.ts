import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  // get token from local storage

  const token = req.cookies.get("Aniversetoken");
  if (!token) {
    console.error("Token Not found");
  }
}

export const config = {
  matcher: [
    /*
      This matches everything EXCEPT login and signup.
      Negative lookahead isn't supported in Next.js matchers,
      so we use explicit inclusions or glob exclusions like this.
    */
    "/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)",
  ],
};
