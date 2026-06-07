import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { WorldFeed } from "@/components/WorldFeed";
import { getMarketplaceProducts } from "@/lib/products";
import { breadcrumbLd, itemListLd, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Picture me by SAUDADE — ${SITE_NAME} 0024 Night Access`,
  description:
    "Picture me by SAUDADE. A live world feed of QR-scanned moments connected to the SAUDADE 0024 Night Access tee. One garment, one private archive, a few memories shared with the whole feed.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: `Picture me by SAUDADE — ${SITE_NAME} 0024`,
    description: SITE_TAGLINE,
    url: SITE_URL
  },
  twitter: {
    title: `Picture me by SAUDADE — ${SITE_NAME} 0024`,
    description: SITE_TAGLINE
  }
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const products = await getMarketplaceProducts();

  return (
    <main className="overflow-x-hidden">
      <JsonLd id="ld-home-itemlist" data={itemListLd(products)} />
      <JsonLd id="ld-home-breadcrumb" data={breadcrumbLd([{ name: "Home", url: "/" }])} />
      <WorldFeed />
    </main>
  );
}
