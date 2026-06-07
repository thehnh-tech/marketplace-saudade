"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DraftOrder } from "@/lib/order";

export function CartClient() {
  const [order, setOrder] = useState<DraftOrder | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem("saudade:draft-order");
    if (raw) {
      try {
        setOrder(JSON.parse(raw) as DraftOrder);
      } catch {
        window.localStorage.removeItem("saudade:draft-order");
      }
    }
    setHydrated(true);
  }, []);

  function clearCart() {
    window.localStorage.removeItem("saudade:draft-order");
    window.dispatchEvent(new Event("saudade:cart-updated"));
    setOrder(null);
  }

  async function checkout() {
    if (!order) return;
    setLoadingCheckout(true);
    setCheckoutError("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const response = await fetch(`${apiUrl}/api/checkout/create-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: order.productId,
          variant: order.variant,
          size: order.size,
          quantity: order.quantity
        })
      });
      const body = await response.json();
      if (!response.ok || !body.url) throw new Error(body.message ?? body.error ?? "Checkout unavailable");
      window.location.href = body.url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Checkout unavailable");
    } finally {
      setLoadingCheckout(false);
    }
  }

  if (!hydrated) {
    return <div className="mx-auto h-64 max-w-4xl border border-[var(--line)] bg-bone animate-pulse" />;
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl border border-[var(--line)] bg-bone p-8 sm:p-12">
        <div className="eyebrow flex items-center gap-2">
          <span className="star">✦</span> Your bag
        </div>
        <h1 className="font-display font-medium mt-5 leading-[1.02]" style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.01em" }}>
          Nothing yet.
        </h1>
        <p className="mt-5 text-ink/75 text-[15px] leading-[1.7]">Pick a tee first. The checkout flow is waiting.</p>
        <Link href="/shop" className="btn-editorial btn-brick mt-9 inline-flex">
          Shop the drop <span className="arr">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="border border-[var(--line)] bg-bone p-7 sm:p-10">
        <div className="eyebrow flex items-center gap-2">
          <span className="star">✦</span> Your bag
        </div>
        <h1 className="font-display font-medium mt-3.5 leading-[1.02]" style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.01em" }}>
          {order.title}
        </h1>

        <div className="mt-7 border-t border-[var(--line)]">
          <Row label="Colorway" value={order.variant} />
          <Row label="Size" value={order.size} />
          <Row label="Quantity" value={String(order.quantity)} />
        </div>

        <div className="mt-6 flex items-baseline justify-between">
          <span className="font-mono text-[10px] uppercase text-stone" style={{ letterSpacing: "0.22em" }}>Subtotal</span>
          <span className="font-display font-medium" style={{ fontSize: "28px" }}>€{order.amountTotal}.00</span>
        </div>

        <button type="button" onClick={clearCart} className="btn-editorial btn-outline mt-7">
          Remove from bag
        </button>
      </div>

      <div className="relative overflow-hidden bg-ink p-7 sm:p-10 text-paper">
        <div className="eyebrow flex items-center gap-2">
          <span className="star">✦</span> Stripe checkout
        </div>
        <h2 className="font-display font-medium mt-3.5 leading-[1.05]" style={{ fontSize: "clamp(26px, 3vw, 36px)" }}>
          Secure payment, <span className="italic-brick">no noise.</span>
        </h2>
        <p className="mt-5 text-paper/70 text-[14px] leading-[1.7]">
          You will be redirected to Stripe to finish the order. Your paid order lands directly in the SAUDADE admin room.
        </p>
        <button
          type="button"
          onClick={checkout}
          disabled={loadingCheckout}
          className="btn-editorial btn-brick mt-7 w-full justify-center py-[18px] disabled:opacity-60"
        >
          {loadingCheckout ? "Opening Stripe…" : "Checkout with Stripe"}
        </button>
        {checkoutError ? <p className="mt-4 font-mono text-[10px] uppercase text-brick" style={{ letterSpacing: "0.18em" }}>{checkoutError}</p> : null}
        <p className="mt-4 font-mono text-[10px] uppercase text-paper/50" style={{ letterSpacing: "0.18em" }}>
          Stripe opens the payment page. Paid orders are saved by the webhook.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-[var(--line)]">
      <span className="font-mono text-[10px] uppercase text-stone" style={{ letterSpacing: "0.22em" }}>{label}</span>
      <span className="text-right text-[15px]">{value}</span>
    </div>
  );
}
