import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

type LegalSection = {
  heading: string;
  body: string[];
};

type LegalLayoutProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  pathname: string;
};

const links = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy & Use" },
  { href: "/purchase", label: "Purchase Conditions" }
];

export function LegalLayout({ eyebrow, title, intro, updated, sections, pathname }: LegalLayoutProps) {
  return (
    <main className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <JsonLd
        id={`ld-legal-${pathname.replace("/", "")}`}
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: title, url: pathname }
        ])}
      />
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">
          <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-signal shadow-signal align-middle animate-pulseGlow" />
          {eyebrow}
        </p>
        <h1 className="soft-title mt-5 font-display text-4xl font-semibold uppercase leading-[0.96] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-ink/65 sm:text-lg">{intro}</p>
        <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-stone">Updated {updated}</p>

        <nav className="mt-10 flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-red/25 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-red transition hover:border-red hover:bg-red hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-12 grid gap-8">
          {sections.map((section) => (
            <section key={section.heading} className="rounded-[24px] border border-red/15 bg-bone p-6 sm:rounded-[28px] sm:p-8">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-[-0.03em] sm:text-3xl">{section.heading}</h2>
              <div className="mt-4 grid gap-4 text-sm leading-7 text-ink/70 sm:text-base sm:leading-8">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-[24px] border border-red/20 bg-paper p-6 text-sm leading-7 text-ink/65 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-red">Contact</p>
            <p className="mt-2">Questions, returns, custom orders: hello@saudade.thehnh.tech</p>
          </div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-stone">
            Built by <Link href="https://thehnh.tech" className="text-red transition hover:text-ink">thehnh.tech</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
