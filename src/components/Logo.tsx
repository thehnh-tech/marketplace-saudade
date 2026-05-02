import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="SAUDADE home">
      <Image
        src="/logo.png"
        alt="SAUDADE"
        width={56}
        height={56}
        className="h-11 w-11 rounded-2xl shadow-red sm:h-12 sm:w-12"
        priority
      />
      <span className={light ? "font-display text-2xl font-semibold uppercase tracking-normal text-paper sm:text-3xl" : "font-display text-2xl font-semibold uppercase tracking-normal text-red sm:text-3xl"}>
        Saudade
      </span>
    </Link>
  );
}
