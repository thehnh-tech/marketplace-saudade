import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Night Access`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F4F1EC",
    theme_color: "#D71920",
    categories: ["shopping", "lifestyle", "fashion"],
    icons: [
      { src: "/assets/bgouter.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/assets/bgouter.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/assets/bgouter.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ]
  };
}
