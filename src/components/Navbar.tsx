"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/concept", label: "Story" },
  { href: "/app-experience", label: "Access" },
  { href: "/cart", label: "Cart" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function readCart() {
      try {
        const raw = window.localStorage.getItem("saudade:draft-order");
        setCartCount(raw ? 1 : 0);
      } catch {
        setCartCount(0);
      }
    }
    readCart();
    window.addEventListener("storage", readCart);
    window.addEventListener("saudade:cart-updated", readCart);
    return () => {
      window.removeEventListener("storage", readCart);
      window.removeEventListener("saudade:cart-updated", readCart);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : previous;
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-red/15 bg-paper/85 backdrop-blur-2xl">
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red/70 to-transparent" />
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-9 text-xs font-medium uppercase tracking-[0.22em] md:flex">
          {links.slice(0, 3).map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "relative text-red after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-px after:bg-red"
                    : "transition hover:text-red"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/shop"
            className="rounded-full border border-red/25 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-red transition hover:border-red hover:bg-red hover:text-paper"
          >
            Drop 0024
          </Link>
          <Link
            href="/cart"
            className="group relative rounded-full bg-ink px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-paper transition hover:bg-night"
          >
            Cart {cartCount}
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-signal shadow-signal animate-pulseGlow" />
            ) : null}
          </Link>
        </div>
        <button
          type="button"
          className="rounded-full border border-red/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition hover:border-red md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          Menu
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-[100] flex min-h-screen flex-col bg-ink text-paper md:hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(215,25,32,0.28),transparent_18rem),linear-gradient(180deg,#090808,#050505)]" />
          <span className="pointer-events-none absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-red to-transparent" />
          <div className="relative flex h-20 shrink-0 items-center justify-between border-b border-paper/10 px-5">
            <Logo light />
            <button
              type="button"
              className="rounded-full border border-paper/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition hover:border-red hover:text-red"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              Close
            </button>
          </div>
          <nav className="relative flex-1 overflow-y-auto px-5 pt-8 font-display text-4xl font-semibold uppercase tracking-[-0.04em] sm:text-5xl">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={
                    active
                      ? "flex items-center justify-between border-b border-paper/15 py-5 text-red"
                      : "flex items-center justify-between border-b border-paper/15 py-5 transition hover:text-red"
                  }
                >
                  <span>{link.label}</span>
                  <span className="text-base font-mono tracking-[0.2em] text-paper/40">→</span>
                </Link>
              );
            })}
          </nav>
          <div className="relative shrink-0 px-5 pb-8 pt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-paper/45">
            saudade.thehnh.tech
          </div>
        </div>
      ) : null}
    </header>
  );
}
