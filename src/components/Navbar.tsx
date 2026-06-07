"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "World Feed" },
  { href: "/shop", label: "The Tee" },
  { href: "/app-experience", label: "How it works" },
  { href: "/concept", label: "About" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const onFeedPage = pathname === "/";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const solid = !onFeedPage || scrolled;

  return (
    <>
      <header
        className={
          "fixed inset-x-0 top-0 z-[60] grid grid-cols-[1fr_auto_1fr] items-center px-[clamp(18px,4vw,60px)] py-4 transition " +
          (solid
            ? "bg-paper/95 backdrop-blur-xl border-b border-[var(--line)]"
            : "bg-gradient-to-b from-paper/90 to-transparent backdrop-blur-[2px]")
        }
      >
        <div className="flex items-center gap-2.5">
          <Logo size={21} />
        </div>

        <nav className="hidden md:flex items-center gap-7 justify-center">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "font-mono text-[10px] uppercase transition pb-[3px] relative " +
                  (active ? "text-brick opacity-100" : "text-ink opacity-60 hover:opacity-100 hover:text-brick")
                }
                style={{ letterSpacing: "0.2em" }}
              >
                {link.label}
                {active ? (
                  <span className="absolute left-0 right-0 -bottom-[2px] h-px bg-brick" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-5">
          <Link
            href="/cart"
            className="font-mono text-[10px] uppercase text-ink hover:text-brick transition"
            style={{ letterSpacing: "0.2em" }}
          >
            Bag ({String(cartCount).padStart(2, "0")})
          </Link>
        </div>
      </header>

      <MobileTabBar pathname={pathname} cartCount={cartCount} />
    </>
  );
}

function MobileTabBar({ pathname, cartCount }: { pathname: string; cartCount: number }) {
  const tabs = [
    { href: "/", label: "Feed" },
    { href: "/shop", label: "Tee" },
    { href: "/app-experience", label: "How" },
    { href: "/concept", label: "About" },
    { href: "/cart", label: `Bag${cartCount > 0 ? " ●" : ""}` }
  ];
  return (
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-[70] grid grid-cols-5 bg-paper/95 backdrop-blur-xl border-t border-[var(--line-2)]">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={
              "relative py-3 text-center font-mono text-[8.5px] uppercase " +
              (active ? "text-brick" : "text-stone hover:text-ink")
            }
            style={{
              letterSpacing: "0.12em",
              paddingBottom: "calc(11px + env(safe-area-inset-bottom))"
            }}
          >
            {tab.label}
            {active ? (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-brick" />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
