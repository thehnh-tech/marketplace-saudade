import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-ink px-4 py-20 text-paper sm:px-6 sm:py-24 lg:px-8">
      <div className="corner-frame relative mx-auto max-w-[1500px] overflow-hidden border border-red/30 p-6 sm:p-12 lg:p-16">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red to-transparent" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red to-transparent" />
        <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">
          <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-signal shadow-signal align-middle animate-pulseGlow" />
          Private for Saudade
        </p>
        <h2 className="soft-title mt-8 max-w-5xl font-display text-5xl font-semibold uppercase leading-[0.94] sm:text-7xl lg:text-8xl">
          Not just merch. A memory you can wear.
        </h2>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="rounded-full bg-red px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-paper transition hover:bg-signal hover:shadow-signal"
          >
            Shop collection
          </Link>
          <Link
            href="/app-experience"
            className="rounded-full border border-paper/25 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] transition hover:border-red hover:text-red"
          >
            See Night Access
          </Link>
        </div>
      </div>
    </section>
  );
}
