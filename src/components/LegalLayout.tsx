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
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/purchase", label: "Purchase" }
];

export function LegalLayout({ eyebrow, title, intro, updated, sections, pathname }: LegalLayoutProps) {
  return (
    <main className="max-w-[1480px] mx-auto pt-[clamp(110px,13vh,160px)] px-[clamp(18px,4vw,60px)] pb-20 animate-fadeIn">
      <JsonLd
        id={`ld-legal-${pathname.replace("/", "")}`}
        data={breadcrumbLd([
          { name: "Home", url: "/" },
          { name: title, url: pathname }
        ])}
      />
      <div className="max-w-4xl">
        <div className="eyebrow flex items-center gap-2">
          <span className="star">✦</span> {eyebrow}
        </div>
        <h1 className="font-display font-medium mt-3.5 leading-[1.02]" style={{ fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.01em" }}>
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-ink/75 text-[16px] leading-[1.7]">{intro}</p>
        <p className="mt-4 font-mono text-[10px] uppercase text-stone" style={{ letterSpacing: "0.22em" }}>Updated {updated}</p>

        <nav className="mt-8 flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                "btn-editorial " +
                (pathname === link.href ? "btn-brick" : "btn-outline")
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-12 grid gap-7">
          {sections.map((section) => (
            <section key={section.heading} className="border-t border-[var(--line)] pt-7">
              <h2 className="font-display font-medium" style={{ fontSize: "clamp(24px, 2.6vw, 32px)" }}>{section.heading}</h2>
              <div className="mt-4 grid gap-3 text-ink/75 text-[15px] leading-[1.75]">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--line)] pt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase text-brick" style={{ letterSpacing: "0.22em" }}>Contact</p>
            <p className="mt-1.5 text-ink/75 text-[14.5px]">Questions, returns, custom orders: hello@saudade.thehnh.tech</p>
          </div>
          <p className="font-mono text-[10px] uppercase text-stone" style={{ letterSpacing: "0.22em" }}>
            Built by <Link href="https://thehnh.tech" className="text-brick hover:text-ink transition">thehnh.tech</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
