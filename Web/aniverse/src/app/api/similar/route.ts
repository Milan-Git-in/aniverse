import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const videoId = searchParams.get("videoId");
  if (!videoId) {
    return NextResponse.json(
      { error: "Missing videoId parameter" },
      { status: 400 },
    );
  }
  console.log(`${process.env.BACKEND_URL}/youtube/v1/similar/${videoId}`);

  const data = await fetch(
    `${process.env.BACKEND_URL}/youtube/v1/similar/${videoId}`,
  );
  const result = await data.json();
  return NextResponse.json(result);
}
