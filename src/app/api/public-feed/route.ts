import { NextResponse } from "next/server";

const DEFAULT_BACKEND_URL = "https://back-saudade.thehnh.tech";

const PRIMARY_API_URL = (
  process.env.API_PUBLIC_URL
  ?? process.env.NEXT_PUBLIC_API_URL
  ?? (process.env.NODE_ENV === "production" ? DEFAULT_BACKEND_URL : "http://localhost:4000")
).replace(/\/$/, "");

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const apiUrls = Array.from(new Set([PRIMARY_API_URL, DEFAULT_BACKEND_URL].filter(Boolean)));
  let latestBody: unknown = { photos: [], updatedAt: new Date().toISOString() };

  try {
    for (const apiUrl of apiUrls) {
      const response = await fetch(`${apiUrl}/api/public-feed/photos?limit=24`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" }
      });
      const body = await response.json().catch(() => ({ photos: [] })) as { photos?: unknown[] };
      latestBody = body;

      if (response.ok && Array.isArray(body.photos) && body.photos.length > 0) {
        return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
      }
    }

    return NextResponse.json(latestBody, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ photos: [], updatedAt: new Date().toISOString() }, {
      headers: { "Cache-Control": "no-store" }
    });
  }
}
