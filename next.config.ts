import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1500, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 320, 384],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "back-saudade.thehnh.tech" }
    ],
    dangerouslyAllowSVG: false
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
        ]
      },
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      },
      {
        source: "/(sitemap.xml|robots.txt|manifest.webmanifest)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" }
        ]
      }
    ];
  },
  async redirects() {
    return [
      { source: "/products/:slug", destination: "/product/:slug", permanent: true },
      { source: "/tee/:slug", destination: "/product/:slug", permanent: true },
      { source: "/legal", destination: "/terms", permanent: false }
    ];
  }
};

export default nextConfig;
