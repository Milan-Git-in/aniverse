import { NextRequest, NextResponse } from "next/server";

// user create
export async function POST(request: NextRequest) {
  const { username, email } = await request.json();
  if (!username || !email) {
    return NextResponse.json(
      { error: "Missing username or email" },
      { status: 400 }
    );
  }
  const res = await fetch(process.env.BACKEND_URL + "/supabase/user/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email }),
  });

  return NextResponse.json({ response: await res.json() });
}
