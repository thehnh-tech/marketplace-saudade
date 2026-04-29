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
    return <div className="mx-auto h-64 max-w-4xl animate-pulse rounded-[34px] border border-red/20 bg-bone" />;
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl rounded-[28px] border border-red/25 bg-bone p-6 sm:rounded-[34px] sm:p-12">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">
          <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 animate-pulseGlow rounded-full bg-signal align-middle shadow-signal" />
          Cart
        </p>
        <h1 className="soft-title mt-6 font-display text-4xl font-semibold uppercase leading-[0.96] sm:text-5xl lg:text-6xl">
          Your cart is empty.
        </h1>
        <p className="mt-6 leading-8 text-ink/65">Pick a tee first. The checkout flow is waiting.</p>
        <Link
          href="/shop"
          className="mt-10 inline-flex rounded-full bg-red px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-paper transition hover:bg-signal hover:shadow-signal"
        >
          Shop the drop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[28px] border border-red/25 bg-bone p-6 sm:rounded-[34px] sm:p-10">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">Draft order</p>
        <h1 className="soft-title mt-5 font-display text-3xl font-semibold uppercase leading-[0.98] sm:text-4xl lg:text-5xl">
          {order.title}
        </h1>
        <div className="mt-8 grid gap-3 text-sm">
          <Row label="Colorway" value={order.variant} />
          <Row label="Size" value={order.size} />
          <Row label="Quantity" value={String(order.quantity)} />
          <div className="mt-2 flex items-baseline justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{order.amountTotal} EUR</span>
          </div>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="mt-8 rounded-full border border-red/25 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-red transition hover:border-red hover:bg-red hover:text-paper"
        >
          Clear cart
        </button>
      </div>

      <div className="relative overflow-hidden rounded-[28px] bg-ink p-6 text-paper sm:rounded-[34px] sm:p-10">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red to-transparent" />
        <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">Stripe checkout</p>
        <h2 className="soft-title mt-5 font-display text-3xl font-semibold uppercase leading-[0.98]">
          Secure payment, no noise.
        </h2>
        <p className="mt-5 text-sm leading-7 text-paper/60">
          You will be redirected to Stripe to finish the order. Your paid order lands directly in the SAUDADE admin room.
        </p>
        <button
          type="button"
          onClick={checkout}
          disabled={loadingCheckout}
          className="mt-8 w-full rounded-full bg-red px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-paper transition hover:bg-signal disabled:opacity-70"
        >
          {loadingCheckout ? "Opening Stripe..." : "Checkout with Stripe"}
        </button>
        {checkoutError ? <p className="mt-4 text-xs leading-6 text-red">{checkoutError}</p> : null}
        <p className="mt-4 text-xs leading-6 text-paper/50">
          Stripe opens the payment page. Paid orders are saved by the webhook.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-red/15 pb-3">
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-stone">{label}</span>
      <span className="text-right text-sm">{value}</span>
    </div>
  );
}
