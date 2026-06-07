import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About — Saudade Manifesto",
  description:
    "Saudade is a Portuguese word for the ache of missing something you loved. We made one t-shirt to hold it. A garment that turns the room into a private archive, and a few moments into a shared world feed.",
  keywords: [
    "saudade concept",
    "QR t-shirt concept",
    "memory garment",
    "nightlife photoshoot tee",
    "saudade manifesto"
  ],
  alternates: { canonical: "/concept" },
  openGraph: {
    type: "article",
    title: "SAUDADE Concept — Picture me for better memories",
    description: "How a tee turns the night into a private archive of natural photos.",
    url: absoluteUrl("/concept")
  }
};

export default function ConceptPage() {
  return (
    <main className="max-w-[1480px] mx-auto pt-[clamp(110px,13vh,160px)] px-[clamp(18px,4vw,60px)] pb-20 animate-fadeIn">
      <JsonLd
        id="ld-concept-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: "About", url: "/concept" }
        ])}
      />

      <article className="max-w-[780px]">
        <div className="eyebrow flex items-center gap-2">
          <span className="star">✦</span> Manifesto · Edition 0024
        </div>
        <p
          className="font-display font-medium mt-6 leading-[1.15]"
          style={{ fontSize: "clamp(28px, 3.6vw, 48px)", letterSpacing: "-0.01em" }}
        >
          Saudade is a Portuguese word for the ache of missing something you loved — a{" "}
          <em className="italic-brick">longing</em> for a moment that already passed. We made one t-shirt to
          hold it.
        </p>

        <div className="mt-9 text-ink/75 text-[15px] leading-[1.75] grid gap-4 md:columns-2 md:gap-x-12 max-w-[760px]">
          <p>
            It's a small brand. For now, a single tee — heavy ecru cotton, a brick-red print, a QR
            screen-printed across the back. We didn't want a catalogue. We wanted to do one thing properly.
          </p>
          <p>
            Wear it out. When someone scans the code on your back, they enter a private space tied to your
            exact garment. They can leave you a photo — the real one, dual-camera, the way the night actually
            looked.
          </p>
          <p>
            Most of those memories stay sealed. Private to you, the wearer. A few — the ones too good to
            keep — get shared to the World Feed, where the whole of Saudade can witness a stranger's moment
            unfold in real time.
          </p>
          <p>
            No campaign. No noise. A garment that, over time, fills up with the people who crossed your
            path. Picture me for better memories.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/shop" className="btn-editorial btn-brick">
            Get the tee <span className="arr">→</span>
          </Link>
          <Link href="/" className="btn-editorial btn-ghost">
            Open the world feed <span className="arr">→</span>
          </Link>
        </div>
      </article>

      <section className="mt-[clamp(56px,8vw,120px)] grid md:grid-cols-3 border-y border-[var(--line)]">
        {[
          ["01", "Wear", "The piece stands out without trying too hard."],
          ["02", "Scan", "The QR opens the moment instantly."],
          ["03", "Archive", "The wearer keeps the night in one private feed."]
        ].map(([n, h, p], i) => (
          <div
            key={n}
            className={"px-7 py-8 " + (i < 2 ? "md:border-r border-[var(--line)]" : "")}
          >
            <div className="font-mono text-[9px] uppercase text-brick" style={{ letterSpacing: "0.22em" }}>{n}</div>
            <h3 className="font-display font-medium italic-brick mt-2.5" style={{ fontSize: "clamp(30px, 3.4vw, 44px)" }}>{h}</h3>
            <p className="mt-3 text-stone text-[14.5px] leading-[1.6]">{p}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
