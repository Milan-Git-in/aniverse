import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch(
    `
    ${process.env.BACKEND_URL}/readings/light-novels
    `,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    },
  );
  const data = await response.json();
  return NextResponse.json(data);
}
