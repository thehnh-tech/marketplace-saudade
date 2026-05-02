import type { Metadata } from "next";
import { AppPhone } from "@/components/AppPhone";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/SectionHeader";
import { appSteps } from "@/data/products";
import { absoluteUrl, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Night Access App - Scan, capture, archive",
  description:
    "How the SAUDADE Night Access app works. Scan the QR on the tee, capture a rear shot and a front shot, then the pair lands in the owner's private feed.",
  keywords: [
    "night access app",
    "QR scan to camera",
    "private photo feed",
    "saudade app experience",
    "memory archive app"
  ],
  alternates: { canonical: "/app-experience" },
  openGraph: {
    type: "article",
    title: "SAUDADE Night Access App",
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
    { "@type": "HowToStep", position: 1, name: "Scan the code", text: "Someone scans the QR printed on the tee with their phone camera." },
    { "@type": "HowToStep", position: 2, name: "Camera opens", text: "The Night Access camera page opens immediately. It captures a rear frame, then flips to the front frame." },
    { "@type": "HowToStep", position: 3, name: "Send the pair", text: "They review the two shots and send them together." },
    { "@type": "HowToStep", position: 4, name: "Keep the archive", text: "The owner receives the paired capture in their private SAUDADE feed." }
  ]
} as const;

export default function AppExperiencePage() {
  return (
    <main className="bg-ink text-paper">
      <JsonLd id="ld-experience-howto" data={howToLd} />
      <JsonLd
        id="ld-experience-breadcrumb"
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: "Night Access", url: "/app-experience" }
        ])}
      />
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeader
            dark
            eyebrow="Night Access"
            title="Scan it. Shoot it. Keep both frames."
            copy="SAUDADE turns a tee into a private memory drop. The QR opens the camera. Rear and front shots land in the owner feed as one pair."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div className="grid gap-6 sm:grid-cols-2">
              <AppPhone mode="capture" />
              <AppPhone mode="feed" title="Your Feed" />
            </div>
            <div className="grid gap-4">
              {appSteps.map((step) => (
                <div
                  key={step.title}
                  className="group relative overflow-hidden rounded-[28px] border border-paper/10 bg-paper/[0.04] p-6 transition hover:border-red/45"
                >
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">{step.meta}</p>
                  <h2 className="mt-4 font-display text-2xl font-semibold uppercase tracking-normal sm:text-3xl">{step.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-paper/60">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-red/25 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="corner-frame mx-auto max-w-[1500px] rounded-[34px] border border-red/25 p-6 sm:p-12 lg:p-16">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-red">The whole idea</p>
          <h2 className="soft-title mt-6 max-w-5xl font-display text-4xl font-semibold uppercase leading-[0.96] sm:text-6xl lg:text-7xl">
            Your garment becomes proof that the night happened.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-paper/62 sm:text-lg">
            No overexplaining. You wear it. People scan it. The best moments come back to you.
          </p>
        </div>
      </section>
    </main>
  );
}
