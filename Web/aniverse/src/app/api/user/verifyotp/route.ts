import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// user create
export async function POST(request: NextRequest) {
  const { email, otp } = await request.json();

  const result = await fetch(
    process.env.BACKEND_URL + "/nodemailer/verifyMail",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    },
  );

  const data = await result.json();
  const token: string = data.token;
  console.log("VERIFY RESPONSE:", data);
  console.log("TOKEN FROM BACKEND:", data.token);
  (await cookies()).set("Aniversetoken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return NextResponse.json({ response: data });
}
