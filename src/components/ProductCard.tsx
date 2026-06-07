import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const available = product.status === "available";
  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brick"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bone border border-[var(--line)] transition group-hover:border-brick">
        <Image
          src={product.cardImage}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <span
          className={
            available
              ? "absolute left-3 top-3 inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[9px] uppercase text-paper bg-brick"
              : "absolute left-3 top-3 inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[9px] uppercase text-paper bg-ink/90"
          }
          style={{ letterSpacing: "0.16em" }}
        >
          <span className={available ? "w-1.5 h-1.5 rounded-full bg-paper live-dot" : "w-1.5 h-1.5 rounded-full bg-paper/70"} />
          {available ? "Ed. 0024" : "Preview"}
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <p className="font-display font-medium text-[22px] leading-none truncate">{product.shortTitle}</p>
          <p className="mt-2 font-mono text-[10px] uppercase text-stone" style={{ letterSpacing: "0.2em" }}>
            {product.colorway}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display font-medium text-[18px]">€{product.price}.00</p>
          <span className="block font-mono text-[10px] uppercase text-brick mt-2 transition group-hover:translate-x-1" style={{ letterSpacing: "0.2em" }}>
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
