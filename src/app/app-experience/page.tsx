import type { Metadata } from "next";
import Link from "next/link";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How it works — Saudade Night Access",
  description:
    "How the SAUDADE Night Access flow works. Scan the QR on the tee, take a dual-camera photo, and leave it sealed in the wearer's private archive — or share it with the World Feed.",
  keywords: [
    "night access",
    "QR scan to camera",
    "private photo feed",
    "saudade app",
    "memory archive"
  ],
  alternates: { canonical: "/app-experience" },
  openGraph: {
    type: "article",
    title: "SAUDADE — How it works",
    description: "Scan the tee, send a paired capture, keep the night.",
    url: absoluteUrl("/app-experience")
  }
};

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Use SAUDADE Night Access",
  description: "Turn a SAUDADE tee into a private memory feed in four steps.",
  totalTime: "PT1M",
  tool: [{ "@type": "HowToTool", name: "SAUDADE Night Access tee" }, { "@type": "HowToTool", name: "Smartphone camera" }],
  step: [
    { "@type": "HowToStep", position: 1, name: "Scan the back", text: "Point any phone camera at the QR printed on the back of the tee. No app to download." },
    { "@type": "HowToStep", position: 2, name: "Enter Saudade", text: "The garment opens a private space tied to that exact piece — and only that piece." },
    { "@type": "HowToStep", position: 3, name: "Leave a memory", text: "Take a dual-camera photo, the way the moment really looked. Send it to the wearer." },
    { "@type": "HowToStep", position: 4, name: "Sealed or shared", text: "It lands in the wearer's private archive. With one tap, they can share it to the World Feed." }
  ]
} as const;

export default function AppExperiencePage() {
  return (
    <main className="max-w-[1480px] mx-auto pt-[clamp(110px,13vh,160px)] px-[clamp(18px,4vw,60px)] pb-20 animate-fadeIn">
      <JsonLd id="ld-experience-howto" data={howToLd} />
      <JsonLd
        id="ld-experience-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: "How it works", url: "/app-experience" }
        ])}
      />

      <header className="mb-[clamp(30px,4vw,52px)]">
        <div className="eyebrow flex items-center gap-2">
          <span className="star">✦</span> How it works
        </div>
        <h2 className="font-display font-medium mt-3 leading-[1.02]" style={{ fontSize: "clamp(30px, 4.5vw, 56px)", letterSpacing: "-0.01em" }}>
          A t-shirt that<br /><span className="italic-brick">keeps the moment.</span>
        </h2>
      </header>

      <HowItWorks />

      <section className="mt-[clamp(56px,8vw,120px)]">
        <div className="corner-frame relative border border-[var(--line)] p-6 sm:p-12 lg:p-16">
          <div className="eyebrow flex items-center gap-2">
            <span className="star">✦</span> The whole idea
          </div>
          <h2 className="font-display font-medium mt-7 max-w-4xl leading-[1.02]" style={{ fontSize: "clamp(34px, 5vw, 64px)", letterSpacing: "-0.01em" }}>
            Your garment becomes proof that<br />
            <span className="italic-brick">the night happened.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-ink/70 text-[16px] leading-[1.7]">
            No overexplaining. You wear it. People scan it. The best moments come back to you, sealed by default.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/shop" className="btn-editorial btn-brick">
              Get the tee <span className="arr">→</span>
            </Link>
            <Link href="/" className="btn-editorial btn-outline">
              Open the world feed <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
