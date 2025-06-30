import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  try {
    const res: any = await fetch(
      "aniverse-apis.vercel.app/nodemailer/verifyJwt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );
    if (res.sucess!) {
      console.log("JWT verification successful");
      return NextResponse.next();
    }
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/login", req.url));
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
