import Link from "next/link";
import Image from "next/image";
import { Marquee } from "./Marquee";

export function Footer() {
  return (
    <footer className="border-t border-red/30 bg-paper">
      <Marquee />
      <div className="mx-auto grid max-w-[1500px] gap-10 px-4 py-14 sm:px-6 sm:gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Image
            src="/logo.png"
            alt="SAUDADE"
            width={148}
            height={148}
            className="h-28 w-28 rounded-[28px] border border-red/20 shadow-red sm:h-32 sm:w-32"
            priority
          />
          <p className="mt-5 font-display text-5xl font-semibold uppercase tracking-normal text-red sm:text-6xl">Saudade</p>
          <p className="mt-5 max-w-md text-sm leading-7 text-ink/70">
            Built for the night. Remembered forever. A garment becomes a signal, a door, and a private archive.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-stone">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-signal animate-pulseGlow" />
              0024 — Live
            </span>
            <span className="text-ink/30">/</span>
            <span>Shipped worldwide</span>
          </div>
        </div>
        <div>
          <p className="mb-5 font-display text-sm font-semibold uppercase tracking-normal text-red">Navigation</p>
          <div className="grid gap-3 text-sm font-medium text-ink/70">
            <Link href="/shop" className="transition hover:text-red">Shop</Link>
            <Link href="/concept" className="transition hover:text-red">Concept</Link>
            <Link href="/app-experience" className="transition hover:text-red">Night Access</Link>
            <Link href="/cart" className="transition hover:text-red">Cart</Link>
          </div>
        </div>
        <div>
          <p className="mb-5 font-display text-sm font-semibold uppercase tracking-normal text-red">Legal</p>
          <div className="grid gap-3 text-sm font-medium text-ink/70">
            <Link href="/terms" className="transition hover:text-red">Terms of Service</Link>
            <Link href="/privacy" className="transition hover:text-red">Privacy & Use</Link>
            <Link href="/purchase" className="transition hover:text-red">Purchase Conditions</Link>
            <a href="mailto:hello@saudade.thehnh.tech" className="transition hover:text-red">Contact</a>
          </div>
        </div>
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-normal text-red">Private list</p>
          <form className="mt-5 flex border border-red/35 bg-bone focus-within:border-red">
            <input
              className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm outline-none placeholder:text-ink/40"
              placeholder="email@night.access"
              type="email"
              aria-label="Email"
            />
            <button
              type="submit"
              className="bg-red px-5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-paper transition hover:bg-ink"
            >
              Join
            </button>
          </form>
          <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-stone">
            Worldwide shipping from Switzerland.
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 border-t border-red/25 px-4 py-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-ink/60 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <span>SAUDADE © 2026</span>
        <span className="text-stone">Picture me for better memories</span>
        <span className="inline-flex items-center gap-2">
          Built by
          <a href="https://thehnh.tech" target="_blank" rel="noreferrer" className="text-red transition hover:text-ink">
            thehnh.tech
          </a>
        </span>
      </div>
    </footer>
  );
}
