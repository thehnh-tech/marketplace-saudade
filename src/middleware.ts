import { NextResponse, type NextRequest } from "next/server";

/** Only the dedicated product domain gets the around landing page at its root. */
export function middleware(request: NextRequest) {
  const hostname = (request.headers.get("host") ?? request.nextUrl.host).split(":")[0].toLowerCase();
  if (hostname !== "around.thehnh.tech") {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/robots.txt") {
    return new NextResponse(
      "User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /cart\nDisallow: /shop\nDisallow: /product/\nDisallow: /concept\nDisallow: /app-experience\n\nUser-agent: GPTBot\nUser-agent: ClaudeBot\nUser-agent: anthropic-ai\nUser-agent: CCBot\nUser-agent: Google-Extended\nDisallow: /\n\nSitemap: https://around.thehnh.tech/sitemap.xml\n",
      { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } }
    );
  }

  if (request.nextUrl.pathname === "/sitemap.xml") {
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"><url><loc>https://around.thehnh.tech/</loc><xhtml:link rel="alternate" hreflang="fr" href="https://around.thehnh.tech/"/><xhtml:link rel="alternate" hreflang="en" href="https://around.thehnh.tech/?lang=en"/></url><url><loc>https://around.thehnh.tech/?lang=en</loc><xhtml:link rel="alternate" hreflang="fr" href="https://around.thehnh.tech/"/><xhtml:link rel="alternate" hreflang="en" href="https://around.thehnh.tech/?lang=en"/></url></urlset>',
      { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } }
    );
  }

  const destination = request.nextUrl.clone();
  destination.pathname = "/around";
  return NextResponse.rewrite(destination);
}

export const config = { matcher: ["/", "/robots.txt", "/sitemap.xml"] };
