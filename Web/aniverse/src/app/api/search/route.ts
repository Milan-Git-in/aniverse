import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("search");
  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 },
    );
  }
  // Perform search logic here
  const results = await fetch(`${process.env.BACKEND_URL}}`);

  return NextResponse.json(results);
}
