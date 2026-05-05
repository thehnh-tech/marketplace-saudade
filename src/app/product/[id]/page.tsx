import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppPhone } from "@/components/AppPhone";
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
    <main>
      <JsonLd id={`ld-product-${product.id}`} data={productLd(product)} />
      <JsonLd
        id={`ld-product-${product.id}-breadcrumb`}
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: "Shop", url: "/shop" },
          { name: product.shortTitle, url: `/product/${product.id}` }
        ])}
      />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1500px] px-4 pt-6 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap gap-x-2 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-stone">
          <li><Link href="/" className="transition hover:text-red">Home</Link></li>
          <li className="text-ink/30">/</li>
          <li><Link href="/shop" className="transition hover:text-red">Shop</Link></li>
          <li className="text-ink/30">/</li>
          <li className="text-red">{product.colorway}</li>
        </ol>
      </nav>

      <section className="grid border-b border-red/20 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-night shadow-red sm:rounded-[34px]">
            <Image
              src={product.cardImage}
              alt={`${product.title} — front view`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
            <span
              className={
                available
                  ? "absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-paper/90 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-red"
                  : "absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-ink/80 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-red"
              }
            >
              <span className={available ? "h-1.5 w-1.5 rounded-full bg-signal animate-pulseGlow" : "h-1.5 w-1.5 rounded-full bg-red/70"} />
              {available ? "Drop 0024 — Live" : "Preview"}
            </span>
          </div>
        </div>

        <aside className="px-5 py-10 sm:px-8 sm:py-12 lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto lg:px-12 lg:py-14">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">{product.collection}</p>
          <h1 className="soft-title mt-5 font-display text-4xl font-semibold uppercase leading-[0.96] sm:text-5xl lg:text-6xl">
            {product.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <p className="text-2xl font-semibold" itemProp="price">
              <span className="sr-only">Price:</span>
              {product.price} EUR
            </p>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-stone">{product.colorway}</span>
          </div>
          <p className="mt-4 text-base font-medium text-red">{product.vibe}</p>
          <p className="mt-6 max-w-xl text-base leading-8 text-ink/65 sm:text-[17px]">{product.description}</p>

          <ul className="mt-6 grid gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink/55">
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-red" />
              Shipped worldwide from Switzerland
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-red" />
              Secure Stripe checkout
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-red" />
              14-day return on unworn pieces
            </li>
          </ul>

          <BuyPanel product={product} />
        </aside>
      </section>

      <section className="grid border-b border-red/20 lg:grid-cols-2">
        <div className="p-6 sm:p-10 lg:p-16">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">Why it hits</h2>
          <ul className="mt-8 grid gap-3">
            {product.details.map((detail) => (
              <li
                key={detail}
                className="flex items-start gap-3 rounded-[22px] border border-red/15 bg-bone px-5 py-4 text-ink/75 transition hover:border-red/45"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                <span className="leading-7">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-ink p-6 text-paper sm:p-10 lg:p-16">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">The QR</p>
          <h2 className="soft-title mt-6 font-display text-4xl font-semibold uppercase leading-[0.96] sm:text-5xl">
            It is part of the fit.
          </h2>
          <p className="mt-6 max-w-md leading-8 text-paper/65">
            The code is not a gimmick. It opens a private photo flow tied to the garment. Someone scans, captures the moment, and you keep it.
          </p>
          <div className="mt-10">
            <AppPhone mode="capture" />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">Next step</p>
        <h2 className="soft-title mx-auto mt-5 max-w-4xl font-display text-4xl font-semibold uppercase leading-[0.96] sm:text-6xl lg:text-7xl">
          Wear it first. Let the night fill the archive.
        </h2>
        <Link
          href="/app-experience"
          className="mt-8 inline-flex rounded-full border border-red/25 px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-red transition hover:border-red hover:bg-red hover:text-paper"
        >
          See how access works
        </Link>
      </section>
    </main>
  );
}
