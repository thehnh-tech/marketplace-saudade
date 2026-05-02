import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="SAUDADE home">
      <Image
        src="/icon.png"
        alt="SAUDADE"
        width={56}
        height={56}
        className="h-11 w-11 rounded-2xl border border-red/20 shadow-red sm:h-12 sm:w-12"
        priority
      />
      <span className="sr-only">SAUDADE</span>
    </Link>
  );
}
