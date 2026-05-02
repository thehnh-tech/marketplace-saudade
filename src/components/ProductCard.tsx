import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const available = product.status === "available";
  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative block overflow-hidden rounded-[28px] border border-red/20 bg-bone p-3 transition duration-300 hover:-translate-y-1 hover:border-red/55 hover:shadow-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-night">
        <Image
          src={product.cardImage}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <span
          className={
            available
              ? "absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-red"
              : "absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-red"
          }
        >
          <span className={available ? "h-1 w-1 rounded-full bg-signal animate-pulseGlow" : "h-1 w-1 rounded-full bg-red/70"} />
          {available ? "Drop 0024" : "Preview"}
        </span>
        <span className="absolute bottom-3 left-3 right-3 hidden h-px bg-gradient-to-r from-transparent via-red to-transparent opacity-0 transition group-hover:opacity-90 sm:block" />
      </div>
      <div className="mt-5 flex items-end justify-between gap-4 px-1 pb-1">
        <div className="min-w-0">
          <p className="truncate font-display text-xl font-semibold tracking-normal">{product.shortTitle}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone">{product.colorway}</p>
          <p className="mt-3 text-sm font-semibold">{product.price} EUR</p>
        </div>
        <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-red transition group-hover:translate-x-1">
          View →
        </span>
      </div>
    </Link>
  );
}
