import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("search_query");
  const email = searchParams.get("email");
  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 },
    );
  }
  // Perform search logic here
  const results = await fetch(
    `${process.env.BACKEND_URL}/youtube/v1/search/${query}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    },
  ).then((res) => res.json());
  console.log(results);
  return NextResponse.json(results);
}
