import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/api/", "/_next/"]
      },
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: "/"
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "anthropic-ai", "CCBot", "Google-Extended"],
        disallow: "/"
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
