"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/data/products";
import { createDraftOrder } from "@/lib/order";

export function BuyPanel({ product }: { product: Product }) {
  const router = useRouter();
  const [size, setSize] = useState("M");
  const [adding, setAdding] = useState(false);

  function addToCart() {
    if (product.status !== "available") return;
    setAdding(true);
    const order = createDraftOrder(product, product.colorway, size);
    window.localStorage.setItem("saudade:draft-order", JSON.stringify(order));
    window.dispatchEvent(new Event("saudade:cart-updated"));
    router.push("/cart");
  }

  const available = product.status === "available";

  return (
    <>
      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red">Size</p>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {product.sizes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSize(item)}
              className={
                size === item
                  ? "rounded-full border border-red bg-red px-2 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-paper transition"
                  : "rounded-full border border-red/20 px-2 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-red/45 hover:text-red"
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={addToCart}
        disabled={!available || adding}
        className={
          available
            ? "mt-9 w-full rounded-full bg-red px-7 py-5 text-sm font-semibold uppercase tracking-[0.22em] text-paper shadow-red transition hover:bg-signal hover:shadow-signal disabled:cursor-not-allowed disabled:opacity-60"
            : "mt-9 w-full cursor-not-allowed rounded-full border border-red/30 bg-bone px-7 py-5 text-sm font-semibold uppercase tracking-[0.22em] text-red/70"
        }
      >
        {available ? (adding ? "Adding..." : "Add to cart") : "Coming soon"}
      </button>
      <p className="mt-3 text-center text-xs uppercase tracking-[0.18em] text-stone">
        {available ? "Draft order. Stripe checkout next." : "Drop 0024 release follows the white / red opener."}
      </p>
    </>
  );
}
