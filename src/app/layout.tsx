import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import {
  DEFAULT_OG_IMAGE,
  KEYWORDS,
  LOCALE,
  PUBLISHER_HANDLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  TWITTER_HANDLE,
  organizationLd,
  websiteLd
} from "@/lib/seo";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Inter_Tight({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Inter({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} 0024 — Night Access · Premium Streetwear T-Shirt with QR Code`,
    template: `%s · ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: KEYWORDS,
  authors: [{ name: "thehnh.tech", url: "https://thehnh.tech" }],
  creator: "thehnh.tech",
  publisher: SITE_NAME,
  category: "Fashion",
  classification: "Streetwear · Marketplace",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "x-default": "/" },
    types: { "application/rss+xml": [{ url: "/feed.xml", title: `${SITE_NAME} drops` }] }
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} 0024 — Night Access`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: LOCALE,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 1500,
        alt: `${SITE_NAME} 0024 Night Access oversized t-shirt — white / red`,
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: PUBLISHER_HANDLE,
    title: `${SITE_NAME} 0024 — Night Access`,
    description: SITE_TAGLINE,
    images: [DEFAULT_OG_IMAGE]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    shortcut: ["/icons/favicon-32x32.png"],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent"
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#B61E33"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F1ED" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0A0B" }
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <JsonLd id="ld-organization" data={organizationLd()} />
        <JsonLd id="ld-website" data={websiteLd()} />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-red focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-paper"
        >
          Skip to content
        </a>
        <Navbar />
        <div id="main-content">{children}</div>
        <Footer />
        <div className="paper-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
