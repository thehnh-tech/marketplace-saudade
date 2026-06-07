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
      <div className="mt-7">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] uppercase text-stone" style={{ letterSpacing: "0.2em" }}>
            Size · {size}
          </span>
          <span className="font-mono text-[10px] uppercase text-brick" style={{ letterSpacing: "0.18em" }}>
            Size guide →
          </span>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          {product.sizes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSize(item)}
              className={
                "min-w-[52px] h-[52px] inline-flex items-center justify-center border font-mono text-[11px] transition " +
                (size === item
                  ? "bg-ink text-paper border-ink"
                  : "border-[var(--line-2)] hover:border-ink")
              }
              style={{ letterSpacing: "0.05em" }}
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
            ? "btn-editorial btn-brick mt-7 w-full justify-center py-[18px] disabled:opacity-60"
            : "btn-editorial mt-7 w-full justify-center py-[18px] cursor-not-allowed border border-[var(--line-2)] text-stone bg-bone"
        }
      >
        {available ? (adding ? "Adding…" : `Add to bag — €${product.price}.00`) : "Coming soon"}
      </button>
      <p className="mt-3.5 font-mono text-[10px] uppercase text-stone text-center" style={{ letterSpacing: "0.2em" }}>
        {available ? "Ships from Switzerland · 5–7 days · Free returns" : "Drop 0024 release follows the white / red opener."}
      </p>
    </>
  );
}
