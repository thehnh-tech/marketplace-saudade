import { NextResponse } from "next/server";

const API_URL = (
  process.env.API_PUBLIC_URL
  ?? process.env.NEXT_PUBLIC_API_URL
  ?? (process.env.NODE_ENV === "production" ? "https://back-saudade.thehnh.tech" : "http://localhost:4000")
).replace(/\/$/, "");

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/public-feed/photos?limit=24`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" }
    });
    const body = await response.json().catch(() => ({ photos: [] }));

    return NextResponse.json(body, {
      status: response.ok ? 200 : response.status,
      headers: { "Cache-Control": "no-store" }
    });
  } catch {
    return NextResponse.json({ photos: [], updatedAt: new Date().toISOString() }, {
      headers: { "Cache-Control": "no-store" }
    });
  }
}
