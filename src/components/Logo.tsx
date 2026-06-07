import Link from "next/link";

type LogoProps = {
  light?: boolean;
  size?: number;
};

export function Logo({ light = false, size = 22 }: LogoProps) {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="SAUDADE home">
      <span
        className="font-display font-semibold uppercase leading-none"
        style={{
          letterSpacing: "0.18em",
          fontSize: `${size}px`,
          color: light ? "var(--paper)" : "var(--brick)"
        }}
      >
        Saudade
      </span>
    </Link>
  );
}
