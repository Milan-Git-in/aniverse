import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  const response = await fetch(
    `
    ${process.env.BACKEND_URL}/youtube/v1/home
    `,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email }),
    },
  );
  const data = await response.json();
  return NextResponse.json(data);
}
