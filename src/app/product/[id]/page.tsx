import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyPanel } from "@/components/BuyPanel";
import { JsonLd } from "@/components/JsonLd";
import { getMarketplaceProductById } from "@/lib/products";
import { absoluteUrl, breadcrumbLd, productLd } from "@/lib/seo";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getMarketplaceProductById(id);
  if (!product) {
    return {
      title: "Product not found",
      robots: { index: false, follow: false }
    };
  }

  const url = `/product/${product.id}`;
  const price = product.price.toFixed(2);
  const description = `${product.description} — ${product.vibe} ${product.price} EUR. Shipped worldwide from Switzerland.`;

  return {
    title: `${product.shortTitle} (${product.colorway}) — SAUDADE 0024`,
    description,
    keywords: product.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: product.title,
      description,
      url: absoluteUrl(url),
      images: [
        {
          url: product.cardImage,
          width: 1200,
          height: 1500,
          alt: product.title,
          type: "image/png"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.vibe,
      images: [product.cardImage]
    },
    other: {
      "product:price:amount": price,
      "product:price:currency": "EUR",
      "og:price:amount": price,
      "og:price:currency": "EUR",
      "og:availability": product.status === "available" ? "instock" : "preorder",
      "product:availability": product.status === "available" ? "instock" : "preorder",
      "product:condition": "new",
      "product:brand": "SAUDADE",
      "product:retailer_item_id": product.id
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getMarketplaceProductById(id);
  if (!product) notFound();

  const available = product.status === "available";

  return (
    <main className="max-w-[1480px] mx-auto pt-[clamp(110px,13vh,160px)] px-[clamp(18px,4vw,60px)] pb-20 animate-fadeIn">
      <JsonLd id={`ld-product-${product.id}`} data={productLd(product)} />
      <JsonLd
        id={`ld-product-${product.id}-breadcrumb`}
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: "Shop", url: "/shop" },
          { name: product.shortTitle, url: `/product/${product.id}` }
        ])}
      />

      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap gap-x-2 font-mono text-[10px] uppercase text-stone" style={{ letterSpacing: "0.22em" }}>
          <li><Link href="/" className="transition hover:text-brick">World Feed</Link></li>
          <li className="text-ink/30">/</li>
          <li><Link href="/shop" className="transition hover:text-brick">Shop</Link></li>
          <li className="text-ink/30">/</li>
          <li className="text-brick">{product.colorway}</li>
        </ol>
      </nav>

      <section className="grid lg:grid-cols-[1.15fr_1fr] gap-[clamp(28px,4vw,72px)] items-start">
        <div className="flex flex-col gap-2">
          <div className="relative aspect-[4/5] bg-bone border border-[var(--line)] overflow-hidden">
            <Image
              src={product.cardImage}
              alt={`${product.title} — front view`}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              priority
            />
            <span
              className={
                available
                  ? "absolute left-4 top-4 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase text-paper bg-brick"
                  : "absolute left-4 top-4 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase text-paper bg-ink/90"
              }
              style={{ letterSpacing: "0.22em" }}
            >
              <span className={available ? "h-1.5 w-1.5 rounded-full bg-paper live-dot" : "h-1.5 w-1.5 rounded-full bg-paper/70"} />
              {available ? "Ed. 0024 — Live" : "Preview"}
            </span>
          </div>
          {product.images.length > 1 ? (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, i) => (
                <div key={image.label + i} className="aspect-square bg-bone border border-[var(--line)] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.label}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="eyebrow flex items-center gap-2">
            <span className="star">✦</span> {product.collection} · 1 of 1 styles
          </div>
          <h1 className="font-display font-medium mt-2 leading-[1.02]" style={{ fontSize: "clamp(40px, 5vw, 68px)", letterSpacing: "-0.015em" }}>
            Night Access<br />Tee.
          </h1>
          <div className="font-display font-medium mt-3.5" style={{ fontSize: "30px" }}>
            €{product.price}.00
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase text-stone" style={{ letterSpacing: "0.22em" }}>
            {product.colorway}
          </p>
          <p className="mt-5 max-w-[460px] text-ink/75 text-[15px] leading-[1.7]">{product.description}</p>

          <BuyPanel product={product} />

          <div className="mt-8 border-t border-[var(--line)]">
            {[
              ["Cut", "Boxy / oversized"],
              ["Fabric", "260 GSM heavy cotton"],
              ["Print", "Hand screen-print"],
              ["Back", "Scannable QR + wordmark"],
              ["Origin", "Made in Switzerland"],
              ["Run", "Limited · 0024"]
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between gap-4 py-3 border-b border-[var(--line)] text-[13px]"
              >
                <span className="font-mono text-[9.5px] uppercase text-stone" style={{ letterSpacing: "0.2em" }}>
                  {k}
                </span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-[clamp(56px,8vw,120px)]">
        <div className="grid md:grid-cols-3 border-y border-[var(--line)]">
          {[
            ["01", "It remembers", "Every scan adds a memory to the garment's private archive."],
            ["02", "Heavy cotton", "260 GSM, garment-dyed ecru, built to outlive the trend cycle."],
            ["03", "One of one", "A single style. Edition 0024. When it's gone, it's gone."]
          ].map(([n, h, p], i) => (
            <div
              key={n}
              className={
                "px-7 py-8 " + (i < 2 ? "md:border-r border-[var(--line)]" : "")
              }
            >
              <div className="font-mono text-[9px] uppercase text-brick" style={{ letterSpacing: "0.22em" }}>{n}</div>
              <h4 className="font-display font-medium mt-2.5" style={{ fontSize: "23px" }}>{h}</h4>
              <p className="mt-1.5 text-stone text-[13px] leading-[1.6]">{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[clamp(56px,8vw,120px)] text-center">
        <div className="eyebrow inline-flex items-center gap-2 justify-center">
          <span className="star">✦</span> The promise
        </div>
        <h2 className="font-display font-medium mt-3.5 leading-[1.05]" style={{ fontSize: "clamp(30px, 4.6vw, 60px)" }}>
          Picture me for<br /><span className="italic-brick">better memories.</span>
        </h2>
        <Link href="/app-experience" className="btn-editorial btn-outline mt-8 inline-flex">
          See how it works <span className="arr">→</span>
        </Link>
      </section>
    </main>
  );
}
