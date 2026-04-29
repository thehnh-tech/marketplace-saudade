import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppPhone } from "@/components/AppPhone";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { appSteps } from "@/data/products";
import { getMarketplaceProducts } from "@/lib/products";
import { breadcrumbLd, itemListLd, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${SITE_NAME} 0024 — Night Access · Premium Streetwear T-Shirt with QR Code`,
  description:
    "SAUDADE 0024 Night Access. A heavyweight oversized t-shirt with a real QR code that turns every party into a private photo archive. Picture me for better memories — shipped worldwide from Switzerland.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: `${SITE_NAME} 0024 — Night Access`,
    description: SITE_TAGLINE,
    url: SITE_URL
  },
  twitter: {
    title: `${SITE_NAME} 0024 — Night Access`,
    description: SITE_TAGLINE
  }
};

export default async function HomePage() {
  const products = await getMarketplaceProducts();
  const heroProduct = products[0];

  return (
    <main>
      <JsonLd id="ld-home-itemlist" data={itemListLd(products)} />
      <JsonLd id="ld-home-breadcrumb" data={breadcrumbLd([{ name: "Home", url: "/" }])} />
      <section className="relative overflow-hidden border-b border-red/20 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <span className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-red/15 blur-3xl" />
        <span className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-signal/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="py-4 sm:py-8 lg:py-20">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">
              <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-signal shadow-signal align-middle animate-pulseGlow" />
              Night Access Drop
            </p>
            <h1 className="soft-title mt-6 font-display text-6xl font-semibold uppercase leading-[0.9] sm:text-8xl lg:text-[8.5rem]">
              Collection 0024
            </h1>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-red">Picture me for better memories</p>
            <p className="mt-8 max-w-md text-base leading-8 text-ink/68 sm:text-lg">
              A tee for the nights you do not want to lose. Scan the piece, send a photo, keep the memory.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="rounded-full bg-red px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-paper transition hover:bg-signal hover:shadow-signal"
              >
                Shop the drop
              </Link>
              <Link
                href="/app-experience"
                className="rounded-full border border-red/25 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-red transition hover:border-red hover:bg-red hover:text-paper"
              >
                How it works
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-night shadow-red sm:rounded-[38px]">
              <Image
                src={heroProduct.cardImage}
                alt={heroProduct.title}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
                priority
              />
              <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-red">
                Drop 0024 — Live
              </span>
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-paper">
                <span className="h-1 w-1 rounded-full bg-signal animate-pulseGlow" />
                Scan ready
              </span>
            </div>
          </div>
        </div>
      </section>
      <Marquee items={["SAUDADE 0024", "NIGHT ACCESS", "WHITE / RED", "NOT FOR EVERYONE"]} />

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeader
            eyebrow="T-shirts"
            title="Clean fit. Loud back. Private access."
            copy="The launch starts with oversized tees. Big cotton, sharp red print, and a QR that actually means something."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid border-y border-red/20 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="p-6 sm:p-12 lg:p-16">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">The point</p>
          <h2 className="soft-title mt-6 font-display text-4xl font-semibold uppercase leading-[0.96] sm:text-6xl lg:text-7xl">
            Wear it. Let people scan it.
          </h2>
          <p className="mt-7 max-w-sm text-base leading-8 text-ink/65 sm:text-lg">
            The QR is part of the design. In real life, it opens a private capture page linked to your piece.
          </p>
          <Link
            href="/concept"
            className="mt-10 inline-flex rounded-full border border-red/25 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-red transition hover:border-red hover:bg-red hover:text-paper"
          >
            Read the story
          </Link>
        </div>
        <div className="relative min-h-[360px] overflow-hidden bg-bone sm:min-h-[480px] lg:min-h-[520px]">
          <Image src="/assets/back.png" alt="SAUDADE back print" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-contain p-6 sm:p-12" />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red to-transparent" />
        </div>
      </section>

      <section className="bg-ink px-4 py-16 text-paper sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            dark
            eyebrow="App experience"
            title="The memory lands in your feed."
            copy="Someone scans the tee, takes a live photo, and you receive it. Simple."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <AppPhone mode="capture" />
            <div className="grid gap-3">
              {appSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-[24px] border border-paper/10 bg-paper/[0.04] p-5 transition hover:border-red/45"
                >
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-red">{step.meta}</p>
                  <h3 className="mt-3 font-display text-xl font-semibold uppercase tracking-[-0.03em] sm:text-2xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-paper/60">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
