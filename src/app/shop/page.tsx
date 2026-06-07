import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { getMarketplaceProducts } from "@/lib/products";
import { absoluteUrl, breadcrumbLd, itemListLd, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Shop — SAUDADE 0024 Night Access Drop",
  description:
    "Shop the SAUDADE 0024 Night Access drop: heavyweight oversized t-shirts with a real QR code printed in the design. White / Red leads the launch, darker variants preview the next drop. Shipped worldwide from Switzerland.",
  keywords: [
    "shop saudade",
    "saudade 0024 drop",
    "oversized streetwear t-shirt",
    "QR code tee",
    "premium graphic tee",
    "nightlife streetwear shop"
  ],
  alternates: { canonical: "/shop" },
  openGraph: {
    type: "website",
    title: "Shop — SAUDADE 0024 Night Access",
    description: "Heavyweight oversized t-shirts with QR access. White / Red leads the launch.",
    url: absoluteUrl("/shop")
  },
  twitter: {
    title: "Shop — SAUDADE 0024",
    description: "Heavyweight oversized t-shirts with QR access."
  }
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const collectionPageLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${SITE_NAME} 0024 — Night Access`,
  description: "Heavyweight oversized t-shirts with QR access. The first SAUDADE drop.",
  url: absoluteUrl("/shop"),
  inLanguage: "en",
  isPartOf: { "@id": "https://saudade.thehnh.tech#website" },
  about: { "@type": "Thing", name: "Streetwear t-shirts" }
} as const;

export default async function ShopPage() {
  const products = await getMarketplaceProducts();

  return (
    <main className="max-w-[1480px] mx-auto pt-[clamp(110px,13vh,160px)] px-[clamp(18px,4vw,60px)] pb-20 animate-fadeIn">
      <JsonLd id="ld-shop-collection" data={collectionPageLd} />
      <JsonLd id="ld-shop-itemlist" data={itemListLd(products)} />
      <JsonLd
        id="ld-shop-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: "Shop", url: "/shop" }
        ])}
      />
      <SectionHeader
        eyebrow="✦ T-shirts"
        title="Saudade 0024 — Night Access"
        copy="The first category opens with heavyweight oversized graphic tees. White / Red leads the launch; darker variants preview the next drop. Shipped worldwide from Switzerland."
      />
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-[var(--line)] py-5 font-mono text-[10px] uppercase" style={{ letterSpacing: "0.22em" }}>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-brick">
          <span>Drop 0024</span>
          <span className="text-stone">Category: T-shirts</span>
          <span className="text-stone">Size: All</span>
        </div>
        <span className="text-stone">Sort: Newest</span>
      </div>
      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
