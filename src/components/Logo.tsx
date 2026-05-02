import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="SAUDADE home">
      <Image
        src="/icons/apple-touch-icon.png"
        alt="SAUDADE"
        width={40}
        height={40}
        className="h-9 w-9 rounded-md border border-red/20 shadow-red sm:h-10 sm:w-10"
        priority
      />
      <span className={light ? "font-display text-2xl font-semibold uppercase tracking-normal text-paper sm:text-3xl" : "font-display text-2xl font-semibold uppercase tracking-normal text-red sm:text-3xl"}>
        Saudade
      </span>
    </Link>
  );
}
