import type { Metadata } from "next";
import Link from "next/link";
import { AppPhone } from "@/components/AppPhone";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { PublicFeedPhone } from "@/components/PublicFeedPhone";
import { SectionHeader } from "@/components/SectionHeader";
import { appSteps } from "@/data/products";
import { getMarketplaceProducts } from "@/lib/products";
import { breadcrumbLd, itemListLd, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Picture me by SAUDADE - ${SITE_NAME} 0024 Night Access`,
  description:
    "Picture me by SAUDADE. A live public sticker QR feed connected to SAUDADE 0024 Night Access streetwear, shipped worldwide from Switzerland.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: `Picture me by SAUDADE - ${SITE_NAME} 0024`,
    description: SITE_TAGLINE,
    url: SITE_URL
  },
  twitter: {
    title: `Picture me by SAUDADE - ${SITE_NAME} 0024`,
    description: SITE_TAGLINE
  }
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const products = await getMarketplaceProducts();

  return (
    <main>
      <JsonLd id="ld-home-itemlist" data={itemListLd(products)} />
      <JsonLd id="ld-home-breadcrumb" data={breadcrumbLd([{ name: "Home", url: "/" }])} />
      <section className="relative overflow-hidden border-b border-red/20 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red/45 to-transparent" />
        <div className="relative mx-auto grid min-h-[calc(100svh-92px)] max-w-[1500px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="py-4 sm:py-8 lg:py-14">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">
              <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-signal shadow-signal align-middle animate-pulseGlow" />
              Global sticker project
            </p>
            <h1 className="soft-title mt-6 max-w-4xl font-display text-6xl font-semibold uppercase leading-[0.9] sm:text-8xl lg:text-[8.2rem]">
              Picture me BY SAUDADE
            </h1>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-red">A sticker QR from the four corners of the world</p>
            <p className="mt-8 max-w-xl text-base leading-8 text-ink/68 sm:text-lg">
              Scan the special SAUDADE sticker, take a live photo, and enter the public homepage feed. The clothing brand becomes a moving archive of real moments.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="rounded-full bg-red px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-paper transition hover:bg-signal hover:shadow-signal"
              >
                Shop the drop
              </Link>
              <Link
                href="/concept"
                className="rounded-full border border-red/25 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-red transition hover:border-red hover:bg-red hover:text-paper"
              >
                Read the concept
              </Link>
            </div>
          </div>
          <div className="relative grid gap-5 py-2 lg:py-8">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:ml-auto lg:text-left">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">Live homepage feed</p>
              <p className="mt-3 text-sm leading-7 text-ink/65">
                This feed updates every minute with photos sent from a special QR code placed around the world.
              </p>
            </div>
            <PublicFeedPhone />
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

      <section className="border-y border-red/20 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">The point</p>
            <h2 className="soft-title mt-6 font-display text-4xl font-semibold uppercase leading-[0.96] sm:text-6xl lg:text-7xl">
              Wear it. Let people scan it.
            </h2>
            <p className="mt-7 max-w-md text-base leading-8 text-ink/65 sm:text-lg">
              The QR is part of the design. In real life, it opens a private capture page linked to your piece.
            </p>
            <Link
              href="/concept"
              className="mt-10 inline-flex rounded-full border border-red/25 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-red transition hover:border-red hover:bg-red hover:text-paper"
            >
              Read the story
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { meta: "01", title: "Heavyweight cotton", copy: "260 GSM oversized boxy fit. Built to live in late and stay sharp." },
              { meta: "02", title: "QR sewn into the design", copy: "A working code printed in red. Scan opens the private camera page." },
              { meta: "03", title: "Worldwide", copy: "Shipped from Switzerland. Stripe checkout. 14-day return on unworn pieces." }
            ].map((item) => (
              <div
                key={item.meta}
                className="group relative overflow-hidden rounded-[26px] border border-red/20 bg-bone p-6 transition hover:border-red/55 sm:p-7"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red to-transparent opacity-0 transition group-hover:opacity-100" />
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-red">{item.meta}</p>
                <p className="mt-4 font-display text-lg font-semibold uppercase tracking-normal sm:text-xl">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-ink/65">{item.copy}</p>
              </div>
            ))}
          </div>
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
                  <h3 className="mt-3 font-display text-xl font-semibold uppercase tracking-normal sm:text-2xl">{step.title}</h3>
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
