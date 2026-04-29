import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/SectionHeader";
import { absoluteUrl, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Concept — A tee that makes the night easier to remember",
  description:
    "Why SAUDADE exists: a premium oversized tee with a real QR code that turns the room into a soft photoshoot, captures spontaneous moments, and brings the best shots back to the person wearing the piece.",
  keywords: [
    "saudade concept",
    "QR t-shirt concept",
    "memory garment",
    "party photo experience",
    "nightlife photoshoot tee"
  ],
  alternates: { canonical: "/concept" },
  openGraph: {
    type: "article",
    title: "SAUDADE Concept — Picture me for better memories",
    description: "How a tee turns the night into a private archive of natural photos.",
    url: absoluteUrl("/concept")
  }
};

const moments = [
  {
    title: "Natural photoshoot",
    copy: "The tee gives people a reason to take your picture without making it awkward. It turns the room into a soft photoshoot."
  },
  {
    title: "Better party memories",
    copy: "A night usually disappears into random camera rolls. SAUDADE brings the best shots back to the person wearing the piece."
  },
  {
    title: "Social icebreaker",
    copy: "The QR starts the conversation. Someone scans, captures the moment, and becomes part of the story."
  }
];

export default function ConceptPage() {
  return (
    <main>
      <JsonLd
        id="ld-concept-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: "Concept", url: "/concept" }
        ])}
      />
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeader
            eyebrow="Concept"
            title="A tee that makes the night easier to remember."
            copy="SAUDADE is made for parties, clubs, pop-ups, afters, trips, and every moment where photos happen naturally."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-[28px] border border-red/20 bg-bone p-6 sm:rounded-[34px] sm:p-10">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red to-transparent" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">Picture me for better memories</p>
              <h2 className="soft-title mt-6 font-display text-3xl font-semibold uppercase leading-[0.98] sm:text-5xl lg:text-6xl">
                People scan the shirt. You get the memories.
              </h2>
              <p className="mt-7 text-base leading-8 text-ink/68 sm:text-lg sm:leading-9">
                The product is simple: a premium oversized tee with a real QR code printed into the design. When someone scans it, they open a camera page, take a live photo, and send it to the owner.
              </p>
              <p className="mt-5 text-base leading-8 text-ink/68 sm:text-lg sm:leading-9">
                In a party, this changes the energy. You are not asking everyone to send photos later. The shirt does it for you. It creates spontaneous shots, natural portraits, group moments, and memories that usually get lost.
              </p>
            </div>
            <div className="grid gap-4">
              {moments.map((moment) => (
                <div
                  key={moment.title}
                  className="group relative overflow-hidden rounded-[26px] border border-red/20 bg-paper p-6 transition hover:border-red/55 sm:rounded-[30px] sm:p-7"
                >
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red to-transparent opacity-0 transition group-hover:opacity-100" />
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.26em] text-red">{moment.title}</p>
                  <p className="mt-4 text-base leading-8 text-ink/65">{moment.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid border-y border-red/25 lg:grid-cols-3">
        {[
          ["Wear", "The piece stands out without trying too hard."],
          ["Scan", "The QR opens the moment instantly."],
          ["Archive", "The owner keeps the night in one private feed."]
        ].map(([title, copy], index) => (
          <div
            key={title}
            className="relative p-8 sm:p-12 lg:p-16 lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-red/25"
          >
            <span className="pointer-events-none absolute left-0 top-0 hidden h-px w-12 bg-red lg:block" />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-stone">0{index + 1}</p>
            <p className="soft-title mt-3 font-display text-4xl font-semibold uppercase text-red sm:text-5xl">{title}</p>
            <p className="mt-6 leading-8 text-ink/65">{copy}</p>
          </div>
        ))}
      </section>
      <CTASection />
    </main>
  );
}
