import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="block w-[116px] sm:w-[142px]" aria-label="SAUDADE home">
      <Image
        src="/assets/bgouter.png"
        alt="SAUDADE"
        width={360}
        height={180}
        className={light ? "h-auto w-full brightness-0 invert" : "h-auto w-full"}
        priority
      />
    </Link>
  );
}
