import { NextRequest, NextResponse } from "next/server";

// user create
export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const result = await fetch(process.env.BACKEND_URL + "/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return NextResponse.json({ response: await result.json() });
}
