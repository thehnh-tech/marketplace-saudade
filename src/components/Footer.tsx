"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <footer className="border-t border-[var(--line)] bg-paper pt-[clamp(48px,7vw,90px)] pb-[calc(60px+env(safe-area-inset-bottom))] md:pb-[clamp(48px,7vw,90px)] px-[clamp(18px,4vw,60px)]">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1.4fr] gap-10 items-start">
          <div>
            <Logo size={22} />
            <p className="mt-3 max-w-[260px] text-stone text-[13.5px] leading-[1.6]">
              One t-shirt that remembers. A world feed of moments, most sealed, a few shared. Edition 0024.
            </p>
            <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase text-stone" style={{ letterSpacing: "0.22em" }}>
              <span className="inline-flex items-center gap-2">
                <span className="live-dot" />
                Worldwide
              </span>
              <span className="text-ink/30">/</span>
              <span>Ed. 0024</span>
            </div>
          </div>

          <FCol
            title="Shop"
            items={[
              { label: "The Tee", href: "/shop" },
              { label: "How it works", href: "/app-experience" }
            ]}
          />

          <FCol
            title="Saudade"
            items={[
              { label: "World Feed", href: "/" },
              { label: "Concept", href: "/concept" },
              { label: "Cart", href: "/cart" }
            ]}
          />

          <div>
            <h4 className="font-mono text-[9.5px] uppercase text-ink mb-4" style={{ letterSpacing: "0.22em" }}>
              Stay close
            </h4>
            <p className="text-stone text-[12.5px] leading-[1.6] mb-3">
              No spam. One email when something new lands.
            </p>
            <form className="flex border border-[var(--line-2)]" onSubmit={(e) => e.preventDefault()}>
              <input
                placeholder="Email"
                type="email"
                aria-label="Email"
                className="flex-1 px-3 py-3 bg-transparent border-0 outline-none font-mono text-[10px] uppercase text-ink placeholder:text-stone"
                style={{ letterSpacing: "0.08em" }}
              />
              <button type="submit" className="px-4 bg-ink text-paper font-mono text-[10px]">→</button>
            </form>
          </div>
        </div>

        <div className="foot-mark mt-12 mb-2">Saudade</div>

        <div className="mt-4 pt-4 border-t border-[var(--line)] flex flex-wrap justify-between gap-4 font-mono text-[9px] uppercase text-stone" style={{ letterSpacing: "0.2em" }}>
          <span>© 2026 Saudade</span>
          <span>Picture me for better memories</span>
          <span>Made in Portugal · Ed. 0024</span>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-4 font-mono text-[9px] uppercase text-stone" style={{ letterSpacing: "0.2em" }}>
          <Link href="/terms" className="hover:text-brick transition">Terms</Link>
          <Link href="/privacy" className="hover:text-brick transition">Privacy</Link>
          <Link href="/purchase" className="hover:text-brick transition">Purchase</Link>
          <a href="mailto:hello@saudade.thehnh.tech" className="hover:text-brick transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function FCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-mono text-[9.5px] uppercase text-ink mb-4" style={{ letterSpacing: "0.22em" }}>
        {title}
      </h4>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-stone text-[13.5px] hover:text-brick transition">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
