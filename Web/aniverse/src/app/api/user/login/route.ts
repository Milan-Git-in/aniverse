import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_ROLE_KEY!,
  );
  const token = request.cookies.get("Aniversetoken")?.value;
  if (!token) {
    const authHeader = request.headers.get("authorization");

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      const { data, error } = await supabase.auth.getUser(token);

      if (!error && data.user) {
        const user = data.user;
        return NextResponse.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            username: user.user_metadata.full_name,
            profile_picture: user.user_metadata.avatar_url,
            provider: user.app_metadata.provider,
          },
        });
      }
    }
    return NextResponse.json(
      { success: false, error: "Token not found" },
      { status: 200 },
    );
  }
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/nodemailer/verifyJwt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });
    const data = await res.json();
    console.log("DATA BLYAATTT: ", data);
    if (data.error) {
      return NextResponse.json(
        { success: false, error: data.error },
        { status: 401 },
      );
    }
    return NextResponse.json(
      { success: true, user: data.user },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "An error occurred" },
      { status: 500 },
    );
  }
}
